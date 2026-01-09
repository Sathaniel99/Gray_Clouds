// Hooks
import { useState, useEffect } from 'react';
// Iconos
import { X } from 'lucide-react';
// Componentes
import * as Dialog from "@radix-ui/react-dialog"; // ARREGLAR CON NUEVOS COMPONENTES
// Librerias
import { motion, AnimatePresence } from "framer-motion";
// Context
import { useTranslations } from '@/context/Languaje/useLanguaje';

export const Gallery = () => {
  const [activeFilter, setActiveFilter] = useState('cat_all');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [imageStatus, setImageStatus] = useState<{ [key: string]: 'loading' | 'loaded' | 'error' }>({});

  const { t } = useTranslations();

  const categories = [
    { id: 'cat_all', name: t('gallery_cat_all')},
    { id: 'cat_1', name: t('gallery_cat1')},
    { id: 'cat_2', name: t('gallery_cat2')},
    { id: 'cat_3', name: t('gallery_cat3')},
    { id: 'cat_4', name: t('gallery_cat4')},
    { id: 'cat_5', name: t('gallery_cat5')},
    { id: 'cat_6', name: t('gallery_cat6')},
  ];

  const tattoos = [
    { id: 1, category: 'cat_1', image: '/Gray_Clouds/tattoos/tattoo_ (1).jpeg' },
    { id: 2, category: 'cat_1', image: '/Gray_Clouds/tattoos/tattoo_ (3).jpeg' },
    { id: 3, category: 'cat_1', image: '/Gray_Clouds/tattoos/tattoo_ (18).jpeg' },
    { id: 4, category: 'cat_3', image: '/Gray_Clouds/tattoos/tattoo_ (5).jpeg' },
    { id: 5, category: 'cat_3', image: '/Gray_Clouds/tattoos/tattoo_ (9).jpeg' },
    { id: 6, category: 'cat_3', image: '/Gray_Clouds/tattoos/tattoo_ (11).jpeg' },
    { id: 8, category: 'cat_3', image: '/Gray_Clouds/tattoos/tattoo_ (19).jpeg' },
    { id: 9, category: 'cat_5', image: '/Gray_Clouds/tattoos/tattoo_ (8).jpeg' },
    { id: 10, category: 'cat_5', image: '/Gray_Clouds/tattoos/tattoo_ (10).jpeg' },
    { id: 11, category: 'cat_5', image: '/Gray_Clouds/tattoos/tattoo_ (15).jpeg' },
    { id: 12, category: 'cat_2', image: '/Gray_Clouds/tattoos/tattoo_ (2).jpeg' },
    { id: 13, category: 'cat_2', image: '/Gray_Clouds/tattoos/tattoo_ (6).jpeg' },
    { id: 14, category: 'cat_2', image: '/Gray_Clouds/tattoos/tattoo_ (7).jpeg' },
    { id: 15, category: 'cat_4', image: '/Gray_Clouds/tattoos/tattoo_ (4).jpeg' },
    { id: 16, category: 'cat_4', image: '/Gray_Clouds/tattoos/tattoo_ (13).jpeg' },
    { id: 17, category: 'cat_4', image: '/Gray_Clouds/tattoos/tattoo_ (14).jpeg' },
    { id: 18, category: 'cat_4', image: '/Gray_Clouds/tattoos/tattoo_ (17).jpeg' },
    { id: 19, category: 'cat_6', image: '/Gray_Clouds/tattoos/tattoo_ (16).jpeg' },
  ];

  const filteredTattoos = activeFilter === 'cat_all' ? tattoos : tattoos.filter(tattoo => tattoo.category === activeFilter);

  // Precargar imágenes cuando cambia el filtro
  useEffect(() => {
    filteredTattoos.forEach((tattoo) => {
      if (!imageStatus[tattoo.image]) {
        setImageStatus(prev => ({ ...prev, [tattoo.image]: 'loading' }));
        
        const img = new Image();
        img.src = tattoo.image;
        img.onload = () => {
          setImageStatus(prev => ({ ...prev, [tattoo.image]: 'loaded' }));
        };
        img.onerror = () => {
          setImageStatus(prev => ({ ...prev, [tattoo.image]: 'error' }));
        };
      }
    });
  }, [filteredTattoos]);

  return (
    <section id="gallery" className="py-20 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold neon-text mb-8">
            {t('gallery_label')}
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            {t('gallery_text')}
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveFilter(category.id)}
              className={`px-6 py-2 rounded-full border transition-all duration-300 ${activeFilter === category.id
                ? 'neon-border bg-primary/10 text-primary'
                : 'border-border bg-card/50 text-muted-foreground hover:text-primary hover:border-primary/50'
                }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 overflow-hidden" style={{ maskImage: 'linear-gradient(to top, #00000000, rgb(0 0 0))', maxHeight: '40rem' }}>
          <AnimatePresence>
            {filteredTattoos.map((tattoo, index) => {
              const status = imageStatus[tattoo.image] || 'loading';
              
              return (
                <motion.div
                  key={tattoo.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="group relative glow-card rounded-lg overflow-hidden transition-all duration-500 hover:scale-105 hover:shadow-lg hover:shadow-neutral-600 cursor-pointer"
                  style={{ animationDelay: `${index * 0.1}s` }}
                  onClick={() => setSelectedImage(tattoo.image)}
                >
                  <div className="aspect-[3/4] overflow-hidden relative">
                    {/* Loading State */}
                    {status === 'loading' && (
                      <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                        <div className="w-8 h-8 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
                      </div>
                    )}
                    
                    {/* Error State */}
                    {status === 'error' && (
                      <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                        <div className="text-center p-2">
                          <div className="text-gray-500 text-lg mb-1">⚠️</div>
                          <p className="text-xs text-gray-700">Error al cargar</p>
                        </div>
                      </div>
                    )}

                    {/* Image */}
                    {status === 'loaded' && (
                      <img
                        src={tattoo.image}
                        alt={tattoo.category + "_" + tattoo.id}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    )}
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>

      {/* Modal para la imagen */}
      <Dialog.Root open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/80 z-50" />
          <Dialog.Content className="fixed z-50 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 max-w-3xl w-full p-4 flex flex-col items-end">
            <button aria-label="Cerrar" className="mb-2 text-white hover:text-primary" onClick={() => setSelectedImage(null)}>
              <X className="w-8 h-8" />
            </button>
            {selectedImage && (
              <img
                src={selectedImage}
                alt="Vista previa"
                className="rounded-lg max-h-[80vh] mx-auto"
              />
            )}
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </section>
  );
};