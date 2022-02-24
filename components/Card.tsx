import Link from "next/link";
import CoverImage from "@/components/Image";
import Topic from "@/components/Topic";
import formatDate from "@/lib/formatDate";

type Props = {
  title: string;
  image?: string;
  date: string;
  summary: string;
  slug: string;
  section: string;
  topics?: string[];
};

const Card = ({
  title,
  image,
  date,
  summary,
  slug,
  section,
  topics,
}: Props) => (
  <div className="md p-4 md:w-1/2" style={{ maxWidth: "544px" }}>
    <div className="h-full overflow-hidden rounded-md border-2 border-gray-200 border-opacity-60 dark:border-gray-700">
      {image && (
        <CoverImage
          slug={slug}
          title={title}
          src={image}
          width={500}
          height={250}
        />
      )}
      <div className="px-6 py-4">
        <h3 className="font-bold text-xl mb-2">
          <Link as={`/${section}/${slug}`} href={`/${section}/[slug]`}>
            <a className="hover:underline">{title}</a>
          </Link>
        </h3>
        <div className="text-gray-700 text-base mb-2">
          <p className="mb-3">{summary}</p>
          <dt className="sr-only">Published on</dt>
          <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
            <time dateTime={date}>{formatDate(date)}</time>
          </dd>
        </div>
        {topics && topics.map((topic) => <Topic key={topic} text={topic} />)}
      </div>
    </div>
  </div>
);

export default Card;
