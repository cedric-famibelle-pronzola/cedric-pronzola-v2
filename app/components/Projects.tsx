"use client";

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import AnimatedSection from './AnimatedSection';
import ProjectImage from './ProjectImage';
import { useTranslations } from 'next-intl';

const projectIds = ['oki', 'nuvel', 'gong', 'jwe'];

const Projects = () => {
  const t = useTranslations('home.projects');
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<'all' | 'web' | 'mobile'>('all');

  const projectsData = projectIds.map((id, index) => ({
    id: index + 1,
    projectId: id,
    title: t(`projectsList.${id}.title`),
    description: t(`projectsList.${id}.description`),
    technologies: t(`projectsList.${id}.technologies`).split(','),
    image: `/images/projects/${id}.${id === 'oki' ? 're' : id === 'nuvel' ? 'nu' : id === 'gong' ? 'gp' : 'ovh'}-800x450.webp`,
    link: `https://${id}.${id === 'oki' ? 're' : id === 'nuvel' ? 'nu' : id === 'gong' ? 'gp' : 'ovh'}`,
  }));

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
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projectsData.map((project, index) => (
            <AnimatedSection 
              key={project.id}
              delay={0.2 * index}
              direction={index % 2 === 0 ? 'left' : 'right'}
            >
              <motion.div
                className="bg-background border border-foreground/10 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 h-full flex flex-col"
                onHoverStart={() => setHoveredProject(project.id)}
                onHoverEnd={() => setHoveredProject(null)}
                whileHover={{ y: -5 }}
              >
                <div className="relative h-48">
                  <ProjectImage
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="p-6 flex flex-col flex-grow justify-between">
                  <div>
                    <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                    <p className="text-foreground/70 mb-4">{project.description}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.map((technologie) => (
                        <span 
                          key={technologie}
                          className="px-2 py-1 bg-foreground/5 text-foreground/70 rounded-md text-xs"
                        >
                          {technologie}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex justify-between pt-4">
                    <a
                      href={`https://codeberg.org/OKI/${project.link.replace('https://', '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-foreground/70 hover:text-foreground transition-colors"
                    >
                      {t('sourceCode')}
                    </a>
                    
                    <Link 
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-sm font-medium hover:underline"
                    >
                      {t('viewProject')}
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        width="16" 
                        height="16" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="2" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                        className="ml-1"
                      >
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                        <polyline points="12 5 19 12 12 19"></polyline>
                      </svg>
                    </Link>
                  </div>
                </div>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Link
            href="/projects"
            className="inline-flex items-center justify-center px-6 py-3 border border-foreground/20 rounded-md font-medium hover:bg-foreground/10 transition-colors"
          >
            {t('seeMore')} <span className="ml-2">→</span>
          </Link>
        </div>
      </div>
    </AnimatedSection>
  );
};

export default Projects; 