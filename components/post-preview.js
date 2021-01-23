import Link from "next/link";
import PropTypes from "prop-types";
import Avatar from "./avatar";
import DateFormatter from "./date-formatter";
import CoverImage from "./cover-image";

export default function PostPreview({
  title,
  coverImage,
  date,
  excerpt,
  author,
  slug,
  section,
}) {
  return (
    <div>
      <div className="mb-5">
        <CoverImage
          slug={slug}
          title={title}
          src={coverImage}
          height={278}
          width={556}
          section={section}
        />
      </div>
      <h3 className="text-3xl mb-3 leading-snug">
        <Link as={`/${section}/${slug}`} href={`/${section}/[slug]`}>
          <a className="hover:underline">{title}</a>
        </Link>
      </h3>
      <div className="text-lg mb-4">
        <DateFormatter dateString={date} />
      </div>
      <p className="text-lg leading-relaxed mb-4">{excerpt}</p>
      <Avatar name={author.name} picture={author.picture} />
    </div>
  );
}

PostPreview.propTypes = {
  title: PropTypes.string,
  coverImage: PropTypes.string,
  date: PropTypes.string,
  excerpt: PropTypes.string,
  author: PropTypes.shape({
    name: PropTypes.string,
    picture: PropTypes.string,
  }),
  slug: PropTypes.string,
  section: PropTypes.string,
};

PostPreview.defaultProps = {
  title: "",
  coverImage: "",
  date: "",
  excerpt: "",
  author: {},
  slug: "",
  section: "blog",
};
