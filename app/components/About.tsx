"use client";

import Image from 'next/image';
import AnimatedSection from './AnimatedSection';

const About = () => {
  return (
    <AnimatedSection id="about" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">À propos</h2>
          <div className="w-20 h-1 bg-foreground/20 mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <AnimatedSection direction="right" delay={0.2} className="space-y-6">
            <h3 className="text-2xl font-bold">Qui suis-je ?</h3>
            <p className="text-foreground/80">
              Bonjour ! Je suis Cédric Famibelle-Pronzola, développeur web passionné par la création d'applications web modernes et performantes.
            </p>
            <p className="text-foreground/80">
              Avec une solide expérience dans le développement front-end et back-end, je m'efforce de créer des solutions élégantes et accessibles qui répondent aux besoins des utilisateurs.
            </p>
            <p className="text-foreground/80">
              En tant que libriste convaincu, je suis un fervent défenseur des logiciels libres et open source.
            </p>
            
            <div className="pt-4">
              <h4 className="text-xl font-semibold mb-3">Mes compétences</h4>
              <div className="flex flex-wrap gap-2">
                {['HTML / CSS', 'PHP', 'Symfony', 'WordPress', 'JavaScript', 'Next.js', 'Node.js', 'MongoDB', 'MySQL', 'PostgreSQL', 'Git', 'Linux', 'Docker', 'CI/CD', 'Kubernetes'].map((skill) => (
                  <span 
                    key={skill}
                    className="px-3 py-1 bg-foreground/10 rounded-full text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection direction="left" delay={0.4} className="relative">
            <div className="relative aspect-square max-w-md mx-auto overflow-hidden rounded-2xl">
              <Image
                src='/cedric.png'
                quality={80}
                alt="Cédric Famibelle-Pronzola"
                fill
                className="object-cover"
              />
            </div>

            {/* Decorative elements */}
            <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-foreground/5 rounded-full -z-10"></div>
            <div className="absolute -top-6 -right-6 w-32 h-32 bg-foreground/5 rounded-full -z-10"></div>
          </AnimatedSection>
        </div>
      </div>
    </AnimatedSection>
  );
};

export default About;
