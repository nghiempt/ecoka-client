import { ProductByCategoryPage } from "@/modules/product/[category]";
import { getDictionary } from '@/i18n/get-dictionary'


export default async function ProductByCategory({ params: { lang, category } }: { params: { lang: string; category: string } }) {
  const dictionary = await getDictionary(lang as any)

  return (
    <div>
      <ProductByCategoryPage lang={lang} dictionary={dictionary} />
    </div>
  );
}
