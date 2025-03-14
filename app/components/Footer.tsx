"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { smoothScrollToSection } from '../utils/smoothScroll';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const router = useRouter();
  
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    
    if (href.startsWith('/#')) {
      if (window.location.pathname === '/' || window.location.pathname === '') {
        setTimeout(() => {
          smoothScrollToSection(href.substring(2));
        }, 10);
      } else {
        router.push(href);
      }
    } else {
      router.push(href);
    }
  };
  
  const socialLinks = [
    {
      name: 'GitHub',
      url: 'https://github.com/cedric-famibelle-pronzola',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
        </svg>
      ),
    },
    {
      name: 'X (Twitter)',
      url: 'https://x.com/CedricPronzola',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 4l11.733 16h4.267l-11.733 -16z"/>
          <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772"/>
        </svg>
      ),
    },
    {
      name: 'Codeberg',
      url: 'https://codeberg.org/ced972',
      icon: (
        <svg
        width="24"
        height="24"
        viewBox="0 0 4.2333332 4.2333335"
        xmlns="http://www.w3.org/2000/svg"
        fill="white"
      >
        <g transform="matrix(0.06551432,0,0,0.06551432,-2.232417,-1.431776)">
          <path
            d="m 42519.285,-7078.7891 a 0.76086879,0.56791688 0 0 0 -0.738,0.6739 l 33.586,125.8886 a 87.182358,87.182358 0 0 0 39.381,-33.7636 l -71.565,-92.5196 a 0.76086879,0.56791688 0 0 0 -0.664,-0.2793 z"
            fill="white"
            opacity=".5"
            transform="matrix(0.37058478,0,0,0.37058478,-15690.065,2662.0533)"
          />
          <path
            d="m 11249.461,-1883.6961 c -12.74,0 -23.067,10.3275 -23.067,23.0671 0,4.3335 1.22,8.5795 3.522,12.2514 l 19.232,-24.8636 c 0.138,-0.1796 0.486,-0.1796 0.624,0 l 19.233,24.8646 c 2.302,-3.6721 3.523,-7.9185 3.523,-12.2524 0,-12.7396 -10.327,-23.0671 -23.067,-23.0671 z"
            fill="white"
            transform="matrix(1.4006354,0,0,1.4006354,-15690.065,2662.0533)"
          />
        </g>
      </svg>
      ),
    },
    {
      name: 'Mastodon',
      url: 'https://bokantaj.o-k-i.net/@ced972',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21.58 13.913c-.29 1.469-2.592 3.121-5.238 3.396-1.379.184-2.737.368-4.185.276-2.368-.092-4.237-.551-4.237-.551 0 .184.014.459.043.643.308 2.294 2.317 2.478 4.22 2.57 1.922.091 3.613-.46 3.613-.46l.087 1.736s-1.342.734-3.738.918c-1.32.091-2.958-.092-4.872-.551-4.143-1.102-4.872-5.51-4.985-10.01-.043-1.653-.014-3.213-.014-4.316 0-5.51 3.652-7.155 3.652-7.155C6.865.184 9.45.092 12.348 0h.072c2.899.092 5.484.184 7.438 1.47 0 0 3.652 1.653 3.652 7.154 0 0 .043 4.086-.367 5.29z"/>
          <path d="M17.834 7.904v4.274h-1.692V8.08c0-.868-.367-1.31-1.102-1.31-.808 0-1.218.524-1.218 1.56v2.26h-1.684V8.33c0-1.037-.404-1.56-1.211-1.56-.735 0-1.102.442-1.102 1.31v4.098h-1.693V7.904c0-.867.221-1.56.662-2.076.455-.524 1.058-.788 1.795-.788.857 0 1.51.33 1.97.982l.426.706.419-.706c.462-.652 1.114-.982 1.97-.982.738 0 1.34.264 1.795.788.442.517.663 1.21.663 2.076z" fill="currentColor"/>
        </svg>
      ),
    },
    {
      name: 'Bluesky',
      url: 'https://bsky.app/profile/ced972.bsky.social',
      icon: (
        <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 600 530"
        width="24"
        height="24"
        fill="none"
        stroke="white"
        strokeWidth="20"
      >
        <path d="M135.72 44.03C202.216 93.951 273.74 195.17 300 249.49c26.262-54.316 97.782-155.54 164.28-205.46C512.26 8.009 590-19.862 590 68.825c0 17.712-10.155 148.79-16.111 170.07-20.703 73.984-96.144 92.854-163.25 81.433 117.3 19.964 147.14 86.092 82.697 152.22-122.39 125.59-175.91-31.511-189.63-71.766-2.514-7.38-3.69-10.832-3.708-7.896-.017-2.936-1.193.516-3.707 7.896-13.714 40.255-67.233 197.36-189.63 71.766-64.444-66.128-34.605-132.26 82.697-152.22-67.108 11.421-142.55-7.45-163.25-81.433C20.15 217.613 9.997 86.535 9.997 68.825c0-88.687 77.742-60.816 125.72-24.795z"/>
      </svg>
      ),
    },
    {
      name: 'Email',
      url: 'mailto:contact@cedric-pronzola.re',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
          <polyline points="22,6 12,13 2,6"></polyline>
        </svg>
      ),
    },
  ];

  return (
    <footer className="bg-background border-t border-foreground/10 py-12" role="contentinfo">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <a 
              href="/"
              onClick={(e) => {
                e.preventDefault();
                if (window.location.pathname === '/' || window.location.pathname === '') {
                  // If already on homepage, scroll to top smoothly
                  window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                  });
                } else {
                  // Navigate to homepage
                  router.push('/');
                }
              }}
              className="text-2xl font-bold"
              aria-label="Retour à l'accueil"
            >
              Cédric
            </a>
            <p className="mt-4 text-foreground/70 max-w-md">
              Développeur passionné et libriste, je crée des solutions web modernes et accessibles.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4" id="footer-navigation">Navigation</h3>
            <ul className="space-y-2" aria-labelledby="footer-navigation">
              <li><a href="/#about" onClick={(e) => handleNavClick(e, '/#about')} className="text-foreground/70 hover:text-foreground transition-colors">À propos</a></li>
              <li><a href="/#projects" onClick={(e) => handleNavClick(e, '/#projects')} className="text-foreground/70 hover:text-foreground transition-colors">Projets</a></li>
              <li><a href="/#stack" onClick={(e) => handleNavClick(e, '/#stack')} className="text-foreground/70 hover:text-foreground transition-colors">Stack</a></li>
              <li><Link href="/blog" className="text-foreground/70 hover:text-foreground transition-colors">Blog</Link></li>
              <li><a href="/#contact" onClick={(e) => handleNavClick(e, '/#contact')} className="text-foreground/70 hover:text-foreground transition-colors">Contact</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4" id="footer-social">Social</h3>
            <div className="flex space-x-4" aria-labelledby="footer-social">
              {socialLinks.map((link) => (
                <motion.a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground/70 hover:text-foreground transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  title={link.name}
                  aria-label={link.name}
                >
                  <span className="sr-only">{link.name}</span>
                  {link.icon}
                </motion.a>
              ))}
            </div>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-foreground/10 text-center text-foreground/60 text-sm">
          <p>{currentYear} - Cédric Famibelle-Pronzola</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 