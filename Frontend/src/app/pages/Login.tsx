import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Target, Mail, Lock, ArrowRight } from "lucide-react";
import { loginUser, createUser } from "../../api/api";

export function Login() {
  const [isSignup, setIsSignup] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (loading) return;

    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();
    const trimmedName = name.trim();

    // ✅ Validation
    if (!trimmedEmail || !trimmedPassword) {
      setError("Email and password are required");
      return;
    }

    if (isSignup && !trimmedName) {
      setError("Name is required");
      return;
    }

    try {
      setLoading(true);
      setError("");

      // ================= SIGNUP =================
      if (isSignup) {
        await createUser({
          name: trimmedName,
          email: trimmedEmail,
          password: trimmedPassword,
        });

        alert("Account created successfully! Please login.");
        setIsSignup(false);
        setPassword(""); // optional cleanup
        return;
      }

      // ================= LOGIN =================
      const data = await loginUser(trimmedEmail, trimmedPassword);

      console.log("LOGIN RESPONSE:", data); // 👈 DEBUG

      if (!data || !data.token) {
        throw new Error("Invalid login response");
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("userName", data.name || "User");
      // localStorage.setItem("userId", String(data.id)); // No longer needed

      navigate("/dashboard", { replace: true });
      console.log("TOKEN:", localStorage.getItem("token"));

    } catch (err: any) {
      console.error(err);
      setError(err.message || "Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">

      {/* LEFT SIDE */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">

          {/* Logo */}
          <div className="flex items-center gap-2 mb-8">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center">
              <Target className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Smart Career
            </span>
          </div>

          {/* Heading */}
          <div className="mb-6">
            <h1 className="text-3xl font-semibold mb-2">
              {isSignup ? "Create your account" : "Welcome back"}
            </h1>
            <p className="text-gray-500">
              {isSignup
                ? "Start your journey to career success"
                : "Sign in to continue to your dashboard"}
            </p>
          </div>

          {/* FORM */}
          <form onSubmit={handleSubmit} className="space-y-4">

            {/* NAME (Signup only) */}
            {isSignup && (
              <div>
                <label className="block text-sm mb-2">Full Name</label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                  className="w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            )}

            {/* EMAIL */}
            <div>
              <label className="block text-sm mb-2">Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full pl-12 pr-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>

            {/* PASSWORD */}
            <div>
              <label className="block text-sm mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full pl-12 pr-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>

            {/* ERROR */}
            {error && <p className="text-red-500 text-sm">{error}</p>}

            {/* REMEMBER */}
            {!isSignup && (
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 text-sm text-gray-500">
                  <input type="checkbox" className="rounded" />
                  Remember me
                </label>
                <button
                  type="button"
                  className="text-sm text-indigo-600 hover:underline"
                >
                  Forgot password?
                </button>
              </div>
            )}

            {/* BUTTON */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-xl font-medium hover:shadow-lg transition flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading
                ? "Processing..."
                : isSignup
                  ? "Create Account"
                  : "Sign In"}
              <ArrowRight className="w-5 h-5" />
            </button>

          </form>

          {/* SWITCH */}
          <p className="mt-6 text-center text-sm text-gray-500">
            {isSignup
              ? "Already have an account?"
              : "Don't have an account?"}{" "}
            <button
              onClick={() => setIsSignup(!isSignup)}
              className="text-indigo-600 font-medium hover:underline"
            >
              {isSignup ? "Sign In" : "Sign Up"}
            </button>
          </p>

        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="hidden lg:flex flex-1 bg-gradient-to-br from-indigo-600 via-purple-600 to-green-500 items-center justify-center p-12">
        <div className="max-w-md text-white">
          <h2 className="text-4xl font-bold mb-6">
            Accelerate Your Career & Productivity
          </h2>
          <p className="text-lg opacity-90 mb-8">
            Track your learning, master coding, and achieve success with AI-powered insights.
          </p>
        </div>
      </div>

    </div>
  );
}