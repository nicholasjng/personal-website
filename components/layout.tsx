import { ReactNode } from "react";
import { useRouter } from "next/router";

import Header from "./header";
import Footer from "./footer";
import Container from "./container";

type Props = {
  preview?: boolean;
  children: ReactNode;
};

export default function Layout({ preview, children }: Props): JSX.Element {
  const router = useRouter();
  const location = router.pathname;
  return (
    <>
      <Header location={location} />
      <Container>
        <main className="min-h-screen">{children}</main>
      </Container>
      <Footer />
    </>
  );
}
