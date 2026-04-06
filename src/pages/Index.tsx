import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen grid-bg flex flex-col items-center justify-center px-4">
      <div className="max-w-xl w-full text-center space-y-8">
        {/* Logo mark */}
        <div className="animate-fade-up flex justify-center">
          <div className="w-16 h-16 border-2 border-primary flex items-center justify-center">
            <span className="text-primary font-heading text-2xl font-bold">SQ</span>
          </div>
        </div>

        {/* Title */}
        <div className="animate-fade-up animate-fade-up-delay-1 space-y-3">
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-foreground tracking-tight">
            SideQuest Worlds
          </h1>
          <p className="text-muted-foreground text-sm md:text-base font-mono">
            Explore different worlds. Complete small quests.
          </p>
        </div>

        {/* CTA */}
        <div className="animate-fade-up animate-fade-up-delay-2 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => navigate("/quick-start")}
            className="w-full sm:w-auto px-8 py-3 bg-primary text-primary-foreground font-heading font-semibold text-sm tracking-wide border-none cursor-pointer transition-all duration-200 hover:translate-y-[-2px] hover:shadow-[0_4px_0_0_hsl(var(--primary)/0.4)] active:translate-y-0 active:shadow-none"
          >
            Quick Start
          </button>
          <button
            onClick={() => navigate("/worlds")}
            className="w-full sm:w-auto px-8 py-3 bg-transparent text-primary font-heading font-semibold text-sm tracking-wide border border-primary cursor-pointer transition-all duration-200 hover:bg-primary/5 hover:translate-y-[-2px] active:translate-y-0"
          >
            Explore Side Quests
          </button>
        </div>

        {/* Footer info */}
        <div className="animate-fade-up animate-fade-up-delay-3 pt-8">
          <p className="text-muted-foreground text-xs font-mono">
            [ discover worlds · take action · stay consistent ]
          </p>
        </div>
      </div>

      {/* Corner decorations */}
      <div className="fixed top-4 left-4 text-muted-foreground text-xs font-mono opacity-40">
        v0.1.0
      </div>
      <div className="fixed bottom-4 right-4 text-muted-foreground text-xs font-mono opacity-40">
        entering: sidequest_worlds
      </div>
    </div>
  );
};

export default Index;
