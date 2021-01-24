import ExternalLinkSvg from "../templates/components/external-link-svg";

type Props = {
  children: string,
  href: string,
  target: string,
  rel:string,
}

const ExternalFooterLink = ({ children, href, target, rel }: Props) => (
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

export default ExternalFooterLink;
