import Head from "next/head";
import Layout from "../../components/layout";
import Container from "../../components/container";
import HeroPost from "../../components/hero-post";
import PostList from "../../components/post-list";
import Placeholder from "../../components/placeholder";
import { getAllPosts } from "../../lib/api";
import Post from "../../types/post";
import Intro from "../../components/intro";

const BlogIntro = () => (
  <p className="text-xl mb-20">
    All my photography content pieces. Content includes travel blogs /
    diaries as well as photography reviews, mostly of Leica lenses and
    cameras.
  </p>
);

type Props = {
  allPhotographyPosts: Post[]
}

export default function BlogIndex({ allPhotographyPosts }: Props) {
  const heroPost = allPhotographyPosts[0];
  const morePosts = allPhotographyPosts.slice(1);

  return (
    <Layout>
      <Head>
        <title>Photography Blogs and Reviews</title>
      </Head>
      <Container>
        <Intro>Photography.</Intro>
        <BlogIntro />
        {allPhotographyPosts.length === 0 && <Placeholder />}
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
  const sectionType = "photography";
  const allPhotographyPosts = getAllPosts(sectionType, [
    "title",
    "date",
    "slug",
    "section",
    "author",
    "coverImage",
    "excerpt",
  ]);

  return {
    props: { allPhotographyPosts },
  };
}
