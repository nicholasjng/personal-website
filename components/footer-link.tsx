import Link from "next/link";

type Props = {
  children: string,
  target: string,
  to: string
}

const FooterLink = ({ children, target, to }: Props) => (
  <Link href={to}>
    <a
      href={to}
      target={target}
      className="leading-9 font-medium hover:text-success hover:underline"
    >
      {children}
    </a>
  </Link>
);

export default FooterLink;
