import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const bookingImages = [
  { src: '/images/booking-rim.jpg', alt: 'Polished alloy wheel rim' },
  { src: '/images/booking-beads.jpg', alt: 'Ceramic water beading' },
  { src: '/images/booking-leather.jpg', alt: 'Leather stitching detail' },
  { src: '/images/booking-inspection.jpg', alt: 'Paint under inspection light' },
];

const services = [
  'Essential $149',
  'Signature $349',
  'Ceramic Elite $899',
  'Custom quote',
];

export default function Booking() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({
    name: '',
    vehicle: '',
    phone: '',
    service: '',
    date: '',
    message: '',
  });

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(leftRef.current, {
        opacity: 0,
        x: -40,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          once: true,
        },
      });

      gsap.from(rightRef.current, {
        opacity: 0,
        x: 40,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          once: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Placeholder — form submission would go here
    alert('Thank you! We will contact you shortly to confirm your booking.');
  };

  return (
    <section
      id="booking"
      ref={sectionRef}
      className="relative w-full py-[120px] md:py-[160px]"
      style={{ background: '#0E0709' }}
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left column — photos */}
          <div ref={leftRef} className="space-y-4">
            {bookingImages.map((img, i) => (
              <div
                key={i}
                className="relative overflow-hidden rounded-lg"
                style={{ borderLeft: '3px solid #E879A0' }}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-32 object-cover"
                />
              </div>
            ))}
          </div>

          {/* Right column — form */}
          <div
            ref={rightRef}
            className="glass-panel p-8 md:p-10"
          >
            <h2 className="font-display text-white text-5xl md:text-6xl mb-3">
              Book your detail
            </h2>
            <p className="text-white/50 text-[11px] uppercase tracking-[0.2em] font-body mb-10">
              Ready to see your car the way it was engineered to look?
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Full name */}
              <div>
                <input
                  type="text"
                  placeholder="Full name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-transparent text-white text-sm font-body pb-3 outline-none transition-colors duration-300 focus:border-[#E879A0]"
                  style={{
                    borderBottom: '1px solid rgba(255,255,255,0.15)',
                  }}
                  onFocus={(e) => {
                    e.target.style.borderBottomColor = '#E879A0';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderBottomColor = 'rgba(255,255,255,0.15)';
                  }}
                  required
                />
              </div>

              {/* Vehicle */}
              <div>
                <input
                  type="text"
                  placeholder="Vehicle make & model"
                  value={formData.vehicle}
                  onChange={(e) => setFormData({ ...formData, vehicle: e.target.value })}
                  className="w-full bg-transparent text-white text-sm font-body pb-3 outline-none transition-colors duration-300"
                  style={{
                    borderBottom: '1px solid rgba(255,255,255,0.15)',
                  }}
                  onFocus={(e) => {
                    e.target.style.borderBottomColor = '#E879A0';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderBottomColor = 'rgba(255,255,255,0.15)';
                  }}
                  required
                />
              </div>

              {/* Phone */}
              <div>
                <input
                  type="tel"
                  placeholder="Phone number"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full bg-transparent text-white text-sm font-body pb-3 outline-none transition-colors duration-300"
                  style={{
                    borderBottom: '1px solid rgba(255,255,255,0.15)',
                  }}
                  onFocus={(e) => {
                    e.target.style.borderBottomColor = '#E879A0';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderBottomColor = 'rgba(255,255,255,0.15)';
                  }}
                  required
                />
              </div>

              {/* Service select */}
              <div>
                <select
                  value={formData.service}
                  onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                  className="w-full bg-transparent text-white text-sm font-body pb-3 outline-none transition-colors duration-300 appearance-none cursor-pointer"
                  style={{
                    borderBottom: '1px solid rgba(255,255,255,0.15)',
                  }}
                  onFocus={(e) => {
                    e.target.style.borderBottomColor = '#E879A0';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderBottomColor = 'rgba(255,255,255,0.15)';
                  }}
                  required
                >
                  <option value="" disabled className="bg-[#1A0810]">
                    Preferred service
                  </option>
                  {services.map((s) => (
                    <option key={s} value={s} className="bg-[#1A0810] text-white">
                      {s}
                    </option>
                  ))}
                </select>
              </div>

              {/* Date */}
              <div>
                <input
                  type="date"
                  placeholder="Preferred date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full bg-transparent text-white text-sm font-body pb-3 outline-none transition-colors duration-300"
                  style={{
                    borderBottom: '1px solid rgba(255,255,255,0.15)',
                    colorScheme: 'dark',
                  }}
                  onFocus={(e) => {
                    e.target.style.borderBottomColor = '#E879A0';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderBottomColor = 'rgba(255,255,255,0.15)';
                  }}
                  required
                />
              </div>

              {/* Message */}
              <div>
                <textarea
                  placeholder="Message (optional)"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={3}
                  className="w-full bg-transparent text-white text-sm font-body pb-3 outline-none transition-colors duration-300 resize-none"
                  style={{
                    borderBottom: '1px solid rgba(255,255,255,0.15)',
                  }}
                  onFocus={(e) => {
                    e.target.style.borderBottomColor = '#E879A0';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderBottomColor = 'rgba(255,255,255,0.15)';
                  }}
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full pill-btn-filled py-4 mt-4 transition-all duration-300 hover:scale-[1.01]"
                style={{ background: '#E879A0', color: '#0E0709' }}
                onMouseEnter={(e) => {
                  (e.target as HTMLElement).style.background = '#C4567E';
                }}
                onMouseLeave={(e) => {
                  (e.target as HTMLElement).style.background = '#E879A0';
                }}
              >
                Book My Detail
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
