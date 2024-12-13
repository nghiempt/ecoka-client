'use client'

import { ESGPage } from "@/modules/esg";
import { getDictionary } from '@/i18n/get-dictionary'


export default async function ESG({
  params: { lang }
}: {
  params: { lang: string }
}) {
  const dictionary = await getDictionary(lang as any)

  return (
    <ESGPage lang={lang} dictionary={dictionary} />
  );
}
