import { useState } from "react";
import { createUser } from "../../api/api";

export default function Register() {

  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

  const handleSubmit = async () => {

    const user = { name, email, password };

    try {
      await createUser(user);
      alert("Account created successfully!");
      setName("");
      setEmail("");
      setPassword("");
    } catch (error) {
      alert("Error creating user");
    }
  };

  return (

    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-blue-100">

      <div className="bg-white shadow-xl rounded-2xl p-10 w-[420px]">

        <h1 className="text-2xl font-bold text-center text-indigo-600 mb-2">
          Smart Career Platform
        </h1>

        <p className="text-center text-gray-500 mb-8">
          Create your student account
        </p>

        <div className="space-y-4">

          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e)=>setName(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />

          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />

          <button
            onClick={handleSubmit}
            className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition"
          >
            Create Account
          </button>

        </div>

        <p className="text-sm text-gray-500 text-center mt-6">
          Already have an account? 
          <a href="/login" className="text-indigo-600 ml-1 font-medium">
            Login
          </a>
        </p>

      </div>

    </div>

  );
}