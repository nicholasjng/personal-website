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

const fs = require("fs");
const globby = require("globby");
const matter = require("gray-matter");
const prettier = require("prettier");
const siteMetadata = require("../data/siteMetadata")(async () => {
  const prettierConfig = await prettier.resolveConfig("./.prettierrc.js");
  const pages = await globby([
    "pages/*.js",
    "pages/*.tsx",
    "data/blog/**/*.mdx",
    "data/blog/**/*.md",
    "public/tags/**/*.xml",
    "!pages/_*.js",
    "!pages/_*.tsx",
    "!pages/api",
  ]);

  const sitemap = `
        <?xml version="1.0" encoding="UTF-8"?>
        <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
            ${pages
              .map((page) => {
                // Exclude drafts from the sitemap
                if (page.search(".md") >= 1 && fs.existsSync(page)) {
                  const source = fs.readFileSync(page, "utf8");
                  const fm = matter(source);
                  if (fm.data.draft) {
                    return;
                  }
                  if (fm.data.canonicalUrl) {
                    return;
                  }
                }
                const path = page
                  .replace("pages/", "/")
                  .replace("data/blog", "/blog")
                  .replace("public/", "/")
                  .replace(".js", "")
                  .replace(".tsx", "")
                  .replace(".mdx", "")
                  .replace(".md", "")
                  .replace("/feed.xml", "");
                const route = path === "/index" ? "" : path;
                if (
                  page.search("pages/404.") > -1 ||
                  page.search("pages/blog/[...slug].") > -1
                ) {
                  return;
                }
                return `
                        <url>
                            <loc>${siteMetadata.siteUrl}${route}</loc>
                        </url>
                    `;
              })
              .join("")}
        </urlset>
    `;

  const formatted = prettier.format(sitemap, {
    ...prettierConfig,
    parser: "html",
  });

  // eslint-disable-next-line no-sync
  fs.writeFileSync("public/sitemap.xml", formatted);
})();
