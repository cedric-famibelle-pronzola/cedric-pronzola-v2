import { getTranslations } from 'next-intl/server';
import { Metadata } from 'next';
import AnimatedSection from '@/app/components/AnimatedSection';
import ProjectsList from '@/app/components/ProjectsList';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';

export async function generateMetadata({
  params
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const resolvedParams = await Promise.resolve(params);
  const locale = resolvedParams.locale;
  const t = await getTranslations({ locale, namespace: 'projects' });
  
  return {
    title: t('title'),
    description: t('description'),
  };
}

type Props = {
  params: { locale: string };
};

export default async function ProjectsPage({ params }: Props) {
  const resolvedParams = await Promise.resolve(params);
  const locale = resolvedParams.locale;
  const t = await getTranslations({ locale, namespace: 'projects' });
  
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-16">
        <AnimatedSection className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">{t('title')}</h1>
              <div className="w-20 h-1 bg-foreground/20 mx-auto"></div>
              <p className="mt-6 text-foreground/70 max-w-2xl mx-auto">{t('description')}</p>
            </div>
            
            <ProjectsList showAll={true} />
          </div>
        </AnimatedSection>
      </main>
      <Footer />
    </>
  );
} 