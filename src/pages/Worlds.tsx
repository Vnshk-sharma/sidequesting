import { useNavigate } from "react-router-dom";

interface WorldCard {
  id: string;
  name: string;
  emoji: string;
  description: string;
  active: boolean;
  path?: string;
}

const worlds: WorldCard[] = [
  { id: "fitness", name: "Fitness World", emoji: "🏋️", description: "Move your body, level up your health.", active: true, path: "/worlds/fitness" },
  { id: "study", name: "Study World", emoji: "📚", description: "Learn something new every day.", active: true, path: "/worlds/study" },
  { id: "social", name: "Social World", emoji: "🤝", description: "Build connections, grow your network.", active: false },
  { id: "creative", name: "Creative World", emoji: "🎨", description: "Express yourself through creation.", active: false },
];

const getProgress = (worldId: string): { done: number; total: number } => {
  try {
    const data = JSON.parse(localStorage.getItem(`sidequest_${worldId}`) || "{}");
    const keys = Object.keys(data);
    const done = keys.filter((k) => data[k]).length;
    return { done, total: keys.length || 0 };
  } catch {
    return { done: 0, total: 0 };
  }
};

const Worlds = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen grid-bg">
      {/* Header */}
      <header className="border-b border-border px-6 py-4 flex items-center justify-between">
        <button onClick={() => navigate("/")} className="font-heading font-bold text-foreground text-lg bg-transparent border-none cursor-pointer hover:text-primary transition-colors">
          SQ
        </button>
        <span className="text-muted-foreground text-xs font-mono">worlds://index</span>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-12">
        <div className="space-y-2 mb-10 animate-fade-up">
          <h1 className="text-3xl font-heading font-bold text-foreground">Select a World</h1>
          <p className="text-muted-foreground text-sm font-mono">Choose your quest line. More worlds coming soon.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {worlds.map((world, i) => {
            const progress = world.active ? getProgress(world.id) : null;
            return (
              <div
                key={world.id}
                className={`animate-fade-up animate-fade-up-delay-${i + 1} ${
                  world.active ? "panel-hover cursor-pointer" : "panel opacity-50 cursor-not-allowed"
                } p-5 flex flex-col gap-3`}
                onClick={() => world.active && world.path && navigate(world.path)}
              >
                <div className="flex items-center justify-between">
                  <span className="text-2xl">{world.emoji}</span>
                  {world.active ? (
                    <span className="status-badge-active">ACTIVE</span>
                  ) : (
                    <span className="status-badge-soon">SOON</span>
                  )}
                </div>
                <h2 className="font-heading font-semibold text-foreground">{world.name}</h2>
                <p className="text-muted-foreground text-xs">{world.description}</p>
                {world.active && progress && progress.total > 0 && (
                  <div className="mt-auto pt-2">
                    <div className="flex justify-between text-xs text-muted-foreground mb-1">
                      <span>progress</span>
                      <span>{progress.done}/{progress.total}</span>
                    </div>
                    <div className="h-1 bg-quest-pending w-full">
                      <div
                        className="h-full bg-accent transition-all duration-500"
                        style={{ width: `${progress.total > 0 ? (progress.done / progress.total) * 100 : 0}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>
            );
          })}

          {/* Add world placeholder */}
          <div
            className="panel border-dashed p-5 flex flex-col items-center justify-center gap-2 cursor-pointer opacity-40 hover:opacity-60 transition-opacity animate-fade-up"
            onClick={() => alert("Fork the repo and add your own world!")}
          >
            <span className="text-3xl text-muted-foreground">+</span>
            <span className="text-xs text-muted-foreground font-mono">Add Your World</span>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Worlds;
