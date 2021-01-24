import Head from "next/head";
import Container from "../../components/container";
import Intro from "../../components/intro";
import Layout from "../../components/layout";
import SocialCard from "../../components/social-card";

type Props = {
  preview: boolean,
}

export default function AboutIndex({ preview }: Props) {
  return (
    <Layout>
      <Head>
        <title>About me</title>
      </Head>
      <Container>
        <Intro>About me.</Intro>
        <SocialCard />
      </Container>
    </Layout>
  );
}
