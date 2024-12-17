
import { getDictionary } from '@/i18n/get-dictionary'
import PrivacyPolicyPage from '@/modules/privacy-policy';

export default async function PrivacyPolicy({
  params: { lang }
}: {
  params: { lang: string }
}) {
  const dictionary: any = await getDictionary(lang as any)
  return (
    <>
      <PrivacyPolicyPage lang={lang} dictionary={dictionary} />
    </>
  );
}
