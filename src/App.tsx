import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Index from "./pages/Index";
import Worlds from "./pages/Worlds";
import FitnessWorld from "./pages/FitnessWorld";
import StudyWorld from "./pages/StudyWorld";
import NotFound from "./pages/NotFound";
import SocialWorld from "./pages/SocialWorld";
import QuickStart from "./pages/QuickStart";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/quick-start" element={<QuickStart />} />
        <Route path="/worlds" element={<Worlds />} />
        <Route path="/worlds/fitness" element={<FitnessWorld />} />
        <Route path="/worlds/study" element={<StudyWorld />} />
        <Route path="/worlds/social" element={<SocialWorld />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;