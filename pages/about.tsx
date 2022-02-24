import { MDXLayoutRenderer } from "@/components/MDXComponents";
import { getFileBySlug } from "@/lib/mdx";
import FrontMatterType from "@/types/frontMatter";

const DEFAULT_LAYOUT = "AuthorLayout";

type Props = {
  authorDetails: {
    mdxSource: string;
    frontMatter: FrontMatterType;
  };
};

export async function getStaticProps() {
  const authorDetails = await getFileBySlug("authors", "default");
  return { props: { authorDetails } };
}

export default function About({ authorDetails }: Props) {
  const { mdxSource, frontMatter } = authorDetails;

  return (
    <MDXLayoutRenderer
      layout={frontMatter.layout || DEFAULT_LAYOUT}
      mdxSource={mdxSource}
      frontMatter={frontMatter}
    />
  );
}
