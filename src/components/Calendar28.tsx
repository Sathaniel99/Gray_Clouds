// Hooks
import * as React from "react"
// Componentes
import { Button, Calendar, Input, Popover, PopoverContent, PopoverTrigger } from "@/components/ui/index"
// Iconos
import { CalendarIcon } from "lucide-react"
// Context
import { useTranslations } from "@/context/Languaje/useLanguaje"

interface Calendar28Props {
    date: Date | undefined;
    onDateChange: (date: Date | undefined) => void;
    placeholderText: string;
}

// Función para formatear la fecha
function formatDate(date: Date | undefined, locale: string = "es-ES") {
    if (!date) {
        return ""
    }

    return date.toLocaleDateString(locale, {
        day: "2-digit",
        month: "long",
        year: "numeric",
    })
}

// Función para validar fecha
function isValidDate(date: Date | undefined) {
    if (!date) {
        return false
    }
    return !isNaN(date.getTime())
}

export function Calendar28({ date, onDateChange, placeholderText }: Calendar28Props) {
    const [open, setOpen] = React.useState(false)
    const [month, setMonth] = React.useState<Date | undefined>(date || new Date())
    const [inputValue, setInputValue] = React.useState(formatDate(date))
    const { language } = useTranslations();

    placeholderText = language === 'es' ? 'Selecciona una fecha' : language === 'en' ? 'Select a date' : 'Выберите дату';

    // Sincronizar inputValue con date prop
    React.useEffect(() => {
        if (date) {
            setInputValue(formatDate(date))
        }
    }, [date])

    // Manejar cambio desde input
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        setInputValue(value)

        // Intentar parsear la fecha
        const parsedDate = new Date(value)
        if (isValidDate(parsedDate)) {
            onDateChange(parsedDate)
            setMonth(parsedDate)
        }
    }

    // Manejar selección desde calendario
    const handleCalendarSelect = (selectedDate: Date | undefined) => {
        onDateChange(selectedDate)
        setInputValue(formatDate(selectedDate))
        setOpen(false)
    }

    // Configurar fecha mínima (hoy)
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    return (
        <div className="flex flex-col gap-2">
            <div className="relative">
                <Input
                    id="date"
                    value={inputValue}
                    placeholder={placeholderText}
                    className="bg-background pr-10 w-full"
                    onChange={handleInputChange}
                    onFocus={() => setOpen(true)}
                    onKeyDown={(e) => {
                        if (e.key === "ArrowDown") {
                            e.preventDefault()
                            setOpen(true)
                        }
                    }}
                />
                <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                        <Button
                            id="date-picker"
                            variant="ghost"
                            size="icon"
                            className="absolute top-1/2 right-2 size-6 -translate-y-1/2"
                            aria-label={language === 'es' ? 'Abrir calendario' : language === 'en' ? 'Open calendar' : 'Открыть календарь'}
                        >
                            <CalendarIcon className="size-4" />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent
                        className="w-auto overflow-hidden p-0"
                        align="end"
                        alignOffset={-8}
                        sideOffset={10}
                    >
                        <Calendar
                            mode="single"
                            selected={date}
                            captionLayout="dropdown-buttons"
                            month={month}
                            onMonthChange={setMonth}
                            onSelect={handleCalendarSelect}
                            disabled={(date) => {
                                return date < today
                            }}
                            initialFocus
                            classNames={{
                                day_selected: "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
                                day_today: "bg-accent text-accent-foreground",
                            }}
                        />
                        <div className="p-3 border-t bg-muted/20">
                            <Button
                                variant="ghost"
                                size="sm"
                                className="w-full text-sm"
                                onClick={() => {
                                    onDateChange(undefined)
                                    setInputValue("")
                                    setOpen(false)
                                }}
                            >
                                {language === 'es' ? 'Limpiar selección' : language === 'en' ? 'Clear selection' : 'Очистить выбор'}
                            </Button>
                        </div>
                    </PopoverContent>
                </Popover>
            </div>

            {/* Indicador de fecha seleccionada */}
            {date && (
                <div className="text-xs text-muted-foreground">
                    {language === 'es' ? 'Seleccionado' : language === 'en' ? 'Selected' : 'Выбрано'}: {formatDate(date)}
                </div>
            )}
        </div>
    )
}