type Props = {
  children: string
}

const MetaTitle = ({children}: Props) => (
  <h1 className="font-bold text-lg leading-10 align-text-top uppercase tracking-wider text-gray-500">
    {children}
  </h1>
);

export default MetaTitle;
