// export async function unwrapParams(input: unknown) {
//   /**
//    * Next 15:
//    *   input = { params: { locale: "zh" } }
//    *
//    * Next 16:
//    *   input = { params: Promise<{ locale: "zh" }> }
//    */

//   const raw = input as { params: any };

//   // Next 16 → params 是 Promise
//   if (raw.params && typeof raw.params.then === "function") {
//     return raw.params; // 等待呼叫端 await
//   }

//   // Next 15 → params 是同步物件
//   return raw.params;
// }

type ParamsObject = Record<string, string>;
type ParamsPromise = Promise<ParamsObject>;

export async function unwrapParams(input: unknown): Promise<ParamsObject> {
  const raw = input as { params?: ParamsObject | ParamsPromise };

  if (!raw.params) {
    return {};
  }

  // Next.js 16 → params 是 Promise
  if (typeof (raw.params as ParamsPromise).then === "function") {
    return await (raw.params as ParamsPromise);
  }

  // Next.js 15 → params 是同步物件
  return raw.params as ParamsObject;
}
