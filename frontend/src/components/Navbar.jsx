// frontend/src/components/Navbar.jsx
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Brain,
  Layers,
  Users,
  Terminal,
  Settings,
  Sparkles,
  Radio,
  CheckCircle2
} from "lucide-react";
import SettingsModal from "./SettingsModal";
import axios from "axios";
import { getApiUrl } from "../config/api";

const Navbar = () => {
  const location = useLocation();
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [systemHealth, setSystemHealth] = useState("online");
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
      <header className="sticky top-0 z-50 glass-panel border-b border-white/10 shadow-2xl backdrop-blur-2xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Brand & Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-cyan-500 via-indigo-500 to-purple-500 p-0.5 shadow-lg group-hover:rotate-6 transition-all duration-300">
              <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
                <Brain className="w-6 h-6 text-cyan-400 group-hover:scale-110 transition-transform" />
              </div>
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xl font-black tracking-tight text-white uppercase font-mono">
                  AETHER<span className="text-cyan-400">.COHORT</span>
                </span>
                <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 rounded-full">
                  31-Day AI Agent
                </span>
              </div>
              <p className="text-[11px] text-slate-400 tracking-wider">Enterprise Technical Interview Orchestrator</p>
            </div>
          </Link>

          {/* Center Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1 bg-slate-950/60 p-1.5 rounded-2xl border border-white/5 shadow-inner">
            <Link
              to="/"
              className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all duration-200 ${
                isActive("/")
                  ? "bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/25 font-bold"
                  : "text-slate-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <Radio className="w-3.5 h-3.5" />
              <span>Command Center</span>
            </Link>

            <Link
              to="/curriculum"
              className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all duration-200 ${
                isActive("/curriculum")
                  ? "bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/25 font-bold"
                  : "text-slate-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>31-Day Curriculum</span>
            </Link>

            <Link
              to="/candidates"
              className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all duration-200 ${
                isActive("/candidates")
                  ? "bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/25 font-bold"
                  : "text-slate-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              <span>Candidates</span>
            </Link>

            <Link
              to="/api-spec"
              className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all duration-200 ${
                isActive("/api-spec")
                  ? "bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/25 font-bold"
                  : "text-slate-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <Terminal className="w-3.5 h-3.5" />
              <span>Tech Spec API</span>
            </Link>
          </nav>

          {/* Right Action Bar */}
          <div className="flex items-center space-x-3">
            {/* Live Engine Status Pill */}
            <div className="hidden sm:flex items-center space-x-2 px-3 py-1.5 rounded-xl bg-slate-950/80 border border-white/10 shadow-sm">
              <div className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </div>
              <span className="text-[11px] font-mono text-slate-300 font-medium">{activeProvider}</span>
            </div>

            {/* In-App Settings Button */}
            <button
              onClick={() => setIsSettingsOpen(true)}
              className="flex items-center space-x-2 px-3.5 py-2 rounded-xl bg-slate-900 border border-white/10 hover:border-cyan-500/50 text-slate-300 hover:text-cyan-400 transition-all duration-200 shadow-md active:scale-95 text-xs font-semibold"
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
