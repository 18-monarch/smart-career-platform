import { Brain, Code, Shield, Trophy, TrendingUp, Clock, Target } from "lucide-react";

const careerPaths = [
  {
    title: "Machine Learning Engineer",
    icon: Brain,
    gradient: "from-[#4f46e5] to-[#8b5cf6]",
    skills: ["Python", "TensorFlow", "Deep Learning", "Statistics"],
    difficulty: "Advanced",
    duration: "12-18 months",
    demand: "Very High",
    salary: "$120k - $180k",
    description: "Build and deploy AI models that solve complex problems",
  },
  {
    title: "Full Stack Developer",
    icon: Code,
    gradient: "from-[#10b981] to-[#06b6d4]",
    skills: ["React", "Node.js", "Databases", "APIs"],
    difficulty: "Intermediate",
    duration: "8-12 months",
    demand: "High",
    salary: "$90k - $140k",
    description: "Create complete web applications from frontend to backend",
  },
  {
    title: "Data Scientist",
    icon: TrendingUp,
    gradient: "from-[#8b5cf6] to-[#ec4899]",
    skills: ["Python", "SQL", "Machine Learning", "Data Viz"],
    difficulty: "Advanced",
    duration: "10-16 months",
    demand: "Very High",
    salary: "$110k - $170k",
    description: "Extract insights and build predictive models from data",
  },
  {
    title: "Cybersecurity Analyst",
    icon: Shield,
    gradient: "from-[#f59e0b] to-[#ef4444]",
    skills: ["Security", "Networking", "Ethical Hacking", "Compliance"],
    difficulty: "Advanced",
    duration: "10-14 months",
    demand: "High",
    salary: "$95k - $150k",
    description: "Protect systems and networks from cyber threats",
  },
  {
    title: "Competitive Programmer",
    icon: Trophy,
    gradient: "from-[#06b6d4] to-[#4f46e5]",
    skills: ["Algorithms", "Data Structures", "Problem Solving", "C++"],
    difficulty: "Expert",
    duration: "12+ months",
    demand: "Medium",
    salary: "$100k - $200k",
    description: "Master algorithms and compete in coding contests",
  },
];

export function CareerPath() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#4f46e5] to-[#8b5cf6] rounded-2xl p-8 text-white">
        <h1 className="text-3xl font-bold mb-2">Choose Your Career Path</h1>
        <p className="text-lg opacity-90">
          Select a path that aligns with your interests and goals. We'll create a personalized roadmap for you.
        </p>
      </div>

      {/* Career Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {careerPaths.map((path, index) => (
          <div
            key={index}
            className="bg-card rounded-2xl border border-border shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group"
          >
            <div className={`h-2 bg-gradient-to-r ${path.gradient}`}></div>
            <div className="p-6">
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div
                    className={`w-14 h-14 rounded-xl bg-gradient-to-br ${path.gradient} flex items-center justify-center`}
                  >
                    <path.icon className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-1">{path.title}</h3>
                    <p className="text-sm text-muted-foreground">{path.description}</p>
                  </div>
                </div>
              </div>

              {/* Skills */}
              <div className="mb-4">
                <p className="text-sm font-medium mb-2">Required Skills:</p>
                <div className="flex flex-wrap gap-2">
                  {path.skills.map((skill, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-accent text-accent-foreground rounded-full text-xs font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Metrics */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="bg-accent/50 rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-1">
                    <Target className="w-4 h-4 text-muted-foreground" />
                    <p className="text-xs text-muted-foreground">Difficulty</p>
                  </div>
                  <p className="font-semibold">{path.difficulty}</p>
                </div>
                <div className="bg-accent/50 rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-1">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <p className="text-xs text-muted-foreground">Duration</p>
                  </div>
                  <p className="font-semibold">{path.duration}</p>
                </div>
                <div className="bg-accent/50 rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-1">
                    <TrendingUp className="w-4 h-4 text-muted-foreground" />
                    <p className="text-xs text-muted-foreground">Demand</p>
                  </div>
                  <p className="font-semibold">{path.demand}</p>
                </div>
                <div className="bg-accent/50 rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-1">
                    <TrendingUp className="w-4 h-4 text-muted-foreground" />
                    <p className="text-xs text-muted-foreground">Salary Range</p>
                  </div>
                  <p className="font-semibold text-sm">{path.salary}</p>
                </div>
              </div>

              {/* Action Button */}
              <button
                className={`w-full py-3 rounded-xl bg-gradient-to-r ${path.gradient} text-white font-medium hover:shadow-lg transition-all`}
              >
                Select This Path
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
