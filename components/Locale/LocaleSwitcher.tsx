"use client";

import { useRouter, usePathname } from "next/navigation";

export default function LocaleSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const currentLocale = pathname.split("/")[1];

  const change = (locale: string) => {
    const seg = pathname.split("/");
    seg[1] = locale;
    router.push(seg.join("/"));
  };

  return (
    <div className="flex gap-2">
      <button
        className={currentLocale === "zh" ? "font-bold" : ""}
        onClick={() => change("zh")}
      >
        中文
      </button>
      <button
        className={currentLocale === "en" ? "font-bold" : ""}
        onClick={() => change("en")}
      >
        English
      </button>
    </div>
  );
}
