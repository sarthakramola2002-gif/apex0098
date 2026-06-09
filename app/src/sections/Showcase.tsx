import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Showcase() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(sectionRef.current, {
        opacity: 0,
        y: 60,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 85%',
          once: true,
        },
      });

      // Subtle parallax on the image
      gsap.to(imageRef.current, {
        yPercent: -8,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full overflow-hidden">
      <div className="relative w-full h-[55vh] min-h-[450px]">
        <img
          ref={imageRef}
          src="/images/detailer-at-work.jpg"
          alt="Professional detailer machine polishing a luxury car hood in studio lighting"
          className="absolute inset-0 w-full h-[120%] object-cover"
          style={{
            top: '-10%',
          }}
        />
        {/* Gradient overlays */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to top, #0E0709 0%, rgba(14,7,9,0.4) 30%, rgba(14,7,9,0.1) 50%, rgba(14,7,9,0.4) 70%, #0E0709 100%)',
          }}
        />
        {/* Subtle pink tint overlay */}
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse at 50% 50%, rgba(232,121,160,0.06) 0%, transparent 70%)',
          }}
        />

        {/* Caption */}
        <div className="absolute bottom-8 left-0 right-0 z-10 text-center">
          <p className="font-display text-white/80 text-lg tracking-wide">
            PRECISION IN EVERY PASS
          </p>
          <p className="text-white/40 text-[11px] uppercase tracking-[0.2em] font-body mt-1">
            Where craft meets obsession
          </p>
        </div>
      </div>
    </section>
  );
}
