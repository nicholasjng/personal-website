import fs from "fs";
import { join } from "path";
import matter from "gray-matter";

const CONTENT_ROOT = "content";

export function getPostSlugs(sectionType: string) {
  const postsDirectory = join(process.cwd(), CONTENT_ROOT, sectionType);
  return fs.readdirSync(postsDirectory);
}

export function getPostBySlug(slug: string, sectionType: string, fields: string[] = []) {
  const realSlug = slug.replace(/\.md$/, "");
  const postsDirectory = join(process.cwd(), CONTENT_ROOT, sectionType);
  const fullPath = join(postsDirectory, `${realSlug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  type Items = {
    [key: string]: string
  }

  const items: Items = {};

  // Ensure only the minimal needed data is exposed
  fields.forEach((field) => {
    if (field === "slug") {
      items[field] = realSlug;
    }
    if (field === "content") {
      items[field] = content;
    }
    if (field === "section") {
      items[field] = sectionType;
    }
    if (data[field]) {
      items[field] = data[field];
    }
  });

  return items;
}

export function getAllPosts(sectionType:string, fields: string[] = []) {
  const slugs = getPostSlugs(sectionType);
  const posts = slugs
    .map((slug) => getPostBySlug(slug, sectionType, fields))
    // sort posts by date in descending order
    .sort((post1, post2) => (post1.date > post2.date ? "-1" : "1"));
  return posts;
}
