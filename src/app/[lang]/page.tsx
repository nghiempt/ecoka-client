
import { getDictionary } from '@/i18n/get-dictionary'
import { HomePage } from "@/modules/home";

export default async function Home({ params: { lang } }: {
  params: { lang: string }
}) {
  const dictionary = await getDictionary(lang as any)
  return (
    <>
      <HomePage dictionary={dictionary} />
    </>
  );
}
