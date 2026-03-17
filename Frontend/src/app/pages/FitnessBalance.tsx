import { useEffect, useState } from "react";
import { Activity, Heart, Moon, Dumbbell, Footprints } from "lucide-react";
import {
  LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar
} from "recharts";
import { getFitnessStats } from "../../api/api";

const wellnessScore = [
  { metric: "Physical", score: 85 },
  { metric: "Sleep", score: 78 },
  { metric: "Nutrition", score: 72 },
  { metric: "Mental", score: 80 },
  { metric: "Hydration", score: 65 },
];

export function FitnessBalance() {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userId = Number(localStorage.getItem("userId")) || 1;
    getFitnessStats(userId)
      .then(setStats)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const logs: any[] = stats?.logs ?? [];
  const weeklyActivity = logs.map((l) => ({
    day: l.date?.substring(0, 5) ?? l.date,
    steps: l.steps,
    workout: l.workoutMinutes,
    sleep: l.sleepHours,
  }));

  const lastLog = logs[logs.length - 1];

  if (loading) return <div className="p-6 text-center">Loading fitness data...</div>;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#10b981] to-[#06b6d4] rounded-2xl p-8 text-white">
        <h1 className="text-3xl font-bold mb-2">Fitness & Life Balance</h1>
        <p className="text-lg opacity-90">
          Track your physical health, sleep, and maintain a healthy work-life balance
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-card rounded-2xl p-6 border border-border shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#10b981] to-[#06b6d4] flex items-center justify-center">
              <Footprints className="w-6 h-6 text-white" />
            </div>
          </div>
          <h3 className="text-3xl font-bold mb-1">{lastLog?.steps?.toLocaleString() ?? "--"}</h3>
          <p className="text-sm text-muted-foreground">Steps (Last Log)</p>
        </div>

        <div className="bg-card rounded-2xl p-6 border border-border shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#f59e0b] to-[#ef4444] flex items-center justify-center">
              <Dumbbell className="w-6 h-6 text-white" />
            </div>
          </div>
          <h3 className="text-3xl font-bold mb-1">{stats?.totalWorkoutMinutes ?? "--"} min</h3>
          <p className="text-sm text-muted-foreground">Total Workout This Period</p>
        </div>

        <div className="bg-card rounded-2xl p-6 border border-border shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#8b5cf6] to-[#ec4899] flex items-center justify-center">
              <Moon className="w-6 h-6 text-white" />
            </div>
          </div>
          <h3 className="text-3xl font-bold mb-1">{stats?.avgSleepHours ?? "--"}h</h3>
          <p className="text-sm text-muted-foreground">Avg Sleep</p>
        </div>

        <div className="bg-card rounded-2xl p-6 border border-border shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#4f46e5] to-[#8b5cf6] flex items-center justify-center">
              <Heart className="w-6 h-6 text-white" />
            </div>
          </div>
          <h3 className="text-3xl font-bold mb-1">{stats?.totalSteps?.toLocaleString() ?? "--"}</h3>
          <p className="text-sm text-muted-foreground">Total Steps</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Weekly Steps */}
        <div className="lg:col-span-2 bg-card rounded-2xl p-6 border border-border shadow-sm">
          <h3 className="text-lg font-semibold mb-6">Weekly Activity Trends</h3>
          {weeklyActivity.length === 0 ? (
            <p className="text-center text-muted-foreground py-16">No fitness logs yet. Start logging your daily activity!</p>
          ) : (
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={weeklyActivity}>
                <defs>
                  <linearGradient id="colorSteps" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="day" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip />
                <Area type="monotone" dataKey="steps" stroke="#10b981" strokeWidth={2} fillOpacity={1} fill="url(#colorSteps)" />
              </AreaChart>
            </ResponsiveContainer>
          )}
        </div>

        {/* Wellness Radar */}
        <div className="bg-card rounded-2xl p-6 border border-border shadow-sm">
          <h3 className="text-lg font-semibold mb-6">Wellness Balance</h3>
          <ResponsiveContainer width="100%" height={250}>
            <RadarChart data={wellnessScore}>
              <PolarGrid stroke="#e5e7eb" />
              <PolarAngleAxis dataKey="metric" stroke="#64748b" />
              <PolarRadiusAxis angle={90} domain={[0, 100]} stroke="#64748b" />
              <Radar name="Score" dataKey="score" stroke="#10b981" fill="#10b981" fillOpacity={0.5} />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Sleep & Workout */}
      {weeklyActivity.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-card rounded-2xl p-6 border border-border shadow-sm">
            <h3 className="text-lg font-semibold mb-6">Sleep Pattern</h3>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={weeklyActivity}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="day" stroke="#64748b" />
                <YAxis stroke="#64748b" domain={[0, 12]} />
                <Tooltip />
                <Line type="monotone" dataKey="sleep" stroke="#8b5cf6" strokeWidth={3} dot={{ fill: "#8b5cf6", r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-card rounded-2xl p-6 border border-border shadow-sm">
            <h3 className="text-lg font-semibold mb-6">Workout Minutes</h3>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={weeklyActivity}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="day" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip />
                <Line type="monotone" dataKey="workout" stroke="#f59e0b" strokeWidth={3} dot={{ fill: "#f59e0b", r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* Health Tips */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-2xl p-6">
          <h3 className="text-lg font-semibold mb-3 text-green-900">✨ Well Done!</h3>
          <ul className="space-y-2 text-sm text-green-900">
            <li className="flex items-start gap-2"><span className="text-green-600 mt-1">•</span><span>Keep logging your daily fitness activities</span></li>
            <li className="flex items-start gap-2"><span className="text-green-600 mt-1">•</span><span>Maintain consistent sleep schedule for better health</span></li>
          </ul>
        </div>
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-2xl p-6">
          <h3 className="text-lg font-semibold mb-3 text-blue-900">💡 Recommendations</h3>
          <ul className="space-y-2 text-sm text-blue-900">
            <li className="flex items-start gap-2"><span className="text-blue-600 mt-1">•</span><span>Aim for 10,000 steps daily</span></li>
            <li className="flex items-start gap-2"><span className="text-blue-600 mt-1">•</span><span>Try to get 7-8 hours of sleep each night</span></li>
          </ul>
        </div>
      </div>
    </div>
  );
}
