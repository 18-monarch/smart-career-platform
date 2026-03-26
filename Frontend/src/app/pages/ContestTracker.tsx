import { useEffect, useState } from "react";
import { Trophy, TrendingUp, Award, Medal } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { getContestStats } from "../../api/api";

export function ContestTracker() {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getContestStats()
      .then(setStats)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="p-6 text-center">Loading contest data...</div>;
  if (!stats || stats.totalContests === 0) return (
    <div className="p-6 text-center text-muted-foreground">
      No contest records yet. Add your first contest to get started!
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-card rounded-2xl p-6 border border-border shadow-sm">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#f59e0b] to-[#ef4444] flex items-center justify-center mb-4">
            <Trophy className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-3xl font-bold mb-1">{stats.totalContests}</h3>
          <p className="text-sm text-muted-foreground">Total Contests</p>
        </div>
        <div className="bg-card rounded-2xl p-6 border border-border shadow-sm">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#4f46e5] to-[#8b5cf6] flex items-center justify-center mb-4">
            <TrendingUp className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-3xl font-bold mb-1">{stats.currentRating}</h3>
          <p className="text-sm text-muted-foreground">Current Rating</p>
        </div>
        <div className="bg-card rounded-2xl p-6 border border-border shadow-sm">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#10b981] to-[#06b6d4] flex items-center justify-center mb-4">
            <Award className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-3xl font-bold mb-1">{stats.bestGlobalRank}</h3>
          <p className="text-sm text-muted-foreground">Best Global Rank</p>
        </div>
        <div className="bg-card rounded-2xl p-6 border border-border shadow-sm">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#8b5cf6] to-[#ec4899] flex items-center justify-center mb-4">
            <Medal className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-3xl font-bold mb-1">{stats.avgSolveRate}%</h3>
          <p className="text-sm text-muted-foreground">Avg Solve Rate</p>
        </div>
      </div>

      {/* Rating Graph */}
      {stats.ratingHistory?.length > 0 && (
        <div className="bg-card rounded-2xl p-6 border border-border shadow-sm">
          <h3 className="text-lg font-semibold mb-6">Rating Progress</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={stats.ratingHistory}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="contest" stroke="#64748b" />
              <YAxis stroke="#64748b" />
              <Tooltip />
              <Line type="monotone" dataKey="rating" stroke="#4f46e5" strokeWidth={3} dot={{ fill: "#4f46e5", r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* Recent Contests */}
      <div className="bg-card rounded-2xl p-6 border border-border shadow-sm">
        <h3 className="text-lg font-semibold mb-6">Recent Contests</h3>
        <div className="space-y-4">
          {stats.recentContests?.slice().reverse().map((contest: any, index: number) => (
            <div key={index} className="border border-border rounded-xl p-5 hover:shadow-md transition-all">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h4 className="font-semibold text-lg mb-1">{contest.name}</h4>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span>{contest.platform}</span>
                    <span>•</span>
                    <span>{contest.date}</span>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  String(contest.rating).startsWith("+") ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                }`}>
                  {contest.rating}
                </span>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-accent/50 rounded-lg p-3">
                  <p className="text-xs text-muted-foreground mb-1">Global Rank</p>
                  <p className="font-semibold">#{contest.rank?.toLocaleString()} / {contest.totalParticipants?.toLocaleString()}</p>
                </div>
                <div className="bg-accent/50 rounded-lg p-3">
                  <p className="text-xs text-muted-foreground mb-1">Problems Solved</p>
                  <p className="font-semibold">{contest.solved}</p>
                </div>
                <div className="bg-accent/50 rounded-lg p-3">
                  <p className="text-xs text-muted-foreground mb-1">Percentile</p>
                  <p className="font-semibold">
                    Top {((contest.rank / contest.totalParticipants) * 100).toFixed(1)}%
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
