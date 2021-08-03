import {
  EmailShareButton,
  FacebookShareButton,
  LinkedinShareButton,
  RedditShareButton,
  TwitterShareButton,
  EmailIcon,
  FacebookIcon,
  LinkedinIcon,
  RedditIcon,
  TwitterIcon,
} from "react-share";

import { useRouter } from "next/router";
import { BASE_URL } from "../lib/constants";

export default function SocialFooter(): JSX.Element {
  const router = useRouter();
  const location = router.asPath;

  const url = BASE_URL + (location === "/" ? "" : location);

  return (
    <nav className="mx-auto md:mx-0 space-x-2 self-center lg:self-start">
      <h3 className="pl-2 text-2xl font-bold my-2">Share this page:</h3>
      <EmailShareButton url={url}>
        <EmailIcon size={32} round />
      </EmailShareButton>
      <FacebookShareButton url={url}>
        <FacebookIcon size={32} round />
      </FacebookShareButton>
      <LinkedinShareButton url={url}>
        <LinkedinIcon size={32} round />
      </LinkedinShareButton>
      <RedditShareButton url={url}>
        <RedditIcon size={32} round />
      </RedditShareButton>
      <TwitterShareButton url={url}>
        <TwitterIcon size={32} round />
      </TwitterShareButton>
    </nav>
  );
}
