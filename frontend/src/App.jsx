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
import { ThemeProvider, useTheme } from "./context/ThemeContext";

const MainLayout = () => {
  const { isDark } = useTheme();

  return (
    <div className="min-h-screen bg-[#f8f6fb] dark:bg-[#070a12] text-[#191522] dark:text-slate-100 bg-cyber-grid flex flex-col justify-between selection:bg-purple-500 selection:text-white dark:selection:bg-cyan-500 dark:selection:text-slate-950 transition-colors duration-300">
      {/* Ambient background glows for Light / Dark */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        {isDark ? (
          <>
            <div className="absolute -top-40 -right-40 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
            <div className="absolute top-1/2 -left-40 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
          </>
        ) : (
          <>
            <div className="absolute -top-32 -right-32 w-[32rem] h-[32rem] bg-purple-200/40 rounded-full blur-3xl" />
            <div className="absolute top-1/3 -left-32 w-96 h-96 bg-purple-100/60 rounded-full blur-3xl" />
          </>
        )}
      </div>

      {/* Top Navigation */}
      <div className="relative z-50">
        <Navbar />
      </div>

      {/* Main Routed Content */}
      <main className="relative z-10 flex-1 pb-16">
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
      <footer className="relative z-10 border-t border-[#e5dfeb] dark:border-white/5 py-6 text-center text-xs text-[#706879] dark:text-slate-500 font-sans">
        <p className="flex items-center justify-center space-x-2">
          <span>AETHER // Autonomous Enterprise AI Engineering Multi-Turn Technical Interview Agent</span>
          <span className="hidden sm:inline text-purple-400 dark:text-cyan-500">•</span>
          <span className="hidden sm:inline">31-Day Cohort Master Evaluator</span>
        </p>
      </footer>

      <ToastContainer position="bottom-right" theme={isDark ? "dark" : "light"} autoClose={3000} />
    </div>
  );
};

const App = () => {
  return (
    <ThemeProvider>
      <MainLayout />
    </ThemeProvider>
  );
};

export default App;
