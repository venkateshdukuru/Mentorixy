import { useState, useRef, useEffect } from 'react';
import Groq from 'groq-sdk';

const SYSTEM_PROMPT = `You are MentorAI, a warm, empathetic, and highly experienced life and career mentor on the Mentorixy platform.

You help people navigate ALL areas of life, not just technology:
- Career changes, job loss, interviews, salary negotiation, workplace conflicts
- Relationships: marriage issues, breakups, family conflicts, loneliness, divorce
- Financial guidance: saving, budgeting, debt, first salary, investments basics
- Education: college choices, study struggles, whether to quit/continue
- Mental health: burnout, anxiety, feeling lost, lack of motivation, grief
- Parenting: toddler challenges, teenage issues, school pressure, work-life balance
- Life transitions: moving abroad, starting over, retirement, mid-life confusion
- Personal growth: confidence, habits, purpose, relationships with self

Your tone is:
- Warm and human — like a trusted older friend or wise counsellor
- Non-judgmental — people share vulnerable things, honour that
- Practical — give real, actionable advice, not vague platitudes
- Honest — gently challenge unhelpful thinking when needed
- Concise — be direct, don't ramble. Use bullet points when helpful.

Never recommend self-harm or dangerous actions. Always suggest professional help for serious mental health concerns.`;

function TypingIndicator() {
  return (
    <div style={{ display: 'flex', gap: '5px', alignItems: 'center', padding: '4px 0' }}>
      {[1, 2, 3].map(i => (
        <div key={i} className="typing-dot" style={{
          width: '8px', height: '8px',
          background: '#a78bfa',
          borderRadius: '50%',
        }} />
      ))}
    </div>
  );
}

export default function ChatBot() {
  const [chat, setChat] = useState([
    {
      role: 'bot',
      text: "Hi! I'm **MentorAI** 💬 — your personal life & career guide on Mentorixy.\n\nI can help with **anything** life throws at you:\n\n💼 Career & job decisions  👩‍👧 Parenting & family challenges\n💰 Money & financial planning  💔 Relationships & heartbreak\n🎓 Education & college choices  🧠 Mental health & stress\n📊 Business & startup ideas  🌍 Moving abroad & life changes\n\nWhat's going on in your life? I'm here to listen and guide you."
    }
  ]);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  useEffect(scrollToBottom, [chat]);

  const formatText = (text) => {
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/`(.*?)`/g, '<code style="background:rgba(124,58,237,0.2);padding:2px 6px;border-radius:4px;font-family:monospace;font-size:12px;">$1</code>')
      .replace(/\n/g, '<br/>');
  };

  const send = async () => {
    if (!message.trim() || loading) return;

    const userMsg = message.trim();
    setMessage('');
    setChat(prev => [...prev, { role: 'user', text: userMsg }]);
    setLoading(true);

    try {
      const apiKey = import.meta.env.VITE_GROQ_API_KEY;
      if (!apiKey) throw new Error('VITE_GROQ_API_KEY not set in frontend/.env');

      const groq = new Groq({ apiKey, dangerouslyAllowBrowser: true });

      // Build OpenAI-style messages array
      const messages = [
        { role: 'system', content: SYSTEM_PROMPT },
        // Include last 6 messages as history
        ...chat.slice(-6).map(m => ({
          role: m.role === 'user' ? 'user' : 'assistant',
          content: m.text,
        })),
        { role: 'user', content: userMsg },
      ];

      const completion = await groq.chat.completions.create({
        model: 'llama-3.3-70b-versatile',
        messages,
        max_tokens: 1024,
        temperature: 0.7,
      });

      const reply = completion.choices[0]?.message?.content || 'Sorry, I could not generate a response.';
      setChat(prev => [...prev, { role: 'bot', text: reply }]);

    } catch (err) {
      console.error('Groq error:', err);
      setChat(prev => [...prev, {
        role: 'bot',
        text: `⚠️ AI is unavailable right now. Error: ${err.message}\n\nPlease check that **VITE_GROQ_API_KEY** is set in \`frontend/.env\`.`,
      }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  const suggestions = [
    '💼 How do I change careers at 35?',
    '💔 Going through a breakup, what do I do?',
    '💰 How to start saving money?',
    '🎓 Should I do a Master’s degree?',
    '🧠 I feel burned out and lost',
    '👩‍👧 Balancing work and parenting',
  ];

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      maxWidth: '800px',
      margin: '0 auto',
      width: '100%',
    }}>
      {/* Chat Header */}
      <div style={{
        padding: '20px 24px',
        borderBottom: '1px solid rgba(255,255,255,0.08)',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
      }}>
        <div style={{
          width: '48px', height: '48px',
          background: 'linear-gradient(135deg, #7c3aed, #06b6d4)',
          borderRadius: '14px',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '22px',
          boxShadow: '0 0 20px rgba(124,58,237,0.4)',
          animation: 'pulse-glow 3s ease-in-out infinite',
        }}>🤖</div>
        <div>
          <h3 style={{ fontWeight: 700, fontSize: '18px', color: '#f1f5f9' }}>MentorAI</h3>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <div style={{ width: '8px', height: '8px', background: '#22c55e', borderRadius: '50%', animation: 'pulse-glow 2s infinite' }} />
            <span style={{ fontSize: '12px', color: '#64748b' }}>Powered by  Dukuru Venkatesh• Always online</span>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div style={{
        flex: 1,
        overflowY: 'auto',
        padding: '24px',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
      }}>
        {chat.map((m, i) => (
          <div key={i}
            className={m.role === 'user' ? 'chat-message-user' : 'chat-message-bot'}
            style={{
              display: 'flex',
              justifyContent: m.role === 'user' ? 'flex-end' : 'flex-start',
            }}
          >
            {m.role === 'bot' && (
              <div style={{
                width: '32px', height: '32px',
                background: 'linear-gradient(135deg, #7c3aed, #06b6d4)',
                borderRadius: '10px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '14px', marginRight: '10px', flexShrink: 0,
              }}>🤖</div>
            )}
            <div style={{
              maxWidth: '75%',
              padding: '14px 18px',
              borderRadius: m.role === 'user' ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
              background: m.role === 'user'
                ? 'linear-gradient(135deg, #7c3aed, #5b21b6)'
                : 'rgba(255,255,255,0.06)',
              border: m.role === 'user'
                ? 'none'
                : '1px solid rgba(255,255,255,0.08)',
              fontSize: '14px',
              lineHeight: 1.7,
              color: '#f1f5f9',
            }}>
              <span dangerouslySetInnerHTML={{ __html: formatText(m.text) }} />
            </div>
          </div>
        ))}

        {loading && (
          <div className="chat-message-bot" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '32px', height: '32px',
              background: 'linear-gradient(135deg, #7c3aed, #06b6d4)',
              borderRadius: '10px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '14px',
            }}>🤖</div>
            <div style={{
              padding: '14px 18px',
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '18px 18px 18px 4px',
            }}>
              <TypingIndicator />
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Suggestions */}
      {chat.length === 1 && (
        <div style={{ padding: '0 24px 16px', display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {suggestions.map((s, i) => (
            <button key={i} onClick={() => setMessage(s)} style={{
              background: 'rgba(124,58,237,0.1)',
              border: '1px solid rgba(124,58,237,0.2)',
              borderRadius: '20px',
              padding: '6px 14px',
              fontSize: '12px',
              color: '#a78bfa',
              cursor: 'pointer',
              transition: 'all 0.2s',
              fontFamily: 'Inter, sans-serif',
            }}>{s}</button>
          ))}
        </div>
      )}

      {/* Input */}
      <div style={{
        padding: '16px 24px',
        borderTop: '1px solid rgba(255,255,255,0.08)',
        display: 'flex',
        gap: '12px',
        alignItems: 'flex-end',
      }}>
        <textarea
          className="input-field"
          value={message}
          onChange={e => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask anything — career, tech, education, life..."
          rows={1}
          style={{
            resize: 'none',
            borderRadius: '14px',
            minHeight: '48px',
            maxHeight: '120px',
            overflow: 'auto',
          }}
        />
        <button
          onClick={send}
          disabled={!message.trim() || loading}
          className="btn-primary"
          style={{
            padding: '14px 24px',
            borderRadius: '14px',
            flexShrink: 0,
            opacity: (!message.trim() || loading) ? 0.5 : 1,
            cursor: (!message.trim() || loading) ? 'not-allowed' : 'pointer',
            display: 'flex', alignItems: 'center', gap: '8px',
          }}
        >
          {loading ? '...' : '↑'} Send
        </button>
      </div>
    </div>
  );
}
