import cn from "classnames";
import Link from "next/link";
import Image from "next/image";
import PropTypes from "prop-types";

export default function CoverImage({
  title,
  src,
  slug,
  height,
  width,
  section,
}) {
  const image = (
    <Image
      src={src}
      alt={`Cover Image for ${title}`}
      className={cn("shadow-sm", {
        "hover:shadow-md transition-shadow duration-200": slug,
      })}
      layout="responsive"
      width={width}
      height={height}
    />
  );
  return (
    <div className="sm:mx-0">
      {slug ? (
        <Link as={`/${section}/${slug}`} href={`/${section}/[slug]`}>
          <a aria-label={title}>{image}</a>
        </Link>
      ) : (
        image
      )}
    </div>
  );
}

CoverImage.propTypes = {
  title: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
  height: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  section: PropTypes.string.isRequired,
};
