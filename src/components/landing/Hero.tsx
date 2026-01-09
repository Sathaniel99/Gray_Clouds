// Iconos
import { ArrowDown } from 'lucide-react';
// Componentes
import { Button } from '@/components/ui/button';
// Hooks
import { useState } from 'react';
// Librerias
import { useNavigate } from 'react-router-dom';
// Context
import { useTranslations } from '@/context/Languaje/useLanguaje';

export const Hero = () => {
  const navigate = useNavigate();
  const { t } = useTranslations();
  const [logoLoaded, setLogoLoaded] = useState(false);

  const handleScrollToGallery = () => {
    const gallerySection = document.querySelector("#gallery");
    if (gallerySection) {
      gallerySection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-black"></div>
      <div className="absolute top-20 left-10 w-20 h-20 border border-slate-500/30 rounded-full animate-float backdrop-blur"></div>
      <div className="absolute bottom-20 right-10 w-32 h-32 border border-secondary/30 rounded-full animate-float backdrop-blur" style={{ animationDelay: '1s' }}></div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 animate-slide-up">
        {/* Logo con loading simple */}
        <div className="mb-20 relative">
          {!logoLoaded && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-8 h-8 border-4 border-gray-700 border-t-blue-500 rounded-full animate-spin"></div>
            </div>
          )}

          <img
            src="/Gray_Clouds/contact/logo.jpg"
            alt={t('hero_logo')}
            className={`transition-opacity duration-500 ${logoLoaded ? 'opacity-100' : 'opacity-0'}`}
            onLoad={() => setLogoLoaded(true)}
            onError={() => setLogoLoaded(true)} // Si hay error, mostramos igual para no bloquear
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full">
          <Button
            size="lg"
            className="neon-border bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-2000 animate-glow-pulse"
            onClick={handleScrollToGallery}
          >
            {t('hero_1st_btn')}
          </Button>
          <Button
            onClick={() => navigate("/gallery")}
            size="lg"
            className="md:flex border-neutral-500 border-2 bg-neutral-950 text-muted-foreground hover:text-white hover:bg-neutral-800 transition-all duration-300 active:bg-neutral-700 active:text-white"
          >
            {t('hero_2nd_btn')}
          </Button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ArrowDown className="w-6 h-6 text-primary" />
      </div>
    </section>
  );
};