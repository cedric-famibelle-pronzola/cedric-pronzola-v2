"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import AnimatedSection from './AnimatedSection';
import { useTranslations } from 'next-intl';

const techStackData = [
  {
    category: 'Frontend',
    technologies: [
      { name: 'JavaScript', level: 90 },
      { name: 'Next.js', level: 90 },
      { name: 'HTML / CSS', level: 90 },
      { name: 'Symfony', level: 80 },
      { name: 'WordPress', level: 75 },
    ],
  },
  {
    category: 'Backend',
    technologies: [
      { name: 'Node.js', level: 85 },
      { name: 'MongoDB', level: 80 },
      { name: 'PHP', level: 75 },
      { name: 'MySQL', level: 70 },
      { name: 'PostgreSQL', level: 70 },
    ],
  },
  {
    category: 'Outils & DevOps',
    technologies: [
      { name: 'Git', level: 90 },
      { name: 'Linux', level: 85 },
      { name: 'Docker', level: 75 },
      { name: 'CI/CD', level: 70 },
      { name: 'Kubernetes', level: 70 },
    ],
  },
];

const TechStack = () => {
  const t = useTranslations('home.techStack');
  
  return (
    <AnimatedSection id="stack" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('title')}</h2>
          <div className="w-20 h-1 bg-foreground/20 mx-auto"></div>
          <p className="mt-6 text-foreground/70 max-w-2xl mx-auto">
            {t('description')}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {techStackData.map((category, categoryIndex) => (
            <AnimatedSection 
              key={category.category}
              delay={0.2 * categoryIndex}
              direction="up"
              className="bg-background border border-foreground/10 rounded-xl p-6"
            >
              <h3 className="text-xl font-bold mb-6 text-center">
                {category.category === 'Frontend' ? t('frontend') :
                 category.category === 'Backend' ? t('backend') :
                 t('tools')}
              </h3>
              
              <div className="space-y-6">
                {category.technologies.map((tech, techIndex) => (
                  <div key={tech.name} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{tech.name}</span>
                      <span className="text-sm text-foreground/70">{tech.level}%</span>
                    </div>
                    <div className="h-2 bg-foreground/10 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-foreground/80 rounded-full"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${tech.level}%` }}
                        viewport={{ once: true }}
                        transition={{ 
                          duration: 1,
                          delay: 0.3 + (0.1 * techIndex),
                          ease: [0.22, 1, 0.36, 1]
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection delay={0.6} className="mt-16 text-center">
          <h3 className="text-xl font-bold mb-6">{t('otherSkills')}</h3>
          <div className="flex flex-wrap justify-center gap-3">
            {['mapLibre', 'responsiveDesign', 'accessibility', 'seo', 'webPerformance', 'uiUx', 'pwa', 'restApi'].map((skillKey) => (
              <motion.span
                key={skillKey}
                className="px-4 py-2 bg-foreground/5 rounded-full text-foreground/80"
                whileHover={{ scale: 1.05, backgroundColor: 'rgba(var(--foreground-rgb), 0.1)' }}
              >
                {t(`skills.${skillKey}`)}
              </motion.span>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </AnimatedSection>
  );
};

export default TechStack;
