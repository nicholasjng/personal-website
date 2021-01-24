type Props = {
  children: string
}

const MetaTitle = ({children}: Props) => (
  <div className="font-bold text-lg leading-10 align-text-top uppercase tracking-wider text-gray-500">
    {children}
  </div>
);

export default MetaTitle;
