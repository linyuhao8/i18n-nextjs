"use client";

import { createContext, useContext } from "react";
import type { Messages } from "./types";

// Context 的資料格式
type I18nContextType = {
  locale: string;
  messages: Messages;
};

// 建立 Context（可能為 null）→ 更安全
const I18nContext = createContext<I18nContextType | null>(null);

// Provider Props
type I18nProviderProps = {
  locale: string;
  messages: Messages;
  children: React.ReactNode;
};

// Provider：把 SSR 傳入的 messages 保存給 Client 使用
export function I18nProvider({
  locale,
  messages,
  children,
}: I18nProviderProps) {
  return (
    <I18nContext.Provider value={{ locale, messages }}>
      {children}
    </I18nContext.Provider>
  );
}

// useI18n(namespace) Higher order function
// ------------------
// 它接受一個 namespace（例如 “Navbar”） const t = useI18n("Navbar");
// 然後產生一個新的函式給你用。            t("projects");
// 就不用每次都 messages["Navbar"]["projects"]
//
// 這個 hook 的目的：
//
//    ⭐ 根據 namespace（如 "Navbar"），
//       產生一個 t(key) 函式，
//       讓 component 可以使用 t("projects") 自動取得翻譯字串。
//
//    ⭐ namespace 對應翻譯檔 JSON 裡的第一層 key，例如：
//
//        {
//          "Navbar": {
//            "projects": "專案",
//            "contacts": "聯絡人"
//          }
//        }
//
//      在這裡，"Navbar" 就是 namespace，"projects"、"contacts" 是 key。
//
//    ⭐ t(key) 的回傳結果 = messages[namespace][key]
//
//    ⭐ messages 是什麼？
//
//       messages 是在 SSR 時從 JSON 讀取的整包翻譯資料，
//       透過 <I18nProvider> 傳入 React Context，
//       在此 hook 用 useContext() 拿出來。
//
//    ⭐ 找不到翻譯時，用 key 當 fallback（避免畫面壞掉）
//

export function useI18n(namespace: string) {
  const ctx = useContext(I18nContext);

  if (!ctx) {
    throw new Error("useI18n 必須包在 <I18nProvider> 裡使用");
  }

  // 回傳一個「翻譯查詢函式」 這是一個 t("projects")
  //
  // 呼叫方式如下：
  //    const t = useI18n("Navbar"); 這邊是先回傳一個function 但還沒執行
  //    t("projects")   → "專案"。    這邊才是實際執行
  //    t("contacts")   → "聯絡人"
  //    t("action.seccess") -> "操作成功" 可接受巢狀結構

  // ⭐ 讓 deepGet 不用 any → 使用 unknown + 型別縮小
  const deepGet = (obj: unknown, path: string): unknown => {
    return path.split(".").reduce((cur: unknown, key: string) => {
      if (
        cur &&
        typeof cur === "object" &&
        key in (cur as Record<string, unknown>)
      ) {
        return (cur as Record<string, unknown>)[key];
      }
      return undefined;
    }, obj);
  };

  // ⭐ t(key) → 翻譯結果，一律回傳 string
  const t = ((key: string): string => {
    const nsMessages = ctx.messages?.[namespace];
    const value = deepGet(nsMessages, key);

    if (typeof value === "string") {
      return value;
    }

    return key;
  }) as ((key: string) => string) & { __namespace: string };

  // ⭐ 這樣就不會 any 了（強型別）
  t.__namespace = namespace;

  return t;
}
