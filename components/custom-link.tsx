import Link from "next/link";
import ExternalLinkSvg from "./external-link-svg";

type LinkProps = {
  children: string;
  href: string;
  target: string;
  rel?: string;
};

const CustomLink = ({ children, href, target, rel }: LinkProps) =>
  href.startsWith("/") || href === "" ? (
    <Link href={href}>
      <a
        href={href}
        target={target}
        className="leading-9 font-medium hover:text-success hover:underline"
      >
        {children}
      </a>
    </Link>
  ) : (
    <a
      className="leading-9 font-medium hover:text-success hover:underline"
      href={href}
      target={target}
      rel={rel}
    >
      {children}
      <ExternalLinkSvg />
    </a>
  );

export default CustomLink;
