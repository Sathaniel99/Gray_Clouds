// Context
import { useTranslations } from '@/context/Languaje/useLanguaje';
// Iconos
import { Heart, Phone, Mail, Home } from 'lucide-react';
// Hooks
import { useEffect } from "react";
import { useNavigate } from 'react-router-dom';
// Utiles
import { email, telefono_good, ubicacion_estudio } from '@/utils/vars';


export const Footer = () => {
  const navigate = useNavigate();
  const { t } = useTranslations();
  
  const navItems = [
    { name: t('header_nav_button_2'), href: '#gallery' },
    { name: t('header_nav_button_4'), href: '#services' },
    { name: t('header_nav_button_3'), href: '#about' },
    { name: t('header_nav_button_5'), href: '#contact' }
  ];

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
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Para marcar la sección correcta al cargar
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <footer className="py-12 px-4 border-t border-border bg-background text-foreground">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Logo & Description */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <img
                src="/Gray_Clouds/contact/ico.png"
                alt="Logo"
                className="h-8"
              />
              <span className="text-xl font-bold text-primary">{t('footer_name')}</span>
            </div>
            <p className="text-muted-foreground">
              {t('footer_label')}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4 text-foreground">{t('footer_quick_links')}</h4>
            <ul className="space-y-2">
              <li key={"Toda la Galeria"}>
                <button
                  onClick={() => navigate("/gallery")}
                  className="text-muted-foreground hover:text-primary transition-colors duration-300 relative group hover:cursor-pointer"
                >
                  {t('footer_all_gallery')}
                </button>
              </li>
              {navItems.map((item) => (
                <li key={item.name}>
                  <button
                    onClick={e => {
                      e.preventDefault();
                      const el = document.querySelector(item.href);
                      if (el) {
                        el.scrollIntoView({ behavior: "smooth" });
                      }
                    }}
                    className="text-muted-foreground hover:text-primary transition-colors duration-300 relative group hover:cursor-pointer"
                  >
                    {item.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold mb-4 text-foreground">{t('footer_info_studio')}</h4>
            <div className="space-y-2 text-muted-foreground flex flex-col">
              <div className='flex flex-row gap-2'>
                <Home className='text-cyan-500' />
                <p>{ubicacion_estudio}</p>
              </div>
              <div className='flex flex-row gap-2'>
                <Phone className='text-cyan-500' />
                <p>{telefono_good}</p>
              </div>
              <div className='flex flex-row gap-2'>
                <Mail className='text-cyan-500' />
                <p>{email}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center">
          <p className="text-muted-foreground text-sm">
            {t('footer_credits')}
          </p>
          <p className="text-muted-foreground text-sm flex items-center mt-4 md:mt-0">
            {t('footer_credits_label_1')} <Heart className="w-4 h-4 mx-1 text-primary" /> {t('footer_credits_label_2')}
          </p>
        </div>
      </div>
    </footer>
  );
};