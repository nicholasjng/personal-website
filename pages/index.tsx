import CustomLink from "@/components/CustomLink";
import indexPages from "@/config/indexPages.yml";
import { PageSEO } from "@/components/SEO";
import Preview from "@/components/Preview";
import { getAllFilesFrontMatter } from "@/lib/mdx";
import PostType from "@/types/post";

type Props = {
  frontMatters: PostType[];
};

const MAX_POSTS = 5;

export async function getStaticProps() {
  const frontMatters = await getAllFilesFrontMatter("blog");

  return {
    props: { frontMatters },
  };
}

export default function Home({ frontMatters }: Props) {
  const homePage = indexPages.home;
  return (
    <>
      <PageSEO title={homePage.title} description={homePage.description} />
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="pt-6 pb-8 space-y-2 md:space-y-5">
          <h1
            className="pt-20 text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter 
      leading-tight md:leading-none mb-12 text-left"
          >
            {homePage.intro}
          </h1>
        </div>
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          {!frontMatters.length && "No posts found."}
          {frontMatters.slice(0, MAX_POSTS).map((frontMatter) => {
            const { slug, date, title, summary, topics } = frontMatter;
            return (
              <Preview
                key={slug}
                slug={slug}
                date={date}
                title={title}
                summary={summary}
                topics={topics}
              />
            );
          })}
        </ul>
      </div>
      {frontMatters.length > MAX_POSTS && (
        <div className="flex justify-end text-base font-medium leading-6">
          <CustomLink
            href="/blog"
            className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
            aria-label="all posts"
          >
            All Posts &rarr;
          </CustomLink>
        </div>
      )}
    </>
  );
}
