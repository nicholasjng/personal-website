import Head from "next/head";
import Layout from "../../components/layout";
import Container from "../../components/container";
import HeroPost from "../../components/hero-post";
import PostList from "../../components/post-list";
import Placeholder from "../../components/placeholder";
import { getAllPosts } from "../../lib/api";
import Post from "../../types/post";

const BlogIntro = () => (
  <p className="text-xl mb-20">
    All my programming / computer-related content pieces.
    I am really into tech and software development, especially when it
    has to do with math and physics as well!
  </p>
);

type Props = {
  allProgrammingPosts: Post[]
}

export default function BlogIndex({ allProgrammingPosts }: Props) {
  const heroPost = allProgrammingPosts[0];
  const morePosts = allProgrammingPosts.slice(1);

  return (
    <Layout>
      <Head>
        <title>Tech and code content</title>
      </Head>
      <Container>
        <h1 className="mb-16 text-6xl md:text-7xl font-bold">Tech & code.</h1>
        <BlogIntro />
        {allProgrammingPosts.length === 0 && <Placeholder />}
        {heroPost && (
          <HeroPost
            title={heroPost.title}
            coverImage={heroPost.coverImage}
            date={heroPost.date}
            author={heroPost.author}
            slug={heroPost.slug}
            excerpt={heroPost.excerpt}
            section={heroPost.section}
          />
        )}
        {morePosts.length > 0 && <PostList posts={morePosts} />}
      </Container>
    </Layout>
  );
}

export async function getStaticProps() {
  const sectionType = "programming";
  const allProgrammingPosts = getAllPosts(sectionType, [
    "title",
    "date",
    "slug",
    "section",
    "author",
    "coverImage",
    "excerpt",
  ]);

  return {
    props: { allProgrammingPosts },
  };
}
