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
        setPassword("");
        return;
      }

      // ================= LOGIN =================
      const data = await loginUser(trimmedEmail, trimmedPassword);

      if (!data || !data.token) {
        throw new Error("Invalid login response");
      }

      // ✅ Save auth data
      localStorage.setItem("token", data.token);
      localStorage.setItem("userName", data.name || "User");

      // ✅ IMPORTANT: force reload to re-evaluate auth
      window.location.href = "/dashboard";

    } catch (err: any) {
      console.error(err);
      setError(err.message || "Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* LEFT */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">

          <div className="flex items-center gap-2 mb-8">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center">
              <Target className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Smart Career
            </span>
          </div>

          <div className="mb-6">
            <h1 className="text-3xl font-semibold mb-2">
              {isSignup ? "Create your account" : "Welcome back"}
            </h1>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">

            {isSignup && (
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Full Name"
                className="w-full px-4 py-3 border rounded-xl"
              />
            )}

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="w-full px-4 py-3 border rounded-xl"
            />

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full px-4 py-3 border rounded-xl"
            />

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 text-white py-3 rounded-xl"
            >
              {loading ? "Processing..." : isSignup ? "Create Account" : "Sign In"}
            </button>

          </form>

          <p className="mt-6 text-center text-sm">
            {isSignup ? "Already have an account?" : "Don't have an account?"}
            <button
              onClick={() => setIsSignup(!isSignup)}
              className="text-indigo-600 ml-1"
            >
              {isSignup ? "Sign In" : "Sign Up"}
            </button>
          </p>

        </div>
      </div>
    </div>
  );
}