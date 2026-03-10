import { Hero } from '../components/sections/Hero';
import { About } from '../components/sections/About';
import { Roster } from '../components/sections/Roster';
import { Matches } from '../components/sections/Matches';
import { Socials } from '../components/sections/Socials';
import { Contact } from '../components/sections/Contact';

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Roster />
      <Matches />
      <Contact />
      <Socials />
    </>
  );
}