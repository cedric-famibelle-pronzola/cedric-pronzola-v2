// Supported locales
export const locales = ['en', 'fr'] as const;

// Default locale
export const defaultLocale = 'fr';

// Used for the meta alternate links
export const localeNames = {
  en: 'English',
  fr: 'Français'
};

// Used for language switcher
export const localeCountryMap = {
  en: 'gb',
  fr: 'fr'
};

// Type definitions for type safety
export type Locale = (typeof locales)[number];
export type LocalePrefix = 'as-needed' | 'always' | 'never';

// Flag emoji for each language
export const localeFlags = {
  en: '🇬🇧',
  fr: '🇫🇷',
} as const;
