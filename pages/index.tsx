import { getAllPosts } from "../lib/api";
import Post from "../types/post";
import IndexPage from "../components/index-page";
import indexItems from "../config/indexPages.yml";
import { DEFAULT_ATTRIBUTES } from "../lib/constants";

type Props = {
  allPosts: Post[];
};

export default function HomeIndex({ allPosts }: Props): JSX.Element {
  return <IndexPage idxItem={indexItems.home} allPosts={allPosts} />;
}

export async function getStaticProps() {
  const sectionType = indexItems.blog.sectionType;
  const allPosts = getAllPosts(sectionType, DEFAULT_ATTRIBUTES);

  return {
    props: { allPosts },
  };
}
