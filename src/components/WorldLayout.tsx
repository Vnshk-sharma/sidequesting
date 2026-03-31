import { useNavigate } from "react-router-dom";
import type { ReactNode } from "react";

interface WorldLayoutProps {
  worldName: string;
  children: ReactNode;
}

const WorldLayout = ({ worldName, children }: WorldLayoutProps) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen grid-bg">
      <header className="border-b border-border px-6 py-4 flex items-center gap-6">
        <button
          onClick={() => navigate("/worlds")}
          className="text-muted-foreground hover:text-primary transition-colors bg-transparent border-none cursor-pointer text-sm font-mono"
        >
          ← worlds
        </button>
        <div className="w-px h-5 bg-border" />
        <span className="text-foreground font-heading font-semibold text-sm tracking-wide">{worldName}</span>
        <span className="ml-auto text-[10px] text-muted-foreground font-mono opacity-50">
          module::loaded
        </span>
      </header>
      <main className="max-w-2xl mx-auto px-6 py-10">
        {children}
      </main>
    </div>
  );
};

export default WorldLayout;
