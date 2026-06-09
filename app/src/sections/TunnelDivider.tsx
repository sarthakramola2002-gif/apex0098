import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function TunnelDivider() {
  const containerRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax scroll animation for the image
      gsap.fromTo(
        bgRef.current,
        { yPercent: -15, scale: 1.0 },
        {
          yPercent: 15,
          scale: 1.1,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[60vh] md:h-[80vh] overflow-hidden bg-[#0E0709]"
    >
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <img
          ref={bgRef}
          src="/images/detailer-at-work.jpg"
          alt="Car detailing precision work"
          className="w-full h-full object-cover opacity-80"
          style={{ minHeight: '130%' }}
        />
        
        {/* Subtle gradient overlays for blending */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0E0709] via-transparent to-[#0E0709] opacity-90" />
      </div>

      {/* Bottom hairline rule */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px bg-[#E879A0]"
        style={{ opacity: 0.3 }}
      />
    </div>
  );
}
