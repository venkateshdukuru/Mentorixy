import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function RegisterPage() {
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'USER' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.password) return setError('All fields are required');
    if (form.password.length < 6) return setError('Password must be at least 6 characters');
    setError('');
    setLoading(true);
    try {
      await register(form.name, form.email, form.password, form.role);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.error || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '100px 24px 40px',
      position: 'relative',
    }}>
      <div className="orb orb-1" style={{ opacity: 0.1 }} />
      <div className="orb orb-2" style={{ opacity: 0.1 }} />

      <div className="glass-card" style={{
        width: '100%',
        maxWidth: '480px',
        padding: '48px',
        position: 'relative',
        zIndex: 1,
      }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div style={{
            width: '56px', height: '56px',
            background: 'linear-gradient(135deg, #7c3aed, #06b6d4)',
            borderRadius: '16px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '26px',
            margin: '0 auto 16px',
          }}>✦</div>
          <h1 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '28px', fontWeight: 800, marginBottom: '8px' }}>
            Create Account
          </h1>
          <p style={{ color: '#64748b', fontSize: '14px' }}>Join Mentorixy for free — unlock AI + human mentors</p>
        </div>

        {/* Role Selection */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '24px' }}>
          {['USER', 'EXPERT'].map(role => (
            <button
              key={role}
              type="button"
              onClick={() => setForm({ ...form, role })}
              style={{
                padding: '16px',
                borderRadius: '12px',
                border: `2px solid ${form.role === role ? '#7c3aed' : 'rgba(255,255,255,0.08)'}`,
                background: form.role === role ? 'rgba(124,58,237,0.15)' : 'rgba(255,255,255,0.03)',
                color: form.role === role ? '#a78bfa' : '#64748b',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: 600,
                fontFamily: 'Inter, sans-serif',
                transition: 'all 0.2s',
                textAlign: 'center',
              }}
            >
              {role === 'USER' ? '🎓 Learner' : '👨‍🏫 Expert'}
              <div style={{ fontSize: '11px', marginTop: '4px', opacity: 0.7 }}>
                {role === 'USER' ? 'Get mentored' : 'Mentor others'}
              </div>
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#94a3b8', marginBottom: '8px' }}>
              Full Name
            </label>
            <input
              id="name"
              type="text"
              value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })}
              placeholder="John Doe"
              className="input-field"
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#94a3b8', marginBottom: '8px' }}>
              Email Address
            </label>
            <input
              id="reg-email"
              type="email"
              value={form.email}
              onChange={e => setForm({ ...form, email: e.target.value })}
              placeholder="you@example.com"
              className="input-field"
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#94a3b8', marginBottom: '8px' }}>
              Password
            </label>
            <input
              id="reg-password"
              type="password"
              value={form.password}
              onChange={e => setForm({ ...form, password: e.target.value })}
              placeholder="Min. 6 characters"
              className="input-field"
            />
          </div>

          {error && (
            <div style={{
              background: 'rgba(239,68,68,0.1)',
              border: '1px solid rgba(239,68,68,0.3)',
              borderRadius: '10px',
              padding: '12px 16px',
              fontSize: '13px',
              color: '#fca5a5',
            }}>
              ⚠️ {error}
            </div>
          )}

          <button
            id="register-btn"
            type="submit"
            className="btn-primary"
            disabled={loading}
            style={{ marginTop: '8px', padding: '14px', fontSize: '15px', opacity: loading ? 0.7 : 1 }}
          >
            {loading ? 'Creating account...' : 'Create Account →'}
          </button>
        </form>

        <div style={{
          textAlign: 'center',
          marginTop: '32px',
          padding: '20px 0 0',
          borderTop: '1px solid rgba(255,255,255,0.06)',
          fontSize: '14px',
          color: '#64748b',
        }}>
          Already have an account?{' '}
          <Link to="/login" style={{ color: '#a78bfa', fontWeight: 600, textDecoration: 'none' }}>
            Sign In →
          </Link>
        </div>
      </div>
    </div>
  );
}
