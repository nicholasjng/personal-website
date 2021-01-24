import remark from "remark";
import html from "remark-html";
import math from "remark-math";

export default async function markdownToHtml(markdown: string) {
  const result = await remark().use(math).use(html).process(markdown);
  return result.toString();
}
