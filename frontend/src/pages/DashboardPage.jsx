import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const QUICK_ACTIONS = [
  { icon: '🤖', title: 'AI Chat', desc: 'Get instant AI answers', to: '/chat', badge: 'New', color: '#7c3aed' },
  { icon: '❓', title: 'Ask Question', desc: 'Post to the community', to: '/questions', badge: null, color: '#06b6d4' },
  { icon: '👨‍🏫', title: 'Find Mentor', desc: 'Browse expert profiles', to: '/experts', badge: null, color: '#f59e0b' },
  { icon: '📅', title: 'My Sessions', desc: 'View booked sessions', to: '/dashboard', badge: null, color: '#22c55e' },
];

const RECENT_ACTIVITY = [
  { type: 'chat', text: 'Asked MentorAI about career transitions', time: '2h ago', icon: '🤖' },
  { type: 'question', text: 'Your question received 2 answers', time: '5h ago', icon: '💬' },
  { type: 'session', text: 'Session with Dr. Sarah Chen confirmed', time: '1d ago', icon: '📅' },
];

export default function DashboardPage() {
  const { user } = useAuth();

  return (
    <div style={{ minHeight: '100vh', paddingTop: '72px' }}>
      <div className="orb orb-1" style={{ opacity: 0.06 }} />
      <div className="orb orb-2" style={{ opacity: 0.06 }} />
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '48px 24px', position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <div style={{ marginBottom: '48px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '8px' }}>
            <div style={{
              width: '56px', height: '56px',
              background: 'linear-gradient(135deg, #7c3aed, #06b6d4)',
              borderRadius: '16px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '24px', fontWeight: 700, color: 'white',
            }}>
              {user?.name?.[0]?.toUpperCase() || '?'}
            </div>
            <div>
              <p style={{ fontSize: '14px', color: '#64748b', marginBottom: '4px' }}>Welcome back 👋</p>
              <h1 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '28px', fontWeight: 800 }}>
                {user?.name || user?.email?.split('@')[0] || 'Learner'}
              </h1>
            </div>
            <div className={`badge ${user?.role === 'EXPERT' ? 'badge-amber' : 'badge-purple'}`} style={{ marginLeft: 'auto' }}>
              {user?.role === 'EXPERT' ? '👨‍🏫 Expert' : '🎓 Learner'}
            </div>
          </div>
        </div>

        {/* Stats */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '20px',
          marginBottom: '48px',
        }}>
          {[
            { label: 'AI Chats', value: '12', icon: '🤖', color: '#7c3aed' },
            { label: 'Questions Asked', value: '3', icon: '❓', color: '#06b6d4' },
            { label: 'Sessions Booked', value: '1', icon: '📅', color: '#f59e0b' },
            { label: 'Mentors Consulted', value: '2', icon: '👨‍🏫', color: '#22c55e' },
          ].map((stat, i) => (
            <div key={i} className="glass-card" style={{ padding: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <p style={{ fontSize: '13px', color: '#64748b', marginBottom: '8px' }}>{stat.label}</p>
                  <p style={{ fontFamily: 'Outfit, sans-serif', fontSize: '36px', fontWeight: 800, color: '#f1f5f9' }}>{stat.value}</p>
                </div>
                <div style={{
                  width: '44px', height: '44px',
                  background: `${stat.color}20`,
                  borderRadius: '12px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '20px',
                }}>
                  {stat.icon}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: '28px', flexWrap: 'wrap' }}>
          {/* Quick Actions */}
          <div>
            <h2 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '20px', color: '#e2e8f0' }}>
              Quick Actions
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
              {QUICK_ACTIONS.map((action, i) => (
                <Link key={i} to={action.to} style={{ textDecoration: 'none' }}>
                  <div className="glass-card" style={{ padding: '24px', cursor: 'pointer', position: 'relative' }}>
                    {action.badge && (
                      <div className="badge badge-purple" style={{ position: 'absolute', top: '12px', right: '12px', fontSize: '10px' }}>
                        {action.badge}
                      </div>
                    )}
                    <div style={{
                      width: '44px', height: '44px',
                      background: `${action.color}20`,
                      borderRadius: '12px',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '20px',
                      marginBottom: '12px',
                    }}>{action.icon}</div>
                    <h3 style={{ fontWeight: 700, fontSize: '15px', marginBottom: '6px' }}>{action.title}</h3>
                    <p style={{ fontSize: '12px', color: '#64748b' }}>{action.desc}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Activity Feed */}
          <div>
            <h2 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '20px', color: '#e2e8f0' }}>
              Recent Activity
            </h2>
            <div className="glass-card" style={{ padding: '24px' }}>
              {RECENT_ACTIVITY.map((activity, i) => (
                <div key={i} style={{
                  display: 'flex',
                  gap: '12px',
                  padding: '14px 0',
                  borderBottom: i < RECENT_ACTIVITY.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none',
                }}>
                  <div style={{
                    width: '36px', height: '36px',
                    background: 'rgba(124,58,237,0.1)',
                    borderRadius: '10px',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '16px', flexShrink: 0,
                  }}>{activity.icon}</div>
                  <div>
                    <p style={{ fontSize: '13px', color: '#cbd5e1', lineHeight: 1.5 }}>{activity.text}</p>
                    <p style={{ fontSize: '11px', color: '#475569', marginTop: '4px' }}>{activity.time}</p>
                  </div>
                </div>
              ))}

              <Link to="/chat" style={{ textDecoration: 'none' }}>
                <button className="btn-primary" style={{ width: '100%', marginTop: '20px', padding: '12px' }}>
                  🤖 Start AI Chat Session
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
