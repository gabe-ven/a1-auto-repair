'use client';
import { ArrowUpRight, BadgeCheck } from 'lucide-react';

function Stars({ count, half }: { count: number; half?: boolean }) {
  return (
    <div style={{ display: 'inline-flex', gap: 2, fontSize: 16, letterSpacing: 1 }}>
      {[1,2,3,4,5].map(i => (
        <span key={i} style={{ color: i <= count ? '#CC2020' : (half && i === count + 1 ? '#CC2020' : '#E5E5E5'), opacity: half && i === count + 1 ? 0.5 : 1 }}>★</span>
      ))}
    </div>
  );
}

const REVIEWS = [
  { initials: 'MR', name: 'Maria R.', stars: 5, source: 'Google Review', text: "A1 Auto Repair is the best shop in Woodland! They diagnosed my car quickly, explained everything clearly, and didn't charge me for unnecessary work. Honest mechanics are hard to find — these guys are the real deal." },
  { initials: 'JL', name: 'James L.', stars: 5, source: 'Yelp Review', text: "Brought my truck in for a smog check and they were fast and professional. Great staff, fair pricing, and no surprise charges. I'll be coming back for all my auto needs." },
  { initials: 'SP', name: 'Sara P.', stars: 5, source: 'Google Review', text: "Got my windows tinted and my car detailed here — absolutely amazing results. The team was super friendly and the turnaround was quick. Highly recommend for anyone in the Woodland area!" },
];

export default function ReviewsSection() {
  return (
    <section id="reviews" style={{ background: '#111111', padding: 'clamp(64px,9vw,120px) clamp(24px,5vw,80px)', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, background: 'repeating-linear-gradient(45deg, rgba(255,255,255,0.012) 0px, rgba(255,255,255,0.012) 1px, transparent 1px, transparent 40px)', pointerEvents: 'none' }} />
      <div style={{ maxWidth: 1320, margin: '0 auto', position: 'relative' }}>
        <div className="reveal-up" style={{ textAlign: 'center', marginBottom: 'clamp(40px,6vw,64px)' }}>
          <div style={{ fontFamily: "'Barlow Condensed',sans-serif", color: '#CC2020', fontSize: 13, fontWeight: 600, letterSpacing: '0.28em', textTransform: 'uppercase', marginBottom: 12 }}>· Reviews ·</div>
          <h2 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 'clamp(40px,6vw,80px)', color: '#FFFFFF', margin: 0, lineHeight: 0.95 }}>What Our Customers <span style={{ color: '#CC2020' }}>Say</span></h2>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 20, marginTop: 18, color: 'rgba(255,255,255,0.7)', fontFamily: "'Barlow Condensed',sans-serif", fontSize: 14, letterSpacing: '0.18em', textTransform: 'uppercase' }}>
            <span><Stars count={4} half /> <span style={{ marginLeft: 6 }}>4.5 · 387 Reviews</span></span>
            <span style={{ width: 1, height: 16, background: 'rgba(255,255,255,0.2)' }} />
            <span><Stars count={4} half /> <span style={{ marginLeft: 6 }}>CARFAX · 4.6/5</span></span>
          </div>
        </div>
        <div className="reviews-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 22 }}>
          {REVIEWS.map((r, i) => (
            <div key={i} className={`reveal-up delay-${i + 1}`} style={{ background: '#FFFFFF', borderRadius: 8, padding: '28px 26px 24px', boxShadow: '0 12px 36px rgba(0,0,0,0.4)', display: 'flex', flexDirection: 'column', position: 'relative' }}>
              <div style={{ position: 'absolute', top: 18, right: 22, fontFamily: "'Playfair Display',serif", fontSize: 64, lineHeight: 1, color: '#CC2020', opacity: 0.12 }}>"</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 16 }}>
                <div style={{ width: 46, height: 46, borderRadius: '50%', background: '#CC2020', color: '#FFFFFF', fontFamily: "'Barlow Condensed',sans-serif", fontSize: 17, fontWeight: 700, letterSpacing: '0.06em', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{r.initials}</div>
                <div><div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 700, fontSize: 18, color: '#111111' }}>{r.name}</div><div style={{ marginTop: 2 }}><Stars count={r.stars} /></div></div>
              </div>
              <p style={{ fontFamily: 'Inter,sans-serif', fontStyle: 'italic', fontSize: 14.5, lineHeight: 1.65, color: '#555555', margin: 0, flex: 1 }}>{r.text}</p>
              <div style={{ marginTop: 18, paddingTop: 14, borderTop: '1px solid #E5E5E5', fontFamily: "'Barlow Condensed',sans-serif", fontSize: 11, fontWeight: 600, letterSpacing: '0.22em', textTransform: 'uppercase', color: '#CC2020', display: 'flex', alignItems: 'center', gap: 6 }}>
                <BadgeCheck size={13} />{r.source}
              </div>
            </div>
          ))}
        </div>
        <div className="reveal-up" style={{ textAlign: 'center', marginTop: 'clamp(28px,4vw,44px)' }}>
          <a href="https://www.yelp.com/biz/a1-auto-repair-and-detail-center-woodland" target="_blank" rel="noopener" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, background: 'transparent', color: '#CC2020', border: '1.5px solid #CC2020', padding: '14px 28px', borderRadius: 3, fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 700, fontSize: 13, letterSpacing: '0.18em', textTransform: 'uppercase', textDecoration: 'none', transition: 'background 220ms, color 220ms' }}
            onMouseEnter={e => { e.currentTarget.style.background = '#CC2020'; e.currentTarget.style.color = '#ffffff'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#CC2020'; }}>
            See All Reviews on Yelp<ArrowUpRight size={14} />
          </a>
        </div>
      </div>
      <style>{`@media(max-width:1023px){.reviews-grid{grid-template-columns:1fr!important}}`}</style>
    </section>
  );
}
