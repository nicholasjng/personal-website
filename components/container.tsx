import { ReactNode, FunctionComponent } from "react";

type Props = {
  children?: ReactNode
};

const Container: FunctionComponent = ({ children } : Props) => (
  <div className="container mx-auto px-20">{children}</div>
);

export default Container;
