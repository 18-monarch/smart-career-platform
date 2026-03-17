import { useEffect, useState } from "react";
import { Monitor, Clock, Smartphone, TrendingUp } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { getProductivityStats } from "../../api/api";

const timeDistribution = [
  { name: "Productive", value: 68, color: "#10b981" },
  { name: "Neutral", value: 18, color: "#f59e0b" },
  { name: "Distracting", value: 14, color: "#ef4444" },
];

export function ProductivityTracker() {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userId = Number(localStorage.getItem("userId")) || 1;
    getProductivityStats(userId)
      .then(setStats)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const weeklyData = stats?.weeklyData?.map((d: any) => ({
    day: new Date(d.date).toLocaleDateString("en-US", { weekday: "short" }),
    productive: d.learningHours,
    distraction: d.distractionHours,
    neutral: d.focusSessions * 0.5,
  })) || [];

  if (loading) return <div className="p-6 text-center">Loading productivity data...</div>;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-card rounded-2xl p-6 border border-border shadow-sm">
        <h1 className="text-2xl font-bold mb-2">Productivity Tracker</h1>
        <p className="text-muted-foreground">
          Monitor your digital activity and optimize your productive time
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-card rounded-2xl p-6 border border-border shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#10b981] to-[#06b6d4] flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
          </div>
          <h3 className="text-3xl font-bold mb-1">{stats?.avgProductivityScore ?? "--"}%</h3>
          <p className="text-sm text-muted-foreground">Avg Productivity Score</p>
        </div>

        <div className="bg-card rounded-2xl p-6 border border-border shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#4f46e5] to-[#8b5cf6] flex items-center justify-center">
              <Clock className="w-6 h-6 text-white" />
            </div>
          </div>
          <h3 className="text-3xl font-bold mb-1">
            {stats?.weeklyData?.[stats.weeklyData.length - 1]?.learningHours ?? "--"}h
          </h3>
          <p className="text-sm text-muted-foreground">Last Day Learning</p>
        </div>

        <div className="bg-card rounded-2xl p-6 border border-border shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#f59e0b] to-[#ef4444] flex items-center justify-center">
              <Smartphone className="w-6 h-6 text-white" />
            </div>
          </div>
          <h3 className="text-3xl font-bold mb-1">
            {stats?.weeklyData?.[stats.weeklyData.length - 1]?.distractionHours ?? "--"}h
          </h3>
          <p className="text-sm text-muted-foreground">Last Day Distraction</p>
        </div>

        <div className="bg-card rounded-2xl p-6 border border-border shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#8b5cf6] to-[#ec4899] flex items-center justify-center">
              <Monitor className="w-6 h-6 text-white" />
            </div>
          </div>
          <h3 className="text-3xl font-bold mb-1">{stats?.totalFocusSessions ?? "--"}</h3>
          <p className="text-sm text-muted-foreground">Focus Sessions</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Weekly Productivity */}
        <div className="lg:col-span-2 bg-card rounded-2xl p-6 border border-border shadow-sm">
          <h3 className="text-lg font-semibold mb-6">Weekly Productivity Breakdown</h3>
          {weeklyData.length === 0 ? (
            <p className="text-center text-muted-foreground py-16">No data logged yet. Start logging your productivity sessions!</p>
          ) : (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="day" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip />
                <Bar dataKey="productive" stackId="a" fill="#10b981" />
                <Bar dataKey="neutral" stackId="a" fill="#f59e0b" />
                <Bar dataKey="distraction" stackId="a" fill="#ef4444" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          )}
          <div className="flex items-center justify-center gap-6 mt-4">
            <div className="flex items-center gap-2"><div className="w-4 h-4 rounded bg-[#10b981]"></div><span className="text-sm text-muted-foreground">Productive</span></div>
            <div className="flex items-center gap-2"><div className="w-4 h-4 rounded bg-[#f59e0b]"></div><span className="text-sm text-muted-foreground">Neutral</span></div>
            <div className="flex items-center gap-2"><div className="w-4 h-4 rounded bg-[#ef4444]"></div><span className="text-sm text-muted-foreground">Distraction</span></div>
          </div>
        </div>

        {/* Time Distribution */}
        <div className="bg-card rounded-2xl p-6 border border-border shadow-sm">
          <h3 className="text-lg font-semibold mb-6">Time Distribution</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={timeDistribution}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {timeDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-2 mt-4">
            {timeDistribution.map((item) => (
              <div key={item.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                  <span className="text-sm">{item.name}</span>
                </div>
                <span className="font-semibold">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Insights */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-2xl p-6">
          <h3 className="text-lg font-semibold mb-3 text-green-900">💪 Strengths</h3>
          <ul className="space-y-2 text-sm text-green-900">
            <li className="flex items-start gap-2"><span className="text-green-600 mt-1">•</span><span>Consistent learning hours tracked</span></li>
            <li className="flex items-start gap-2"><span className="text-green-600 mt-1">•</span><span>Regular focus sessions recorded</span></li>
          </ul>
        </div>
        <div className="bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-200 rounded-2xl p-6">
          <h3 className="text-lg font-semibold mb-3 text-amber-900">🎯 Areas to Improve</h3>
          <ul className="space-y-2 text-sm text-amber-900">
            <li className="flex items-start gap-2"><span className="text-amber-600 mt-1">•</span><span>Reduce distraction hours daily</span></li>
            <li className="flex items-start gap-2"><span className="text-amber-600 mt-1">•</span><span>Use Pomodoro technique for focus</span></li>
          </ul>
        </div>
      </div>
    </div>
  );
}
