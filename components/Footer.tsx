import metadata from "@/config/metadata.yml";
import SocialIcon from "@/components/social";

const Footer = () => (
  <footer>
    <div className="flex flex-col items-center mt-16">
      <div className="flex mb-3 space-x-4">
        <SocialIcon
          kind="mail"
          href={`mailto:${metadata.email.name}@${metadata.email.provider}`}
          size={6}
        />
        <SocialIcon kind="github" href={metadata.github} size={6} />
        <SocialIcon kind="instagram" href={metadata.instagram} size={6} />
        <SocialIcon kind="linkedin" href={metadata.linkedin} size={6} />
      </div>
      <div className="flex mb-2 space-x-2 text-sm text-gray-500 dark:text-gray-400">
        <p>{`Copyright © ${new Date().getFullYear()} ${
          metadata.mainAuthor
        }.`}</p>
        <a
          className="ml-2 underline"
          href={metadata.siteRepo}
          target="_blank"
          rel="noopener noreferrer"
        >
          This website is open source.
        </a>
      </div>
    </div>
  </footer>
);

export default Footer;
