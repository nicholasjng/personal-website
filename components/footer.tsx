import { ReactNode } from "react";
import SocialFooter from "./social-footer";
import navFooter from "../config/footerNav.yml";
import CustomLink from "./custom-link";

const GITHUB_REPO = "https://github.com/njunge94/personal-website";

type Props = {
  children: ReactNode;
};

type LinkItem = {
  external: boolean;
  to: string;
  title: string;
};

const SectionLinks = ({ links }) =>
  links.map((item: LinkItem) => (
    <CustomLink
      key={item.title}
      href={item.to}
      target={item.external ? "_blank" : "_self"}
      rel="noopener"
    >
      {item.title}
    </CustomLink>
  ));

const FooterNav = ({ children }: Props) => (
  <nav className="flex flex-col items-center xl:items-start w-full pt-20 xl:pt-0 xl:w-1/4">
    <div className="inline-flex flex-col">{children}</div>
  </nav>
);

const Footer = () => (
  <footer className="border-t bg-accent-1 border-accent-2 py-16">
    <section className="container mx-auto sm:w-full xl:w-2/3 px-10 lg:px-20 flex sm:flex-col lg:flex-row flex-wrap justify-between mb-16">
      <SocialFooter />
      <FooterNav>
        <h1 className="font-bold text-lg leading-10 align-text-top uppercase tracking-wider text-gray-500">
          {navFooter.sections.title}
        </h1>
        <SectionLinks links={navFooter.sections.items} />
      </FooterNav>
      <FooterNav>
        <h1 className="font-bold text-lg leading-10 align-text-top uppercase tracking-wider text-gray-500">
          {navFooter.channels.title}
        </h1>
        <SectionLinks links={navFooter.channels.items} />
      </FooterNav>
    </section>
    <section className="container mx-auto sm:w-full xl:w-2/3 flex sm:flex-col lg:flex-row items-center flex-wrap justify-center">
      <p>{`Copyright © ${new Date().getFullYear()} Nicholas Junge.`}</p>
      <a
        className="ml-2 underline text-success"
        href={GITHUB_REPO}
        target="_blank"
        rel="noopener"
      >
        This website is open source!
      </a>
    </section>
  </footer>
);

export default Footer;
