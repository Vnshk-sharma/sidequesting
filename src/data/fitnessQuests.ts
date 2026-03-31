export interface Quest {
  id: string;
  title: string;
}

export const fitnessQuests: Quest[] = [
  { id: "walk", title: "Go for a walk" },
  { id: "water", title: "Drink water" },
  { id: "stretch", title: "Stretch for 5 minutes" },
  { id: "pushups", title: "Do 10 push-ups" },
  { id: "sleep", title: "Sleep 7+ hours" },
];
