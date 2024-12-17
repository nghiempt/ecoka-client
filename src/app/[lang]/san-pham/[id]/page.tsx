import ProductDetailPage from "@/modules/product/[id]";
import { getDictionary } from '@/i18n/get-dictionary'

export default async function ProductDetail({ params: { lang, id } }: { params: { lang: string; id: string } }) {
  const dictionary = await getDictionary(lang as any)

  return (
    <div>
      <ProductDetailPage lang={lang} dictionary={dictionary} />
    </div>
  );
}
