import Link from "next/link";
import { MAIN_AUTHOR } from "../lib/constants";
import Author from "../types/author"
import Avatar from "./avatar";
import CoverImage from "./cover-image"
import DateFormatter from "./date-formatter";
import HashtagList from "./hashtag-list";

type Props = {
  title: string
  coverImage: string
  date: string
  excerpt: string
  author?: Author
  slug: string
  section: string
  hashtags?: string
}

const HeroCard = ({  
  title,
  coverImage,
  date,
  excerpt,
  author,
  slug,
  section,
  hashtags
}: Props) => (
  <div className="mb-8 md:mb-16 xl:mb-24 lg:flex rounded overflow-hidden shadow-lg border border-grey-light lg:border-l-0 lg:border-t lg:border-grey-light rounded-b lg:rounded-b-none lg:rounded-r">
    {coverImage && 
    <div className="max-w-xl">
      <CoverImage
        title={title}
        src={coverImage}
        slug={slug}
        width={750}
      />
    </div>}
    <div className=" flex flex-col justify-between leading-normal">
      <div className="mb-8 px-6 py-4">
        <h1 className="mb-2 text-2xl lg:text-3xl font-bold leading-tight">
            <Link as={`/${section}/${slug}`} href={`/${section}/[slug]`}>
              <a className="hover:underline">{title}</a>
            </Link>
        </h1>
        <div className="text-gray-700 text-base mb-2">
          <p className="mb-3">{excerpt}</p>
          <DateFormatter dateString={date} />
        </div>
        {author.name !== MAIN_AUTHOR && <Avatar name={author.name} picture={author.picture} />}
      </div>
      {hashtags && <HashtagList hashtags={hashtags}/>}
    </div>
  </div>
);

export default HeroCard;
