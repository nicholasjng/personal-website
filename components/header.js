import Link from "next/link";
import HeaderLink from "./headerlink";
import navHeader from "../config/headerNav.yml";

export default function Header({ location }) {
  return (
    <header className="sticky top-0 z-10 mb-5 bg-white border-b-2 border-black whitespace-nowrap py-4">
      <h1 className="text-2xl md:text-4xl font-bold tracking-tight md:tracking-tighter inline-block ml-10">
        <Link href="/">
          <a href="/" className="hover:underline">
            nj.
          </a>
        </Link>
      </h1>
      <nav className="inline-block absolute bottom-1 right-12">
        {navHeader.items.map((link) => (
          <HeaderLink
            key={link.title}
            isActive={location.includes(link.activeSelector)}
            title={link.title}
            to={link.to}
          />
        ))}
      </nav>
    </header>
  );
}
