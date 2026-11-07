import Header from "./components/Header";
import Hero from "./components/Hero";
import Form from "./components/Form";
import Gallery from "./components/Gallery";
import Outreach from "./components/Outreach";
import Footer from "./components/Footer";
import Image from "next/image";
import QuietHome from "./components/lab/QuietHome";
import PosterHome from "./components/lab/PosterHome";
import { DESIGN_LAB } from "./lib/design-lab";

function BaselineHome() {
  return (
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
  );
}

export default function Home() {
  return (
    <>
      <Header />
      {DESIGN_LAB ? (
        <>
          <div data-for="baseline">
            <BaselineHome />
          </div>
          <div data-for="quiet">
            <QuietHome />
          </div>
          <div data-for="poster">
            <PosterHome />
          </div>
        </>
      ) : (
        <BaselineHome />
      )}
      <Footer />
    </>
  );
}
