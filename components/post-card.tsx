import Link from "next/link";
import { MAIN_AUTHOR } from "../lib/constants";
import Author from "../types/author";
import Avatar from "./avatar";
import CoverImage from "./cover-image";
import DateFormatter from "./date-formatter";
import HashtagList from "./hashtag-list";

type Props = {
  title: string;
  coverImage?: string;
  date: string;
  description: string;
  author?: Author;
  slug: string;
  section: string;
  hashtags?: string;
};

const PostCard = ({
  title,
  coverImage,
  date,
  description,
  author,
  slug,
  section,
  hashtags,
}: Props): JSX.Element => (
  <div className="rounded overflow-hidden shadow-lg">
    {coverImage && (
      <CoverImage slug={slug} title={title} src={coverImage} width={500} />
    )}
    <div className="px-6 py-4">
      <h3 className="font-bold text-xl mb-2">
        <Link as={`/${section}/${slug}`} href={`/${section}/[slug]`}>
          <a className="hover:underline">{title}</a>
        </Link>
      </h3>
      <div className="text-gray-700 text-base mb-2">
        <p className="mb-3">{description}</p>
        <DateFormatter dateString={date} />
      </div>
      {author.name !== MAIN_AUTHOR && (
        <Avatar name={author.name} picture={author.picture} />
      )}
    </div>
    {hashtags && <HashtagList hashtags={hashtags} />}
  </div>
);

export default PostCard;
