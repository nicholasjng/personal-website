import ExternalFooterLink from "./external-footer-link";
import FooterLink from "./footer-link";

type LinkItem = {
  external: boolean,
  to: string,
  title:string,
}

const SectionLinks = ({ links }) => links.map((item: LinkItem) => {
  if (item.external) {
    return (
      <ExternalFooterLink
        key={item.title}
        href={item.to}
        target="_blank"
        rel="noopener"
      >
        {item.title}
      </ExternalFooterLink>
    );
  }

  return (
    <FooterLink key={item.title} to={item.to}>
      {item.title}
    </FooterLink>
  );
});

export default SectionLinks;
