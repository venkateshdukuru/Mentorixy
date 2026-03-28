import ChatBot from '../components/ChatBot';

export default function ChatPage() {
  return (
    <div style={{
      minHeight: '100vh',
      paddingTop: '72px',
      display: 'flex',
      flexDirection: 'column',
    }}>
      <div style={{
        flex: 1,
        display: 'grid',
        gridTemplateColumns: '280px 1fr',
        maxWidth: '1200px',
        margin: '0 auto',
        width: '100%',
        gap: '0',
      }}>
        {/* Sidebar */}
        <aside style={{
          padding: '32px 24px',
          borderRight: '1px solid rgba(255,255,255,0.06)',
          display: 'flex',
          flexDirection: 'column',
          gap: '24px',
        }}>
          <div>
            <div style={{
              width: '48px', height: '48px',
              background: 'linear-gradient(135deg, #7c3aed, #06b6d4)',
              borderRadius: '14px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '22px',
              marginBottom: '16px',
              boxShadow: '0 0 20px rgba(124,58,237,0.4)',
            }}>💬</div>
            <h1 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '22px', fontWeight: 800, marginBottom: '8px' }}>
              MentorAI — Your Life Guide
            </h1>
            <p style={{ fontSize: '13px', color: '#64748b', lineHeight: 1.6 }}>
              Your personal AI mentor for life, career & relationships. Always online, never judges.
            </p>
          </div>

          <div style={{
            background: 'rgba(124,58,237,0.08)',
            border: '1px solid rgba(124,58,237,0.15)',
            borderRadius: '14px',
            padding: '20px',
          }}>
            <h4 style={{ fontSize: '13px', fontWeight: 700, color: '#a78bfa', marginBottom: '12px' }}>
              💡 What I can help with
            </h4>
            {[
              '💼 Career changes & job advice',
              '💔 Relationships & heartbreak',
              '💰 Money, savings & finance',
              '🎓 Education & college decisions',
              '🧠 Mental health & burnout',
              '👩‍👧 Parenting & family life',
              '🌍 Moving abroad & big changes',
              '📊 Business & startup advice',
            ].map((item, i) => (
              <div key={i} style={{ fontSize: '12px', color: '#94a3b8', padding: '6px 0', borderBottom: i < 7 ? '1px solid rgba(255,255,255,0.04)' : 'none' }}>
                {item}
              </div>
            ))}
          </div>

          <div style={{
            background: 'rgba(6,182,212,0.08)',
            border: '1px solid rgba(6,182,212,0.15)',
            borderRadius: '14px',
            padding: '16px',
            fontSize: '12px',
            color: '#67e8f9',
          }}>
            <strong>Life is messy.</strong> Share the full picture — the more honest you are, the better the guidance I can give you.
          </div>
        </aside>

        {/* Chat Area */}
        <main style={{
          display: 'flex',
          flexDirection: 'column',
          height: 'calc(100vh - 72px)',
          overflow: 'hidden',
        }}>
          <ChatBot />
        </main>
      </div>
    </div>
  );
}
