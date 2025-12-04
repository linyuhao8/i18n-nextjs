"use client";

import { useI18n } from "@/i18n/I18nProvider";
import { Navbar } from "@/components/Locale/Navbar";

export default function ExampleClient({ data }: { data: any }) {
  const t = useI18n("ExamplePage");

  return (
    <div>
      <Navbar />
      <div className="p-5">
        <h1>{t("title")}</h1>
        <h2>{t("fetchedData")}</h2>
        <span>{t("action.hello")}</span>
        <pre className="p-5 bg-gray-300">{JSON.stringify(data, null, 2)}</pre>
      </div>
    </div>
  );
}
