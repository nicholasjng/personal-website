import Avatar from "./avatar";
import CoverImage from "./cover-image";
import DateFormatter from "./date-formatter";
import PostTitle from "./post-title";
import Author from "../types/author";

type Props = {
  title: string;
  coverImage?: string;
  date: string;
  author: Author;
};

const PostHeader = ({ title, coverImage, date, author }: Props) => (
  <>
    <PostTitle>{title}</PostTitle>
    {coverImage && (
      <div className="mb-8 md:mb-16">
        <CoverImage title={title} src={coverImage} width={1000} />
      </div>
    )}
    <div className="flex justify-between items-start max-w-2xl">
      <div className="flex mb-6">
        <Avatar name={author.name} picture={author.picture} />
      </div>
      <div className="flex text-lg">
        <DateFormatter dateString={date} />
      </div>
    </div>
  </>
);

export default PostHeader;
