import {
  Upload,
  CheckCircle,
  AlertCircle,
  TrendingUp,
  Download,
  FileText,
  Loader2,
  RefreshCw
} from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { useState, useRef } from "react";
import { getResumeAnalysis, uploadResumeForAnalysis } from "../../api/api";

type ResumeSection = {
  name: string;
  status: "complete" | "good" | "warning" | "missing";
  score: number;
};

type ResumeSuggestion = {
  type: "critical" | "important" | "minor";
  title: string;
  description: string;
};

type ResumeKeywords = {
  coverage: number;
  found: number;
  missing: number;
  suggested: number;
  relevance: string;
};

type ResumeAnalysisResponse = {
  score?: number;
  status?: string;
  message?: string;
  sections?: ResumeSection[];
  suggestions?: ResumeSuggestion[];
  keywords?: ResumeKeywords;
};

const defaultSections: ResumeSection[] = [
  { name: "Contact Information", status: "complete", score: 100 },
  { name: "Professional Summary", status: "good", score: 85 },
  { name: "Work Experience", status: "good", score: 80 },
  { name: "Education", status: "complete", score: 100 },
  { name: "Skills", status: "warning", score: 65 },
  { name: "Projects", status: "good", score: 75 },
  { name: "Achievements", status: "missing", score: 0 }
];

const defaultSuggestions: ResumeSuggestion[] = [
  {
    type: "critical",
    title: "Add Quantifiable Achievements",
    description:
      "Use numbers and metrics to demonstrate impact, for example improved performance by 40%."
  },
  {
    type: "important",
    title: "Optimize for ATS",
    description:
      "Include more relevant job-specific keywords so your resume matches ATS screening better."
  },
  {
    type: "minor",
    title: "Improve Skills Section",
    description:
      "Organize technical skills into categories such as frontend, backend, tools, and databases."
  },
  {
    type: "minor",
    title: "Add Action Verbs",
    description:
      "Start bullet points with stronger verbs such as Built, Developed, Led, Designed, or Implemented."
  }
];

const defaultKeywords: ResumeKeywords = {
  coverage: 68,
  found: 12,
  missing: 6,
  suggested: 8,
  relevance: "High"
};

export function ResumeAnalyzer() {
  const [data, setData] = useState<ResumeAnalysisResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const loadInitialAnalysis = async () => {
    setInitialLoading(true);
    setError("");

    try {
      const res = await getResumeAnalysis();
      setData(res || null);
    } catch (err) {
      console.error("Initial resume analysis fetch failed:", err);
      setData(null);
    } finally {
      setInitialLoading(false);
    }
  };

  // initial load
  useState(() => {
    loadInitialAnalysis();
  });

  const handleChooseFile = () => {
    fileInputRef.current?.click();
  };

  const validateFile = (file: File) => {
    const allowedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ];

    const maxSize = 5 * 1024 * 1024;

    if (!allowedTypes.includes(file.type)) {
      return "Only PDF, DOC, and DOCX files are allowed.";
    }

    if (file.size > maxSize) {
      return "File size must be 5MB or less.";
    }

    return "";
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const validationError = validateFile(file);
    if (validationError) {
      setSelectedFile(null);
      setError(validationError);
      return;
    }

    setSelectedFile(file);
    setError("");
  };

  const handleAnalyzeResume = async () => {
    if (!selectedFile) {
      setError("Please choose a resume file first.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await uploadResumeForAnalysis(selectedFile);
      setData(res || null);
    } catch (err) {
      console.error("Resume upload/analyze failed:", err);
      setError("Failed to analyze resume. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadReport = () => {
    const report = {
      fileName: selectedFile?.name || "resume-analysis",
      generatedAt: new Date().toISOString(),
      score: data?.score ?? 78,
      status: data?.status ?? "Good Resume",
      message:
        data?.message ??
        "Your resume is above average. Follow the suggestions below to improve.",
      sections: data?.sections ?? defaultSections,
      suggestions: data?.suggestions ?? defaultSuggestions,
      keywords: data?.keywords ?? defaultKeywords
    };

    const blob = new Blob([JSON.stringify(report, null, 2)], {
      type: "application/json"
    });

    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "resume-analysis-report.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  const analysisScore = data?.score ?? 78;

  const scoreData = [
    { name: "Score", value: analysisScore, color: "#4f46e5" },
    { name: "Remaining", value: 100 - analysisScore, color: "#e5e7eb" }
  ];

  const analysisSections = data?.sections ?? defaultSections;
  const analysisSuggestions = data?.suggestions ?? defaultSuggestions;
  const keywords = data?.keywords ?? defaultKeywords;

  const getStatusIcon = (status: ResumeSection["status"]) => {
    if (status === "complete") {
      return <CheckCircle className="w-5 h-5 text-[#10b981]" />;
    }

    if (status === "missing") {
      return <AlertCircle className="w-5 h-5 text-[#ef4444]" />;
    }

    if (status === "warning") {
      return <AlertCircle className="w-5 h-5 text-[#f59e0b]" />;
    }

    return <TrendingUp className="w-5 h-5 text-[#4f46e5]" />;
  };

  const getSectionBarClass = (status: ResumeSection["status"]) => {
    if (status === "complete") return "bg-[#10b981]";
    if (status === "missing") return "bg-[#ef4444]";
    if (status === "warning") return "bg-[#f59e0b]";
    return "bg-[#4f46e5]";
  };

  const getSuggestionCardClass = (type: ResumeSuggestion["type"]) => {
    if (type === "critical") return "bg-red-50 border-red-200";
    if (type === "important") return "bg-amber-50 border-amber-200";
    return "bg-blue-50 border-blue-200";
  };

  const getSuggestionIconClass = (type: ResumeSuggestion["type"]) => {
    if (type === "critical") return "bg-red-500";
    if (type === "important") return "bg-amber-500";
    return "bg-blue-500";
  };

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

          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,.doc,.docx"
            className="hidden"
            onChange={handleFileChange}
          />

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={handleChooseFile}
              className="px-6 py-3 bg-[#4f46e5] text-white rounded-xl font-medium hover:bg-[#4338ca] transition-colors"
            >
              Choose File
            </button>

            <button
              onClick={handleAnalyzeResume}
              disabled={loading || !selectedFile}
              className="px-6 py-3 border border-[#4f46e5] text-[#4f46e5] rounded-xl font-medium hover:bg-indigo-50 transition-colors disabled:opacity-50"
            >
              {loading ? "Analyzing..." : "Analyze Resume"}
            </button>
          </div>

          {selectedFile && (
            <div className="mt-4 flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <FileText className="w-4 h-4" />
              <span>{selectedFile.name}</span>
            </div>
          )}

          {error && (
            <p className="mt-3 text-sm text-red-500">{error}</p>
          )}

          <p className="text-xs text-muted-foreground mt-3">
            Existing sample analysis is shown below until you upload and analyze a real resume
          </p>
        </div>
      </div>

      {(initialLoading || loading) && (
        <div className="bg-card rounded-2xl p-6 border border-border shadow-sm flex items-center justify-center gap-3">
          <Loader2 className="w-5 h-5 animate-spin text-[#4f46e5]" />
          <span className="text-sm text-muted-foreground">
            {initialLoading ? "Loading analysis..." : "Analyzing your resume..."}
          </span>
        </div>
      )}

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
                    <Cell key={`score-cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>

            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-4xl font-bold text-[#4f46e5]">{analysisScore}</div>
                <div className="text-sm text-muted-foreground">out of 100</div>
              </div>
            </div>
          </div>

          <div className="mt-6 text-center">
            <p className="text-sm font-medium text-[#10b981] mb-2">
              {data?.status || "Good Resume"}
            </p>
            <p className="text-xs text-muted-foreground">
              {data?.message ||
                "Your resume is above average. Follow the suggestions below to improve."}
            </p>
          </div>
        </div>

        {/* Section Analysis */}
        <div className="lg:col-span-2 bg-card rounded-2xl p-6 border border-border shadow-sm">
          <h3 className="text-lg font-semibold mb-6">Section Analysis</h3>

          <div className="space-y-3">
            {analysisSections.map((section, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 rounded-xl bg-accent"
              >
                <div className="flex items-center gap-3">
                  {getStatusIcon(section.status)}
                  <span className="font-medium">{section.name}</span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-24 bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${getSectionBarClass(section.status)}`}
                      style={{ width: `${section.score}%` }}
                    />
                  </div>
                  <span className="text-sm font-semibold w-12 text-right">
                    {section.score}%
                  </span>
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
          {analysisSuggestions.map((suggestion, index) => (
            <div
              key={index}
              className={`p-4 rounded-xl border-2 ${getSuggestionCardClass(suggestion.type)}`}
            >
              <div className="flex items-start gap-3">
                <div
                  className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${getSuggestionIconClass(
                    suggestion.type
                  )}`}
                >
                  <AlertCircle className="w-5 h-5 text-white" />
                </div>

                <div>
                  <h4 className="font-semibold mb-1">{suggestion.title}</h4>
                  <p className="text-sm text-muted-foreground">
                    {suggestion.description}
                  </p>
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
            <span className="text-sm font-bold text-[#4f46e5]">
              {keywords.coverage}%
            </span>
          </div>

          <div className="bg-accent rounded-full h-3">
            <div
              className="h-3 rounded-full bg-gradient-to-r from-[#4f46e5] to-[#8b5cf6]"
              style={{ width: `${keywords.coverage}%` }}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="p-3 bg-green-50 rounded-lg">
            <p className="text-xs text-muted-foreground mb-1">Found</p>
            <p className="text-lg font-bold text-green-700">{keywords.found}</p>
          </div>

          <div className="p-3 bg-red-50 rounded-lg">
            <p className="text-xs text-muted-foreground mb-1">Missing</p>
            <p className="text-lg font-bold text-red-700">{keywords.missing}</p>
          </div>

          <div className="p-3 bg-blue-50 rounded-lg">
            <p className="text-xs text-muted-foreground mb-1">Suggested</p>
            <p className="text-lg font-bold text-blue-700">{keywords.suggested}</p>
          </div>

          <div className="p-3 bg-purple-50 rounded-lg">
            <p className="text-xs text-muted-foreground mb-1">Relevance</p>
            <p className="text-lg font-bold text-purple-700">{keywords.relevance}</p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col md:flex-row gap-4">
        <button
          onClick={handleDownloadReport}
          className="flex-1 bg-gradient-to-r from-[#4f46e5] to-[#8b5cf6] text-white py-3 rounded-xl font-medium hover:shadow-lg transition-all flex items-center justify-center gap-2"
        >
          <Download className="w-5 h-5" />
          Download Detailed Report
        </button>

        <button
          onClick={loadInitialAnalysis}
          className="flex-1 border-2 border-[#4f46e5] text-[#4f46e5] py-3 rounded-xl font-medium hover:bg-indigo-50 transition-all flex items-center justify-center gap-2"
        >
          <RefreshCw className="w-5 h-5" />
          Reload Analysis
        </button>
      </div>
    </div>
  );
}