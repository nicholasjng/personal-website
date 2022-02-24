import { AppProps } from "next/app";

import "@/styles/index.css";
import "katex/dist/katex.css";

import Head from "next/head";
import Header from "@/components/Header";
import { useRouter } from "next/router";
import SectionContainer from "@/components/SectionContainer";
import Footer from "@/components/Footer";

export default function App({ Component, pageProps }: AppProps) {
  const location = useRouter().asPath;
  return (
    <>
      <Head>
        <meta content="width=device-width, initial-scale=1" name="viewport" />
      </Head>
      <SectionContainer>
        <Header location={location} />
        <main className="mb-auto">
          <Component {...pageProps} />
        </main>
        <Footer />
      </SectionContainer>
    </>
  );
}
