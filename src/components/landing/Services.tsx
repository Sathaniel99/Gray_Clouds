// Iconos
import { Clock, Palette, Brush, Aperture, PenTool } from 'lucide-react';
// Context
import { useTranslations } from '@/context/Languaje/useLanguaje';
// Componentes
import { Modal_reservar } from '../index';


export const Services = () => {
  const { t } = useTranslations();

  const services = [
    {
      icon: Aperture,
      duration: `2-4`
    },
    {
      icon: PenTool,
      duration: `4-8`
    },
    {
      icon: Brush,
      duration: `4-8`
    },
    {
      icon: Palette,
      duration: `1-2`
    }
  ];

  const services_mini = [
    { step: '1', title: 'services_proces_item1_title', desc: 'services_proces_item1_desc' },
    { step: '2', title: 'services_proces_item2_title', desc: 'services_proces_item2_desc' },
    { step: '3', title: 'services_proces_item3_title', desc: 'services_proces_item3_desc' },
    { step: '4', title: 'services_proces_item4_title', desc: 'services_proces_item4_desc' }
  ]


  return (
    <section id="services" className="py-20 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 neon-text">
            {t('services_label')}
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {t('services_text')}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {services.map((service, index) => (
            <div key={index} className="glow-card p-6 rounded-lg text-center group hover:scale-105 transition-all duration-300 flex flex-col items-center justify-between">
              <div>
                <service.icon className="w-12 h-12 mx-auto mb-4 text-primary animate-glow-pulse rounded-full backdrop-blur" />
                <h3 className="text-xl font-semibold mb-2">{t(`services_item_${index + 1}_title`)}</h3>
              </div>
              <p className="text-muted-foreground mb-4 text-sm">{t(`services_item_${index + 1}_description`)}</p>
              <div>
                <div className="space-y-2 mb-4">
                  <div className="flex items-center justify-center text-sm text-muted-foreground">
                    <Clock className="w-4 h-4 mr-1" />
                    <span>{`${service.duration} ${t('services_hours')}`}</span>
                  </div>
                </div>

                <Modal_reservar />
              </div>
            </div>
          ))}
        </div>

        {/* Process Section */}
        <div className="glow-card p-8 rounded-lg">
          <h3 className="text-2xl font-bold text-center mb-8 neon-text">{t('services_proces')}</h3>
          <div className="grid md:grid-cols-4 gap-6">
            {services_mini.map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-12 h-12 mx-auto mb-4 rounded-full neon-border flex items-center justify-center neon-text font-bold transition-all hover:bg-primary hover:text-black cursor-pointer">
                  {item.step}
                </div>
                <h4 className="font-semibold mb-2">{t(item.title)}</h4>
                <p className="text-sm text-muted-foreground">{t(item.desc)}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};