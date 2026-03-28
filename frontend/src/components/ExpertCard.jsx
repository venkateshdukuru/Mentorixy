import { useState } from 'react';
import BookingModal from './BookingModal';

const MOCK_EXPERTS = [
  {
    _id: '1',
    name: 'Dr. Amina Hassan',
    title: 'Life Coach & Relationship Counsellor',
    bio: 'Licensed therapist with 12 years helping people through divorce, grief, burnout, and major life transitions. Warm, non-judgmental approach.',
    skills: ['Relationships', 'Mental Health', 'Life Transitions', 'Grief'],
    hourlyRate: 80,
    rating: 4.9,
    totalSessions: 542,
    isVerified: true,
    emoji: '💛',
  },
  {
    _id: '2',
    name: 'Rajesh Menon',
    title: 'Career Coach & Ex-HR Director',
    bio: 'Helped 400+ people land jobs, negotiate salaries, and pivot careers. Ex-HR Director at Wipro & Infosys. Straight-talking, practical advice.',
    skills: ['Career Change', 'Resume & CV', 'Interview Prep', 'Salary Negotiation'],
    hourlyRate: 60,
    rating: 4.8,
    totalSessions: 389,
    isVerified: true,
    emoji: '🚀',
  },
  {
    _id: '3',
    name: 'Sandra Okonkwo',
    title: 'Financial Advisor & Money Coach',
    bio: 'Certified financial planner specialising in budgeting, debt management, and building wealth on any income. No jargon, just clarity.',
    skills: ['Personal Finance', 'Budgeting', 'Investing', 'Debt Freedom'],
    hourlyRate: 70,
    rating: 4.9,
    totalSessions: 276,
    isVerified: true,
    emoji: '💰',
  },
  {
    _id: '4',
    name: 'Priya & Arjun Sharma',
    title: 'Parenting Coaches',
    bio: 'Parents of 3, parenting educators with 8+ years of experience. Specialise in toddlers, teens, school pressure, and work-life balance for parents.',
    skills: ['Parenting', 'Child Development', 'Work-Life Balance', 'Teens'],
    hourlyRate: 55,
    rating: 4.7,
    totalSessions: 198,
    isVerified: true,
    emoji: '👨‍👩‍👧',
  },
  {
    _id: '5',
    name: 'Dr. Sarah Chen',
    title: 'Senior Product Manager @ Google',
    bio: 'Ex-Google PM with 10+ years in tech. Helped 200+ professionals land PM roles at FAANG. Also coaches career-switchers into tech.',
    skills: ['Tech Careers', 'Product Strategy', 'Career Coaching', 'FAANG'],
    hourlyRate: 150,
    rating: 4.9,
    totalSessions: 312,
    isVerified: true,
    emoji: '👩‍💻',
  },
  {
    _id: '6',
    name: 'Marcus Williams',
    title: 'Entrepreneur & Startup Mentor',
    bio: 'Founded 3 startups, 1 exit. YC alumnus. Coaches first-time founders on ideation, fundraising, product-market fit, and avoiding burnout.',
    skills: ['Entrepreneurship', 'Startup Advice', 'Fundraising', 'Business'],
    hourlyRate: 120,
    rating: 4.8,
    totalSessions: 198,
    isVerified: true,
    emoji: '🌍',
  },
];

function Stars({ rating }) {
  return (
    <div style={{ display: 'flex', gap: '2px' }}>
      {[1, 2, 3, 4, 5].map(n => (
        <span key={n} className="star" style={{ fontSize: '13px', opacity: n <= Math.round(rating) ? 1 : 0.3 }}>★</span>
      ))}
      <span style={{ fontSize: '12px', color: '#94a3b8', marginLeft: '4px' }}>{rating}</span>
    </div>
  );
}

export default function ExpertCard({ expert = MOCK_EXPERTS[0] }) {
  const [showBooking, setShowBooking] = useState(false);

  return (
    <>
      <div className="glass-card" style={{ padding: '24px', position: 'relative' }}>
        {expert.isVerified && (
          <div className="badge badge-cyan" style={{ position: 'absolute', top: '16px', right: '16px' }}>
            ✓ Verified
          </div>
        )}

        {/* Avatar */}
        <div style={{
          width: '64px', height: '64px',
          background: 'linear-gradient(135deg, #7c3aed20, #06b6d420)',
          border: '2px solid rgba(124,58,237,0.3)',
          borderRadius: '18px',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '30px',
          marginBottom: '16px',
        }}>
          {expert.emoji || expert.name?.[0]}
        </div>

        <h3 style={{ fontWeight: 700, fontSize: '17px', color: '#f1f5f9', marginBottom: '4px' }}>
          {expert.name}
        </h3>
        <p style={{ fontSize: '13px', color: '#a78bfa', marginBottom: '12px', fontWeight: 500 }}>
          {expert.title}
        </p>
        <p style={{ fontSize: '13px', color: '#64748b', lineHeight: 1.6, marginBottom: '16px' }}>
          {expert.bio}
        </p>

        {/* Skills */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '16px' }}>
          {expert.skills?.slice(0, 3).map(s => (
            <span key={s} className="badge badge-purple" style={{ fontSize: '11px' }}>{s}</span>
          ))}
        </div>

        {/* Stats */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <Stars rating={expert.rating} />
          <span style={{ fontSize: '12px', color: '#64748b' }}>{expert.totalSessions} sessions</span>
        </div>

        {/* Price & CTA */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <span style={{ fontSize: '22px', fontWeight: 800, color: '#f1f5f9' }}>₹{expert.hourlyRate}</span>
            <span style={{ fontSize: '12px', color: '#64748b' }}>/hr</span>
          </div>
          <button
            className="btn-primary"
            style={{ padding: '10px 20px', fontSize: '13px' }}
            onClick={() => setShowBooking(true)}
          >
            📅 Book Session
          </button>
        </div>
      </div>

      {/* Booking Modal */}
      {showBooking && (
        <BookingModal
          expert={expert}
          onClose={() => setShowBooking(false)}
        />
      )}
    </>
  );
}

export { MOCK_EXPERTS };
