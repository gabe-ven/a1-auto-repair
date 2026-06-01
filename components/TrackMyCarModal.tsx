'use client';

import React, { useState, useEffect } from 'react';
import { ArrowRight, Car, Check, MapPin, Navigation, Phone } from 'lucide-react';
import DynamicIcon from './DynamicIcon';
import ModalShell, { ModalHeader } from './ModalShell';
import { btnFilledRed, btnOutlineDark, inputStyle, wizardLead, modalBodyStyle, modalFooterStyle, Field } from './_shared';

type Flow = 'choose' | 'oil-lookup' | 'oil-active' | 'oil-ready' | 'repair-lookup' | 'repair-status';

export default function TrackMyCarModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [flow, setFlow] = useState<Flow>('choose');
  const [lookup, setLookup] = useState({ plate: '', phone: '' });
  const [repairLookup, setRepairLookup] = useState({ ticket: '', phone: '' });
  const [ticketResult, setTicketResult] = useState<null | {
    ticket_number: string;
    status: string;
    notes?: string;
  }>(null);
  const [repairError, setRepairError] = useState('');
  const [remaining, setRemaining] = useState(0);
  const [totalSeconds, setTotalSeconds] = useState(45 * 60);
  const [adjustmentMins, setAdjustmentMins] = useState(0);
  const [loading, setLoading] = useState(false);
  const [lookupError, setLookupError] = useState('');

  useEffect(() => {
    if (!open) {
      setTimeout(() => {
        setFlow('choose');
        setLookup({ plate: '', phone: '' });
        setRepairLookup({ ticket: '', phone: '' });
        setTicketResult(null);
        setRepairError('');
        setRemaining(0);
        setTotalSeconds(45 * 60);
        setAdjustmentMins(0);
        setLookupError('');
      }, 250);
    }
  }, [open]);

  useEffect(() => {
    if (flow !== 'oil-active') return;
    const id = setInterval(() => setRemaining((r: number) => Math.max(0, r - 1)), 1000);
    return () => clearInterval(id);
  }, [flow]);

  const titles: Record<Flow, { eyebrow: string; title: string }> = {
    'choose':        { eyebrow: 'Track My Car', title: 'What are you tracking?' },
    'oil-lookup':    { eyebrow: 'Oil Change',   title: 'Find your service' },
    'oil-active':    { eyebrow: 'Oil Change',   title: 'In progress' },
    'oil-ready':     { eyebrow: 'Oil Change',   title: 'Ready for pickup' },
    'repair-lookup': { eyebrow: 'Service Repair', title: 'Find your service' },
    'repair-status': { eyebrow: 'Service Repair', title: 'Status' },
  };

  const handleOilLookup = async () => {
    setLookupError('');
    setLoading(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_DASHBOARD_API_URL}/api/oil-changes/track`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            shop_id: process.env.NEXT_PUBLIC_SHOP_ID,
            license_plate: lookup.plate,
            phone: lookup.phone,
          }),
        }
      );
      if (res.status === 404) {
        setLookupError("We couldn't find your service. Double-check your plate and phone.");
        return;
      }
      if (!res.ok) throw new Error('API error');
      const json = await res.json();
      const record = json.data ?? json;
      if (record.status === 'ready') {
        setFlow('oil-ready');
        return;
      }
      const eta = new Date(record.started_at).getTime() + (record.estimated_minutes + record.adjustment_minutes) * 60000;
      const secs = Math.max(0, Math.floor((eta - Date.now()) / 1000));
      const total = (record.estimated_minutes + record.adjustment_minutes) * 60;
      setRemaining(secs);
      setTotalSeconds(total > 0 ? total : 45 * 60);
      setAdjustmentMins(record.adjustment_minutes ?? 0);
      setFlow('oil-active');
    } catch {
      setLookupError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleRepairLookup = async () => {
    setRepairError('');
    setLoading(true);
    try {
      const params = new URLSearchParams({
        ticket_number: repairLookup.ticket,
        phone: repairLookup.phone,
        shop_id: process.env.NEXT_PUBLIC_SHOP_ID ?? 'a1-auto',
      });
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_DASHBOARD_API_URL}/api/tickets/status?${params}`
      );
      if (res.status === 404) {
        setRepairError("We couldn't find that ticket. Double-check your ticket number and phone.");
        return;
      }
      if (!res.ok) throw new Error('API error');
      const json = await res.json();
      setTicketResult(json.data ?? json);
      setFlow('repair-status');
    } catch {
      setRepairError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const goBack = () => {
    if (flow === 'oil-lookup' || flow === 'repair-lookup') setFlow('choose');
    else if (flow === 'oil-active' || flow === 'oil-ready') setFlow('oil-lookup');
    else if (flow === 'repair-status') setFlow('repair-lookup');
  };

  return (
    <ModalShell open={open} onClose={onClose} maxWidth={720}>
      <ModalHeader
        eyebrow={titles[flow].eyebrow}
        title={titles[flow].title}
        onClose={onClose}
        onBack={flow !== 'choose' ? goBack : null}
      />

      {/* CHOOSE */}
      {flow === 'choose' && (
        <div style={modalBodyStyle}>
          <p style={{ ...wizardLead, marginBottom: 22 }}>Select what you&apos;d like to track today.</p>
          <div className="track-choice-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
            {([
              { id: 'oil-lookup' as Flow,    icon: 'droplets', title: 'Oil Change',     sub: 'Quick service · live countdown' },
              { id: 'repair-lookup' as Flow, icon: 'wrench',   title: 'Service Repair', sub: 'Full repair · status tracker' },
            ]).map((c) => (
              <button key={c.id} onClick={() => setFlow(c.id)} style={{
                background: '#FFFFFF',
                border: '1.5px solid #E5E5E5',
                borderRadius: 6,
                padding: '28px 22px',
                textAlign: 'left',
                cursor: 'pointer',
                transition: 'border-color 180ms, background 180ms',
                display: 'flex', flexDirection: 'column', gap: 10,
              }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#CC2020'; e.currentTarget.style.background = '#FEF2F2'; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#E5E5E5'; e.currentTarget.style.background = '#FFFFFF'; }}>
                <div style={{
                  width: 48, height: 48, borderRadius: 6,
                  background: '#CC2020',
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <DynamicIcon name={c.icon} size={22} style={{ color: '#FFFFFF' }} />
                </div>
                <div style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: 26, lineHeight: 1,
                  color: '#111111',
                  letterSpacing: '0.02em',
                  marginTop: 6,
                }}>{c.title}</div>
                <div style={{
                  fontFamily: "var(--font-inter), Inter, sans-serif",
                  fontSize: 13, color: '#666666',
                  lineHeight: 1.5,
                }}>{c.sub}</div>
                <div style={{
                  marginTop: 'auto',
                  display: 'inline-flex', alignItems: 'center', gap: 6,
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontWeight: 700, fontSize: 12,
                  color: '#CC2020',
                  letterSpacing: '0.22em', textTransform: 'uppercase',
                  paddingTop: 10,
                }}>
                  Track <ArrowRight size={13} />
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* OIL — LOOKUP */}
      {flow === 'oil-lookup' && (
        <>
          <div style={modalBodyStyle}>
            <p style={wizardLead}>Enter your plate and phone — we&apos;ll pull up your service.</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginTop: 18 }}>
              <Field label="License Plate" full>
                <input
                  type="text"
                  placeholder="e.g. 7ABC123"
                  value={lookup.plate}
                  onChange={(e) => setLookup({ ...lookup, plate: e.target.value.toUpperCase() })}
                  style={{ ...inputStyle, letterSpacing: '0.15em', fontFamily: 'ui-monospace, monospace', fontWeight: 600 }}
                />
              </Field>
              <Field label="Phone (for verification)" full>
                <input
                  type="tel"
                  placeholder="(530) 555-0100"
                  value={lookup.phone}
                  onChange={(e) => setLookup({ ...lookup, phone: e.target.value })}
                  style={inputStyle}
                />
              </Field>
            </div>
            {lookupError && (
              <div style={{
                marginTop: 14, padding: '10px 14px',
                background: '#FFF0F0', border: '1px solid #E05252',
                borderLeft: '4px solid #CC2020', borderRadius: 4,
                fontFamily: "var(--font-inter), Inter, sans-serif", fontSize: 13.5, color: '#B23A3A',
              }}>{lookupError}</div>
            )}
          </div>
          <div style={modalFooterStyle}>
            <span />
            <button
              disabled={loading}
              onClick={handleOilLookup}
              style={{ ...btnFilledRed, padding: '12px 22px', fontSize: 13, opacity: loading ? 0.6 : 1, cursor: loading ? 'not-allowed' : 'pointer' }}>
              {loading ? 'Searching…' : 'Find My Car'}
              {!loading && <ArrowRight size={14} style={{ marginLeft: 8, verticalAlign: '-2px' }} />}
            </button>
          </div>
        </>
      )}

      {/* REPAIR — LOOKUP */}
      {flow === 'repair-lookup' && (
        <>
          <div style={modalBodyStyle}>
            <p style={wizardLead}>Enter your ticket number and phone — we&apos;ll pull up your repair status.</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginTop: 18 }}>
              <Field label="Ticket Number" full>
                <input
                  type="text"
                  placeholder="e.g. AA-XXXXXXXXXX"
                  value={repairLookup.ticket}
                  onChange={(e) => setRepairLookup({ ...repairLookup, ticket: e.target.value.toUpperCase() })}
                  style={{ ...inputStyle, letterSpacing: '0.08em', fontFamily: 'ui-monospace, monospace', fontWeight: 600 }}
                />
              </Field>
              <Field label="Phone (for verification)" full>
                <input
                  type="tel"
                  placeholder="(530) 555-0100"
                  value={repairLookup.phone}
                  onChange={(e) => setRepairLookup({ ...repairLookup, phone: e.target.value })}
                  style={inputStyle}
                />
              </Field>
            </div>
            {repairError && (
              <div style={{
                marginTop: 14, padding: '10px 14px',
                background: '#FFF0F0', border: '1px solid #E05252',
                borderLeft: '4px solid #CC2020', borderRadius: 4,
                fontFamily: "var(--font-inter), Inter, sans-serif", fontSize: 13.5, color: '#B23A3A',
              }}>{repairError}</div>
            )}
          </div>
          <div style={modalFooterStyle}>
            <span />
            <button
              disabled={loading}
              onClick={handleRepairLookup}
              style={{ ...btnFilledRed, padding: '12px 22px', fontSize: 13, opacity: loading ? 0.6 : 1, cursor: loading ? 'not-allowed' : 'pointer' }}>
              {loading ? 'Searching…' : 'Find My Ticket'}
              {!loading && <ArrowRight size={14} style={{ marginLeft: 8, verticalAlign: '-2px' }} />}
            </button>
          </div>
        </>
      )}

      {/* OIL — ACTIVE TIMER */}
      {flow === 'oil-active' && (
        <>
          <div style={{ ...modalBodyStyle, padding: '28px 26px' }}>
            <div style={{
              padding: '14px 16px',
              background: '#F5F5F5',
              border: '1px solid #E5E5E5',
              borderRadius: 6,
              display: 'flex', alignItems: 'center', gap: 12,
              marginBottom: 24,
            }}>
              <Car size={22} style={{ color: '#CC2020' }} />
              <div>
                <div style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontSize: 11, fontWeight: 600,
                  color: '#CC2020',
                  letterSpacing: '0.22em', textTransform: 'uppercase',
                }}>Your Vehicle</div>
                <div style={{
                  fontFamily: "var(--font-inter), Inter, sans-serif",
                  fontWeight: 700, fontSize: 17, color: '#111111',
                  marginTop: 2,
                }}>Plate: <span style={{ fontFamily: 'ui-monospace, monospace', fontWeight: 600 }}>{lookup.plate}</span></div>
              </div>
            </div>

            <CountdownRing seconds={remaining} totalSeconds={totalSeconds} />

            <div style={{
              textAlign: 'center', marginTop: 22,
              fontFamily: "'Barlow Condensed', sans-serif",
              fontSize: 16, fontWeight: 600,
              color: '#111111',
              letterSpacing: '0.16em', textTransform: 'uppercase',
            }}>
              <span style={{
                display: 'inline-block', width: 8, height: 8, borderRadius: '50%',
                background: '#CC2020', marginRight: 10, verticalAlign: '2px',
                animation: 'pulse-dot 1.6s infinite',
              }} />
              Your car is being serviced
            </div>

            {adjustmentMins < 0 && (
              <div style={adjustmentNote('#1F7A47')}>⏱ Your car will be ready {Math.abs(adjustmentMins)} mins early.</div>
            )}
            {adjustmentMins > 0 && (
              <div style={adjustmentNote('#B23A3A')}>⚠️ Delayed by {adjustmentMins} mins — we&apos;ll text you when ready.</div>
            )}

            <div style={shopFooterCard}>
              <MapPin size={16} style={{ color: '#CC2020', flexShrink: 0, marginTop: 3 }} />
              <div>
                <div style={{ fontFamily: "var(--font-inter), Inter, sans-serif", fontSize: 14, color: '#1A1A1A', fontWeight: 500 }}>1820 E Main St, Woodland, CA 95776</div>
                <a href="tel:5306666000" style={{ fontFamily: "var(--font-inter), Inter, sans-serif", fontSize: 13, color: '#666666', textDecoration: 'none' }}>(530) 666-6000</a>
              </div>
            </div>
          </div>
          <style>{`
            @keyframes pulse-dot { 0% { box-shadow: 0 0 0 0 rgba(204,32,32,0.5); } 70% { box-shadow: 0 0 0 10px rgba(204,32,32,0); } 100% { box-shadow: 0 0 0 0 rgba(204,32,32,0); } }
          `}</style>
        </>
      )}

      {/* OIL — READY */}
      {flow === 'oil-ready' && (
        <div style={{ ...modalBodyStyle, textAlign: 'center', padding: '40px 28px' }}>
          <div style={{
            width: 110, height: 110, borderRadius: '50%',
            background: '#CC2020',
            boxShadow: '0 0 0 14px rgba(204,32,32,0.16)',
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            animation: 'pop-check 480ms cubic-bezier(0.16, 1, 0.3, 1) forwards',
          }}>
            <Check size={60} style={{ color: '#FFFFFF', strokeWidth: 3 }} />
          </div>
          <h3 style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: 44, color: '#111111',
            margin: '26px 0 10px', lineHeight: 1,
            letterSpacing: '0.01em',
          }}>Your car is ready for pickup!</h3>
          <p style={{
            fontFamily: "var(--font-inter), Inter, sans-serif",
            fontSize: 15, color: '#666666',
            maxWidth: 460, margin: '0 auto', lineHeight: 1.6,
          }}>Head over to A1 Auto at 1820 E Main St, Woodland. See you soon!</p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 12, flexWrap: 'wrap', marginTop: 26 }}>
            <a
              href="https://maps.google.com/?q=1820+E+Main+St+Woodland+CA+95776"
              target="_blank"
              rel="noopener"
              style={{ ...btnFilledRed, padding: '14px 22px', fontSize: 13, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 8 }}>
              <Navigation size={14} />
              Get Directions
            </a>
            <a
              href="tel:5306666000"
              style={{ ...btnOutlineDark, padding: '14px 22px', fontSize: 13, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 8 }}>
              <Phone size={14} />
              Call the Shop
            </a>
          </div>
          <style>{`@keyframes pop-check{from{opacity:0;transform:scale(0.4)}to{opacity:1;transform:scale(1)}}`}</style>
        </div>
      )}

      {/* REPAIR — STATUS */}
      {flow === 'repair-status' && ticketResult && (
        <LiveRepairStatus ticket={ticketResult} />
      )}
    </ModalShell>
  );
}

function CountdownRing({ seconds, totalSeconds }: { seconds: number; totalSeconds: number }) {
  const pct = Math.max(0, Math.min(1, 1 - seconds / totalSeconds));
  const size = 240;
  const stroke = 14;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const dash = c * pct;

  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;

  return (
    <div style={{ width: size, height: size, margin: '0 auto', position: 'relative' }}>
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#E5E5E5" strokeWidth={stroke} />
        <circle
          cx={size / 2} cy={size / 2} r={r}
          fill="none" stroke="#CC2020" strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={`${dash} ${c - dash}`}
          style={{ transition: 'stroke-dasharray 600ms ease' }}
        />
      </svg>
      <div style={{
        position: 'absolute', inset: 0,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
      }}>
        <div style={{
          fontFamily: "'Barlow Condensed', sans-serif",
          color: '#CC2020',
          fontSize: 11, fontWeight: 700,
          letterSpacing: '0.32em', textTransform: 'uppercase',
        }}>Time Remaining</div>
        <div style={{
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: 56, lineHeight: 1,
          color: '#111111',
          letterSpacing: '0.02em',
          marginTop: 6,
          display: 'flex', alignItems: 'baseline', gap: 2,
        }}>
          <span>{String(h).padStart(2, '0')}</span>
          <span style={{ color: '#CC2020', fontSize: 38 }}>:</span>
          <span>{String(m).padStart(2, '0')}</span>
          <span style={{ color: '#CC2020', fontSize: 38 }}>:</span>
          <span>{String(s).padStart(2, '0')}</span>
        </div>
        <div style={{
          fontFamily: "'Barlow Condensed', sans-serif",
          color: '#666666',
          fontSize: 11, fontWeight: 600,
          letterSpacing: '0.22em', textTransform: 'uppercase',
          marginTop: 4,
        }}>HH : MM : SS</div>
      </div>
    </div>
  );
}

const STATUS_MAP: Record<string, { label: string; icon: string }> = {
  new:       { label: "Received — we'll be in touch soon",            icon: 'inbox' },
  reviewing: { label: "Under Review — our mechanic is looking at it", icon: 'clipboard-list' },
  in_repair: { label: "In Progress — your car is being worked on",    icon: 'wrench' },
  ready:     { label: "Ready for Pickup!",                            icon: 'badge-check' },
  completed: { label: "Completed",                                    icon: 'check-circle' },
};

function LiveRepairStatus({ ticket }: { ticket: { ticket_number: string; status: string; notes?: string } }) {
  const mapped = STATUS_MAP[ticket.status] ?? { label: ticket.status, icon: 'wrench' };

  return (
    <div style={modalBodyStyle}>
      <div style={{
        padding: '14px 16px',
        background: '#F5F5F5',
        border: '1px solid #E5E5E5',
        borderRadius: 6,
        display: 'flex', alignItems: 'center', gap: 12,
        marginBottom: 22,
      }}>
        <Car size={22} style={{ color: '#CC2020' }} />
        <div>
          <div style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            fontSize: 11, fontWeight: 600,
            color: '#CC2020',
            letterSpacing: '0.22em', textTransform: 'uppercase',
          }}>Ticket</div>
          <div style={{
            fontFamily: 'ui-monospace, monospace',
            fontWeight: 600, fontSize: 16, color: '#111111',
            marginTop: 2,
          }}>{ticket.ticket_number}</div>
        </div>
      </div>

      <div style={{
        background: '#111111',
        color: '#FFFFFF',
        borderRadius: 6,
        padding: '20px 22px',
        display: 'flex', gap: 14, alignItems: 'flex-start',
        borderLeft: '4px solid #CC2020',
        marginBottom: ticket.notes ? 16 : 0,
      }}>
        <DynamicIcon name={mapped.icon} size={22} style={{ color: '#FFFFFF', flexShrink: 0, marginTop: 2 }} />
        <div>
          <div style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            color: '#FFFFFF',
            fontSize: 11, fontWeight: 700,
            letterSpacing: '0.28em', textTransform: 'uppercase',
            marginBottom: 6,
            opacity: 0.7,
          }}>Status</div>
          <div style={{
            fontFamily: "var(--font-inter), Inter, sans-serif",
            fontSize: 15, lineHeight: 1.55,
            color: '#FFFFFF',
          }}>{mapped.label}</div>
        </div>
      </div>

      {ticket.notes && (
        <div style={{
          padding: '14px 16px',
          background: '#FFFBF0',
          border: '1px solid #F0D070',
          borderLeft: '4px solid #CC2020',
          borderRadius: 6,
          marginBottom: 0,
        }}>
          <div style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            fontSize: 10, fontWeight: 700,
            color: '#8A7030',
            letterSpacing: '0.24em', textTransform: 'uppercase',
            marginBottom: 6,
          }}>Message from the shop:</div>
          <div style={{
            fontFamily: "var(--font-inter), Inter, sans-serif",
            fontSize: 14, lineHeight: 1.6,
            color: '#3A3020',
          }}>{ticket.notes}</div>
        </div>
      )}

      <div style={shopFooterCard}>
        <MapPin size={16} style={{ color: '#CC2020', flexShrink: 0, marginTop: 3 }} />
        <div>
          <div style={{ fontFamily: "var(--font-inter), Inter, sans-serif", fontSize: 14, color: '#1A1A1A', fontWeight: 500 }}>1820 E Main St, Woodland, CA 95776</div>
          <a href="tel:5306666000" style={{ fontFamily: "var(--font-inter), Inter, sans-serif", fontSize: 13, color: '#666666', textDecoration: 'none' }}>(530) 666-6000</a>
        </div>
      </div>
    </div>
  );
}

const adjustmentNote = (color: string): React.CSSProperties => ({
  marginTop: 14,
  padding: '10px 14px',
  background: '#FFFFFF',
  border: `1px solid ${color}`,
  borderLeft: `4px solid ${color}`,
  borderRadius: 4,
  fontFamily: "var(--font-inter), Inter, sans-serif",
  fontStyle: 'italic',
  fontSize: 14,
  color,
  textAlign: 'center',
});

const shopFooterCard: React.CSSProperties = {
  marginTop: 22,
  padding: '14px 16px',
  background: '#F5F5F5',
  border: '1px solid #E5E5E5',
  borderRadius: 6,
  display: 'flex', gap: 12, alignItems: 'flex-start',
};
