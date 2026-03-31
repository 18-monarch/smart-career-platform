import { useState, useEffect } from "react";
import {
  Code,
  Flame,
  Trophy,
  TrendingUp,
  Search,
  Loader2
} from "lucide-react";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from "recharts";

import { getCodingActivity, fetchExternalCodingStats } from "../../api/api";

type Activity = {
  id: number;
  platform: string;
  problemsSolved: number;
  timeSpent: number;
  date: string;
};

type DifficultyItem = {
  name: string;
  value: number;
  color: string;
};

export function CodingTracker() {
  const [leetcodeUsername, setLeetcodeUsername] = useState("");
  const [codeforcesHandle, setCodeforcesHandle] = useState("");
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [activities, setActivities] = useState<Activity[]>([]);
  const [localWeeklyData, setLocalWeeklyData] = useState<any[]>([]);

  useEffect(() => {
    const fetchLocalData = async () => {
      try {
        const data = await getCodingActivity();
        const safeData = Array.isArray(data) ? data : [];
        setActivities(safeData);

        const grouped: Record<string, { day: string; problems: number }> = {};

        safeData.forEach((a: Activity) => {
          const day = new Date(a.date).toLocaleDateString("en-US", {
            weekday: "short"
          });

          if (!grouped[day]) {
            grouped[day] = { day, problems: 0 };
          }

          grouped[day].problems += a.problemsSolved || 0;
        });

        const orderedDays = ["Wed", "Thu", "Fri", "Sat", "Sun", "Mon", "Tue"];
        const formatted = orderedDays.map((day) => grouped[day] || { day, problems: 0 });

        setLocalWeeklyData(formatted);
      } catch (err) {
        console.error("Local fetch failed", err);
        setLocalWeeklyData([
          { day: "Wed", problems: 0 },
          { day: "Thu", problems: 0 },
          { day: "Fri", problems: 0 },
          { day: "Sat", problems: 0 },
          { day: "Sun", problems: 0 },
          { day: "Mon", problems: 0 },
          { day: "Tue", problems: 0 }
        ]);
      }
    };

    fetchLocalData();
  }, []);

  const handleSearch = async () => {
    if (!leetcodeUsername.trim() && !codeforcesHandle.trim()) {
      setError("Enter at least one handle.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const data = await fetchExternalCodingStats(
        leetcodeUsername.trim(),
        codeforcesHandle.trim()
      );

      if (!data || (!data.leetcode && !data.codeforces)) {
        throw new Error("No data");
      }

      setStats(data);
    } catch (err) {
      console.error(err);
      setError("Unable to fetch stats. Check usernames.");
      setStats(null);
    } finally {
      setLoading(false);
    }
  };

  const normalizeTimestamp = (t: any) => {
    if (!t) return null;
    if (typeof t === "string") return new Date(parseInt(t) * 1000);
    if (typeof t === "number") return new Date(t * 1000);
    return null;
  };

  const processActivity = () => {
    const now = new Date();
    const last7Days: Record<string, { day: string; problems: number }> = {};

    for (let i = 0; i < 7; i++) {
      const d = new Date();
      d.setDate(now.getDate() - i);

      const key = d.toLocaleDateString("en-US", {
        weekday: "short"
      });

      last7Days[key] = { day: key, problems: 0 };
    }

    const submissions = [
      ...(stats?.leetcode?.recentSubmissions || []),
      ...(stats?.codeforces?.recentActivity || [])
    ];

    submissions.forEach((sub: any) => {
      const date = normalizeTimestamp(
        sub.timestamp || sub.creationTimeSeconds
      );
      if (!date) return;

      const diffDays = Math.floor(
        (now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24)
      );

      if (diffDays <= 6) {
        const key = date.toLocaleDateString("en-US", {
          weekday: "short"
        });

        if (last7Days[key]) {
          last7Days[key].problems += 1;
        }
      }
    });

    return Object.values(last7Days).reverse();
  };

  const calculateStreak = () => {
    if (!stats) return 0;

    const submissions = [
      ...(stats?.leetcode?.recentSubmissions || []),
      ...(stats?.codeforces?.recentActivity || [])
    ];

    const daysSet = new Set<string>();

    submissions.forEach((sub: any) => {
      const timestamp = sub.timestamp || sub.creationTimeSeconds;
      if (!timestamp) return;

      const date = new Date(timestamp * 1000).toISOString().split("T")[0];
      daysSet.add(date);
    });

    let streak = 0;
    let current = new Date();

    while (true) {
      const dateStr = current.toISOString().split("T")[0];

      if (daysSet.has(dateStr)) {
        streak++;
        current.setDate(current.getDate() - 1);
      } else {
        break;
      }
    }

    return streak;
  };

  const weeklyDataToUse =
    stats && (stats.leetcode || stats.codeforces)
      ? processActivity()
      : localWeeklyData;

  const streak = calculateStreak();

  const totalSolved = stats
    ? (stats?.leetcode?.totalSolved || 0) +
      (stats?.codeforces?.totalSolved || 0)
    : activities.reduce((sum, a) => sum + (a.problemsSolved || 0), 0);

  const codeforcesRating = stats?.codeforces?.rating || 0;
  const leetCodeRank = stats?.leetcode?.rank ?? "N/A";

  const easySolved = stats?.leetcode?.easy ?? 0;
  const mediumSolved = stats?.leetcode?.medium ?? 0;
  const hardSolved = stats?.leetcode?.hard ?? 0;

  const difficultyData: DifficultyItem[] = [
    { name: "Easy", value: easySolved, color: "#10b981" },
    { name: "Medium", value: mediumSolved, color: "#f59e0b" },
    { name: "Hard", value: hardSolved, color: "#ef4444" }
  ];

  const totalDifficultySolved = difficultyData.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="space-y-6">
      {/* INPUT */}
      <div className="bg-card rounded-2xl p-6 border shadow-sm flex flex-col md:flex-row gap-4 items-end">
        <input
          placeholder="LeetCode Username"
          className="w-full border rounded-xl px-4 py-2"
          value={leetcodeUsername}
          onChange={(e) => setLeetcodeUsername(e.target.value)}
        />

        <input
          placeholder="Codeforces Handle"
          className="w-full border rounded-xl px-4 py-2"
          value={codeforcesHandle}
          onChange={(e) => setCodeforcesHandle(e.target.value)}
        />

        <button
          onClick={handleSearch}
          disabled={loading}
          className="bg-indigo-600 text-white px-6 py-2 rounded-xl flex items-center gap-2 disabled:opacity-60"
        >
          {loading ? <Loader2 className="animate-spin w-4 h-4" /> : <Search className="w-4 h-4" />}
          Analyze
        </button>
      </div>

      {error && <p className="text-red-500">{error}</p>}

      {/* STATS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Stat icon={<Code />} value={totalSolved} label="Solved" />
        <Stat icon={<Flame />} value={streak} label="Streak" />
        <Stat icon={<Trophy />} value={leetCodeRank} label="LeetCode Rank" />
        <Stat icon={<TrendingUp />} value={codeforcesRating} label="CF Rating" />
      </div>

      {/* Difficulty quick stats */}
      <div className="grid grid-cols-3 gap-4">
        <MiniStat label="Easy" value={easySolved} colorClass="text-green-500" />
        <MiniStat label="Medium" value={mediumSolved} colorClass="text-yellow-500" />
        <MiniStat label="Hard" value={hardSolved} colorClass="text-red-500" />
      </div>

      {/* CHARTS */}
      <div className="grid lg:grid-cols-5 gap-6">
        <div className="lg:col-span-3 bg-card p-6 rounded-2xl border">
          <h3 className="mb-4 font-semibold">Activity</h3>

          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={weeklyDataToUse}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis allowDecimals={false} />
              <Tooltip formatter={(value) => [`${value} solved`, "Problems"]} />
              <Bar dataKey="problems" fill="#4f46e5" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="lg:col-span-2 bg-card p-6 rounded-2xl border">
          <h3 className="mb-4 font-semibold">Difficulty</h3>

          {totalDifficultySolved > 0 ? (
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie
                  data={difficultyData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={85}
                  label={({ name, percent }) =>
                    `${name} ${((percent || 0) * 100).toFixed(0)}%`
                  }
                >
                  {difficultyData.map((d, i) => (
                    <Cell key={i} fill={d.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value}`, "Solved"]} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-[280px] flex items-center justify-center text-gray-500 text-sm">
              No difficulty data available
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function Stat({
  icon,
  value,
  label
}: {
  icon: React.ReactNode;
  value: string | number;
  label: string;
}) {
  return (
    <div className="bg-card p-5 rounded-2xl border">
      <div className="mb-2">{icon}</div>
      <h2 className="text-2xl font-bold">{value}</h2>
      <p className="text-sm text-gray-500">{label}</p>
    </div>
  );
}

function MiniStat({
  label,
  value,
  colorClass
}: {
  label: string;
  value: number;
  colorClass: string;
}) {
  return (
    <div className="bg-card p-4 rounded-2xl border">
      <p className="text-sm text-gray-500">{label}</p>
      <h3 className={`text-xl font-bold ${colorClass}`}>{value}</h3>
    </div>
  );
}