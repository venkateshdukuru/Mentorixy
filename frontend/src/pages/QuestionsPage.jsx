import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const CATEGORIES = ['All', 'Career', 'Relationships', 'Finance', 'Education', 'Mental Health', 'Parenting', 'Business', 'Life'];
const MOCK_QUESTIONS = [
  {
    _id: 'q1',
    title: 'My husband and I keep fighting about money. How do we fix this?',
    description: 'We are both working but have very different spending habits. The arguments are getting worse and affecting our relationship. How do other couples handle this?',
    category: 'Relationships',
    authorName: 'worried_wife_87',
    answers: [{ isAI: true }, { isAI: false }],
    views: 1243,
    status: 'answered',
    tags: ['marriage', 'money', 'communication'],
    createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000),
  },
  {
    _id: 'q2',
    title: 'I hate my job but am scared to quit. What do I do?',
    description: 'I have been in the same role for 6 years. I dread Mondays. But I have EMI and family responsibilities. How do people take the leap without losing everything?',
    category: 'Career',
    authorName: 'trapped_at_35',
    answers: [{ isAI: true }, { isAI: false }, { isAI: false }],
    views: 3412,
    status: 'answered',
    tags: ['career-change', 'fear', 'job'],
    createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000),
  },
  {
    _id: 'q3',
    title: 'How do I start saving money when I earn very little?',
    description: 'My salary is ₹22,000/month and after rent and food I barely have anything left. Is it even possible to save? Where do I start?',
    category: 'Finance',
    authorName: 'first_job_guy',
    answers: [{ isAI: true }],
    views: 892,
    status: 'answered',
    tags: ['savings', 'budget', 'low-income'],
    createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000),
  },
  {
    _id: 'q4',
    title: 'My teenage daughter doesn\'t talk to me anymore. Help.',
    description: 'She used to be so open. Since turning 15 she shut down completely. Every conversation becomes an argument. I\'m scared of losing her.',
    category: 'Parenting',
    authorName: 'concerned_dad',
    answers: [],
    views: 456,
    status: 'open',
    tags: ['parenting', 'teenagers', 'communication'],
    createdAt: new Date(Date.now() - 30 * 60 * 1000),
  },
  {
    _id: 'q5',
    title: 'Feeling completely burned out. Is this normal?',
    description: 'I\'ve been working non-stop for 2 years. Now I feel nothing. No excitement, no motivation, just emptiness. My doctor says I\'m physically fine but something is very wrong.',
    category: 'Mental Health',
    authorName: 'empty_inside',
    answers: [{ isAI: true }, { isAI: false }],
    views: 2187,
    status: 'answered',
    tags: ['burnout', 'mental-health', 'exhaustion'],
    createdAt: new Date(Date.now() - 8 * 60 * 60 * 1000),
  },
];

function timeAgo(date) {
  const diff = (Date.now() - new Date(date)) / 1000;
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
}

export default function QuestionsPage() {
  const { user } = useAuth();
  const [questions, setQuestions] = useState(MOCK_QUESTIONS);
  const [category, setCategory] = useState('All');
  const [showAsk, setShowAsk] = useState(false);
  const [form, setForm] = useState({ title: '', description: '', category: 'Career', tags: '' });
  const [submitting, setSubmitting] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    if (!user) return alert('Please sign in to ask a question');
    setSubmitting(true);
    try {
      await axios.post('/api/questions', {
        ...form,
        tags: form.tags.split(',').map(t => t.trim()).filter(Boolean)
      });
      setShowAsk(false);
      setForm({ title: '', description: '', category: 'Career', tags: '' });
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  const filtered = category === 'All' ? questions : questions.filter(q => q.category === category);

  return (
    <div style={{ minHeight: '100vh', paddingTop: '72px' }}>
      <div className="orb orb-2" style={{ opacity: 0.06 }} />
      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '48px 24px' }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '40px', flexWrap: 'wrap', gap: '20px' }}>
          <div>
            <div className="badge badge-amber" style={{ marginBottom: '16px' }}>Q&A Forum</div>
            <h1 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 800 }}>
              Community <span className="gradient-text">Conversations</span>
            </h1>
            <p style={{ fontSize: '15px', color: '#64748b', marginTop: '8px' }}>Real questions from real people. AI answers instantly. Human mentors go deeper.</p>
          </div>
          <button className="btn-primary" onClick={() => setShowAsk(true)} style={{ padding: '12px 28px' }}>
            + Share Your Situation
          </button>
        </div>

        {/* Ask Modal */}
        {showAsk && (
          <div style={{
            position: 'fixed', inset: 0, zIndex: 2000,
            background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(10px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: '24px',
          }}>
            <div className="glass-card" style={{ width: '100%', maxWidth: '600px', padding: '40px', position: 'relative' }}>
              <button onClick={() => setShowAsk(false)} style={{
                position: 'absolute', top: '16px', right: '16px',
                background: 'none', border: 'none', color: '#64748b', cursor: 'pointer', fontSize: '20px'
              }}>✕</button>
              <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '24px', fontWeight: 700, marginBottom: '8px' }}>
                Share What's On Your Mind
              </h2>
              <p style={{ fontSize: '13px', color: '#64748b', marginBottom: '24px' }}>No judgement here. Our community and AI mentors are here to help.</p>
              <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <input
                  className="input-field"
                  placeholder="What's your situation or question? Be as open as you want."
                  value={form.title}
                  onChange={e => setForm({ ...form, title: e.target.value })}
                  required
                />
                <textarea
                  className="input-field"
                  placeholder="Give more context — the more you share, the better the guidance."
                  value={form.description}
                  onChange={e => setForm({ ...form, description: e.target.value })}
                  rows={4}
                  required
                  style={{ resize: 'vertical' }}
                />
                <select
                  className="input-field"
                  value={form.category}
                  onChange={e => setForm({ ...form, category: e.target.value })}
                  style={{ cursor: 'pointer' }}
                >
                  {['Career', 'Relationships', 'Finance', 'Education', 'Mental Health', 'Parenting', 'Business', 'Life', 'Other'].map(c => (
                    <option key={c} value={c} style={{ background: '#111118' }}>{c}</option>
                  ))}
                </select>
                <input
                  className="input-field"
                  placeholder="Tags: e.g. marriage, savings, career-change"
                  value={form.tags}
                  onChange={e => setForm({ ...form, tags: e.target.value })}
                />
                <div style={{ display: 'flex', gap: '12px' }}>
                  <button type="submit" className="btn-primary" disabled={submitting} style={{ flex: 1, padding: '14px' }}>
                    {submitting ? 'Submitting...' : 'Post Question'}
                  </button>
                  <button type="button" className="btn-secondary" onClick={() => setShowAsk(false)} style={{ padding: '14px 24px' }}>
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Category Filter */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '32px' }}>
          {CATEGORIES.map(c => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              style={{
                padding: '7px 16px',
                borderRadius: '100px',
                border: `1px solid ${category === c ? '#f59e0b' : 'rgba(255,255,255,0.08)'}`,
                background: category === c ? 'rgba(245,158,11,0.15)' : 'rgba(255,255,255,0.03)',
                color: category === c ? '#fcd34d' : '#64748b',
                cursor: 'pointer',
                fontSize: '13px',
                fontWeight: 500,
                fontFamily: 'Inter, sans-serif',
                transition: 'all 0.2s',
              }}
            >{c}</button>
          ))}
        </div>

        {/* Questions List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {filtered.map(q => (
            <div key={q._id} className="glass-card" style={{ padding: '28px', cursor: 'pointer' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '16px', flexWrap: 'wrap' }}>
                <div style={{ flex: 1 }}>
                  {/* Status + Category */}
                  <div style={{ display: 'flex', gap: '8px', marginBottom: '12px', flexWrap: 'wrap' }}>
                    <span className={`badge ${q.status === 'answered' ? 'badge-green' : 'badge-amber'}`}>
                      {q.status === 'answered' ? '✓ Answered' : '○ Open'}
                    </span>
                    <span className="badge badge-purple">{q.category}</span>
                  </div>

                  <h3 style={{ fontSize: '17px', fontWeight: 700, color: '#f1f5f9', marginBottom: '8px', lineHeight: 1.4 }}>
                    {q.title}
                  </h3>
                  <p style={{ fontSize: '13px', color: '#64748b', lineHeight: 1.6, marginBottom: '16px' }}>
                    {q.description.slice(0, 160)}...
                  </p>

                  {/* Tags */}
                  <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '16px' }}>
                    {q.tags?.map(t => (
                      <span key={t} style={{
                        fontSize: '11px', padding: '3px 10px',
                        background: 'rgba(255,255,255,0.05)',
                        border: '1px solid rgba(255,255,255,0.08)',
                        borderRadius: '6px', color: '#94a3b8',
                      }}>#{t}</span>
                    ))}
                  </div>

                  {/* Meta */}
                  <div style={{ display: 'flex', gap: '20px', fontSize: '12px', color: '#475569' }}>
                    <span>👤 {q.authorName}</span>
                    <span>💬 {q.answers.length} answer{q.answers.length !== 1 ? 's' : ''}</span>
                    <span>👁 {q.views} views</span>
                    <span>🕐 {timeAgo(q.createdAt)}</span>
                  </div>
                </div>

                {/* Answer count circle */}
                <div style={{
                  width: '60px', height: '60px',
                  borderRadius: '50%',
                  background: q.answers.length > 0 ? 'rgba(34,197,94,0.1)' : 'rgba(255,255,255,0.05)',
                  border: `2px solid ${q.answers.length > 0 ? 'rgba(34,197,94,0.3)' : 'rgba(255,255,255,0.08)'}`,
                  display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  <span style={{ fontSize: '18px', fontWeight: 700, color: q.answers.length > 0 ? '#86efac' : '#475569' }}>
                    {q.answers.length}
                  </span>
                  <span style={{ fontSize: '10px', color: '#475569' }}>ans</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div style={{ textAlign: 'center', padding: '80px 24px' }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>❓</div>
            <h3 style={{ fontSize: '20px', fontWeight: 600, color: '#64748b' }}>No questions in this category yet</h3>
            <p style={{ color: '#475569', marginTop: '8px' }}>Be the first to ask!</p>
          </div>
        )}
      </div>
    </div>
  );
}
