import { useEffect, useRef, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function BeforeAfter() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const handleRef = useRef<HTMLDivElement>(null);
  const beforeImgRef = useRef<HTMLImageElement>(null);
  const afterContainerRef = useRef<HTMLDivElement>(null);
  const positionRef = useRef(0.5);
  const isDraggingRef = useRef(false);
  const rafRef = useRef<number | undefined>(undefined);

  const updateSlider = useCallback((clientX: number) => {
    const track = trackRef.current;
    if (!track) return;

    const rect = track.getBoundingClientRect();
    const pos = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    positionRef.current = pos;

    // Update visual elements directly via DOM (NOT React state)
    if (afterContainerRef.current) {
      afterContainerRef.current.style.clipPath = `inset(0 ${100 - pos * 100}% 0 0)`;
    }
    if (handleRef.current) {
      handleRef.current.style.left = `${pos * 100}%`;
    }

    // Remove dynamic filter update to keep before image dull
  }, []);

  useEffect(() => {
    // Entrance animation: handle slides from left to center
    const ctx = gsap.context(() => {
      gsap.from(handleRef.current, {
        left: '0%',
        duration: 1.2,
        ease: 'elastic.out(1, 0.5)',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          once: true,
        },
        onComplete: () => {
          // Ensure we're at 50% after animation
          if (handleRef.current) handleRef.current.style.left = '50%';
          if (afterContainerRef.current) {
            afterContainerRef.current.style.clipPath = 'inset(0 50% 0 0)';
          }
          positionRef.current = 0.5;
        },
      });
    }, sectionRef);

    // Mouse/touch event handlers
    const handleMouseDown = (e: MouseEvent) => {
      isDraggingRef.current = true;
      updateSlider(e.clientX);
    };

    const handleTouchStart = (e: TouchEvent) => {
      isDraggingRef.current = true;
      updateSlider(e.touches[0].clientX);
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDraggingRef.current) return;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => updateSlider(e.clientX));
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isDraggingRef.current) return;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => updateSlider(e.touches[0].clientX));
    };

    const handleEnd = () => {
      isDraggingRef.current = false;
    };

    const track = trackRef.current;
    if (track) {
      track.addEventListener('mousedown', handleMouseDown);
      track.addEventListener('touchstart', handleTouchStart, { passive: true });
    }
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('mouseup', handleEnd);
    window.addEventListener('touchend', handleEnd);

    return () => {
      ctx.revert();
      if (track) {
        track.removeEventListener('mousedown', handleMouseDown);
        track.removeEventListener('touchstart', handleTouchStart);
      }
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('mouseup', handleEnd);
      window.removeEventListener('touchend', handleEnd);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [updateSlider]);

  return (
    <section ref={sectionRef} className="relative w-full py-[80px]" style={{ background: '#0E0709' }}>
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        {/* Section label */}
        <div className="text-center mb-10">
          <h2
            className="font-display text-outline leading-none mb-4"
            style={{ fontSize: 'clamp(36px, 7vw, 100px)' }}
          >
            THE DIFFERENCE
          </h2>
          <p className="text-white/40 text-[11px] uppercase tracking-[0.2em] font-body">
            Drag to reveal the transformation
          </p>
        </div>

        {/* Comparison slider */}
        <div
          ref={trackRef}
          className="relative w-full aspect-[4/3] md:aspect-[16/7] min-h-[300px] rounded-lg overflow-hidden cursor-ew-resize select-none"
          style={{ touchAction: 'none' }}
        >
          {/* Before image (bottom layer) */}
          <img
            ref={beforeImgRef}
            src="/images/hero-car.jpg"
            alt="Before paint correction"
            className="absolute inset-0 w-full h-full object-contain"
            style={{
              filter: 'saturate(0.15) brightness(0.65) contrast(1.1)',
            }}
            draggable={false}
          />

          {/* After image (top layer, clipped) */}
          <div
            ref={afterContainerRef}
            className="absolute inset-0"
            style={{ clipPath: 'inset(0 50% 0 0)' }}
          >
            <img
              src="/images/hero-car.jpg"
              alt="After paint correction"
              className="w-full h-full object-contain"
              draggable={false}
            />
          </div>

          {/* Handle */}
          <div
            ref={handleRef}
            className="absolute top-0 bottom-0 w-12 -ml-6 flex items-center justify-center z-10"
            style={{ left: '50%', cursor: 'ew-resize' }}
          >
            {/* Vertical line */}
            <div className="absolute top-0 bottom-0 w-px bg-[#E879A0]/50" />
            {/* Circle handle */}
            <div
              className="w-12 h-12 rounded-full border-2 border-[#E879A0] flex items-center justify-center transition-transform duration-150 hover:scale-110"
              style={{ background: 'rgba(14,7,9,0.6)', backdropFilter: 'blur(4px)' }}
            >
              <div className="flex items-center gap-1 text-[#E879A0] text-xs">
                <span>&#8592;</span>
                <span>&#8594;</span>
              </div>
            </div>
          </div>

          {/* Labels */}
          <div className="absolute bottom-4 left-4 z-10">
            <span className="text-white/40 text-[11px] uppercase tracking-[0.2em] font-body">
              BEFORE
            </span>
            <p className="text-white/30 text-[10px] mt-1 font-body">
              Swirl marks, oxidation, dull finish
            </p>
          </div>
          <div className="absolute bottom-4 right-4 z-10 text-right">
            <span className="text-white text-[11px] uppercase tracking-[0.2em] font-body">
              AFTER
            </span>
            <p className="text-white/50 text-[10px] mt-1 font-body">
              Mirror gloss, ceramic protection
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
