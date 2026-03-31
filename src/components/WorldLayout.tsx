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
      <header className="border-b border-border px-6 py-4 flex items-center gap-4">
        <button
          onClick={() => navigate("/worlds")}
          className="text-muted-foreground hover:text-foreground transition-colors bg-transparent border-none cursor-pointer text-sm font-mono"
        >
          ← worlds
        </button>
        <div className="w-px h-4 bg-border" />
        <span className="text-foreground font-heading font-semibold text-sm">{worldName}</span>
      </header>
      <main className="max-w-2xl mx-auto px-6 py-10">
        {children}
      </main>
    </div>
  );
};

export default WorldLayout;
