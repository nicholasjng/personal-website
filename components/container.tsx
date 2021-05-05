import { ReactNode, FunctionComponent } from "react";

type Props = {
  children?: ReactNode;
};

const Container: FunctionComponent = ({ children }: Props) => (
  <div className="container mx-auto px-1 md:px-10">{children}</div>
);

export default Container;
