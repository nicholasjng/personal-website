import cn from "classnames";
import Link from "next/link";
import { imageResizeTargets } from "../lib/constants";
import findClosestSize from "../lib/image_utils";
// import Image from "next/image";

type Props = {
  title: string
  src: string
  slug?: string
  width: number
}

export default function CoverImage({
  title,
  src,
  slug,
  width,
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
      srcSet={srcSet}
      alt={`Cover Image for ${title}`}
      className={cn("shadow-sm", {
        "hover:shadow-md transition-shadow duration-200": slug,
      })}
    />
  );
  return (
    <div className="sm:mx-0">
      {image}
    </div>
  );
}
