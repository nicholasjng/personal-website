// MIT License

// Copyright (c) 2021 Timothy Lin

// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:

// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.

// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.

import fs from "fs";
import { bundleMDX } from "mdx-bundler";
import { join, extname } from "path";
import matter from "gray-matter";
// Remark packages
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
// Rehype packages
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeKatex from "rehype-katex";
import rehypePrism from "@mapbox/rehype-prism";
import getAllFilesRecursively from "@/lib/files";

const CONTENT_ROOT = "content";

export function stripExtension(slug: string) {
  return slug.replace(/\.(mdx|md)/, "");
}

export function dateSort(a: string | number, b: string | number) {
  if (a > b) return -1;
  if (a < b) return 1;
  return 0;
}

export function getFiles(type: string) {
  const prefixPaths = join(process.cwd(), CONTENT_ROOT, type);
  const files = getAllFilesRecursively(prefixPaths);
  // Only want to return blog/path and ignore root, replace is needed to work on Windows
  return files.map((file: string) =>
    file.slice(prefixPaths.length + 1).replace(/\\/g, "/")
  );
}

export function getPostSlugs(sectionType: string) {
  const md_ext = ".mdx";
  const postsDirectory = join(process.cwd(), CONTENT_ROOT, sectionType);
  return fs
    .readdirSync(postsDirectory)
    .filter((file) => extname(file).toLowerCase() === md_ext);
}

export async function getFileBySlug(sectionType: string, slug: string) {
  const cwd = process.cwd();
  const mdxPath = join(cwd, CONTENT_ROOT, sectionType, `${slug}.mdx`);
  const mdPath = join(cwd, CONTENT_ROOT, sectionType, `${slug}.md`);

  const source = fs.existsSync(mdxPath)
    ? fs.readFileSync(mdxPath, "utf8")
    : fs.readFileSync(mdPath, "utf8");

  const { code } = await bundleMDX({
    source: source,
    // mdx imports can be automatically sourced from the components directory
    cwd: join(cwd, "components"),
    xdmOptions(options) {
      // this is the recommended way to add custom remark/rehype plugins
      (options.remarkPlugins = [
        ...(options.remarkPlugins ?? []),
        remarkGfm,
        remarkMath,
      ]),
        (options.rehypePlugins = [
          ...(options.rehypePlugins ?? []),
          rehypeSlug,
          rehypeAutolinkHeadings,
          rehypeKatex,
          [rehypePrism, { ignoreMissing: true }],
        ]);
      return options;
    },
    esbuildOptions: (options) => {
      options.loader = {
        ...options.loader,
        ".js": "jsx",
      };
      return options;
    },
  });

  const { data: frontmatter } = matter(source);

  return {
    mdxSource: code,
    frontMatter: {
      slug: slug || null,
      fileName: fs.existsSync(mdxPath) ? `${slug}.mdx` : `${slug}.md`,
      ...frontmatter,
      date: frontmatter.date ? new Date(frontmatter.date).toISOString() : null,
    },
  };
}

export async function getAllFilesFrontMatter(type: string) {
  const prefixPaths = join(process.cwd(), CONTENT_ROOT, type);

  const files = getAllFilesRecursively(prefixPaths);

  const allFrontMatter = [];

  files.forEach((file: string) => {
    const fileName = file.slice(prefixPaths.length + 1);

    const source = fs.readFileSync(file, "utf8");
    const { data: frontmatter } = matter(source);

    if (frontmatter.draft !== true) {
      allFrontMatter.push({
        ...frontmatter,
        slug: stripExtension(fileName),
        date: frontmatter.date
          ? new Date(frontmatter.date).toISOString()
          : null,
      });
    }
  });

  return allFrontMatter.sort((a, b) => dateSort(a.date, b.date));
}
