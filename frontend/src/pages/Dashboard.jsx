// frontend/src/pages/Dashboard.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CANDIDATE_PROFILES } from "../data/candidates";
import { CURRICULUM_MODULES } from "../data/curriculum";
import CandidateCard from "../components/CandidateCard";
import CurriculumMatrix from "../components/CurriculumMatrix";
import {
  Brain,
  Sparkles,
  Play,
  Layers,
  Users,
  Target,
  Zap,
  CheckCircle2,
  Terminal,
  Activity,
  History,
  ArrowRight
} from "lucide-react";
import axios from "axios";

const Dashboard = () => {
  const navigate = useNavigate();
  const [candidates, setCandidates] = useState(CANDIDATE_PROFILES);
  const [selectedCandidate, setSelectedCandidate] = useState(CANDIDATE_PROFILES[0]);
  const [interviewMode, setInterviewMode] = useState("adaptive"); // "adaptive" | "stress" | "deep-dive"
  const [isLaunching, setIsLaunching] = useState(false);
  const [pastSessions, setPastSessions] = useState([]);

  useEffect(() => {
    // Fetch live candidates & past sessions from backend if available
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/candidates");
        if (res.data?.candidates) setCandidates(res.data.candidates);

        const sessRes = await axios.get("http://localhost:5000/api/interview");
        if (sessRes.data?.sessions) setPastSessions(sessRes.data.sessions);
      } catch (e) {
        console.warn("Running in local client mode.");
      }
    };
    fetchData();
  }, []);

  const handleLaunchInterview = async (candidate = selectedCandidate) => {
    setIsLaunching(true);
    try {
      const res = await axios.post("http://localhost:5000/api/interview/start", {
        candidateId: candidate.id,
        targetDays: candidate.recommendedProbeDays || [1, 6, 15, 24, 28],
        mode: interviewMode
      });

      if (res.data?.sessionId) {
        navigate(`/interview/${res.data.sessionId}`);
      } else {
        // Fallback demo session ID
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
      <div className="relative glass-panel rounded-3xl p-8 sm:p-12 border border-cyan-500/30 overflow-hidden shadow-2xl">
        
        {/* Ambient Hero Glow */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
          
          {/* Left Hero Title & Description */}
          <div className="lg:col-span-2 space-y-4">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono font-bold uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5" />
              <span>31-Day Enterprise AI Cohort Evaluator</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black text-white uppercase font-mono tracking-tight leading-none">
              Autonomous <span className="shimmer-text">Technical Interview</span> Agent
            </h1>

            <p className="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed">
              Conduct high-fidelity, multi-turn technical interviews grounded in the candidate's actual 31-day cohort journey.
              Evaluates RAG, Vector DBs, Prompt Engineering, Agentic AI, MCP, Deployment, and Production Guardrails with intelligent adaptive follow-ups.
            </p>

            {/* Spec Requirements Badge Bar */}
            <div className="flex flex-wrap gap-2 pt-2">
              <span className="px-3 py-1 rounded-xl bg-slate-900 border border-white/10 text-slate-300 text-xs font-mono flex items-center space-x-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Min 8 Questions Enforced</span>
              </span>
              <span className="px-3 py-1 rounded-xl bg-slate-900 border border-white/10 text-slate-300 text-xs font-mono flex items-center space-x-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Min 4 Curriculum Days Covered</span>
              </span>
              <span className="px-3 py-1 rounded-xl bg-slate-900 border border-white/10 text-slate-300 text-xs font-mono flex items-center space-x-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Intelligent Follow-Up Generation</span>
              </span>
              <span className="px-3 py-1 rounded-xl bg-slate-900 border border-white/10 text-slate-300 text-xs font-mono flex items-center space-x-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Structured Diagnostic Feedback</span>
              </span>
            </div>
          </div>

          {/* Right Quick Launcher Box */}
          <div className="glass-panel p-6 rounded-2xl border border-cyan-400/40 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Candidate Selected
              </span>
              <span className="px-2 py-0.5 text-[10px] font-mono font-bold bg-cyan-500/20 text-cyan-300 rounded-md">
                {selectedCandidate.experienceLevel}
              </span>
            </div>

            <div className="flex items-center space-x-3 bg-slate-950/60 p-3 rounded-xl border border-white/5">
              <img
                src={selectedCandidate.avatar}
                alt={selectedCandidate.name}
                className="w-10 h-10 rounded-xl object-cover border border-cyan-400/40"
              />
              <div className="min-w-0 flex-1">
                <p className="text-sm font-bold text-white truncate">{selectedCandidate.name}</p>
                <p className="text-[11px] text-cyan-400 truncate">{selectedCandidate.cohortTrack}</p>
              </div>
            </div>

            {/* Mode Selector */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
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
                        ? "bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/30"
                        : "bg-slate-900 text-slate-400 hover:text-white"
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
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 via-indigo-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-slate-950 font-black text-sm uppercase tracking-wider shadow-xl shadow-cyan-500/25 flex items-center justify-center space-x-2 active:scale-95 transition-all"
            >
              <Play className="w-4 h-4 fill-slate-950" />
              <span>{isLaunching ? "Initializing AI Agent..." : "Launch Technical Interview"}</span>
            </button>
          </div>

        </div>
      </div>

      {/* Cohort Live Metrics Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: "Cohort Modules", value: "7 Modules", desc: "RAG to Production AI", icon: Layers, color: "text-cyan-400" },
          { label: "Total Curriculum", value: "31 Days", desc: "Hands-on Engineering", icon: Target, color: "text-purple-400" },
          { label: "Candidates Tracked", value: `${candidates.length} Profiles`, desc: "Synthetic Cohort Dataset", icon: Users, color: "text-emerald-400" },
          { label: "Assessment Depth", value: "Min 8 Qs", desc: "4+ Days Min Enforced", icon: Activity, color: "text-rose-400" }
        ].map((stat, i) => {
          const IconComponent = stat.icon;
          return (
            <div key={i} className="glass-panel p-5 rounded-2xl border border-white/5 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">{stat.label}</span>
                <IconComponent className={`w-4 h-4 ${stat.color}`} />
              </div>
              <p className="text-2xl font-black text-white font-mono">{stat.value}</p>
              <p className="text-[11px] text-slate-400">{stat.desc}</p>
            </div>
          );
        })}
      </div>

      {/* Candidate Dossier Grid */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-4">
          <div>
            <h2 className="text-xl font-black uppercase tracking-tight text-white font-mono">
              Cohort Candidate Profiles & Dossiers
            </h2>
            <p className="text-xs text-slate-400">
              Select a participant to inspect their completed missions, attempts count, skipped topics, and learning signals.
            </p>
          </div>
          <span className="text-xs font-mono text-cyan-400">
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
