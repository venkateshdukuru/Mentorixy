import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) return setError('Please fill in all fields');
    setError('');
    setLoading(true);
    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.error || 'Invalid email or password');
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
        maxWidth: '440px',
        padding: '48px',
        position: 'relative',
        zIndex: 1,
      }}>
        {/* Logo */}
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
            Welcome Back
          </h1>
          <p style={{ color: '#64748b', fontSize: '14px' }}>Sign in to your Mentorixy account</p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#94a3b8', marginBottom: '8px' }}>
              Email Address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="input-field"
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#94a3b8', marginBottom: '8px' }}>
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="••••••••"
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
            id="login-btn"
            type="submit"
            className="btn-primary"
            disabled={loading}
            style={{ marginTop: '8px', padding: '14px', fontSize: '15px', opacity: loading ? 0.7 : 1 }}
          >
            {loading ? 'Signing in...' : 'Sign In →'}
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
          Don't have an account?{' '}
          <Link to="/register" style={{ color: '#a78bfa', fontWeight: 600, textDecoration: 'none' }}>
            Create Account →
          </Link>
        </div>

        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <Link to="/chat" style={{ color: '#64748b', fontSize: '13px', textDecoration: 'none' }}>
            🤖 Try AI Chat without signing in
          </Link>
        </div>
      </div>
    </div>
  );
}
