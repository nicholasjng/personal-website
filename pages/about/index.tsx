import Head from "next/head";
import Container from "../../components/container";
import Intro from "../../components/intro";
import Layout from "../../components/layout";
import Image from "next/image";

type Props = {
  preview: boolean;
};

export default function AboutIndex({ preview }: Props) {
  return (
    <Layout>
      <Head>
        <title>About me</title>
      </Head>
      <Container>
        <Intro>About me.</Intro>
        <figure className="bg-gray-100 rounded-xl p-8 mb-4">
          <h1 className="text-5xl mx-auto font-bold text-center mb-4">
            Nicholas Junge
          </h1>
          <div className="w-48 h-48 mx-auto">
            <Image
              src="/assets/about/me.jpg"
              alt="Image of me"
              width={250}
              height={250}
              className="rounded-full"
            />
          </div>
          <section className="pt-6 text-center space-y-4">
            <blockquote>
              <p className="text-lg font-semibold">
                Tackling new challenges everyday, one step at a time.
              </p>
            </blockquote>
          </section>
          <p className="mt-4">
            Hello there! I&apos;m Nicholas, a mathematician / software engineer
            based in Munich, and I made this website in a private web
            development project. I use it as my personal creative outlet and as
            a place to write about things and topics that I am passionate about.
          </p>
          <p className="mt-4">
            Right after school I studied physics, then shifted towards
            mathematics for the graduate level, and ended up doing many courses
            and ultimately my thesis at the informatics faculty. So I had a nice
            mix of everything in STEM :-)
          </p>
          <p className="mt-4">
            I think my best quality is that I love to learn about new things. So
            naturally, my interests also change from time to time. A few main
            themes have stayed with me over the years, though:
            <br />I absolutely love
            <b> photography</b> - it is relaxing to me and generally provides me
            a nice timeout from my usual life. My favorite camera is the Leica
            M, a beautiful rangefinder that could serve as the dictionary
            definition of &quot;addition by subtraction&quot;.
            <br />
            My second big thing are <b>languages</b>. I found for myself that
            approaching someone on their &quot;home field&quot; by talking in
            their own language is a small thing that can make a world of
            difference on people. My ultimate goal always is to be able to fool
            any native speaker - so far, I have been able to pass myself off as
            a native in English and all the Scandinavian languages. Right now I
            try to get better at Spanish and Portuguese.
          </p>
          <p className="mt-4">
            If you haven&apos;t already, feel free to check out some of my
            posts, and if you liked them, or if you have any feedback for me,
            feel free to get in touch over the various social channels linked
            below. Have a great day!
          </p>
        </figure>
      </Container>
    </Layout>
  );
}
