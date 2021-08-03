import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeKatex from "rehype-katex";
import rehypeStringify from "rehype-stringify";
import math from "remark-math";

export default async function markdownToHtml(markdown: string) {
  const result = await unified()
    .use(remarkParse)
    .use(math)
    .use(remarkRehype)
    // @ts-expect-error (until remark is upgraded)
    .use(rehypeKatex)
    .use(rehypeStringify)
    .process(markdown);

  return result.value;
}
