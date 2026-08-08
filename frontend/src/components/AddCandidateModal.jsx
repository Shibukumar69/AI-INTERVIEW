// frontend/src/components/AddCandidateModal.jsx
import React, { useState } from "react";
import { X, UserPlus, Sparkles, Check, Plus, Layers, Target } from "lucide-react";
import axios from "axios";

const TRACK_PRESETS = [
  "Senior AI Systems Engineer",
  "Enterprise Agentic AI Lead",
  "Production AI Systems & Inference Architect",
  "Applied AI Researcher & Prompt Architect",
  "Full-Stack AI Integrator",
  "LLM Platform & Observability Specialist"
];

const AddCandidateModal = ({ onClose, onCandidateCreated }) => {
  const [name, setName] = useState("");
  const [cohortTrack, setCohortTrack] = useState(TRACK_PRESETS[0]);
  const [experienceLevel, setExperienceLevel] = useState("Senior (5+ yrs)");
  const [targetRole, setTargetRole] = useState("Lead AI Infrastructure Engineer");
  const [summary, setSummary] = useState("");
  const [completedDays, setCompletedDays] = useState([1, 2, 3, 6, 7, 10, 12, 15, 20, 24, 28]);
  const [strengthInput, setStrengthInput] = useState("Mastered HNSW vector indexing & RAG Triad evaluation.");
  const [vulnInput, setVulnInput] = useState("Needs reinforcement on distributed MCP server sandboxing.");
  const [isSaving, setIsSaving] = useState(false);

  const toggleDay = (day) => {
    if (completedDays.includes(day)) {
      setCompletedDays(completedDays.filter((d) => d !== day));
    } else {
      setCompletedDays([...completedDays, day].sort((a, b) => a - b));
    }
  };

  const selectAllDays = () => {
    setCompletedDays(Array.from({ length: 31 }, (_, i) => i + 1));
  };

  const selectRAGDays = () => {
    setCompletedDays([1, 2, 3, 4, 5, 6, 7, 8]);
  };

  const selectAgenticDays = () => {
    setCompletedDays([10, 11, 12, 15, 16, 17, 18, 19, 20, 21, 22, 23]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    setIsSaving(true);
    const payload = {
      name,
      cohortTrack,
      experienceLevel,
      targetRole,
      summary: summary || `Cohort participant specialized in ${cohortTrack} with ${completedDays.length} missions completed.`,
      completedMissions: completedDays,
      strengths: [strengthInput],
      vulnerabilities: [vulnInput],
      avatar: `https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80`
    };

    try {
      const res = await axios.post("http://localhost:5000/api/candidates", payload);
      if (res.data?.candidate) {
        onCandidateCreated(res.data.candidate);
      } else {
        onCandidateCreated({ id: `candidate-${Date.now()}`, ...payload });
      }
      onClose();
    } catch (err) {
      // Local fallback
      onCandidateCreated({ id: `candidate-${Date.now()}`, ...payload });
      onClose();
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl glass-panel rounded-3xl border border-cyan-500/30 p-6 sm:p-8 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col justify-between">
        
        {/* Top Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-cyan-500/20 blur-3xl pointer-events-none" />

        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <UserPlus className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-black uppercase tracking-tight text-white font-mono">
                Onboard New Cohort Candidate
              </h3>
              <p className="text-xs text-slate-400">Add custom learner profile with completed missions & learning signals</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit} className="overflow-y-auto space-y-4 pr-1 py-4 flex-1">
          
          {/* Candidate Name & Track */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
                Candidate Full Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Vikram Patel / Sophia Sterling"
                required
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white text-xs font-mono focus:border-cyan-400 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
                Cohort Track
              </label>
              <select
                value={cohortTrack}
                onChange={(e) => setCohortTrack(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-cyan-300 text-xs font-mono focus:outline-none"
              >
                {TRACK_PRESETS.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Level & Target Role */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
                Experience Level
              </label>
              <select
                value={experienceLevel}
                onChange={(e) => setExperienceLevel(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white text-xs font-mono focus:outline-none"
              >
                <option value="Junior-Mid (2 yrs)">Junior-Mid (2 yrs)</option>
                <option value="Mid-Level (3-4 yrs)">Mid-Level (3-4 yrs)</option>
                <option value="Senior (5+ yrs)">Senior (5+ yrs)</option>
                <option value="Staff Architect (7+ yrs)">Staff Architect (7+ yrs)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
                Target Role
              </label>
              <input
                type="text"
                value={targetRole}
                onChange={(e) => setTargetRole(e.target.value)}
                placeholder="e.g. Lead AI Systems Engineer"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white text-xs font-mono focus:border-cyan-400 focus:outline-none"
              />
            </div>
          </div>

          {/* Completed Missions Selector */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-300">
                Completed Cohort Days ({completedDays.length}/31 Selected)
              </label>
              <div className="flex space-x-1.5 text-[10px] font-mono">
                <button type="button" onClick={selectAllDays} className="text-cyan-400 hover:underline">All 31</button>
                <span className="text-slate-600">|</span>
                <button type="button" onClick={selectRAGDays} className="text-cyan-400 hover:underline">RAG (1-8)</button>
                <span className="text-slate-600">|</span>
                <button type="button" onClick={selectAgenticDays} className="text-cyan-400 hover:underline">Agentic (10-23)</button>
              </div>
            </div>

            {/* 31 Day Chips */}
            <div className="flex flex-wrap gap-1 p-3 rounded-2xl bg-slate-950/80 border border-white/5 max-h-28 overflow-y-auto">
              {Array.from({ length: 31 }, (_, i) => i + 1).map((d) => {
                const isSelected = completedDays.includes(d);
                return (
                  <button
                    type="button"
                    key={d}
                    onClick={() => toggleDay(d)}
                    className={`px-2 py-1 rounded-lg text-[10px] font-mono font-bold transition-all ${
                      isSelected
                        ? "bg-cyan-500 text-slate-950 shadow-sm"
                        : "bg-slate-900 text-slate-500 border border-white/5 hover:text-white"
                    }`}
                  >
                    D{d}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Strengths & Vulnerabilities */}
          <div className="space-y-2">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-emerald-400 mb-1">
                Key Learning Strength
              </label>
              <input
                type="text"
                value={strengthInput}
                onChange={(e) => setStrengthInput(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-emerald-500/30 text-emerald-300 text-xs font-mono focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-rose-400 mb-1">
                Target Vulnerability / Gap To Probe
              </label>
              <input
                type="text"
                value={vulnInput}
                onChange={(e) => setVulnInput(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-rose-500/30 text-rose-300 text-xs font-mono focus:outline-none"
              />
            </div>
          </div>

          {/* Action Toolbar */}
          <div className="flex items-center justify-end space-x-3 pt-3 border-t border-white/10">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-bold text-slate-400 hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className="flex items-center space-x-1.5 px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-slate-950 font-black text-xs uppercase tracking-wider shadow-lg shadow-cyan-500/25 active:scale-95 transition-all"
            >
              <Plus className="w-4 h-4 text-slate-950" />
              <span>{isSaving ? "Onboarding..." : "Save & Onboard Candidate"}</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};

export default AddCandidateModal;
