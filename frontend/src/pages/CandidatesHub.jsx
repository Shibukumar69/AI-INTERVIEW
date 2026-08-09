// frontend/src/pages/CandidatesHub.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CANDIDATE_PROFILES } from "../data/candidates";
import CandidateCard from "../components/CandidateCard";
import AddCandidateModal from "../components/AddCandidateModal";
import { Users, UserPlus } from "lucide-react";
import axios from "axios";
import { getApiUrl } from "../config/api";

const CandidatesHub = () => {
  const navigate = useNavigate();
  const [candidates, setCandidates] = useState(CANDIDATE_PROFILES);
  const [filterTrack, setFilterTrack] = useState("all");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const res = await axios.get(getApiUrl("/api/candidates"));
        if (res.data?.candidates) setCandidates(res.data.candidates);
      } catch (e) {
        console.warn("Using default candidate dataset.");
      }
    };
    fetchCandidates();
  }, []);

  const handleCandidateCreated = (newCand) => {
    setCandidates((prev) => [newCand, ...prev]);
  };

  const filtered = candidates.filter(
    (c) => filterTrack === "all" || c.cohortTrack.toLowerCase().includes(filterTrack.toLowerCase())
  );

  const handleLaunch = async (candidate) => {
    try {
      const res = await axios.post(getApiUrl("/api/interview/start"), {
        candidateId: candidate.id,
        targetDays: candidate.recommendedProbeDays || [1, 6, 15, 24, 28]
      });

      if (res.data?.sessionId) {
        navigate(`/interview/${res.data.sessionId}`);
      } else {
        navigate(`/interview/session_${candidate.id}_${Date.now()}`);
      }
    } catch (e) {
      navigate(`/interview/session_${candidate.id}_${Date.now()}`);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-in fade-in duration-300">
      
      {/* Header Banner */}
      <div className="glass-panel rounded-3xl p-8 border border-[#e5dfeb] dark:border-white/10 shadow-ia-card dark:shadow-2xl relative overflow-hidden transition-colors duration-300">
        <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 dark:bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-3">
          <div className="flex items-center space-x-2">
            <Users className="w-5 h-5 text-purple-600 dark:text-cyan-400" />
            <span className="text-xs font-mono font-bold text-purple-700 dark:text-cyan-400 uppercase tracking-widest">
              Cohort Participants & Learning Signals
            </span>
          </div>

          <h1 className="text-3xl font-extrabold uppercase text-[#191522] dark:text-white font-heading tracking-tight">
            Candidate Profiles & Dossiers Hub
          </h1>

          <p className="text-xs sm:text-sm text-[#52495d] dark:text-slate-300 max-w-3xl leading-relaxed">
            Every candidate's progress through the 31-day AI Cohort has been cataloged with completed missions, attempts count, skipped topics, and learning signals for targeted interview orchestration.
          </p>

          {/* Filter & Add Candidate Bar */}
          <div className="pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex flex-wrap gap-2">
              {["all", "Systems", "Agentic", "Infrastructure", "Prompt", "Full-Stack"].map((track) => (
                <button
                  key={track}
                  onClick={() => setFilterTrack(track)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold font-mono transition-all ${
                    filterTrack === track
                      ? "bg-purple-600 text-white shadow-md shadow-purple-600/25 dark:bg-cyan-500 dark:text-slate-950 dark:shadow-cyan-500/25"
                      : "bg-[#fcfbfd] dark:bg-slate-900 text-[#706879] dark:text-slate-400 border border-[#e5dfeb] dark:border-white/5 hover:text-[#191522] dark:hover:text-white hover:border-purple-300"
                  }`}
                >
                  {track === "all" ? "All Tracks" : track + " Focus"}
                </button>
              ))}
            </div>

            <button
              onClick={() => setIsAddModalOpen(true)}
              className="flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 dark:from-cyan-500 dark:to-indigo-600 dark:hover:from-cyan-400 dark:hover:to-indigo-500 text-white dark:text-slate-950 font-extrabold text-xs uppercase tracking-wider shadow-ia-purple dark:shadow-cyan-500/20 active:scale-95 transition-all self-start sm:self-auto"
            >
              <UserPlus className="w-4 h-4 text-white dark:text-slate-950" />
              <span>+ Onboard Candidate</span>
            </button>
          </div>

        </div>
      </div>

      {/* Candidates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((candidate) => (
          <CandidateCard
            key={candidate.id}
            candidate={candidate}
            onSelect={() => {}}
            onLaunchInterview={(c) => handleLaunch(c)}
          />
        ))}
      </div>

      {/* Onboard Modal */}
      {isAddModalOpen && (
        <AddCandidateModal
          onClose={() => setIsAddModalOpen(false)}
          onCandidateCreated={handleCandidateCreated}
        />
      )}

    </div>
  );
};

export default CandidatesHub;
