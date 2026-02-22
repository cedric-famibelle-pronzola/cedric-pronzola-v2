"use client";

import { format, parseISO } from 'date-fns';
import { fr, enUS } from 'date-fns/locale';

interface ArticleDateProps {
  date: string;
  locale: string;
}

const ArticleDate = ({ date, locale }: ArticleDateProps) => {
  try {
    const dateObj = parseISO(date);
    const localeObj = locale === 'fr' ? fr : enUS;
    
    // Format: 19 février 2026 (FR) or February 19, 2026 (EN)
    const formattedDate = format(dateObj, 'd MMMM yyyy', { locale: localeObj });
    
    return (
      <time dateTime={date}>
        {formattedDate}
      </time>
    );
  } catch (error) {
    // Fallback to raw date if parsing fails
    return (
      <time dateTime={date}>
        {date}
      </time>
    );
  }
};

export default ArticleDate;
