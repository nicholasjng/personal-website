import PostType from "./frontMatter";

type PostPageType = {
  post: PostType;
  morePosts: PostType[];
  preview: boolean;
};

export default PostPageType;
