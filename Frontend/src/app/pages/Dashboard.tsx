import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getDashboard, getNotifications } from "../../api/api";
import { DashboardLayout } from "../components/DashboardLayout";

// Removed redundant local DashboardLayout

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
      navigate("/login");
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
      <div className="animate-pulse space-y-4">
        <div className="h-20 bg-gray-200 rounded-xl"></div>
        <div className="h-60 bg-gray-200 rounded-xl"></div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="p-6 text-center text-muted-foreground">
        <p>Error loading dashboard. Please try again later.</p>
      </div>
    );
  }

  const productivityData = data.productivityData || [];
  const codingData = data.codingData || [];

  return (
    <>
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
          <div className="bg-white p-6 rounded-2xl shadow-sm border">
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

                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="day" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip />

                <Area dataKey="hours" stroke="#6366f1" fill="url(#colorHours)" />
                <Area dataKey="distraction" stroke="#ef4444" fill="url(#colorDistraction)" />

              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* CODING */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border">
            <h3 className="mb-4 font-semibold">Coding Activity</h3>

            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={codingData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="day" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip />

                <Bar dataKey="problems" fill="#10b981" radius={[6,6,0,0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

        </div>

        {/* RIGHT PANEL */}
        <div className="space-y-6">

          {/* TODAY METRICS */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border">
            <h3 className="font-semibold mb-4">Today's Metrics</h3>

            {(data.metrics || []).map((m: any, i: number) => (
              <MetricItem 
                key={i}
                title={m.label} 
                value={m.value} 
                color={m.color === 'amber' ? 'bg-amber-100 text-amber-600' : m.color === 'emerald' ? 'bg-emerald-100 text-emerald-600' : 'bg-indigo-100 text-indigo-600'} 
              />
            ))}

            {(!data.metrics || data.metrics.length === 0) && (
              <>
                <MetricItem title="Distraction Time" value="1.5h" color="bg-yellow-100 text-yellow-600" />
                <MetricItem title="Fitness Score" value="82%" color="bg-green-100 text-green-600" />
                <MetricItem title="Internship Ready" value="76%" color="bg-indigo-100 text-indigo-600" />
              </>
            )}

          </div>

          {/* NOTIFICATIONS */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border">
            <h3 className="font-semibold mb-4">Notifications</h3>

            {notifications.length === 0 && (!data.notifications || data.notifications.length === 0) && (
              <p className="text-gray-400 text-sm">No notifications</p>
            )}

            {(data.notifications || []).map((n: any, i: number) => (
              <div key={`d-${i}`} className="bg-gray-50 p-3 rounded-xl text-sm mb-2 border">
                <p className="font-medium text-gray-800">{n.title}</p>
                <p className="text-xs text-gray-400 mt-1">{n.time || "Recent"}</p>
              </div>
            ))}

            {notifications.map((n: any, i: number) => (
              <div key={`n-${i}`} className="bg-gray-50 p-3 rounded-xl text-sm mb-2 border">
                <p className="font-medium text-gray-800">{n.message || n.title}</p>
                <p className="text-xs text-gray-400 mt-1">Recent</p>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-6 rounded-2xl shadow-md">
            <h3 className="font-semibold text-lg">Keep Going!</h3>
            <p className="text-sm opacity-90 mt-1 mb-4">
              You're on track to achieve your weekly goals. Let's finish strong!
            </p>
            <button className="bg-white text-indigo-600 px-4 py-2 rounded-xl text-sm font-semibold hover:bg-gray-100 transition-colors">
              Start Coding
            </button>
          </div>

        </div>

      </div>
    </>
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
    <div className="bg-white rounded-2xl p-5 shadow-sm border flex justify-between items-center hover:shadow-md transition-shadow">
      <div>
        <p className="text-gray-500 text-sm font-medium">{title}</p>
        <h2 className="text-2xl font-bold mt-1">{value}</h2>
        {trend && <span className="text-green-500 text-xs font-semibold">{trend}</span>}
      </div>

      <div className={`p-3 rounded-xl ${colors[color]}`}>
        {React.cloneElement(icon as React.ReactElement, { className: "w-6 h-6" } as any)}
      </div>
    </div>
  );
}


// ✅ METRIC COMPONENT
function MetricItem({ title, value, color }: any) {
  return (
    <div className="flex justify-between items-center mb-4 last:mb-0">
      <div className="flex items-center gap-3">
        <div className={`w-2 h-2 rounded-full ${color.split(' ')[0]}`}></div>
        <p className="text-sm text-gray-600 font-medium">{title}</p>
      </div>
      <span className="font-bold text-gray-900">{value}</span>
    </div>
  );
}