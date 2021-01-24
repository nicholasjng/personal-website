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
    All my blog posts and content pieces on different topics I feel passionate
    about. These content pieces do not have any thematic common thread to them,
    and thus might be a little unstructured. If you are interested in math
    topics or photography posts instead, these have their own subcategories,
    which you can find directly in the header menu.
  </p>
);

type Props = {
  allBlogPosts: Post[]
}

export default function BlogIndex({ allBlogPosts }: Props) {
  const heroPost = allBlogPosts[0];
  const morePosts = allBlogPosts.slice(1);

  return (
    <Layout>
      <Head>
        <title>Blog Posts and Thoughts</title>
      </Head>
      <Container>
        <Intro>My Blog.</Intro>
        <BlogIntro />
        {allBlogPosts.length === 0 && <Placeholder />}
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
  const sectionType = "blog";
  const allBlogPosts = getAllPosts(sectionType, [
    "title",
    "date",
    "slug",
    "section",
    "author",
    "coverImage",
    "excerpt",
  ]);

  return {
    props: { allBlogPosts },
  };
}
