import Head from "next/head";
import { useRouter } from "next/router";
import ErrorPage from "next/error";
import PostBody from "../components/post-body";
import PostHeader from "../components/post-header";
import Layout from "../components/layout";
import PostTitle from "../components/post-title";
import PostType from "../types/post";
import { BASE_URL, HOME_OG_IMAGE } from "../lib/constants";

type Props = {
  post: PostType;
  morePosts: PostType[];
  preview: boolean;
};

export default function PostPage({ post, morePosts, preview }: Props) {
  const router = useRouter();
  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />;
  }

  const ogImage = `${BASE_URL}/${post.ogImage || HOME_OG_IMAGE}`;

  return (
    <Layout preview={preview}>
      {router.isFallback ? (
        <PostTitle>Loading…</PostTitle>
      ) : (
        <>
          <article className=" mb-32">
            <Head>
              <title>{post.title} - Nicholas Junge</title>
              <meta name="description" content={post.description} />
              <meta name="author" content={post.author.name} />
              <meta
                name="robots"
                content="index, follow, max-image-preview:standard"
              />
              {/* OG Properties */}
              <meta property="og:locale" content="en_US" />
              <meta property="og:title" content={post.title} />
              <meta property="og:image" content={ogImage} />
              <meta property="og:description" content={post.description} />
            </Head>
            <PostHeader
              title={post.title}
              coverImage={post.coverImage}
              date={post.date}
              author={post.author}
            />
            <PostBody content={post.content} />
          </article>
        </>
      )}
    </Layout>
  );
}
