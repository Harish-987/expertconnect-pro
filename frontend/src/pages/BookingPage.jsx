import { useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Clock, DollarSign, CheckCircle, User } from 'lucide-react';
import useBookingStore from '../store/bookingStore';
import Input, { Textarea } from '../components/ui/Input';
import Button from '../components/ui/Button';
import { formatFullDate, formatTime, formatCurrency } from '../utils/formatters';
import { fadeUp, staggerContainer, successPop } from '../animations/variants';

/* ── Zod schema ─────────────────────────────────────────────────────────── */
const schema = z.object({
  userName: z.string().min(2, 'Name must be at least 2 characters').max(100),
  email: z.string().email('Please enter a valid email address'),
  phone: z
    .string()
    .min(7, 'Phone number too short')
    .regex(/^\+?[\d\s\-()]{7,15}$/, 'Please enter a valid phone number'),
  notes: z.string().max(500, 'Notes cannot exceed 500 characters').optional(),
});

/* ── Success overlay ────────────────────────────────────────────────────── */
const SuccessScreen = ({ booking, onDone }) => (
  <motion.div
    variants={successPop}
    initial="hidden"
    animate="visible"
    className="glass-card p-10 text-center border border-emerald-500/20 max-w-md mx-auto"
  >
    <div className="w-20 h-20 rounded-full bg-emerald-500/15 flex items-center justify-center mx-auto mb-6">
      <CheckCircle className="w-10 h-10 text-emerald-400" />
    </div>
    <h2 className="text-2xl font-black text-white mb-2">Session Booked! 🎉</h2>
    <p className="text-slate-400 text-sm mb-6">
      Your booking confirmation has been created successfully.
    </p>
    <div className="bg-white/3 rounded-xl p-4 text-left space-y-2 text-sm mb-6 border border-white/5">
      <div className="flex justify-between">
        <span className="text-slate-500">Booking ID</span>
        <span className="font-mono text-brand-300 font-semibold">{booking.bookingId}</span>
      </div>
      <div className="flex justify-between">
        <span className="text-slate-500">Expert</span>
        <span className="text-white">{booking.expertName}</span>
      </div>
      <div className="flex justify-between">
        <span className="text-slate-500">Date</span>
        <span className="text-white">{formatFullDate(booking.date)}</span>
      </div>
      <div className="flex justify-between">
        <span className="text-slate-500">Time</span>
        <span className="text-white">{formatTime(booking.timeSlot)}</span>
      </div>
      <div className="flex justify-between">
        <span className="text-slate-500">Amount</span>
        <span className="text-white font-semibold">{formatCurrency(booking.sessionPrice)}</span>
      </div>
    </div>
    <div className="flex flex-col gap-3">
      <Button onClick={onDone} variant="primary" fullWidth>View My Bookings</Button>
      <Link to="/experts">
        <Button variant="ghost" fullWidth>Browse More Experts</Button>
      </Link>
    </div>
  </motion.div>
);

/* ── Booking Page ───────────────────────────────────────────────────────── */
const BookingPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { submitBooking, loading, lastBooking, clearLastBooking } = useBookingStore();

  const { expert, selectedDate, selectedSlot } = location.state || {};

  // If navigated directly without state, send back to experts
  useEffect(() => {
    if (!expert || !selectedDate || !selectedSlot) {
      navigate('/experts');
    }
    return () => clearLastBooking();
  }, []); // eslint-disable-line

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(schema) });

  const onSubmit = (data) => {
    submitBooking({
      expertId: expert._id,
      ...data,
      date: selectedDate,
      timeSlot: selectedSlot,
    });
  };

  if (lastBooking) {
    return (
      <div className="min-h-screen flex items-center justify-center py-24 px-4">
        <SuccessScreen
          booking={lastBooking}
          onDone={() => { clearLastBooking(); navigate('/my-bookings'); }}
        />
      </div>
    );
  }

  if (!expert) return null;

  return (
    <div className="min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Back */}
        <Link
          to={`/experts/${expert._id}`}
          className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to expert profile
        </Link>

        <motion.div
          variants={staggerContainer(0.08)}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-5 gap-8"
        >
          {/* ── Form ──────────────────────────────────────────────────── */}
          <motion.div variants={fadeUp} className="lg:col-span-3">
            <div className="glass-card p-6 sm:p-8 border border-white/8">
              <h1 className="text-2xl font-black text-white mb-2">Complete Your Booking</h1>
              <p className="text-slate-400 text-sm mb-8">Fill in your details to confirm the session.</p>

              <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
                <Input
                  label="Full Name *"
                  placeholder="Jane Smith"
                  icon={<User className="w-4 h-4" />}
                  error={errors.userName?.message}
                  {...register('userName')}
                />

                <Input
                  label="Email Address *"
                  type="email"
                  placeholder="jane@example.com"
                  error={errors.email?.message}
                  hint="You'll use this to look up your booking later."
                  {...register('email')}
                />

                <Input
                  label="Phone Number *"
                  type="tel"
                  placeholder="+1 (555) 000-0000"
                  error={errors.phone?.message}
                  {...register('phone')}
                />

                <Textarea
                  label="Notes / Session Goals"
                  placeholder="What would you like to discuss or achieve in this session?"
                  error={errors.notes?.message}
                  {...register('notes')}
                />

                <Button
                  type="submit"
                  size="lg"
                  variant="primary"
                  fullWidth
                  loading={loading || isSubmitting}
                >
                  Confirm Booking — {formatCurrency(expert.price)}
                </Button>

                <p className="text-xs text-center text-slate-600">
                  By booking you agree to our Terms of Service and Cancellation Policy.
                </p>
              </form>
            </div>
          </motion.div>

          {/* ── Summary sidebar ───────────────────────────────────────── */}
          <motion.div variants={fadeUp} className="lg:col-span-2 space-y-4">
            {/* Expert card */}
            <div className="glass-card p-5 border border-white/8">
              <p className="text-xs text-slate-500 uppercase tracking-wider mb-4">Session Summary</p>
              <div className="flex items-center gap-3 mb-5">
                <img
                  src={expert.profileImage}
                  alt={expert.name}
                  className="w-12 h-12 rounded-xl object-cover"
                />
                <div>
                  <p className="font-semibold text-white">{expert.name}</p>
                  <p className="text-xs text-slate-400">{expert.category}</p>
                </div>
              </div>

              <div className="space-y-3 text-sm">
                <div className="flex items-center justify-between text-slate-400">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>Date</span>
                  </div>
                  <span className="text-white font-medium">{formatFullDate(selectedDate)}</span>
                </div>
                <div className="flex items-center justify-between text-slate-400">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>Time</span>
                  </div>
                  <span className="text-white font-medium">{formatTime(selectedSlot)}</span>
                </div>
                <div className="flex items-center justify-between text-slate-400 pt-3 border-t border-white/8">
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4" />
                    <span>Session fee</span>
                  </div>
                  <span className="text-xl font-black text-white">{formatCurrency(expert.price)}</span>
                </div>
              </div>
            </div>

            {/* Guarantee badges */}
            {[
              ['🔒', 'Secure booking', 'Your details are encrypted'],
              ['⚡', 'Instant confirmation', 'Get your booking ID immediately'],
              ['🔄', 'Free cancellation', '24h before session start'],
            ].map(([icon, title, desc]) => (
              <div key={title} className="flex items-start gap-3 bg-white/3 rounded-xl p-4 border border-white/5">
                <span className="text-xl">{icon}</span>
                <div>
                  <p className="text-sm font-medium text-white">{title}</p>
                  <p className="text-xs text-slate-500">{desc}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default BookingPage;
