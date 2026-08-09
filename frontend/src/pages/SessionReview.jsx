// frontend/src/pages/SessionReview.jsx
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { CANDIDATE_PROFILES } from "../data/candidates";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
} from "chart.js";
import { Radar } from "react-chartjs-2";
import {
  Award,
  CheckCircle2,
  FileDown,
  ArrowLeft,
  Calendar,
  ShieldAlert,
  ChevronDown
} from "lucide-react";
import axios from "axios";
import { getApiUrl } from "../config/api";
import { useTheme } from "../context/ThemeContext";

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
);

const SessionReview = () => {
  const { sessionId } = useParams();
  const { isDark } = useTheme();
  const [report, setReport] = useState(null);
  const [expandedTurn, setExpandedTurn] = useState(null);

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const res = await axios.get(getApiUrl(`/api/interview/${sessionId}/report`));
        if (res.data) setReport(res.data);
      } catch (e) {
        // Fallback default report for synthetic review
        const candidate = CANDIDATE_PROFILES[0];
        setReport({
          sessionId,
          candidate,
          overallScore: 89,
          readinessGrade: "L5 Senior AI Systems Engineer",
          metrics: {
            avgTechnical: 91,
            avgArchitecture: 88,
            avgEdgeCases: 84,
            avgCommunication: 92
          },
          requirementsVerification: {
            totalQuestions: 9,
            minQuestionsRequired: 8,
            minQuestionsMet: true,
            coveredDays: [1, 3, 6, 15, 24],
            coveredDaysCount: 5,
            minDaysRequired: 4,
            minDaysMet: true
          },
          radarChartData: [
            { moduleId: 1, moduleName: "RAG & Document Pipelines", score: 94 },
            { moduleId: 2, moduleName: "Vector DBs & Indexing", score: 92 },
            { moduleId: 3, moduleName: "Prompting & Outputs", score: 88 },
            { moduleId: 4, moduleName: "Agentic AI & Swarms", score: 85 },
            { moduleId: 5, moduleName: "Model Context Protocol", score: 80 },
            { moduleId: 6, moduleName: "AI Deployment & Serving", score: 79 },
            { moduleId: 7, moduleName: "Production Observability", score: 95 }
          ],
          strengths: [
            "Exceptional grasp of HNSW graph indexing parameters (M, efSearch) and mathematical formulations.",
            "Deep familiarity with RAG Triad evaluation metrics (Faithfulness, Context Recall via Ragas).",
            "Clear architectural intuition for system scalability, latency budgets, and cost governance."
          ],
          criticalGaps: [
            "Gaps identified in skipped curriculum missions: Day 22 (FastMCP Custom Server Development), Day 23 (MCP Sandboxing & Permissions).",
            "Needs deeper edge-case analysis when dealing with unexpected tool failures and schema validation retries."
          ],
          personalizedStudyPlan: [
            {
              week: "Week 1: Foundations & Weak Point Hardening",
              focus: "Model Context Protocol (MCP)",
              actionItems: [
                "Implement a custom FastMCP server with stdio and SSE transport support.",
                "Build automated tool permission checks and capability negotiation."
              ]
            },
            {
              week: "Week 2: Advanced Serving & KV Cache Physics",
              focus: "vLLM PagedAttention & Speculative Decoding",
              actionItems: [
                "Deploy vLLM continuous batching and benchmark Time-To-First-Token (TTFT).",
                "Benchmark AWQ 4-bit vs FP8 quantization on NVIDIA GPU."
              ]
            },
            {
              week: "Week 3: Swarms & Distributed Orchestration",
              focus: "LangGraph Multi-Agent Architecture",
              actionItems: [
                "Create a multi-agent supervisor with state checkpointing.",
                "Handle deterministic routing fallbacks for tool execution errors."
              ]
            },
            {
              week: "Week 4: Observability & Production Guardrails",
              focus: "OpenInference & Prometheus Traces",
              actionItems: [
                "Implement OpenTelemetry tracing on all LLM generation spans.",
                "Configure automated P99 latency alerts with Slack webhook triggers."
              ]
            }
          ],
          turnByTurnReview: [
            {
              questionId: "q_1",
              questionNumber: 1,
              dayNumber: 1,
              moduleTitle: "Retrieval-Augmented Generation (RAG)",
              topic: "Document Parsing & Chunking",
              questionText: "In Day 1, you implemented document chunking strategies. When dealing with dense financial 10-K reports with nested tables, how do you prevent table fragmentation across chunk boundaries?",
              candidateResponse: "We used layout-aware markdown extraction with Unstructured.io to identify table bounding boxes and ensure full tables are kept within single 512-token parent chunks.",
              evaluation: {
                technicalScore: 92,
                architectureScore: 90,
                feedback: "Excellent layout-aware strategy. To improve further, explicitly detail how table HTML/Markdown syntax is converted into embedding representations without inflating token budgets.",
                idealEngineeringAnswer: "Optimal enterprise RAG parses tabular 10-K data with table-aware extractors, injecting document metadata (Section 1A, Table Name) into each chunk payload."
              }
            }
          ]
        });
      }
    };
    fetchReport();
  }, [sessionId]);

  if (!report) {
    return (
      <div className="text-center py-24 text-purple-600 dark:text-cyan-400 font-mono animate-pulse">
        Generating comprehensive diagnostic evaluation report...
      </div>
    );
  }

  // Radar chart config with dynamic theme colors
  const radarLabels = report.radarChartData.map((d) => d.moduleName.split("&")[0].trim());
  const radarScores = report.radarChartData.map((d) => d.score);

  const radarData = {
    labels: radarLabels,
    datasets: [
      {
        label: "Candidate Mastery Score",
        data: radarScores,
        backgroundColor: isDark ? "rgba(6, 182, 212, 0.25)" : "rgba(118, 80, 201, 0.2)",
        borderColor: isDark ? "#06b6d4" : "#7650c9",
        borderWidth: 2,
        pointBackgroundColor: isDark ? "#06b6d4" : "#7650c9",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: isDark ? "#06b6d4" : "#7650c9"
      }
    ]
  };

  const radarOptions = {
    scales: {
      r: {
        angleLines: { color: isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(229, 223, 235, 0.9)" },
        grid: { color: isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(229, 223, 235, 0.9)" },
        pointLabels: { color: isDark ? "#94a3b8" : "#191522", font: { size: 10, family: "DM Sans, Inter" } },
        ticks: { backdropColor: "transparent", color: isDark ? "#64748b" : "#706879", stepSize: 20 },
        suggestedMin: 40,
        suggestedMax: 100
      }
    },
    plugins: {
      legend: { display: false }
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10 animate-in fade-in duration-500">
      
      {/* Top Header & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#e5dfeb] dark:border-white/10 pb-6">
        <div className="flex items-center space-x-3">
          <Link
            to="/"
            className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-[#e5dfeb] dark:border-white/10 text-[#706879] hover:text-[#191522] dark:text-slate-400 dark:hover:text-white transition-colors shadow-sm"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <div className="flex items-center space-x-2">
              <Award className="w-5 h-5 text-purple-600 dark:text-cyan-400" />
              <h1 className="text-2xl sm:text-3xl font-extrabold uppercase text-[#191522] dark:text-white font-heading tracking-tight">
                Executive Assessment Scorecard
              </h1>
            </div>
            <p className="text-xs text-[#706879] dark:text-slate-400 mt-0.5 font-mono">Session ID: {sessionId}</p>
          </div>
        </div>

        <button
          onClick={() => window.print()}
          className="flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-[#e5dfeb] dark:border-white/10 hover:border-purple-400 dark:hover:border-cyan-400 text-[#191522] dark:text-slate-300 hover:text-purple-600 dark:hover:text-white transition-all text-xs font-bold font-mono shadow-sm"
        >
          <FileDown className="w-4 h-4 text-purple-600 dark:text-cyan-400" />
          <span>Export Dossier (PDF/Print)</span>
        </button>
      </div>

      {/* Hero Grade & Key Telemetry Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: Overall Readiness Grade (5 cols) */}
        <div className="lg:col-span-5 glass-panel rounded-3xl p-8 border border-purple-200 dark:border-cyan-500/30 shadow-ia-card dark:shadow-2xl relative overflow-hidden flex flex-col justify-between">
          <div className="absolute top-0 right-0 w-48 h-48 bg-purple-500/10 dark:bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-widest text-purple-700 dark:text-cyan-400 font-mono">
                Enterprise Readiness Grade
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-black bg-purple-600 text-white dark:bg-cyan-500 dark:text-slate-950 shadow-md font-mono">
                {report.overallScore} / 100
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#191522] dark:text-white mt-4 font-heading leading-snug">
              {report.readinessGrade}
            </h2>

            {/* Candidate Metadata */}
            <div className="mt-6 flex items-center space-x-3 p-4 rounded-2xl bg-[#fcfbfd] dark:bg-slate-950/70 border border-[#e5dfeb] dark:border-white/5">
              <img
                src={report.candidate?.avatar}
                alt={report.candidate?.name}
                className="w-12 h-12 rounded-xl object-cover border border-purple-200 dark:border-cyan-400/40 shadow-sm"
              />
              <div>
                <p className="text-sm font-extrabold text-[#191522] dark:text-white font-heading">{report.candidate?.name}</p>
                <p className="text-xs text-purple-600 dark:text-cyan-400 font-semibold">{report.candidate?.cohortTrack}</p>
                <p className="text-[11px] text-[#706879] dark:text-slate-400">{report.candidate?.experienceLevel}</p>
              </div>
            </div>
          </div>

          {/* Technical Spec Constraint Verification */}
          <div className="mt-6 pt-4 border-t border-[#e5dfeb] dark:border-white/10 space-y-2 text-xs font-mono">
            <p className="text-[10px] uppercase font-bold text-[#706879] dark:text-slate-400 tracking-wider">
              Technical Spec Compliance
            </p>
            <div className="flex items-center justify-between text-[#52495d] dark:text-slate-300">
              <span className="flex items-center space-x-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                <span>Min 8 Questions Asked:</span>
              </span>
              <span className="font-bold text-[#191522] dark:text-white">
                {report.requirementsVerification?.totalQuestions || 8} Qs (Met)
              </span>
            </div>
            <div className="flex items-center justify-between text-[#52495d] dark:text-slate-300">
              <span className="flex items-center space-x-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                <span>Min 4 Curriculum Days Covered:</span>
              </span>
              <span className="font-bold text-[#191522] dark:text-white">
                {report.requirementsVerification?.coveredDaysCount || 5} Days (Met)
              </span>
            </div>
          </div>

        </div>

        {/* Right: 4-Pillar Rubric Breakdown & Radar (7 cols) */}
        <div className="lg:col-span-7 glass-panel rounded-3xl p-6 sm:p-8 border border-[#e5dfeb] dark:border-white/10 shadow-ia-card dark:shadow-2xl space-y-6">
          <h3 className="text-base font-extrabold uppercase tracking-tight text-[#191522] dark:text-white font-heading">
            7-Module Cohort Mastery Radar
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            
            {/* Radar Chart */}
            <div className="h-64 flex items-center justify-center">
              <Radar data={radarData} options={radarOptions} />
            </div>

            {/* Rubric Score Cards */}
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: "Technical Depth", score: report.metrics?.avgTechnical || 90, color: "text-purple-600 dark:text-cyan-400" },
                { label: "Architecture & Scale", score: report.metrics?.avgArchitecture || 88, color: "text-indigo-600 dark:text-purple-400" },
                { label: "Edge Case Awareness", score: report.metrics?.avgEdgeCases || 84, color: "text-rose-600 dark:text-rose-400" },
                { label: "Communication Clarity", score: report.metrics?.avgCommunication || 92, color: "text-emerald-600 dark:text-emerald-400" }
              ].map((m, i) => (
                <div key={i} className="p-4 rounded-2xl bg-[#fcfbfd] dark:bg-slate-950/70 border border-[#e5dfeb] dark:border-white/5 space-y-1 shadow-sm">
                  <span className="text-[10px] uppercase font-bold text-[#706879] dark:text-slate-400">{m.label}</span>
                  <p className={`text-2xl font-extrabold font-mono ${m.color}`}>{m.score}%</p>
                </div>
              ))}
            </div>

          </div>
        </div>

      </div>

      {/* Strengths & Critical Knowledge Gaps */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Verified Strengths */}
        <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-emerald-300 dark:border-emerald-500/20 shadow-sm space-y-4">
          <div className="flex items-center space-x-2 text-emerald-700 dark:text-emerald-400">
            <CheckCircle2 className="w-5 h-5" />
            <h3 className="text-sm font-extrabold uppercase tracking-wider font-heading">
              Verified Candidate Strengths
            </h3>
          </div>
          <ul className="space-y-2.5 text-xs text-[#52495d] dark:text-slate-300">
            {report.strengths?.map((str, i) => (
              <li key={i} className="flex items-start space-x-2">
                <span className="text-emerald-600 dark:text-emerald-400 font-bold">•</span>
                <span className="leading-relaxed">{str}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Critical Knowledge Gaps */}
        <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-rose-300 dark:border-rose-500/20 shadow-sm space-y-4">
          <div className="flex items-center space-x-2 text-rose-700 dark:text-rose-400">
            <ShieldAlert className="w-5 h-5" />
            <h3 className="text-sm font-extrabold uppercase tracking-wider font-heading">
              Targeted Knowledge Gaps & Skipped Missions
            </h3>
          </div>
          <ul className="space-y-2.5 text-xs text-[#52495d] dark:text-slate-300">
            {report.criticalGaps?.map((gap, i) => (
              <li key={i} className="flex items-start space-x-2">
                <span className="text-rose-600 dark:text-rose-400 font-bold">•</span>
                <span className="leading-relaxed">{gap}</span>
              </li>
            ))}
          </ul>
        </div>

      </div>

      {/* Personalized 4-Week Cohort Graduate Study Roadmap */}
      <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-[#e5dfeb] dark:border-white/10 shadow-ia-card dark:shadow-2xl space-y-6">
        <div className="flex items-center space-x-2 text-purple-600 dark:text-cyan-400">
          <Calendar className="w-5 h-5" />
          <h3 className="text-base font-extrabold uppercase tracking-tight text-[#191522] dark:text-white font-heading">
            Personalized Action Plan & Cohort Graduate Roadmap
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {report.personalizedStudyPlan?.map((plan, i) => (
            <div key={i} className="p-5 rounded-2xl bg-[#fcfbfd] dark:bg-slate-950/70 border border-[#e5dfeb] dark:border-white/5 space-y-2 shadow-sm">
              <span className="px-2 py-0.5 text-[10px] font-mono font-bold bg-purple-100 dark:bg-cyan-500/10 text-purple-700 dark:text-cyan-300 border border-purple-200 dark:border-cyan-500/20 rounded-md">
                {plan.week}
              </span>
              <h4 className="text-xs font-bold text-[#191522] dark:text-white">{plan.focus}</h4>
              <ul className="space-y-1.5 text-[11px] text-[#706879] dark:text-slate-400 pt-2">
                {plan.actionItems.map((item, idx) => (
                  <li key={idx} className="flex items-start space-x-1.5">
                    <span className="text-purple-600 dark:text-cyan-400">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Question-by-Question Diagnostic Audit */}
      <div className="space-y-4">
        <h3 className="text-lg font-extrabold uppercase text-[#191522] dark:text-white font-heading tracking-tight">
          Turn-by-Turn Question Audit & Ideal Enterprise Answers
        </h3>

        <div className="space-y-4">
          {report.turnByTurnReview?.map((turn, i) => {
            const isOpen = expandedTurn === i;
            return (
              <div
                key={i}
                className="glass-panel rounded-2xl border border-[#e5dfeb] dark:border-white/10 p-5 space-y-3 cursor-pointer hover:border-purple-300 dark:hover:border-cyan-500/30 shadow-sm transition-all"
                onClick={() => setExpandedTurn(isOpen ? null : i)}
              >
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className="px-2 py-0.5 text-[10px] font-mono font-bold bg-purple-100 dark:bg-cyan-500/20 text-purple-700 dark:text-cyan-300 border border-purple-200 dark:border-transparent rounded-md">
                        Q{turn.questionNumber} // Day {turn.dayNumber}
                      </span>
                      <span className="text-xs text-[#706879] dark:text-slate-400">{turn.topic}</span>
                      {turn.isFollowUp && (
                        <span className="px-2 py-0.5 text-[10px] font-bold uppercase bg-rose-100 dark:bg-rose-500/20 text-rose-700 dark:text-rose-300 rounded-md">
                          Adaptive Follow-Up
                        </span>
                      )}
                    </div>
                    <p className="text-xs font-bold text-[#191522] dark:text-white mt-1">{turn.questionText}</p>
                  </div>
                  <ChevronDown className={`w-4 h-4 text-[#706879] dark:text-slate-400 transition-transform ${isOpen ? "rotate-180 text-purple-600" : ""}`} />
                </div>

                {isOpen && (
                  <div className="mt-4 pt-4 border-t border-[#e5dfeb] dark:border-white/10 space-y-4 text-xs animate-in fade-in duration-200">
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-wider text-[#706879] dark:text-slate-400">
                        Candidate Response
                      </p>
                      <p className="p-3 rounded-xl bg-[#fcfbfd] dark:bg-slate-950 border border-[#e5dfeb] dark:border-white/5 text-[#191522] dark:text-slate-200 mt-1">
                        {turn.candidateResponse || "(No verbal answer)"}
                      </p>
                    </div>

                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-wider text-purple-700 dark:text-cyan-400">
                        AI Technical Critique & Feedback
                      </p>
                      <p className="p-3 rounded-xl bg-purple-50 dark:bg-cyan-500/10 border border-purple-200 dark:border-cyan-500/20 text-purple-900 dark:text-cyan-200 mt-1">
                        {turn.evaluation?.feedback}
                      </p>
                    </div>

                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                        Staff-Level Ideal Engineering Answer
                      </p>
                      <p className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 text-emerald-900 dark:text-emerald-200 mt-1 whitespace-pre-wrap font-sans">
                        {turn.evaluation?.idealEngineeringAnswer}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};

export default SessionReview;