import cn from "classnames";
import Link from "next/link";
import { imageResizeTargets } from "../lib/constants";
import findClosestSize from "../lib/image_utils";
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

  const [filename, extension] = src.split('.');

  const srcSet = imageResizeTargets
    .map((size: number) => {
      return `${filename}-${size}.webp ${size}w`;
    })
    .join(', ');

  // filename contains a leading slash.
  const url = `${filename}-${findClosestSize(
    width,
    imageResizeTargets
  )}.${extension}`;

  const image = (
    <img
      // src={url}
      srcSet={srcSet}
      alt={`Cover Image for ${title}`}
      className={cn("shadow-sm", {
        "hover:shadow-md transition-shadow duration-200": slug,
      })}
      // width={width}
      // height={height}
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
