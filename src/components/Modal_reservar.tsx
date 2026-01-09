// Hooks
import { useState } from "react";
// Context
import { useTranslations } from "@/context/Languaje/useLanguaje";
// Componentes
import { Button, Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, Label, Input } from "./ui/index";
import { toast } from "sonner";
import { Calendar28 } from "./index";
// Utiles
import { telefono_good } from "@/utils/vars";

export function Modal_reservar() {

    const [formValues, setFormValues] = useState({
        name: "",
        date: ""
    });
    const [date, setDate] = useState<Date | undefined>(undefined);

    const { t } = useTranslations();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormValues({
            ...formValues,
            [e.target.name]: e.target.value
        });
    };

    const handleDateChange = (selectedDate: Date | undefined) => {
        setDate(selectedDate);
        if (selectedDate) {
            setFormValues(prev => ({
                ...prev,
                date: formatDate(selectedDate)
            }));
        }
    };

    const formatDate = (date: Date) => {
        return date.toLocaleDateString("es-ES", {
            day: "2-digit",
            month: "long",
            year: "numeric",
        });
    };

    const sendMessage = (data: { name: string; date: string }) => {
        const phone = telefono_good.replace(" ", "");
        const text = `${t('header_modal_msge_part_1')} ${data.name} ${t('header_modal_msge_part_2')} ${data.date}`;
        const url = `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
        window.open(url, "_blank");
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!date) {
            toast.error("Por favor, selecciona una fecha", {
                duration: 2000,
                position: "top-right"
            });
            return;
        }

        // Validar que el nombre no esté vacío
        if (!formValues.name.trim()) {
            toast.error("Por favor, ingresa tu nombre", {
                duration: 2000,
                position: "top-right"
            });
            return;
        }

        // Enviar mensaje por WhatsApp
        sendMessage({
            name: formValues.name,
            date: formValues.date
        });

        // Mostrar toast de éxito
        toast.success(t('contact_toast'), {
            duration: 2000,
            position: "top-right"
        });

        // Resetear formulario
        setFormValues({ name: "", date: "" });
        setDate(undefined);
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button
                    className={`w-full flex neon-border bg-transparent text-muted-foreground hover:text-white hover:bg-primary/10 transition-all duration-300 active:bg-cyan-500 active:text-black`}>
                    {t('header_button')}
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold neon-text animate-glow-pulse text-center">
                        {t('header_modal_title')}
                    </DialogTitle>
                    <DialogDescription>
                        {t('header_modal_description')}
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Campo Nombre */}
                    <div className="space-y-2">
                        <Label className="block text-sm" htmlFor="name">
                            {t('header_label_input_modal')}
                        </Label>
                        <Input
                            id="name"
                            type="text"
                            name="name"
                            required
                            placeholder="..."
                            className="flex h-10 w-full rounded-md border bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm glass-effect transition-all duration-300"
                            value={formValues.name}
                            onChange={handleChange}
                        />
                    </div>

                    {/* Componente de Fecha Adaptado */}
                    <div className="space-y-2">
                        <Label className="block text-sm" htmlFor="date">
                            {t('header_label_input_date')}
                        </Label>
                        <Calendar28
                            date={date}
                            onDateChange={handleDateChange}
                            placeholderText="Selecciona una fecha"
                        />
                    </div>

                    {/* Información adicional */}
                    <div className="bg-primary/5 p-4 rounded-lg text-sm">
                        <p className="font-medium mb-1">{t('header_modal_info_plus')}</p>
                        <ul className="space-y-1 text-muted-foreground">
                            <li className="flex items-start">
                                <span className="text-primary mr-2">✓</span>
                                <span>{t('header_modal_info_1')}</span>
                            </li>
                            <li className="flex items-start">
                                <span className="text-primary mr-2">✓</span>
                                <span>{t('header_modal_info_2')}</span>
                            </li>
                            <li className="flex items-start">
                                <span className="text-primary mr-2">✓</span>
                                <span>{t('header_modal_info_3')}</span>
                            </li>
                        </ul>
                    </div>

                    {/* Botones */}
                    <DialogFooter className="gap-2 sm:gap-0">
                        <DialogClose asChild>
                            <Button
                                variant="outline"
                                type="button"
                                className="w-full sm:w-auto"
                            >
                                {t('button_cancel')}
                            </Button>
                        </DialogClose>
                        <Button
                            type="submit"
                            className="w-full sm:w-auto bg-primary text-primary-foreground hover:bg-primary/90"
                            disabled={!formValues.name || !date}
                        >
                            {t('header_button_accept_modal')}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}