// frontend/src/App.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import InterviewRunner from "./pages/InterviewRunner";
import SessionReview from "./pages/SessionReview";
import CurriculumExplorer from "./pages/CurriculumExplorer";
import CandidatesHub from "./pages/CandidatesHub";
import ApiSpecPage from "./pages/ApiSpecPage";
import NotFound from "./pages/NotFound";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <div className="min-h-screen bg-[#070a12] text-slate-100 bg-cyber-grid flex flex-col justify-between selection:bg-cyan-500 selection:text-slate-950">
      
      {/* Top Futuristic Navigation */}
      <Navbar />

      {/* Main Routed Content */}
      <main className="flex-1 pb-16">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/curriculum" element={<CurriculumExplorer />} />
          <Route path="/candidates" element={<CandidatesHub />} />
          <Route path="/api-spec" element={<ApiSpecPage />} />
          <Route path="/interview/:sessionId" element={<InterviewRunner />} />
          <Route path="/review/:sessionId" element={<SessionReview />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      {/* Bottom Subtle Footer */}
      <footer className="border-t border-white/5 py-6 text-center text-xs text-slate-500 font-mono">
        <p>AETHER COHORT // Enterprise AI Engineering Multi-Turn Technical Interview Agent</p>
      </footer>

      <ToastContainer position="bottom-right" theme="dark" autoClose={3000} />
    </div>
  );
};

export default App;
