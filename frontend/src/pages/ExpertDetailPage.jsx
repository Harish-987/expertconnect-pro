import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Star, Clock, Globe, ArrowLeft, Briefcase, MessageCircle,
  CheckCircle, CircleDot, Wifi
} from 'lucide-react';
import useExpertStore from '../store/expertStore';
import { useSocket } from '../context/SocketContext';
import { ExpertDetailSkeleton } from '../components/ui/Skeleton';
import SlotPicker from '../components/booking/SlotPicker';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import { formatCurrency, formatDate, formatTime } from '../utils/formatters';
import { fadeUp, staggerContainer, scaleIn } from '../animations/variants';
import { CATEGORY_COLORS, CATEGORY_ICONS } from '../constants';

const StatCard = ({ icon: Icon, label, value }) => (
  <div className="bg-white/3 rounded-xl p-4 border border-white/5 text-center">
    <Icon className="w-5 h-5 text-brand-400 mx-auto mb-2" />
    <div className="text-lg font-bold text-white">{value}</div>
    <div className="text-xs text-slate-500 mt-0.5">{label}</div>
  </div>
);

const ExpertDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { expert, detailLoading, error, loadExpertById, clearExpert } = useExpertStore();
  const { joinRoom, leaveRoom, connected } = useSocket();
  const [activeTab, setActiveTab] = useState('about');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedSlot, setSelectedSlot] = useState('');

  useEffect(() => {
    loadExpertById(id);
    joinRoom(id);
    return () => {
      leaveRoom(id);
      clearExpert();
    };
  }, [id]); // eslint-disable-line

  const handleSlotSelect = (date, slot) => {
    setSelectedDate(date);
    setSelectedSlot(slot || '');
  };

  const handleProceedToBooking = () => {
    if (!selectedDate || !selectedSlot) return;
    navigate(`/experts/${id}/book`, {
      state: { expert, selectedDate, selectedSlot },
    });
  };

  if (detailLoading) {
    return (
      <div className="min-h-screen py-28 px-4 max-w-7xl mx-auto">
        <ExpertDetailSkeleton />
      </div>
    );
  }

  if (error || !expert) {
    return (
      <div className="min-h-screen py-28 flex items-center justify-center text-center">
        <div>
          <div className="text-5xl mb-4">😕</div>
          <h2 className="text-xl font-bold text-white mb-2">Expert not found</h2>
          <p className="text-slate-400 mb-6">{error}</p>
          <Link to="/experts">
            <Button variant="primary">Browse Experts</Button>
          </Link>
        </div>
      </div>
    );
  }

  const catGradient = CATEGORY_COLORS[expert.category] || 'from-brand-500 to-violet-500';

  return (
    <div className="min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Back */}
        <Link
          to="/experts"
          className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to experts
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* ── LEFT COLUMN ─────────────────────────────────────────────── */}
          <div className="lg:col-span-2 space-y-6">
            {/* Hero card */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="glass-card overflow-hidden border border-white/8"
            >
              {/* Category banner */}
              <div className={`h-2 bg-gradient-to-r ${catGradient}`} />

              <div className="p-6 sm:p-8">
                <div className="flex flex-col sm:flex-row gap-6">
                  {/* Avatar */}
                  <div className="relative shrink-0">
                    <img
                      src={expert.profileImage}
                      alt={expert.name}
                      className="w-28 h-28 rounded-2xl object-cover ring-4 ring-white/10"
                    />
                    <span
                      className={`absolute -bottom-1.5 -right-1.5 w-5 h-5 rounded-full border-[3px] border-surface-100 ${
                        expert.isOnline ? 'bg-emerald-400' : 'bg-slate-500'
                      }`}
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1">
                    <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                      <div>
                        <h1 className="text-2xl font-black text-white">{expert.name}</h1>
                        <div className="flex items-center gap-2 mt-1">
                          <span>{CATEGORY_ICONS[expert.category]}</span>
                          <span className="text-slate-400">{expert.category}</span>
                        </div>
                      </div>
                      <div className="flex gap-2 flex-wrap">
                        <Badge color={expert.isOnline ? 'green' : 'slate'} dot={expert.isOnline}>
                          {expert.isOnline ? 'Online Now' : 'Offline'}
                        </Badge>
                        {/* Live socket status */}
                        <Badge color={connected ? 'cyan' : 'slate'}>
                          <Wifi className="w-3 h-3" />
                          {connected ? 'Live' : 'Connecting'}
                        </Badge>
                      </div>
                    </div>

                    {/* Stats row */}
                    <div className="flex flex-wrap gap-4 text-sm text-slate-400 mb-4">
                      <div className="flex items-center gap-1.5">
                        <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                        <span className="font-semibold text-white">{expert.rating.toFixed(1)}</span>
                        <span>({expert.reviewCount} reviews)</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Briefcase className="w-4 h-4" />
                        <span>{expert.experience} years experience</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <CircleDot className="w-4 h-4" />
                        <span>{expert.totalSessions}+ sessions</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Globe className="w-4 h-4" />
                        <span>{expert.languages?.join(', ')}</span>
                      </div>
                    </div>

                    <p className="text-slate-300 text-sm leading-relaxed">{expert.bio}</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Tabs */}
            <div className="flex gap-1 bg-surface-100 rounded-xl p-1 border border-white/5">
              {['about', 'expertise', 'reviews'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium capitalize transition-all ${
                    activeTab === tab
                      ? 'bg-brand-500/20 text-brand-300 shadow-sm'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Tab content */}
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              className="glass-card p-6 border border-white/8"
            >
              {activeTab === 'about' && (
                <div>
                  <h3 className="font-semibold text-white mb-4">About</h3>
                  <p className="text-slate-300 text-sm leading-relaxed mb-6">{expert.bio}</p>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <StatCard icon={Star} label="Rating" value={expert.rating.toFixed(1)} />
                    <StatCard icon={Briefcase} label="Experience" value={`${expert.experience}y`} />
                    <StatCard icon={CircleDot} label="Sessions" value={expert.totalSessions} />
                    <StatCard icon={Clock} label="Duration" value={`${expert.sessionDuration}min`} />
                  </div>
                </div>
              )}

              {activeTab === 'expertise' && (
                <div>
                  <h3 className="font-semibold text-white mb-4">Areas of Expertise</h3>
                  <div className="flex flex-wrap gap-2">
                    {expert.expertise.map((tag) => (
                      <span
                        key={tag}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-brand-500/10 text-brand-300 border border-brand-500/20 text-sm"
                      >
                        <CheckCircle className="w-3.5 h-3.5" />
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'reviews' && (
                <div>
                  <h3 className="font-semibold text-white mb-4">
                    Reviews <span className="text-slate-500 font-normal">({expert.reviewCount})</span>
                  </h3>
                  {expert.reviews?.length > 0 ? (
                    <div className="space-y-4">
                      {expert.reviews.map((r, i) => (
                        <div key={i} className="bg-white/3 rounded-xl p-4 border border-white/5">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="font-medium text-sm text-white">{r.userName}</span>
                            <div className="flex gap-0.5">
                              {Array.from({ length: r.rating }).map((_, j) => (
                                <Star key={j} className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                              ))}
                            </div>
                          </div>
                          <p className="text-sm text-slate-400">{r.comment}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-slate-500 text-sm">No reviews yet.</p>
                  )}
                </div>
              )}
            </motion.div>
          </div>

          {/* ── RIGHT COLUMN — Sticky booking ───────────────────────────── */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-4">
              {/* Pricing */}
              <motion.div
                variants={scaleIn}
                initial="hidden"
                animate="visible"
                className="glass-card p-6 border border-white/8"
              >
                <div className="flex items-baseline justify-between mb-1">
                  <span className="text-3xl font-black text-white">{formatCurrency(expert.price)}</span>
                  <span className="text-sm text-slate-500">/ {expert.sessionDuration}min</span>
                </div>
                <p className="text-xs text-slate-500 mb-5">One-on-one session · Video call</p>

                {/* Slot picker */}
                <SlotPicker
                  availableSlots={expert.availableSlots}
                  selectedDate={selectedDate}
                  selectedSlot={selectedSlot}
                  onSelect={handleSlotSelect}
                />

                <Button
                  fullWidth
                  size="lg"
                  variant="primary"
                  className="mt-5"
                  disabled={!selectedDate || !selectedSlot}
                  onClick={handleProceedToBooking}
                >
                  {selectedDate && selectedSlot
                    ? `Book ${formatDate(selectedDate)} · ${formatTime(selectedSlot)}`
                    : 'Select a slot to continue'}
                </Button>

                <p className="text-xs text-center text-slate-600 mt-3">
                  No charge until confirmed
                </p>
              </motion.div>

              {/* Quick info */}
              <div className="glass-card p-4 border border-white/5 space-y-3 text-sm text-slate-400">
                {[
                  ['🕐', `${expert.sessionDuration}-minute session`],
                  ['📹', 'Video call (link sent on confirmation)'],
                  ['🌍', expert.timezone],
                  ['🗣', expert.languages?.join(', ')],
                ].map(([icon, text]) => (
                  <div key={text} className="flex items-center gap-2">
                    <span>{icon}</span><span>{text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpertDetailPage;
