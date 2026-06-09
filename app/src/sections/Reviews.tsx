import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function StarRating({ fill = 100 }: { fill?: number }) {
  const stars = [];
  for (let i = 0; i < 5; i++) {
    const starFill = Math.min(100, Math.max(0, fill - i * 100));
    stars.push(
      <svg
        key={i}
        className="w-4 h-4"
        viewBox="0 0 16 16"
        fill="none"
      >
        <defs>
          <linearGradient id={`starGrad-${i}`}>
            <stop offset={`${starFill}%`} stopColor="#E879A0" />
            <stop offset={`${starFill}%`} stopColor="rgba(255,255,255,0.15)" />
          </linearGradient>
        </defs>
        <path
          d="M8 0.5L9.96 6.02H15.5L11.02 9.48L12.98 15L8 11.54L3.02 15L4.98 9.48L0.5 6.02H6.04L8 0.5Z"
          fill={`url(#starGrad-${i})`}
        />
      </svg>
    );
  }
  return <div className="flex gap-1">{stars}</div>;
}

const reviews = [
  {
    stars: 5,
    text: 'The ceramic coating on my GT3 RS is beyond anything I expected. Mirror-perfect finish, water sheets off like nothing else. Worth every dollar — I\'ve already booked my second visit.',
    name: 'James K.',
    vehicle: '2022 Porsche 911 GT3 RS',
    initials: 'JK',
  },
  {
    stars: 5,
    text: 'Two-stage paint correction on a badly swirled black M5. I almost cried when they showed me the before and after under the inspection light. The paint looks factory-new. Actually better.',
    name: 'Sarah M.',
    vehicle: '2020 BMW M5 Competition',
    initials: 'SM',
  },
  {
    stars: 5,
    text: 'Full interior restoration on a 4-year-old Range Rover that had seen better days. Leather looked brand new, carpet spotless, glass crystal clear. The overnight ceramic package was worth every second of the wait.',
    name: 'Daniel R.',
    vehicle: '2019 Range Rover Autobiography',
    initials: 'DR',
  },
];

const tickerItems = [
  '290+ cars detailed',
  '98% five-star ratings',
  'Porsche specialists',
  'Ferrari approved',
  'Lamborghini certified applicator',
  '5-year ceramic warranty',
  'Mobile service — we come to you',
  'Same-day bookings available',
  'Award-winning studio',
];

const badges = [
  { platform: 'Google Reviews', rating: '4.9', count: '187 reviews' },
  { platform: 'Facebook', rating: '5.0', count: '94 reviews' },
  { platform: 'Trustpilot', rating: '4.8', count: '63 reviews' },
];

export default function Reviews() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const headingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading reveal
      gsap.from(headingRef.current, {
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: headingRef.current,
          start: 'top 85%',
          once: true,
        },
      });

      // Cards entrance from alternating sides
      const directions = [
        { x: -40, y: 0 },
        { x: 0, y: 40 },
        { x: 40, y: 0 },
      ];

      cardsRef.current.forEach((card, i) => {
        if (!card) return;
        const dir = directions[i];
        gsap.from(card, {
          opacity: 0,
          x: dir.x,
          y: dir.y,
          duration: 0.7,
          delay: i * 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            once: true,
          },
        });

        // Star fill animation
        const stars = card.querySelectorAll('.star-rating svg');
        stars.forEach((star, si) => {
          gsap.from(star, {
            opacity: 0,
            scale: 0.5,
            duration: 0.3,
            delay: 0.3 + i * 0.15 + si * 0.06,
            ease: 'back.out(1.7)',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              once: true,
            },
          });
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="reviews"
      ref={sectionRef}
      className="relative w-full py-[120px] md:py-[160px] overflow-hidden"
      style={{ background: '#0E0709' }}
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        {/* Section heading */}
        <div ref={headingRef} className="relative mb-4">
          {/* Decorative quotation mark */}
          <span
            className="absolute -top-16 left-0 font-display text-[#E879A0] select-none pointer-events-none"
            style={{ fontSize: 'clamp(120px, 20vw, 300px)', opacity: 0.08 }}
          >
            &ldquo;
          </span>
          <h2
            className="font-display text-outline leading-none relative z-10"
            style={{ fontSize: 'clamp(48px, 10vw, 140px)' }}
          >
            WHAT CLIENTS SAY
          </h2>
        </div>

        {/* Sub-heading */}
        <p className="text-center text-white/50 text-[11px] uppercase tracking-[0.2em] font-body mb-16">
          290+ cars detailed. 98% of clients return.
        </p>

        {/* Review grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {reviews.map((review, i) => (
            <div
              key={i}
              ref={(el) => { cardsRef.current[i] = el; }}
              className="transition-all duration-300 hover:-translate-y-1 group"
              style={{
                background: 'rgba(20, 8, 13, 0.6)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '12px',
                padding: '28px',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = 'rgba(232,121,160,0.4)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.08)';
              }}
            >
              {/* Stars */}
              <div className="star-rating mb-4">
                <StarRating fill={review.stars * 100} />
              </div>

              {/* Quote */}
              <p className="font-serif italic text-white/80 text-[15px] leading-[1.75] mb-6">
                &ldquo;{review.text}&rdquo;
              </p>

              {/* Reviewer */}
              <div className="flex items-center gap-3">
                {/* Initials avatar */}
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center text-[13px] font-semibold"
                  style={{ background: '#E879A0', color: '#0E0709' }}
                >
                  {review.initials}
                </div>
                <div>
                  <p className="font-display text-white text-[13px] tracking-wide">
                    {review.name}
                  </p>
                  <p className="text-white/40 text-[11px] font-body">
                    {review.vehicle}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Testimonial ticker */}
        <div className="overflow-hidden mb-12 py-4 border-y border-white/5">
          <div className="ticker-track flex whitespace-nowrap">
            {[...tickerItems, ...tickerItems].map((item, i) => (
              <span key={i} className="flex items-center">
                <span className="font-display text-white/60 text-sm tracking-[0.05em] px-2">
                  {item}
                </span>
                <span className="text-[#E879A0] text-xs mx-3">&#9670;</span>
              </span>
            ))}
          </div>
        </div>

        {/* Platform badges */}
        <div className="flex justify-center gap-4 flex-wrap">
          {badges.map((badge) => (
            <div
              key={badge.platform}
              className="flex items-center gap-3 border border-white/10 rounded-lg px-5 py-3"
              style={{ background: 'rgba(20, 8, 13, 0.5)' }}
            >
              {/* Platform icon */}
              <svg
                className="w-5 h-5 text-white/50"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                />
              </svg>
              <div>
                <p className="text-white/50 text-[11px] font-body">{badge.platform}</p>
                <p className="text-white text-sm font-body">
                  <span className="text-[#E879A0]">&#9733;</span> {badge.rating} / 5
                  <span className="text-white/40 text-xs ml-2">({badge.count})</span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
