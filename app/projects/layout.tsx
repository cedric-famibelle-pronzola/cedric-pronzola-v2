import { Metadata } from 'next';
import { ReactNode } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export const metadata: Metadata = {
  title: 'Projets | Cédric Famibelle-Pronzola',
  description: 'Découvrez mes projets de développement web et applications.',
};

export default function ProjectsLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Navbar />
      <div id="main-content">
        {children}
      </div>
      <Footer />
    </>
  );
}
