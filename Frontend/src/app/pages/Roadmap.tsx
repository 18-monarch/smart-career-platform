import { useEffect, useState } from "react";
import { CheckCircle, Circle, Clock, BookOpen, Code, Trophy } from "lucide-react";
import { getRoadmap, toggleMilestone } from "../../api/api";

export function Roadmap() {
  const [milestones, setMilestones] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userId = Number(localStorage.getItem("userId")) || 1;
    getRoadmap(userId)
      .then(setMilestones)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const handleToggle = async (id: number) => {
    const updated = await toggleMilestone(id);
    setMilestones((prev) =>
      prev.map((m) => (m.id === updated.id ? updated : m))
    );
  };

  // Group milestones by phase
  const phases = milestones.reduce((acc: any, m: any) => {
    if (!acc[m.phase]) acc[m.phase] = [];
    acc[m.phase].push(m);
    return acc;
  }, {});

  const completedCount = milestones.filter((m) => m.completed).length;
  const totalCount = milestones.length;
  const progressPct = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  if (loading) return <div className="p-6 text-center">Loading roadmap...</div>;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#4f46e5] to-[#8b5cf6] rounded-2xl p-8 text-white">
        <h1 className="text-3xl font-bold mb-2">Your Learning Roadmap</h1>
        <p className="text-lg opacity-90">Personalized Career Path</p>
        <div className="mt-4 flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5" />
            <span>{totalCount} milestones total</span>
          </div>
          <div className="flex items-center gap-2">
            <Trophy className="w-5 h-5" />
            <span>Progress: {progressPct}%</span>
          </div>
        </div>
        <div className="mt-4 bg-white/20 rounded-full h-2">
          <div className="bg-white rounded-full h-2 transition-all" style={{ width: `${progressPct}%` }}></div>
        </div>
      </div>

      {/* Progress Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-card rounded-xl p-4 border border-border">
          <p className="text-sm text-muted-foreground mb-1">Completed</p>
          <p className="text-2xl font-bold text-[#10b981]">{completedCount}</p>
          <p className="text-xs text-muted-foreground">Milestones done</p>
        </div>
        <div className="bg-card rounded-xl p-4 border border-border">
          <p className="text-sm text-muted-foreground mb-1">Remaining</p>
          <p className="text-2xl font-bold text-[#4f46e5]">{totalCount - completedCount}</p>
          <p className="text-xs text-muted-foreground">Yet to complete</p>
        </div>
        <div className="bg-card rounded-xl p-4 border border-border">
          <p className="text-sm text-muted-foreground mb-1">Overall</p>
          <p className="text-2xl font-bold text-[#f59e0b]">{progressPct}%</p>
          <p className="text-xs text-muted-foreground">Progress</p>
        </div>
      </div>

      {totalCount === 0 ? (
        <div className="bg-card rounded-2xl p-12 border border-border text-center text-muted-foreground">
          No roadmap milestones added yet. Use the API to build your personalized roadmap!
        </div>
      ) : (
        <div className="space-y-4">
          {Object.entries(phases).map(([phase, phaseMilestones]: [string, any], phaseIndex) => {
            const allDone = (phaseMilestones as any[]).every((m) => m.completed);
            const someDone = (phaseMilestones as any[]).some((m) => m.completed);
            const status = allDone ? "completed" : someDone ? "in-progress" : "pending";

            return (
              <div key={phase} className={`bg-card rounded-2xl border-2 ${
                status === "completed" ? "border-[#10b981]"
                : status === "in-progress" ? "border-[#4f46e5]"
                : "border-border"
              } overflow-hidden`}>
                <div className={`p-6 ${
                  status === "completed" ? "bg-gradient-to-r from-green-50 to-emerald-50"
                  : status === "in-progress" ? "bg-gradient-to-r from-indigo-50 to-purple-50"
                  : "bg-gray-50"
                }`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                        status === "completed" ? "bg-[#10b981] text-white"
                        : status === "in-progress" ? "bg-[#4f46e5] text-white"
                        : "bg-gray-300 text-gray-500"
                      }`}>
                        {status === "completed" ? <CheckCircle className="w-6 h-6" /> : <span className="font-bold">{phaseIndex + 1}</span>}
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold">{phase}</h3>
                        <p className="text-sm text-muted-foreground">
                          {phaseMilestones.filter((m: any) => m.completed).length}/{phaseMilestones.length} complete
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
                    {(phaseMilestones as any[]).map((m: any) => (
                      <div
                        key={m.id}
                        onClick={() => handleToggle(m.id)}
                        className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer hover:shadow-sm transition-all ${
                          m.completed ? "bg-green-50 border-green-200" : "bg-white border-border"
                        }`}
                      >
                        {m.completed ? (
                          <CheckCircle className="w-5 h-5 text-[#10b981]" />
                        ) : (
                          <Circle className="w-5 h-5 text-muted-foreground" />
                        )}
                        <span className="font-medium">{m.milestone}</span>
                      </div>
                    ))}
                  </div>

                  {status === "in-progress" && (
                    <div className="mt-4 flex gap-3">
                      <button className="flex-1 bg-[#4f46e5] text-white py-3 rounded-xl font-medium hover:bg-[#4338ca] transition-colors flex items-center justify-center gap-2">
                        <BookOpen className="w-5 h-5" />
                        Continue Learning
                      </button>
                      <button className="flex-1 border-2 border-[#4f46e5] text-[#4f46e5] py-3 rounded-xl font-medium hover:bg-indigo-50 transition-colors flex items-center justify-center gap-2">
                        <Code className="w-5 h-5" />
                        Practice Problems
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
