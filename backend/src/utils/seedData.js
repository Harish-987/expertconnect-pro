require('dotenv').config({ path: require('path').join(__dirname, '../../.env') });
const mongoose = require('mongoose');
const Expert = require('../models/Expert');
const connectDB = require('../config/db');

/**
 * Generates available slots for the next N days, 8 slots per day
 * (09:00 – 17:00 in 1-hour increments, skipping 13:00 lunch).
 */
const generateSlots = (days = 20) => {
  const slots = [];
  const hours = ['09:00', '10:00', '11:00', '12:00', '14:00', '15:00', '16:00', '17:00'];

  for (let i = 1; i <= days; i++) {
    const d = new Date();
    d.setDate(d.getDate() + i);
    if (d.getDay() === 0 || d.getDay() === 6) continue; // Skip weekends
    slots.push({
      date: d.toISOString().split('T')[0],
      slots: [...hours],
    });
  }
  return slots;
};

const experts = [
  {
    name: 'Sarah Chen',
    category: 'Technology',
    bio: 'AI/ML engineer with 8 years building production-grade machine learning systems at top Silicon Valley companies. Specialises in LLMs, computer vision, and MLOps pipelines.',
    expertise: ['Machine Learning', 'LLMs', 'Python', 'MLOps', 'Computer Vision', 'PyTorch'],
    experience: 8,
    rating: 4.9,
    reviewCount: 127,
    profileImage: 'https://i.pravatar.cc/300?img=47',
    price: 150,
    isOnline: true,
    languages: ['English', 'Mandarin'],
    timezone: 'PST',
    totalSessions: 312,
    reviews: [
      { userName: 'Alex M.', rating: 5, comment: 'Sarah helped me debug my ML pipeline in 30 minutes. Outstanding!' },
      { userName: 'Priya K.', rating: 5, comment: 'Incredibly knowledgeable. Will book again.' },
    ],
  },
  {
    name: 'Marcus Thompson',
    category: 'Business',
    bio: 'Former McKinsey consultant and startup founder with 15 years of experience in go-to-market strategy, fundraising, and scaling operations from seed to Series B.',
    expertise: ['Go-to-Market', 'Fundraising', 'OKRs', 'Pitch Decks', 'Scaling', 'Product Strategy'],
    experience: 15,
    rating: 4.8,
    reviewCount: 203,
    profileImage: 'https://i.pravatar.cc/300?img=12',
    price: 200,
    isOnline: true,
    languages: ['English'],
    timezone: 'EST',
    totalSessions: 487,
    reviews: [
      { userName: 'Jamie L.', rating: 5, comment: 'Marcus helped us nail our Series A narrative. Closed in 6 weeks.' },
      { userName: 'Chris D.', rating: 4, comment: 'Very strategic thinking, highly actionable advice.' },
    ],
  },
  {
    name: 'Priya Patel',
    category: 'Technology',
    bio: 'Full-stack engineer specialising in React, Node.js, and cloud architecture. Helped 50+ startups build scalable web products. Google & AWS certified.',
    expertise: ['React', 'Node.js', 'AWS', 'System Design', 'TypeScript', 'GraphQL'],
    experience: 7,
    rating: 4.7,
    reviewCount: 98,
    profileImage: 'https://i.pravatar.cc/300?img=56',
    price: 120,
    isOnline: false,
    languages: ['English', 'Hindi'],
    timezone: 'IST',
    totalSessions: 241,
    reviews: [
      { userName: 'Tom H.', rating: 5, comment: 'Fantastic code review. Found issues our team missed for months.' },
      { userName: 'Sofia R.', rating: 4, comment: 'Very clear explanations, patient and thorough.' },
    ],
  },
  {
    name: 'James Rodriguez',
    category: 'Finance',
    bio: 'CFA charterholder and former Goldman Sachs analyst. Expert in portfolio management, startup financials, and equity valuation for both public and private markets.',
    expertise: ['Portfolio Management', 'Equity Valuation', 'Financial Modelling', 'M&A', 'Startup Finance'],
    experience: 12,
    rating: 4.8,
    reviewCount: 156,
    profileImage: 'https://i.pravatar.cc/300?img=33',
    price: 180,
    isOnline: true,
    languages: ['English', 'Spanish'],
    timezone: 'EST',
    totalSessions: 376,
    reviews: [
      { userName: 'David W.', rating: 5, comment: 'James built our financial model from scratch. Investors loved it.' },
    ],
  },
  {
    name: 'Emma Williams',
    category: 'Design',
    bio: 'Senior UX/UI designer from Airbnb and Figma. Passionate about design systems, conversion-focused interfaces, and accessibility-first design. 200+ products shipped.',
    expertise: ['UX Research', 'UI Design', 'Figma', 'Design Systems', 'Accessibility', 'Prototyping'],
    experience: 9,
    rating: 4.9,
    reviewCount: 144,
    profileImage: 'https://i.pravatar.cc/300?img=44',
    price: 140,
    isOnline: true,
    languages: ['English'],
    timezone: 'PST',
    totalSessions: 289,
    reviews: [
      { userName: 'Maria G.', rating: 5, comment: 'Emma completely transformed our onboarding UX. 40% drop in churn.' },
      { userName: 'Kevin P.', rating: 5, comment: 'Best design session I have ever had. Incredibly insightful.' },
    ],
  },
  {
    name: 'David Kim',
    category: 'Marketing',
    bio: 'Growth marketer who scaled three B2B SaaS companies to $10M+ ARR. Expert in content strategy, SEO, paid acquisition, and marketing automation.',
    expertise: ['Growth Marketing', 'SEO', 'Content Strategy', 'Paid Ads', 'Marketing Automation', 'Analytics'],
    experience: 10,
    rating: 4.6,
    reviewCount: 89,
    profileImage: 'https://i.pravatar.cc/300?img=15',
    price: 110,
    isOnline: false,
    languages: ['English', 'Korean'],
    timezone: 'KST',
    totalSessions: 198,
    reviews: [
      { userName: 'Lisa T.', rating: 5, comment: 'David helped us go from 1K to 50K organic users in 3 months.' },
    ],
  },
  {
    name: 'Rachel Green',
    category: 'Legal',
    bio: 'Corporate attorney specialising in startup law, SaaS contracts, IP protection, and regulatory compliance. 14 years at top-tier law firms, now advising 80+ startups.',
    expertise: ['Startup Law', 'SaaS Contracts', 'IP Protection', 'GDPR', 'Term Sheets', 'Employment Law'],
    experience: 14,
    rating: 4.9,
    reviewCount: 178,
    profileImage: 'https://i.pravatar.cc/300?img=49',
    price: 250,
    isOnline: true,
    languages: ['English'],
    timezone: 'GMT',
    totalSessions: 421,
    reviews: [
      { userName: 'Ben S.', rating: 5, comment: 'Rachel reviewed our enterprise contract and saved us $200K.' },
    ],
  },
  {
    name: 'Alex Turner',
    category: 'Technology',
    bio: 'Cloud architect and Kubernetes expert. Designed distributed systems for companies processing 10B+ events/day. AWS Solutions Architect Professional certified.',
    expertise: ['AWS', 'Kubernetes', 'Distributed Systems', 'Microservices', 'Terraform', 'Site Reliability'],
    experience: 11,
    rating: 4.8,
    reviewCount: 112,
    profileImage: 'https://i.pravatar.cc/300?img=7',
    price: 170,
    isOnline: true,
    languages: ['English'],
    timezone: 'PST',
    totalSessions: 267,
    reviews: [
      { userName: 'Ryan M.', rating: 5, comment: 'Alex reduced our AWS costs by 60% in one session. Incredible ROI.' },
    ],
  },
  {
    name: 'Sophia Brown',
    category: 'Business',
    bio: 'Brand strategist and former VP at Ogilvy. Helped household names reposition their brands and dozens of startups build recognisable identities from zero.',
    expertise: ['Brand Strategy', 'Positioning', 'Messaging', 'Market Research', 'Brand Identity', 'Storytelling'],
    experience: 13,
    rating: 4.7,
    reviewCount: 134,
    profileImage: 'https://i.pravatar.cc/300?img=48',
    price: 160,
    isOnline: false,
    languages: ['English', 'French'],
    timezone: 'CET',
    totalSessions: 318,
    reviews: [
      { userName: 'Nathan B.', rating: 5, comment: 'Sophia nailed our brand narrative in 2 sessions.' },
    ],
  },
  {
    name: 'Michael Chen',
    category: 'Technology',
    bio: 'Cybersecurity engineer and CISSP holder. Expert in threat modelling, penetration testing, cloud security, and helping startups achieve SOC2 and ISO 27001 compliance.',
    expertise: ['Penetration Testing', 'Cloud Security', 'SOC2', 'Threat Modelling', 'Zero Trust', 'SIEM'],
    experience: 9,
    rating: 4.8,
    reviewCount: 76,
    profileImage: 'https://i.pravatar.cc/300?img=18',
    price: 190,
    isOnline: true,
    languages: ['English', 'Mandarin'],
    timezone: 'SGT',
    totalSessions: 183,
    reviews: [
      { userName: 'Helen F.', rating: 5, comment: 'Helped us pass SOC2 Type II. Comprehensive and efficient.' },
    ],
  },
  {
    name: 'Lisa Johnson',
    category: 'Health',
    bio: 'Digital health consultant and former Head of Product at a leading telehealth company. Specialises in health-tech strategy, clinical workflows, and FDA regulatory strategy.',
    expertise: ['Health-Tech Strategy', 'FDA Compliance', 'Clinical Workflows', 'HIPAA', 'Digital Therapeutics'],
    experience: 11,
    rating: 4.9,
    reviewCount: 92,
    profileImage: 'https://i.pravatar.cc/300?img=45',
    price: 220,
    isOnline: false,
    languages: ['English'],
    timezone: 'CST',
    totalSessions: 214,
    reviews: [
      { userName: 'Omar A.', rating: 5, comment: 'Lisa guided our FDA De Novo submission flawlessly.' },
    ],
  },
  {
    name: 'Noah Davis',
    category: 'Education',
    bio: 'EdTech founder and learning design expert. Built adaptive learning platforms used by 2M+ students. Expert in pedagogy, curriculum design, and edtech product strategy.',
    expertise: ['Curriculum Design', 'Adaptive Learning', 'EdTech Strategy', 'Learning Analytics', 'LMS Integration'],
    experience: 8,
    rating: 4.6,
    reviewCount: 67,
    profileImage: 'https://i.pravatar.cc/300?img=8',
    price: 130,
    isOnline: true,
    languages: ['English'],
    timezone: 'MST',
    totalSessions: 156,
    reviews: [
      { userName: 'Chloe T.', rating: 5, comment: 'Noah reframed our whole product from a learning science lens.' },
    ],
  },
];

const seed = async () => {
  await connectDB();
  console.log('🌱 Seeding database…');

  await Expert.deleteMany({});
  console.log('  ✓ Cleared existing experts');

  const docs = experts.map((e) => ({
    ...e,
    availableSlots: generateSlots(20),
  }));

  await Expert.insertMany(docs);
  console.log(`  ✓ Inserted ${docs.length} experts with 20 days of availability`);

  await mongoose.disconnect();
  console.log('✅ Seed complete. MongoDB disconnected.');
};

seed().catch((err) => {
  console.error('❌ Seed failed:', err);
  process.exit(1);
});
