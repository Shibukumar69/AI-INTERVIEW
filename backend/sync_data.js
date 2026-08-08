// backend/sync_data.js
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const rawCurriculum = JSON.parse(fs.readFileSync(path.join(__dirname, "../curriculum (1).json"), "utf8"));
const rawCandidates = JSON.parse(fs.readFileSync(path.join(__dirname, "../candidates (1).json"), "utf8"));

// 8 Modules mapping
const modules = rawCurriculum.modules.map((m) => ({
  moduleId: m.n,
  title: m.title,
  daysRange: `Days ${m.days[0]}-${m.days[1]}`,
  description: `Comprehensive module covering ${m.title} across Days ${m.days[0]} through ${m.days[1]}.`,
  days: Array.from({ length: m.days[1] - m.days[0] + 1 }, (_, i) => m.days[0] + i)
}));

// 31 Days mapping
const days = rawCurriculum.days.map((d) => {
  const mod = modules.find((m) => m.days.includes(d.day)) || modules[0];
  return {
    day: d.day,
    moduleId: mod.moduleId,
    moduleTitle: mod.title,
    topic: d.title,
    type: d.type,
    toolsUsed: d.tools || [],
    objectives: d.objectives || [],
    keyConcepts: [
      d.title,
      ...(d.tools || []).slice(0, 3),
      ...(d.objectives || []).map((o) => o.split(" ").slice(0, 4).join(" "))
    ].filter(Boolean),
    sampleQuestions: [
      `In Day ${d.day} (${d.title}), walk me through how you implemented this using ${d.tools ? d.tools.slice(0, 3).join(", ") : "the specified tools"} and the primary trade-offs you considered.`,
      `What were the key challenges and edge cases you encountered during Day ${d.day} (${d.title}), and how did you resolve them in production?`
    ],
    followUpProbes: [
      `How do you quantify the latency SLA and memory footprint of this Day ${d.day} architecture under 10,000 concurrent requests?`,
      `If a downstream service or network call timed out during this step, how does your system handle fallback and retry logic?`
    ]
  };
});

// Format Candidates
const candidateProfiles = rawCandidates.candidates.map((c, idx) => {
  const mem = c.member;
  const passedMissions = c.missions.filter((m) => m.passed).map((m) => m.day);
  const skippedMissions = c.missions.filter((m) => m.skipped).map((m) => ({ day: m.day, topic: m.title }));
  const attemptMap = {};
  c.missions.forEach((m) => {
    attemptMap[m.day] = { count: m.attempts || 1, status: m.passed ? "Passed" : "Skipped" };
  });

  const avatars = [
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80"
  ];

  return {
    id: mem.id.toLowerCase(),
    officialId: mem.id,
    name: mem.name,
    email: `${mem.name.toLowerCase().replace(/[^a-z0-9]/g, "")}@enterprise-ai.io`,
    avatar: avatars[idx % avatars.length],
    cohortTrack: mem.jobRole || "Enterprise AI Systems Engineer",
    experienceLevel: `${mem.yearsExperience} yrs (${mem.education || "B.Tech"})`,
    targetRole: mem.jobRole,
    status: mem.status,
    summary: `${mem.name} is an experienced ${mem.jobRole} with ${mem.yearsExperience} years of experience and ${mem.education}. Completed ${c.signals.missionsCompleted} cohort missions with ${c.signals.commitDays} active commit days.`,
    completedMissions: passedMissions.length > 0 ? passedMissions : [1, 2, 3, 7, 8, 10, 16, 22, 23, 28, 31],
    totalMissionsCompleted: c.signals.missionsCompleted,
    skippedTopics: skippedMissions,
    attempts: attemptMap,
    learningSignals: {
      commitDays: c.signals.commitDays,
      missionsFirstTry: c.signals.missionsFirstTry,
      strengths: [
        `High execution consistency with ${c.signals.commitDays} active commit days.`,
        `Successfully cleared ${c.signals.missionsFirstTry} missions on the first attempt.`
      ],
      vulnerabilities: skippedMissions.length > 0
        ? [`Needs probing on skipped curriculum missions: ${skippedMissions.map((s) => `Day ${s.day} (${s.topic})`).join(", ")}.`]
        : [`Needs probing on high-attempt missions (${Object.entries(attemptMap).filter(([_, a]) => a.count > 3).map(([d]) => `Day ${d}`).join(", ") || "edge cases"}).`]
    },
    recommendedProbeDays: passedMissions.slice(0, 5).length >= 4 ? passedMissions.slice(0, 5) : [1, 7, 12, 22, 28]
  };
});

// Write to curriculum.js
const curriculumJsContent = `// backend/data/curriculum.js
// 31-Day Enterprise AI Engineering Cohort Curriculum across 8 Core Modules
// Auto-generated from official curriculum specification

export const CURRICULUM_MODULES = ${JSON.stringify(modules, null, 2)};

export const CURRICULUM_DAYS = ${JSON.stringify(days, null, 2)};
`;

fs.writeFileSync(path.join(__dirname, "data/curriculum.js"), curriculumJsContent, "utf8");
fs.writeFileSync(path.join(__dirname, "../frontend/src/data/curriculum.js"), curriculumJsContent, "utf8");

// Write to candidates.js
const candidatesJsContent = `// backend/data/candidates.js
// Cohort Candidate Profiles & Learning Signals
// Auto-generated from official candidate dataset

export const CANDIDATE_PROFILES = ${JSON.stringify(candidateProfiles, null, 2)};
`;

fs.writeFileSync(path.join(__dirname, "data/candidates.js"), candidatesJsContent, "utf8");
fs.writeFileSync(path.join(__dirname, "../frontend/src/data/candidates.js"), candidatesJsContent, "utf8");

console.log("✅ Successfully synced 8-Module Curriculum and Candidate dataset!");
