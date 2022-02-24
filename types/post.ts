// Slug-augmented front matter as returned by getStaticProps.
type PostType = {
  title: string;
  slug: string;
  fileName: string;
  date: string;
  lastmod?: string;
  authors?: string[];
  summary?: string;
  image?: string;
  topics?: string[];
  layout?: string;
  draft?: boolean;
};

export default PostType;
