"use client";

import { useI18n } from "@/i18n/I18nProvider";

export function Button() {
  const t = useI18n("Buttons");

  return <button>{t("save")}</button>;
}
