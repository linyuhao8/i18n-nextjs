import type { Metadata } from "next";
import type { Locale } from "@/i18n/types";
import { getMessages } from "@/i18n/getMessages";
import { Messages } from "@/i18n/types";
import ExampleClient from "./example-client";
import { unwrapParams } from "@/i18n/unwrapParams";

export async function generateMetadata(input: unknown) {
  const params = await unwrapParams(input);
  const { locale } = params;

  const messages = getMessages(locale);

  return {
    title: messages.ExamplePage?.title ?? "Example",
    description: messages.ExamplePage?.description ?? "Example page",
  };
}

export default async function ExamplePage(props: unknown) {
  // SSR fetch（只在 Server 執行）
  const data = await fetch("https://jsonplaceholder.typicode.com/posts/1", {
    cache: "no-store",
  }).then((res) => res.json());

  return <ExampleClient data={data} />;
}
