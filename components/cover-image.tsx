import findClosestSize from "../lib/image_utils";
// import Image from "next/image";

const imageResizeTargets = [384, 512, 768, 1024];

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

  return (
      <img
      srcSet={srcSet}
      alt={`Cover Image for ${title}`}
      className="sm: mx-0 shadow-sm hover:shadow-md transition-shadow duration-200"
      />
  );
}
