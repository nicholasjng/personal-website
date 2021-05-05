import { getPostBySlug, getAllPosts } from "../../lib/api";
import PostPage from "../../components/post-page";
import { CONTENT_ATTRIBUTE, DEFAULT_ATTRIBUTES } from "../../lib/constants";
import indexItems from "../../config/indexPages.yml";
import markdownToHtml from "../../lib/markdownToHtml";
import PostPageType from "../../types/post-page";

export default function BlogPost({ post, morePosts, preview }: PostPageType) {
  return <PostPage post={post} morePosts={morePosts} preview={preview} />;
}

type Params = {
  params: {
    slug: string;
  };
};

export async function getStaticProps({ params }: Params) {
  const post = getPostBySlug(
    params.slug,
    indexItems.blog.sectionType,
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
  const posts = getAllPosts(indexItems.blog.sectionType, ["slug"]);

  return {
    paths: posts.map((post) => ({
      params: {
        slug: post.slug,
      },
    })),
    fallback: false,
  };
}
