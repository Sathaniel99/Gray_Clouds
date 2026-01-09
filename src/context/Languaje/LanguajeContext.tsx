// context/LanguageContext.tsx
import React, { useContext, useState, useEffect, ReactNode } from 'react';
import { 
  Language, 
  Translations, 
  LanguageProviderProps, 
  LanguageContextType,
  LanguageContext,
  translationCache 
} from './useLanguaje';

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
    const [language, setLanguage] = useState<Language>('es');
    const [currentTranslations, setCurrentTranslations] = useState<Translations>({});
    const [isLoading, setIsLoading] = useState(true);

    // Función para cargar un idioma específico
    const loadLanguage = async (lang: Language): Promise<Translations> => {
        // Verificar cache primero
        if (translationCache[lang]) {
            return translationCache[lang]!;
        }

        try {
            // Cargar dinámicamente el archivo del idioma
            // IMPORTANTE: Asegúrate de que la ruta es correcta
            const module = (await import(`@/traductions/${lang}.ts`)).lang;

            // const translations = module.default || module;

            // Guardar en cache
            // translationCache[lang] = translations;

            return Object(module);
        } catch (error) {
            console.error(`Error cargando idioma ${lang}:`, error);

            // Fallback a español si hay error
            if (lang !== 'es') {
                console.log('Intentando cargar español como fallback...');
                return loadLanguage('es');
            }

            return {};
        }
    };

    // Cargar idioma inicial - SOLO una vez al montar
    useEffect(() => {
        const initializeLanguage = async () => {
            setIsLoading(true);

            try {
                // 1. Intentar obtener idioma guardado
                const savedLang = localStorage.getItem('app_language') as Language;

                // 2. Si no hay guardado, detectar del navegador
                let langToLoad: Language = 'es';

                if (savedLang && ['es', 'en', 'ru'].includes(savedLang)) {
                    langToLoad = savedLang;
                } else {
                    const browserLang = navigator.language.toLowerCase();
                    if (browserLang.includes('es')) langToLoad = 'es';
                    else if (browserLang.includes('ru')) langToLoad = 'ru';
                    else if (browserLang.includes('en')) langToLoad = 'en';
                }

                // 3. Cargar el idioma
                const translations = await loadLanguage(langToLoad);

                setLanguage(langToLoad);
                setCurrentTranslations(translations);

                // Guardar en localStorage
                localStorage.setItem('app_language', langToLoad);

            } catch (error) {
                console.error('Error inicializando idioma:', error);
            } finally {
                setIsLoading(false);
            }
        };

        initializeLanguage();
    }, []); // Array vacío para que se ejecute solo una vez

    // Función para cambiar idioma
    const changeLanguage = async (newLang: Language) => {
        if (newLang === language || isLoading) return;

        setIsLoading(true);

        try {
            // Cargar el nuevo idioma
            const translations = await loadLanguage(newLang);

            // Actualizar estado
            setLanguage(newLang);
            setCurrentTranslations(translations);

            // Guardar preferencia
            localStorage.setItem('app_language', newLang);

        } catch (error) {
            console.error('Error cambiando idioma:', error);
        } finally {
            setIsLoading(false);
        }
    };

    // Función de traducción
    const t = (key: string): string => {
        return currentTranslations[key] || key;
    };

    const value: LanguageContextType = {
        language,
        setLanguage: changeLanguage,
        t,
        currentTranslations,
        isLoading
    };

    if (isLoading && Object.keys(currentTranslations).length === 0) {
        return <div>Cargando idioma...</div>;
    }

    return (
        <LanguageContext.Provider value={value}>
            {children}
        </LanguageContext.Provider>
    );
};