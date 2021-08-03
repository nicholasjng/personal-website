import { getAllPosts } from "../../lib/api";
import Post from "../../types/post";
import IndexPage from "../../components/index-page";
import indexItems from "../../config/indexPages.yml";
import { DEFAULT_ATTRIBUTES } from "../../lib/constants";

type Props = {
  allMathPosts: Post[];
};

export default function MathIndex({ allMathPosts }: Props): JSX.Element {
  return <IndexPage idxItem={indexItems.math} allPosts={allMathPosts} />;
}

export async function getStaticProps() {
  const sectionType = indexItems.math.sectionType;
  const allMathPosts = getAllPosts(sectionType, DEFAULT_ATTRIBUTES);

  return {
    props: { allMathPosts },
  };
}
