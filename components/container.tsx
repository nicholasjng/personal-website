import { ReactNode, FunctionComponent } from "react";

type Props = {
  children?: ReactNode
};

const Container: FunctionComponent = ({ children } : Props) => (
  <div className="container mx-auto sm:px-6 md:px-20">{children}</div>
);

export default Container;
