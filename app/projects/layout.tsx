import { Metadata } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Projets | Cédric Famibelle-Pronzola',
  description: 'Découvrez mes projets de développement web et applications.',
};

export default function ProjectsLayout({ children }: { children: ReactNode }) {
  return children;
}
