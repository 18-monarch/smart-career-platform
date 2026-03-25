import { MessageSquare, Mic, Video, ThumbsUp, TrendingUp, Clock, AlertCircle } from "lucide-react";
import { useState, useEffect } from "react";
import { getMockInterview } from "../../api/api";

export function MockInterview() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [interviewData, setInterviewData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMockInterview()
      .then(setInterviewData)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const questions = interviewData?.questions || [
    "Tell me about yourself and your background",
    "Why do you want to work at our company?",
    "Describe a challenging project you worked on",
    "How do you handle tight deadlines?",
    "What are your strengths and weaknesses?",
  ];

  const feedback = interviewData?.feedback || {
    confidence: 82,
    communication: 78,
    clarity: 75,
    bodyLanguage: 85
  };

  const suggestions = interviewData?.suggestions || [
    "Add more specific examples",
    "Reduce filler words",
    "Improve eye contact"
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#4f46e5] to-[#8b5cf6] rounded-2xl p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">Mock Interview Simulator</h1>
        <p className="opacity-90">Practice behavioral and technical interview questions with AI feedback</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Interview Area */}
        <div className="lg:col-span-2 space-y-6">
          {/* Video/Audio Section */}
          <div className="bg-card rounded-2xl p-6 border border-border shadow-sm">
            <div className="aspect-video bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl flex items-center justify-center mb-4 relative overflow-hidden">
              <div className="text-white text-center">
                <Video className="w-16 h-16 mx-auto mb-3 opacity-50" />
                <p className="text-lg opacity-75">Camera Preview</p>
              </div>
              {isRecording && (
                <div className="absolute top-4 left-4 flex items-center gap-2 bg-red-500 px-3 py-1 rounded-full">
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                  <span className="text-white text-sm font-medium">Recording</span>
                </div>
              )}
            </div>

            <div className="flex items-center justify-center gap-4">
              <button
                onClick={() => setIsRecording(!isRecording)}
                className={`w-14 h-14 rounded-full flex items-center justify-center transition-all ${
                  isRecording
                    ? "bg-red-500 hover:bg-red-600"
                    : "bg-[#4f46e5] hover:bg-[#4338ca]"
                }`}
              >
                <Mic className="w-6 h-6 text-white" />
              </button>
              <button className="w-14 h-14 rounded-full bg-accent hover:bg-accent/80 flex items-center justify-center transition-all">
                <Video className="w-6 h-6 text-muted-foreground" />
              </button>
            </div>
          </div>

          {/* Question Card */}
          <div className="bg-card rounded-2xl p-6 border border-border shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-[#4f46e5]" />
                <h3 className="text-lg font-semibold">Interview Question</h3>
              </div>
              <span className="text-sm text-muted-foreground">
                {currentQuestion + 1} / {questions.length}
              </span>
            </div>

            <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-6 rounded-xl mb-6">
              <p className="text-xl font-medium text-gray-900">
                {questions[currentQuestion]}
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
                disabled={currentQuestion === 0}
                className="flex-1 px-4 py-3 bg-accent rounded-lg font-medium hover:bg-accent/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous Question
              </button>
              <button
                onClick={() =>
                  setCurrentQuestion(Math.min(questions.length - 1, currentQuestion + 1))
                }
                disabled={currentQuestion === questions.length - 1}
                className="flex-1 px-4 py-3 bg-[#4f46e5] text-white rounded-lg font-medium hover:bg-[#4338ca] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next Question
              </button>
            </div>
          </div>

          {/* Tips */}
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-2xl p-6">
            <h3 className="text-lg font-semibold mb-3 text-green-900 flex items-center gap-2">
              <ThumbsUp className="w-5 h-5" />
              Interview Tips
            </h3>
            <ul className="space-y-2 text-sm text-green-900">
              <li className="flex items-start gap-2">
                <span className="text-green-600 mt-1">•</span>
                <span>Use the STAR method: Situation, Task, Action, Result</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 mt-1">•</span>
                <span>Maintain eye contact with the camera</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 mt-1">•</span>
                <span>Speak clearly and at a moderate pace</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 mt-1">•</span>
                <span>Be specific with examples from your experience</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Feedback Sidebar */}
        <div className="space-y-6">
          {/* AI Feedback */}
          <div className="bg-card rounded-2xl p-6 border border-border shadow-sm">
            <h3 className="text-lg font-semibold mb-4">AI Feedback</h3>

            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Confidence</span>
                  <span className="text-sm font-bold text-[#10b981]">{feedback.confidence}%</span>
                </div>
                <div className="bg-accent rounded-full h-2">
                  <div className="h-2 rounded-full bg-[#10b981]" style={{ width: `${feedback.confidence}%` }}></div>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Communication</span>
                  <span className="text-sm font-bold text-[#4f46e5]">{feedback.communication}%</span>
                </div>
                <div className="bg-accent rounded-full h-2">
                  <div className="h-2 rounded-full bg-[#4f46e5]" style={{ width: `${feedback.communication}%` }}></div>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Clarity</span>
                  <span className="text-sm font-bold text-[#f59e0b]">{feedback.clarity}%</span>
                </div>
                <div className="bg-accent rounded-full h-2">
                  <div className="h-2 rounded-full bg-[#f59e0b]" style={{ width: `${feedback.clarity}%` }}></div>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Body Language</span>
                  <span className="text-sm font-bold text-[#8b5cf6]">{feedback.bodyLanguage}%</span>
                </div>
                <div className="bg-accent rounded-full h-2">
                  <div className="h-2 rounded-full bg-[#8b5cf6]" style={{ width: `${feedback.bodyLanguage}%` }}></div>
                </div>
              </div>
            </div>
          </div>

          {/* Performance Summary */}
          <div className="bg-card rounded-2xl p-6 border border-border shadow-sm">
            <h3 className="text-lg font-semibold mb-4">Session Stats</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-accent rounded-lg">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">Avg Response Time</span>
                </div>
                <span className="font-semibold">45s</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-accent rounded-lg">
                <div className="flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">Questions Answered</span>
                </div>
                <span className="font-semibold">3/5</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-accent rounded-lg">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">Overall Score</span>
                </div>
                <span className="font-semibold text-[#10b981]">80%</span>
              </div>
            </div>
          </div>

          {/* Suggestions */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-2xl p-6">
            <h3 className="text-lg font-semibold mb-3 text-blue-900">💡 Suggestions</h3>
            <ul className="space-y-2 text-sm text-blue-900">
              {suggestions.map((s: string, i: number) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Action Button */}
          <button className="w-full bg-gradient-to-r from-[#4f46e5] to-[#8b5cf6] text-white py-3 rounded-xl font-medium hover:shadow-lg transition-all">
            Generate Full Report
          </button>
        </div>
      </div>
    </div>
  );
}
