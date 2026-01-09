// Componentes
import { ScrollToTopButton } from './components/index';
import { Landing_page, Gallery_total, NotFound } from './pages';
import { Toaster as Sonner, TooltipProvider } from "@/components/ui/index";
// Context
import { LanguageProvider } from "./context/Languaje/LanguajeContext";
// Librerias
import { HashRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";



const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <TooltipProvider>
        <Sonner />
        <HashRouter>
          <Routes>
            <Route path="/" element={<Landing_page />} />
            <Route path="/gallery" element={<Gallery_total />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <ScrollToTopButton />
        </HashRouter>
      </TooltipProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
