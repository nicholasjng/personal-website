import unified from "unified";
import parse from "remark-parse";
import remark2rehype from "remark-rehype";
import katex from "rehype-katex";
import stringify from "rehype-stringify";
import math from "remark-math";

export default async function markdownToHtml(markdown: string) {
  const result = await unified().use(parse).use(math).use(remark2rehype).use(katex).use(stringify).process(markdown);

  return result.contents;
}
