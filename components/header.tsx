import Link from "next/link";
import navHeader from "@/config/headerNav.yml";

type Props = {
  location: string;
};

type LinkProps = {
  isActive: boolean;
  title: string;
  to: string;
  spanColor: number;
};

type LinkItem = {
  title: string;
  to: string;
  activeSelector: string;
  spanColor: number;
};

const nordCssMap = {
  11: ["hover:text-nord-11", "bg-nord-11"],
  12: ["hover:text-nord-12", "bg-nord-12"],
  13: ["hover:text-nord-13", "bg-nord-13"],
  14: ["hover:text-nord-14", "bg-nord-14"],
  15: ["hover:text-nord-15", "bg-nord-15"],
};

const classNames = (...classes) => classes.join(" ");

const HeaderLink = ({ isActive, title, to, spanColor }: LinkProps) => (
  <Link href={to}>
    <a
      href={to}
      className={classNames(
        "relative flex-row items-center px-2 md:px-6 font-normal ease-out",
        nordCssMap[spanColor][0]
      )}
    >
      {title}
      {isActive && (
        <span
          className={classNames(
            "absolute -bottom-1.5 h-1 left-0 right-0",
            nordCssMap[spanColor][1]
          )}
        />
      )}
    </a>
  </Link>
);

const Header = ({ location }: Props) => (
  <header
    className="sticky top-0 z-10 mb-5 bg-white border-b-2 border-black 
  whitespace-nowrap py-4 overflow-x-scroll xl:overflow-x-auto"
  >
    <h1
      className="text-2xl md:text-4xl font-bold tracking-tight 
    md:tracking-tighter inline-block ml-5 md:ml-10 mr-5 md:mr-0"
    >
      <Link href="/">
        <a className="hover:underline">nj.</a>
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

export default Header;
