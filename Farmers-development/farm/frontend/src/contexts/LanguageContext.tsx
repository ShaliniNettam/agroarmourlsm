import React, { createContext, useContext, useState } from 'react';

export type Language = 'en' | 'hi' | 'kn' | 'mr' | 'gu' | 'pa' | 'bn' | 'te' | 'ta' | 'ml' | 'or';

type TranslationVariables = Record<string, string | number>;

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, vars?: TranslationVariables) => string;
  translateText: (text: string, targetLang: Language) => Promise<string>;
}

import { en } from '../i18n/en';
import { hi } from '../i18n/hi';
import { kn } from '../i18n/kn';
import { mr } from '../i18n/mr';
import { gu } from '../i18n/gu';
import { pa } from '../i18n/pa';
import { bn } from '../i18n/bn';
import { te } from '../i18n/te';
import { ta } from '../i18n/ta';
import { ml } from '../i18n/ml';
import { or } from '../i18n/or';

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations: Record<Language, any> = {
  en,
  hi,
  kn,
  mr,
  gu,
  pa,
  bn,
  te,
  ta,
  ml,
  or
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string, vars?: TranslationVariables): string => {
    const translationSet = translations[language] || translations.en;
    const template =
      translationSet[key] ||
      translations.en[key] ||
      key;

    if (!vars) {
      return template;
    }

    return Object.entries(vars).reduce((acc, [variable, value]) => {
      return acc.replace(new RegExp(`{${variable}}`, 'g'), String(value));
    }, template);
  };

  const translateText = async (text: string, targetLang: Language): Promise<string> => {
    // Simulated automated translation logic
    // In a real app, this would call a Translation API (e.g., Google/Azure)
    return new Promise((resolve) => {
      setTimeout(() => {
        if (targetLang === 'te') {
          // Mock translation for demo purposes
          if (text.toLowerCase().includes('help')) return "సహాయం కావాలి (Translated)";
          if (text.toLowerCase().includes('poultry')) return "కోళ్ళ పెంపకం గురించి (Translated)";
          if (text.toLowerCase().includes('problem')) return "సమస్య ఉంది (Translated)";
          return `${text} (తెలుగులోకి అనువదించబడింది)`;
        }
        resolve(text);
      }, 1000);
    });
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, translateText }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
};
