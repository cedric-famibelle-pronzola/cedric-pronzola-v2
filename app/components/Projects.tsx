"use client";

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import AnimatedSection from './AnimatedSection';
import ProjectImage from './ProjectImage';

// Sample project data - replace with your actual projects
const projectsData = [
  {
    id: 1,
    title: 'Projet Open Source',
    description: 'Une application web open source pour la gestion de projets collaboratifs.',
    tags: ['React', 'Node.js', 'MongoDB'],
    image: '/images/projects/placeholder.svg',
    link: 'https://github.com/cedric-famibelle-pronzola/open-source-project',
  },
  {
    id: 2,
    title: 'Application Web Progressive',
    description: 'Une PWA performante et accessible pour la visualisation de données.',
    tags: ['Next.js', 'TypeScript', 'TailwindCSS'],
    image: '/images/projects/placeholder.svg',
    link: 'https://github.com/cedric-famibelle-pronzola/pwa-app',
  },
  {
    id: 3,
    title: 'Bibliothèque JavaScript',
    description: 'Une bibliothèque JavaScript légère pour simplifier les animations web.',
    tags: ['JavaScript', 'Rollup', 'Jest'],
    image: '/images/projects/placeholder.svg',
    link: 'https://github.com/cedric-famibelle-pronzola/js-library',
  },
  {
    id: 4,
    title: 'Extension Navigateur',
    description: 'Une extension pour navigateur qui améliore la confidentialité en ligne.',
    tags: ['JavaScript', 'Browser API', 'CSS'],
    image: '/images/projects/placeholder.svg',
    link: 'https://github.com/cedric-famibelle-pronzola/browser-extension',
  },
];

const Projects = () => {
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

  return (
    <AnimatedSection id="projects" className="py-24 bg-background/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Mes Projets</h2>
          <div className="w-20 h-1 bg-foreground/20 mx-auto"></div>
          <p className="mt-6 text-foreground/70 max-w-2xl mx-auto">
            Découvrez une sélection de mes projets récents. Chaque projet est une opportunité d'apprendre et d'explorer de nouvelles technologies.
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
                className="bg-background border border-foreground/10 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300"
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
                
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                  <p className="text-foreground/70 mb-4">{project.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tags.map((tag) => (
                      <span 
                        key={tag}
                        className="px-2 py-1 bg-foreground/5 text-foreground/70 rounded-md text-xs"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <Link 
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-sm font-medium hover:underline"
                  >
                    Voir le projet
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
              </motion.div>
            </AnimatedSection>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Link 
            href="/projects"
            className="inline-flex items-center px-6 py-3 border border-foreground/20 rounded-md font-medium hover:bg-foreground/10 transition-colors"
          >
            Voir tous les projets
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="20" 
              height="20" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
              className="ml-2"
            >
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </Link>
        </div>
      </div>
    </AnimatedSection>
  );
};

export default Projects; 