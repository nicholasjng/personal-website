import { PageSEO } from "@/components/SEO";
import metadata from "@/config/metadata.yml";
import ListLayout from "@/layouts/ListLayout";
import { getAllFilesFrontMatter } from "@/lib/mdx";
import { getAllTopics } from "@/lib/topics";
import kebabCase from "@/lib/kebabCase";
import PostType from "@/types/post";

export async function getStaticPaths() {
  const topics = await getAllTopics("blog");

  return {
    paths: Object.keys(topics).map((topic) => ({
      params: {
        topic,
      },
    })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const allPosts = await getAllFilesFrontMatter("blog");
  const filteredPosts = allPosts.filter(
    (post) =>
      post.draft !== true &&
      post.topics.map((t: string) => kebabCase(t)).includes(params.topic)
  );

  return { props: { posts: filteredPosts, topic: params.topic } };
}

type Props = {
  posts: PostType[];
  topic: string;
};

export default function Topic({ posts, topic }: Props) {
  // Capitalize first letter and convert space to dash
  const title = topic[0].toUpperCase() + topic.split(" ").join("-").slice(1);
  return (
    <>
      <PageSEO
        title={`${topic} - ${metadata.mainAuthor}`}
        description={`${topic} topics - ${metadata.mainAuthor}`}
      />
      <ListLayout posts={posts} title={title} />
    </>
  );
}
