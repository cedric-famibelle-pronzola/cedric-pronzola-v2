"use client";

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { smoothScrollToSection } from '../utils/smoothScroll';
import { useTranslations, useLocale } from 'next-intl';

const Hero = () => {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();
  const t = useTranslations('home.hero');

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    
    // Check if this is a hash link (section navigation)
    if (href.startsWith('/#')) {
      // Extract the section ID
      const sectionId = href.substring(2);
      console.log(`Click on section: ${sectionId}, current pathname: ${pathname}`);
      
      // Check if we're already on a homepage (with or without locale prefix)
      const isHomePage = pathname === '/' || pathname === '' || pathname === `/${locale}` || pathname === `/${locale}/`;
      
      if (isHomePage) {
        // We're on a homepage (with or without locale), use smooth scroll
        console.log(`On homepage, using smooth scroll to ${sectionId}`);
        smoothScrollToSection(sectionId);
      } else {
        // We're on a different page, navigate to home with the hash
        const localizedHome = locale === 'fr' ? '/' : `/${locale}`;
        const newPath = `${localizedHome}#${sectionId}`;
        console.log(`Not on homepage, navigating to: ${newPath}`);
        router.push(newPath);
      }
    } else {
      // For non-hash links, just use regular navigation
      console.log(`Regular navigation to: ${href}`);
      router.push(href);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden" role="region" aria-label="Introduction">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background to-background/50 z-0" aria-hidden="true"></div>
      
      {/* Animated background shapes */}
      <div className="absolute inset-0 overflow-hidden z-0" aria-hidden="true">
        {[...Array(5)].map((_, i) => (
          <motion.div
            suppressHydrationWarning={true}
            key={i}
            className="absolute rounded-full bg-foreground/5"
            style={{
              width: `${Math.random() * 300 + 100}px`,
              height: `${Math.random() * 300 + 100}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              x: [0, Math.random() * 100 - 50],
              y: [0, Math.random() * 100 - 50],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              repeatType: 'reverse',
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>
      
      {/* Content */}
      <div className="container mx-auto px-4 z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            {t('title')}
          </h1>
          <h2 className="text-xl md:text-2xl text-foreground/80 mb-8">
            {t('subtitle')}
          </h2>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="max-w-2xl mx-auto mb-12"
        >
          <p className="text-lg text-foreground/70">
            {t('description')}
          </p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <a 
            href="/#projects"
            onClick={(e) => handleNavClick(e, '/#projects')}
            className="px-6 py-3 bg-foreground text-background rounded-md font-medium hover:bg-foreground/90 transition-colors"
            aria-label={t('viewProjectsAriaLabel')}
          >
            {t('viewProjects')}
          </a>
          <a 
            href="/#contact"
            onClick={(e) => handleNavClick(e, '/#contact')}
            className="px-6 py-3 border border-foreground/20 rounded-md font-medium hover:bg-foreground/10 transition-colors"
            aria-label={t('contactAriaLabel')}
          >
            {t('contact')}
          </a>
        </motion.div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2">
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-6 h-10 rounded-full border-2 border-foreground/20 flex justify-center pt-2"
          aria-hidden="true"
        >
          <motion.div className="w-1 h-2 rounded-full bg-foreground/50" />
        </motion.div>
      </div>
    </div>
  );
};

export default Hero; 