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
} from 'react-share';

import { Router, useRouter } from 'next/router';

export default function SocialFooter() {
  const router = useRouter();
  const location = router.asPath;

  return (
    <nav className="space-x-2">
      <h3 className="pl-2 text-2xl font-bold my-2">Share this page:</h3>
      <EmailShareButton url={location}>
        <EmailIcon size={32} round />
      </EmailShareButton>
      <FacebookShareButton url={location}>
        <FacebookIcon size={32} round />
      </FacebookShareButton>
      <LinkedinShareButton url={location}>
        <LinkedinIcon size={32} round />
      </LinkedinShareButton>
      <RedditShareButton url={location}>
        <RedditIcon size={32} round />
      </RedditShareButton>
      <TwitterShareButton url={location}>
        <TwitterIcon size={32} round />
      </TwitterShareButton>
    </nav>
  );
}
