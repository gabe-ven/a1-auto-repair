'use client';
import { Phone } from 'lucide-react';

export default function PromoBar() {
  return (
    <div style={{ background: '#CC2020', padding: '9px 24px', textAlign: 'center' }}>
      <p style={{ margin: 0, fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 600, fontSize: 14, letterSpacing: '0.08em', color: '#ffffff', display: 'inline-flex', alignItems: 'center', gap: 10, flexWrap: 'wrap', justifyContent: 'center' }}>
        Star Certified Smog Station · ASE-Certified Technicians · All Makes &amp; Models
        <span style={{ opacity: 0.5 }}>·</span>
        <a href="tel:5306666000" style={{ color: '#ffffff', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 5, fontWeight: 700 }}>
          <Phone size={13} />(530) 666-6000
        </a>
      </p>
    </div>
  );
}
