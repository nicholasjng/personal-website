import Head from "next/head";
import { Router, useRouter } from "next/router";
import ErrorPage from "next/error";
import PostBody from "../components/post-body";
import PostHeader from "../components/post-header";
import Layout from "../components/layout";
import PostTitle from "../components/post-title";
import PostType from "../types/post";

type Props = {
  post: PostType
  morePosts: PostType[]
  preview: boolean
}

export default function PostPage({ post, morePosts, preview }: Props) {
  const router = useRouter();
  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />;
  }

  return (
    <Layout preview={preview}>
      {router.isFallback ? (
        <PostTitle>Loading…</PostTitle>
      ) : (
        <>
          <article className=" mb-32">
            <Head>
              <title>{post.title} - Nicholas Junge</title>
              <meta property="og:image" content={post.ogImage} />
              <meta property="og:description" content={post.excerpt} />
            </Head>
            <PostHeader
              title={post.title}
              coverImage={post.ogImage}
              date={post.date}
              section={post.section}
              author={post.author}
            />
            <PostBody content={post.content} />
          </article>
        </>
      )}
    </Layout>
  );
}
