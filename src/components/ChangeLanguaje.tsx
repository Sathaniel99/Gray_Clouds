// Hooks
import { useState } from "react";
// Context
import { useLanguage } from "@/context/Languaje/useLanguaje"
// Componentes
import { Button, DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/index";
// Flags Lenguajes
import EN_Flag from '@/assets/en.png'
import ES_Flag from '@/assets/es.png'
import RU_Flag from '@/assets/ru.png'


export const ChangeLanguaje = () => {
    const {
        language,
        setLanguage
    } = useLanguage();


    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button size="sm" className="flex items-center me-auto focus-visible:border-border-neutral-500 border-neutral-500 border-2 bg-cyan-950/20 backdrop-blur-md text-muted-foreground hover:text-white hover:bg-cyan-950/80 transition-all duration-300 active:bg-neutral-700 active:text-white py-5 ms-1 mt-1" >
                    <img className="w-8 h-8 rounded-full" src={language == 'en' ? EN_Flag : language == 'es' ? ES_Flag : RU_Flag} alt="Select Languaje" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="p-0 bg-cyan-950/20 backdrop-blur-md">
                <Button size="sm" onClick={() => setLanguage('es')} className="w-full flex items-center bg-transparent text-muted-foreground hover:text-white hover:bg-cyan-950/80 transition-all duration-300 active:bg-neutral-700 active:text-white py-5 rounded-none" >
                    <img className="w-7 h-7 flex-2 rounded-full" src={ES_Flag} alt="Español Languaje" />
                    <span className="flex-1">Español</span>
                </Button>
                <Button size="sm" onClick={() => setLanguage('ru')} className="w-full flex items-center bg-transparent text-muted-foreground hover:text-white hover:bg-cyan-950/80 transition-all duration-300 active:bg-neutral-700 active:text-white py-5 rounded-none" >
                    <img className="w-7 h-7 flex-2 rounded-full" src={RU_Flag} alt="Russian Languaje" />
                    <span className="flex-1">Русский</span>
                </Button>
                <Button size="sm" onClick={() => setLanguage('en')} className="w-full flex items-center bg-transparent text-muted-foreground hover:text-white hover:bg-cyan-950/80 transition-all duration-300 active:bg-neutral-700 active:text-white py-5 rounded-none" >
                    <img className="w-7 h-7 flex-2 rounded-full" src={EN_Flag} alt="English Languaje" />
                    <span className="flex-1">English</span>
                </Button>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}