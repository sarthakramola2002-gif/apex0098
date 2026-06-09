import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const isHovering = useRef(false);

  useEffect(() => {
    const cursor = cursorRef.current;
    const ring = ringRef.current;
    if (!cursor || !ring) return;

    // Check for touch device
    const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;
    if (isTouchDevice) {
      cursor.style.display = 'none';
      ring.style.display = 'none';
      return;
    }

    const onMouseMove = (e: MouseEvent) => {
      // Fast, direct tracking for the dot
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.05,
        ease: 'none',
      });

      // Slightly lagged tracking for the ring
      gsap.to(ring, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.15,
        ease: 'power2.out',
      });
    };

    const onMouseEnterInteractive = () => {
      isHovering.current = true;
      gsap.to(cursor, { scale: 0, duration: 0.2 });
      gsap.to(ring, {
        scale: 1,
        opacity: 1,
        duration: 0.3,
        ease: 'power2.out',
      });
    };

    const onMouseLeaveInteractive = () => {
      isHovering.current = false;
      gsap.to(cursor, { scale: 1, duration: 0.2 });
      gsap.to(ring, {
        scale: 0.5,
        opacity: 0,
        duration: 0.3,
        ease: 'power2.out',
      });
    };

    window.addEventListener('mousemove', onMouseMove);

    // Add hover detection for interactive elements
    const interactiveElements = document.querySelectorAll('a, button, [role="button"], input, textarea, select');
    interactiveElements.forEach((el) => {
      el.addEventListener('mouseenter', onMouseEnterInteractive);
      el.addEventListener('mouseleave', onMouseLeaveInteractive);
    });

    // Continuous rotation for the ring when hovering
    const rotateRing = () => {
      if (isHovering.current && ring) {
        gsap.to(ring, {
          rotation: '+=0.5',
          duration: 0.1,
          ease: 'none',
        });
      }
      requestAnimationFrame(rotateRing);
    };
    const rafId = requestAnimationFrame(rotateRing);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      interactiveElements.forEach((el) => {
        el.removeEventListener('mouseenter', onMouseEnterInteractive);
        el.removeEventListener('mouseleave', onMouseLeaveInteractive);
      });
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      {/* Dot */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-2.5 h-2.5 rounded-full pointer-events-none z-[9999] -ml-[5px] -mt-[5px]"
        style={{ background: '#E879A0' }}
      />
      {/* Ring (shown on hover) */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 w-10 h-10 rounded-full pointer-events-none z-[9999] -ml-5 -mt-5 opacity-0"
        style={{
          border: '2px solid #E879A0',
          transform: 'scale(0.5)',
        }}
      />
    </>
  );
}
