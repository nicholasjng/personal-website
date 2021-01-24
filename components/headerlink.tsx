import Link from "next/link";

type Props = {
  isActive: boolean,
  title: string,
  to: string,
}

const HeaderLink = ({ isActive, title, to }: Props) => (
  <Link href={to}>
    <a
      href={to}
      className="relative hover:text-green-300 flex-row items-center px-6 font-normal ease-out"
    >
      {title}
      {isActive && (
        <span className="absolute -bottom-1.5 h-1 left-0 right-0 bg-green-300" />
      )}
    </a>
  </Link>
);

export default HeaderLink;
