"use client";

import { useState, FormEvent, useEffect } from 'react';
import { motion } from 'framer-motion';
import AnimatedSection from './AnimatedSection';
import { useTranslations } from 'next-intl';

type FormErrors = {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
};

const Contact = () => {
  const t = useTranslations('home.contact');
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    website: '', // Honeypot field
  });
  
  const [csrfToken, setCsrfToken] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error' | 'rate-limited'>('idle');
  const [errors, setErrors] = useState<FormErrors>({});
  const [rateLimitMessage, setRateLimitMessage] = useState<string>('');
  
  // Generate CSRF token when component mounts
  useEffect(() => {
    // Simple CSRF token generation
    const token = Math.random().toString(36).substring(2, 15) + 
                 Math.random().toString(36).substring(2, 15);
    setCsrfToken(token);
    
    // Store token in session storage
    sessionStorage.setItem('csrfToken', token);
  }, []);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});
    setRateLimitMessage('');
    
    // Verify CSRF token
    const storedToken = sessionStorage.getItem('csrfToken');
    if (storedToken !== csrfToken) {
      setSubmitStatus('error');
      setIsSubmitting(false);
      return;
    }
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-Token': csrfToken,
        },
        body: JSON.stringify(formData),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        // Handle rate limiting
        if (response.status === 429 && data.rateLimited) {
          setSubmitStatus('rate-limited');
          setRateLimitMessage(data.message);
        }
        // Handle validation errors
        else if (data.errors && Array.isArray(data.errors)) {
          const fieldErrors: FormErrors = {};
          data.errors.forEach((error: any) => {
            fieldErrors[error.path as keyof FormErrors] = error.msg;
          });
          setErrors(fieldErrors);
          setSubmitStatus('error');
        } else {
          setSubmitStatus('error');
        }
      } else {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '', website: '' });
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      
      setTimeout(() => {
        setSubmitStatus('idle');
      }, 5000);
    }
  };
  
  return (
    <AnimatedSection id="contact" className="py-24 bg-background/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('title')}</h2>
          <div className="w-20 h-1 bg-foreground/20 mx-auto"></div>
          <p className="mt-6 text-foreground/70 max-w-2xl mx-auto">
            {t('description')}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
          <AnimatedSection direction="right" delay={0.2} className="space-y-8">
            <div>
              <h3 className="text-xl font-bold mb-4">{t('contactInfo')}</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="mr-4 text-foreground/70">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                      <polyline points="22,6 12,13 2,6"></polyline>
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium">Email</h4>
                    <a 
                      href="mailto:contact@cedric-pronzola.re" 
                      className="text-foreground/70 hover:text-foreground transition-colors"
                      aria-label={t('emailAriaLabel')}
                    >
                      contact@cedric-pronzola.re
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="mr-4 text-foreground/70">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M15.05 5A5 5 0 0 1 19 8.95M15.05 1A9 9 0 0 1 23 8.94m-1 7.98v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium">{t('phone')}</h4>
                    <a 
                      href="tel:+262693629359"
                      className="text-foreground/70 hover:text-foreground transition-colors"
                      aria-label={t('phoneAriaLabel')}
                    >
                      +262 6 93 62 93 59
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="mr-4 text-foreground/70">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                      <circle cx="12" cy="10" r="3"></circle>
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium">{t('location')}</h4>
                    <p className="text-foreground/70">{t('locationValue')}</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-bold mb-4">{t('networks')}</h3>
              <div className="flex flex-col space-y-4">
                <div className="flex space-x-4">
                  {/* First row of links - Encrypted messaging platforms */}
                  <motion.a
                    href="https://signal.me/#eu/iRFMyB-jQ0SVtraoMkXbyAfRhi_tiIJfcbczUA7PsZoxVSSwWYxN-rsQbBSKHlFz"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-foreground/5 rounded-full text-foreground/80 hover:bg-foreground/10 hover:text-foreground transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    title="Signal"
                  >
                    <svg width="24" height="24" viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <g fill="currentColor">
                        <path d="M80 0c4.1505 0 8.2271.31607 12.2072.925452l-1.1444 7.413248c-3.6069-.55226-7.3014-.8387-11.0628-.8387-3.7612 0-7.4555.28641-11.0623.83862l-1.1444-7.413245c3.9799-.609332 8.0564-.925375 12.2067-.925375z"/>
                        <path d="M145 80c0 35.899-29.101 65-65 65-11.3866 0-22.0893-2.928-31.3965-8.072-.8961-.495-1.9417-.658-2.9389-.426l-28.9134 6.747 6.7465-28.914c.2326-.997.0692-2.043-.426-2.939-5.1439-9.307-8.0717-20.0095-8.0717-31.396 0-35.8985 29.1015-65 65-65 35.899 0 65 29.1015 65 65z"/>
                      </g>
                    </svg>
                  </motion.a>

                  <motion.a
                    href="https://xmpp.link/#ced972@movim.eu"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-foreground/5 rounded-full text-foreground/80 hover:bg-foreground/10 hover:text-foreground transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    title="XMPP"
                  >
                    <svg fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" width="24" height="24">
                      <path d="M 2.140625 8.4160156 C 1.5464453 8.3779121 1.01425 8.8778125 1.078125 9.5078125 C 2.342125 21.977813 18.578609 42.202563 35.974609 42.976562 C 36.535609 43.001562 37 42.536609 37 41.974609 L 37 41.943359 C 37 41.441359 36.631812 41.006078 36.132812 40.955078 C 28.218812 40.157078 16.370766 28.788078 16.009766 13.705078 C 15.998766 13.283078 15.733031 12.911344 15.332031 12.777344 L 2.3984375 8.4667969 C 2.3125625 8.4381719 2.2255078 8.421459 2.140625 8.4160156 z M 47.857422 8.4199219 C 47.772383 8.4254883 47.685859 8.4419531 47.599609 8.4707031 L 34.669922 12.779297 C 34.269922 12.909297 34.000234 13.280938 33.990234 13.710938 C 33.800234 21.490938 30.559141 28.280625 26.369141 33.140625 C 27.719141 34.550625 29.159844 35.749922 30.589844 36.669922 C 40.619844 29.519922 48.079922 17.799766 48.919922 9.5097656 C 48.981172 8.8797656 48.452695 8.380957 47.857422 8.4199219 z M 19.349609 39.050781 C 17.439609 40.130781 15.569141 40.790937 13.869141 40.960938 C 13.369141 41.010938 13 41.439453 13 41.939453 L 13 41.970703 C 13 42.540703 13.459297 43.000469 14.029297 42.980469 C 16.959297 42.850469 19.860156 42.160781 22.660156 41.050781 C 21.530156 40.450781 20.429609 39.770781 19.349609 39.050781 z"/>
                    </svg>
                  </motion.a>

                  <motion.a
                    href="https://simplex.chat/contact#/?v=2-7&smp=smp%3A%2F%2Fhejn2gVIqNU6xjtGM3OwQeuk8ZEbDXVJXAlnSBJBWUA%3D%40smp16.simplex.im%2FhmwAMS0fMSsq3llW22muUgEQcabP0oh0%23%2F%3Fv%3D1-3%26dh%3DMCowBQYDK2VuAyEAJFc6LIrbRM8gAf1muwgyOuHj-sbqsoc-PNhh75oNZmg%253D%26srv%3Dp3ktngodzi6qrf7w64mmde3syuzrv57y55hxabqcq3l5p6oi7yzze6qd.onion"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-foreground/5 rounded-full text-foreground/80 hover:bg-foreground/10 hover:text-foreground transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    title="SimpleXChat"
                  >
                    <svg width="24" height="24" viewBox="0 0 34 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" clipRule="evenodd" d="M3.02958 8.60922L8.622 14.2013L14.3705 8.45375L17.1669 11.2498L11.4183 16.9972L17.0114 22.5895L14.1373 25.4633L8.54422 19.871L2.79636 25.6187L0 22.8227L5.74794 17.075L0.155484 11.483L3.02958 8.60922Z" fill="currentColor"/>
                      <path fillRule="evenodd" clipRule="evenodd" d="M14.0923 25.5156L16.944 22.6642L16.9429 22.6634L22.6467 16.9612L17.0513 11.3675L17.0523 11.367L14.2548 8.56979L8.65972 2.97535L11.5114 0.123963L17.1061 5.71849L22.8099 0.015625L25.6074 2.81285L19.9035 8.51562L25.4984 14.1099L31.2025 8.40729L34 11.2045L28.2958 16.907L33.8917 22.5017L31.0399 25.3531L25.4442 19.7584L19.7409 25.4611L25.3365 31.0559L22.4848 33.9073L16.8892 28.3124L11.1864 34.0156L8.38885 31.2184L14.0923 25.5156Z" fill="currentColor"/>
                    </svg>
                  </motion.a>

                  <motion.a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      navigator.clipboard.writeText("05180a84bd3f88e89caae6fed3a492b4af5d9a8dde0e478fb836e0a88b27464878");
                      alert("ID Session copié");
                    }}
                    className="p-3 bg-foreground/5 rounded-full text-foreground/80 hover:bg-foreground/10 hover:text-foreground transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    title="Session (Cliquer pour copier l'ID)"
                  >
                    <svg width="24" height="24" viewBox="0 0 303.06 336.3" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M255.67,170.86l-63.48-35.17h43.03c37.41,0,67.85-30.43,67.85-67.84S272.63,0,235.22,0H85C38.13,0,0,38.13,0,85c0,33.42,18.16,64.25,47.4,80.45l63.48,35.17H67.85C30.44,200.62,0,231.05,0,268.46s30.44,67.85,67.85,67.85h150.22c46.87,0,85-38.13,85-85C303.06,217.88,284.9,187.06,255.67,170.86z M57.58,147.05c-22.06-12.22-35.95-35.25-36.54-60.39C20.19,50.57,50.5,21.02,86.61,21.02h147.25c25.18,0,46.88,19.31,48.12,44.46c1.33,26.88-20.16,49.18-46.76,49.18c0,0-60.99,0.01-84.81,0.01c-5.19,0-9.37,4.21-9.38,9.39l-0.02,69.22L57.58,147.05z M216.46,315.28H69.2c-25.18,0-46.88-19.31-48.12-44.46c-1.33-26.88,20.16-49.18,46.76-49.18h84.81c5.19,0,9.39-4.21,9.39-9.39v-69.23l83.44,46.23c22.06,12.22,35.95,35.25,36.54,60.39C282.87,285.73,252.56,315.28,216.46,315.28z" fill="currentColor"/>
                    </svg>
                  </motion.a>
                </div>
                
                <div className="flex space-x-4">
                  {/* Second row of links - Development platforms */}
                  <motion.a
                    href="https://codeberg.org/ced972"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-foreground/5 rounded-full text-foreground/80 hover:bg-foreground/10 hover:text-foreground transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    title="Codeberg"
                  >
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 4.2333332 4.2333335"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                    >
                      <g transform="matrix(0.06551432,0,0,0.06551432,-2.232417,-1.431776)">
                        <path
                          d="m 42519.285,-7078.7891 a 0.76086879,0.56791688 0 0 0 -0.738,0.6739 l 33.586,125.8886 a 87.182358,87.182358 0 0 0 39.381,-33.7636 l -71.565,-92.5196 a 0.76086879,0.56791688 0 0 0 -0.664,-0.2793 z"
                          fill="currentColor"
                          opacity=".5"
                          transform="matrix(0.37058478,0,0,0.37058478,-15690.065,2662.0533)"
                        />
                        <path
                          d="m 11249.461,-1883.6961 c -12.74,0 -23.067,10.3275 -23.067,23.0671 0,4.3335 1.22,8.5795 3.522,12.2514 l 19.232,-24.8636 c 0.138,-0.1796 0.486,-0.1796 0.624,0 l 19.233,24.8646 c 2.302,-3.6721 3.523,-7.9185 3.523,-12.2524 0,-12.7396 -10.327,-23.0671 -23.067,-23.0671 z"
                          fill="currentColor"
                          transform="matrix(1.4006354,0,0,1.4006354,-15690.065,2662.0533)"
                        />
                      </g>
                    </svg>
                  </motion.a>

                  <motion.a
                    href="https://github.com/cedric-famibelle-pronzola"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-foreground/5 rounded-full text-foreground/80 hover:bg-foreground/10 hover:text-foreground transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    title="GitHub"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                    </svg>
                  </motion.a>

                  <motion.a
                    href="https://bokantaj.o-k-i.net/@ced972"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-foreground/5 rounded-full text-foreground/80 hover:bg-foreground/10 hover:text-foreground transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    title="Mastodon"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21.58 13.913c-.29 1.469-2.592 3.121-5.238 3.396-1.379.184-2.737.368-4.185.276-2.368-.092-4.237-.551-4.237-.551 0 .184.014.459.043.643.308 2.294 2.317 2.478 4.22 2.57 1.922.091 3.613-.46 3.613-.46l.087 1.736s-1.342.734-3.738.918c-1.32.091-2.958-.092-4.872-.551-4.143-1.102-4.872-5.51-4.985-10.01-.043-1.653-.014-3.213-.014-4.316 0-5.51 3.652-7.155 3.652-7.155C6.865.184 9.45.092 12.348 0h.072c2.899.092 5.484.184 7.438 1.47 0 0 3.652 1.653 3.652 7.154 0 0 .043 4.086-.367 5.29z"/>
                      <path d="M17.834 7.904v4.274h-1.692V8.08c0-.868-.367-1.31-1.102-1.31-.808 0-1.218.524-1.218 1.56v2.26h-1.684V8.33c0-1.037-.404-1.56-1.211-1.56-.735 0-1.102.442-1.102 1.31v4.098h-1.693V7.904c0-.867.221-1.56.662-2.076.455-.524 1.058-.788 1.795-.788.857 0 1.51.33 1.97.982l.426.706.419-.706c.462-.652 1.114-.982 1.97-.982.738 0 1.34.264 1.795.788.442.517.663 1.21.663 2.076z" fill="currentColor"/>
                    </svg>
                  </motion.a>

                  <motion.a
                    href="https://gade.o-k-i.net/@ced972"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-foreground/5 rounded-full text-foreground/80 hover:bg-foreground/10 hover:text-foreground transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    title="PeerTube"
                  >
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      width="24" 
                      height="24" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                    >
                      <path d="M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2z" />
                      <path d="M9.5 8.5v7l6-3.5-6-3.5z" fill="currentColor" />
                    </svg>
                  </motion.a>
                </div>
                
                <div className="flex space-x-4">
                  {/* Third row of links - Social media */}
                  <motion.a
                    href="https://bsky.app/profile/ced972.bsky.social"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-foreground/5 rounded-full text-foreground/80 hover:bg-foreground/10 hover:text-foreground transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    title="Bluesky"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 600 530"
                      width="24"
                      height="24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="20"
                    >
                      <path d="M135.72 44.03C202.216 93.951 273.74 195.17 300 249.49c26.262-54.316 97.782-155.54 164.28-205.46C512.26 8.009 590-19.862 590 68.825c0 17.712-10.155 148.79-16.111 170.07-20.703 73.984-96.144 92.854-163.25 81.433 117.3 19.964 147.14 86.092 82.697 152.22-122.39 125.59-175.91-31.511-189.63-71.766-2.514-7.38-3.69-10.832-3.708-7.896-.017-2.936-1.193.516-3.707 7.896-13.714 40.255-67.233 197.36-189.63 71.766-64.444-66.128-34.605-132.26 82.697-152.22-67.108 11.421-142.55-7.45-163.25-81.433C20.15 217.613 9.997 86.535 9.997 68.825c0-88.687 77.742-60.816 125.72-24.795z"/>
                    </svg>
                  </motion.a>
                  
                  <motion.a
                    href="https://instagram.com/cedric_kaubuntu"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-foreground/5 rounded-full text-foreground/80 hover:bg-foreground/10 hover:text-foreground transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    title="Instagram"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                    </svg>
                  </motion.a>
                  
                  <motion.a
                    href="https://x.com/CedricPronzola"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-foreground/5 rounded-full text-foreground/80 hover:bg-foreground/10 hover:text-foreground transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    title="X (Twitter)"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 4l11.733 16h4.267l-11.733 -16z"/>
                      <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772"/>
                    </svg>
                  </motion.a>
                  
                  <motion.a
                    href="https://youtube.com/@ced97240"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-foreground/5 rounded-full text-foreground/80 hover:bg-foreground/10 hover:text-foreground transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    title="YouTube"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
                      <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
                    </svg>
                  </motion.a>
                </div>
              </div>
            </div>
          </AnimatedSection>
          
          <AnimatedSection direction="left" delay={0.4}>
            <div className="max-w-3xl mx-auto">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Hidden honeypot field */}
                <div className="hidden" aria-hidden="true">
                  <label htmlFor="website">Website (Leave this empty)</label>
                  <input
                    type="text"
                    id="website"
                    name="website"
                    value={formData.website}
                    onChange={handleChange}
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </div>
                
                {/* Hidden CSRF token field */}
                <input type="hidden" name="csrfToken" value={csrfToken} />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2">
                      {t('name')}
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className={`w-full px-4 py-2 border ${errors.name ? 'border-red-500' : 'border-foreground/20'} rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-foreground/40`}
                      aria-invalid={errors.name ? 'true' : 'false'}
                      aria-describedby={errors.name ? 'name-error' : undefined}
                    />
                    {errors.name && (
                      <p id="name-error" className="mt-1 text-sm text-red-500">
                        {errors.name}
                      </p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2">
                      {t('email')}
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className={`w-full px-4 py-2 border ${errors.email ? 'border-red-500' : 'border-foreground/20'} rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-foreground/40`}
                      aria-invalid={errors.email ? 'true' : 'false'}
                      aria-describedby={errors.email ? 'email-error' : undefined}
                    />
                    {errors.email && (
                      <p id="email-error" className="mt-1 text-sm text-red-500">
                        {errors.email}
                      </p>
                    )}
                  </div>
                </div>
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium mb-2">
                    {t('subject')}
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className={`w-full px-4 py-2 border ${errors.subject ? 'border-red-500' : 'border-foreground/20'} rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-foreground/40`}
                    aria-invalid={errors.subject ? 'true' : 'false'}
                    aria-describedby={errors.subject ? 'subject-error' : undefined}
                  >
                    <option value="">{t('selectSubject')}</option>
                    <option value="project">{t('project')}</option>
                    <option value="collaboration">{t('collaboration')}</option>
                    <option value="question">{t('question')}</option>
                    <option value="other">{t('other')}</option>
                  </select>
                  {errors.subject && (
                    <p id="subject-error" className="mt-1 text-sm text-red-500">
                      {errors.subject}
                    </p>
                  )}
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2">
                    {t('message')}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className={`w-full px-4 py-2 border ${errors.message ? 'border-red-500' : 'border-foreground/20'} rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-foreground/40 resize-none`}
                    aria-invalid={errors.message ? 'true' : 'false'}
                    aria-describedby={errors.message ? 'message-error' : undefined}
                  />
                  {errors.message && (
                    <p id="message-error" className="mt-1 text-sm text-red-500">
                      {errors.message}
                    </p>
                  )}
                </div>
                <div className="text-center">
                  <button 
                    type="submit"
                    className="inline-flex items-center justify-center px-6 py-3 bg-foreground text-background rounded-md font-medium hover:bg-foreground/90 transition-colors cursor-pointer"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-background" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        {t('sending')}
                      </span>
                    ) : (
                      t('send')
                    )}
                  </button>
                </div>
                
                {/* Display status messages below the send button */}
                {submitStatus === 'success' && (
                  <div className="p-4 bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 rounded-md mt-4">
                    {t('success')}
                  </div>
                )}
                
                {submitStatus === 'error' && (
                  <div className="p-4 bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400 rounded-md mt-4">
                    {t('error')}
                  </div>
                )}
                
                {submitStatus === 'rate-limited' && (
                  <div className="p-4 bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400 rounded-md mt-4">
                    {rateLimitMessage ? t('rateLimitedWithTime', { seconds: rateLimitMessage }) : t('rateLimited')}
                  </div>
                )}
              </form>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </AnimatedSection>
  );
};

export default Contact; 