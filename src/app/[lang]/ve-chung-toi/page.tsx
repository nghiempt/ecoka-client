'use client'

import { getDictionary } from '@/i18n/get-dictionary'
import { AboutPage } from '@/modules/about';

export default async function About({
  params: { lang }
}: {
  params: { lang: string }
}) {
  const dictionary = await getDictionary(lang as any)
  return (
    <>
      <AboutPage lang={lang} dictionary={dictionary} />
    </>
  );
}
