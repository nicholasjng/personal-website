type Props = {
  children: string;
};

const PostTitle = ({ children }: Props): JSX.Element => (
  <h1 className="pt-20 text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter leading-tight md:leading-none mb-12 text-left md:text-center">
    {children}
  </h1>
);

export default PostTitle;
