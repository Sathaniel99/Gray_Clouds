// Hooks
import { useState } from 'react';
// Iconos
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';
import { SocialIcon } from 'react-social-icons'
// Componentes
import { Button, Input, Textarea, toast_sonner } from "@/components/ui/index";
// Context
import { useTranslations } from '@/context/Languaje/useLanguaje';
// Utiles
import { telefono, redes, telefono_good, email, ubicacion_estudio } from '@/utils/vars';


interface FormType {
  name: string
  textarea: string
}

export const Contact = () => {
  const [formValues, setFormValues] = useState({
    name: '',
    textarea: ''
  });

  const {t} = useTranslations();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setFormValues({ ...formValues, [e.target.name]: e.target.value })


  const sendMessage = (data: FormType) => {
    const phone = telefono;
    const text = `${t('contact_msge_wsp')} ${data.name}, ${data.textarea}`;
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
    toast_sonner.success(t('contact_toast'), {
      duration: 2000, position: "top-center"
    })
    window.open(url, "_blank");
  }


  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    sendMessage(formValues)
  }


  const contactInfo = [
    {
      icon: MapPin,
      title: [t('services_location_studio')],
      details: [ubicacion_estudio]
    },
    {
      icon: Phone,
      title: [t('services_telephone')],
      details: [telefono_good],
    },
    {
      icon: Mail,
      title: t('services_email'),
      details: [email],
    },
    {
      icon: Clock,
      title: t('services_stud_hours'),
      details: [t('services_stud_hours_text')]
    }
  ];

  return (
    <section id="contact" className="py-20 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold neon-text mb-8">
            {t('services_contact_label')}
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            {t('services_contact_text')}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold mb-6 neon-text">{t('services_info_label')}</h3>

            {contactInfo.map((info, index) => (
              <div key={index} className="flex items-start space-x-4 glow-card p-6 rounded-lg">
                <info.icon className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold mb-2">{info.title}</h4>
                  {info.details.map((detail, idx) => (
                    <p key={idx} className="text-muted-foreground">{detail}</p>
                  ))}
                </div>
              </div>
            ))}

            {/* Social Links */}
            <div className="glow-card p-6 rounded-lg">
              <h4 className="font-semibold mb-4">{t('services_follow')}</h4>
              <div className="flex space-x-4">
                {redes.map((platform) => (
                  <SocialIcon key={platform.url} url={platform.url} className='hover:shadow-lg hover:shadow-neutral-600 rounded-full transition-all duration-200' />
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="glow-card p-8 rounded-lg">
            <h3 className="text-2xl font-semibold mb-6 neon-text">{t('services_send_msje')}</h3>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Input
                  placeholder={t('services_input_name_placeholder')}
                  value={formValues.name}
                  name="name"
                  required
                  className="glass-effect resize-none transition-all duration-300"
                  onChange={handleChange}
                />
              </div>

              <div>
                <Textarea
                  placeholder={t('services_input_textarea_placeholder')}
                  rows={5}
                  value={formValues.textarea}
                  name="textarea"
                  required
                  className="glass-effect resize-none transition-all duration-300"
                  onChange={handleChange}
                />
              </div>

              <Button
                type="submit"
                className="w-full neon-border bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-2000 animate-glow-pulse"
              >
                <Send className="w-4 h-4 mr-2" />
                {t('services_btn')}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};