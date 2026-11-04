import Intro from "@/components/Intro";
import Effects from "@/components/Effects";
import Nav from "@/components/Nav";
import PosterWall from "@/components/PosterWall";
import Flat from "@/components/Flat";
import Growth from "@/components/Growth";
import {
  Agent, Bloopers, BoxOffice, Classifieds, Cover, Credits, Critics, FactFile, Feature, PressQuotes, Intertitle, Origin, Platform, Programme, Ticket,
} from "@/components/Sections";

export default function Home() {
  return (
    <>
      <a className="skiplink" href="#short">Skip to the issue</a>
      <Intro />
      <Nav />
      <main id="issue">
        <Cover />
        <FactFile />
        <PressQuotes />
        <Programme />
        <Origin />
        <Feature />
        <PosterWall />
        <Platform />
        <Agent />
        <BoxOffice />
        <Growth />
        <Flat />
        <Intertitle text="Errors you can page on. Silent success you find out about from a user." />
        <Bloopers />
        <Critics />
        <Classifieds />
        <Credits />
      </main>
      <Ticket />
      <Effects />
    </>
  );
}
