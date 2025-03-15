"use client";

import AnimatedSection from '../components/AnimatedSection';
import { motion } from 'framer-motion';
import ProjectImage from '../components/ProjectImage';

const projects = [
  {
    title: 'oki.re - Plateforme de transcriptions musicales',
    description: 'Application web progressive pour la transcription et traduction de productions musicales créoles, avec interface multilingue.',
    technologies: ['Next.js', 'Node.js', 'Strapi'],
    image: '/images/projects/oki.re-800x450.webp',
    source: 'https://codeberg.org/OKI/oki.re',
    link: 'https://oki.re',
  },
  {
    title: 'nuvel.nu - Portail d’actualités multilingue',
    description: 'Plateforme d’information multilingue avec gestion de contenu dynamique et interface adaptative.',
    technologies: ['Next.js', 'Node.js', 'Strapi'],
    image: '/images/projects/nuvel.nu-800x450.webp',
    source: 'https://codeberg.org/OKI/nuvel.nu',
    link: 'https://nuvel.nu',
  },
  {
    title: 'gong.gp - Archives historiques guadeloupéennes',
    description: 'Plateforme documentaire présentant les archives du Groupe d’Organisation Nationale de la Guadeloupe avec navigation interactive.',
    technologies: ['HTMx', 'Strapi', 'PHP'],
    image: '/images/projects/gong.gp-800x450.webp',
    source: 'https://codeberg.org/OKI/gong.gp',
    link: 'https://gong.gp',
  },
  {
    title: 'jwe.ovh - Jeu cartographique interactif',
    description: 'Application ludique basée sur la cartographie interactive, utilisant MapLibre GL pour une expérience immersive.',
    technologies: ['MapLibre GL JS', 'PHP', 'CSS'],
    image: '/images/projects/jwe.ovh-800x450.webp',
    source: 'https://codeberg.org/OKI/jwe',
    link: 'https://jwe.ovh',
  },
  {
    title: 'konstitisyon.la - Plateforme de démocratie participative',
    description: 'Application collaborative permettant aux citoyens de rédiger, proposer des révisions et voter sur les articles d’une constitution.',
    technologies: ['Next.js', 'Directus'],
    image: '/images/projects/konstitisyon.la-800x450.webp',
    source: 'https://codeberg.org/OKI/konstitisyon.la',
    link: 'https://codeberg.org/OKI/konstitisyon.la',
    wip: true
  }
];

const ProjectsPage = () => {
  return (
    <main className="min-h-screen bg-background">
      <AnimatedSection className="py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Mes Projets</h1>
            <div className="w-20 h-1 bg-foreground/20 mx-auto"></div>
            <p className="mt-6 text-foreground/70 max-w-2xl mx-auto">
              Découvrez mes projets de développement web et applications. Chaque projet est une opportunité d'apprendre et d'innover.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <AnimatedSection key={project.title} direction="up" delay={index * 0.1}>
                <motion.div
                  className="bg-foreground/5 rounded-lg overflow-hidden hover:bg-foreground/10 transition-colors"
                  whileHover={{ y: -5 }}
                >
                  <div className="aspect-video relative overflow-hidden">
                    <ProjectImage
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h2 className="text-xl font-bold mb-2">{project.title}</h2>
                    <p className="text-foreground/70 mb-4">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 bg-foreground/10 rounded-full text-sm"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    <div className="flex gap-4">
                      <a
                        href={project.source}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-foreground/70 hover:text-foreground transition-colors"
                      >
                        Code source
                      </a>
                      {project.wip ? (
                        <i>En cours de développement</i>
                      ) : (
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-foreground/70 hover:text-foreground transition-colors"
                        >
                          Voir le projet
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </AnimatedSection>
    </main>
  );
};

export default ProjectsPage; 