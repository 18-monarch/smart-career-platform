import { useEffect, useState } from "react";
import { Briefcase, DollarSign, Star, Bookmark } from "lucide-react";
import { getJobRecommendations } from "../../api/api";

export function JobRecommendation() {
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userId = Number(localStorage.getItem("userId")) || 1;
    getJobRecommendations(userId)
      .then(setJobs)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const gradients = [
    "from-[#4f46e5] to-[#8b5cf6]",
    "from-[#10b981] to-[#06b6d4]",
    "from-[#f59e0b] to-[#ef4444]",
    "from-[#8b5cf6] to-[#ec4899]",
    "from-[#06b6d4] to-[#4f46e5]",
  ];

  if (loading) return <div className="p-6 text-center">Loading job recommendations...</div>;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#4f46e5] to-[#8b5cf6] rounded-2xl p-8 text-white">
        <h1 className="text-3xl font-bold mb-2">Job Recommendations</h1>
        <p className="text-lg opacity-90">
          AI-matched job opportunities based on your skills profile
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-card rounded-xl p-4 border border-border">
          <p className="text-sm text-muted-foreground mb-1">Matched Jobs</p>
          <p className="text-2xl font-bold">{jobs.length}</p>
        </div>
        <div className="bg-card rounded-xl p-4 border border-border">
          <p className="text-sm text-muted-foreground mb-1">High Match (80%+)</p>
          <p className="text-2xl font-bold text-[#10b981]">{jobs.filter((j) => parseInt(j.match) >= 80).length}</p>
        </div>
        <div className="bg-card rounded-xl p-4 border border-border">
          <p className="text-sm text-muted-foreground mb-1">Based On</p>
          <p className="text-lg font-bold text-[#4f46e5]">Your Skills Profile</p>
        </div>
      </div>

      {jobs.length === 0 ? (
        <div className="bg-card rounded-2xl p-12 border border-border text-center text-muted-foreground">
          Add your skills in the Skill Gap page first, then come back for personalized job recommendations!
        </div>
      ) : (
        <div className="space-y-4">
          {jobs.map((job: any, index: number) => (
            <div key={index} className="bg-card rounded-2xl border border-border shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden">
              <div className={`h-1.5 bg-gradient-to-r ${gradients[index % gradients.length]}`}></div>
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-4 flex-1">
                    <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${gradients[index % gradients.length]} flex items-center justify-center text-white text-2xl font-bold flex-shrink-0`}>
                      {job.company?.charAt(0) || "J"}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="text-xl font-semibold mb-1">{job.title}</h3>
                          <p className="text-sm text-muted-foreground">{job.company}</p>
                        </div>
                        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-green-100">
                          <Star className="w-4 h-4 text-green-600 fill-green-600" />
                          <span className="text-sm font-semibold text-green-700">{job.match} Match</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-4">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Briefcase className="w-4 h-4" />
                          <span>{job.type}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm font-medium text-[#10b981]">
                          <DollarSign className="w-4 h-4" />
                          <span>{job.salary}</span>
                        </div>
                      </div>

                      <div className="mb-4">
                        <div className="flex flex-wrap gap-2">
                          {job.skills?.split(", ").map((skill: string, i: number) => (
                            <span key={i} className="px-3 py-1 bg-accent text-accent-foreground rounded-full text-xs font-medium">
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="flex items-center justify-end gap-2">
                        <button className="px-6 py-2 bg-[#4f46e5] text-white rounded-lg font-medium hover:bg-[#4338ca] transition-colors">
                          Apply Now
                        </button>
                        <button className="p-2 border border-border rounded-lg hover:bg-accent transition-colors">
                          <Bookmark className="w-5 h-5 text-muted-foreground" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
