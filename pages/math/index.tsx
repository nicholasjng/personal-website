import Head from "next/head";
import Layout from "../../components/layout";
import Container from "../../components/container";
import HeroPost from "../../components/hero-post";
import PostList from "../../components/post-list";
import Placeholder from "../../components/placeholder";
import { getAllPosts } from "../../lib/api";
import Post from "../../types/post";
import Intro from "../../components/intro";

const MathIntro = () => (
  <p className="text-xl mb-20">
    All posts on mathematics and physics topics. As I am very invested in those
    fields, I decided to put them into their own category. Content can range
    from beginner level (no / little knowledge required) to more advanced level.
  </p>
);

type Props = {
  allMathPosts: Post[]
}

export default function BlogIndex({ allMathPosts }: Props) {
  const heroPost = allMathPosts[0];
  const morePosts = allMathPosts.slice(1);

  return (
    <Layout>
      <Head>
        <title>Mathematics & Physics Posts</title>
      </Head>
      <Container>
        <Intro>Math & Physics.</Intro>
        <MathIntro />
        {allMathPosts.length === 0 && <Placeholder />}
        {heroPost && (
          <HeroPost
            title={heroPost.title}
            coverImage={heroPost.coverImage}
            date={heroPost.date}
            author={heroPost.author}
            slug={heroPost.slug}
            section={heroPost.section}
            excerpt={heroPost.excerpt}
          />
        )}
        {morePosts.length > 0 && <PostList posts={morePosts} />}
      </Container>
    </Layout>
  );
}

export async function getStaticProps() {
  const sectionType = "math";
  const allMathPosts = getAllPosts(sectionType, [
    "title",
    "date",
    "slug",
    "section",
    "author",
    "coverImage",
    "excerpt",
  ]);

  return {
    props: { allMathPosts },
  };
}
