import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { ArrowRight, Star, Zap, Shield, Globe, ChevronDown, ChevronUp } from 'lucide-react';
import Button from '../components/ui/Button';
import { fadeUp, staggerContainer, fadeLeft, fadeRight, scaleIn } from '../animations/variants';
import { STATS, FEATURES, TESTIMONIALS, FAQS } from '../constants';

/* ── Animated counter ─────────────────────────────────────────────────────── */
const Counter = ({ value }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  return <span ref={ref}>{inView ? value : '0'}</span>;
};

/* ── FAQ accordion item ───────────────────────────────────────────────────── */
const FaqItem = ({ q, a }) => {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="border border-white/8 rounded-xl overflow-hidden cursor-pointer hover:border-white/15 transition-colors"
      onClick={() => setOpen((v) => !v)}
    >
      <div className="flex items-center justify-between px-5 py-4">
        <span className="font-medium text-slate-200 text-sm">{q}</span>
        {open ? (
          <ChevronUp className="w-4 h-4 text-brand-400 shrink-0" />
        ) : (
          <ChevronDown className="w-4 h-4 text-slate-500 shrink-0" />
        )}
      </div>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: 'auto' }}
            exit={{ height: 0 }}
            className="overflow-hidden"
          >
            <p className="px-5 pb-4 text-sm text-slate-400 leading-relaxed border-t border-white/5 pt-3">
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

/* ── Landing Page ─────────────────────────────────────────────────────────── */
const LandingPage = () => {
  return (
    <div className="overflow-hidden">
      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-4 pt-20 pb-16 bg-hero">
        {/* Decorative blobs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-violet-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

        <motion.div
          variants={staggerContainer(0.1, 0.2)}
          initial="hidden"
          animate="visible"
          className="relative z-10 text-center max-w-4xl mx-auto"
        >
          {/* Pill badge */}
          <motion.div variants={fadeUp} className="inline-flex items-center gap-2 mb-6">
            <span className="px-3 py-1.5 rounded-full text-xs font-medium bg-brand-500/15 text-brand-300 border border-brand-500/30 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Real-time booking — zero double-bookings
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={fadeUp}
            className="text-5xl sm:text-6xl lg:text-7xl font-black text-white leading-[1.05] tracking-tight mb-6"
          >
            Book World-Class{' '}
            <span className="gradient-text">Experts</span>
            <br />
            <span className="text-slate-300">Instantly.</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="text-lg text-slate-400 leading-relaxed mb-10 max-w-2xl mx-auto"
          >
            Connect with vetted professionals in technology, business, finance, design, and more.
            Live availability. Zero scheduling back-and-forth.
          </motion.p>

          {/* CTAs */}
          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/experts">
              <Button size="xl" variant="primary" iconRight={<ArrowRight className="w-4 h-4" />}>
                Browse Experts
              </Button>
            </Link>
            <Link to="/my-bookings">
              <Button size="xl" variant="secondary">
                My Bookings
              </Button>
            </Link>
          </motion.div>

          {/* Social proof */}
          <motion.div variants={fadeUp} className="mt-12 flex flex-wrap items-center justify-center gap-6 text-sm text-slate-500">
            <div className="flex -space-x-2">
              {[25, 32, 44, 15, 48].map((n) => (
                <img
                  key={n}
                  src={`https://i.pravatar.cc/40?img=${n}`}
                  className="w-8 h-8 rounded-full ring-2 ring-surface-DEFAULT object-cover"
                  alt=""
                />
              ))}
            </div>
            <div className="flex items-center gap-1">
              {[1,2,3,4,5].map((i) => (
                <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
              ))}
              <span className="ml-1 font-medium text-slate-300">4.9/5</span>
              <span className="ml-1">from 2,000+ reviews</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Scroll hint */}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.8 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-slate-600"
        >
          <ChevronDown className="w-5 h-5" />
        </motion.div>
      </section>

      {/* ── Stats ─────────────────────────────────────────────────────────── */}
      <section className="py-16 border-y border-white/8 bg-surface-100/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainer(0.1)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center"
          >
            {STATS.map(({ label, value }) => (
              <motion.div key={label} variants={scaleIn}>
                <div className="text-3xl sm:text-4xl font-black text-white mb-1">
                  <Counter value={value} />
                </div>
                <div className="text-sm text-slate-400">{label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Features ──────────────────────────────────────────────────────── */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <motion.div
          variants={staggerContainer(0.08)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="text-center mb-16"
        >
          <motion.p variants={fadeUp} className="text-brand-400 text-sm font-semibold uppercase tracking-widest mb-3">
            Why ExpertConnect Pro
          </motion.p>
          <motion.h2 variants={fadeUp} className="section-heading mb-4">
            Built for serious work.
          </motion.h2>
          <motion.p variants={fadeUp} className="section-subheading max-w-2xl mx-auto">
            Every feature is engineered for reliability, speed, and a premium experience.
          </motion.p>
        </motion.div>

        <motion.div
          variants={staggerContainer(0.07)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {FEATURES.map(({ icon, title, desc }) => (
            <motion.div
              key={title}
              variants={fadeUp}
              whileHover={{ y: -4, borderColor: 'rgba(99,102,241,0.4)' }}
              className="glass-card p-6 border border-white/5 transition-all duration-300 hover:shadow-glow-sm"
            >
              <div className="w-12 h-12 rounded-xl bg-brand-500/10 flex items-center justify-center text-2xl mb-4">
                {icon}
              </div>
              <h3 className="font-semibold text-white mb-2">{title}</h3>
              <p className="text-sm text-slate-400 leading-relaxed">{desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ── Testimonials ──────────────────────────────────────────────────── */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-surface-100/30">
        <div className="max-w-7xl mx-auto">
          <motion.div
            variants={staggerContainer(0.08)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="text-center mb-16"
          >
            <motion.p variants={fadeUp} className="text-brand-400 text-sm font-semibold uppercase tracking-widest mb-3">
              Testimonials
            </motion.p>
            <motion.h2 variants={fadeUp} className="section-heading mb-4">
              Loved by professionals.
            </motion.h2>
          </motion.div>

          <motion.div
            variants={staggerContainer(0.1)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {TESTIMONIALS.map(({ name, role, avatar, rating, text }) => (
              <motion.div
                key={name}
                variants={fadeUp}
                whileHover={{ y: -4 }}
                className="glass-card p-6 border border-white/8"
              >
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <p className="text-slate-300 text-sm leading-relaxed mb-5">&ldquo;{text}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <img src={avatar} alt={name} className="w-9 h-9 rounded-full object-cover" />
                  <div>
                    <p className="text-sm font-semibold text-white">{name}</p>
                    <p className="text-xs text-slate-500">{role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────────────────────────── */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto">
        <motion.div
          variants={staggerContainer(0.08)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <motion.h2 variants={fadeUp} className="section-heading mb-4">
            Frequently asked questions
          </motion.h2>
        </motion.div>
        <motion.div
          variants={staggerContainer(0.06)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-3"
        >
          {FAQS.map(({ q, a }) => (
            <motion.div key={q} variants={fadeUp}>
              <FaqItem q={q} a={a} />
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ── CTA Banner ────────────────────────────────────────────────────── */}
      <section className="py-24 px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-600/40 to-violet-600/30 border border-brand-500/30 p-12 text-center"
        >
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(99,102,241,0.15)_0%,transparent_70%)]" />
          <div className="relative z-10">
            <div className="w-14 h-14 rounded-2xl bg-brand-500/20 flex items-center justify-center mx-auto mb-6">
              <Zap className="w-7 h-7 text-brand-400" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">
              Ready to book your first session?
            </h2>
            <p className="text-slate-300 mb-8 max-w-lg mx-auto">
              Browse 500+ verified experts. See live availability. Book in seconds.
            </p>
            <Link to="/experts">
              <Button size="xl" variant="primary" iconRight={<ArrowRight className="w-4 h-4" />}>
                Explore Experts
              </Button>
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default LandingPage;
