"use client";

import AnimatedSection from '../components/AnimatedSection';
import { motion } from 'framer-motion';
import ProjectImage from '../components/ProjectImage';

const projects = [
  {
    title: 'Projet Open Source',
    description: 'Une application web open source pour la gestion de projets collaboratifs.',
    technologies: ['React', 'Node.js', 'MongoDB'],
    image: '/images/projects/placeholder.svg',
    link: 'https://github.com/cedric-famibelle-pronzola/open-source-project',
    demoLink: 'https://open-source.cedric-pronzola.re',
  },
  {
    title: 'Application Web Progressive',
    description: 'Une PWA performante et accessible pour la visualisation de données.',
    technologies: ['Next.js', 'TypeScript', 'TailwindCSS'],
    image: '/images/projects/placeholder.svg',
    link: 'https://github.com/cedric-famibelle-pronzola/pwa-app',
    demoLink: 'https://pwa.cedric-pronzola.re',
  },
  {
    title: 'Bibliothèque JavaScript',
    description: 'Une bibliothèque JavaScript légère pour simplifier les animations web.',
    technologies: ['JavaScript', 'Rollup', 'Jest'],
    image: '/images/projects/placeholder.svg',
    link: 'https://github.com/cedric-famibelle-pronzola/js-library',
    demoLink: 'https://js-library.cedric-pronzola.re',
  },
  {
    title: 'Extension Navigateur',
    description: 'Une extension pour navigateur qui améliore la confidentialité en ligne.',
    technologies: ['JavaScript', 'Browser API', 'CSS'],
    image: '/images/projects/placeholder.svg',
    link: 'https://github.com/cedric-famibelle-pronzola/browser-extension',
    demoLink: 'https://extension.cedric-pronzola.re',
  },
  {
    title: 'Portfolio Personnel',
    description: 'Mon portfolio personnel développé avec Next.js, TypeScript et Tailwind CSS. Un site web moderne, performant et accessible.',
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
    image: '/images/projects/placeholder.svg',
    link: 'https://github.com/cedric-famibelle-pronzola/cedric-pronzola-v2',
    demoLink: 'https://cedric-pronzola.re',
  },
  {
    title: 'Application de Gestion de Tâches',
    description: 'Une application web de gestion de tâches avec authentification, CRUD et interface utilisateur intuitive.',
    technologies: ['React', 'Node.js', 'Express', 'MongoDB'],
    image: '/images/projects/placeholder.svg',
    link: 'https://github.com/cedric-famibelle-pronzola/todo-app',
    demoLink: 'https://todo.cedric-pronzola.re',
  },
  {
    title: 'Blog Personnel',
    description: 'Un blog personnel développé avec Next.js et MDX pour le contenu. Support des articles en Markdown avec syntaxe highlightée.',
    technologies: ['Next.js', 'MDX', 'Tailwind CSS', 'Prism.js'],
    image: '/images/projects/placeholder.svg',
    link: 'https://github.com/cedric-famibelle-pronzola/blog',
    demoLink: 'https://blog.cedric-pronzola.re',
  },
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
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-foreground/70 hover:text-foreground transition-colors"
                      >
                        Code source
                      </a>
                      <a
                        href={project.demoLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-foreground/70 hover:text-foreground transition-colors"
                      >
                        Démo
                      </a>
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