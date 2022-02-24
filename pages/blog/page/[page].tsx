import { PageSEO } from "@/components/SEO";
import siteMetadata from "@/config/metadata.yml";
import { getAllFilesFrontMatter } from "@/lib/mdx";
import ListLayout from "@/layouts/ListLayout";
import { POSTS_PER_PAGE } from "../../blog";
import PaginationType from "@/types/pagination";
import PostType from "@/types/post";

export async function getStaticPaths() {
  const totalPosts = await getAllFilesFrontMatter("blog");
  const totalPages = Math.ceil(totalPosts.length / POSTS_PER_PAGE);
  const paths = Array.from({ length: totalPages }, (_, i) => ({
    params: { page: (i + 1).toString() },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps(context) {
  const {
    params: { page },
  } = context;
  const posts = await getAllFilesFrontMatter("blog");
  const pageNumber = parseInt(page);
  const initialDisplayPosts = posts.slice(
    POSTS_PER_PAGE * (pageNumber - 1),
    POSTS_PER_PAGE * pageNumber
  );
  const pagination = {
    currentPage: pageNumber,
    totalPages: Math.ceil(posts.length / POSTS_PER_PAGE),
  };

  return {
    props: {
      posts,
      initialDisplayPosts,
      pagination,
    },
  };
}

type Props = {
  posts: PostType[];
  initialDisplayPosts: PostType[];
  pagination: PaginationType;
};

export default function PostPage({
  posts,
  initialDisplayPosts,
  pagination,
}: Props) {
  return (
    <>
      <PageSEO
        title={siteMetadata.title}
        description={siteMetadata.description}
      />
      <ListLayout
        posts={posts}
        initialDisplayPosts={initialDisplayPosts}
        pagination={pagination}
        title="All Posts"
      />
    </>
  );
}
