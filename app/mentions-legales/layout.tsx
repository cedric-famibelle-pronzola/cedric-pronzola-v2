import { Metadata } from 'next';
import { ReactNode } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export const metadata: Metadata = {
  title: 'Mentions légales | Cédric Famibelle-Pronzola',
  description: 'Découvrez les mentions légales du site.',
};

export default function DisclamerLayout({ children }: { children: ReactNode }) {
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
