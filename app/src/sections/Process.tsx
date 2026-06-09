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
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = cardsRef.current.filter(Boolean);

     cards.forEach((card) => {
        if (!card) return;

        const initRotX = randomRange(-35, 35);
        const initRotY = randomRange(-20, 20);
        const initRotZ = randomRange(-10, 10);

        gsap.fromTo(
          card,
          { 
            opacity: 0, 
            y: 120,
            rotationX: initRotX,
            rotationY: initRotY,
            rotationZ: initRotZ,
            scale: 0.75,
          },
          {
            opacity: 1,
            y: 0,
            rotationX: 0,
            rotationY: 0,
            rotationZ: 0,
            scale: 1,
            duration: 1.4,
            ease: 'back.out(1.2)',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-24 md:py-32"
      style={{ background: '#0E0709' }}
    >
      <div className="max-w-[1200px] mx-auto px-6 md:px-12">
        {/* Section heading */}
        <div className="text-center mb-16 md:mb-24">
          <h2
            className="font-display text-outline leading-none"
            style={{ fontSize: 'clamp(36px, 7vw, 100px)' }}
          >
            OUR PROCESS
          </h2>
        </div>

        {/* Grid */}
        <div 
          className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8"
          style={{ perspective: '1200px' }}
        >
          {steps.map((step, i) => (
            <div
              key={step.num}
              ref={(el) => { cardsRef.current[i] = el; }}
              className="relative transition-colors duration-500 hover:border-[#E879A0]/50 group"
              style={{
                background: 'rgba(20, 8, 13, 0.8)',
                border: '1px solid rgba(232,121,160,0.25)',
                borderRadius: '12px',
                padding: '40px 32px',
                transformStyle: 'preserve-3d',
                // Optional staggered layout for desktop
                marginTop: typeof window !== 'undefined' && window.innerWidth >= 768 && i % 2 !== 0 ? '40px' : '0px',
              }}
            >
              <span className="font-display text-[#E879A0] text-5xl md:text-6xl leading-none block mb-4 transition-transform duration-500 group-hover:-translate-y-2">
                {step.num}
              </span>
              <h3 className="text-white text-xl font-body uppercase tracking-wide mb-3">
                {step.title}
              </h3>
              <p className="text-white/50 text-base font-body leading-relaxed">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
