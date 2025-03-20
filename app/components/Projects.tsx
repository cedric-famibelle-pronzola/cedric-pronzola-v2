"use client";

import { useTranslations } from 'next-intl';
import AnimatedSection from './AnimatedSection';
import ProjectsList from './ProjectsList';

const Projects = () => {
  const t = useTranslations('home.projects');

  return (
    <AnimatedSection id="projects" className="py-24 bg-background/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('title')}</h2>
          <div className="w-20 h-1 bg-foreground/20 mx-auto"></div>
          <p className="mt-6 text-foreground/70 max-w-2xl mx-auto">
            {t('description')}
          </p>
        </div>
        
        <ProjectsList showAll={false} limit={4} />
      </div>
    </AnimatedSection>
  );
};

export default Projects; 