// context/types.ts
import { ReactNode, createContext, useContext } from "react";

export type Language = 'es' | 'en' | 'ru';

export interface Translations {
  [key: string]: string;
}

// Crear el contexto
export const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export interface LanguageProviderProps {
  children: ReactNode;
}

export interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => Promise<void>;
  t: (key: string) => string;
  currentTranslations: Translations;
  isLoading: boolean;
}

// Cache para traducciones ya cargadas
export const translationCache: Partial<Record<Language, Translations>> = {};

// Hook para usar el contexto
export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useLanguage debe usarse dentro de LanguageProvider');
    }
    return context;
};

// Hook simplificado con acceso directo
export const useTranslations = () => {
    const { currentTranslations, t, language } = useLanguage();

    return {
        ...currentTranslations,
        language,
        t
    };
};