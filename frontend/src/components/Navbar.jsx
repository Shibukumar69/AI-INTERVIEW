// frontend/src/components/Navbar.jsx
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Brain,
  Layers,
  Users,
  Terminal,
  Settings,
  Radio,
  Sun,
  Moon
} from "lucide-react";
import SettingsModal from "./SettingsModal";
import axios from "axios";
import { getApiUrl } from "../config/api";
import { useTheme } from "../context/ThemeContext";

const Navbar = () => {
  const location = useLocation();
  const { theme, toggleTheme, isDark } = useTheme();
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [activeProvider, setActiveProvider] = useState("Built-in Intelligent Engine");

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const res = await axios.get(getApiUrl("/api/config/status"));
        if (res.data) {
          if (res.data.geminiConfigured) setActiveProvider("Gemini 1.5 Flash");
          else if (res.data.openaiConfigured) setActiveProvider("OpenAI GPT-4o");
          else if (res.data.groqConfigured) setActiveProvider("Groq Llama-3");
          else setActiveProvider("Built-in Cohort Engine");
        }
      } catch (e) {
        setActiveProvider("Built-in Cohort Engine");
      }
    };
    fetchStatus();
  }, [isSettingsOpen]);

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <header className="sticky top-0 z-50 bg-white/90 dark:bg-slate-950/80 border-b border-[#e5dfeb] dark:border-white/10 shadow-[0_4px_25px_rgba(67,45,102,0.04)] dark:shadow-2xl backdrop-blur-2xl transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Brand & Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-purple-600 via-purple-500 to-indigo-500 dark:from-cyan-500 dark:via-indigo-500 dark:to-purple-500 p-0.5 shadow-md group-hover:rotate-6 transition-all duration-300">
              <div className="w-full h-full bg-white dark:bg-slate-950 rounded-[14px] flex items-center justify-center">
                <Brain className="w-6 h-6 text-purple-600 dark:text-cyan-400 group-hover:scale-110 transition-transform" />
              </div>
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xl font-extrabold tracking-tight text-[#191522] dark:text-white uppercase font-heading">
                  AETHER<span className="text-purple-600 dark:text-cyan-400">.COHORT</span>
                </span>
                <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest bg-purple-100 dark:bg-cyan-500/10 text-purple-700 dark:text-cyan-400 border border-purple-200 dark:border-cyan-500/30 rounded-full">
                  31-Day AI Agent
                </span>
              </div>
              <p className="text-[11px] text-[#706879] dark:text-slate-400 tracking-wider">Enterprise Technical Interview Orchestrator</p>
            </div>
          </Link>

          {/* Center Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1 bg-[#f0e8fc]/60 dark:bg-slate-950/60 p-1.5 rounded-2xl border border-[#e5dfeb] dark:border-white/5 shadow-inner">
            <Link
              to="/"
              className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all duration-200 ${
                isActive("/")
                  ? "bg-purple-600 text-white shadow-md shadow-purple-600/25 dark:bg-cyan-500 dark:text-slate-950 dark:shadow-cyan-500/25 font-bold"
                  : "text-[#706879] hover:text-[#191522] hover:bg-white/80 dark:text-slate-400 dark:hover:text-white dark:hover:bg-white/5"
              }`}
            >
              <Radio className="w-3.5 h-3.5" />
              <span>Command Center</span>
            </Link>

            <Link
              to="/curriculum"
              className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all duration-200 ${
                isActive("/curriculum")
                  ? "bg-purple-600 text-white shadow-md shadow-purple-600/25 dark:bg-cyan-500 dark:text-slate-950 dark:shadow-cyan-500/25 font-bold"
                  : "text-[#706879] hover:text-[#191522] hover:bg-white/80 dark:text-slate-400 dark:hover:text-white dark:hover:bg-white/5"
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>31-Day Curriculum</span>
            </Link>

            <Link
              to="/candidates"
              className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all duration-200 ${
                isActive("/candidates")
                  ? "bg-purple-600 text-white shadow-md shadow-purple-600/25 dark:bg-cyan-500 dark:text-slate-950 dark:shadow-cyan-500/25 font-bold"
                  : "text-[#706879] hover:text-[#191522] hover:bg-white/80 dark:text-slate-400 dark:hover:text-white dark:hover:bg-white/5"
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              <span>Candidates</span>
            </Link>

            <Link
              to="/api-spec"
              className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all duration-200 ${
                isActive("/api-spec")
                  ? "bg-purple-600 text-white shadow-md shadow-purple-600/25 dark:bg-cyan-500 dark:text-slate-950 dark:shadow-cyan-500/25 font-bold"
                  : "text-[#706879] hover:text-[#191522] hover:bg-white/80 dark:text-slate-400 dark:hover:text-white dark:hover:bg-white/5"
              }`}
            >
              <Terminal className="w-3.5 h-3.5" />
              <span>Tech Spec API</span>
            </Link>
          </nav>

          {/* Right Action Bar */}
          <div className="flex items-center space-x-2.5 sm:space-x-3">
            {/* Live Engine Status Pill */}
            <div className="hidden sm:flex items-center space-x-2 px-3 py-1.5 rounded-xl bg-white dark:bg-slate-950/80 border border-[#e5dfeb] dark:border-white/10 shadow-sm">
              <div className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </div>
              <span className="text-[11px] font-mono text-[#191522] dark:text-slate-300 font-medium">{activeProvider}</span>
            </div>

            {/* Theme Toggle Button (Light / Dark Mode) */}
            <button
              onClick={toggleTheme}
              className="flex items-center space-x-1.5 px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border border-[#e5dfeb] dark:border-white/10 hover:border-purple-400 dark:hover:border-cyan-500/50 text-[#191522] dark:text-slate-300 hover:text-purple-600 dark:hover:text-cyan-400 transition-all duration-200 shadow-sm active:scale-95 text-xs font-bold"
              title={isDark ? "Switch to InterviewAgent Light Mode" : "Switch to Cyber Dark Mode"}
            >
              {isDark ? (
                <>
                  <Sun className="w-4 h-4 text-amber-400 animate-spin-slow" />
                  <span className="hidden sm:inline">Light</span>
                </>
              ) : (
                <>
                  <Moon className="w-4 h-4 text-purple-600" />
                  <span className="hidden sm:inline">Dark</span>
                </>
              )}
            </button>

            {/* In-App Settings Button */}
            <button
              onClick={() => setIsSettingsOpen(true)}
              className="flex items-center space-x-2 px-3.5 py-2 rounded-xl bg-white dark:bg-slate-900 border border-[#e5dfeb] dark:border-white/10 hover:border-purple-400 dark:hover:border-cyan-500/50 text-[#191522] dark:text-slate-300 hover:text-purple-600 dark:hover:text-cyan-400 transition-all duration-200 shadow-sm active:scale-95 text-xs font-semibold"
              title="Configure AI Provider & API Keys"
            >
              <Settings className="w-4 h-4" />
              <span className="hidden md:inline">AI Config</span>
            </button>
          </div>

        </div>
      </header>

      {/* Dynamic AI Provider Settings Modal */}
      {isSettingsOpen && <SettingsModal onClose={() => setIsSettingsOpen(false)} />}
    </>
  );
};

export default Navbar;
