import { GITHUB_REPO } from "../lib/constants";
import SocialFooter from "./social-footer";
import FooterNav from "./footer-nav";
import navFooter from "../config/footerNav.yml";
import MetaTitle from "../templates/components/meta-title";
import SectionLinks from "./section-links";

export default function Footer() {
  return (
    <footer className="border-t bg-accent-1 border-accent-2 pt-16 pb-16">
      <section className="container mx-auto px-20 flex flex-row flex-wrap justify-between mb-16">
        <SocialFooter />
        <FooterNav>
          <MetaTitle>{navFooter.sections.title}</MetaTitle>
          <SectionLinks links={navFooter.sections.items} />
        </FooterNav>
        <FooterNav>
          <MetaTitle>{navFooter.channels.title}</MetaTitle>
          <SectionLinks links={navFooter.channels.items} />
        </FooterNav>
      </section>
      <section className="flex flex-row justify-center">
        <p>{`Copyright © ${new Date().getFullYear()} Nicholas Junge.`}</p>
        <a className="ml-2 underline text-success" href={GITHUB_REPO}>
          This website is open source!
        </a>
      </section>
    </footer>
  );
}
