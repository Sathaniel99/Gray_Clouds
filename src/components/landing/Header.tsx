
// Hooks
import { useState, useEffect } from 'react';
// Iconos
import { Menu, X } from 'lucide-react';
// Context
import { useTranslations } from '@/context/Languaje/useLanguaje';
// Componentes
import { ChangeLanguaje, Modal_reservar } from '../index';
import { Button } from '../ui/index';

export const Header = () => {
  const { t } = useTranslations();

  const navItems = [
    { name: t('header_nav_button_1'), href: '#home' },
    { name: t('header_nav_button_2'), href: '#gallery' },
    { name: t('header_nav_button_3'), href: '#about' },
    { name: t('header_nav_button_4'), href: '#services' },
    { name: t('header_nav_button_5'), href: '#contact' }
  ];

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState(navItems[0].href);
  const [logoStatus, setLogoStatus] = useState<'loading' | 'loaded' | 'error'>('loading');

  // Precargar el logo
  useEffect(() => {
    const img = new Image();
    img.src = "/Gray_Clouds/contact/ico.png";

    img.onload = () => {
      setLogoStatus('loaded');
    };

    img.onerror = () => {
      setLogoStatus('error');
    };
  }, []);

  // Efecto para el scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100;
      let currentSection = navItems[0].href;
      for (const item of navItems) {
        const el = document.querySelector(item.href);
        if (el && el instanceof HTMLElement) {
          if (el.offsetTop <= scrollPosition) {
            currentSection = item.href;
          }
        }
      }
      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="fixed top-0 w-full z-50 flex flex-col">
      <div className='glass-effect' style={{ background: 'rgb(0 0 0 / 45%)' }}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <div className="relative h-8 w-8">
                {/* Skeleton mientras carga */}
                {logoStatus === 'loading' && (
                  <div className="absolute inset-0 bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 rounded animate-pulse"></div>
                )}

                {/* Fallback si hay error */}
                {logoStatus === 'error' && (
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-900 rounded">
                    <span className="text-xs font-bold text-gray-400">GC</span>
                  </div>
                )}

                {/* Logo Image */}
                {logoStatus === 'loaded' && (
                  <img
                    src="/Gray_Clouds/contact/ico.png"
                    alt="Logo Gray Clouds"
                    className="h-8 w-auto"
                    onLoad={() => setLogoStatus('loaded')}
                    onError={() => setLogoStatus('error')}
                  />
                )}
              </div>
              <span className="text-xl font-bold neon-text">{t('header_name_page')}</span>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={e => {
                    e.preventDefault();
                    const el = document.querySelector(item.href);
                    if (el) {
                      el.scrollIntoView({ behavior: "smooth" });
                    }
                    setIsMenuOpen(false);
                  }}
                  className={`text-foreground hover:text-primary transition-colors duration-300 relative group hover:cursor-pointer
                    ${activeSection === item.href ? 'text-primary' : ''}
                  `}
                >
                  {item.name}
                  <span className={`absolute -bottom-1 left-0 h-0.5 bg-primary transition-all duration-300
                    ${activeSection === item.href ? 'w-full' : 'w-0'} group-hover:w-full`}></span>
                </button>
              ))}
            </nav>

            {/* CTA Button */}
            <div className='hidden md:flex'>
              <Modal_reservar />
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-foreground"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden py-4 bg-black/50 m-2 mb-4 rounded-lg">
              <nav className="flex flex-col space-y-1 px-4">
                {navItems.map((item) => (
                  <Button
                    key={item.name}
                    onClick={(e) => {
                      e.preventDefault();
                      const el = document.querySelector(item.href);
                      if (el) {
                        el.scrollIntoView({ behavior: "smooth" });
                      }
                      setIsMenuOpen(false);
                    }}
                    className="flex bg-cyan-500/5 hover:border-cyan-500 text-muted-foreground hover:text-white hover:bg-primary/50 transition-all duration-300 active:bg-cyan-500 active:text-black">
                    {item.name}
                  </Button>
                ))}
                <Modal_reservar />
              </nav>
            </div>
          )}
        </div>
      </div>
      <ChangeLanguaje />
    </header>
  );
};