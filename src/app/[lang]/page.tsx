
import { getDictionary } from '@/i18n/get-dictionary'
import { HomePage } from "@/modules/home";
import { IMAGES } from '@/utils/image';
import Head from 'next/head';

export default async function Home({ params: { lang } }: {
  params: { lang: string }
}) {
  const dictionary = await getDictionary(lang as any)
  return (
    <>
      <Head>
        <meta property="og:title" content="ECOKA HANDICRAFTS - Bring Nature to Your Life" />
        <meta
          property="og:description"
          content="Công Ty Cổ Phần ECOKA Là công ty sản xuất và xuất khẩu các sản phẩm thủ công mỹ nghệ truyền thống từ các nguyên liệu 100% từ thiên nhiên như: lục bình, mây, tre, macrame."
        />
        <meta property="og:image" content={IMAGES.LOGO} />
        <meta property="og:url" content="https://www.ecoka.vn/vi" />
        <meta property="og:type" content="website" />
        <title>ECOKA HANDICRAFTS</title>
      </Head>
      <HomePage lang={lang} dictionary={dictionary} />
    </>
  );
}
