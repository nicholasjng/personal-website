import Link from "next/link";

const FooterLink = ({ children, target, to }) => (
  <Link href={to}>
    <a
      href={to}
      className="leading-9 font-medium hover:text-success hover:underline"
    >
      {children}
    </a>
  </Link>
);

export default FooterLink;
