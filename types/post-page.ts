import PostType from "./post";

type PostPageType = {
  post: PostType
  morePosts: PostType[]
  preview: boolean
}

export default PostPageType;
