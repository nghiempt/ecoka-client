import { getDictionary } from "@/i18n/get-dictionary";
import { AboutPage } from "@/modules/about";
import { AboutService } from "@/utils/api";

// Nội dung được sửa từ trang Admin nên luôn lấy mới, không prerender tĩnh.
export const dynamic = "force-dynamic";

export default async function About({
  params: { lang },
}: {
  params: { lang: string };
}) {
  const dictionary = await getDictionary(lang as any);
  const about = await AboutService.get();
  return (
    <>
      <AboutPage lang={lang} dictionary={dictionary} about={about} />
    </>
  );
}
