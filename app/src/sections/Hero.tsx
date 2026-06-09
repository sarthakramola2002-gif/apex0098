import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const curtainRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const carRef = useRef<HTMLImageElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Curtain reveal
      gsap.to(curtainRef.current, {
        clipPath: 'inset(0 0 0 100%)',
        duration: 1.2,
        ease: 'power3.inOut',
      });

      // Text fade in after curtain
      gsap.to(textRef.current, {
        opacity: 1,
        duration: 0.8,
        delay: 1.0,
        ease: 'power2.out',
      });

      // Car fade in
      gsap.to(carRef.current, {
        opacity: 1,
        y: 0,
        duration: 1.0,
        delay: 1.2,
        ease: 'power3.out',
      });

      // Nav fade in
      gsap.to(navRef.current, {
        opacity: 1,
        duration: 0.6,
        delay: 1.5,
        ease: 'power2.out',
      });

      // Stats fade in
      gsap.to(statsRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay: 1.6,
        ease: 'power2.out',
      });

      // CTA fade in
      gsap.to(ctaRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay: 1.8,
        ease: 'power2.out',
      });

      // Parallax: text moves slower than scroll
      gsap.to(textRef.current, {
        yPercent: -30,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });

      // Car parallax - slightly different speed for depth
      gsap.to(carRef.current, {
        yPercent: -15,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative w-full min-h-[100dvh] overflow-hidden"
      style={{
        background: 'radial-gradient(ellipse at 50% 50%, #1A0810 0%, #0E0709 70%)',
      }}
    >
      {/* Curtain overlay */}
      <div
        ref={curtainRef}
        className="absolute inset-0 z-[100] bg-[#0E0709]"
        style={{ clipPath: 'inset(0 0 0 0%)' }}
      />

      {/* Navigation */}
      <nav
        ref={navRef}
        className="fixed top-0 left-0 right-0 z-50 flex flex-col items-center pt-6 pb-4 opacity-0"
        style={{ background: 'linear-gradient(to bottom, rgba(14,7,9,0.9) 0%, rgba(14,7,9,0) 100%)' }}
      >
        <span className="font-display text-[#E879A0] text-[13px] tracking-[0.25em] mb-2">
          APEX DETAIL STUDIO
        </span>
        <div className="flex gap-8">
          {['Services', 'Pricing', 'Reviews', 'Contact'].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-white/70 text-[11px] uppercase tracking-[0.2em] hover:text-[#E879A0] transition-colors duration-300 font-body"
            >
              {item}
            </a>
          ))}
        </div>
      </nav>

      {/* Typography Plane - z-index 1 */}
      <div
        ref={textRef}
        className="absolute inset-0 z-[1] flex items-center justify-center opacity-0 pointer-events-none select-none"
        style={{ top: '-5vh' }}
      >
        <h1
          className="font-display text-outline whitespace-nowrap leading-none"
          style={{
            fontSize: 'clamp(80px, 18vw, 280px)',
            letterSpacing: '0.02em',
          }}
        >
          APEX DETAIL
        </h1>
      </div>

      {/* Car Plane - z-index 2 */}
      <div className="absolute inset-0 z-[2] flex items-center justify-center pointer-events-none overflow-hidden">
        <img
          ref={carRef}
          src="/images/hero-car.jpg"
          alt="Porsche 911 GT3 RS in rose-pink studio lighting"
          className="min-w-[105vw] min-h-[125vh] object-cover object-center opacity-0 translate-y-8"
          style={{
            filter: 'drop-shadow(0 20px 60px rgba(0,0,0,0.5))',
          }}
        />
      </div>

      {/* Content overlay - z-index 10 */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-end pb-10 pointer-events-none">
        {/* Stats Strip */}
        <div
          ref={statsRef}
          className="flex items-center gap-6 mb-6 opacity-0 translate-y-4"
        >
          <span className="text-white/50 text-[13px] font-body tracking-wide">290+ Cars Detailed</span>
          <span className="w-px h-4 bg-white/20" />
          <span className="text-white/50 text-[13px] font-body tracking-wide">8 Years Experience</span>
          <span className="w-px h-4 bg-white/20" />
          <span className="text-white/50 text-[13px] font-body tracking-wide">98% 5-Star Reviews</span>
        </div>

        {/* CTAs */}
        <div
          ref={ctaRef}
          className="flex gap-4 opacity-0 translate-y-4 pointer-events-auto"
        >
          <a href="#pricing" className="pill-btn-white">View Pricing</a>
          <a href="#booking" className="pill-btn-white">Book a Detail</a>
          <a href="#reviews" className="pill-btn-white">See Reviews</a>
        </div>
      </div>
    </section>
  );
}
