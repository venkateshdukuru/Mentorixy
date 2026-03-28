import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { to: '/home', label: 'Home' },
    { to: '/experts', label: 'Find a Mentor' },
    { to: '/questions', label: 'Q&A Forum' },
    { to: '/chat', label: '💬 AI Mentor' },
  ];

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 1000,
      background: 'rgba(10,10,15,0.85)',
      backdropFilter: 'blur(20px)',
      borderBottom: '1px solid rgba(255,255,255,0.06)',
      padding: '0 24px',
      height: '72px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
    }}>
      {/* Logo */}
      <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px' }}>
        <div style={{
          width: '36px', height: '36px',
          background: 'linear-gradient(135deg, #7c3aed, #06b6d4)',
          borderRadius: '10px',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '18px'
        }}>✦</div>
        <span style={{
          fontFamily: 'Outfit, sans-serif',
          fontWeight: 800,
          fontSize: '22px',
          background: 'linear-gradient(135deg, #a78bfa, #7c3aed)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>Mentorixy</span>
      </Link>

      {/* Desktop Nav */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        {navLinks.map(link => (
          <Link key={link.to} to={link.to} style={{
            textDecoration: 'none',
            padding: '8px 16px',
            borderRadius: '10px',
            fontSize: '14px',
            fontWeight: 500,
            color: location.pathname === link.to ? '#a78bfa' : '#94a3b8',
            background: location.pathname === link.to ? 'rgba(124,58,237,0.15)' : 'transparent',
            transition: 'all 0.2s',
          }}>{link.label}</Link>
        ))}
      </div>

      {/* Auth */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        {user ? (
          <>
            <Link to="/dashboard" style={{
              textDecoration: 'none',
              display: 'flex', alignItems: 'center', gap: '8px',
              padding: '6px 12px',
              borderRadius: '10px',
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.08)',
            }}>
              <div style={{
                width: '28px', height: '28px',
                background: 'linear-gradient(135deg, #7c3aed, #06b6d4)',
                borderRadius: '50%',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '12px', fontWeight: 700, color: 'white'
              }}>
                {user.name?.[0]?.toUpperCase() || user.email?.[0]?.toUpperCase()}
              </div>
              <span style={{ fontSize: '14px', color: '#e2e8f0', fontWeight: 500 }}>
                {user.name?.split(' ')[0] || 'Dashboard'}
              </span>
            </Link>
            <button onClick={handleLogout} className="btn-secondary" style={{ padding: '8px 16px', fontSize: '13px' }}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" style={{
              textDecoration: 'none',
              padding: '8px 16px',
              borderRadius: '10px',
              fontSize: '14px',
              fontWeight: 500,
              color: '#94a3b8',
            }}>Sign In</Link>
            <Link to="/register">
              <button className="btn-primary" style={{ padding: '10px 22px', fontSize: '14px' }}>
                Get Started
              </button>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
