import { Code, FileText, MessageSquare, Layers, FolderKanban, CheckCircle } from "lucide-react";

const preparationSections = [
  {
    title: "Coding Preparation",
    icon: Code,
    gradient: "from-[#4f46e5] to-[#8b5cf6]",
    progress: 68,
    tasks: [
      { name: "Master Data Structures", completed: true },
      { name: "Algorithm Practice (200+ problems)", completed: true },
      { name: "Dynamic Programming", completed: false },
      { name: "Graph Algorithms", completed: false },
    ],
  },
  {
    title: "Resume Building",
    icon: FileText,
    gradient: "from-[#10b981] to-[#06b6d4]",
    progress: 85,
    tasks: [
      { name: "Create ATS-friendly resume", completed: true },
      { name: "Add 3-5 strong projects", completed: true },
      { name: "Quantify achievements", completed: true },
      { name: "Get resume reviewed", completed: false },
    ],
  },
  {
    title: "Interview Questions",
    icon: MessageSquare,
    gradient: "from-[#f59e0b] to-[#ef4444]",
    progress: 45,
    tasks: [
      { name: "Behavioral questions prep", completed: true },
      { name: "Technical interview practice", completed: false },
      { name: "Mock interviews (5+)", completed: false },
      { name: "STAR method mastery", completed: true },
    ],
  },
  {
    title: "System Design Basics",
    icon: Layers,
    gradient: "from-[#8b5cf6] to-[#ec4899]",
    progress: 30,
    tasks: [
      { name: "Learn design patterns", completed: true },
      { name: "Database design", completed: false },
      { name: "Scalability concepts", completed: false },
      { name: "Practice system design", completed: false },
    ],
  },
  {
    title: "Project Building",
    icon: FolderKanban,
    gradient: "from-[#06b6d4] to-[#4f46e5]",
    progress: 75,
    tasks: [
      { name: "Build full-stack project", completed: true },
      { name: "Deploy to production", completed: true },
      { name: "Add ML project", completed: true },
      { name: "Open source contributions", completed: false },
    ],
  },
];

const resources = [
  {
    title: "Cracking the Coding Interview",
    type: "Book",
    status: "In Progress",
    color: "bg-blue-100 text-blue-700",
  },
  {
    title: "LeetCode Premium",
    type: "Platform",
    status: "Active",
    color: "bg-green-100 text-green-700",
  },
  {
    title: "System Design Primer",
    type: "Guide",
    status: "Not Started",
    color: "bg-gray-100 text-gray-700",
  },
  {
    title: "Pramp - Mock Interviews",
    type: "Practice",
    status: "Active",
    color: "bg-purple-100 text-purple-700",
  },
];

export function InternshipPreparation() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-card rounded-2xl p-6 border border-border shadow-sm">
        <h1 className="text-2xl font-bold mb-2">Internship Preparation Roadmap</h1>
        <p className="text-muted-foreground">
          Complete these sections to maximize your chances of landing your dream internship
        </p>
      </div>

      {/* Overall Progress */}
      <div className="bg-gradient-to-r from-[#4f46e5] to-[#8b5cf6] rounded-2xl p-6 text-white">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold mb-1">Overall Readiness</h3>
            <p className="opacity-90">You're making great progress!</p>
          </div>
          <div className="text-4xl font-bold">61%</div>
        </div>
        <div className="bg-white/20 rounded-full h-3">
          <div className="bg-white rounded-full h-3 w-[61%]"></div>
        </div>
      </div>

      {/* Preparation Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {preparationSections.map((section, index) => (
          <div
            key={index}
            className="bg-card rounded-2xl border border-border shadow-sm hover:shadow-lg transition-all"
          >
            <div className={`h-2 bg-gradient-to-r ${section.gradient}`}></div>
            <div className="p-6">
              {/* Header */}
              <div className="flex items-center gap-4 mb-4">
                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${section.gradient} flex items-center justify-center`}
                >
                  <section.icon className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold mb-1">{section.title}</h3>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 bg-accent rounded-full h-2">
                      <div
                        className={`h-2 rounded-full bg-gradient-to-r ${section.gradient}`}
                        style={{ width: `${section.progress}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium text-muted-foreground">
                      {section.progress}%
                    </span>
                  </div>
                </div>
              </div>

              {/* Tasks */}
              <div className="space-y-2">
                {section.tasks.map((task, i) => (
                  <div
                    key={i}
                    className={`flex items-center gap-3 p-3 rounded-lg ${
                      task.completed ? "bg-green-50" : "bg-accent"
                    }`}
                  >
                    <div
                      className={`w-5 h-5 rounded-full flex items-center justify-center ${
                        task.completed ? "bg-[#10b981]" : "border-2 border-muted-foreground"
                      }`}
                    >
                      {task.completed && <CheckCircle className="w-4 h-4 text-white" />}
                    </div>
                    <span
                      className={`text-sm ${
                        task.completed ? "text-green-900 font-medium" : "text-foreground"
                      }`}
                    >
                      {task.name}
                    </span>
                  </div>
                ))}
              </div>

              {/* Action Button */}
              <button
                className={`w-full mt-4 py-3 rounded-xl bg-gradient-to-r ${section.gradient} text-white font-medium hover:shadow-lg transition-all`}
              >
                Continue Preparation
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Resources */}
      <div className="bg-card rounded-2xl p-6 border border-border shadow-sm">
        <h3 className="text-lg font-semibold mb-4">Recommended Resources</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {resources.map((resource, index) => (
            <div
              key={index}
              className="p-4 rounded-xl border border-border hover:shadow-md transition-all cursor-pointer"
            >
              <div className="flex items-start justify-between mb-2">
                <h4 className="font-semibold text-sm">{resource.title}</h4>
              </div>
              <p className="text-xs text-muted-foreground mb-2">{resource.type}</p>
              <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${resource.color}`}>
                {resource.status}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Tips */}
      <div className="bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-200 rounded-2xl p-6">
        <h3 className="text-lg font-semibold mb-3 text-amber-900">💡 Pro Tips</h3>
        <ul className="space-y-2 text-sm text-amber-900">
          <li className="flex items-start gap-2">
            <span className="text-amber-600 mt-1">•</span>
            <span>Start applying 3-4 months before your desired start date</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-amber-600 mt-1">•</span>
            <span>Practice coding problems daily, even if it's just 30 minutes</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-amber-600 mt-1">•</span>
            <span>Network with current interns and employees on LinkedIn</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-amber-600 mt-1">•</span>
            <span>Tailor your resume for each application</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
