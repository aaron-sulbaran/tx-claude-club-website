import Header from "./components/Header";
import Hero from "./components/Hero";
import Form from "./components/Form";
import Gallery from "./components/Gallery";
import Outreach from "./components/Outreach";
import Footer from "./components/Footer";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Form />
        <Gallery />
        <Outreach />
        <section className="w-full">
          <Image
            src="/images/UT%20CBC%20Logos/KeepThinking_CBCLogo_Panoramic.png"
            alt="Keep thinking. Claude Builder Club"
            width={1500}
            height={375}
            className="w-full h-auto"
          />
        </section>
      </main>
      <Footer />
    </>
  );
}
