import type { Metadata } from "next";
import { Roboto_Slab } from "next/font/google";
import "../globals.css";
import { i18n } from '@/i18n/settings'
import { getDictionary } from '@/i18n/get-dictionary'

const montserrat = Roboto_Slab({ subsets: ["latin"], weight: "400" });

export async function generateMetadata({ params: { lang } }: {
  params: { lang: string }
}): Promise<Metadata> {
  const dictionary = await getDictionary(lang as any)
  return {
    title: dictionary.title,
    description: dictionary.description,
  }
}

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }))
}

export default function RootLayout({
  children,
  params: { lang },
}: {
  children: React.ReactNode
  params: { lang: string }
}) {
  return (
    <html lang={lang}>
      <body className={montserrat.className} suppressHydrationWarning={true}>
        {children}
      </body>
    </html>
  );
}