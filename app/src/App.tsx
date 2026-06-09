import { useLenis } from './hooks/useLenis';
import Hero from './sections/Hero';
import Showcase from './sections/Showcase';
import TunnelDivider from './sections/TunnelDivider';
import Pricing from './sections/Pricing';
import Reviews from './sections/Reviews';
import BeforeAfter from './sections/BeforeAfter';
import Process from './sections/Process';
import Booking from './sections/Booking';
import Footer from './sections/Footer';

export default function App() {
  useLenis();

  return (
    <div className="relative min-h-screen bg-[#0E0709] text-[#FAFAFA] overflow-x-hidden">
      <Hero />
      <Showcase />
      <TunnelDivider />
      <Pricing />
      <Reviews />
      <BeforeAfter />
      <Process />
      <Booking />
      <Footer />
    </div>
  );
}
