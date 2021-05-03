import Head from "next/head";
import Layout from "./layout";
import Container from "./container";
import Placeholder from "./placeholder";
import Post from "../types/post";
import Intro from "../components/intro";
import MoreStories from "./more-stories";
import HeroCard from "./hero-card";

type IndexItem = {
  intro: string
  sectionType: string
  title: string
  desc?: string
}

type Props = {
  idxItem: IndexItem
  allPosts: Post[]
}

export default function IndexPage({idxItem, allPosts}: Props) {
  const heroPost = allPosts[0];
  const morePosts = allPosts.slice(1);

  return (
    <Layout>
      <Head>
        <title>{idxItem.title}</title>
      </Head>
      <Container>
        <Intro>{idxItem.intro}</Intro>
        {idxItem.desc && <p className="text-xl mb-20">{idxItem.desc}</p>}
        {allPosts.length === 0 && <Placeholder />}
        {heroPost && (
          <HeroCard
            title={heroPost.title}
            coverImage={heroPost.ogImage}
            date={heroPost.date}
            author={heroPost.author}
            slug={heroPost.slug}
            section={heroPost.section}
            excerpt={heroPost.excerpt}
            hashtags={heroPost.hashtags}
          />
        )}
        {morePosts.length > 0 && <MoreStories posts={morePosts} />}
      </Container>
    </Layout>
  );
}
