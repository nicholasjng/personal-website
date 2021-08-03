import { getAllPosts } from "../../lib/api";
import Post from "../../types/post";
import IndexPage from "../../components/index-page";
import indexItems from "../../config/indexPages.yml";
import { DEFAULT_ATTRIBUTES } from "../../lib/constants";

type Props = {
  allPhotographyPosts: Post[];
};

export default function PhotographyIndex({
  allPhotographyPosts,
}: Props): JSX.Element {
  return (
    <IndexPage idxItem={indexItems.photo} allPosts={allPhotographyPosts} />
  );
}

export async function getStaticProps() {
  const sectionType = indexItems.photo.sectionType;
  const allPhotographyPosts = getAllPosts(sectionType, DEFAULT_ATTRIBUTES);

  return {
    props: { allPhotographyPosts },
  };
}
