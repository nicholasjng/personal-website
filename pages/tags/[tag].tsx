import { PageSEO } from "@/components/SEO";
import metadata from "@/config/metadata.yml";
import ListLayout from "@/layouts/ListLayout";
import { getAllFilesFrontMatter } from "@/lib/mdx";
import { getAllTags } from "@/lib/tags";
import kebabCase from "@/lib/kebabCase";
import PostType from "@/types/post";

export async function getStaticPaths() {
  const tags = await getAllTags("blog");

  return {
    paths: Object.keys(tags).map((tag) => ({
      params: {
        tag,
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
      post.tags.map((t: string) => kebabCase(t)).includes(params.tag)
  );

  return { props: { posts: filteredPosts, tag: params.tag } };
}

type Props = {
  posts: PostType[];
  tag: string;
};

export default function Tag({ posts, tag }: Props) {
  // Capitalize first letter and convert space to dash
  const title = tag[0].toUpperCase() + tag.split(" ").join("-").slice(1);
  return (
    <>
      <PageSEO
        title={`${tag} - ${metadata.mainAuthor}`}
        description={`${tag} tags - ${metadata.mainAuthor}`}
      />
      <ListLayout posts={posts} title={title} />
    </>
  );
}
