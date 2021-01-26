import CustomLink from "./custom-link";

type LinkItem = {
  external: boolean
  to: string
  title:string
}

const SectionLinks = ({ links }) => links.map((item: LinkItem) => (
  <CustomLink
        key={item.title}
        href={item.to}
        target={item.external ? "_blank" : "_self"}
        rel="noopener"
      >
        {item.title}
  </CustomLink>
  )
);


export default SectionLinks;
