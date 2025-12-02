"use client";

import { useI18n } from "@/i18n/I18nProvider";

export default function ExampleClient({ data }: { data: any }) {
  const t = useI18n("ExamplePage");

  return (
    <div style={{ padding: 24 }}>
      <h1>{t("title")}</h1>

      <h2>{t("fetchedData")}</h2>

      <pre
        style={{
          padding: 16,
          background: "#f4f4f4",
          borderRadius: 8,
          fontSize: 14,
        }}
      >
        {JSON.stringify(data, null, 2)}
      </pre>
    </div>
  );
}
