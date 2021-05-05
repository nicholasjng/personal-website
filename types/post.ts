import Author from "./author";

type PostType = {
  slug: string;
  section: string;
  title: string;
  date: string;
  coverImage?: string;
  ogImage?: string;
  author: Author;
  description: string;
  content: string;
  hashtags?: string;
};

export default PostType;
