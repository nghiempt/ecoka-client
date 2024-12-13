import { getDictionary } from '@/i18n/get-dictionary'
import BlogDetailPage from "@/modules/blog/[id]";

export default async function BlogDetail({ params: { lang, id } }: { params: { lang: string; id: string } }) {
  const dictionary = await getDictionary(lang as any)

  return (
    <div>
      <BlogDetailPage lang={lang} dictionary={dictionary} />
    </div>
  );
}
