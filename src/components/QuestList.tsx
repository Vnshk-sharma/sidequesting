import { useState, useEffect, useCallback } from "react";
import type { Quest } from "@/data/fitnessQuests";

interface QuestListProps {
  worldId: string;
  worldName: string;
  worldEmoji: string;
  quests: Quest[];
}

const QuestList = ({ worldId, worldName, worldEmoji, quests }: QuestListProps) => {
  const storageKey = `sidequest_${worldId}`;

  const loadState = useCallback((): Record<string, boolean> => {
    try {
      return JSON.parse(localStorage.getItem(storageKey) || "{}");
    } catch {
      return {};
    }
  }, [storageKey]);

  const [state, setState] = useState<Record<string, boolean>>(() => {
    const saved = loadState();
    const full: Record<string, boolean> = {};
    quests.forEach((q) => (full[q.id] = saved[q.id] ?? false));
    return full;
  });

  const [animating, setAnimating] = useState<string | null>(null);

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(state));
  }, [state, storageKey]);

  const toggle = (questId: string) => {
    const newVal = !state[questId];
    setState((prev) => ({ ...prev, [questId]: newVal }));
    if (newVal) {
      setAnimating(questId);
      setTimeout(() => setAnimating(null), 400);
    }
  };

  const completed = Object.values(state).filter(Boolean).length;
  const total = quests.length;
  const pct = total > 0 ? (completed / total) * 100 : 0;

  return (
    <div className="space-y-6">
      {/* Progress header */}
      <div className="panel p-4 space-y-3 animate-fade-up">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl">{worldEmoji}</span>
            <span className="text-xs text-muted-foreground font-mono">
              {completed} / {total} quests completed
            </span>
          </div>
          {completed === total && total > 0 && (
            <span className="status-badge-active quest-pop">ALL CLEAR ✓</span>
          )}
        </div>
        <div className="h-2 bg-quest-pending w-full">
          <div
            className="h-full bg-accent transition-all duration-700 ease-out"
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>

      {/* Quest items */}
      {quests.length === 0 ? (
        <div className="panel p-8 text-center animate-fade-up">
          <p className="text-muted-foreground text-sm">No quests available.</p>
        </div>
      ) : (
        <div className="space-y-2">
          {quests.map((quest, i) => {
            const done = state[quest.id];
            const isAnimating = animating === quest.id;
            return (
              <div
                key={quest.id}
                onClick={() => toggle(quest.id)}
                className={`panel-hover p-4 flex items-center gap-4 cursor-pointer select-none animate-fade-up ${
                  isAnimating ? "quest-pop" : ""
                }`}
                style={{ animationDelay: `${i * 0.05}s` }}
              >
                {/* Checkbox */}
                <div
                  className={`w-5 h-5 border-2 flex items-center justify-center flex-shrink-0 transition-all duration-200 ${
                    done
                      ? "border-accent bg-accent"
                      : "border-muted-foreground bg-transparent"
                  }`}
                >
                  {done && (
                    <svg
                      className={`w-3 h-3 text-primary-foreground ${isAnimating ? "quest-check-enter" : ""}`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={3}
                    >
                      <path strokeLinecap="square" strokeLinejoin="miter" d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>

                {/* Title */}
                <span
                  className={`text-sm transition-all duration-200 ${
                    done ? "text-accent line-through opacity-70" : "text-foreground"
                  }`}
                >
                  {quest.title}
                </span>

                {/* Status indicator */}
                <span className="ml-auto text-xs text-muted-foreground font-mono">
                  {done ? "done" : "pending"}
                </span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default QuestList;
