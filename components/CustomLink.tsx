import Link from "next/link";
import { ReactNode } from "react";

type LinkProps = {
  children: ReactNode;
  href: string;
  className?: string;
  target?: string;
  rel?: string;
};

const CustomLink = ({
  children,
  href,
  className,
  target = "_blank",
  rel = "noopener noreferrer",
}: LinkProps) =>
  href.startsWith("/") || href === "" ? (
    <Link href={href}>
      <a className={className}>{children}</a>
    </Link>
  ) : (
    <a className={className} href={href} target={target} rel={rel}>
      {children}
    </a>
  );

export default CustomLink;
