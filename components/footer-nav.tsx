import { ReactNode } from "react";

type Props = {
  children: ReactNode
}

const FooterNav = ({ children }: Props) => (
  <div className="flex flex-col items-start w-1/2 pt-40 xl:pt-0 xl:w-1/4">
    <div className="inline-flex flex-col">
      {children}
    </div>
  </div>
);

export default FooterNav;
