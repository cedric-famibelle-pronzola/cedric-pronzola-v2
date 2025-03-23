import Script from 'next/script';

export function ThemeScript() {
  const themeScript = `
    (function() {
      // Try to get the saved theme
      const storedTheme = localStorage.getItem('theme');
      
      // Check if theme is valid
      if (storedTheme && ['light', 'dark', 'system'].includes(storedTheme)) {
        // Apply saved theme
        if (storedTheme === 'system') {
          // Check system preference
          const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
          document.documentElement.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
        } else {
          document.documentElement.setAttribute('data-theme', storedTheme);
        }
      } else {
        // Default to system preference if no saved theme
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        document.documentElement.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
      }
    })();
  `;

  return (
    <Script 
      id="theme-script" 
      strategy="beforeInteractive" 
      dangerouslySetInnerHTML={{ __html: themeScript }} 
    />
  );
} 