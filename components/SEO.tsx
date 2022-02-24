// MIT License

// Copyright (c) 2021 Timothy Lin

// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:

// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.

// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.

import Head from "next/head";
import { useRouter } from "next/router";
import metadata from "@/config/metadata.yml";
import authorDetails from "@/types/authorDetails";

type ImageInfo = {
  "@type": string;
  url: string;
};

type CommonSEOProps = {
  title: string;
  description: string;
  ogType: string;
  ogImage: string | ImageInfo[];
  twImage: string;
};

type PageSEOProps = {
  title: string;
  description: string;
};

type BlogSEOProps = {
  authorDetails: authorDetails[];
  title: string;
  summary?: string;
  date: string;
  lastmod?: string;
  url: string;
  images?: string[];
};

export const CommonSEO = ({
  title,
  description,
  ogType,
  ogImage,
  twImage,
}: CommonSEOProps) => {
  const router = useRouter();
  const metaTitle = `${title} - ${metadata.mainAuthor}`;
  return (
    <Head>
      <title>{metaTitle}</title>

      <meta name="robots" content="follow, index" />

      {/* OG attributes */}
      <meta
        property="og:url"
        content={`${metadata.siteUrl}/${router.asPath}`}
      />
      <meta property="og:type" content={ogType} />
      <meta property="og:site_name" content={metadata.title} />
      <meta property="og:title" content={metaTitle} />
      {ogImage.constructor === Array ? (
        ogImage.map(({ url }) => (
          <meta property="og:image" content={url} key={url} />
        ))
      ) : (
        // toString to silence type coercion error
        <meta
          property="og:image"
          content={ogImage.toString()}
          key={ogImage.toString()}
        />
      )}
      <meta property="og:description" content={description} />

      {/* Twitter attributes */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={metaTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={twImage} />
    </Head>
  );
};

export const PageSEO = ({ title, description }: PageSEOProps) => {
  const ogImage = `${metadata.siteUrl}/${metadata.image}`;
  const twImage = `${metadata.siteUrl}/${metadata.image}`;
  return (
    <CommonSEO
      title={title}
      description={description}
      ogType="website"
      ogImage={ogImage}
      twImage={twImage}
    />
  );
};

export const BlogSEO = ({
  authorDetails,
  title,
  summary,
  date,
  lastmod,
  url,
  images = [],
}: BlogSEOProps) => {
  const router = useRouter();
  const publishedAt = new Date(date).toISOString();
  const modifiedAt = new Date(lastmod || date).toISOString();
  const imagesArr =
    images.length === 0
      ? [metadata.socialBanner]
      : typeof images === "string"
      ? [images]
      : images;

  const featuredImages = imagesArr.map((img) => {
    return {
      "@type": "ImageObject",
      url: `${metadata.siteUrl}${img}`,
    };
  });

  let authorList;
  if (authorDetails) {
    authorList = authorDetails.map((author) => {
      return {
        "@type": "Person",
        name: author.name,
      };
    });
  } else {
    authorList = {
      "@type": "Person",
      name: metadata.mainAuthor,
    };
  }

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
    headline: title,
    image: featuredImages,
    datePublished: publishedAt,
    dateModified: modifiedAt,
    author: authorList,
    publisher: {
      "@type": "Organization",
      name: metadata.mainAuthor,
      logo: {
        "@type": "ImageObject",
        url: `${metadata.siteUrl}/${metadata.image}`,
      },
    },
    description: summary,
  };

  const twImageUrl = featuredImages[0].url;

  return (
    <>
      <CommonSEO
        title={title}
        description={summary}
        ogType="article"
        ogImage={featuredImages}
        twImage={twImageUrl}
      />
      <Head>
        {date && (
          <meta property="article:published_time" content={publishedAt} />
        )}
        {lastmod && (
          <meta property="article:modified_time" content={modifiedAt} />
        )}
        <link rel="canonical" href={`${metadata.siteUrl}${router.asPath}`} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData, null, 2),
          }}
        />
      </Head>
    </>
  );
};
