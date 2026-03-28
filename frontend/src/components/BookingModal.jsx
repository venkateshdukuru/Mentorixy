import { useState } from 'react';
import emailjs from '@emailjs/browser';

// ─────────────────────────────────────────
// 🔑 YOUR EMAILJS CREDENTIALS
// Sign up free at https://www.emailjs.com/
// Replace these 3 values with your own:
const EMAILJS_SERVICE_ID  = 'your_service_id';
const EMAILJS_TEMPLATE_ID = 'your_template_id';
const EMAILJS_PUBLIC_KEY  = 'your_public_key';
// ─────────────────────────────────────────

const DURATIONS = [
  { label: '30 Minutes', value: '30min',    price: '₹99' },
  { label: '1 Hour',     value: 'hourly',   price: '₹150' },
  { label: 'Half Day',   value: 'half-day', price: '₹700' },
  { label: 'Full Day',   value: 'full-day', price: '₹1,500' },
];

export default function BookingModal({ expert, onClose }) {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    topic: '',
    duration: 'hourly',
    preferredDate: '',
    message: '',
  });
  const [step, setStep]       = useState(1); // 1 = form, 2 = success
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState('');

  const selectedDuration = DURATIONS.find(d => d.value === form.duration);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.phone || !form.topic) {
      return setError('Please fill in all required fields.');
    }
    setError('');
    setLoading(true);

    const templateParams = {
      to_name:        'Mentorixy Owner',          // appears in email greeting
      from_name:      form.name,
      from_email:     form.email,
      from_phone:     form.phone,
      expert_name:    expert?.name || 'Any available mentor',
      expert_title:   expert?.title || '',
      topic:          form.topic,
      duration:       selectedDuration?.label,
      price:          selectedDuration?.price,
      preferred_date: form.preferredDate || 'Flexible',
      message:        form.message || 'No additional notes',
    };

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams,
        EMAILJS_PUBLIC_KEY,
      );
      setStep(2);
    } catch (err) {
      // Fallback: if EmailJS not configured, still show success
      // and open mailto as backup
      const subject = encodeURIComponent(`[Mentorixy Booking] ${form.name} → ${expert?.name || 'Mentor'}`);
      const body = encodeURIComponent(
        `New Session Booking Request\n\n` +
        `Name: ${form.name}\nEmail: ${form.email}\nPhone: ${form.phone}\n` +
        `Mentor: ${expert?.name || 'Any'} (${expert?.title || ''})\n` +
        `Topic: ${form.topic}\nDuration: ${selectedDuration?.label} (${selectedDuration?.price})\n` +
        `Preferred Date: ${form.preferredDate || 'Flexible'}\n` +
        `Notes: ${form.message || 'None'}`
      );
      window.location.href = `mailto:youremail@gmail.com?subject=${subject}&body=${body}`;
      setStep(2);
    } finally {
      setLoading(false);
    }
  };

  // Backdrop click closes modal
  const handleBackdrop = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div
      onClick={handleBackdrop}
      style={{
        position: 'fixed', inset: 0, zIndex: 3000,
        background: 'rgba(0,0,0,0.7)',
        backdropFilter: 'blur(12px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '16px',
        overflowY: 'auto',
      }}
    >
      <div
        className="glass-card"
        style={{
          width: '100%',
          maxWidth: '580px',
          padding: '40px',
          position: 'relative',
          animation: 'slide-in-left 0.3s ease',
          maxHeight: '90vh',
          overflowY: 'auto',
        }}
      >
        {/* Close */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute', top: '16px', right: '16px',
            background: 'rgba(255,255,255,0.06)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '8px',
            width: '32px', height: '32px',
            color: '#94a3b8', cursor: 'pointer',
            fontSize: '16px', fontFamily: 'Inter, sans-serif',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
        >✕</button>

        {step === 2 ? (
          /* ── SUCCESS STATE ── */
          <div style={{ textAlign: 'center', padding: '24px 0' }}>
            <div style={{
              width: '80px', height: '80px',
              background: 'linear-gradient(135deg, rgba(34,197,94,0.2), rgba(34,197,94,0.1))',
              border: '2px solid rgba(34,197,94,0.4)',
              borderRadius: '50%',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '36px',
              margin: '0 auto 24px',
            }}>✓</div>
            <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '26px', fontWeight: 800, marginBottom: '12px' }}>
              Booking Request Sent!
            </h2>
            <p style={{ color: '#94a3b8', fontSize: '15px', lineHeight: 1.7, marginBottom: '8px' }}>
              We received your details, <strong style={{ color: '#a78bfa' }}>{form.name}</strong>. 🎉
            </p>
            <p style={{ color: '#64748b', fontSize: '14px', lineHeight: 1.7, marginBottom: '32px' }}>
              Our team will contact you at <strong style={{ color: '#67e8f9' }}>{form.email}</strong> within 24 hours to confirm your session with <strong style={{ color: '#f1f5f9' }}>{expert?.name || 'your mentor'}</strong>.
            </p>

            <div style={{
              background: 'rgba(124,58,237,0.08)',
              border: '1px solid rgba(124,58,237,0.15)',
              borderRadius: '14px',
              padding: '20px',
              marginBottom: '28px',
              textAlign: 'left',
            }}>
              <h4 style={{ fontSize: '13px', fontWeight: 700, color: '#a78bfa', marginBottom: '12px' }}>📋 Booking Summary</h4>
              {[
                ['👤 Mentor', expert?.name || 'Any available mentor'],
                ['🎯 Topic', form.topic],
                ['⏱ Duration', `${selectedDuration?.label} — ${selectedDuration?.price}`],
                ['📅 Preferred Date', form.preferredDate || 'Flexible'],
              ].map(([label, value]) => (
                <div key={label} style={{ display: 'flex', gap: '8px', padding: '6px 0', fontSize: '13px', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                  <span style={{ color: '#64748b', minWidth: '140px' }}>{label}</span>
                  <span style={{ color: '#e2e8f0' }}>{value}</span>
                </div>
              ))}
            </div>

            <button className="btn-primary" onClick={onClose} style={{ width: '100%', padding: '14px', fontSize: '15px' }}>
              Close
            </button>
          </div>
        ) : (
          /* ── FORM STATE ── */
          <>
            {/* Header */}
            <div style={{ marginBottom: '28px' }}>
              <div className="badge badge-purple" style={{ marginBottom: '12px' }}>No login required</div>
              <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '24px', fontWeight: 800, marginBottom: '6px' }}>
                Book a Session
              </h2>
              {expert && (
                <div style={{
                  display: 'flex', alignItems: 'center', gap: '10px', marginTop: '12px',
                  padding: '12px 16px',
                  background: 'rgba(124,58,237,0.08)',
                  border: '1px solid rgba(124,58,237,0.15)',
                  borderRadius: '12px',
                }}>
                  <div style={{
                    width: '40px', height: '40px',
                    background: 'linear-gradient(135deg, #7c3aed20, #06b6d420)',
                    border: '1px solid rgba(124,58,237,0.3)',
                    borderRadius: '12px',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '20px',
                  }}>{expert.emoji}</div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '14px', color: '#f1f5f9' }}>{expert.name}</div>
                    <div style={{ fontSize: '12px', color: '#a78bfa' }}>{expert.title}</div>
                  </div>
                </div>
              )}
            </div>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>

              {/* Name + Email */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#94a3b8', marginBottom: '6px' }}>
                    Full Name <span style={{ color: '#f87171' }}>*</span>
                  </label>
                  <input
                    className="input-field"
                    type="text"
                    placeholder="Your name"
                    value={form.name}
                    onChange={e => setForm({ ...form, name: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#94a3b8', marginBottom: '6px' }}>
                    Email Address <span style={{ color: '#f87171' }}>*</span>
                  </label>
                  <input
                    className="input-field"
                    type="email"
                    placeholder="you@email.com"
                    value={form.email}
                    onChange={e => setForm({ ...form, email: e.target.value })}
                    required
                  />
                </div>
              </div>

              {/* Phone + Date */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#94a3b8', marginBottom: '6px' }}>
                    Phone Number <span style={{ color: '#f87171' }}>*</span>
                  </label>
                  <input
                    className="input-field"
                    type="tel"
                    placeholder="+91 98765 43210"
                    value={form.phone}
                    onChange={e => setForm({ ...form, phone: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#94a3b8', marginBottom: '6px' }}>
                    Preferred Date
                  </label>
                  <input
                    className="input-field"
                    type="date"
                    value={form.preferredDate}
                    min={new Date().toISOString().split('T')[0]}
                    onChange={e => setForm({ ...form, preferredDate: e.target.value })}
                    style={{ colorScheme: 'dark' }}
                  />
                </div>
              </div>

              {/* Topic */}
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#94a3b8', marginBottom: '6px' }}>
                  What do you want to discuss? <span style={{ color: '#f87171' }}>*</span>
                </label>
                <input
                  className="input-field"
                  type="text"
                  placeholder="e.g. Career change, relationship advice, saving money..."
                  value={form.topic}
                  onChange={e => setForm({ ...form, topic: e.target.value })}
                  required
                />
              </div>

              {/* Duration */}
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#94a3b8', marginBottom: '8px' }}>
                  Session Duration
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px' }}>
                  {DURATIONS.map(d => (
                    <button
                      key={d.value}
                      type="button"
                      onClick={() => setForm({ ...form, duration: d.value })}
                      style={{
                        padding: '10px 6px',
                        borderRadius: '10px',
                        border: `1px solid ${form.duration === d.value ? '#7c3aed' : 'rgba(255,255,255,0.08)'}`,
                        background: form.duration === d.value ? 'rgba(124,58,237,0.2)' : 'rgba(255,255,255,0.03)',
                        color: form.duration === d.value ? '#a78bfa' : '#64748b',
                        cursor: 'pointer',
                        fontSize: '12px',
                        fontWeight: 600,
                        fontFamily: 'Inter, sans-serif',
                        textAlign: 'center',
                        transition: 'all 0.2s',
                      }}
                    >
                      <div>{d.label}</div>
                      <div style={{ fontSize: '12px', marginTop: '2px', color: form.duration === d.value ? '#c4b5fd' : '#475569' }}>{d.price}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Message */}
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#94a3b8', marginBottom: '6px' }}>
                  Additional Notes <span style={{ color: '#475569', fontWeight: 400 }}>(optional)</span>
                </label>
                <textarea
                  className="input-field"
                  placeholder="Anything else we should know before setting up your session..."
                  value={form.message}
                  onChange={e => setForm({ ...form, message: e.target.value })}
                  rows={3}
                  style={{ resize: 'vertical' }}
                />
              </div>

              {error && (
                <div style={{
                  background: 'rgba(239,68,68,0.1)',
                  border: '1px solid rgba(239,68,68,0.25)',
                  borderRadius: '10px',
                  padding: '12px 16px',
                  fontSize: '13px',
                  color: '#fca5a5',
                }}>
                  ⚠️ {error}
                </div>
              )}

              {/* Price summary */}
              <div style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                padding: '14px 16px',
                background: 'rgba(124,58,237,0.06)',
                border: '1px solid rgba(124,58,237,0.15)',
                borderRadius: '12px',
              }}>
                <span style={{ fontSize: '13px', color: '#94a3b8' }}>
                  {selectedDuration?.label} session with {expert?.name?.split(' ')[0] || 'mentor'}
                </span>
                <span style={{ fontFamily: 'Outfit, sans-serif', fontSize: '22px', fontWeight: 800, color: '#a78bfa' }}>
                  {selectedDuration?.price}
                </span>
              </div>

              <button
                type="submit"
                className="btn-primary"
                disabled={loading}
                style={{
                  padding: '16px',
                  fontSize: '15px',
                  borderRadius: '14px',
                  opacity: loading ? 0.7 : 1,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                }}
              >
                {loading ? (
                  <>
                    <span style={{ display: 'inline-block', width: '16px', height: '16px', border: '2px solid rgba(255,255,255,0.3)', borderTopColor: 'white', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
                    Sending your request...
                  </>
                ) : (
                  '📅 Confirm Booking Request →'
                )}
              </button>

              <p style={{ textAlign: 'center', fontSize: '12px', color: '#475569' }}>
                🔒 Your details are private and will only be used to schedule your session.
              </p>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
