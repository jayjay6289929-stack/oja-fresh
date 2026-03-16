import React, { useState } from "react";
import { useNavigate, Link } from "react-router";
import { useAuth } from "../store/AuthContext";
import { Leaf, Mail, Lock, AlertCircle } from "lucide-react";
import { motion } from "motion/react";

type Mode = "login" | "register";

interface AuthPageProps {
  mode?: Mode;
}

export const AuthPage: React.FC<AuthPageProps> = ({ mode: initialMode = "login" }) => {
  const [mode, setMode] = useState<Mode>(initialMode);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login, register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      if (mode === "login") {
        await login(email, password);
      } else {
        await register(email, password);
      }
      navigate("/");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-[2.5rem] border-2 border-emerald-100 shadow-2xl p-10 w-full max-w-md"
      >
        {/* Logo */}
        <div className="flex items-center justify-center space-x-2 mb-8">
          <div className="bg-emerald-700 p-1.5 rounded-lg">
            <Leaf className="w-5 h-5 text-amber-400" />
          </div>
          <span className="text-2xl tracking-tight text-gray-900">
            Ọjà<span className="text-emerald-700">Fresh</span>
          </span>
        </div>

        {/* Tab toggle */}
        <div className="flex rounded-2xl border-2 border-emerald-100 mb-8 overflow-hidden">
          {(["login", "register"] as Mode[]).map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => { setMode(m); setError(""); }}
              className={`flex-1 py-3 text-sm transition-all ${
                mode === m
                  ? "bg-emerald-700 text-white"
                  : "text-gray-600 hover:text-emerald-700"
              }`}
            >
              {m === "login" ? "Sign In" : "Create Account"}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email */}
          <div className="space-y-2">
            <label htmlFor="email" className="text-xs text-gray-500 uppercase tracking-widest">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-4 top-3.5 w-4 h-4 text-emerald-500" />
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full bg-emerald-50 border-2 border-emerald-200 rounded-2xl py-3 pl-11 pr-4 focus:outline-none focus:ring-2 focus:ring-emerald-600 text-gray-900"
              />
            </div>
          </div>

          {/* Password */}
          <div className="space-y-2">
            <label htmlFor="password" className="text-xs text-gray-500 uppercase tracking-widest">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-4 top-3.5 w-4 h-4 text-emerald-500" />
              <input
                id="password"
                type="password"
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Min. 6 characters"
                className="w-full bg-emerald-50 border-2 border-emerald-200 rounded-2xl py-3 pl-11 pr-4 focus:outline-none focus:ring-2 focus:ring-emerald-600 text-gray-900"
              />
            </div>
          </div>

          {/* Error */}
          {error && (
            <div className="flex items-center space-x-2 bg-red-50 border border-red-200 text-red-700 rounded-2xl px-4 py-3 text-sm">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-emerald-700 hover:bg-emerald-800 disabled:opacity-60 text-white py-4 rounded-2xl transition-all shadow-lg shadow-emerald-200 text-base"
          >
            {loading
              ? mode === "login" ? "Signing in…" : "Creating account…"
              : mode === "login" ? "Sign In" : "Create Account"}
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-6">
          {mode === "login" ? "Don't have an account? " : "Already have an account? "}
          <button
            type="button"
            onClick={() => { setMode(mode === "login" ? "register" : "login"); setError(""); }}
            className="text-emerald-700 hover:underline"
          >
            {mode === "login" ? "Create one" : "Sign in"}
          </button>
        </p>
      </motion.div>
    </div>
  );
};