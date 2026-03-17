import { useEffect, useState } from "react";
import { AlertCircle, TrendingUp, CheckCircle, ArrowRight } from "lucide-react";
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer } from "recharts";
import { getSkillGap } from "../../api/api";

export function SkillGap() {
  const [skills, setSkills] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userId = Number(localStorage.getItem("userId")) || 1;
    getSkillGap(userId)
      .then(setSkills)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const radarData = skills.map((s) => ({
    skill: s.skillName,
    current: s.currentLevel * 10,
    required: s.targetLevel * 10,
  }));

  const avgReadiness = skills.length
    ? Math.round(skills.reduce((sum, s) => sum + (s.currentLevel / s.targetLevel) * 100, 0) / skills.length)
    : 0;

  const prioritySkills = skills
    .filter((s) => s.gap > 0)
    .sort((a, b) => b.gap - a.gap);

  if (loading) return <div className="p-6 text-center">Loading skill gap analysis...</div>;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-card rounded-2xl p-6 border border-border shadow-sm">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#f59e0b] to-[#ef4444] flex items-center justify-center">
            <AlertCircle className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Skill Gap Analysis</h1>
            <p className="text-muted-foreground">
              {skills.length === 0 ? "Add your skills to see gap analysis" : `Tracking ${skills.length} skills`}
            </p>
          </div>
        </div>
      </div>

      {skills.length === 0 ? (
        <div className="bg-card rounded-2xl p-12 border border-border text-center text-muted-foreground">
          No skills added yet. Use the API to add your skills and get a personalized gap analysis!
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Radar Chart */}
          <div className="lg:col-span-2 bg-card rounded-2xl p-6 border border-border shadow-sm">
            <h3 className="text-lg font-semibold mb-6">Skills Comparison</h3>
            <ResponsiveContainer width="100%" height={400}>
              <RadarChart data={radarData}>
                <PolarGrid stroke="#e5e7eb" />
                <PolarAngleAxis dataKey="skill" stroke="#64748b" />
                <PolarRadiusAxis angle={90} domain={[0, 100]} stroke="#64748b" />
                <Radar name="Current Level" dataKey="current" stroke="#4f46e5" fill="#4f46e5" fillOpacity={0.3} />
                <Radar name="Target Level" dataKey="required" stroke="#10b981" fill="#10b981" fillOpacity={0.3} />
              </RadarChart>
            </ResponsiveContainer>
            <div className="flex items-center justify-center gap-6 mt-4">
              <div className="flex items-center gap-2"><div className="w-4 h-4 rounded bg-[#4f46e5]"></div><span className="text-sm text-muted-foreground">Your Current Level</span></div>
              <div className="flex items-center gap-2"><div className="w-4 h-4 rounded bg-[#10b981]"></div><span className="text-sm text-muted-foreground">Required Level</span></div>
            </div>
          </div>

          {/* Overall Progress */}
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-[#4f46e5] to-[#8b5cf6] rounded-2xl p-6 text-white shadow-lg">
              <TrendingUp className="w-8 h-8 mb-3" />
              <h3 className="text-lg font-semibold mb-2">Overall Readiness</h3>
              <div className="text-4xl font-bold mb-2">{avgReadiness}%</div>
              <p className="text-sm opacity-90">You're {100 - avgReadiness}% away from your skill targets</p>
              <div className="mt-4 bg-white/20 rounded-full h-2">
                <div className="bg-white rounded-full h-2" style={{ width: `${avgReadiness}%` }}></div>
              </div>
            </div>

            <div className="bg-card rounded-2xl p-6 border border-border shadow-sm">
              <h3 className="text-lg font-semibold mb-4">Skills Breakdown</h3>
              <div className="space-y-3">
                {skills.map((skill, index) => (
                  <div key={index}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium">{skill.skillName}</span>
                      <span className="text-sm text-muted-foreground">{skill.currentLevel}/{skill.targetLevel}</span>
                    </div>
                    <div className="bg-accent rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${skill.currentLevel >= skill.targetLevel ? "bg-[#10b981]" : "bg-[#4f46e5]"}`}
                        style={{ width: `${Math.min((skill.currentLevel / skill.targetLevel) * 100, 100)}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Priority Skills */}
      {prioritySkills.length > 0 && (
        <div className="bg-card rounded-2xl p-6 border border-border shadow-sm">
          <h3 className="text-lg font-semibold mb-6">Priority Learning Areas</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {prioritySkills.map((skill, index) => (
              <div key={index} className="border border-border rounded-xl p-4 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="font-semibold mb-1">{skill.skillName}</h4>
                    <p className="text-sm text-muted-foreground">Gap: {skill.gap} levels</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    skill.gap >= 4 ? "bg-red-100 text-red-700"
                    : skill.gap >= 2 ? "bg-yellow-100 text-yellow-700"
                    : "bg-green-100 text-green-700"
                  }`}>
                    {skill.gap >= 4 ? "High" : skill.gap >= 2 ? "Medium" : "Low"} Priority
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-[#10b981] mt-0.5 flex-shrink-0" />
                  <span className="text-sm">Improve from level {skill.currentLevel} → {skill.targetLevel} through practice and study</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Action Button */}
      <div className="bg-gradient-to-r from-[#4f46e5] to-[#8b5cf6] rounded-2xl p-6 text-white flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold mb-1">Ready to bridge the gap?</h3>
          <p className="opacity-90">We'll create a personalized learning roadmap for you</p>
        </div>
        <button className="bg-white text-[#4f46e5] px-6 py-3 rounded-xl font-medium hover:bg-gray-100 transition-colors flex items-center gap-2">
          Generate Roadmap
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
