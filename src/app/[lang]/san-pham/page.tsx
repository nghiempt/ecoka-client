

import { getDictionary } from '@/i18n/get-dictionary'
import { ProductPage } from '@/modules/product';

export default async function Product({
  params: { lang }
}: {
  params: { lang: string }
}) {
  const dictionary = await getDictionary(lang as any)
  return (
    <>
      <ProductPage lang={lang} dictionary={dictionary} />
    </>
  );
}
