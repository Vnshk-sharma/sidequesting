import type { Quest } from "./fitnessQuests";

export const studyQuests: Quest[] = [
  { id: "read", title: "Read for 20 minutes" },
  { id: "notes", title: "Review your notes" },
  { id: "flashcards", title: "Practice flashcards" },
  { id: "teach", title: "Teach someone a concept" },
  { id: "focus", title: "Focus session (25 min)" },

  // New quests 
  { id: "read-2-pages", title: "Read 2 pages of a book" },
  { id: "revise-topic", title: "Revise one topic" },
  { id: "solve-questions", title: "Solve 5 practice questions" },
  { id: "watch-video", title: "Watch an educational video" },
  { id: "summarize", title: "Summarize a concept in your own words" },
  { id: "review-yesterday", title: "Review yesterdays learning" },
  { id: "organize-materials", title: "Organize study materials" },
];
