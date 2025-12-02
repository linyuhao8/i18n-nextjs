"use client";

import { useI18n } from "@/i18n/I18nProvider";
import Link from "next/link";
import LocaleSwitcher from "./LocaleSwitcher";

export function Navbar() {
  const t = useI18n("Navbar");

  return (
    <nav>
      <Link href="/">{t("projects")}</Link>
      <Link href="/">{t("contacts")}</Link>
      <Link href="/">{t("tasks")}</Link>
      <LocaleSwitcher />
    </nav>
  );
}
