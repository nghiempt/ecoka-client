import { ContactPage } from "@/modules/contact";
import { getDictionary } from "@/i18n/get-dictionary";

export default async function Contact({
  params: { lang },
}: {
  params: { lang: string };
}) {
  const dictionary: any = await getDictionary(lang as any);
  return (
    <>
      <ContactPage lang={lang} dictionary={dictionary} />
    </>
  );
}
