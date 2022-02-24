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

import CustomLink from "@/components/CustomLink";
import formatDate from "@/lib/formatDate";
import Topic from "@/components/Topic";

type Props = {
  slug: string;
  date: string;
  title: string;
  summary: string;
  topics: string[];
};

export default function Preview({ slug, date, title, summary, topics }: Props) {
  return (
    <li key={slug} className="py-12">
      <article>
        <div
          className="space-y-2 xl:grid xl:grid-cols-4 
        xl:space-y-0 xl:items-baseline"
        >
          <dl>
            <dt className="sr-only">Published on</dt>
            <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
              <time dateTime={date}>{formatDate(date)}</time>
            </dd>
          </dl>
          <div className="space-y-5 xl:col-span-3">
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold leading-8 tracking-tight">
                  <CustomLink
                    href={`/blog/${slug}`}
                    className="text-gray-900 dark:text-gray-100"
                  >
                    {title}
                  </CustomLink>
                </h2>
                {topics.map((topic) => (
                  <Topic key={topic} text={topic} />
                ))}
              </div>
              <div className="prose text-gray-500 max-w-none dark:text-gray-400">
                {summary}
              </div>
            </div>
            <div className="text-base font-medium leading-6">
              <CustomLink
                href={`/blog/${slug}`}
                className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                aria-label={`Read "${title}"`}
              >
                Read more &rarr;
              </CustomLink>
            </div>
          </div>
        </div>
      </article>
    </li>
  );
}
