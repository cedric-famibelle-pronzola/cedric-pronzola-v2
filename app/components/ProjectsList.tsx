"use client";

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import AnimatedSection from './AnimatedSection';
import ProjectImage from './ProjectImage';
import { useTranslations } from 'next-intl';

const projectIds = ['oki', 'nuvel', 'gong', 'jwe', 'konstitisyon'];

type ProjectsListProps = {
  showAll?: boolean;
  limit?: number;
};

const ProjectsList = ({ showAll = false, limit = 4 }: ProjectsListProps) => {
  const tProjects = useTranslations('projects');
  const tHome = useTranslations('home.projects');
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

  // Use different namespace based on where the component is used
  const t = showAll ? tProjects : tHome;
  
  // For the projects page, we'd use projectIds directly
  // For the home page, we'd use just the first few projects
  const displayProjectIds = showAll ? projectIds : projectIds.slice(0, limit);

  const projectsData = displayProjectIds.map((id, index) => ({
    id: index + 1,
    projectId: id,
    title: tHome(`projectsList.${id}.title`),
    description: tHome(`projectsList.${id}.description`),
    technologies: tHome(`projectsList.${id}.technologies`).split(','),
    image: `/images/projects/${id}${getDomainExtension(id)}-800x450.webp`,
    link: `https://${id}${getDomainExtension(id)}`,
  }));

  // Helper function to get the domain extension for each project
  function getDomainExtension(id: string): string {
    switch(id) {
      case 'oki': return '.re';
      case 'nuvel': return '.nu';
      case 'gong': return '.gp';
      case 'jwe': return '.ovh';
      case 'konstitisyon': return '.la';
      default: return '';
    }
  }

  return (
    <>
      <div className={`grid grid-cols-1 md:grid-cols-2 ${showAll ? 'lg:grid-cols-3' : ''} gap-8`}>
        {projectsData.map((project, index) => (
          <AnimatedSection 
            key={project.id}
            delay={0.1 * index}
            direction="up"
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
                    {tHome('sourceCode')}
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
      
      {!showAll && (
        <div className="text-center mt-12">
          <Link
            href="/projects"
            className="inline-flex items-center justify-center px-6 py-3 border border-foreground/20 rounded-md font-medium hover:bg-foreground/10 transition-colors"
          >
            {tHome('seeMore')} <span className="ml-2">→</span>
          </Link>
        </div>
      )}
    </>
  );
};

export default ProjectsList; 