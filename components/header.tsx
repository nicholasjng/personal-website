import Link from "next/link";
import HeaderLink from "./headerlink";
import navHeader from "../config/headerNav.yml";

type Props = {
  location: string
}

type LinkItem = {
  title: string
  to: string
  activeSelector: string
  spanColor: number
}

export default function Header({ location }: Props) {
  return (
    <header className="sticky top-0 z-10 mb-5 bg-white border-b-2 border-black whitespace-nowrap py-4 overflow-x-scroll xl:overflow-x-auto">
      <h1 className="text-2xl md:text-4xl font-bold tracking-tight md:tracking-tighter inline-block ml-5 md:ml-10 mr-5 md:mr-0">
        <Link href="/">
          <a href="/" className="hover:underline">
            nj.
          </a>
        </Link>
      </h1>
      <nav className="inline-block absolute bottom-1 sm:right-1 md:right-12">
        {navHeader.items.map((link: LinkItem) => (
          <HeaderLink
            key={link.title}
            isActive={location.includes(link.activeSelector)}
            title={link.title}
            to={link.to}
            spanColor={link.spanColor}
          />
        ))}
      </nav>
    </header>
  );
}
