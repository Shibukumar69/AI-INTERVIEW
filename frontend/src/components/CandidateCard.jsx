// frontend/src/components/CandidateCard.jsx
import React from "react";
import {
  User,
  CheckCircle2,
  AlertTriangle,
  Flame,
  Award,
  ArrowRight,
  TrendingUp,
  Brain
} from "lucide-react";

const CandidateCard = ({
  candidate,
  isSelected = false,
  onSelect,
  onLaunchInterview
}) => {
  const completionPercentage = Math.round((candidate.completedMissions.length / 31) * 100);

  return (
    <div
      onClick={onSelect}
      className={`glass-panel-hover rounded-3xl p-6 border transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between ${
        isSelected
          ? "border-cyan-400 bg-slate-900/90 shadow-2xl shadow-cyan-500/20 ring-2 ring-cyan-400/40"
          : "border-white/10 bg-slate-950/60 hover:border-white/20"
      }`}
    >
      {/* Top Background Gradient */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />

      <div>
        {/* Candidate Header */}
        <div className="flex items-start space-x-4">
          <img
            src={candidate.avatar}
            alt={candidate.name}
            className="w-14 h-14 rounded-2xl object-cover border border-cyan-500/30 shadow-md shrink-0"
          />
          <div className="min-w-0 flex-1">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-black text-white truncate font-mono">{candidate.name}</h3>
              <span className="px-2 py-0.5 text-[10px] font-mono font-bold bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 rounded-md">
                {candidate.experienceLevel}
              </span>
            </div>
            <p className="text-xs text-cyan-400 font-semibold truncate mt-0.5">{candidate.cohortTrack}</p>
            <p className="text-[11px] text-slate-400 truncate">{candidate.targetRole}</p>
          </div>
        </div>

        {/* Missions Completed Progress Bar */}
        <div className="mt-5 space-y-1.5">
          <div className="flex justify-between items-center text-xs">
            <span className="text-slate-400 font-bold uppercase tracking-wider text-[10px]">
              Cohort Missions Progress
            </span>
            <span className="text-white font-mono font-bold text-[11px]">
              {candidate.completedMissions.length} / 31 Days ({completionPercentage}%)
            </span>
          </div>
          <div className="w-full h-2 rounded-full bg-slate-900 overflow-hidden border border-white/5">
            <div
              className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-indigo-500 transition-all duration-500"
              style={{ width: `${completionPercentage}%` }}
            />
          </div>
        </div>

        {/* Learning Signals & Summary */}
        <p className="text-xs text-slate-300 line-clamp-2 mt-4 leading-relaxed">
          {candidate.summary}
        </p>

        {/* Strengths & Vulnerabilities Pills */}
        <div className="mt-4 space-y-2 text-[11px]">
          {candidate.learningSignals?.strengths?.[0] && (
            <div className="flex items-start space-x-2 text-emerald-300">
              <CheckCircle2 className="w-3.5 h-3.5 mt-0.5 shrink-0 text-emerald-400" />
              <span className="line-clamp-1">{candidate.learningSignals.strengths[0]}</span>
            </div>
          )}
          {candidate.learningSignals?.vulnerabilities?.[0] && (
            <div className="flex items-start space-x-2 text-rose-300">
              <AlertTriangle className="w-3.5 h-3.5 mt-0.5 shrink-0 text-rose-400" />
              <span className="line-clamp-1">{candidate.learningSignals.vulnerabilities[0]}</span>
            </div>
          )}
        </div>

        {/* Skipped Topics Count */}
        {candidate.skippedTopics && candidate.skippedTopics.length > 0 && (
          <div className="mt-3 flex items-center space-x-1.5 text-[10px] text-amber-400 font-mono">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            <span>{candidate.skippedTopics.length} Skipped Topics (e.g. Day {candidate.skippedTopics[0].day})</span>
          </div>
        )}
      </div>

      {/* Action Footer */}
      <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
        <span className="text-[11px] font-mono text-slate-400">
          Probes: Days {candidate.recommendedProbeDays?.join(", ") || "1, 6, 15"}
        </span>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onLaunchInterview(candidate);
          }}
          className="flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-slate-950 font-black text-xs uppercase tracking-wider shadow-lg shadow-cyan-500/20 active:scale-95 transition-all"
        >
          <span>Interview</span>
          <ArrowRight className="w-3.5 h-3.5 text-slate-950" />
        </button>
      </div>

    </div>
  );
};

export default CandidateCard;
