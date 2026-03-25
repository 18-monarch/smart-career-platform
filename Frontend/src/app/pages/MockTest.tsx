import { useState, useEffect } from "react";
import { Timer, CheckCircle, XCircle, AlertCircle, ChevronRight, ChevronLeft, Send, Code as CodeIcon, RefreshCcw } from "lucide-react";
import { getMockTest } from "../../api/api";

export function MockTest() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [timeLeft, setTimeLeft] = useState(1800); // 30 minutes
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [testQuestions, setTestQuestions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMockTest()
      .then(setTestQuestions)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const activeQuestions = testQuestions.length > 0 ? testQuestions : [
    {
      id: 1,
      type: "mcq",
      text: "What is the time complexity of binary search?",
      options: ["O(n)", "O(log n)", "O(n²)", "O(1)"],
      correctOption: 1
    }
  ];

  useEffect(() => {
    if (timeLeft > 0 && !isSubmitted && !loading) {
      const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0 && !isSubmitted) {
      handleSubmit();
    }
  }, [timeLeft, isSubmitted, loading]);

  const currentQ = activeQuestions[currentQuestion];

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  const handleOptionSelect = (optionIndex: number) => {
    if (!isSubmitted) {
      setSelectedAnswers((prev) => ({
        ...prev,
        [currentQ.id]: optionIndex,
      }));
    }
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
    // In a real app, you'd send selectedAnswers to the backend
    console.log("Test Submitted:", selectedAnswers);
  };

  if (loading) {
    return (
      <div className="h-[calc(100vh-8rem)] flex items-center justify-center">
        <p className="text-lg font-medium">Loading test questions...</p>
      </div>
    );
  }

  if (!currentQ) {
    return (
      <div className="h-[calc(100vh-8rem)] flex items-center justify-center">
        <p className="text-lg font-medium">No questions available.</p>
      </div>
    );
  }

  const isAnswered = selectedAnswers[currentQ.id] !== undefined;
  const isCorrect = isSubmitted && currentQ.type === "mcq" && selectedAnswers[currentQ.id] === currentQ.correctOption;

  return (
    <div className="h-[calc(100vh-8rem)] flex gap-6">
      {/* Main Test Area */}
      <div className="flex-1 flex flex-col gap-4">
        {/* Timer & Progress Bar */}
        <div className="bg-card rounded-2xl p-4 border border-border shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <Timer className="w-5 h-5 text-[#f59e0b]" />
                <span className="text-2xl font-bold text-[#f59e0b]">{formatTime(timeLeft)}</span>
              </div>
              <div className="text-sm text-muted-foreground">
                Question {currentQuestion + 1} of {activeQuestions.length}
              </div>
            </div>
            <button
              onClick={handleSubmit}
              disabled={isSubmitted}
              className="px-4 py-2 bg-red-100 text-red-700 rounded-lg font-medium hover:bg-red-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitted ? "Test Submitted" : "End Test"}
            </button>
          </div>
          <div className="mt-3 bg-accent rounded-full h-2">
            <div
              className="h-2 rounded-full bg-gradient-to-r from-[#4f46e5] to-[#8b5cf6]"
              style={{ width: `${((currentQuestion + 1) / activeQuestions.length) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Question Content */}
        <div className="flex-1 bg-card rounded-2xl p-6 border border-border shadow-sm overflow-y-auto">
          {currentQ.type === "coding" ? (
            // Coding Question
            <div className="h-full flex flex-col">
              <div className="mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <CodeIcon className="w-5 h-5 text-[#4f46e5]" />
                  <h3 className="text-lg font-semibold">Coding Problem</h3>
                </div>
                <h2 className="text-xl font-bold mb-3">{currentQ.title}</h2>
                <p className="text-muted-foreground mb-4">
                  {currentQ.description}
                </p>
                {currentQ.exampleInput && (
                  <div className="bg-accent p-4 rounded-lg mb-4">
                    <p className="text-sm font-semibold mb-2">Example:</p>
                    <code className="text-sm">
                      Input: {currentQ.exampleInput}
                      <br />
                      Output: {currentQ.exampleOutput}
                    </code>
                  </div>
                )}
              </div>

              {/* Code Editor */}
              <div className="flex-1 flex flex-col">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Code Editor</span>
                  <select className="px-3 py-1 bg-accent rounded-lg text-sm border border-border" disabled={isSubmitted}>
                    <option>Python</option>
                    <option>JavaScript</option>
                    <option>C++</option>
                    <option>Java</option>
                  </select>
                </div>
                <textarea
                  className="flex-1 bg-[#1e1e1e] text-[#d4d4d4] p-4 rounded-lg font-mono text-sm border border-border resize-none"
                  placeholder="# Write your code here..."
                  defaultValue={currentQ.initialCode || ""}
                  disabled={isSubmitted}
                />
                <div className="flex gap-2 mt-3">
                  <button
                    className="px-4 py-2 bg-accent rounded-lg font-medium hover:bg-accent/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={isSubmitted}
                  >
                    <RefreshCcw className="inline-block w-4 h-4 mr-2" /> Run Code
                  </button>
                  <button
                    className="px-4 py-2 bg-[#10b981] text-white rounded-lg font-medium hover:bg-[#059669] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={isSubmitted}
                    onClick={() => {
                      // Simulate submitting code
                      setSelectedAnswers((prev) => ({
                        ...prev,
                        [currentQ.id]: 1, // Mark as attempted/answered
                      }));
                    }}
                  >
                    <Send className="inline-block w-4 h-4 mr-2" /> Submit
                  </button>
                </div>
              </div>
            </div>
          ) : (
            // MCQ Question
            <div>
              <div className="mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <AlertCircle className="w-5 h-5 text-[#4f46e5]" />
                  <h3 className="text-lg font-semibold">Multiple Choice Question</h3>
                </div>
                <h2 className="text-xl font-bold mb-4">
                  {currentQ.text}
                </h2>
              </div>

              <div className="space-y-3">
                {currentQ.options.map((option: string, index: number) => (
                  <button
                    key={index}
                    onClick={() => handleOptionSelect(index)}
                    disabled={isSubmitted}
                    className={`w-full text-left p-4 rounded-xl border-2 transition-all disabled:cursor-not-allowed ${
                      selectedAnswers[currentQ.id] === index
                        ? isSubmitted
                          ? isCorrect
                            ? "border-green-500 bg-green-50"
                            : "border-red-500 bg-red-50"
                          : "border-[#4f46e5] bg-indigo-50"
                        : "border-border bg-card hover:bg-accent"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                          selectedAnswers[currentQ.id] === index
                            ? isSubmitted
                              ? isCorrect
                                ? "border-green-500 bg-green-500"
                                : "border-red-500 bg-red-500"
                              : "border-[#4f46e5] bg-[#4f46e5]"
                            : "border-muted-foreground"
                        }`}
                      >
                        {selectedAnswers[currentQ.id] === index && (
                          isSubmitted ? (
                            isCorrect ? (
                              <CheckCircle className="w-4 h-4 text-white" />
                            ) : (
                              <XCircle className="w-4 h-4 text-white" />
                            )
                          ) : (
                            <CheckCircle className="w-4 h-4 text-white" />
                          )
                        )}
                      </div>
                      <span className="font-medium">{option}</span>
                      {isSubmitted && currentQ.correctOption === index && selectedAnswers[currentQ.id] !== index && (
                        <span className="ml-auto text-green-600 font-semibold">Correct Answer</span>
                      )}
                    </div>
                  </button>
                ))}
              </div>

              {currentQ.hint && (
                <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-xl">
                  <p className="text-sm text-blue-900">
                    💡 <strong>Hint:</strong> {currentQ.hint}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="bg-card rounded-2xl p-4 border border-border shadow-sm">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
              disabled={currentQuestion === 0}
              className="px-6 py-2 bg-accent rounded-lg font-medium hover:bg-accent/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="inline-block w-4 h-4 mr-2" /> Previous
            </button>
            <button className="px-6 py-2 border-2 border-[#f59e0b] text-[#f59e0b] rounded-lg font-medium hover:bg-amber-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed" disabled={isSubmitted}>
              Flag for Review
            </button>
            <button
              onClick={() => setCurrentQuestion(Math.min(activeQuestions.length - 1, currentQuestion + 1))}
              disabled={currentQuestion === activeQuestions.length - 1}
              className="px-6 py-2 bg-[#4f46e5] text-white rounded-lg font-medium hover:bg-[#4338ca] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next <ChevronRight className="inline-block w-4 h-4 ml-2" />
            </button>
          </div>
        </div>
      </div>

      {/* Question Navigator Sidebar */}
      <div className="w-64 bg-card rounded-2xl p-6 border border-border shadow-sm">
        <h3 className="text-lg font-semibold mb-4">Questions</h3>
        <div className="flex gap-2 flex-wrap mb-8">
          {activeQuestions.map((q, index) => (
            <button
              key={index}
              onClick={() => setCurrentQuestion(index)}
              className={`w-10 h-10 rounded-lg font-medium transition-all ${
                currentQuestion === index
                  ? "bg-[#4f46e5] text-white"
                  : selectedAnswers[q.id] !== undefined
                  ? "bg-green-100 text-green-700 border-green-200"
                  : "bg-card border border-border text-muted-foreground hover:bg-accent"
              }`}
            >
              {index + 1}
              {/* {q.flagged && (
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-[#f59e0b] rounded-full"></span>
              )} */}
            </button>
          ))}
        </div>

        <div className="space-y-3 text-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-green-100"></div>
              <span>Answered</span>
            </div>
            <span className="font-semibold">2</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-accent"></div>
              <span>Not Answered</span>
            </div>
            <span className="font-semibold">3</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-[#f59e0b]"></div>
              <span>Flagged</span>
            </div>
            <span className="font-semibold">1</span>
          </div>
        </div>

        <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
          <p className="text-xs text-amber-900 font-medium">
            ⚠️ The test will auto-submit when time runs out
          </p>
        </div>
      </div>
    </div>
  );
}
