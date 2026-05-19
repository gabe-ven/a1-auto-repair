'use client';

const CREDENTIALS = [
  { num: '01', title: 'ASE Certified', desc: 'Our technicians hold ASE (Automotive Service Excellence) certification — the gold standard in auto repair.' },
  { num: '02', title: 'Star Certified Smog', desc: 'Licensed Star Certified Test and Repair Smog Station. We handle both smog tests and repairs in one visit.' },
  { num: '03', title: 'Family Owned', desc: "Locally owned and operated in Woodland since 2017 by Ahmad Waqar. CA BAR License #287351." },
];

export default function AboutSection() {
  return (
    <section id="about">

      {/* Dark intro strip */}
      <div style={{ background: '#0F0F0F', padding: 'clamp(22px,3vw,36px) clamp(24px,5vw,80px)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 32, flexWrap: 'wrap', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ fontFamily: "'Barlow Condensed',sans-serif", color: '#CC2020', fontSize: 11, fontWeight: 700, letterSpacing: '0.36em', textTransform: 'uppercase', flexShrink: 0 }}>Our Story</div>
        <p style={{ fontFamily: "'Playfair Display',serif", fontStyle: 'italic', color: 'rgba(255,255,255,0.7)', fontSize: 'clamp(15px,1.5vw,19px)', margin: 0, flex: 1, textAlign: 'center' }}>
          "Serving Woodland families since 2017 — honest work, fair prices, every time."
        </p>
        <div style={{ fontFamily: "'Barlow Condensed',sans-serif", color: 'rgba(255,255,255,0.25)', fontSize: 11, fontWeight: 600, letterSpacing: '0.3em', textTransform: 'uppercase', flexShrink: 0 }}>Est. 2017</div>
      </div>

      {/* Main content */}
      <div style={{ background: '#FFFFFF' }}>
        <div style={{ maxWidth: 1320, margin: '0 auto', padding: 'clamp(52px,8vw,108px) clamp(24px,5vw,80px)' }}>
          <div className="about-main-grid" style={{ display: 'grid', gridTemplateColumns: '50fr 50fr', gap: 'clamp(40px,7vw,96px)', alignItems: 'stretch' }}>

            {/* Left — text */}
            <div className="reveal-left">
              <div style={{ fontFamily: "'Barlow Condensed',sans-serif", color: '#CC2020', fontSize: 11, fontWeight: 700, letterSpacing: '0.36em', textTransform: 'uppercase', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 12 }}>
                <span style={{ display: 'block', width: 28, height: 1.5, background: '#CC2020' }} />
                Welcome to A1 Auto Repair
              </div>
              <h2 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 'clamp(52px,7vw,96px)', color: '#111111', margin: '0 0 24px', lineHeight: 0.9, letterSpacing: '0.01em' }}>
                AUTO REPAIR<br />
                <span style={{ color: '#CC2020' }}>DONE RIGHT.</span>
              </h2>

              <div style={{ fontFamily: 'Inter,sans-serif', fontSize: 16, lineHeight: 1.82, color: '#555555', display: 'flex', flexDirection: 'column', gap: 18, marginBottom: 32 }}>
                <p style={{ margin: 0 }}>At A1 Auto Repair &amp; Detail Center, we work hard to be Yolo County's one-stop auto shop. We take pride in offering genuine car care and superior customer service to every person who walks through our doors — with no surprise charges and no unnecessary repairs.</p>
                <p style={{ margin: 0 }}>Our ASE-certified technicians provide high-quality routine care and major repairs for all makes and models — foreign and domestic — using today's latest automotive technology. From oil changes to engine replacements, we handle it all.</p>
              </div>

              <blockquote style={{ margin: 0, padding: '0 0 0 20px', borderLeft: '3px solid #CC2020', fontFamily: "'Playfair Display',serif", fontStyle: 'italic', fontSize: 17, color: '#1A1A1A', lineHeight: 1.65 }}>
                Yolo County's one-stop auto shop — repair, detail, smog, and tinting all in one place.
              </blockquote>

              <div style={{ display: 'flex', gap: 16, marginTop: 32, flexWrap: 'wrap' }}>
                <a href="https://www.a1autoshop.net/Auto-Repair/Schedule-A-Repair" target="_blank" rel="noopener" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#CC2020', color: '#fff', border: '1px solid #CC2020', borderRadius: 4, padding: '12px 22px', fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 700, fontSize: 13, letterSpacing: '0.14em', textTransform: 'uppercase', textDecoration: 'none' }}>Schedule a Repair</a>
                <a href="https://www.a1autoshop.net/Auto-Repair/Car-Care-Tips" target="_blank" rel="noopener" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'transparent', color: '#111111', border: '1.5px solid #111111', borderRadius: 4, padding: '11px 22px', fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 700, fontSize: 13, letterSpacing: '0.14em', textTransform: 'uppercase', textDecoration: 'none' }}>Car Care Tips</a>
              </div>
            </div>

            {/* Right — shop photo */}
            <div className="reveal-right" style={{ display: 'flex', minHeight: 480 }}>
              <div style={{ borderRadius: 10, overflow: 'hidden', flex: 1 }}>
                <img src="/shop-exterior.jpg" alt="A1 Auto Repair exterior — 1820 E Main St, Woodland CA" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', display: 'block' }} />
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Credentials strip */}
      <div style={{ background: '#F8F8F8', borderTop: '1px solid #EBEBEB', borderBottom: '1px solid #EBEBEB' }}>
        <div style={{ maxWidth: 1320, margin: '0 auto', padding: '0 clamp(24px,5vw,80px)' }}>
          <div className="credentials-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)' }}>
            {CREDENTIALS.map((c, i) => (
              <div
                key={i}
                className={`cred-cell reveal-up delay-${i + 1}`}
                style={{
                  padding: 'clamp(28px,4vw,52px) clamp(16px,2.5vw,32px)',
                  borderRight: i < 2 ? '1px solid #EBEBEB' : 'none',
                  borderTop: '3px solid transparent',
                  transition: 'border-color 220ms, background 220ms',
                  cursor: 'default',
                }}
                onMouseEnter={e => { e.currentTarget.style.borderTopColor = '#CC2020'; e.currentTarget.style.background = '#FFFFFF'; }}
                onMouseLeave={e => { e.currentTarget.style.borderTopColor = 'transparent'; e.currentTarget.style.background = 'transparent'; }}
              >
                <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 56, color: '#CC2020', lineHeight: 1, marginBottom: 10, opacity: 0.22 }}>{c.num}</div>
                <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 'clamp(20px,2.2vw,28px)', color: '#111111', letterSpacing: '0.02em', marginBottom: 10 }}>{c.title}</div>
                <p style={{ fontFamily: 'Inter,sans-serif', fontSize: 14, color: '#777777', margin: 0, lineHeight: 1.68 }}>{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media(max-width:1023px){
          .about-main-grid{grid-template-columns:1fr!important}
          .credentials-grid{grid-template-columns:1fr!important}
          .cred-cell{border-right:none!important;border-bottom:1px solid #EBEBEB}
          .cred-cell:last-child{border-bottom:none}
        }
      `}</style>
    </section>
  );
}
