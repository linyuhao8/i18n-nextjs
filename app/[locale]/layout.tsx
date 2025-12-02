import { I18nProvider } from "@/i18n/I18nProvider";
import { getMessages } from "@/i18n//getMessages";
import type { Locale } from "@/i18n/types";

export default async function LocaleLayout(props: unknown) {
  // 將 unknown 縮窄成我們需要的型別
  const { children, params } = props as {
    children: React.ReactNode;
    params: Promise<{ locale: Locale }>;
  };

  const { locale } = await params; // ✔ Next 15 必須 await params

  const messages = getMessages(locale);

  return (
    <I18nProvider locale={locale} messages={messages}>
      {children}
    </I18nProvider>
  );
}
// SSG才會需要 SEO適合 但這邊都是後台端 所以都SSR不需要
// export function generateStaticParams() {
//   return [{ locale: "en" }, { locale: "zh" }];
// }
