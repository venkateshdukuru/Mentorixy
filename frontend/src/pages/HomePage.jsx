import HeroSection from '../components/HeroSection';
import ExpertCard, { MOCK_EXPERTS } from '../components/ExpertCard';
import { Link } from 'react-router-dom';

const features = [
  { icon: '💬', title: 'AI Guidance 24/7', desc: 'Get thoughtful, instant AI answers on any life situation — career, love, money, health, or just feeling lost.', gradient: 'from-purple to-violet' },
  { icon: '🤝', title: 'Human Mentors', desc: 'Book 1-on-1 sessions with verified life coaches, career counsellors, financial advisors, and therapists.', gradient: 'from-cyan to-blue' },
  { icon: '❓', title: 'Community Q&A', desc: 'Ask real questions, get answers from people who\'ve lived through the same challenges. No judgement.', gradient: 'from-amber to-orange' },
  { icon: '📅', title: 'Flexible Sessions', desc: 'Schedule sessions that work for you — quick 30-min check-ins or deep-dive half-day sessions.', gradient: 'from-green to-emerald' },
];

const categories = [
  '💼 Career & Jobs',
  '💔 Relationships',
  '💰 Money & Finance',
  '🎓 Education',
  '🧠 Mental Health',
  '👨‍👩‍👧 Parenting',
  '🌍 Moving Abroad',
  '📊 Business',
  '❤️ Health & Wellness',
  '🏠 Life Decisions',
];

export default function HomePage() {
  return (
    <div style={{ position: 'relative' }}>
      {/* Background orbs */}
      <div className="orb orb-1" />
      <div className="orb orb-2" />
      <div className="orb orb-3" />

      {/* Hero */}
      <HeroSection />

      {/* Features */}
      <section style={{ padding: '80px 24px', position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <div className="badge badge-purple" style={{ marginBottom: '16px' }}>Platform Features</div>
            <h2 style={{
              fontFamily: 'Outfit, sans-serif',
              fontSize: 'clamp(32px, 5vw, 52px)',
              fontWeight: 800,
              marginBottom: '16px',
            }}>
              Everything You Need to <span className="gradient-text">Navigate Life</span>
            </h2>
            <p style={{ color: '#64748b', fontSize: '18px', maxWidth: '540px', margin: '0 auto' }}>
              From career crossroads to relationship struggles — real guidance for every stage of life.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '24px',
          }}>
            {features.map((f, i) => (
              <div key={i} className="glass-card" style={{ padding: '32px' }}>
                <div style={{
                  width: '56px', height: '56px',
                  background: 'rgba(124,58,237,0.15)',
                  borderRadius: '16px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '26px',
                  marginBottom: '20px',
                }}>
                  {f.icon}
                </div>
                <h3 style={{ fontWeight: 700, fontSize: '18px', marginBottom: '10px' }}>{f.title}</h3>
                <p style={{ color: '#64748b', fontSize: '14px', lineHeight: 1.7 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section style={{ padding: '40px 24px', position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h3 style={{ textAlign: 'center', fontSize: '20px', fontWeight: 600, color: '#94a3b8', marginBottom: '32px' }}>
            Guidance for Every Area of Life
          </h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', justifyContent: 'center' }}>
            {categories.map((c, i) => (
              <Link key={i} to={`/experts?skill=${encodeURIComponent(c)}`} style={{ textDecoration: 'none' }}>
                <div style={{
                  padding: '12px 24px',
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: '100px',
                  fontSize: '14px',
                  color: '#94a3b8',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  fontWeight: 500,
                }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = 'rgba(124,58,237,0.1)';
                    e.currentTarget.style.borderColor = 'rgba(124,58,237,0.3)';
                    e.currentTarget.style.color = '#a78bfa';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.04)';
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
                    e.currentTarget.style.color = '#94a3b8';
                  }}
                >{c}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Experts */}
      <section style={{ padding: '80px 24px', position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px', flexWrap: 'wrap', gap: '16px' }}>
            <div>
              <div className="badge badge-cyan" style={{ marginBottom: '12px' }}>Top Rated</div>
              <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '36px', fontWeight: 800 }}>
                Featured <span className="gradient-text">Mentors</span>
              </h2>
            </div>
            <Link to="/experts">
              <button className="btn-secondary">View All Mentors →</button>
            </Link>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '24px'
          }}>
            {MOCK_EXPERTS.slice(0, 3).map(expert => (
              <ExpertCard key={expert._id} expert={expert} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section style={{ padding: '80px 24px', position: 'relative', zIndex: 1 }}>
        <div style={{
          maxWidth: '900px',
          margin: '0 auto',
          background: 'linear-gradient(135deg, rgba(124,58,237,0.2) 0%, rgba(6,182,212,0.1) 100%)',
          border: '1px solid rgba(124,58,237,0.2)',
          borderRadius: '28px',
          padding: '64px 48px',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}>
          <div style={{
            position: 'absolute', inset: 0,
            background: 'radial-gradient(ellipse at center, rgba(124,58,237,0.1) 0%, transparent 70%)',
            pointerEvents: 'none',
          }} />
          <h2 style={{
            fontFamily: 'Outfit, sans-serif',
            fontSize: 'clamp(28px, 4vw, 44px)',
            fontWeight: 800,
            marginBottom: '16px',
          }}>
            Start Your <span className="gradient-text">Journey</span> Today
          </h2>
          <p style={{ color: '#94a3b8', fontSize: '18px', marginBottom: '40px', maxWidth: '520px', margin: '0 auto 40px' }}>
            Whatever chapter of life you’re in, you don’t have to figure it out alone.
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/register">
              <button className="btn-primary" style={{ fontSize: '16px', padding: '16px 40px' }}>
                Join for Free →
              </button>
            </Link>
            <Link to="/chat">
              <button className="btn-secondary" style={{ fontSize: '16px', padding: '16px 40px' }}>
                💬 Talk to MentorAI
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        borderTop: '1px solid rgba(255,255,255,0.06)',
        padding: '40px 24px',
        textAlign: 'center',
        color: '#475569',
        fontSize: '14px',
        position: 'relative', zIndex: 1,
      }}>
        <div style={{
          fontFamily: 'Outfit, sans-serif',
          fontWeight: 700,
          fontSize: '20px',
          background: 'linear-gradient(135deg, #a78bfa, #7c3aed)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          marginBottom: '12px',
        }}>Mentorixy</div>
        <p>© 2025 Mentorixy. AI + Human Mentorship Platform.</p>
      </footer>
    </div>
  );
}
