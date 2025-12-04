"use client";

import { useRouter, usePathname } from "next/navigation";

export default function LocaleSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const currentLocale = pathname.split("/")[1];

  const changeLocale = (locale: string) => {
    const seg = pathname.split("/");
    seg[1] = locale;
    router.push(seg.join("/"));
  };

  return (
    <div className="flex gap-2">
      {["zh", "en"].map((locale) => {
        const isActive = currentLocale === locale;

        return (
          <button
            key={locale}
            onClick={() => changeLocale(locale)}
            className="px-3 py-1.5 rounded-md text-sm font-medium border transition-all hover:bg-muted hover:text-foreground"
            style={
              isActive
                ? {
                    backgroundColor: "hsl(var(--primary))",
                    color: "hsl(var(--primary-foreground))",
                    borderColor: "hsl(var(--primary))",
                    boxShadow: "0 1px 2px rgba(0,0,0,0.1)",
                  }
                : {
                    backgroundColor: "hsl(var(--background))",
                    color: "hsl(var(--foreground))",
                    borderColor: "hsl(var(--border))",
                  }
            }
          >
            {locale === "zh" ? "中文" : "English"}
          </button>
        );
      })}
    </div>
  );
}
