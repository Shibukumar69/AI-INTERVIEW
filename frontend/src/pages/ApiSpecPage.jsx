import { getApiUrl } from "../config/api";

const SPEC_ENDPOINTS = [
  {
    method: "GET",
    path: "/api/curriculum",
    description: "Fetch the complete 31-day AI Cohort curriculum with 7 modules, daily topics, and tools.",
    samplePayload: null
  },
  {
    method: "GET",
    path: "/api/candidates",
    description: "Fetch all candidate profiles with completed missions, attempts, and learning signals.",
    samplePayload: null
  },
  {
    method: "POST",
    path: "/api/interview/start",
    description: "Initialize a personalized technical interview session for a candidate.",
    samplePayload: {
      candidateId: "candidate-1",
      targetDays: [1, 6, 15, 24, 28],
      mode: "adaptive"
    }
  },
  {
    method: "POST",
    path: "/api/interview/chat",
    description: "Submit a candidate's answer turn and generate intelligent adaptive follow-ups or next day topic.",
    samplePayload: {
      sessionId: "session_demo_1",
      userAnswerText: "We implemented HNSW with M=32 and efSearch=128 to balance latency and recall under 10M vectors.",
      userCode: "index.set_ef_search(128)"
    }
  },
  {
    method: "POST",
    path: "/api/interview/evaluate",
    description: "Conclude session and generate structured multi-dimensional evaluation report.",
    samplePayload: {
      sessionId: "session_demo_1"
    }
  },
  {
    method: "POST",
    path: "/api/agent/interview",
    description: "Technical Specification All-in-One Benchmark / Evaluation test runner endpoint.",
    samplePayload: {
      candidateId: "candidate-1",
      simulateTurns: 8
    }
  }
];

const ApiSpecPage = () => {
  const [selectedEndpoint, setSelectedEndpoint] = useState(SPEC_ENDPOINTS[0]);
  const [payloadInput, setPayloadInput] = useState(
    SPEC_ENDPOINTS[0].samplePayload ? JSON.stringify(SPEC_ENDPOINTS[0].samplePayload, null, 2) : ""
  );
  const [responseOutput, setResponseOutput] = useState(null);
  const [isExecuting, setIsExecuting] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleSelect = (ep) => {
    setSelectedEndpoint(ep);
    setPayloadInput(ep.samplePayload ? JSON.stringify(ep.samplePayload, null, 2) : "");
    setResponseOutput(null);
  };

  const handleExecute = async () => {
    setIsExecuting(true);
    setResponseOutput("Executing request...");
    try {
      let res;
      const url = getApiUrl(selectedEndpoint.path);
      if (selectedEndpoint.method === "GET") {
        res = await axios.get(url);
      } else {
        const body = payloadInput ? JSON.parse(payloadInput) : {};
        res = await axios.post(url, body);
      }
      setResponseOutput(JSON.stringify(res.data, null, 2));
    } catch (err) {
      setResponseOutput(
        JSON.stringify(
          {
            error: err.message,
            response: err.response?.data || "Make sure backend server is running."
          },
          null,
          2
        )
      );
    } finally {
      setIsExecuting(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(responseOutput || payloadInput);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="glass-panel rounded-3xl p-8 border border-white/10 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-3">
          <div className="flex items-center space-x-2">
            <Terminal className="w-5 h-5 text-cyan-400" />
            <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest">
              Technical Specification & API Sandbox
            </span>
          </div>

          <h1 className="text-3xl font-black uppercase text-white font-mono tracking-tight">
            REST API Contract & Live Sandbox
          </h1>

          <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
            Expose and test all required HTTP endpoints defined in the Technical Specification. Execute live requests against the local backend server.
          </p>
        </div>
      </div>

      {/* API Sandbox Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Endpoints Sidebar (4 cols) */}
        <div className="lg:col-span-4 glass-panel rounded-3xl p-4 border border-white/10 shadow-2xl space-y-2">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-2">
            Available Specification Endpoints
          </span>
          <div className="space-y-1.5 pt-2">
            {SPEC_ENDPOINTS.map((ep, i) => (
              <button
                key={i}
                onClick={() => handleSelect(ep)}
                className={`w-full p-3 rounded-2xl text-left transition-all flex items-center space-x-2.5 ${
                  selectedEndpoint.path === ep.path
                    ? "bg-cyan-500/20 border border-cyan-400 text-white shadow-lg shadow-cyan-500/20"
                    : "bg-slate-900/60 border border-white/5 text-slate-400 hover:text-white"
                }`}
              >
                <span
                  className={`px-2 py-0.5 rounded text-[10px] font-mono font-black ${
                    ep.method === "GET" ? "bg-emerald-500/20 text-emerald-300" : "bg-purple-500/20 text-purple-300"
                  }`}
                >
                  {ep.method}
                </span>
                <span className="text-xs font-mono font-bold text-slate-200 truncate">{ep.path}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Live Execution Console (8 cols) */}
        <div className="lg:col-span-8 glass-panel rounded-3xl p-6 sm:p-8 border border-white/10 shadow-2xl space-y-5">
          
          {/* Target Endpoint Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <span
                  className={`px-2.5 py-1 rounded-md text-xs font-mono font-black ${
                    selectedEndpoint.method === "GET"
                      ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                      : "bg-purple-500/20 text-purple-300 border border-purple-500/30"
                  }`}
                >
                  {selectedEndpoint.method}
                </span>
                <span className="text-base font-mono font-bold text-white">{selectedEndpoint.path}</span>
              </div>
              <p className="text-xs text-slate-400">{selectedEndpoint.description}</p>
            </div>

            <button
              onClick={handleExecute}
              disabled={isExecuting}
              className="flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-slate-950 font-black text-xs uppercase tracking-wider shadow-lg shadow-cyan-500/25 active:scale-95 transition-all"
            >
              <Play className="w-4 h-4 fill-slate-950" />
              <span>{isExecuting ? "Executing..." : "Send Request"}</span>
            </button>
          </div>

          {/* Request Payload Editor (if POST) */}
          {selectedEndpoint.method === "POST" && (
            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 font-mono">
                JSON Request Payload
              </label>
              <textarea
                value={payloadInput}
                onChange={(e) => setPayloadInput(e.target.value)}
                rows={5}
                className="w-full p-3.5 rounded-2xl bg-slate-950 border border-white/10 text-cyan-300 font-mono text-xs focus:border-cyan-400 focus:outline-none"
              />
            </div>
          )}

          {/* Response Output Console */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 font-mono">
                Response Output JSON
              </label>
              {responseOutput && (
                <button
                  onClick={handleCopy}
                  className="flex items-center space-x-1 text-[11px] font-mono text-cyan-400 hover:text-cyan-300"
                >
                  {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? "Copied" : "Copy JSON"}</span>
                </button>
              )}
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-white/10 h-72 overflow-y-auto text-xs font-mono text-slate-300">
              {responseOutput ? (
                <pre className="whitespace-pre-wrap">{responseOutput}</pre>
              ) : (
                <span className="text-slate-600 italic">Click "Send Request" to execute this endpoint live.</span>
              )}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};

export default ApiSpecPage;
