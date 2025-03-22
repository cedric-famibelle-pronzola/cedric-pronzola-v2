'use client';

import { NextIntlClientProvider } from 'next-intl';
import { ReactNode } from 'react';
import { ThemeProvider } from '../components/ThemeProvider';

type Props = {
  locale: string;
  messages: any;
  children: ReactNode;
};

export function Providers({ children, locale, messages }: Props) {
  return (
    <NextIntlClientProvider locale={locale} messages={messages} timeZone="Europe/Paris">
      <ThemeProvider>
        {children}
      </ThemeProvider>
    </NextIntlClientProvider>
  );
} 