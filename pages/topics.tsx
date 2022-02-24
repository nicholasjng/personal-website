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

import Link from "@/components/CustomLink";
import { PageSEO } from "@/components/SEO";
import Topic from "@/components/Topic";
import metadata from "@/config/metadata.yml";
import { getAllTopics } from "@/lib/topics";
import kebabCase from "@/lib/kebabCase";

type Props = {
  topics: string[];
};

export async function getStaticProps() {
  const topics = await getAllTopics("blog");

  return { props: { topics } };
}

export default function Topics({ topics }: Props) {
  const sortedTopics = Object.keys(topics).sort(
    (a, b) => topics[b] - topics[a]
  );
  return (
    <>
      <PageSEO
        title={`Topics - ${metadata.mainAuthor}`}
        description="Things I blog about"
      />
      <div
        className="flex flex-col items-start justify-start divide-y divide-gray-200 dark:divide-gray-700 
      md:mt-24 md:flex-row md:items-center md:justify-center md:space-x-6 md:divide-y-0"
      >
        <div className="space-x-2 pt-6 pb-8 md:space-y-5">
          <h1
            className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 
          sm:text-4xl sm:leading-10 md:border-r-2 md:px-6 md:text-6xl md:leading-14"
          >
            Topics
          </h1>
        </div>
        <div className="flex max-w-lg flex-wrap">
          {Object.keys(topics).length === 0 && "No topics found."}
          {sortedTopics.map((t) => {
            return (
              <div key={t} className="mt-2 mb-2 mr-5">
                <Topic text={t} />
                <Link
                  href={`/topics/${kebabCase(t)}`}
                  className="-ml-2 text-sm font-semibold uppercase text-gray-600 dark:text-gray-300"
                >
                  {` (${topics[t]})`}
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
