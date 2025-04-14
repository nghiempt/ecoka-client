import { getDictionary } from "@/i18n/get-dictionary";
import { BlogPage } from "@/modules/blog";

export default async function Blog({
  params: { lang },
}: {
  params: { lang: string };
}) {
  const dictionary = await getDictionary(lang as any);

  return <BlogPage lang={lang} dictionary={dictionary} />;
}
