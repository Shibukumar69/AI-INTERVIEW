import React, { useState, useEffect } from "react";
import { X, Sparkles, Key, Check, AlertCircle, RefreshCw, Cpu } from "lucide-react";
import axios from "axios";
import { getApiUrl } from "../config/api";

const SettingsModal = ({ onClose }) => {
  const [provider, setProvider] = useState("builtin");
  const [geminiApiKey, setGeminiApiKey] = useState("");
  const [openaiApiKey, setOpenaiApiKey] = useState("");
  const [groqApiKey, setGroqApiKey] = useState("");
  const [ollamaBaseUrl, setOllamaBaseUrl] = useState("http://localhost:11434");
  const [ollamaModel, setOllamaModel] = useState("mistral");
  const [isSaving, setIsSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    const fetchCurrent = async () => {
      try {
        const res = await axios.get(getApiUrl("/api/config/status"));
        if (res.data) {
          setProvider(res.data.activeProvider || "builtin");
          if (res.data.ollamaBaseUrl) setOllamaBaseUrl(res.data.ollamaBaseUrl);
          if (res.data.ollamaModel) setOllamaModel(res.data.ollamaModel);
        }
      } catch (e) {
        console.warn("Using offline settings defaults.");
      }
    };
    fetchCurrent();
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await axios.post(getApiUrl("/api/config/update"), {
        provider,
        geminiApiKey: geminiApiKey || undefined,
        openaiApiKey: openaiApiKey || undefined,
        groqApiKey: groqApiKey || undefined,
        ollamaBaseUrl,
        ollamaModel
      });
      setSavedSuccess(true);
      setTimeout(() => {
        setSavedSuccess(false);
        onClose();
      }, 1200);
    } catch (error) {
      alert("Failed to update AI settings on server.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl glass-panel rounded-3xl border border-cyan-500/30 p-6 sm:p-8 shadow-2xl overflow-hidden">
        
        {/* Ambient Top Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-cyan-500/20 blur-3xl pointer-events-none" />

        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-5">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-black uppercase tracking-tight text-white font-mono">
                AI Engine & Provider Studio
              </h3>
              <p className="text-xs text-slate-400">Configure multi-provider LLM credentials or use built-in engine</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSave} className="mt-6 space-y-5">
          
          {/* Provider Selection */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
              Select Active AI Inference Provider
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {[
                { id: "builtin", label: "Built-in Engine", desc: "Zero Setup / Offline" },
                { id: "gemini", label: "Google Gemini", desc: "Gemini 1.5/2.0 Flash" },
                { id: "openai", label: "OpenAI", desc: "GPT-4o / GPT-4o-mini" },
                { id: "groq", label: "Groq Cloud", desc: "Llama-3 70B Fast" },
                { id: "ollama", label: "Ollama Local", desc: "Local Mistral / Qwen" }
              ].map((p) => (
                <button
                  type="button"
                  key={p.id}
                  onClick={() => setProvider(p.id)}
                  className={`p-3 rounded-2xl border text-left transition-all ${
                    provider === p.id
                      ? "bg-cyan-500/20 border-cyan-400 text-white shadow-lg shadow-cyan-500/20"
                      : "bg-slate-900/60 border-white/10 text-slate-400 hover:text-slate-200 hover:border-white/20"
                  }`}
                >
                  <p className="text-xs font-bold text-cyan-300">{p.label}</p>
                  <p className="text-[10px] text-slate-400 mt-0.5">{p.desc}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Conditional Key Fields */}
          {provider === "builtin" && (
            <div className="p-4 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-xs text-cyan-200 flex items-start space-x-3">
              <Sparkles className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-white mb-1">Built-in Intelligent Enterprise AI Engine Active</p>
                <p className="text-slate-300 leading-relaxed">
                  Pre-calibrated with deep heuristic NLP reasoning across all 31 curriculum days, candidate profiles, and multi-turn adaptive follow-up algorithms. Requires <strong>zero external API keys or configuration</strong>!
                </p>
              </div>
            </div>
          )}

          {provider === "gemini" && (
            <div className="space-y-2 animate-in fade-in duration-200">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300">
                Google Gemini API Key (GEMINI_API_KEY)
              </label>
              <div className="relative">
                <Key className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-500" />
                <input
                  type="password"
                  value={geminiApiKey}
                  onChange={(e) => setGeminiApiKey(e.target.value)}
                  placeholder="AIzaSy..."
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-900/90 border border-white/10 text-white text-xs font-mono focus:border-cyan-400 focus:outline-none"
                />
              </div>
              <p className="text-[11px] text-slate-400">Enter your Gemini API key to enable instant multi-turn reasoning.</p>
            </div>
          )}

          {provider === "openai" && (
            <div className="space-y-2 animate-in fade-in duration-200">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300">
                OpenAI API Key (OPENAI_API_KEY)
              </label>
              <div className="relative">
                <Key className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-500" />
                <input
                  type="password"
                  value={openaiApiKey}
                  onChange={(e) => setOpenaiApiKey(e.target.value)}
                  placeholder="sk-..."
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-900/90 border border-white/10 text-white text-xs font-mono focus:border-cyan-400 focus:outline-none"
                />
              </div>
            </div>
          )}

          {provider === "groq" && (
            <div className="space-y-2 animate-in fade-in duration-200">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300">
                Groq API Key (GROQ_API_KEY)
              </label>
              <div className="relative">
                <Key className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-500" />
                <input
                  type="password"
                  value={groqApiKey}
                  onChange={(e) => setGroqApiKey(e.target.value)}
                  placeholder="gsk_..."
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-900/90 border border-white/10 text-white text-xs font-mono focus:border-cyan-400 focus:outline-none"
                />
              </div>
            </div>
          )}

          {provider === "ollama" && (
            <div className="grid grid-cols-2 gap-3 animate-in fade-in duration-200">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Ollama Host URL</label>
                <input
                  type="text"
                  value={ollamaBaseUrl}
                  onChange={(e) => setOllamaBaseUrl(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white text-xs font-mono"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Model Name</label>
                <input
                  type="text"
                  value={ollamaModel}
                  onChange={(e) => setOllamaModel(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white text-xs font-mono"
                />
              </div>
            </div>
          )}

          {/* Action buttons */}
          <div className="flex items-center justify-end space-x-3 pt-4 border-t border-white/10">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl text-xs font-bold text-slate-400 hover:text-white transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className="flex items-center space-x-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-slate-950 font-black text-xs uppercase tracking-wider shadow-lg shadow-cyan-500/25 active:scale-95 transition-all"
            >
              {isSaving ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin text-slate-950" />
                  <span>Saving...</span>
                </>
              ) : savedSuccess ? (
                <>
                  <Check className="w-4 h-4 text-slate-950" />
                  <span>Saved!</span>
                </>
              ) : (
                <span>Apply AI Configuration</span>
              )}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default SettingsModal;
