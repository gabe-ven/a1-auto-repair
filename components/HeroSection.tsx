'use client';
import React from 'react';
import { CalendarCheck, Phone } from 'lucide-react';
import Placeholder from './Placeholder';
import { btnFilledRed, btnOutlineDark } from './_shared';

export default function HeroSection({ onSchedule }: { onSchedule: () => void }) {
  return (
    <section id="home" style={{
      position: 'relative',
      minHeight: 'calc(100vh - 110px)',
      overflow: 'hidden',
      background: '#0A0A0A',
    }}>
      {/* Background image */}
      <div style={{ position: 'absolute', inset: 0 }}>
        <Placeholder
          label="/assets/images/hero-cars.png  ·  Camry · Civic · F-150  ·  cinematic"
          w={1920} h={1080} tone="dark"
          src="/assets/images/hero-cars.png" />
      </div>

      {/* Dark overlay */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(105deg, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.52) 55%, rgba(0,0,0,0.22) 100%)',
      }} />

      {/* Ghost text */}
      <div style={{
        position: 'absolute', left: 0, right: 0, top: '8%',
        textAlign: 'center', pointerEvents: 'none',
        fontFamily: "'Bebas Neue', sans-serif",
        fontSize: 'clamp(120px, 22vw, 360px)',
        lineHeight: 0.85,
        color: 'rgba(255,255,255,0.04)',
        letterSpacing: '0.02em',
        whiteSpace: 'nowrap',
      }}>A1</div>

      {/* Content — bottom-left, same layout as George's */}
      <div style={{
        position: 'absolute', left: 0, right: 0, bottom: 0,
        padding: 'clamp(28px, 6vw, 80px)',
        maxWidth: 1440, margin: '0 auto',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 18 }}>
          <span style={{ color: '#CC2020', fontSize: 14, letterSpacing: 2 }}>★★★★½</span>
          <span style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            color: 'rgba(255,255,255,0.65)',
            fontSize: 13, fontWeight: 600,
            letterSpacing: '0.22em', textTransform: 'uppercase',
          }}>4.5 Rating · 387 Reviews · Woodland, CA</span>
        </div>

        <h1 style={{
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: 'clamp(52px, 8.5vw, 108px)',
          lineHeight: 0.92,
          color: '#FFFFFF',
          margin: 0,
          letterSpacing: '0.01em',
          maxWidth: '14ch',
        }}>
          Woodland's Trusted<br />
          <span style={{ color: '#CC2020' }}>Auto Repair</span><br />
          &amp; Detail Center
        </h1>

        <p style={{
          fontFamily: 'Inter, sans-serif',
          color: 'rgba(255,255,255,0.72)',
          fontSize: 'clamp(15px, 1.6vw, 18px)',
          marginTop: 22, marginBottom: 34,
          maxWidth: 520, lineHeight: 1.65,
        }}>
          Family-owned since 2017. ASE-certified technicians delivering honest, professional auto repair for all makes and models — foreign and domestic.
        </p>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14 }}>
          <button onClick={onSchedule} style={{ ...btnFilledRed, padding: '16px 28px', fontSize: 15 }}>
            <CalendarCheck size={16} style={{ display: 'inline', marginRight: 8, verticalAlign: '-3px' }} />
            REQUEST SERVICE
          </button>
          <a href="tel:5306666000" style={{
            ...btnOutlineDark,
            color: '#FFFFFF',
            borderColor: 'rgba(255,255,255,0.6)',
            padding: '16px 28px',
            fontSize: 15,
            background: 'transparent',
            textDecoration: 'none',
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
          }}>
            <Phone size={16} />
            (530) 666-6000
          </a>
        </div>
      </div>

      {/* Star Certified badge — bottom right */}
      <div style={{
        position: 'absolute', right: 'clamp(20px, 5vw, 64px)', bottom: 'clamp(28px, 6vw, 80px)',
        background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(8px)',
        border: '1px solid rgba(255,255,255,0.2)', borderRadius: 8,
        padding: '12px 18px', display: 'flex', alignItems: 'center', gap: 10,
      }} className="hero-badge">
        <div style={{ width: 36, height: 36, borderRadius: '50%', background: '#CC2020', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Bebas Neue',sans-serif", color: '#fff', fontSize: 16, flexShrink: 0 }}>★</div>
        <div>
          <div style={{ fontFamily: "'Barlow Condensed',sans-serif", color: '#fff', fontSize: 13, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase' }}>Star Certified</div>
          <div style={{ fontFamily: 'Inter,sans-serif', color: 'rgba(255,255,255,0.6)', fontSize: 11 }}>Smog Test &amp; Repair Station</div>
        </div>
      </div>

      <style>{`@media(max-width:767px){.hero-badge{display:none!important}}`}</style>
    </section>
  );
}
