import { useState, useEffect, useCallback } from "react";
import type { Quest, Difficulty } from "@/data/fitnessQuests";

interface QuestListProps {
  worldId: string;
  worldEmoji: string;
  quests: Quest[];
}

const DIFFICULTY_ORDER: Difficulty[] = ["Easy", "Medium", "Hard"];

const DIFFICULTY_META: Record<Difficulty, { label: string; color: string; tag: string }> = {
  Easy:   { label: "Easy",   color: "text-emerald-400", tag: "border-emerald-500/40 text-emerald-400 bg-emerald-500/5" },
  Medium: { label: "Medium", color: "text-yellow-400",  tag: "border-yellow-500/40  text-yellow-400  bg-yellow-500/5"  },
  Hard:   { label: "Hard",   color: "text-red-400",     tag: "border-red-500/40     text-red-400     bg-red-500/5"     },
};

const QuestList = ({ worldId, worldEmoji, quests }: QuestListProps) => {
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
  const [flashId, setFlashId]     = useState<string | null>(null);
  const [progressGlow, setProgressGlow] = useState(false);
  const [collapsed, setCollapsed] = useState<Record<Difficulty, boolean>>({
    Easy: false, Medium: false, Hard: false,
  });

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(state));
  }, [state, storageKey]);

  const toggle = (questId: string) => {
    const newVal = !state[questId];
    setState((prev) => ({ ...prev, [questId]: newVal }));
    setFlashId(questId);
    setTimeout(() => setFlashId(null), 300);
    if (newVal) {
      setAnimating(questId);
      setTimeout(() => setAnimating(null), 400);
      setProgressGlow(true);
      setTimeout(() => setProgressGlow(false), 600);
    }
  };

  const resetAll = () => {
    const cleared: Record<string, boolean> = {};
    quests.forEach((q) => (cleared[q.id] = false));
    setState(cleared);
  };

  const toggleSection = (diff: Difficulty) => {
    setCollapsed((prev) => ({ ...prev, [diff]: !prev[diff] }));
  };

  const completed = Object.values(state).filter(Boolean).length;
  const total     = quests.length;
  const pct       = total > 0 ? (completed / total) * 100 : 0;

  // Group quests by difficulty
  const grouped = DIFFICULTY_ORDER.reduce<Record<Difficulty, Quest[]>>(
    (acc, diff) => {
      acc[diff] = quests.filter((q) => q.difficulty === diff);
      return acc;
    },
    { Easy: [], Medium: [], Hard: [] }
  );

  return (
    <div className="space-y-6">
      {/* System feedback */}
      <div className="flex items-center justify-between animate-fade-up">
        <span className="text-[10px] text-muted-foreground font-mono opacity-60">
          system: {worldId} module active
        </span>
        <span className="text-[10px] text-muted-foreground font-mono opacity-60">
          tracking daily activity…
        </span>
      </div>

      {/* Progress panel */}
      <div
        className={`panel p-5 space-y-4 animate-fade-up transition-shadow duration-500 ${
          progressGlow ? "shadow-[0_0_16px_hsl(var(--accent)/0.25)]" : ""
        }`}
      >
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[10px] text-muted-foreground font-mono uppercase tracking-widest">
              Status
            </span>
            <div className="flex items-center gap-2">
              <span className="text-lg">{worldEmoji}</span>
              <span className="text-sm text-foreground font-mono font-medium">
                {completed} / {total}
              </span>
              <span className="text-xs text-muted-foreground font-mono">
                quests completed
              </span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {completed === total && total > 0 && (
              <span className="status-badge-active quest-pop">ALL CLEAR ✓</span>
            )}
            <button
              onClick={resetAll}
              className="text-[10px] font-mono text-muted-foreground border border-border px-2 py-1 bg-transparent cursor-pointer hover:text-destructive hover:border-destructive transition-colors duration-200"
            >
              RESET
            </button>
          </div>
        </div>

        {/* Overall progress bar */}
        <div className="h-2 bg-quest-pending w-full overflow-hidden">
          <div
            className={`h-full bg-accent transition-all duration-700 ease-out ${
              progressGlow ? "shadow-[0_0_8px_hsl(var(--accent)/0.5)]" : ""
            }`}
            style={{ width: `${pct}%` }}
          />
        </div>

        {/* Per-difficulty mini bars */}
        <div className="flex gap-3 pt-1">
          {DIFFICULTY_ORDER.map((diff) => {
            const grp      = grouped[diff];
            const grpDone  = grp.filter((q) => state[q.id]).length;
            const grpPct   = grp.length > 0 ? (grpDone / grp.length) * 100 : 0;
            const meta     = DIFFICULTY_META[diff];
            return (
              <div key={diff} className="flex-1 space-y-1">
                <div className="flex justify-between items-center">
                  <span className={`text-[9px] font-mono uppercase tracking-widest ${meta.color}`}>
                    {diff}
                  </span>
                  <span className="text-[9px] font-mono text-muted-foreground">
                    {grpDone}/{grp.length}
                  </span>
                </div>
                <div className="h-0.5 bg-quest-pending w-full overflow-hidden">
                  <div
                    className="h-full transition-all duration-500"
                    style={{
                      width: `${grpPct}%`,
                      backgroundColor:
                        diff === "Easy" ? "#34d399" : diff === "Medium" ? "#facc15" : "#f87171",
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Grouped quest sections */}
      {quests.length === 0 ? (
        <div className="panel p-8 text-center animate-fade-up">
          <p className="text-muted-foreground text-sm font-mono">No quests available.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {DIFFICULTY_ORDER.map((diff) => {
            const group = grouped[diff];
            if (group.length === 0) return null;
            const meta       = DIFFICULTY_META[diff];
            const isCollapsed = collapsed[diff];
            const grpDone    = group.filter((q) => state[q.id]).length;

            return (
              <div key={diff} className="animate-fade-up">
                {/* Section header */}
                <button
                  onClick={() => toggleSection(diff)}
                  className="w-full flex items-center gap-3 px-1 py-2 bg-transparent border-none cursor-pointer group"
                >
                  <span className={`text-[10px] font-mono uppercase tracking-widest font-semibold ${meta.color}`}>
                    {diff}
                  </span>
                  <span className={`text-[9px] font-mono border px-1.5 py-0.5 ${meta.tag}`}>
                    {grpDone}/{group.length}
                  </span>
                  <div className="flex-1 h-px bg-border" />
                  <span className={`text-[10px] font-mono text-muted-foreground transition-transform duration-200 ${isCollapsed ? "" : "rotate-180"}`}>
                    ▲
                  </span>
                </button>

                {/* Quest items */}
                {!isCollapsed && (
                  <div className="space-y-1 mt-1">
                    {group.map((quest, i) => {
                      const done        = state[quest.id];
                      const isAnimating = animating === quest.id;
                      const isFlashing  = flashId   === quest.id;
                      return (
                        <div
                          key={quest.id}
                          onClick={() => toggle(quest.id)}
                          className={`quest-item group/item relative p-4 flex items-center gap-4 cursor-pointer select-none border border-border bg-card transition-all duration-200
                            ${isAnimating ? "quest-pop"   : ""}
                            ${isFlashing  ? "quest-flash" : ""}
                            ${done        ? "opacity-80"  : ""}
                          `}
                          style={{ animationDelay: `${i * 0.04}s` }}
                        >
                          {/* Left accent */}
                          <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-primary scale-y-0 group-hover/item:scale-y-100 transition-transform duration-200 origin-top" />

                          {/* Checkbox */}
                          <div
                            className={`w-5 h-5 border-2 flex items-center justify-center flex-shrink-0 transition-all duration-200 ${
                              done
                                ? "border-accent bg-accent shadow-[0_0_6px_hsl(var(--accent)/0.4)]"
                                : "border-muted-foreground bg-transparent group-hover/item:border-foreground"
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
                            className={`text-sm font-mono transition-all duration-200 ${
                              done ? "text-muted-foreground line-through" : "text-foreground"
                            }`}
                          >
                            {quest.title}
                          </span>

                          {/* Status */}
                          <span
                            className={`ml-auto text-[10px] font-mono uppercase tracking-wider transition-colors duration-200 ${
                              done ? "text-accent" : "text-muted-foreground opacity-0 group-hover/item:opacity-100"
                            }`}
                          >
                            {done ? "done" : "pending"}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default QuestList;
