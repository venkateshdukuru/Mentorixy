import { Link } from 'react-router-dom';

export default function HeroSection() {
  return (
    <section style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      padding: '120px 24px 80px',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Animated gradient bg */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(ellipse 80% 50% at 50% -20%, rgba(124,58,237,0.25) 0%, transparent 60%)',
        pointerEvents: 'none',
      }} />

      {/* Badge */}
      <div style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px',
        background: 'rgba(124,58,237,0.12)',
        border: '1px solid rgba(124,58,237,0.25)',
        borderRadius: '100px',
        padding: '8px 20px',
        marginBottom: '32px',
        fontSize: '13px',
        fontWeight: 600,
        color: '#a78bfa',
        animation: 'float 4s ease-in-out infinite',
      }}>
        <span style={{ fontSize: '10px' }}>✦</span>
        Life, Career & Personal Growth Mentorship
        <span style={{ fontSize: '10px' }}>✦</span>
      </div>

      {/* Headline */}
      <h1 style={{
        fontFamily: 'Outfit, sans-serif',
        fontSize: 'clamp(48px, 8vw, 88px)',
        fontWeight: 800,
        lineHeight: 1.05,
        marginBottom: '24px',
        maxWidth: '900px',
      }}>
        Guidance for Every
        <br /><span className="gradient-text">Chapter of Life</span>
      </h1>

      <p style={{
        fontSize: 'clamp(16px, 2vw, 20px)',
        color: '#94a3b8',
        maxWidth: '580px',
        lineHeight: 1.7,
        marginBottom: '48px',
      }}>
        Whether it's a career pivot, relationship challenge, financial decision,
        parenting question, or life crossroads — get instant AI guidance and
        connect with real human mentors who've been there.
      </p>

      {/* CTA Buttons */}
      <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '80px' }}>
        <Link to="/chat">
          <button className="btn-primary" style={{ fontSize: '16px', padding: '16px 36px', borderRadius: '14px' }}>
            💬 Talk to MentorAI Free
          </button>
        </Link>
        <Link to="/experts">
          <button className="btn-secondary" style={{ fontSize: '16px', padding: '16px 36px', borderRadius: '14px' }}>
            Find a Human Mentor →
          </button>
        </Link>
      </div>

      {/* Stats */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '32px',
        maxWidth: '600px',
        width: '100%',
      }}>
        {[
          { number: '25K+', label: 'Lives Guided' },
          { number: '800+', label: 'Human Mentors' },
          { number: '98%', label: 'Satisfaction Rate' },
        ].map((stat, i) => (
          <div key={i} style={{ textAlign: 'center' }}>
            <div style={{
              fontFamily: 'Outfit, sans-serif',
              fontSize: '36px',
              fontWeight: 800,
              background: 'linear-gradient(135deg, #a78bfa, #06b6d4)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>{stat.number}</div>
            <div style={{ fontSize: '13px', color: '#64748b', marginTop: '4px' }}>{stat.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
