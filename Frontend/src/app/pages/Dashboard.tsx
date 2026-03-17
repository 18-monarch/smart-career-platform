import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getDashboard, getNotifications } from "../../api/api";
import { MainLayout } from "../../layout/MainLayout";

import {
  TrendingUp,
  Clock,
  Code,
  Target,
} from "lucide-react";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";

export function Dashboard() {
  const [data, setData] = useState<any>(null);
  const [notifications, setNotifications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const userId = localStorage.getItem("userId");

    if (!userId) {
      navigate("/");
      return;
    }

    getDashboard(Number(userId))
      .then((res) => setData(res))
      .catch(() => alert("Dashboard failed"));

    getNotifications(Number(userId))
      .then((res) => setNotifications(res || []))
      .catch(() => setNotifications([]))
      .finally(() => setLoading(false));
  }, []);

  // ✅ LOADING SKELETON
  if (loading) {
    return (
      <MainLayout>
        <div className="animate-pulse space-y-4">
          <div className="h-20 bg-gray-200 rounded-xl"></div>
          <div className="h-60 bg-gray-200 rounded-xl"></div>
        </div>
      </MainLayout>
    );
  }

  if (!data) {
    return (
      <MainLayout>
        <div className="p-6">Error loading dashboard</div>
      </MainLayout>
    );
  }

  // ✅ CHART DATA
  const productivityData = [
    { day: "Mon", hours: data.learningHours, distraction: 2 },
    { day: "Tue", hours: data.learningHours + 1, distraction: 1 },
    { day: "Wed", hours: data.learningHours - 1, distraction: 3 },
    { day: "Thu", hours: data.learningHours + 2, distraction: 1 },
    { day: "Fri", hours: data.learningHours, distraction: 2 },
    { day: "Sat", hours: data.learningHours - 2, distraction: 4 },
    { day: "Sun", hours: data.learningHours - 3, distraction: 3 },
  ];

  const codingData = [
    { day: "Mon", problems: data.problemsSolved - 2 },
    { day: "Tue", problems: data.problemsSolved },
    { day: "Wed", problems: data.problemsSolved - 3 },
    { day: "Thu", problems: data.problemsSolved + 1 },
    { day: "Fri", problems: data.problemsSolved },
    { day: "Sat", problems: data.problemsSolved + 2 },
    { day: "Sun", problems: data.problemsSolved - 1 },
  ];

  return (
    <MainLayout>

      {/* 🔥 TOP CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">

        <Card
          title="Productivity"
          value={`${data.productivityScore}%`}
          icon={<TrendingUp />}
          color="indigo"
          trend="+12%"
        />

        <Card
          title="Learning Today"
          value={`${data.learningHours}h`}
          icon={<Clock />}
          color="green"
          trend="+2h"
        />

        <Card
          title="Problems Solved"
          value={data.problemsSolved}
          icon={<Code />}
          color="orange"
          trend="+5"
        />

        <Card
          title="Career Progress"
          value={`${data.careerProgress}%`}
          icon={<Target />}
          color="purple"
          trend="+8%"
        />

      </div>

      {/* 🔥 MAIN GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">

        {/* LEFT */}
        <div className="lg:col-span-2 space-y-6">

          {/* PRODUCTIVITY */}
          <div className="bg-white p-6 rounded-2xl shadow-sm">
            <h3 className="mb-4 font-semibold">Weekly Productivity</h3>

            <ResponsiveContainer width="100%" height={250}>
              <AreaChart data={productivityData}>

                <defs>
                  <linearGradient id="colorHours" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>

                  <linearGradient id="colorDistraction" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ef4444" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                  </linearGradient>
                </defs>

                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />

                <Area dataKey="hours" stroke="#6366f1" fill="url(#colorHours)" />
                <Area dataKey="distraction" stroke="#ef4444" fill="url(#colorDistraction)" />

              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* CODING */}
          <div className="bg-white p-6 rounded-2xl shadow-sm">
            <h3 className="mb-4 font-semibold">Coding Activity</h3>

            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={codingData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />

                <Bar dataKey="problems" fill="#10b981" radius={[6,6,0,0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

        </div>

        {/* RIGHT PANEL */}
        <div className="space-y-6">

          {/* TODAY METRICS */}
          <div className="bg-white p-6 rounded-2xl shadow-sm">
            <h3 className="font-semibold mb-4">Today's Metrics</h3>

            <MetricItem title="Distraction Time" value={`${data.distractionTime || 1.5}h`} color="bg-yellow-100 text-yellow-600" />
            <MetricItem title="Fitness Score" value={`${data.fitnessScore || 82}%`} color="bg-green-100 text-green-600" />
            <MetricItem title="Internship Ready" value={`${data.internshipReady || 76}%`} color="bg-indigo-100 text-indigo-600" />

          </div>

          {/* NOTIFICATIONS */}
          <div className="bg-white p-6 rounded-2xl shadow-sm">
            <h3 className="font-semibold mb-4">Notifications</h3>

            {notifications.length === 0 && (
              <p className="text-gray-400 text-sm">No notifications</p>
            )}

            {notifications.map((n, i) => (
              <div key={i} className="bg-gray-100 p-3 rounded-lg text-sm mb-2">
                <p>{n.message}</p>
                <p className="text-xs text-gray-400">2h ago</p>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-6 rounded-2xl">
            <h3 className="font-semibold">Keep Going!</h3>
            <p className="text-sm mt-1 mb-4">
              You're on track to achieve your weekly goals.
            </p>
            <button className="bg-white text-indigo-600 px-4 py-2 rounded-lg text-sm font-medium">
              Start Coding
            </button>
          </div>

        </div>

      </div>

    </MainLayout>
  );
}


// ✅ CARD COMPONENT
function Card({ title, value, icon, color, trend }: any) {
  const colors: any = {
    indigo: "bg-indigo-100 text-indigo-600",
    green: "bg-green-100 text-green-600",
    orange: "bg-orange-100 text-orange-600",
    purple: "bg-purple-100 text-purple-600",
  };

  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm flex justify-between items-center">
      <div>
        <p className="text-gray-500 text-sm">{title}</p>
        <h2 className="text-2xl font-bold">{value}</h2>
        {trend && <span className="text-green-500 text-xs">{trend}</span>}
      </div>

      <div className={`p-3 rounded-lg ${colors[color]}`}>
        {icon}
      </div>
    </div>
  );
}


// ✅ METRIC COMPONENT
function MetricItem({ title, value, color }: any) {
  return (
    <div className="flex justify-between items-center mb-3">
      <div className="flex items-center gap-3">
        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${color}`}>
          ●
        </div>
        <p className="text-sm text-gray-600">{title}</p>
      </div>
      <span className="font-semibold">{value}</span>
    </div>
  );
}