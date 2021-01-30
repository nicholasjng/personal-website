import cn from "classnames";
import Link from "next/link";
// import Image from "next/image";

type Props = {
  title: string
  src: string
  slug?: string
  height: number
  width: number
  section: string
}

export default function CoverImage({
  title,
  src,
  slug,
  height,
  width,
  section,
}: Props) {
  const image = (
    <img
      src={src}
      alt={`Cover Image for ${title}`}
      className={cn("shadow-sm", {
        "hover:shadow-md transition-shadow duration-200": slug,
      })}
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
