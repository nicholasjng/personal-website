import Avatar from "./avatar";
import CoverImage from "./cover-image";
import DateFormatter from "./date-formatter";
import PostTitle from "./post-title";
import Author from "../types/author";


type Props = {
  title: string
  coverImage: string
  date: string
  section: string
  author: Author
}

export default function PostHeader({ title, coverImage, date, section, author }: Props) {
  return (
    <>
      <PostTitle>{title}</PostTitle>
      <div className="mb-8 md:mb-16 sm:mx-0">
        <CoverImage title={title} src={coverImage} height={500} width={1000} section={section}/>
      </div>
      <div className="flex justify-between items-center max-w-2xl mx-auto">
        <div className="flex">
          <Avatar name={author.name} picture={author.picture} />
        </div>
        <div className="flex text-lg">
          <DateFormatter dateString={date} />
        </div>
      </div>
    </>
  );
}
