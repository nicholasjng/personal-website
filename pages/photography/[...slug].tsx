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

import PageTitle from "@/components/PageTitle";
import { MDXLayoutRenderer } from "@/components/MDXComponents";
import {
  stripExtension,
  getAllFilesFrontMatter,
  getFileBySlug,
  getFiles,
} from "@/lib/mdx";
import FrontMatterType from "@/types/frontMatter";

const DEFAULT_LAYOUT = "PostLayout";

export async function getStaticPaths() {
  const posts = getFiles("photography");
  return {
    paths: posts.map((p: string) => ({
      params: {
        slug: stripExtension(p).split("/"),
      },
    })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const allPosts = await getAllFilesFrontMatter("photography");
  const postIndex = allPosts.findIndex(
    (post) => stripExtension(post.slug) === params.slug.join("/")
  );
  const prev = allPosts[postIndex + 1] || null;
  const next = allPosts[postIndex - 1] || null;
  const post = await getFileBySlug("photography", params.slug.join("/"));
  const authorList = post.frontMatter.authors || ["default"];
  const authorPromise = authorList.map(async (author: string) => {
    const authorResults = await getFileBySlug("authors", author);
    return authorResults.frontMatter;
  });
  const authorDetails = await Promise.all(authorPromise);

  return { props: { post, authorDetails, prev, next } };
}

type Post = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  mdxSource: any;
  frontMatter: FrontMatterType;
};

type Props = {
  post: Post;
  authorDetails: string[];
  prev: Post;
  next: Post;
};

export default function Blog({ post, authorDetails, prev, next }: Props) {
  const { mdxSource, frontMatter } = post;

  return (
    <>
      {frontMatter.draft !== true ? (
        <MDXLayoutRenderer
          layout={frontMatter.layout || DEFAULT_LAYOUT}
          mdxSource={mdxSource}
          frontMatter={frontMatter}
          authorDetails={authorDetails}
          prev={prev}
          next={next}
        />
      ) : (
        <div className="mt-24 text-center">
          <PageTitle>
            Under Construction{" "}
            <span role="img" aria-label="roadwork sign">
              🚧
            </span>
          </PageTitle>
        </div>
      )}
    </>
  );
}
