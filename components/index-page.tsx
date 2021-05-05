import Head from "next/head";
import Layout from "./layout";
import Container from "./container";
import Placeholder from "./placeholder";
import Post from "../types/post";
import Intro from "../components/intro";
import MoreStories from "./more-stories";
import HeroCard from "./hero-card";
import { BASE_URL, HOME_OG_IMAGE, MAIN_AUTHOR } from "../lib/constants";

type IndexItem = {
  intro: string;
  sectionType: string;
  title: string;
  desc: string;
};

type Props = {
  idxItem: IndexItem;
  allPosts: Post[];
};

export default function IndexPage({ idxItem, allPosts }: Props) {
  const heroPost = allPosts[0];
  const morePosts = allPosts.slice(1);

  const metaTitle = `${idxItem.title} - ${MAIN_AUTHOR}`;
  const ogImage = `${BASE_URL}/${HOME_OG_IMAGE}`;

  return (
    <Layout>
      <Head>
        <title>{metaTitle}</title>
        <meta name="author" content={MAIN_AUTHOR} />
        <meta name="description" content={idxItem.desc} />
        {/* OG properties  */}
        <meta property="og:title" content={metaTitle} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:description" content={idxItem.desc} />
      </Head>
      <Container>
        <Intro>{idxItem.intro}</Intro>
        {idxItem.title !== "Home" && (
          <p className="text-xl mb-20">{idxItem.desc}</p>
        )}
        {allPosts.length === 0 && <Placeholder />}
        {heroPost && (
          <HeroCard
            title={heroPost.title}
            coverImage={heroPost.coverImage}
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
