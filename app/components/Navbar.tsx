"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { smoothScrollToSection } from '../utils/smoothScroll';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    
    if (href.startsWith('/#')) {
      if (window.location.pathname === '/' || window.location.pathname === '') {
        smoothScrollToSection(href.substring(2));
        if (mobileMenuOpen) {
          setMobileMenuOpen(false);
        }
      } else {
        router.push(href);
      }
    } else {
      router.push(href);
    }
  };

  return (
    <motion.header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-background/80 backdrop-blur-md shadow-sm' : 'bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <a 
          href="/"
          onClick={(e) => {
            e.preventDefault();
            if (window.location.pathname === '/' || window.location.pathname === '') {
              window.scrollTo({
                top: 0,
                behavior: 'smooth'
              });
            } else {
              router.push('/');
            }
          }}
          className="text-2xl font-bold"
        >
          Cédric
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8">
          <NavLink href="/#about" onClick={handleNavClick}>À propos</NavLink>
          <NavLink href="/#projects" onClick={handleNavClick}>Projets</NavLink>
          <NavLink href="/#stack" onClick={handleNavClick}>Stack</NavLink>
          <NavLink href="/blog">Blog</NavLink>
          <NavLink href="/#contact" onClick={handleNavClick}>Contact</NavLink>
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-foreground"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <motion.div 
          className="md:hidden bg-background/95 backdrop-blur-md"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            <MobileNavLink href="/#about" onClick={(e) => handleNavClick(e, '/#about')}>À propos</MobileNavLink>
            <MobileNavLink href="/#projects" onClick={(e) => handleNavClick(e, '/#projects')}>Projets</MobileNavLink>
            <MobileNavLink href="/#stack" onClick={(e) => handleNavClick(e, '/#stack')}>Stack</MobileNavLink>
            <MobileNavLink href="/blog" onClick={() => setMobileMenuOpen(false)}>Blog</MobileNavLink>
            <MobileNavLink href="/#contact" onClick={(e) => handleNavClick(e, '/#contact')}>Contact</MobileNavLink>
          </div>
        </motion.div>
      )}
    </motion.header>
  );
};

const NavLink = ({ 
  href, 
  children,
  onClick
}: { 
  href: string; 
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>, href: string) => void;
}) => {
  if (onClick && href.startsWith('/#')) {
    return (
      <a 
        href={href}
        className="relative text-foreground/80 hover:text-foreground transition-colors duration-300 py-2 font-medium"
        onClick={(e) => onClick(e, href)}
      >
        {children}
        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-foreground transition-all duration-300 group-hover:w-full"></span>
      </a>
    );
  }
  
  return (
    <Link 
      href={href}
      className="relative text-foreground/80 hover:text-foreground transition-colors duration-300 py-2 font-medium"
    >
      {children}
      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-foreground transition-all duration-300 group-hover:w-full"></span>
    </Link>
  );
};

const MobileNavLink = ({ 
  href, 
  children, 
  onClick 
}: { 
  href: string; 
  children: React.ReactNode;
  onClick: ((e: React.MouseEvent<HTMLAnchorElement>) => void) | (() => void);
}) => {
  if (typeof onClick === 'function' && href.startsWith('/#')) {
    return (
      <a 
        href={href}
        className="block py-2 text-foreground/80 hover:text-foreground transition-colors duration-300"
        onClick={onClick}
      >
        {children}
      </a>
    );
  }
  
  return (
    <Link 
      href={href}
      className="block py-2 text-foreground/80 hover:text-foreground transition-colors duration-300"
      onClick={onClick as () => void}
    >
      {children}
    </Link>
  );
};

export default Navbar; 