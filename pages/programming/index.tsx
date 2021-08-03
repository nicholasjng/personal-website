import { getAllPosts } from "../../lib/api";
import Post from "../../types/post";
import IndexPage from "../../components/index-page";
import indexItems from "../../config/indexPages.yml";
import { DEFAULT_ATTRIBUTES } from "../../lib/constants";

type Props = {
  allProgrammingPosts: Post[];
};

export default function ProgrammingIndex({
  allProgrammingPosts,
}: Props): JSX.Element {
  return (
    <IndexPage
      idxItem={indexItems.programming}
      allPosts={allProgrammingPosts}
    />
  );
}

export async function getStaticProps() {
  const sectionType = indexItems.programming.sectionType;
  const allProgrammingPosts = getAllPosts(sectionType, DEFAULT_ATTRIBUTES);

  return {
    props: { allProgrammingPosts },
  };
}
