import Author from "./author";

type PostType = {
  slug: string;
  section: string;
  title: string;
  date: string;
  ogImage: string;
  author: Author;
  excerpt: string;
  content: string;
};

export default PostType;
