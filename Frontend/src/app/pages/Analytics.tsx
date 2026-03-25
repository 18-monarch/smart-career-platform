import { useEffect, useState } from "react";
import { getAnalytics } from "../../api/api";
import { TrendingUp, Download, Share2, FileText, Calendar } from "lucide-react";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

type AnalyticsData = {
  totalProblems: number;
  weeklyProblems: number;
  avgProblemsPerDay: number;
  codingStreak: number;
  productivityScore: number;
};

const productivityTrend = [
  { month: "Jan", score: 72 },
  { month: "Feb", score: 75 },
  { month: "Mar", score: 78 },
  { month: "Apr", score: 76 },
  { month: "May", score: 82 },
  { month: "Jun", score: 85 },
  { month: "Jul", score: 87 },
  { month: "Aug", score: 89 },
];

const learningDistribution = [
  { category: "Coding", hours: 145 },
  { category: "Courses", hours: 98 },
  { category: "Reading", hours: 56 },
  { category: "Projects", hours: 124 },
  { category: "Practice", hours: 87 },
];

const skillProgress = [
  { month: "Jan", python: 60, ml: 40, webdev: 50 },
  { month: "Feb", python: 65, ml: 45, webdev: 55 },
  { month: "Mar", python: 70, ml: 52, webdev: 62 },
  { month: "Apr", python: 72, ml: 58, webdev: 68 },
  { month: "May", python: 78, ml: 65, webdev: 72 },
  { month: "Jun", python: 82, ml: 72, webdev: 78 },
  { month: "Jul", python: 85, ml: 78, webdev: 82 },
  { month: "Aug", python: 88, ml: 82, webdev: 85 },
];

const heatmapData = Array.from({ length: 52 }, (_, weekIndex) =>
  Array.from({ length: 7 }, () => Math.floor(Math.random() * 6))
);

export function Analytics() {
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const userId = Number(localStorage.getItem("userId")) || 1;
        const data = await getAnalytics(userId);
        setAnalytics(data);
      } catch (err) {
        console.error("Failed to load analytics", err);
      }
    };

    fetchAnalytics();
  }, []);

  if (!analytics) {
    return <div className="p-6">Loading analytics...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-card rounded-2xl p-6 border border-border shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-2">Advanced Analytics Dashboard</h1>
            <p className="text-muted-foreground">
              Comprehensive insights into your career progress and productivity
            </p>
          </div>
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-accent rounded-lg flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Last 30 Days
            </button>
            <button className="px-4 py-2 bg-[#4f46e5] text-white rounded-lg flex items-center gap-2">
              <Download className="w-4 h-4" />
              Export PDF
            </button>
            <button className="px-4 py-2 bg-accent rounded-lg flex items-center gap-2">
              <Share2 className="w-4 h-4" />
              Share
            </button>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-[#4f46e5] to-[#8b5cf6] rounded-2xl p-6 text-white shadow-lg">
          <TrendingUp className="w-8 h-8 mb-3" />
          <h3 className="text-3xl font-bold mb-1">{analytics.productivityScore}%</h3>
          <p className="text-sm opacity-90">Career Readiness</p>
        </div>

        <div className="bg-gradient-to-br from-[#10b981] to-[#06b6d4] rounded-2xl p-6 text-white shadow-lg">
          <FileText className="w-8 h-8 mb-3" />
          <h3 className="text-3xl font-bold mb-1">{analytics.weeklyProblems}</h3>
          <p className="text-sm opacity-90">Problems This Week</p>
        </div>

        <div className="bg-gradient-to-br from-[#f59e0b] to-[#ef4444] rounded-2xl p-6 text-white shadow-lg">
          <TrendingUp className="w-8 h-8 mb-3" />
          <h3 className="text-3xl font-bold mb-1">
            {analytics.avgProblemsPerDay.toFixed(1)}
          </h3>
          <p className="text-sm opacity-90">Avg Problems / Day</p>
        </div>

        <div className="bg-gradient-to-br from-[#8b5cf6] to-[#ec4899] rounded-2xl p-6 text-white shadow-lg">
          <TrendingUp className="w-8 h-8 mb-3" />
          <h3 className="text-3xl font-bold mb-1">{analytics.codingStreak}</h3>
          <p className="text-sm opacity-90">Current Streak (days)</p>
        </div>
      </div>

      {/* Productivity Trend */}
      <div className="bg-card rounded-2xl p-6 border border-border shadow-sm">
        <h3 className="text-lg font-semibold mb-6">8-Month Productivity Trend</h3>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={productivityTrend}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis domain={[60, 100]} />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="score"
              stroke="#4f46e5"
              strokeWidth={3}
              fillOpacity={0.2}
              fill="#4f46e5"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Learning Distribution */}
      <div className="bg-card rounded-2xl p-6 border border-border shadow-sm">
        <h3 className="text-lg font-semibold mb-6">Learning Time Distribution</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={learningDistribution}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="category" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="hours" fill="#10b981" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Coding Stats */}
      <div className="bg-card rounded-2xl p-6 border border-border shadow-sm">
        <h3 className="text-lg font-semibold mb-4">Coding Stats</h3>

        <div className="space-y-3">
          <div className="flex justify-between">
            <span>Problems Solved</span>
            <span className="font-semibold">{analytics.totalProblems}</span>
          </div>

          <div className="flex justify-between">
            <span>Current Streak</span>
            <span className="font-semibold">{analytics.codingStreak} days</span>
          </div>

          <div className="flex justify-between">
            <span>Weekly Problems</span>
            <span className="font-semibold">{analytics.weeklyProblems}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

