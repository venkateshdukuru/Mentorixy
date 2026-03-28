import { useState, useEffect } from 'react';
import axios from 'axios';
import ExpertCard, { MOCK_EXPERTS } from '../components/ExpertCard';

const SKILLS = ['All', 'Career Change', 'Relationships', 'Mental Health', 'Finance', 'Parenting', 'Business', 'Education', 'Life Coaching', 'Entrepreneurship', 'Tech Careers'];

export default function ExpertsPage() {
  const [experts, setExperts] = useState(MOCK_EXPERTS);
  const [selectedSkill, setSelectedSkill] = useState('All');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchExperts = async () => {
      setLoading(true);
      try {
        const params = {};
        if (selectedSkill !== 'All') params.skill = selectedSkill;
        if (search) params.search = search;
        const res = await axios.get('/api/experts', { params });
        if (res.data.experts?.length) setExperts(res.data.experts);
        else setExperts(MOCK_EXPERTS); // fallback to mock
      } catch {
        setExperts(MOCK_EXPERTS);
      } finally {
        setLoading(false);
      }
    };
    const timer = setTimeout(fetchExperts, 300);
    return () => clearTimeout(timer);
  }, [selectedSkill, search]);

  const displayExperts = selectedSkill === 'All' && !search
    ? MOCK_EXPERTS
    : MOCK_EXPERTS.filter(e => {
      const skillMatch = selectedSkill === 'All' || e.skills.some(s => s.toLowerCase().includes(selectedSkill.toLowerCase()));
      const searchMatch = !search || e.name.toLowerCase().includes(search.toLowerCase()) || e.title.toLowerCase().includes(search.toLowerCase());
      return skillMatch && searchMatch;
    });

  return (
    <div style={{ minHeight: '100vh', paddingTop: '72px' }}>
      <div className="orb orb-1" style={{ opacity: 0.08 }} />

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '48px 24px' }}>
        {/* Header */}
        <div style={{ marginBottom: '48px' }}>
          <div className="badge badge-cyan" style={{ marginBottom: '16px' }}>Expert Network</div>
          <h1 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 'clamp(32px, 5vw, 52px)', fontWeight: 800, marginBottom: '12px' }}>
            Find Your <span className="gradient-text">Perfect Mentor</span>
          </h1>
          <p style={{ color: '#64748b', fontSize: '18px' }}>
            Real people who’ve been through it — career coaches, life counsellors, financial advisors, therapists, and more.
          </p>
        </div>

        {/* Search */}
        <div style={{ marginBottom: '32px' }}>
          <input
            id="expert-search"
            className="input-field"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="🔍 Search by name, area of life, or challenge..."
            style={{ maxWidth: '500px', borderRadius: '14px', padding: '14px 20px', fontSize: '15px' }}
          />
        </div>

        {/* Skill Filters */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '40px' }}>
          {SKILLS.map(skill => (
            <button
              key={skill}
              onClick={() => setSelectedSkill(skill)}
              style={{
                padding: '8px 18px',
                borderRadius: '100px',
                border: `1px solid ${selectedSkill === skill ? '#7c3aed' : 'rgba(255,255,255,0.08)'}`,
                background: selectedSkill === skill ? 'rgba(124,58,237,0.2)' : 'rgba(255,255,255,0.03)',
                color: selectedSkill === skill ? '#a78bfa' : '#64748b',
                cursor: 'pointer',
                fontSize: '13px',
                fontWeight: 500,
                fontFamily: 'Inter, sans-serif',
                transition: 'all 0.2s',
              }}
            >{skill}</button>
          ))}
        </div>

        {/* Expert grid */}
        {loading ? (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: '24px',
          }}>
            {[1,2,3,4,5,6].map(i => (
              <div key={i} className="glass-card shimmer" style={{ height: '320px' }} />
            ))}
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: '24px',
          }}>
            {(displayExperts.length ? displayExperts : MOCK_EXPERTS).map(expert => (
              <ExpertCard key={expert._id} expert={expert} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
