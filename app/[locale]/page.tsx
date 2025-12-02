"use client";
import { useI18n } from "@/i18n/I18nProvider";
import LocaleSwitcher from "@/components/Locale/LocaleSwitcher";
import { Navbar } from "@/components/Locale/Navbar";
import { Button } from "@/components/Locale/Button";

export default function HomePage() {
  const t = useI18n("HomePage");

  return (
    <>
      <h1>{t("title")}</h1>
      <p>{t("description")}</p>
      <Navbar />
      <Button />
      <LocaleSwitcher />
    </>
  );
}
