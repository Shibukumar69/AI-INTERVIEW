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
  AlertTriangle,
  Volume2,
  VolumeX,
  Copy,
  Check,
  BookOpen,
  Info,
  Terminal,
  ShieldCheck
} from "lucide-react";
import axios from "axios";
import { getApiUrl } from "../config/api";

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

// Helper to extract the actual core question text from raw interviewer message
const extractQuestionDetails = (rawText) => {
  if (!rawText) return { greeting: "", question: "Please explain your technical implementation." };
  const parts = rawText.split(/\n\n+/);
  if (parts.length > 1) {
    return {
      greeting: parts[0],
      question: parts.slice(1).join("\n\n")
    };
  }
  return {
    greeting: "",
    question: rawText
  };
};

const InterviewRunner = () => {
  const { sessionId } = useParams();
  const navigate = useNavigate();

  // Find candidate matched by session or default
  const getInitialCandidate = () => {
    if (!sessionId) return CANDIDATE_PROFILES[0];
    const cand = CANDIDATE_PROFILES.find((c) => sessionId.toLowerCase().includes(c.id.toLowerCase()));
    return cand || CANDIDATE_PROFILES[0];
  };

  const initialCandidate = getInitialCandidate();
  const initialDayNum = initialCandidate.recommendedProbeDays?.[0] || 1;
  const initialCurriculumDay = CURRICULUM_DAYS.find((d) => d.day === initialDayNum) || CURRICULUM_DAYS[0];
  const initialQText = initialCurriculumDay.sampleQuestions?.[0] || `Explain your implementation for Day ${initialDayNum} (${initialCurriculumDay.topic}).`;

  // Session state
  const [candidate, setCandidate] = useState(initialCandidate);
  const [turnCount, setTurnCount] = useState(1);
  const [currentDayNumber, setCurrentDayNumber] = useState(initialDayNum);
  const [moduleTitle, setModuleTitle] = useState(initialCurriculumDay.moduleTitle);
  const [topic, setTopic] = useState(initialCurriculumDay.topic);
  const [coveredDays, setCoveredDays] = useState([initialDayNum]);
  const [isFollowUp, setIsFollowUp] = useState(false);
  const [activeQuestion, setActiveQuestion] = useState(initialQText);
  const [conversation, setConversation] = useState([
    {
      role: "interviewer",
      text: `Welcome ${initialCandidate.name}! We're conducting your 31-Day Enterprise AI Cohort Technical Interview. Let's begin with your work on Day ${initialDayNum} (${initialCurriculumDay.topic}):\n\n${initialQText}`,
      questionText: initialQText,
      dayNumber: initialDayNum,
      isFollowUp: false,
      timestamp: new Date()
    }
  ]);
  const [isThinking, setIsThinking] = useState(false);

  // UI Interactive state
  const [answerText, setAnswerText] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("python");
  const [codeContent, setCodeContent] = useState(DEFAULT_CODE_TEMPLATES["python"]);
  const [showCodeEditor, setShowCodeEditor] = useState(true);
  const [isRecording, setIsRecording] = useState(false);
  const [showDossier, setShowDossier] = useState(false);
  const [showDayObjectives, setShowDayObjectives] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [copiedQuestion, setCopiedQuestion] = useState(false);

  const messagesEndRef = useRef(null);
  const chatScrollRef = useRef(null);

  // Current curriculum day info
  const activeCurriculumData = CURRICULUM_DAYS.find((d) => d.day === currentDayNumber) || CURRICULUM_DAYS[0];

  // Initialize or fetch session from backend
  useEffect(() => {
    let isMounted = true;

    const initSession = async () => {
      setIsThinking(true);
      try {
        const res = await axios.get(getApiUrl(`/api/interview/${sessionId}`));
        if (res.data && isMounted) {
          const remoteCandidate = res.data.candidate || initialCandidate;
          const remoteTurnCount = res.data.turnCount || 1;
          const remoteDayNum = res.data.currentDayNumber || initialDayNum;
          const remoteCoveredDays = res.data.coveredDays || [remoteDayNum];
          const remoteCurriculumDay = CURRICULUM_DAYS.find((d) => d.day === remoteDayNum) || CURRICULUM_DAYS[0];

          setCandidate(remoteCandidate);
          setTurnCount(remoteTurnCount);
          setCurrentDayNumber(remoteDayNum);
          setCoveredDays(remoteCoveredDays);
          setModuleTitle(remoteCurriculumDay.moduleTitle);
          setTopic(remoteCurriculumDay.topic);

          if (res.data.conversationHistory && res.data.conversationHistory.length > 0) {
            setConversation(res.data.conversationHistory);
            // Get latest interviewer question
            const lastInterviewerMsg = [...res.data.conversationHistory].reverse().find((m) => m.role === "interviewer");
            if (lastInterviewerMsg) {
              const details = extractQuestionDetails(lastInterviewerMsg.text);
              setActiveQuestion(details.question);
              setIsFollowUp(!!lastInterviewerMsg.isFollowUp);
            }
          } else if (res.data.initialQuestion) {
            setActiveQuestion(res.data.initialQuestion.questionText || initialQText);
          }
        }
      } catch (e) {
        // Running seamlessly in offline/fallback mode with client state
        console.info("Using synchronized client interview session state.");
      } finally {
        if (isMounted) setIsThinking(false);
      }
    };

    initSession();

    return () => {
      isMounted = false;
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, [sessionId]);

  // Auto-scroll chat feed on conversation update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [conversation, isThinking]);

  // Read question aloud via Web Speech API
  const handleToggleSpeech = () => {
    if (!window.speechSynthesis) return;

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(activeQuestion);
    utterance.rate = 1.0;
    utterance.pitch = 1.05;
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    setIsSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  // Copy question to clipboard
  const handleCopyQuestion = () => {
    if (!activeQuestion) return;
    navigator.clipboard.writeText(activeQuestion);
    setCopiedQuestion(true);
    setTimeout(() => setCopiedQuestion(false), 2000);
  };

  // Handle Response Submission
  const handleSubmitAnswer = async () => {
    if (!answerText.trim() && !codeContent.trim() && !isRecording) return;

    if (isSpeaking && window.speechSynthesis) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }

    const currentText = answerText;
    const currentCode = showCodeEditor ? codeContent : "";

    // Add candidate turn immediately to UI
    const candidateMsg = {
      role: "candidate",
      text: currentText || (currentCode ? "Code implementation submitted in sandbox." : "(Audio voice answer submitted)"),
      code: currentCode || null,
      dayNumber: currentDayNumber,
      timestamp: new Date()
    };

    setConversation((prev) => [...prev, candidateMsg]);
    setAnswerText("");
    setIsThinking(true);

    try {
      const res = await axios.post(getApiUrl("/api/interview/chat"), {
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

        const newQText = res.data.questionText;
        const details = extractQuestionDetails(newQText);
        setActiveQuestion(details.question);

        const aiMsg = {
          role: "interviewer",
          text: newQText,
          questionText: details.question,
          dayNumber: res.data.currentDayNumber,
          isFollowUp: res.data.isFollowUp,
          timestamp: new Date()
        };

        setConversation((prev) => [...prev, aiMsg]);
      }
    } catch (e) {
      // Local client fallback response with adaptive transitions
      setTimeout(() => {
        const nextQCount = turnCount + 1;
        setTurnCount(nextQCount);

        let nextDay = currentDayNumber;
        let isNextFollowUp = false;

        if (nextQCount % 2 === 0) {
          isNextFollowUp = true;
          setIsFollowUp(true);
        } else {
          // Cycle through recommended probe days or consecutive curriculum days
          const probeDays = candidate.recommendedProbeDays || [1, 6, 15, 24, 28];
          const currentIndex = probeDays.indexOf(currentDayNumber);
          if (currentIndex !== -1 && currentIndex + 1 < probeDays.length) {
            nextDay = probeDays[currentIndex + 1];
          } else {
            nextDay = (currentDayNumber % 31) + 1;
          }
          setCurrentDayNumber(nextDay);
          if (!coveredDays.includes(nextDay)) {
            setCoveredDays((prev) => [...prev, nextDay]);
          }
          setIsFollowUp(false);
        }

        const currDayData = CURRICULUM_DAYS.find((d) => d.day === nextDay) || CURRICULUM_DAYS[0];
        setModuleTitle(currDayData.moduleTitle);
        setTopic(currDayData.topic);

        const generatedProbe = isNextFollowUp
          ? `[Intelligent Follow-Up - Day ${nextDay}]: Based on your explanation of ${currDayData.topic}, what are the primary latency bottlenecks (P99 SLA) and memory overheads when scaling to 10M concurrent queries?`
          : `Moving forward to Day ${nextDay} (${currDayData.moduleTitle} - ${currDayData.topic}):\n\n${currDayData.sampleQuestions?.[0] || "Walk me through your architectural implementation and core trade-offs."}`;

        const details = extractQuestionDetails(generatedProbe);
        setActiveQuestion(details.question);

        setConversation((prev) => [
          ...prev,
          {
            role: "interviewer",
            text: generatedProbe,
            questionText: details.question,
            dayNumber: nextDay,
            isFollowUp: isNextFollowUp,
            timestamp: new Date()
          }
        ]);
      }, 900);
    } finally {
      setIsThinking(false);
    }
  };

  // Complete & Generate Diagnostic Feedback
  const handleFinishInterview = async () => {
    setIsThinking(true);
    try {
      await axios.post(getApiUrl("/api/interview/evaluate"), { sessionId });
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
      setAnswerText((prev) => (prev ? prev + " " : "") + "[Voice transcription: Discussed hybrid search trade-offs, P99 latency budgets, and fallback circuit breaker policies...]");
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

      {/* ========================================================================= */}
      {/* PROMINENT ACTIVE QUESTION SPOTLIGHT CARD (HIGH VISIBILITY & CLARITY)       */}
      {/* ========================================================================= */}
      <div className="relative glass-panel rounded-3xl p-6 sm:p-7 border-2 border-cyan-500/40 shadow-2xl overflow-hidden glow-cyan bg-slate-950/90">
        
        {/* Glowing Top Ambient Accent */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-cyan-400 via-indigo-500 to-purple-500" />
        <div className="absolute -top-16 -right-16 w-48 h-48 bg-cyan-500/15 rounded-full blur-2xl pointer-events-none" />

        {/* Card Header with Badges & Action Controls */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-white/10">
          
          <div className="flex flex-wrap items-center gap-2">
            {/* Question Turn Badge */}
            <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-xl bg-cyan-500/20 border border-cyan-400 text-cyan-300 text-xs font-black uppercase font-mono tracking-wider shadow-sm">
              <HelpCircle className="w-3.5 h-3.5 text-cyan-400" />
              <span>Question #{turnCount} of 8+ Required</span>
            </span>

            {/* Curriculum Day Pill */}
            <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-xl bg-purple-500/20 border border-purple-400 text-purple-200 text-xs font-bold font-mono">
              <Layers className="w-3.5 h-3.5 text-purple-400" />
              <span>Day {currentDayNumber}: {activeCurriculumData.topic}</span>
            </span>

            {/* Follow-up vs Milestone Tag */}
            {isFollowUp ? (
              <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-xl bg-rose-500/20 border border-rose-500/50 text-rose-300 text-[11px] font-black uppercase tracking-wider animate-pulse">
                <Zap className="w-3.5 h-3.5 text-rose-400" />
                <span>Adaptive Deep-Dive Probe</span>
              </span>
            ) : (
              <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-xl bg-emerald-500/20 border border-emerald-500/50 text-emerald-300 text-[11px] font-bold uppercase tracking-wider">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Cohort Milestone Question</span>
              </span>
            )}
          </div>

          {/* Quick Action Tools */}
          <div className="flex items-center space-x-2">
            {/* Read Aloud Audio TTS */}
            <button
              type="button"
              onClick={handleToggleSpeech}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl border text-xs font-bold font-mono transition-all duration-200 ${
                isSpeaking
                  ? "bg-cyan-500 text-slate-950 border-cyan-400 shadow-md shadow-cyan-500/30 animate-pulse"
                  : "bg-slate-900/90 text-cyan-400 border-cyan-500/30 hover:bg-cyan-500/10 hover:text-cyan-300"
              }`}
              title="Listen to the AI Interviewer speak this question"
            >
              {isSpeaking ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
              <span>{isSpeaking ? "Mute Speech" : "Listen (TTS)"}</span>
            </button>

            {/* Copy Question Text */}
            <button
              type="button"
              onClick={handleCopyQuestion}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-slate-900/90 text-slate-300 border border-white/10 hover:text-white hover:border-white/30 text-xs font-bold font-mono transition-all"
              title="Copy question text to clipboard"
            >
              {copiedQuestion ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedQuestion ? "Copied!" : "Copy"}</span>
            </button>

            {/* Toggle Day Objectives Drawer */}
            <button
              type="button"
              onClick={() => setShowDayObjectives(!showDayObjectives)}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl border text-xs font-bold font-mono transition-all ${
                showDayObjectives
                  ? "bg-purple-500/20 text-purple-300 border-purple-500/50"
                  : "bg-slate-900/90 text-slate-400 border-white/10 hover:text-white"
              }`}
              title="View Day Objectives & Key Tools"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>{showDayObjectives ? "Hide Objectives" : "Curriculum Context"}</span>
            </button>
          </div>

        </div>

        {/* Core Question Text Display (Crisp, High Contrast, Large Font) */}
        <div className="pt-4 space-y-3">
          <div className="flex items-start space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-cyan-500 to-indigo-600 p-0.5 shadow-lg shrink-0 mt-0.5">
              <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center text-cyan-400">
                <Brain className="w-5 h-5" />
              </div>
            </div>

            <div className="min-w-0 flex-1">
              <p className="text-[11px] font-mono font-bold uppercase tracking-wider text-cyan-400 mb-1">
                Interviewer Technical Prompt:
              </p>
              <div className="p-4 rounded-2xl bg-slate-900/90 border border-cyan-500/30 text-white font-sans text-sm sm:text-base leading-relaxed tracking-wide shadow-inner">
                {activeQuestion}
              </div>
            </div>
          </div>

          {/* Expandable Day Objectives & Tools Context */}
          {showDayObjectives && (
            <div className="p-4 rounded-2xl bg-slate-950 border border-purple-500/30 text-xs space-y-2 animate-in fade-in duration-200">
              <div className="flex items-center space-x-2 text-purple-400 font-bold font-mono uppercase tracking-wider">
                <Info className="w-4 h-4" />
                <span>Day {currentDayNumber} Cohort Objectives & Evaluated Concepts:</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div>
                  <p className="text-[11px] text-slate-400 font-bold uppercase">Learning Objectives:</p>
                  <ul className="list-disc list-inside text-slate-300 space-y-1 mt-1">
                    {activeCurriculumData.objectives?.slice(0, 3).map((obj, i) => (
                      <li key={i} className="truncate">{obj}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-[11px] text-slate-400 font-bold uppercase">Tools & Tech Evaluated:</p>
                  <div className="flex flex-wrap gap-1.5 mt-1">
                    {activeCurriculumData.toolsUsed?.map((tool, i) => (
                      <span key={i} className="px-2 py-0.5 rounded-md bg-purple-500/10 text-purple-300 border border-purple-500/20 text-[11px] font-mono">
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Answer Guidance Pro-tip */}
          <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono pt-1">
            <span className="flex items-center space-x-1 text-slate-400">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400 inline shrink-0" />
              <span>Discuss architectural design, latency budgets (P99), failure modes & edge-case trade-offs.</span>
            </span>
            <span className="hidden sm:inline text-slate-500">Press Cmd+Enter or Ctrl+Enter to submit</span>
          </div>

        </div>

      </div>

      {/* Main Chamber Grid: Left Chat & Controls (7 cols) + Right Sandbox & Dossier (5 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column: Conversational Chat Stream (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          
          {/* Chat Container */}
          <div className="glass-panel rounded-3xl p-6 border border-white/10 shadow-2xl flex flex-col h-[560px]">
            
            {/* Chat Header */}
            <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                  <Brain className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-black uppercase text-white font-mono flex items-center space-x-2">
                    <span>Interview Dialogue Stream</span>
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  </h3>
                  <p className="text-[11px] text-slate-400">Multi-turn evaluation grounded in 31-day curriculum</p>
                </div>
              </div>

              <button
                onClick={() => setShowDossier(!showDossier)}
                className="px-3 py-1.5 rounded-xl bg-slate-900 border border-white/10 text-xs text-slate-300 hover:text-cyan-400 hover:border-cyan-500/30 flex items-center space-x-1.5 transition-all"
              >
                <span>Candidate Signals</span>
              </button>
            </div>

            {/* Message Feed */}
            <div ref={chatScrollRef} className="flex-1 overflow-y-auto space-y-4 pr-2">
              {conversation.map((msg, idx) => {
                const isInterviewer = msg.role === "interviewer";
                const details = isInterviewer ? extractQuestionDetails(msg.text) : null;

                return (
                  <div
                    key={idx}
                    className={`flex items-start space-x-3 ${
                      !isInterviewer ? "flex-row-reverse space-x-reverse" : ""
                    }`}
                  >
                    {/* Avatar */}
                    {isInterviewer ? (
                      <div className="w-9 h-9 rounded-xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400 shrink-0 mt-1 shadow-md">
                        <Brain className="w-4 h-4" />
                      </div>
                    ) : (
                      <img
                        src={candidate.avatar}
                        alt={candidate.name}
                        className="w-9 h-9 rounded-xl object-cover border-2 border-indigo-500/50 shrink-0 mt-1 shadow-md"
                      />
                    )}

                    {/* Message Bubble */}
                    <div
                      className={`max-w-[88%] rounded-2xl p-4 text-sm leading-relaxed ${
                        !isInterviewer
                          ? "bg-gradient-to-br from-indigo-600 to-purple-700 text-white shadow-lg shadow-indigo-500/20"
                          : "bg-slate-900/95 border border-white/10 text-slate-100 shadow-md"
                      }`}
                    >
                      {/* Interviewer Message Header / Badges */}
                      {isInterviewer && (
                        <div className="flex items-center justify-between gap-2 mb-2 pb-2 border-b border-white/10">
                          <div className="flex items-center space-x-1.5">
                            <span className="text-xs font-mono font-bold text-cyan-400 uppercase">
                              AI Technical Interviewer
                            </span>
                            {msg.dayNumber && (
                              <span className="text-[10px] px-2 py-0.5 rounded-md bg-white/5 text-slate-300 font-mono">
                                Day {msg.dayNumber}
                              </span>
                            )}
                          </div>
                          {msg.isFollowUp && (
                            <span className="flex items-center space-x-1 text-[10px] font-black uppercase text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded-full border border-rose-500/30">
                              <Zap className="w-3 h-3" />
                              <span>Adaptive Probe</span>
                            </span>
                          )}
                        </div>
                      )}

                      {/* Candidate Name Tag */}
                      {!isInterviewer && (
                        <div className="text-[11px] font-mono font-bold text-indigo-200 uppercase mb-1">
                          {candidate.name} (Candidate Response)
                        </div>
                      )}

                      {/* Formatted Content */}
                      {isInterviewer ? (
                        <div className="space-y-2">
                          {details?.greeting && (
                            <p className="text-xs text-slate-300 font-sans">{details.greeting}</p>
                          )}
                          <div className="p-3 rounded-xl bg-slate-950/80 border border-cyan-500/20 text-cyan-50 font-medium text-sm leading-relaxed">
                            {details?.question || msg.text}
                          </div>
                        </div>
                      ) : (
                        <p className="whitespace-pre-wrap font-sans text-sm">{msg.text}</p>
                      )}

                      {/* Attached Code Snippet if any */}
                      {msg.code && (
                        <div className="mt-3 p-3 rounded-xl bg-slate-950 border border-white/10 font-mono text-xs text-cyan-300 overflow-x-auto">
                          <div className="flex items-center space-x-1 text-[10px] uppercase font-bold text-slate-400 mb-1 border-b border-white/10 pb-1">
                            <Code2 className="w-3 h-3 text-cyan-400" />
                            <span>Submitted Code Implementation</span>
                          </div>
                          <pre>{msg.code}</pre>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}

              {/* Live Thinking indicator */}
              {isThinking && (
                <div className="flex items-center space-x-3 animate-in fade-in">
                  <div className="w-9 h-9 rounded-xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400 shadow-md">
                    <RefreshCw className="w-4 h-4 animate-spin" />
                  </div>
                  <div className="bg-slate-900/90 border border-cyan-500/30 p-3.5 rounded-2xl text-xs text-cyan-300 font-mono flex items-center space-x-2.5">
                    <div className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                    <span>Evaluating response against 31-day curriculum rubrics & formulating next probe...</span>
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
                      e.preventDefault();
                      handleSubmitAnswer();
                    }
                  }}
                  placeholder="Explain your architectural reasoning, trade-offs, and failure mode mitigations... (Cmd+Enter / Ctrl+Enter to submit)"
                  className="w-full h-24 p-3.5 rounded-2xl bg-slate-950/90 border border-white/10 text-white text-xs sm:text-sm font-sans placeholder-slate-500 focus:border-cyan-400 focus:outline-none resize-none transition-all shadow-inner"
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
                    disabled={isThinking || (!answerText.trim() && !codeContent.trim())}
                    className="flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 disabled:opacity-50 text-slate-950 font-black text-xs uppercase tracking-wider shadow-lg shadow-cyan-500/20 active:scale-95 transition-all cursor-pointer"
                  >
                    <span>Submit Turn</span>
                    <Send className="w-3.5 h-3.5 text-slate-950" />
                  </button>
                </div>
              </div>

            </div>

          </div>

          {/* Complete Interview Button */}
          <div className="flex justify-end pt-2">
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
                  <span>{candidate.learningSignals?.strengths?.[0] || "Demonstrates strong foundational execution in AI systems."}</span>
                </div>
                <div className="flex items-start space-x-1.5 text-rose-300">
                  <AlertTriangle className="w-3.5 h-3.5 mt-0.5 shrink-0 text-rose-400" />
                  <span>{candidate.learningSignals?.vulnerabilities?.[0] || "Needs probing on edge cases and latency SLAs."}</span>
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