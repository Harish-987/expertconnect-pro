export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
export const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || 'http://localhost:5000';

export const CATEGORIES = [
  'All',
  'Technology',
  'Business',
  'Finance',
  'Design',
  'Marketing',
  'Legal',
  'Health',
  'Education',
];

export const SORT_OPTIONS = [
  { value: 'rating', label: 'Top Rated' },
  { value: 'price', label: 'Price: Low to High' },
  { value: '-price', label: 'Price: High to Low' },
  { value: 'experience', label: 'Most Experienced' },
  { value: 'name', label: 'Name A–Z' },
];

export const BOOKING_STATUSES = {
  pending:   { label: 'Pending',   color: 'yellow' },
  confirmed: { label: 'Confirmed', color: 'blue' },
  completed: { label: 'Completed', color: 'green' },
  cancelled: { label: 'Cancelled', color: 'red' },
};

export const CATEGORY_COLORS = {
  Technology: 'from-cyan-500 to-blue-500',
  Business:   'from-violet-500 to-purple-600',
  Finance:    'from-emerald-500 to-teal-500',
  Design:     'from-pink-500 to-rose-500',
  Marketing:  'from-orange-500 to-amber-500',
  Legal:      'from-slate-400 to-slate-600',
  Health:     'from-green-500 to-emerald-500',
  Education:  'from-indigo-500 to-blue-500',
};

export const CATEGORY_ICONS = {
  Technology: '💻',
  Business:   '📊',
  Finance:    '💰',
  Design:     '🎨',
  Marketing:  '📢',
  Legal:      '⚖️',
  Health:     '🏥',
  Education:  '📚',
};

export const STATS = [
  { label: 'Expert Professionals', value: '500+' },
  { label: 'Sessions Booked', value: '12,000+' },
  { label: 'Client Satisfaction', value: '98%' },
  { label: 'Countries Served', value: '60+' },
];

export const FEATURES = [
  {
    icon: '⚡',
    title: 'Real-Time Availability',
    desc: 'Slot updates are pushed to all connected clients instantly via WebSockets — no stale calendars.',
  },
  {
    icon: '🔒',
    title: 'Zero Double Bookings',
    desc: 'Atomic database transactions and unique compound indexes guarantee each slot is booked exactly once.',
  },
  {
    icon: '🌍',
    title: '500+ Vetted Experts',
    desc: 'Every expert is manually reviewed for credentials, communication skills, and domain expertise.',
  },
  {
    icon: '📱',
    title: 'Book in 60 Seconds',
    desc: 'Our optimised booking flow gets you from discovery to confirmed session in under a minute.',
  },
  {
    icon: '🎯',
    title: 'Smart Matching',
    desc: 'Filter by category, experience, language, and price to find the exact expert you need.',
  },
  {
    icon: '✉️',
    title: 'Instant Confirmation',
    desc: 'Receive booking IDs and session details immediately after checkout.',
  },
];

export const TESTIMONIALS = [
  {
    name: 'Jennifer Walsh',
    role: 'Founder, LumenAI',
    avatar: 'https://i.pravatar.cc/80?img=25',
    rating: 5,
    text: "Booked a session with Sarah for ML architecture advice. She diagnosed our pipeline bottleneck in 20 minutes. ExpertConnect Pro paid for itself 100x.",
  },
  {
    name: 'Daniel Park',
    role: 'CTO, GrowthStack',
    avatar: 'https://i.pravatar.cc/80?img=11',
    rating: 5,
    text: "The real-time slot availability is a game changer. No more emailing back and forth — you see exactly what's open and book it instantly.",
  },
  {
    name: 'Amelia Torres',
    role: 'Head of Design, Velox',
    avatar: 'https://i.pravatar.cc/80?img=32',
    rating: 5,
    text: "Used it to book Emma for a design system review. The platform is beautifully designed itself — practises what it preaches.",
  },
];

export const FAQS = [
  {
    q: 'How does real-time availability work?',
    a: 'When any user books a slot, our server pushes a WebSocket event to every client viewing that expert\'s page. The slot turns unavailable instantly — no refresh needed.',
  },
  {
    q: 'What happens if two people try to book the same slot simultaneously?',
    a: 'Our backend uses a MongoDB unique compound index on (expertId, date, timeSlot). Only one booking wins; the other receives a clear error and is prompted to choose a different slot.',
  },
  {
    q: 'Can I cancel or reschedule a session?',
    a: 'Yes. Visit My Bookings, locate your session, and request a cancellation. Cancelling a slot releases it back into availability in real time.',
  },
  {
    q: 'How are experts vetted?',
    a: 'Every expert submits credentials, a portfolio, and completes a quality review. We verify experience claims and monitor ratings continuously.',
  },
  {
    q: 'Is my payment information secure?',
    a: 'Payments are processed via Stripe with end-to-end encryption. We never store card numbers on our servers.',
  },
];
