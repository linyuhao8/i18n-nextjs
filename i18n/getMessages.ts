// fs (File System) 模組是 Node.js 環境中一個核心且不可或缺的模組。它提供了與本地電腦檔案進行互動的所有功能。
// 包括 Reading Writing 等 可以像一個終端機操作 Client端 檔案
import fs from "fs";
import path from "path";
import type { Messages } from "./types";
/**
 * getMessages(locale)
 * --------------------
 * 此函數負責「在伺服器端讀取對應語系的翻譯檔案」。
 *
 * ⚠ 重要：這段程式碼**一定只會在 Server（SSR）執行**
 *    因為：
 *      - Next.js 只有伺服器端能存取檔案系統 (fs)
 *      - Client 端無法讀取本機檔案
 *
 * ⚠ 關鍵：這是避免 Hydration mismatch 的本質核心
 *    → SSR 產生的字串與 CSR 必須完全一致
 *    → 所以翻譯檔案需要在 SSR 就決定好
 *    → 再透過 Provider 傳給 Client 共用同一份資料
 */
export function getMessages(locale: string): Messages {
  const dirPath = path.join(process.cwd(), "public/locales", locale);

  // 取得該語系資料夾下所有 JSON 檔案
  const files = fs
    .readdirSync(dirPath)
    .filter((file) => file.endsWith(".json"));

  const messages: Messages = {}; // ← 用 const！

  for (const file of files) {
    const filePath = path.join(dirPath, file);
    const namespace = file.replace(".json", "");

    const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));

    // 多 namespace 支援 (const 仍然可 mutate)
    messages[namespace] = data;
  }

  return messages;
}
