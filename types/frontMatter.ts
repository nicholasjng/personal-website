// Raw front matter as parsed by gray-matter from markdown files.
type FrontMatterType = {
  title: string;
  date: string;
  lastmod?: string;
  authors?: string[];
  summary?: string;
  image?: string;
  tags?: string[];
  layout?: string;
  draft?: boolean;
};

export default FrontMatterType;
