import { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { useTranslations } from 'next-intl'
import Navbar from '@/app/components/Navbar'
import Footer from '@/app/components/Footer'

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'legal' })

  return {
    title: t('title'),
    description: t('description')
  }
}

export default async function LegalPage({
  params
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'legal' })

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-24 pb-16">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{t('title')}</h1>
          <p className="text-lg mb-8">{t('description')}</p>

          <div className="mx-auto max-w-3xl">
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">{t('definitions.title')}</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold">{t('definitions.client')}</h3>
                  <p>{t('definitions.clientDesc')}</p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold">{t('definitions.services')}</h3>
                  <p>{t('definitions.servicesDesc')}</p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold">{t('definitions.content')}</h3>
                  <p>{t('definitions.contentDesc')}</p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold">{t('definitions.userInfo')}</h3>
                  <p>{t('definitions.userInfoDesc')}</p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold">{t('definitions.personalInfo')}</h3>
                  <p>{t('definitions.personalInfoDesc')}</p>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">{t('identity.title')}</h2>
              <div className="space-y-2">
                <p>
                  <span className="font-semibold">{t('identity.owner')}:</span> Micro-entreprise Cédric Famibelle-Pronzola – Cilaos 97413 Cilaos
                </p>
                <p>
                  <span className="font-semibold">{t('identity.publisher')}:</span> Cédric Famibelle-Pronzola – contact@cedric-pronzola.dev
                </p>
                <p>
                  <span className="font-semibold">{t('identity.webmaster')}:</span> Cédric Famibelle-Pronzola – contact@cedric-pronzola.dev
                </p>
                <p>
                  <span className="font-semibold">{t('identity.host')}:</span> OVH – 2 rue Kellermann 59100 Roubaix
                </p>
                <p>
                  <span className="font-semibold">{t('identity.dpo')}:</span> Cédric Famibelle-Pronzola – contact@cedric-pronzola.dev
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">{t('usage.title')}</h2>
              <div className="space-y-2">
                <p>{t('usage.paragraph1')}</p>
                <p>{t('usage.paragraph2')}</p>
                <p>{t('usage.paragraph3')}</p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">{t('services.title')}</h2>
              <div className="space-y-2">
                <p>{t('services.paragraph1')}</p>
                <p>{t('services.paragraph2')}</p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">{t('technicalLimits.title')}</h2>
              <div className="space-y-2">
                <p>{t('technicalLimits.paragraph1')}</p>
                <p>{t('technicalLimits.paragraph2')}</p>
                <p>{t('technicalLimits.paragraph3')}</p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">{t('copyright.title')}</h2>
              <div className="space-y-4">
                <p>{t('copyright.paragraph1')}</p>
                <p>{t('copyright.paragraph2')}</p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">{t('liability.title')}</h2>
              <div className="space-y-2">
                <p>{t('liability.paragraph1')}</p>
                <p>{t('liability.paragraph2')}</p>
                <p>{t('liability.paragraph3')}</p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">{t('dataProtection.title')}</h2>

              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-2">{t('dataProtection.section1.title')}</h3>
                <div className="space-y-2">
                  <p>{t('dataProtection.section1.paragraph1')}</p>
                  <p>{t('dataProtection.section1.paragraph2')}</p>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-2">{t('dataProtection.section2.title')}</h3>
                <p>{t('dataProtection.section2.paragraph1')}</p>
                <ul className="list-disc ml-6 mt-2">
                  <li>{t('dataProtection.section2.item1')}</li>
                  <li>{t('dataProtection.section2.item2')}</li>
                  <li>{t('dataProtection.section2.item3')}</li>
                  <li>{t('dataProtection.section2.item4')}</li>
                </ul>
              </div>

              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-2">{t('dataProtection.section3.title')}</h3>
                <p>{t('dataProtection.section3.paragraph1')}</p>
                <ul className="list-disc ml-6 mt-2">
                  <li>{t('dataProtection.section3.item1')}</li>
                  <li>{t('dataProtection.section3.item2')}</li>
                  <li>{t('dataProtection.section3.item3')}</li>
                  <li>{t('dataProtection.section3.item4')}</li>
                  <li>{t('dataProtection.section3.item5')}</li>
                  <li>{t('dataProtection.section3.item6')}</li>
                  <li>{t('dataProtection.section3.item7')}</li>
                </ul>
                <p className="mt-2">{t('dataProtection.section3.paragraph2')}</p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-2">{t('dataProtection.section4.title')}</h3>
                <div className="space-y-2">
                  <p>{t('dataProtection.section4.paragraph1')}</p>
                  <p>{t('dataProtection.section4.paragraph2')}</p>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">{t('securityIncident.title')}</h2>
              <div className="space-y-4">
                <p>{t('securityIncident.paragraph1')}</p>
                <p>{t('securityIncident.paragraph2')}</p>

                <h3 className="text-xl font-semibold">{t('securityIncident.security')}</h3>
                <p>{t('securityIncident.paragraph3')}</p>
                <p>{t('securityIncident.paragraph4')}</p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">{t('cookies.title')}</h2>
              <p>{t('cookies.paragraph1')}</p>

              <div className="mt-4 mb-6">
                <h3 className="text-xl font-semibold mb-2">{t('cookies.section1.title')}</h3>
                <div className="space-y-2">
                  <p>{t('cookies.section1.paragraph1')}</p>
                  <p>{t('cookies.section1.paragraph2')}</p>
                  <p>{t('cookies.section1.paragraph3')}</p>
                  <p>{t('cookies.section1.paragraph4')}</p>
                  <p>{t('cookies.section1.paragraph5')}</p>
                  <p>{t('cookies.section1.paragraph6')}</p>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-2">{t('cookies.section2.title')}</h3>
                <div className="space-y-2">
                  <p>{t('cookies.section2.paragraph1')}</p>
                  <p>{t('cookies.section2.paragraph2')}</p>
                  <p>{t('cookies.section2.paragraph3')}</p>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">{t('applicableLaw.title')}</h2>
              <p>{t('applicableLaw.paragraph1')}</p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
