import { useEffect, useState } from "react";
import { Code, Flame, Trophy, TrendingUp, Calendar } from "lucide-react";
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
  Cell
} from "recharts";

import { getCodingActivity } from "../../api/api";

type Activity = {
  id: number;
  platform: string;
  problemsSolved: number;
  timeSpent: number;
  date: string;
};

export function CodingTracker() {

  const [activities, setActivities] = useState<Activity[]>([]);
  const [totalSolved, setTotalSolved] = useState(0);

  const [weeklyData, setWeeklyData] = useState<any[]>([]);

  useEffect(() => {

    const fetchData = async () => {

      try {
        const userId = Number(localStorage.getItem("userId")) || 1;
        const data = await getCodingActivity(userId);

        setActivities(data);

        const total = data.reduce(
          (sum: number, a: Activity) => sum + a.problemsSolved,
          0
        );

        setTotalSolved(total);

        const grouped: any = {};

        data.forEach((a: Activity) => {

          const day = new Date(a.date).toLocaleDateString("en-US", {
            weekday: "short"
          });

          if (!grouped[day]) {
            grouped[day] = { day, problems: 0 };
          }

          grouped[day].problems += a.problemsSolved;
        });

        setWeeklyData(Object.values(grouped));

      } catch (error) {
        console.error("Coding activity fetch failed", error);
      }

    };

    fetchData();

  }, []);

  const difficultyData = [
    { name: "Easy", value: 45, color: "#10b981" },
    { name: "Medium", value: 38, color: "#f59e0b" },
    { name: "Hard", value: 17, color: "#ef4444" }
  ];

  const heatmapData = [
    [0, 1, 2, 3, 5, 2, 1, 0, 3, 4, 5, 2],
    [1, 3, 4, 2, 1, 0, 2, 5, 4, 3, 2, 1],
    [2, 4, 5, 3, 2, 1, 3, 4, 5, 2, 1, 0],
    [3, 5, 2, 1, 0, 2, 4, 3, 2, 1, 3, 4],
    [1, 2, 3, 4, 5, 3, 2, 1, 0, 2, 4, 5],
    [0, 1, 2, 3, 4, 5, 3, 2, 1, 0, 2, 3],
    [2, 3, 4, 5, 2, 1, 0, 3, 4, 5, 3, 2]
  ];

  return (
    <div className="space-y-6">

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">

        <div className="bg-card rounded-2xl p-6 border border-border shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <Code className="w-6 h-6 text-[#4f46e5]" />
          </div>
          <h3 className="text-3xl font-bold">{totalSolved}</h3>
          <p className="text-sm text-muted-foreground">Problems Solved</p>
        </div>

        <div className="bg-card rounded-2xl p-6 border border-border shadow-sm">
          <Flame className="w-6 h-6 text-orange-500" />
          <h3 className="text-3xl font-bold">23 Days</h3>
          <p className="text-sm text-muted-foreground">Current Streak</p>
        </div>

        <div className="bg-card rounded-2xl p-6 border border-border shadow-sm">
          <Trophy className="w-6 h-6 text-green-500" />
          <h3 className="text-3xl font-bold">12</h3>
          <p className="text-sm text-muted-foreground">Contests</p>
        </div>

        <div className="bg-card rounded-2xl p-6 border border-border shadow-sm">
          <TrendingUp className="w-6 h-6 text-purple-500" />
          <h3 className="text-3xl font-bold">1847</h3>
          <p className="text-sm text-muted-foreground">LeetCode Rating</p>
        </div>

      </div>

      {/* Weekly Chart */}
      <div className="bg-card rounded-2xl p-6 border border-border shadow-sm">

        <h3 className="text-lg font-semibold mb-6">
          Weekly Activity
        </h3>

        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={weeklyData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="problems" fill="#4f46e5" radius={[8,8,0,0]} />
          </BarChart>
        </ResponsiveContainer>

      </div>

      {/* Difficulty Pie */}
      <div className="bg-card rounded-2xl p-6 border border-border shadow-sm">

        <h3 className="text-lg font-semibold mb-6">
          Difficulty Distribution
        </h3>

        <ResponsiveContainer width="100%" height={250}>
          <PieChart>

            <Pie
              data={difficultyData}
              dataKey="value"
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
            >

              {difficultyData.map((d, i) => (
                <Cell key={i} fill={d.color} />
              ))}

            </Pie>

          </PieChart>
        </ResponsiveContainer>

      </div>

      {/* Heatmap */}
      <div className="bg-card rounded-2xl p-6 border border-border shadow-sm">

        <div className="flex items-center gap-2 mb-6">
          <Calendar className="w-5 h-5 text-[#4f46e5]" />
          <h3 className="text-lg font-semibold">
            Coding Heatmap
          </h3>
        </div>

        <div className="flex gap-1">

          {heatmapData.map((week, wi) => (

            <div key={wi} className="flex flex-col gap-1">

              {week.map((day, di) => (

                <div
                  key={di}
                  className="w-3 h-3 rounded"
                  style={{
                    backgroundColor:
                      day === 0
                        ? "#f1f5f9"
                        : day === 1
                        ? "#dbeafe"
                        : day === 2
                        ? "#bfdbfe"
                        : day === 3
                        ? "#93c5fd"
                        : day === 4
                        ? "#60a5fa"
                        : "#3b82f6"
                  }}
                />

              ))}

            </div>

          ))}

        </div>

      </div>

    </div>
  );
}