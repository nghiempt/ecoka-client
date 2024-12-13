'use client'

import { ContactPage } from "@/modules/contact";
import { getDictionary } from '@/i18n/get-dictionary'

export default async function Contact({
  params: { lang }
}: {
  params: { lang: string }
}) {
  const dictionary = await getDictionary(lang as any)
  return (
    <>
      <h1>{dictionary.title}</h1>
      <ContactPage lang={lang} dictionary={dictionary} />
    </>
  );
}
