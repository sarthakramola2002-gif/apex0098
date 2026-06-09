import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    num: '01',
    title: 'INSPECT',
    desc: 'Full paint assessment under LED and UV light',
    col: 1,
    row: 1,
  },
  {
    num: '02',
    title: 'PREP',
    desc: 'Deep clean, decontamination, masking',
    col: 3,
    row: 2,
  },
  {
    num: '03',
    title: 'CORRECT',
    desc: 'Machine polish to remove defects',
    col: 2,
    row: 4,
  },
  {
    num: '04',
    title: 'PROTECT',
    desc: 'Ceramic coating or PPF application',
    col: 1,
    row: 5,
  },
  {
    num: '05',
    title: 'DELIVER',
    desc: 'Final inspection with owner walkthrough',
    col: 3,
    row: 7,
  },
];

function randomRange(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

export default function Process() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = cardsRef.current.filter(Boolean);

      cards.forEach((card, i) => {
        if (!card) return;

        // Random initial 3D orientation
        const initRotX = randomRange(-45, 45);
        const initRotY = randomRange(-30, 30);
        const initRotZ = randomRange(-10, 10);

        gsap.set(card, {
          rotationX: initRotX,
          rotationY: initRotY,
          rotationZ: initRotZ,
          scale: 0.7,
          filter: 'brightness(0%)',
        });

        // Animate to settled state
        gsap.to(card, {
          rotationX: 0,
          rotationY: 0,
          rotationZ: 0,
          scale: 1,
          filter: 'brightness(100%)',
          ease: 'power1.inOut',
          scrollTrigger: {
            trigger: card,
            start: 'top bottom',
            end: 'center center',
            scrub: true,
          },
        });

        // Exit wobble
        gsap.to(card, {
          rotationZ: i % 2 === 0 ? 3 : -3,
          scrollTrigger: {
            trigger: card,
            start: 'center center',
            end: 'bottom top',
            scrub: true,
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full"
      style={{ height: '300vh', background: '#0E0709' }}
    >
      {/* Sticky grid container */}
      <div
        ref={gridRef}
        className="sticky top-0 w-full overflow-hidden"
        style={{
          height: '100vh',
          perspective: '1000px',
        }}
      >
        {/* Top fade overlay */}
        <div
          className="absolute top-0 left-0 right-0 z-10 pointer-events-none"
          style={{
            height: '12vh',
            background: 'linear-gradient(to bottom, #0E0709, transparent)',
          }}
        />

        {/* Bottom fade overlay */}
        <div
          className="absolute bottom-0 left-0 right-0 z-10 pointer-events-none"
          style={{
            height: '12vh',
            background: 'linear-gradient(to top, #0E0709, transparent)',
          }}
        />

        {/* Section heading */}
        <div className="absolute top-8 left-0 right-0 z-20 text-center">
          <h2
            className="font-display text-outline leading-none"
            style={{ fontSize: 'clamp(36px, 7vw, 100px)' }}
          >
            OUR PROCESS
          </h2>
        </div>

        {/* Grid */}
        <div
          className="w-full h-full grid gap-6 p-8 pt-28"
          style={{
            gridTemplateColumns: 'repeat(3, 1fr)',
            gridTemplateRows: 'repeat(8, 1fr)',
            transformStyle: 'preserve-3d',
          }}
        >
          {steps.map((step, i) => (
            <div
              key={step.num}
              ref={(el) => { cardsRef.current[i] = el; }}
              className="relative transition-all duration-300 hover:border-[#E879A0]/50 group"
              style={{
                gridColumn: step.col,
                gridRow: step.row,
                background: 'rgba(20, 8, 13, 0.8)',
                border: '1px solid rgba(232,121,160,0.25)',
                borderRadius: '12px',
                padding: '32px',
                transformStyle: 'preserve-3d',
              }}
            >
              <span className="font-display text-[#E879A0] text-5xl leading-none block mb-3">
                {step.num}
              </span>
              <h3 className="text-white text-lg font-body uppercase tracking-wide mb-2">
                {step.title}
              </h3>
              <p className="text-white/50 text-sm font-body leading-relaxed">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
