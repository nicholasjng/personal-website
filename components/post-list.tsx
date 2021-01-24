import PostPreview from "./post-preview";
import Post from "../types/post";

type Props = {
  posts: Post[],
}

export default function PostList({ posts }: Props) {
  return (
    <section>
      <h2 className="mb-8 text-6xl md:text-7xl font-bold tracking-tighter leading-tight">
        More posts
      </h2>
      <div className="grid grid-cols-1 gap-y-20 md:gap-y-32 mb-32">
        {posts.map((post) => (
          <PostPreview
            key={post.slug}
            title={post.title}
            coverImage={post.coverImage}
            date={post.date}
            author={post.author}
            slug={post.slug}
            excerpt={post.excerpt}
            section={post.section}
          />
        ))}
      </div>
    </section>
  );
}
