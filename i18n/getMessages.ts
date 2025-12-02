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
  /**
   * 建立翻譯檔路徑
   * 它會將所有傳入的字串片段以作業系統特定的路徑分隔符號（在 Windows 上是 \，在 macOS/Linux 上是 /）連接起來
   * process.cwd():
   *   - 取得 Next.js 專案運行時的根目錄
   *   - 這樣就算在不同部署環境（Vercel / Node / Docker）
   *     都能正確找到 public/locales 位置
   *
   * path.join():
   *   - 用來組合路徑，確保不同 OS（Windows/Mac/Linux）皆能正確解析
   */

  const filePath = path.join(
    process.cwd(), // Next.js 專案根目錄 web/
    "public/locales", // 放語系檔案的資料夾
    locale, // 語言代碼，如 "en" 或 "zh"
    "common.json" //目前使用固定 namespace: common.json
  );
  /*組合成 repo/public/locales/[語言代碼]/common.json */

  /**
   * 如果該語系的檔案不存在 → 回傳空物件
   *
   * 這樣做的原因：
   *   - 防止因語系消失、路徑錯誤導致 SSR crash
   *   - maintain robustness（系統穩健性）
   *
   * 回傳 {} 適用於 fallback 機制：
   *   → 沒找到翻譯時，畫面會顯示 key，而不是炸掉
   */
  if (!fs.existsSync(filePath)) {
    return {};
  }

  /**
   * 讀取 JSON 檔並解析成 JavaScript object
   *
   * readFileSync():
   *   - 因為這段執行在 SSR（同步阻塞沒問題，且更安全）
   *   - 讀取後直接回傳字串內容
   *
   * JSON.parse():
   *   - 將翻譯的 JSON 轉成物件型態
   *
   * 回傳格式：
   *   {
   *     HomePage: { title: "...", description: "..." },
   *     Navbar:   { projects: "...", tasks: "..." },
   *     Buttons:  { save: "..." }
   *   }
   *
   * 注意：這份 messages 會被塞進 Provider
   * → Client 使用 useI18n 取得同一份資料
   */
  return JSON.parse(fs.readFileSync(filePath, "utf-8")) as Messages;
}
