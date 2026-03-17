import { FileText, Upload, CheckCircle, AlertCircle, TrendingUp, Download } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const scoreData = [
  { name: "Score", value: 78, color: "#4f46e5" },
  { name: "Remaining", value: 22, color: "#e5e7eb" },
];

const sections = [
  { name: "Contact Information", status: "complete", score: 100 },
  { name: "Professional Summary", status: "good", score: 85 },
  { name: "Work Experience", status: "good", score: 80 },
  { name: "Education", status: "complete", score: 100 },
  { name: "Skills", status: "warning", score: 65 },
  { name: "Projects", status: "good", score: 75 },
  { name: "Achievements", status: "missing", score: 0 },
];

const suggestions = [
  {
    type: "critical",
    title: "Add Quantifiable Achievements",
    description: "Use numbers and metrics to demonstrate impact (e.g., 'Improved performance by 40%')",
  },
  {
    type: "important",
    title: "Optimize for ATS",
    description: "Include more relevant keywords from the job description",
  },
  {
    type: "suggestion",
    title: "Improve Skills Section",
    description: "Group skills by category (Technical, Soft Skills, Tools)",
  },
  {
    type: "suggestion",
    title: "Add Action Verbs",
    description: "Start bullet points with strong action verbs (Led, Developed, Implemented)",
  },
];

export function ResumeAnalyzer() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-card rounded-2xl p-6 border border-border shadow-sm">
        <h1 className="text-2xl font-bold mb-2">Resume Analyzer</h1>
        <p className="text-muted-foreground">
          Upload your resume to get AI-powered feedback and optimization suggestions
        </p>
      </div>

      {/* Upload Area */}
      <div className="bg-card rounded-2xl p-8 border-2 border-dashed border-border shadow-sm text-center">
        <div className="max-w-md mx-auto">
          <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-gradient-to-br from-[#4f46e5] to-[#8b5cf6] flex items-center justify-center">
            <Upload className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-lg font-semibold mb-2">Upload Your Resume</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Supports PDF, DOC, DOCX (Max 5MB)
          </p>
          <button className="px-6 py-3 bg-[#4f46e5] text-white rounded-xl font-medium hover:bg-[#4338ca] transition-colors">
            Choose File
          </button>
          <p className="text-xs text-muted-foreground mt-3">
            Sample resume already analyzed below
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Score Overview */}
        <div className="bg-card rounded-2xl p-6 border border-border shadow-sm">
          <h3 className="text-lg font-semibold mb-6 text-center">Resume Score</h3>
          <div className="relative">
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={scoreData}
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={90}
                  startAngle={90}
                  endAngle={-270}
                  dataKey="value"
                >
                  {scoreData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-4xl font-bold text-[#4f46e5]">78</div>
                <div className="text-sm text-muted-foreground">out of 100</div>
              </div>
            </div>
          </div>
          <div className="mt-6 text-center">
            <p className="text-sm font-medium text-[#10b981] mb-2">Good Resume</p>
            <p className="text-xs text-muted-foreground">
              Your resume is above average. Follow the suggestions below to improve.
            </p>
          </div>
        </div>

        {/* Section Analysis */}
        <div className="lg:col-span-2 bg-card rounded-2xl p-6 border border-border shadow-sm">
          <h3 className="text-lg font-semibold mb-6">Section Analysis</h3>
          <div className="space-y-3">
            {sections.map((section, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 rounded-xl bg-accent"
              >
                <div className="flex items-center gap-3">
                  {section.status === "complete" ? (
                    <CheckCircle className="w-5 h-5 text-[#10b981]" />
                  ) : section.status === "missing" ? (
                    <AlertCircle className="w-5 h-5 text-[#ef4444]" />
                  ) : section.status === "warning" ? (
                    <AlertCircle className="w-5 h-5 text-[#f59e0b]" />
                  ) : (
                    <TrendingUp className="w-5 h-5 text-[#4f46e5]" />
                  )}
                  <span className="font-medium">{section.name}</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-24 bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${
                        section.status === "complete"
                          ? "bg-[#10b981]"
                          : section.status === "missing"
                          ? "bg-[#ef4444]"
                          : section.status === "warning"
                          ? "bg-[#f59e0b]"
                          : "bg-[#4f46e5]"
                      }`}
                      style={{ width: `${section.score}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-semibold w-12 text-right">{section.score}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Suggestions */}
      <div className="bg-card rounded-2xl p-6 border border-border shadow-sm">
        <h3 className="text-lg font-semibold mb-6">Improvement Suggestions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {suggestions.map((suggestion, index) => (
            <div
              key={index}
              className={`p-4 rounded-xl border-2 ${
                suggestion.type === "critical"
                  ? "bg-red-50 border-red-200"
                  : suggestion.type === "important"
                  ? "bg-amber-50 border-amber-200"
                  : "bg-blue-50 border-blue-200"
              }`}
            >
              <div className="flex items-start gap-3">
                <div
                  className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                    suggestion.type === "critical"
                      ? "bg-red-500"
                      : suggestion.type === "important"
                      ? "bg-amber-500"
                      : "bg-blue-500"
                  }`}
                >
                  <AlertCircle className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">{suggestion.title}</h4>
                  <p className="text-sm text-muted-foreground">{suggestion.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Keyword Analysis */}
      <div className="bg-card rounded-2xl p-6 border border-border shadow-sm">
        <h3 className="text-lg font-semibold mb-6">ATS Keyword Match</h3>
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Keyword Coverage</span>
            <span className="text-sm font-bold text-[#4f46e5]">68%</span>
          </div>
          <div className="bg-accent rounded-full h-3">
            <div className="h-3 rounded-full bg-gradient-to-r from-[#4f46e5] to-[#8b5cf6] w-[68%]"></div>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="p-3 bg-green-50 rounded-lg">
            <p className="text-xs text-muted-foreground mb-1">Found</p>
            <p className="text-lg font-bold text-green-700">12</p>
          </div>
          <div className="p-3 bg-red-50 rounded-lg">
            <p className="text-xs text-muted-foreground mb-1">Missing</p>
            <p className="text-lg font-bold text-red-700">6</p>
          </div>
          <div className="p-3 bg-blue-50 rounded-lg">
            <p className="text-xs text-muted-foreground mb-1">Suggested</p>
            <p className="text-lg font-bold text-blue-700">8</p>
          </div>
          <div className="p-3 bg-purple-50 rounded-lg">
            <p className="text-xs text-muted-foreground mb-1">Relevance</p>
            <p className="text-lg font-bold text-purple-700">High</p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4">
        <button className="flex-1 bg-gradient-to-r from-[#4f46e5] to-[#8b5cf6] text-white py-3 rounded-xl font-medium hover:shadow-lg transition-all flex items-center justify-center gap-2">
          <Download className="w-5 h-5" />
          Download Detailed Report
        </button>
        <button className="flex-1 border-2 border-[#4f46e5] text-[#4f46e5] py-3 rounded-xl font-medium hover:bg-indigo-50 transition-all">
          Optimize Resume
        </button>
      </div>
    </div>
  );
}
