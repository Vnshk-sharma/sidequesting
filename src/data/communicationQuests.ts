import type { Quest } from "./fitnessQuests";

export const communicationQuests: Quest[] = [
  // Easy
  { id: "voice-note",       title: "Send a voice note instead of a text message",           difficulty: "Easy" },
  { id: "active-listen",    title: "Listen without interrupting in your next conversation",  difficulty: "Easy" },
  { id: "summarize-convo",  title: "After a conversation, summarize what you heard",         difficulty: "Easy" },

  // Medium
  { id: "explain-clearly",  title: "Explain something clearly to someone",                   difficulty: "Medium" },
  { id: "thoughtful-question", title: "Ask a thoughtful question in a conversation",         difficulty: "Medium" },
  { id: "express-opinion",  title: "Share your honest opinion on something today",           difficulty: "Medium" },
  { id: "give-feedback",    title: "Give someone constructive and kind feedback",            difficulty: "Medium" },

  // Hard
  { id: "speak-2min",       title: "Practice speaking out loud for 2 minutes",              difficulty: "Hard" },
  { id: "mirror-talk",      title: "Talk to yourself in the mirror for 1 minute",           difficulty: "Hard" },
  { id: "intro-yourself",   title: "Introduce yourself to someone you haven't met",         difficulty: "Hard" },
];
