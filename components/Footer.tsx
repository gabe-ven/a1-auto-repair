'use client';
import { Clock, MapPin, Phone } from 'lucide-react';
import Logo from './Logo';

const footerHeading: React.CSSProperties = { fontFamily: "'Barlow Condensed',sans-serif", color: '#CC2020', fontSize: 13, fontWeight: 700, letterSpacing: '0.28em', textTransform: 'uppercase', marginBottom: 18 };
const footerLink: React.CSSProperties = { fontFamily: "'Barlow Condensed',sans-serif", color: 'rgba(255,255,255,0.75)', fontSize: 15, fontWeight: 500, letterSpacing: '0.06em', textDecoration: 'none', transition: 'color 180ms' };
const footerInfo: React.CSSProperties = { display: 'flex', gap: 10, alignItems: 'flex-start', fontFamily: 'Inter,sans-serif', fontSize: 14, color: 'rgba(255,255,255,0.75)', lineHeight: 1.55 };

export default function Footer() {
  return (
    <footer style={{ background: '#111111', color: '#FFFFFF', padding: 'clamp(48px,7vw,80px) clamp(24px,5vw,80px) 24px', borderTop: '3px solid #CC2020' }}>
      <div style={{ maxWidth: 1320, margin: '0 auto' }}>
        <div className="footer-grid" style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr 1.2fr', gap: 48, paddingBottom: 36, borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
          <div>
            <Logo variant="dark" size="md" />
            <p style={{ fontFamily: "'Playfair Display',serif", fontStyle: 'italic', color: 'rgba(255,255,255,0.6)', fontSize: 17, marginTop: 24, maxWidth: 320, lineHeight: 1.55 }}>"Woodland's trusted auto repair &amp; detail center since 2017. Family-owned, community-driven."</p>
            <div style={{ display: 'flex', gap: 10, marginTop: 18 }}>
              <a href="https://www.yelp.com/biz/a1-auto-repair-and-detail-center-woodland" target="_blank" rel="noopener" style={{ display: 'inline-flex', alignItems: 'center', gap: 5, background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 4, padding: '6px 12px', color: '#fff', fontFamily: "'Barlow Condensed',sans-serif", fontSize: 11, fontWeight: 600, letterSpacing: '0.16em', textDecoration: 'none', transition: 'background 180ms' }}
                onMouseEnter={e => e.currentTarget.style.background='rgba(204,32,32,0.3)'}
                onMouseLeave={e => e.currentTarget.style.background='rgba(255,255,255,0.08)'}>Yelp</a>
              <a href="https://www.facebook.com/a1autorepairanddetailcenter/" target="_blank" rel="noopener" style={{ display: 'inline-flex', alignItems: 'center', gap: 5, background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 4, padding: '6px 12px', color: '#fff', fontFamily: "'Barlow Condensed',sans-serif", fontSize: 11, fontWeight: 600, letterSpacing: '0.16em', textDecoration: 'none', transition: 'background 180ms' }}
                onMouseEnter={e => e.currentTarget.style.background='rgba(204,32,32,0.3)'}
                onMouseLeave={e => e.currentTarget.style.background='rgba(255,255,255,0.08)'}>Facebook</a>
            </div>
          </div>
          <div>
            <div style={footerHeading}>Quick Links</div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[['home','Home'],['services','Services'],['about','About'],['reviews','Reviews'],['contact','Contact']].map(([id,label]) => (
                <li key={id}><a href={`#${id}`} onClick={e => { e.preventDefault(); const el = document.getElementById(id); if (el) window.scrollTo({ top: el.offsetTop - 64, behavior: 'smooth' }); }} style={footerLink}
                  onMouseEnter={e => e.currentTarget.style.color='#CC2020'}
                  onMouseLeave={e => e.currentTarget.style.color='rgba(255,255,255,0.75)'}>{label}</a></li>
              ))}
              <li><a href="https://www.a1autoshop.net/Auto-Repair/auto-detailing" target="_blank" rel="noopener" style={footerLink}
                onMouseEnter={e => e.currentTarget.style.color='#CC2020'}
                onMouseLeave={e => e.currentTarget.style.color='rgba(255,255,255,0.75)'}>Auto Detailing</a></li>
              <li><a href="https://a1autoshop.net/smog/" target="_blank" rel="noopener" style={footerLink}
                onMouseEnter={e => e.currentTarget.style.color='#CC2020'}
                onMouseLeave={e => e.currentTarget.style.color='rgba(255,255,255,0.75)'}>Smog Check</a></li>
              <li><a href="https://www.a1autoshop.net/Auto-Repair/Window-Tint" target="_blank" rel="noopener" style={footerLink}
                onMouseEnter={e => e.currentTarget.style.color='#CC2020'}
                onMouseLeave={e => e.currentTarget.style.color='rgba(255,255,255,0.75)'}>Window Tinting</a></li>
            </ul>
          </div>
          <div>
            <div style={footerHeading}>Visit</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div style={footerInfo}><MapPin size={14} style={{ color: '#CC2020', flexShrink: 0, marginTop: 3 }} /><span>1820 E Main St, Woodland, CA 95776</span></div>
              <div style={footerInfo}><Phone size={14} style={{ color: '#CC2020', flexShrink: 0, marginTop: 3 }} /><a href="tel:5306666000" style={{ color: 'rgba(255,255,255,0.75)', textDecoration: 'none' }}>(530) 666-6000</a></div>
              <div style={footerInfo}><Clock size={14} style={{ color: '#CC2020', flexShrink: 0, marginTop: 3 }} /><span>Mon–Sat 8:00 AM – 5:00 PM<br /><span style={{ opacity: 0.5 }}>Sunday Closed</span></span></div>
            </div>
          </div>
        </div>
        <div style={{ paddingTop: 22, display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: 12, fontFamily: "'Barlow Condensed',sans-serif", fontSize: 12, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)' }}>
          <div>© 2026 A1 Auto Repair &amp; Detail Center · Woodland, CA · CA BAR #287351</div>
          <div>1820 E Main St · (530) 666-6000</div>
        </div>
      </div>
      <style>{`@media(max-width:767px){.footer-grid{grid-template-columns:1fr!important;gap:32px!important}}`}</style>
    </footer>
  );
}
