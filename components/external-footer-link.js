import ExternalLinkSvg from "../templates/components/external-link-svg";

const ExternalFooterLink = ({ children, href, target, rel }) => (
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
