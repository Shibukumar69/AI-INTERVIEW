// frontend/src/pages/Dashboard.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CANDIDATE_PROFILES } from "../data/candidates";
import CandidateCard from "../components/CandidateCard";
import CurriculumMatrix from "../components/CurriculumMatrix";
import {
  Sparkles,
  Play,
  Layers,
  Users,
  Target,
  CheckCircle2,
  Activity
} from "lucide-react";
import axios from "axios";
import { getApiUrl } from "../config/api";

const Dashboard = () => {
  const navigate = useNavigate();
  const [candidates, setCandidates] = useState(CANDIDATE_PROFILES);
  const [selectedCandidate, setSelectedCandidate] = useState(CANDIDATE_PROFILES[0]);
  const [interviewMode, setInterviewMode] = useState("adaptive"); // "adaptive" | "stress" | "deep-dive"
  const [isLaunching, setIsLaunching] = useState(false);

  useEffect(() => {
    // Fetch live candidates from backend if available
    const fetchData = async () => {
      try {
        const res = await axios.get(getApiUrl("/api/candidates"));
        if (res.data?.candidates) setCandidates(res.data.candidates);
      } catch (e) {
        console.warn("Running in local client mode.");
      }
    };
    fetchData();
  }, []);

  const handleLaunchInterview = async (candidate = selectedCandidate) => {
    setIsLaunching(true);
    try {
      const res = await axios.post(getApiUrl("/api/interview/start"), {
        candidateId: candidate.id,
        targetDays: candidate.recommendedProbeDays || [1, 6, 15, 24, 28],
        mode: interviewMode
      });

      if (res.data?.sessionId) {
        navigate(`/interview/${res.data.sessionId}`);
      } else {
        navigate(`/interview/session_${candidate.id}_${Date.now()}`);
      }
    } catch (e) {
      console.warn("Backend offline, launching client interview session.");
      navigate(`/interview/session_${candidate.id}_${Date.now()}`);
    } finally {
      setIsLaunching(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12 animate-in fade-in duration-500">
      
      {/* Hero Command Center Header */}
      <div className="relative glass-panel rounded-3xl p-8 sm:p-12 border border-purple-200/80 dark:border-cyan-500/30 overflow-hidden shadow-ia-card dark:shadow-2xl transition-colors duration-300">
        
        {/* Ambient Hero Glow */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-purple-400/15 dark:bg-cyan-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-indigo-400/15 dark:bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
          
          {/* Left Hero Title & Description */}
          <div className="lg:col-span-2 space-y-4">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-purple-100 dark:bg-cyan-500/10 border border-purple-200 dark:border-cyan-500/30 text-purple-700 dark:text-cyan-400 text-xs font-mono font-bold uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5" />
              <span>31-Day Enterprise AI Cohort Evaluator</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold text-[#191522] dark:text-white uppercase font-heading tracking-tight leading-none">
              Autonomous <span className="shimmer-text">Technical Interview</span> Agent
            </h1>

            <p className="text-sm sm:text-base text-[#52495d] dark:text-slate-300 max-w-2xl leading-relaxed">
              Conduct high-fidelity, multi-turn technical interviews grounded in the candidate's actual 31-day cohort journey.
              Evaluates RAG, Vector DBs, Prompt Engineering, Agentic AI, MCP, Deployment, and Production Guardrails with intelligent adaptive follow-ups.
            </p>

            {/* Spec Requirements Badge Bar */}
            <div className="flex flex-wrap gap-2 pt-2">
              <span className="px-3 py-1.5 rounded-xl bg-white dark:bg-slate-900 border border-[#e5dfeb] dark:border-white/10 text-[#191522] dark:text-slate-300 text-xs font-mono flex items-center space-x-1.5 shadow-sm">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                <span>Min 8 Questions Enforced</span>
              </span>
              <span className="px-3 py-1.5 rounded-xl bg-white dark:bg-slate-900 border border-[#e5dfeb] dark:border-white/10 text-[#191522] dark:text-slate-300 text-xs font-mono flex items-center space-x-1.5 shadow-sm">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                <span>Min 4 Curriculum Days Covered</span>
              </span>
              <span className="px-3 py-1.5 rounded-xl bg-white dark:bg-slate-900 border border-[#e5dfeb] dark:border-white/10 text-[#191522] dark:text-slate-300 text-xs font-mono flex items-center space-x-1.5 shadow-sm">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                <span>Intelligent Follow-Up Generation</span>
              </span>
              <span className="px-3 py-1.5 rounded-xl bg-white dark:bg-slate-900 border border-[#e5dfeb] dark:border-white/10 text-[#191522] dark:text-slate-300 text-xs font-mono flex items-center space-x-1.5 shadow-sm">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                <span>Structured Diagnostic Feedback</span>
              </span>
            </div>
          </div>

          {/* Right Quick Launcher Box */}
          <div className="bg-white/95 dark:glass-panel p-6 rounded-2xl border border-purple-200 dark:border-cyan-400/40 shadow-ia-card dark:shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-[#706879] dark:text-slate-400">
                Candidate Selected
              </span>
              <span className="px-2 py-0.5 text-[10px] font-mono font-bold bg-purple-100 dark:bg-cyan-500/20 text-purple-700 dark:text-cyan-300 border border-purple-200 dark:border-transparent rounded-md">
                {selectedCandidate.experienceLevel}
              </span>
            </div>

            <div className="flex items-center space-x-3 bg-[#fcfbfd] dark:bg-slate-950/60 p-3 rounded-xl border border-[#e5dfeb] dark:border-white/5">
              <img
                src={selectedCandidate.avatar}
                alt={selectedCandidate.name}
                className="w-10 h-10 rounded-xl object-cover border border-purple-200 dark:border-cyan-400/40 shadow-sm"
              />
              <div className="min-w-0 flex-1">
                <p className="text-sm font-extrabold text-[#191522] dark:text-white truncate font-heading">{selectedCandidate.name}</p>
                <p className="text-[11px] text-purple-600 dark:text-cyan-400 truncate font-medium">{selectedCandidate.cohortTrack}</p>
              </div>
            </div>

            {/* Mode Selector */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-[#706879] dark:text-slate-400 mb-1.5">
                Interview Strategy
              </label>
              <div className="grid grid-cols-3 gap-1.5">
                {[
                  { id: "adaptive", label: "Adaptive" },
                  { id: "stress", label: "Deep Probing" },
                  { id: "4-day", label: "4-Day Focus" }
                ].map((m) => (
                  <button
                    key={m.id}
                    onClick={() => setInterviewMode(m.id)}
                    className={`py-1.5 rounded-lg text-[11px] font-mono font-bold transition-all ${
                      interviewMode === m.id
                        ? "bg-purple-600 text-white shadow-md shadow-purple-600/25 dark:bg-cyan-500 dark:text-slate-950 dark:shadow-cyan-500/30"
                        : "bg-purple-50 dark:bg-slate-900 text-[#706879] dark:text-slate-400 hover:text-[#191522] dark:hover:text-white border border-[#e5dfeb] dark:border-transparent"
                    }`}
                  >
                    {m.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Big Launch Button */}
            <button
              onClick={() => handleLaunchInterview()}
              disabled={isLaunching}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-purple-600 via-purple-500 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white dark:from-cyan-500 dark:via-indigo-500 dark:to-purple-600 dark:hover:from-cyan-400 dark:hover:to-purple-500 dark:text-slate-950 font-extrabold text-sm uppercase tracking-wider shadow-ia-purple dark:shadow-cyan-500/25 flex items-center justify-center space-x-2 active:scale-95 transition-all"
            >
              <Play className="w-4 h-4 fill-white dark:fill-slate-950" />
              <span>{isLaunching ? "Initializing AI Agent..." : "Launch Technical Interview"}</span>
            </button>
          </div>

        </div>
      </div>

      {/* Cohort Live Metrics Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: "Cohort Modules", value: "7 Modules", desc: "RAG to Production AI", icon: Layers, color: "text-purple-600 dark:text-cyan-400" },
          { label: "Total Curriculum", value: "31 Days", desc: "Hands-on Engineering", icon: Target, color: "text-indigo-600 dark:text-purple-400" },
          { label: "Candidates Tracked", value: `${candidates.length} Profiles`, desc: "Synthetic Cohort Dataset", icon: Users, color: "text-emerald-600 dark:text-emerald-400" },
          { label: "Assessment Depth", value: "Min 8 Qs", desc: "4+ Days Min Enforced", icon: Activity, color: "text-rose-600 dark:text-rose-400" }
        ].map((stat, i) => {
          const IconComponent = stat.icon;
          return (
            <div key={i} className="glass-panel p-5 rounded-2xl border border-[#e5dfeb] dark:border-white/5 space-y-2 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#706879] dark:text-slate-400">{stat.label}</span>
                <IconComponent className={`w-4 h-4 ${stat.color}`} />
              </div>
              <p className="text-2xl font-extrabold text-[#191522] dark:text-white font-mono">{stat.value}</p>
              <p className="text-[11px] text-[#706879] dark:text-slate-400">{stat.desc}</p>
            </div>
          );
        })}
      </div>

      {/* Candidate Dossier Grid */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#e5dfeb] dark:border-white/10 pb-4">
          <div>
            <h2 className="text-xl font-extrabold uppercase tracking-tight text-[#191522] dark:text-white font-heading">
              Cohort Candidate Profiles & Dossiers
            </h2>
            <p className="text-xs text-[#706879] dark:text-slate-400">
              Select a participant to inspect their completed missions, attempts count, skipped topics, and learning signals.
            </p>
          </div>
          <span className="text-xs font-mono text-purple-600 dark:text-cyan-400 font-bold">
            {candidates.length} Synthetic Profiles Available
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {candidates.map((cand) => (
            <CandidateCard
              key={cand.id}
              candidate={cand}
              isSelected={selectedCandidate.id === cand.id}
              onSelect={() => setSelectedCandidate(cand)}
              onLaunchInterview={(c) => handleLaunchInterview(c)}
            />
          ))}
        </div>
      </div>

      {/* Interactive 31-Day Curriculum Explorer */}
      <div className="pt-6">
        <CurriculumMatrix onSelectDay={(day) => console.log("Targeting day:", day)} />
      </div>

    </div>
  );
};

export default Dashboard;
