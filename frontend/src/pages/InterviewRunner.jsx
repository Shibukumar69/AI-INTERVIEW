// frontend/src/pages/InterviewRunner.jsx
import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import MonacoEditor from "@monaco-editor/react";
import { CANDIDATE_PROFILES } from "../data/candidates";
import { CURRICULUM_DAYS } from "../data/curriculum";
import TelemetryHUD from "../components/TelemetryHUD";
import {
  Brain,
  Send,
  Code2,
  Mic,
  MicOff,
  Sparkles,
  Layers,
  ChevronRight,
  ArrowRight,
  RefreshCw,
  Award,
  Zap,
  HelpCircle,
  FileText,
  CheckCircle2,
  AlertTriangle
} from "lucide-react";
import axios from "axios";

const SUPPORTED_LANGUAGES = [
  { label: "Python", value: "python" },
  { label: "TypeScript", value: "typescript" },
  { label: "JavaScript", value: "javascript" },
  { label: "SQL", value: "sql" },
  { label: "Shell / Bash", value: "shell" }
];

const DEFAULT_CODE_TEMPLATES = {
  python: `# Day Mission: Implement your technical solution\ndef optimize_rag_retrieval(query: str, top_k: int = 10):\n    """Implement hybrid search with reciprocal rank fusion"""\n    pass\n`,
  typescript: `// Day Mission: Implement your technical solution\ninterface RAGPipeline {\n  retrieve(query: string, topK: number): Promise<Document[]>;\n}\n`,
  javascript: `// Day Mission: Implement your technical solution\nfunction optimizeSearch(query, options = {}) {\n  // Implementation here\n}\n`,
  sql: `-- Production vector & metadata filter query\nSELECT id, title, cosine_distance(embedding, $1) as distance\nFROM document_chunks\nWHERE tenant_id = $2\nORDER BY distance ASC\nLIMIT 10;\n`,
  shell: `#!/usr/bin/env bash\n# High-throughput vLLM serving launch\npython -m vllm.entrypoints.openai.api_server \\\n  --model mistralai/Mistral-7B-Instruct-v0.3 \\\n  --gpu-memory-utilization 0.90 \\\n  --max-num-seqs 256\n`
};

const InterviewRunner = () => {
  const { sessionId } = useParams();
  const navigate = useNavigate();

  // Session state
  const [candidate, setCandidate] = useState(CANDIDATE_PROFILES[0]);
  const [turnCount, setTurnCount] = useState(1);
  const [currentDayNumber, setCurrentDayNumber] = useState(1);
  const [moduleTitle, setModuleTitle] = useState("Retrieval-Augmented Generation");
  const [topic, setTopic] = useState("Document Parsing, Chunking Strategies & Tokenization");
  const [coveredDays, setCoveredDays] = useState([1]);
  const [isFollowUp, setIsFollowUp] = useState(false);
  const [conversation, setConversation] = useState([]);
  const [isThinking, setIsThinking] = useState(false);

  // Inputs
  const [answerText, setAnswerText] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("python");
  const [codeContent, setCodeContent] = useState(DEFAULT_CODE_TEMPLATES["python"]);
  const [showCodeEditor, setShowCodeEditor] = useState(true);
  const [isRecording, setIsRecording] = useState(false);
  const [showDossier, setShowDossier] = useState(false);

  const messagesEndRef = useRef(null);

  // Initialize or fetch session
  useEffect(() => {
    const initSession = async () => {
      setIsThinking(true);
      try {
        const res = await axios.get(`http://localhost:5000/api/interview/${sessionId}`);
        if (res.data) {
          setCandidate(res.data.candidate || CANDIDATE_PROFILES[0]);
          setTurnCount(res.data.turnCount || 1);
          setCurrentDayNumber(res.data.currentDayNumber || 1);
          setCoveredDays(res.data.coveredDays || [1]);
          if (res.data.conversationHistory) {
            setConversation(res.data.conversationHistory);
          }
        }
      } catch (e) {
        // Initialize client-side fallback
        const matched = CANDIDATE_PROFILES.find((c) => sessionId.includes(c.id)) || CANDIDATE_PROFILES[0];
        setCandidate(matched);
        const day1 = CURRICULUM_DAYS[0];
        setConversation([
          {
            role: "interviewer",
            text: `Welcome ${matched.name}! We're conducting your 31-Day Enterprise AI Cohort Technical Interview. Let's begin with your work on Day 1 (${day1.topic}):\n\n${day1.sampleQuestions[0]}`,
            dayNumber: 1,
            isFollowUp: false,
            timestamp: new Date()
          }
        ]);
      } finally {
        setIsThinking(false);
      }
    };
    initSession();
  }, [sessionId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [conversation, isThinking]);

  // Handle Response Submission
  const handleSubmitAnswer = async () => {
    if (!answerText.trim() && !codeContent.trim() && !isRecording) return;

    const currentText = answerText;
    const currentCode = showCodeEditor ? codeContent : "";

    // Add candidate turn immediately to UI
    const candidateMsg = {
      role: "candidate",
      text: currentText || (currentCode ? "Code implementation provided in editor." : "(Audio submitted)"),
      code: currentCode || null,
      dayNumber: currentDayNumber,
      timestamp: new Date()
    };

    setConversation((prev) => [...prev, candidateMsg]);
    setAnswerText("");
    setIsThinking(true);

    try {
      const res = await axios.post("http://localhost:5000/api/interview/chat", {
        sessionId,
        userAnswerText: currentText,
        userCode: currentCode
      });

      if (res.data) {
        setTurnCount(res.data.turnCount);
        setIsFollowUp(res.data.isFollowUp);
        setCurrentDayNumber(res.data.currentDayNumber);
        setModuleTitle(res.data.moduleTitle);
        setTopic(res.data.topic);
        setCoveredDays(res.data.coveredDays);

        const aiMsg = {
          role: "interviewer",
          text: res.data.questionText,
          dayNumber: res.data.currentDayNumber,
          isFollowUp: res.data.isFollowUp,
          timestamp: new Date()
        };

        setConversation((prev) => [...prev, aiMsg]);
      }
    } catch (e) {
      // Local client fallback response
      setTimeout(() => {
        const nextQCount = turnCount + 1;
        setTurnCount(nextQCount);

        let nextDay = currentDayNumber;
        let isNextFollowUp = false;

        if (nextQCount % 2 === 0) {
          isNextFollowUp = true;
          setIsFollowUp(true);
        } else {
          nextDay = (currentDayNumber % 31) + 1;
          setCurrentDayNumber(nextDay);
          if (!coveredDays.includes(nextDay)) {
            setCoveredDays((prev) => [...prev, nextDay]);
          }
          setIsFollowUp(false);
        }

        const currDayData = CURRICULUM_DAYS.find((d) => d.day === nextDay) || CURRICULUM_DAYS[0];
        setModuleTitle(currDayData.moduleTitle);
        setTopic(currDayData.topic);

        const aiText = isNextFollowUp
          ? `[Intelligent Follow-Up - Day ${nextDay}]: You noted key trade-offs in your explanation. How do you quantify P99 latency and memory footprints under 100M document scale?`
          : `Moving to Day ${nextDay} (${currDayData.topic}):\n\n${currDayData.sampleQuestions?.[0] || "Explain your technical implementation."}`;

        setConversation((prev) => [
          ...prev,
          {
            role: "interviewer",
            text: aiText,
            dayNumber: nextDay,
            isFollowUp: isNextFollowUp,
            timestamp: new Date()
          }
        ]);
      }, 1000);
    } finally {
      setIsThinking(false);
    }
  };

  // Complete & Generate Diagnostic Feedback
  const handleFinishInterview = async () => {
    setIsThinking(true);
    try {
      await axios.post("http://localhost:5000/api/interview/evaluate", { sessionId });
      navigate(`/review/${sessionId}`);
    } catch (e) {
      navigate(`/review/${sessionId}`);
    } finally {
      setIsThinking(false);
    }
  };

  const toggleRecording = () => {
    if (!isRecording) {
      setIsRecording(true);
      setAnswerText((prev) => prev + " [Voice input active: Transcribing verbal explanation...]");
    } else {
      setIsRecording(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6 animate-in fade-in duration-300">
      
      {/* Top Telemetry HUD */}
      <TelemetryHUD
        turnCount={turnCount}
        minRequiredQuestions={8}
        coveredDays={coveredDays}
        minRequiredDays={4}
        currentDayNumber={currentDayNumber}
        moduleTitle={moduleTitle}
        topic={topic}
        isFollowUp={isFollowUp}
        isThinking={isThinking}
      />

      {/* Main Chamber Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column: Conversational Chat Stream (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          
          {/* Chat Container */}
          <div className="glass-panel rounded-3xl p-6 border border-white/10 shadow-2xl flex flex-col h-[580px]">
            
            {/* Chat Header */}
            <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                  <Brain className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-black uppercase text-white font-mono">
                    Adaptive AI Interviewer
                  </h3>
                  <p className="text-[11px] text-slate-400">Grounded in 31-day cohort curriculum</p>
                </div>
              </div>

              <button
                onClick={() => setShowDossier(!showDossier)}
                className="px-3 py-1 rounded-xl bg-slate-900 border border-white/10 text-xs text-slate-300 hover:text-cyan-400 flex items-center space-x-1.5"
              >
                <span>Candidate Signals</span>
              </button>
            </div>

            {/* Message Feed */}
            <div className="flex-1 overflow-y-auto space-y-4 pr-2">
              {conversation.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex items-start space-x-3 ${
                    msg.role === "candidate" ? "flex-row-reverse space-x-reverse" : ""
                  }`}
                >
                  {/* Avatar */}
                  {msg.role === "interviewer" ? (
                    <div className="w-8 h-8 rounded-xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400 shrink-0 mt-1">
                      <Brain className="w-4 h-4" />
                    </div>
                  ) : (
                    <img
                      src={candidate.avatar}
                      alt={candidate.name}
                      className="w-8 h-8 rounded-xl object-cover border border-purple-500/40 shrink-0 mt-1"
                    />
                  )}

                  {/* Message Bubble */}
                  <div
                    className={`max-w-[85%] rounded-2xl p-4 text-xs leading-relaxed ${
                      msg.role === "candidate"
                        ? "bg-gradient-to-br from-indigo-600 to-purple-700 text-white shadow-lg shadow-indigo-500/20"
                        : "bg-slate-900/90 border border-white/10 text-slate-200 shadow-md"
                    }`}
                  >
                    {/* Badge for Interviewer Follow-ups */}
                    {msg.role === "interviewer" && msg.isFollowUp && (
                      <div className="mb-2 flex items-center space-x-1 text-[10px] font-bold uppercase tracking-wider text-rose-400">
                        <Zap className="w-3 h-3" />
                        <span>Adaptive Follow-Up Probe</span>
                      </div>
                    )}

                    <p className="whitespace-pre-wrap font-sans">{msg.text}</p>

                    {/* Attached Code Snippet if any */}
                    {msg.code && (
                      <div className="mt-3 p-3 rounded-xl bg-slate-950 border border-white/10 font-mono text-[11px] text-cyan-300 overflow-x-auto">
                        <pre>{msg.code}</pre>
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {/* Live Thinking indicator */}
              {isThinking && (
                <div className="flex items-center space-x-3 animate-in fade-in">
                  <div className="w-8 h-8 rounded-xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
                    <RefreshCw className="w-4 h-4 animate-spin" />
                  </div>
                  <div className="bg-slate-900/80 border border-white/10 p-3 rounded-2xl text-xs text-cyan-300 font-mono flex items-center space-x-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
                    <span>Synthesizing response & formulating next adaptive probe...</span>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input Response Box */}
            <div className="mt-4 pt-4 border-t border-white/10 space-y-3">
              <div className="relative">
                <textarea
                  value={answerText}
                  onChange={(e) => setAnswerText(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
                      handleSubmitAnswer();
                    }
                  }}
                  placeholder="Explain your architectural reasoning, trade-offs, and failure mode mitigations... (Cmd+Enter to submit)"
                  className="w-full h-24 p-3.5 rounded-2xl bg-slate-950/80 border border-white/10 text-white text-xs font-sans placeholder-slate-500 focus:border-cyan-400 focus:outline-none resize-none"
                />
              </div>

              {/* Action Buttons Toolbar */}
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center space-x-2">
                  <button
                    type="button"
                    onClick={toggleRecording}
                    className={`p-2.5 rounded-xl border text-xs font-bold transition-all flex items-center space-x-1.5 ${
                      isRecording
                        ? "bg-rose-500/20 border-rose-500 text-rose-400 animate-pulse"
                        : "bg-slate-900 border-white/10 text-slate-400 hover:text-white"
                    }`}
                    title="Toggle Audio Recording Transcription"
                  >
                    {isRecording ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                    <span className="hidden sm:inline">{isRecording ? "Recording..." : "Voice Input"}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setShowCodeEditor(!showCodeEditor)}
                    className={`p-2.5 rounded-xl border text-xs font-bold transition-all flex items-center space-x-1.5 ${
                      showCodeEditor
                        ? "bg-cyan-500/10 border-cyan-500/30 text-cyan-400"
                        : "bg-slate-900 border-white/10 text-slate-400 hover:text-white"
                    }`}
                  >
                    <Code2 className="w-4 h-4" />
                    <span className="hidden sm:inline">Code Editor</span>
                  </button>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    type="button"
                    onClick={handleSubmitAnswer}
                    disabled={isThinking}
                    className="flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-slate-950 font-black text-xs uppercase tracking-wider shadow-lg shadow-cyan-500/20 active:scale-95 transition-all"
                  >
                    <span>Submit Turn</span>
                    <Send className="w-3.5 h-3.5 text-slate-950" />
                  </button>
                </div>
              </div>

            </div>

          </div>

          {/* Complete Interview Button */}
          <div className="flex justify-end">
            <button
              onClick={handleFinishInterview}
              className="flex items-center space-x-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-black text-xs uppercase tracking-wider shadow-xl shadow-emerald-500/20 active:scale-95 transition-all"
            >
              <Award className="w-4 h-4 text-slate-950" />
              <span>Conclude Interview & Generate Structured Report</span>
            </button>
          </div>

        </div>

        {/* Right Column: Code Editor & Candidate Dossier (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          
          {/* Integrated Monaco Code Editor */}
          {showCodeEditor && (
            <div className="glass-panel rounded-3xl p-5 border border-white/10 shadow-2xl space-y-3">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div className="flex items-center space-x-2">
                  <Code2 className="w-4 h-4 text-cyan-400" />
                  <span className="text-xs font-mono font-bold text-white uppercase">
                    Interactive Code Sandbox
                  </span>
                </div>

                <select
                  value={selectedLanguage}
                  onChange={(e) => {
                    setSelectedLanguage(e.target.value);
                    setCodeContent(DEFAULT_CODE_TEMPLATES[e.target.value] || "");
                  }}
                  className="px-2.5 py-1 rounded-xl bg-slate-900 border border-white/10 text-cyan-300 text-xs font-mono focus:outline-none"
                >
                  {SUPPORTED_LANGUAGES.map((lang) => (
                    <option key={lang.value} value={lang.value}>
                      {lang.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Monaco Editor Component */}
              <div className="rounded-2xl overflow-hidden border border-white/10 h-[380px] bg-slate-950">
                <MonacoEditor
                  height="100%"
                  language={selectedLanguage}
                  theme="vs-dark"
                  value={codeContent}
                  onChange={(val) => setCodeContent(val || "")}
                  options={{
                    fontSize: 12,
                    fontFamily: "Fira Code, monospace",
                    minimap: { enabled: false },
                    scrollBeyondLastLine: false,
                    padding: { top: 12, bottom: 12 }
                  }}
                />
              </div>

              <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono">
                <span>Code included automatically in answer turn</span>
                <button
                  onClick={() => setCodeContent(DEFAULT_CODE_TEMPLATES[selectedLanguage] || "")}
                  className="hover:text-cyan-400 transition-colors"
                >
                  Reset Template
                </button>
              </div>
            </div>
          )}

          {/* Candidate Profile Quick Dossier */}
          <div className="glass-panel rounded-3xl p-5 border border-white/10 shadow-2xl space-y-4">
            <div className="flex items-center space-x-3">
              <img
                src={candidate.avatar}
                alt={candidate.name}
                className="w-11 h-11 rounded-2xl object-cover border border-cyan-400/40"
              />
              <div className="min-w-0 flex-1">
                <h4 className="text-sm font-bold text-white truncate font-mono">{candidate.name}</h4>
                <p className="text-[11px] text-cyan-400 truncate">{candidate.cohortTrack}</p>
                <p className="text-[10px] text-slate-400">{candidate.experienceLevel}</p>
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-slate-950/60 border border-white/5 space-y-2 text-xs">
              <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                Cohort Learning Signals
              </p>
              <div className="space-y-1 text-slate-300 text-[11px]">
                <div className="flex items-start space-x-1.5 text-emerald-300">
                  <CheckCircle2 className="w-3.5 h-3.5 mt-0.5 shrink-0 text-emerald-400" />
                  <span>{candidate.learningSignals?.strengths?.[0]}</span>
                </div>
                <div className="flex items-start space-x-1.5 text-rose-300">
                  <AlertTriangle className="w-3.5 h-3.5 mt-0.5 shrink-0 text-rose-400" />
                  <span>{candidate.learningSignals?.vulnerabilities?.[0]}</span>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};

export default InterviewRunner;