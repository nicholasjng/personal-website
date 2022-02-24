import CustomLink from "@/components/CustomLink";
import indexPages from "@/config/indexPages.yml";
import { PageSEO } from "@/components/SEO";
import { getAllFilesFrontMatter } from "@/lib/mdx";
import Card from "@/components/Card";
import PostType from "@/types/post";
import PageTitle from "@/components/PageTitle";

type Props = {
  frontMatters: PostType[];
};

const MAX_POSTS = 10;

export async function getStaticProps() {
  const frontMatters = await getAllFilesFrontMatter("photography");

  return {
    props: { frontMatters },
  };
}

export default function Home({ frontMatters }: Props) {
  const photoPage = indexPages.photo;
  return (
    <>
      <PageSEO title={photoPage.title} description={photoPage.description} />
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="pt-6 pb-8 space-y-2 md:space-y-5">
          <PageTitle>{photoPage.intro}</PageTitle>
        </div>
        <ul className="flex flex-wrap">
          {!frontMatters.length && "No posts found."}
          {frontMatters.slice(0, MAX_POSTS).map((frontMatter) => {
            const { slug, date, image, title, summary, topics } = frontMatter;
            return (
              <Card
                key={slug}
                slug={slug}
                date={date}
                title={title}
                image={image}
                section="photography"
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
