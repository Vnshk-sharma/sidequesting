import type { Quest } from "./fitnessQuests";

export const socialQuests: Quest[] = [
  // Easy
  { id: "compliment", title: "Give someone a genuine compliment",    difficulty: "Easy" },
  { id: "message",    title: "Message an old friend",                difficulty: "Easy" },

  // Medium
  { id: "call",       title: "Call a friend or family member",       difficulty: "Medium" },
  { id: "coffee",     title: "Have a coffee or virtual chat",        difficulty: "Medium" },

  // Hard
  { id: "meet",       title: "Introduce yourself to someone new",    difficulty: "Hard" },
];
