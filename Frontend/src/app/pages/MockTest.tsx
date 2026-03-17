import { Clock, CheckCircle, Circle, Code, FileQuestion } from "lucide-react";
import { useState } from "react";

const questions = [
  { id: 1, type: "mcq", answered: true, flagged: false },
  { id: 2, type: "mcq", answered: true, flagged: false },
  { id: 3, type: "coding", answered: false, flagged: true },
  { id: 4, type: "mcq", answered: false, flagged: false },
  { id: 5, type: "coding", answered: false, flagged: false },
];

export function MockTest() {
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [timeRemaining, setTimeRemaining] = useState("58:34");

  return (
    <div className="h-[calc(100vh-8rem)] flex gap-6">
      {/* Main Test Area */}
      <div className="flex-1 flex flex-col gap-4">
        {/* Timer & Progress Bar */}
        <div className="bg-card rounded-2xl p-4 border border-border shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-[#f59e0b]" />
                <span className="text-2xl font-bold text-[#f59e0b]">{timeRemaining}</span>
              </div>
              <div className="text-sm text-muted-foreground">
                Question {currentQuestion} of {questions.length}
              </div>
            </div>
            <button className="px-4 py-2 bg-red-100 text-red-700 rounded-lg font-medium hover:bg-red-200 transition-colors">
              End Test
            </button>
          </div>
          <div className="mt-3 bg-accent rounded-full h-2">
            <div
              className="h-2 rounded-full bg-gradient-to-r from-[#4f46e5] to-[#8b5cf6]"
              style={{ width: `${(currentQuestion / questions.length) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Question Content */}
        <div className="flex-1 bg-card rounded-2xl p-6 border border-border shadow-sm overflow-y-auto">
          {currentQuestion === 3 ? (
            // Coding Question
            <div className="h-full flex flex-col">
              <div className="mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <Code className="w-5 h-5 text-[#4f46e5]" />
                  <h3 className="text-lg font-semibold">Coding Problem</h3>
                </div>
                <h2 className="text-xl font-bold mb-3">Two Sum Problem</h2>
                <p className="text-muted-foreground mb-4">
                  Given an array of integers nums and an integer target, return indices of the two numbers
                  such that they add up to target.
                </p>
                <div className="bg-accent p-4 rounded-lg mb-4">
                  <p className="text-sm font-semibold mb-2">Example:</p>
                  <code className="text-sm">
                    Input: nums = [2,7,11,15], target = 9
                    <br />
                    Output: [0,1]
                    <br />
                    Explanation: nums[0] + nums[1] == 9, return [0, 1]
                  </code>
                </div>
              </div>

              {/* Code Editor */}
              <div className="flex-1 flex flex-col">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Code Editor</span>
                  <select className="px-3 py-1 bg-accent rounded-lg text-sm border border-border">
                    <option>Python</option>
                    <option>JavaScript</option>
                    <option>C++</option>
                    <option>Java</option>
                  </select>
                </div>
                <textarea
                  className="flex-1 bg-[#1e1e1e] text-[#d4d4d4] p-4 rounded-lg font-mono text-sm border border-border resize-none"
                  placeholder="# Write your code here..."
                  defaultValue={`def twoSum(nums, target):\n    # Your solution here\n    pass`}
                />
                <div className="flex gap-2 mt-3">
                  <button className="px-4 py-2 bg-accent rounded-lg font-medium hover:bg-accent/80 transition-colors">
                    Run Code
                  </button>
                  <button className="px-4 py-2 bg-[#10b981] text-white rounded-lg font-medium hover:bg-[#059669] transition-colors">
                    Submit
                  </button>
                </div>
              </div>
            </div>
          ) : (
            // MCQ Question
            <div>
              <div className="mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <FileQuestion className="w-5 h-5 text-[#4f46e5]" />
                  <h3 className="text-lg font-semibold">Multiple Choice Question</h3>
                </div>
                <h2 className="text-xl font-bold mb-4">
                  What is the time complexity of binary search algorithm?
                </h2>
              </div>

              <div className="space-y-3">
                {["O(n)", "O(log n)", "O(n²)", "O(1)"].map((option, index) => (
                  <button
                    key={index}
                    className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                      index === 1
                        ? "border-[#4f46e5] bg-indigo-50"
                        : "border-border bg-card hover:bg-accent"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                          index === 1 ? "border-[#4f46e5] bg-[#4f46e5]" : "border-muted-foreground"
                        }`}
                      >
                        {index === 1 && <CheckCircle className="w-4 h-4 text-white" />}
                      </div>
                      <span className="font-medium">{option}</span>
                    </div>
                  </button>
                ))}
              </div>

              <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-xl">
                <p className="text-sm text-blue-900">
                  💡 <strong>Hint:</strong> Consider how the search space is reduced in each iteration.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="bg-card rounded-2xl p-4 border border-border shadow-sm">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setCurrentQuestion(Math.max(1, currentQuestion - 1))}
              disabled={currentQuestion === 1}
              className="px-6 py-2 bg-accent rounded-lg font-medium hover:bg-accent/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <button className="px-6 py-2 border-2 border-[#f59e0b] text-[#f59e0b] rounded-lg font-medium hover:bg-amber-50 transition-colors">
              Flag for Review
            </button>
            <button
              onClick={() => setCurrentQuestion(Math.min(questions.length, currentQuestion + 1))}
              disabled={currentQuestion === questions.length}
              className="px-6 py-2 bg-[#4f46e5] text-white rounded-lg font-medium hover:bg-[#4338ca] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Question Navigator Sidebar */}
      <div className="w-64 bg-card rounded-2xl p-6 border border-border shadow-sm">
        <h3 className="text-lg font-semibold mb-4">Questions</h3>
        <div className="grid grid-cols-5 gap-2 mb-6">
          {questions.map((q) => (
            <button
              key={q.id}
              onClick={() => setCurrentQuestion(q.id)}
              className={`aspect-square rounded-lg font-medium text-sm flex items-center justify-center relative ${
                currentQuestion === q.id
                  ? "bg-[#4f46e5] text-white"
                  : q.answered
                  ? "bg-green-100 text-green-700"
                  : "bg-accent text-muted-foreground"
              }`}
            >
              {q.id}
              {q.flagged && (
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-[#f59e0b] rounded-full"></span>
              )}
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
