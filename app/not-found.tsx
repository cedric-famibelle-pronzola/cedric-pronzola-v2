import { Metadata, Viewport } from 'next';
import Link from 'next/link';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
};

export const metadata: Metadata = {
  title: "Page non trouvée",
  description: "La page que vous recherchez n'existe pas ou a été déplacée.",
};

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main className="container mx-auto px-4 py-24 min-h-screen flex flex-col items-center justify-center text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">404</h1>
        <h2 className="text-2xl md:text-3xl font-semibold mb-4">Page non trouvée</h2>
        <p className="text-lg mb-8 max-w-md">
          La page que vous recherchez n&apos;existe pas ou a été déplacée.
        </p>
        <Link 
          href="/"
          className="px-6 py-3 bg-foreground text-background rounded-md hover:opacity-90 transition-opacity"
        >
          Retour à l&apos;accueil
        </Link>
      </main>
      <Footer />
    </>
  );
} 