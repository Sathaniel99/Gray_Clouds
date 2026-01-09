// Iconos
import { Users, BicepsFlexed } from 'lucide-react';
import IconButton from '@mui/material/IconButton';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
// Hooks
import { useState } from 'react';
import { useTranslations } from '@/context/Languaje/useLanguaje';

const images = [
  "/Gray_Clouds/contact/photo_1.jpg",
  "/Gray_Clouds/contact/photo_2.jpg",
  "/Gray_Clouds/contact/photo_3.jpg",
  "/Gray_Clouds/contact/photo_4.jpg",
];

export const About = () => {
  const { t } = useTranslations();
  const [current, setCurrent] = useState(0);
  const [fade, setFade] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const stats = [
    { icon: BicepsFlexed, label: 'stats_t', value: '7+' },
    { icon: Users, label: 'stats_f', value: '4.6 mil+' }
  ];

  const specs = [
    { text: t('spec_1') },
    { text: t('spec_2') },
    { text: t('spec_3') },
    { text: t('spec_4') },
  ];

  const prevImage = () => {
    setFade(true);
    setLoading(true);
    setError(false);
    setTimeout(() => {
      setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1));
      setFade(false);
    }, 300);
  };

  const nextImage = () => {
    setFade(true);
    setLoading(true);
    setError(false);
    setTimeout(() => {
      setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));
      setFade(false);
    }, 300);
  };

  return (
    <section id="about" className="py-20 px-4">
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-6">
            <h2 className="text-4xl md:text-5xl font-bold neon-text">
              {t('about')}
            </h2>

            <p className="text-lg text-muted-foreground leading-relaxed">
              {t('descript_1')}
            </p>

            <p className="text-lg text-muted-foreground leading-relaxed">
              {t('descript_2')}
            </p>

            <div className="pt-6">
              <h3 className="text-xl font-semibold mb-4 neon-text">{t('spec_title')}</h3>
              <ul className="space-y-2 text-muted-foreground">
                {specs.map((element, index) => (
                  <li key={index} className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span>{element.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Stats & Image */}
          <div className="space-y-8">
            {/* Artist Image Carousel */}
            <div className="relative">
              <div className="aspect-square rounded-lg overflow-hidden glow-card bg-transparent">
                {loading ? (
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                    <div className="w-8 h-8 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
                  </div>
                ) : error ? (
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                    <div className="text-center">
                      <div className="text-gray-500 mb-2 text-2xl">⚠️</div>
                      <p className="text-gray-700">Error al cargar la imagen</p>
                    </div>
                  </div>
                ) : null}
                
                <img
                  src={images[current]}
                  onLoad={() => setLoading(false)}
                  onError={() => {
                    setLoading(false);
                    setError(true);
                  }}
                  alt={`Tatuador ${current + 1}`}
                  className={`w-full h-full object-cover transition-opacity duration-300 ${
                    fade ? 'opacity-0' : 'opacity-100'
                  } ${loading || error ? 'hidden' : 'block'}`}
                />

                <IconButton
                  onClick={prevImage}
                  className="!absolute !left-2 !top-1/2 -translate-y-1/2 !bg-black/40 !text-white backdrop-blur hover:!bg-black/70 transition"
                  aria-label="Anterior"
                  size="large"
                  sx={{
                    position: 'absolute',
                    left: 8,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    border: '1px solid grey'
                  }}
                >
                  <ArrowBackIosIcon />
                </IconButton>
                <IconButton
                  onClick={nextImage}
                  className="!absolute !right-2 !top-1/2 -translate-y-1/2 !bg-black/40 !text-white backdrop-blur hover:!bg-black/70 transition"
                  aria-label="Siguiente"
                  size="large"
                  sx={{
                    position: 'absolute',
                    right: 8,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    border: '1px solid grey'
                  }}
                >
                  <ArrowForwardIosIcon />
                </IconButton>

                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex space-x-2">
                  {images.map((_, idx) => (
                    <span
                      key={idx}
                      className={`block w-2 h-2 rounded-full ${idx === current ? 'bg-primary' : 'bg-white/40'}`}
                    />
                  ))}
                </div>
              </div>
              <div className="absolute -bottom-4 -right-4 w-24 h-24 border-2 border-primary/50 rounded-full backdrop-blur"></div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 gap-4">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center glow-card p-6 rounded-lg">
                  <stat.icon className="w-8 h-8 mx-auto mb-2 text-primary" />
                  <div className="text-2xl font-bold neon-text mb-1">{t('stats_t')}</div>
                  <div className="text-sm text-muted-foreground">{stat.value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;