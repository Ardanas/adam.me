import { hasLocale, NextIntlClientProvider } from 'next-intl'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { Navigation } from '@/components/layout'
import { GlobalProviders } from '@/components/providers/global-providers'
import { routing } from '@/i18n/routing'

export function generateStaticParams() {
  return routing.locales.map(locale => ({ locale }))
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'Metadata' })

  return {
    title: t('title'),
    description: t('description'),
  }
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  // Ensure that the incoming `locale` is valid
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }
  // Enable static rendering
  setRequestLocale(locale)

  return (
    <html lang={locale}>
      <body className="absolute -z-10 inset-0 h-full w-full
bg-[radial-gradient(circle,#37475120_1px,transparent_1px)]
bg-[size:20px_20px]"
      >
        <NextIntlClientProvider>
          <GlobalProviders>
            <section className="container mx-auto">
              <Navigation />
              {children}
            </section>
          </GlobalProviders>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
