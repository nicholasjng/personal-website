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

import SectionContainer from "@/components/SectionContainer";
import { BlogSEO } from "@/components/SEO";
import Tag from "@/components/Tag";
import siteMetadata from "@/config/metadata.yml";
import CustomLink from "@/components/CustomLink";
import PageTitle from "@/components/PageTitle";
import PostType from "@/types/post";
import authorDetails from "@/types/authorDetails";
import { ReactNode } from "react";
import Image from "@/components/Image";

const postDateTemplate: Intl.DateTimeFormatOptions = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
};

type Props = {
  frontMatter: PostType;
  authorDetails: authorDetails[];
  next: PostType;
  prev: PostType;
  children: ReactNode[];
};

export default function PostLayout({
  frontMatter,
  authorDetails,
  next,
  prev,
  children,
}: Props) {
  const { slug, date, title, tags } = frontMatter;

  return (
    <SectionContainer>
      <BlogSEO
        url={`${siteMetadata.siteUrl}/blog/${slug}`}
        authorDetails={authorDetails}
        {...frontMatter}
      />
      <article>
        <div className="xl:divide-y xl:divide-gray-200 xl:dark:divide-gray-700">
          <header className="pt-6 xl:pb-6">
            <div className="space-y-1 text-center">
              <dl className="space-y-10">
                <div>
                  <dt className="sr-only">Published on</dt>
                  <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                    <time dateTime={date}>
                      {new Date(date).toLocaleDateString(
                        siteMetadata.locale,
                        postDateTemplate
                      )}
                    </time>
                  </dd>
                </div>
              </dl>
              <div>
                <PageTitle>{title}</PageTitle>
              </div>
            </div>
          </header>
          <div
            className="pb-8 divide-y divide-gray-200 xl:divide-y-0 
            dark:divide-gray-700 xl:grid xl:grid-cols-4 xl:gap-x-6"
            style={{ gridTemplateRows: "auto 1fr" }}
          >
            <dl
              className="pt-6 pb-10 xl:pt-11 xl:border-b xl:border-gray-200 
            xl:dark:border-gray-700"
            >
              <dt className="sr-only">Authors</dt>
              <dd>
                <ul
                  className="flex justify-center space-x-8 xl:block sm:space-x-12 
                xl:space-x-0 xl:space-y-8"
                >
                  {authorDetails.map((author) => (
                    <li
                      className="flex items-center space-x-2"
                      key={author.name}
                    >
                      {author.avatar && (
                        <Image
                          src={author.avatar}
                          width="38px"
                          height="38px"
                          alt="avatar"
                          className="w-10 h-10 rounded-full"
                        />
                      )}
                      <dl className="text-sm font-medium leading-5 whitespace-nowrap">
                        <dt className="sr-only">Name</dt>
                        <dd className="text-gray-900 dark:text-gray-100">
                          {author.name}
                        </dd>
                      </dl>
                    </li>
                  ))}
                </ul>
              </dd>
            </dl>
            <div
              className="divide-y divide-gray-200 dark:divide-gray-700 
            xl:pb-0 xl:col-span-3 xl:row-span-2"
            >
              <div className="pt-10 pb-8 prose dark:prose-dark max-w-none">
                {children}
              </div>
            </div>
            <footer>
              <div
                className="text-sm font-medium leading-5 divide-gray-200 
              xl:divide-y dark:divide-gray-700 xl:col-start-1 xl:row-start-2"
              >
                {tags && (
                  <div className="py-4 xl:py-8">
                    <h2
                      className="text-xs tracking-wide text-gray-500 uppercase 
                      dark:text-gray-400"
                    >
                      Tags
                    </h2>
                    <div className="flex flex-wrap">
                      {tags.map((tag) => (
                        <Tag key={tag} text={tag} />
                      ))}
                    </div>
                  </div>
                )}
                {(next || prev) && (
                  <div className="flex justify-between py-4 xl:block xl:space-y-8 xl:py-8">
                    {prev && (
                      <div>
                        <h2
                          className="text-xs tracking-wide text-gray-500 uppercase 
                        dark:text-gray-400"
                        >
                          Previous Article
                        </h2>
                        <div
                          className="text-primary-500 hover:text-primary-600 
                        dark:hover:text-primary-400"
                        >
                          <CustomLink href={`/blog/${prev.slug}`}>
                            {prev.title}
                          </CustomLink>
                        </div>
                      </div>
                    )}
                    {next && (
                      <div>
                        <h2 className="text-xs tracking-wide text-gray-500 uppercase dark:text-gray-400">
                          Next Article
                        </h2>
                        <div className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400">
                          <CustomLink href={`/blog/${next.slug}`}>
                            {next.title}
                          </CustomLink>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
              <div className="pt-4 xl:pt-8">
                <CustomLink
                  href="/blog"
                  className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                >
                  &larr; Back to the blog
                </CustomLink>
              </div>
            </footer>
          </div>
        </div>
      </article>
    </SectionContainer>
  );
}
