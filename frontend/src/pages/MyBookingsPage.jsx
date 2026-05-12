import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, BookOpen, Inbox } from 'lucide-react';
import useBooking from '../hooks/useBooking';
import BookingCard from '../components/booking/BookingCard';
import { BookingCardSkeleton } from '../components/ui/Skeleton';
import Button from '../components/ui/Button';
import { staggerContainer, fadeUp } from '../animations/variants';
import { BOOKING_STATUSES } from '../constants';

const STATUS_FILTERS = ['all', ...Object.keys(BOOKING_STATUSES)];

const MyBookingsPage = () => {
  const { bookings, searchLoading, fetchByEmail } = useBooking();
  const [email, setEmail] = useState('');
  const [searched, setSearched] = useState(false);
  const [statusFilter, setStatusFilter] = useState('all');

  const handleSearch = (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSearched(true);
    fetchByEmail(email.trim());
  };

  const filtered =
    statusFilter === 'all'
      ? bookings
      : bookings.filter((b) => b.status === statusFilter);

  return (
    <div className="min-h-screen pt-28 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <motion.div variants={fadeUp} initial="hidden" animate="visible" className="mb-10">
          <div className="flex items-center gap-2 text-brand-400 text-sm font-medium mb-3">
            <BookOpen className="w-4 h-4" />
            <span>My Sessions</span>
          </div>
          <h1 className="text-4xl font-black text-white mb-3">My Bookings</h1>
          <p className="text-slate-400">Enter your email to view your session history.</p>
        </motion.div>

        {/* Search form */}
        <motion.form
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          onSubmit={handleSearch}
          className="flex gap-3 mb-8"
        >
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              required
              className="w-full bg-surface-100 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-sm text-slate-200
                placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-500/40 focus:border-brand-500/50
                hover:border-white/20 transition-colors"
            />
          </div>
          <Button type="submit" variant="primary" loading={searchLoading}>
            Search
          </Button>
        </motion.form>

        {/* Status filter tabs */}
        {searched && bookings.length > 0 && (
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="flex flex-wrap gap-2 mb-6"
          >
            {STATUS_FILTERS.map((s) => (
              <button
                key={s}
                onClick={() => setStatusFilter(s)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all capitalize ${
                  statusFilter === s
                    ? 'bg-brand-500 text-white'
                    : 'bg-white/5 text-slate-400 border border-white/8 hover:text-white'
                }`}
              >
                {s === 'all' ? `All (${bookings.length})` : BOOKING_STATUSES[s]?.label}
              </button>
            ))}
          </motion.div>
        )}

        {/* Loading skeletons */}
        {searchLoading && (
          <div className="space-y-4">
            {Array.from({ length: 3 }).map((_, i) => <BookingCardSkeleton key={i} />)}
          </div>
        )}

        {/* Results */}
        {!searchLoading && searched && (
          <>
            {filtered.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-20"
              >
                <Inbox className="w-12 h-12 text-slate-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">
                  {bookings.length === 0 ? 'No bookings found' : 'No bookings match this filter'}
                </h3>
                <p className="text-slate-500 text-sm mb-6">
                  {bookings.length === 0
                    ? `No sessions found for ${email}`
                    : 'Try a different status filter.'}
                </p>
                {bookings.length === 0 && (
                  <a href="/experts">
                    <Button variant="primary">Book a Session</Button>
                  </a>
                )}
              </motion.div>
            ) : (
              <motion.div
                variants={staggerContainer(0.07)}
                initial="hidden"
                animate="visible"
                className="space-y-4"
              >
                <p className="text-xs text-slate-500 mb-4">
                  Showing {filtered.length} booking{filtered.length !== 1 ? 's' : ''} for <strong className="text-slate-300">{email}</strong>
                </p>
                {filtered.map((b) => (
                  <BookingCard key={b._id} booking={b} />
                ))}
              </motion.div>
            )}
          </>
        )}

        {/* Initial empty state */}
        {!searched && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-center py-20 border border-dashed border-white/8 rounded-2xl"
          >
            <BookOpen className="w-12 h-12 text-slate-700 mx-auto mb-4" />
            <p className="text-slate-500">Enter your email above to see your booking history</p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default MyBookingsPage;
