import { Hero } from '../components/sections/Hero';
import { About } from '../components/sections/About';
import { Roster } from '../components/sections/Roster';
import { Matches } from '../components/sections/Matches';
import { Socials } from '../components/sections/Socials';

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Roster />
      <Matches />
      <Socials />
    </>
  );
}