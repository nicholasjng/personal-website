type Props = {
  children: string;
};

const PostTitle = ({ children }: Props) => (
  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter leading-tight md:leading-none mb-12 text-center md:text-left">
    {children}
  </h1>
);

export default PostTitle;
