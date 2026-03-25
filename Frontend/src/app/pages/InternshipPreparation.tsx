import { CheckCircle, Circle, Clock, BookOpen, Video, MessageSquare, Code, FileText, ChevronRight, TrendingUp } from "lucide-react";
import { useEffect, useState } from "react";
import { getInternshipPrep } from "../../api/api";

const iconMap: Record<string, any> = {
  Code: Code,
  FileText: FileText,
  MessageSquare: MessageSquare,
  BookOpen: BookOpen,
  Video: Video,
};

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
  const [sections, setSections] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getInternshipPrep()
      .then(setSections)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const activeSections = sections.length > 0 ? sections : [
      {
          title: "Coding Preparation",
          icon: "Code",
          progress: 65,
          tasks: ["Master Data Structures", "Algorithm Practice"]
      }
  ];

  const overallProgress = Math.round(activeSections.reduce((acc, s) => acc + s.progress, 0) / activeSections.length);
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
          <div className="text-4xl font-bold">{overallProgress}%</div>
        </div>
        <div className="bg-white/20 rounded-full h-3">
          <div className="bg-white rounded-full h-3" style={{ width: `${overallProgress}%` }}></div>
        </div>
      </div>

      {/* Preparation Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {activeSections.map((section: any, index: number) => {
          const IconComponent = iconMap[section.icon] || BookOpen;
          const gradient = section.gradient || "from-[#4f46e5] to-[#8b5cf6]";
          return (
            <div
              key={index}
              className="bg-card rounded-2xl border border-border shadow-sm hover:shadow-lg transition-all"
            >
              <div className={`h-2 bg-gradient-to-r ${gradient}`}></div>
              <div className="p-6">
                {/* Header */}
                <div className="flex items-center gap-4 mb-4">
                  <div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center`}
                  >
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold mb-1">{section.title}</h3>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-accent rounded-full h-2">
                        <div
                          className={`h-2 rounded-full bg-gradient-to-r ${gradient}`}
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
                  {(section.tasks || []).map((task: any, i: number) => {
                    const isObj = typeof task === 'object';
                    const name = isObj ? task.name : task;
                    const completed = isObj ? task.completed : false;
                    return (
                      <div
                        key={i}
                        className={`flex items-center gap-3 p-3 rounded-lg ${
                          completed ? "bg-green-50" : "bg-accent"
                        }`}
                      >
                        <div
                          className={`w-5 h-5 rounded-full flex items-center justify-center ${
                            completed ? "bg-[#10b981]" : "border-2 border-muted-foreground"
                          }`}
                        >
                          {completed && <CheckCircle className="w-4 h-4 text-white" />}
                        </div>
                        <span
                          className={`text-sm ${
                            completed ? "text-green-900 font-medium" : "text-foreground"
                          }`}
                        >
                          {name}
                        </span>
                      </div>
                    );
                  })}
                </div>

                {/* Action Button */}
                <button
                  className={`w-full mt-4 py-3 rounded-xl bg-gradient-to-r ${gradient} text-white font-medium hover:shadow-lg transition-all`}
                >
                  Continue Preparation
                </button>
              </div>
            </div>
          );
        })}
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
