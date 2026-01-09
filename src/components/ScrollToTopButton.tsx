// Iconos
import { ArrowUp } from 'lucide-react';
// Hooks
import { useEffect, useState } from 'react';

export const ScrollToTopButton = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    visible && (
      <button
        onClick={scrollToTop}
        className="fixed bottom-8 right-8 z-50 p-3 rounded-full md:flex neon-border text-white bg-primary/10 backdrop-blur border-neon hover:bg-primary hover:text-black active:bg-primary/30 active:text-white transition-all duration-300"
        aria-label="Volver arriba"
      >
        <ArrowUp className="w-6 h-6" />
      </button>
    )
  );
};