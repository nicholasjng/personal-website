import { getAllPosts } from "../../lib/api";
import Post from "../../types/post";
import IndexPage from "../../components/index-page";
import indexItems from "../../config/indexPages.yml";
import { DEFAULT_ATTRIBUTES } from "../../lib/constants";

type Props = {
  allBlogPosts: Post[];
};

export default function BlogIndex({ allBlogPosts }: Props): JSX.Element {
  return <IndexPage idxItem={indexItems.blog} allPosts={allBlogPosts} />;
}

export async function getStaticProps() {
  const sectionType = indexItems.blog.sectionType;
  const allBlogPosts = getAllPosts(sectionType, DEFAULT_ATTRIBUTES);

  return {
    props: { allBlogPosts },
  };
}
