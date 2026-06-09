import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface PricingTier {
  label: string;
  price: number;
  isPopular?: boolean;
  features: string[];
  duration: string;
  cta: string;
  ctaStyle: 'outlined-white' | 'filled-pink' | 'outlined-pink';
}

const tiers: PricingTier[] = [
  {
    label: 'ESSENTIAL',
    price: 149,
    features: [
      'Exterior hand wash & dry',
      'Wheel & tire clean + dress',
      'Door jamb wipe-down',
      'Interior vacuum & wipe',
      'Window clean (interior + exterior)',
      'Air freshener finish',
    ],
    duration: '~2 hours',
    cta: 'Book Essential',
    ctaStyle: 'outlined-white',
  },
  {
    label: 'SIGNATURE',
    price: 349,
    isPopular: true,
    features: [
      'Everything in Essential',
      'Single-stage machine polish',
      'Clay bar decontamination',
      'Leather conditioning & protectant',
      'Engine bay light clean',
      'Ceramic spray sealant (3-month)',
      'Paint inspection report',
    ],
    duration: '~5 hours',
    cta: 'Book Signature',
    ctaStyle: 'filled-pink',
  },
  {
    label: 'CERAMIC ELITE',
    price: 899,
    features: [
      'Everything in Signature',
      'Full two-stage paint correction',
      '9H ceramic coating (2–3 year)',
      'Full interior detail & steam clean',
      'Paint protection film (partial)',
      'Ceramic coating warranty certificate',
      'Post-detail inspection & walkthrough',
    ],
    duration: '1–2 days',
    cta: 'Book Elite',
    ctaStyle: 'outlined-pink',
  },
];

const addOns = [
  { name: 'Paint Protection Film (full hood)', price: '+$250' },
  { name: 'Headlight Restoration', price: '+$80' },
  { name: 'Odor Elimination Treatment', price: '+$60' },
  { name: 'Scratch & Swirl Spot Repair', price: '+$120' },
];

function OdometerPrice({ value, isLarge }: { value: number; isLarge?: boolean }) {
  const [displayValue, setDisplayValue] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const trigger = ScrollTrigger.create({
      trigger: el,
      start: 'top 85%',
      once: true,
      onEnter: () => {
        if (hasAnimated.current) return;
        hasAnimated.current = true;
        const obj = { val: 0 };
        gsap.to(obj, {
          val: value,
          duration: 1.4,
          ease: 'power2.out',
          onUpdate: () => setDisplayValue(Math.round(obj.val)),
        });
      },
    });

    return () => trigger.kill();
  }, [value]);

  return (
    <span ref={ref} className={`font-display text-white ${isLarge ? 'text-6xl md:text-7xl' : 'text-5xl md:text-6xl'}`}>
      ${displayValue}
    </span>
  );
}

export default function Pricing() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const headingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading reveal
      gsap.from(headingRef.current, {
        opacity: 0,
        x: -60,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: headingRef.current,
          start: 'top 85%',
          once: true,
        },
      });

      // Cards stagger reveal
      const cards = cardsRef.current.filter(Boolean);
      cards.forEach((card, i) => {
        if (!card) return;
        gsap.from(card, {
          opacity: 0,
          y: 48,
          duration: 0.8,
          delay: i * 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            once: true,
          },
        });
      });

      // Center card glow pulse
      const centerCard = cards[1];
      if (centerCard) {
        gsap.fromTo(
          centerCard,
          { boxShadow: '0 0 0 rgba(232,121,160,0)' },
          {
            boxShadow: '0 0 30px rgba(232,121,160,0.3)',
            duration: 1,
            delay: 0.5,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: centerCard,
              start: 'top 85%',
              once: true,
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const getCtaClass = (style: string) => {
    switch (style) {
      case 'filled-pink':
        return 'pill-btn-filled w-full';
      case 'outlined-pink':
        return 'pill-btn-pink w-full';
      default:
        return 'pill-btn-white w-full';
    }
  };

  return (
    <section
      id="pricing"
      ref={sectionRef}
      className="relative w-full py-[120px] md:py-[160px]"
      style={{ background: '#0E0709' }}
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        {/* Section heading */}
        <div ref={headingRef} className="mb-16">
          <h2
            className="font-display text-outline leading-none"
            style={{ fontSize: 'clamp(48px, 10vw, 140px)' }}
          >
            SERVICES & PRICING
          </h2>
          <div
            className="h-px mt-4"
            style={{
              background: 'linear-gradient(to right, rgba(232,121,160,0.4) 0%, rgba(232,121,160,0) 100%)',
            }}
          />
        </div>

        {/* Pricing cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          {tiers.map((tier, i) => (
            <div
              key={tier.label}
              ref={(el) => { cardsRef.current[i] = el; }}
              className="relative transition-all duration-300 hover:-translate-y-1.5"
              style={{
                background: tier.isPopular
                  ? 'rgba(30, 10, 18, 0.85)'
                  : 'rgba(20, 8, 13, 0.75)',
                border: `1px solid ${tier.isPopular ? 'rgba(232,121,160,0.5)' : 'rgba(232,121,160,0.2)'}`,
                backdropFilter: 'blur(24px)',
                WebkitBackdropFilter: 'blur(24px)',
                borderRadius: '16px',
                padding: '40px 32px',
                transform: tier.isPopular ? 'translateY(-12px)' : 'none',
              }}
            >
              {/* Most Popular badge */}
              {tier.isPopular && (
                <div
                  className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-[10px] font-semibold uppercase tracking-[0.15em] whitespace-nowrap"
                  style={{
                    background: '#E879A0',
                    color: '#0E0709',
                  }}
                >
                  MOST POPULAR
                </div>
              )}

              {/* Label */}
              <span
                className="text-[11px] uppercase tracking-[0.2em] font-body"
                style={{ color: tier.isPopular ? '#E879A0' : 'rgba(255,255,255,0.5)' }}
              >
                {tier.label}
              </span>

              {/* Price */}
              <div className="mt-4 mb-6">
                <OdometerPrice value={tier.price} isLarge={tier.isPopular} />
                <span className="text-white/40 text-xs ml-2">/ starting from</span>
              </div>

              {/* Divider */}
              <div className="h-px w-full bg-[#E879A0]/20 mb-6" />

              {/* Features */}
              <ul className="space-y-3 mb-8">
                {tier.features.map((feature, fi) => (
                  <li key={fi} className="flex items-start gap-3">
                    <svg
                      className="w-4 h-4 mt-0.5 flex-shrink-0"
                      fill="none"
                      viewBox="0 0 16 16"
                    >
                      <path
                        d="M3 8L6.5 11.5L13 4.5"
                        stroke="#E879A0"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <span className="text-white/70 text-[14px] font-body leading-relaxed">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              {/* Duration */}
              <p className="text-white/40 text-xs mb-6 font-body tracking-wide">
                Duration: {tier.duration}
              </p>

              {/* CTA */}
              <button className={getCtaClass(tier.ctaStyle)}>
                {tier.cta}
              </button>
            </div>
          ))}
        </div>

        {/* Fine print */}
        <p className="text-center text-white/40 text-[11px] mt-10 max-w-2xl mx-auto leading-relaxed font-body">
          All prices are starting rates. Final pricing depends on vehicle size,
          condition, and selected add-ons. SUVs and large vehicles attract a
          surcharge. Contact us for a custom quote.
        </p>

        {/* Add-on strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10">
          {addOns.map((addon) => (
            <div
              key={addon.name}
              className="border border-white/10 rounded-lg px-5 py-4 transition-all duration-300 hover:border-[#E879A0]/30"
              style={{ background: 'rgba(20, 8, 13, 0.5)' }}
            >
              <p className="text-white/70 text-[13px] font-body leading-snug">
                {addon.name}
              </p>
              <p className="text-[#E879A0] text-sm font-display mt-1">
                {addon.price}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
