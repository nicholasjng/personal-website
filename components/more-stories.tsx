import Post from "../types/post";
import PostCard from "./post-card";

type Props = {
  posts: Post[]
}

export default function MoreStories({ posts }: Props) {
  return (
    <section>
      <h2 className="mb-8 text-6xl md:text-7xl font-bold tracking-tighter leading-tight">
        More Stories.
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-16 lg:gap-x-32 gap-y-20 md:gap-y-32 mb-32">
        {posts.map((post) => (
          <PostCard
            key={post.slug}
            title={post.title}
            coverImage={post.ogImage}
            date={post.date}
            author={post.author}
            slug={post.slug}
            excerpt={post.excerpt}
            section={post.section}
            hashtags={post.hashtags}
          />
        ))}
      </div>
    </section>
  );
}
