import { Briefcase, MapPin, DollarSign, Clock, Star, ExternalLink } from "lucide-react";
import { useState, useEffect } from "react";
import { getJobRecommendations } from "../../api/api";

const filters = ["All", "Remote", "On-site", "Hybrid"];

const internships = [
  {
    company: "Google",
    logo: "G",
    role: "Machine Learning Intern",
    location: "Mountain View, CA",
    type: "Remote",
    duration: "3 months",
    stipend: "$8,000/month",
    matchPercentage: 95,
    requiredSkills: ["Python", "TensorFlow", "Machine Learning", "Statistics"],
    gradient: "from-[#4285F4] to-[#34A853]",
  },
  {
    company: "Microsoft",
    logo: "M",
    role: "Software Engineering Intern",
    location: "Redmond, WA",
    type: "Hybrid",
    duration: "4 months",
    stipend: "$7,500/month",
    matchPercentage: 88,
    requiredSkills: ["C++", "Data Structures", "Algorithms", "System Design"],
    gradient: "from-[#0078D4] to-[#50E6FF]",
  },
  {
    company: "Meta",
    logo: "F",
    role: "Data Science Intern",
    location: "Menlo Park, CA",
    type: "On-site",
    duration: "3 months",
    stipend: "$8,500/month",
    matchPercentage: 91,
    requiredSkills: ["Python", "SQL", "Data Analysis", "Machine Learning"],
    gradient: "from-[#0081FB] to-[#0668E1]",
  },
  {
    company: "Amazon",
    logo: "A",
    role: "ML Engineering Intern",
    location: "Seattle, WA",
    type: "Remote",
    duration: "3 months",
    stipend: "$7,000/month",
    matchPercentage: 85,
    requiredSkills: ["Python", "AWS", "Machine Learning", "Deep Learning"],
    gradient: "from-[#FF9900] to-[#146EB4]",
  },
  {
    company: "Netflix",
    logo: "N",
    role: "Backend Engineering Intern",
    location: "Los Gatos, CA",
    type: "Hybrid",
    duration: "4 months",
    stipend: "$7,800/month",
    matchPercentage: 82,
    requiredSkills: ["Java", "Microservices", "Databases", "APIs"],
    gradient: "from-[#E50914] to-[#B20710]",
  },
  {
    company: "Apple",
    logo: "A",
    role: "iOS Development Intern",
    location: "Cupertino, CA",
    type: "On-site",
    duration: "3 months",
    stipend: "$8,200/month",
    matchPercentage: 78,
    requiredSkills: ["Swift", "iOS", "Mobile Development", "UI/UX"],
    gradient: "from-[#000000] to-[#555555]",
  },
];

export function InternshipRecommendation() {
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [internshipsList, setInternshipsList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getJobRecommendations()
      .then((res) => {
          // Adapt backend job data to frontend internship structure if needed
          const adapted = res.map((job: any) => ({
              role: job.title,
              company: job.company,
              stipend: job.salary,
              type: job.type,
              matchPercentage: parseInt(job.match) || 85,
              location: "Remote",
              duration: "3 months",
              requiredSkills: job.skills.split(", "),
              gradient: "from-indigo-500 to-purple-500",
              logo: job.company.charAt(0)
          }));
          setInternshipsList(adapted);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const displayInternships = internshipsList.length > 0 ? internshipsList : internships;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#4f46e5] to-[#8b5cf6] rounded-2xl p-8 text-white">
        <h1 className="text-3xl font-bold mb-2">Internship Recommendations</h1>
        <p className="text-lg opacity-90">
          AI-matched opportunities based on your skills and career goals
        </p>
      </div>

      {/* Filters */}
      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setSelectedFilter(filter)}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                selectedFilter === filter
                  ? "bg-[#4f46e5] text-white shadow-md"
                  : "bg-card border border-border text-muted-foreground hover:bg-accent"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
        <button className="px-4 py-2 rounded-lg border border-border bg-card hover:bg-accent transition-colors">
          <span className="flex items-center gap-2">
            More Filters
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </span>
        </button>
      </div>

      {/* Internship Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {displayInternships.map((internship, index) => (
          <div
            key={index}
            className="bg-card rounded-2xl border border-border shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden"
          >
            {/* Company Header */}
            <div className={`h-2 bg-gradient-to-r ${internship.gradient}`}></div>
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div
                    className={`w-14 h-14 rounded-xl bg-gradient-to-br ${internship.gradient} flex items-center justify-center text-white text-2xl font-bold`}
                  >
                    {internship.logo}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-1">{internship.role}</h3>
                    <p className="text-sm text-muted-foreground">{internship.company}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-green-100">
                  <Star className="w-4 h-4 text-green-600 fill-green-600" />
                  <span className="text-sm font-semibold text-green-700">
                    {internship.matchPercentage}% Match
                  </span>
                </div>
              </div>

              {/* Details */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="w-4 h-4" />
                  <span>{internship.location}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Briefcase className="w-4 h-4" />
                  <span>{internship.type}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="w-4 h-4" />
                  <span>{internship.duration}</span>
                </div>
                <div className="flex items-center gap-2 text-sm font-medium text-[#10b981]">
                  <DollarSign className="w-4 h-4" />
                  <span>{internship.stipend}</span>
                </div>
              </div>

              {/* Required Skills */}
              <div className="mb-4">
                <p className="text-sm font-medium mb-2">Required Skills:</p>
                <div className="flex flex-wrap gap-2">
                  {(internship.requiredSkills || []).map((skill: string, i: number) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-white/20 rounded-full text-xs font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <button
                  className={`flex-1 py-3 rounded-xl bg-gradient-to-r ${internship.gradient} text-white font-medium hover:shadow-lg transition-all flex items-center justify-center gap-2`}
                >
                  Apply Now
                  <ExternalLink className="w-4 h-4" />
                </button>
                <button className="px-4 py-3 rounded-xl border-2 border-border hover:bg-accent transition-colors">
                  <svg
                    className="w-5 h-5 text-muted-foreground"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
