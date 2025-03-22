import { getRequestConfig } from 'next-intl/server';
import { locales } from './config/i18n';

export default getRequestConfig(async ({ locale }) => {
  // Ensure locale is never undefined by defaulting to 'fr'
  let safeLocale = locale;
  if (!safeLocale || !locales.includes(safeLocale as any)) {
    safeLocale = 'fr';
  }

  return {
    locale: safeLocale,
    messages: (await import(`./messages/${safeLocale}.json`)).default,
    timeZone: 'Indian/Reunion'
  };
});

export const getMessages = async (locale: string) => {
  return (await import(`./messages/${locale}.json`)).default;
};
