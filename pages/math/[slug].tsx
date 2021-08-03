import { getPostBySlug, getAllPosts } from "../../lib/api";
import PostType from "../../types/post";
import markdownToHtml from "../../lib/markdownToHtml";
import PostPage from "../../components/post-page";
import { CONTENT_ATTRIBUTE, DEFAULT_ATTRIBUTES } from "../../lib/constants";
import indexItems from "../../config/indexPages.yml";
import "katex/dist/katex.min.css";

type Props = {
  post: PostType;
  morePosts: PostType[];
  preview?: boolean;
};

export default function MathPost({
  post,
  morePosts,
  preview,
}: Props): JSX.Element {
  return <PostPage post={post} morePosts={morePosts} preview={preview} />;
}

type Params = {
  params: {
    slug: string;
  };
};

// TODO: Make a factory for getStaticProps and getStaticPaths
export async function getStaticProps({ params }: Params) {
  const post = getPostBySlug(
    params.slug,
    indexItems.math.sectionType,
    DEFAULT_ATTRIBUTES.concat(CONTENT_ATTRIBUTE)
  );

  const content = await markdownToHtml(post.content || "");

  return {
    props: {
      post: {
        ...post,
        content,
      },
    },
  };
}

export async function getStaticPaths() {
  const posts = getAllPosts(indexItems.math.sectionType, ["slug"]);

  return {
    paths: posts.map((post) => ({
      params: {
        slug: post.slug,
      },
    })),
    fallback: false,
  };
}
