import { memo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, Clock, CircleDot } from 'lucide-react';
import { cardHover } from '../../animations/variants';
import Badge from '../ui/Badge';
import Button from '../ui/Button';
import { formatCurrency, truncate } from '../../utils/formatters';
import { CATEGORY_COLORS, CATEGORY_ICONS } from '../../constants';

/**
 * memo prevents re-render when the parent re-fetches unrelated data.
 * This matters on the listing page which can render 12+ cards.
 */
const ExpertCard = memo(({ expert }) => {
  const { _id, name, category, bio, experience, rating, reviewCount,
    profileImage, price, isOnline, expertise, totalSessions } = expert;

  const categoryGradient = CATEGORY_COLORS[category] || 'from-brand-500 to-violet-500';

  return (
    <motion.div
      whileHover="hover"
      initial="rest"
      variants={cardHover}
      className="group relative bg-surface-100 border border-white/5 rounded-2xl overflow-hidden
        hover:border-brand-500/30 transition-colors duration-300 cursor-pointer"
    >
      {/* Category gradient bar */}
      <div className={`h-1 bg-gradient-to-r ${categoryGradient}`} />

      <div className="p-6">
        {/* Header */}
        <div className="flex items-start gap-4 mb-4">
          <div className="relative shrink-0">
            <img
              src={profileImage || `https://i.pravatar.cc/100?img=1`}
              alt={name}
              className="w-14 h-14 rounded-xl object-cover ring-2 ring-white/10 group-hover:ring-brand-500/40 transition-all"
              loading="lazy"
            />
            <span
              className={`absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full border-2 border-surface-100 ${
                isOnline ? 'bg-emerald-400' : 'bg-slate-600'
              }`}
            />
          </div>

          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-white text-base leading-tight truncate group-hover:text-brand-300 transition-colors">
              {name}
            </h3>
            <div className="flex items-center gap-1.5 mt-1">
              <span className="text-sm">{CATEGORY_ICONS[category]}</span>
              <span className="text-xs text-slate-400">{category}</span>
            </div>
          </div>

          <Badge color={isOnline ? 'green' : 'slate'} dot={isOnline}>
            {isOnline ? 'Online' : 'Offline'}
          </Badge>
        </div>

        {/* Bio */}
        <p className="text-sm text-slate-400 leading-relaxed mb-4 line-clamp-2">
          {truncate(bio, 110)}
        </p>

        {/* Expertise tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {expertise.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 text-xs rounded-full bg-white/5 text-slate-400 border border-white/8"
            >
              {tag}
            </span>
          ))}
          {expertise.length > 3 && (
            <span className="px-2 py-0.5 text-xs rounded-full bg-white/5 text-slate-500">
              +{expertise.length - 3}
            </span>
          )}
        </div>

        {/* Stats row */}
        <div className="flex items-center gap-4 text-xs text-slate-400 mb-5">
          <div className="flex items-center gap-1">
            <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
            <span className="font-medium text-slate-200">{rating.toFixed(1)}</span>
            <span>({reviewCount})</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            <span>{experience}y exp</span>
          </div>
          <div className="flex items-center gap-1">
            <CircleDot className="w-3.5 h-3.5" />
            <span>{totalSessions} sessions</span>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-white/8">
          <div>
            <span className="text-xl font-bold text-white">{formatCurrency(price)}</span>
            <span className="text-xs text-slate-500 ml-1">/ session</span>
          </div>
          <Link to={`/experts/${_id}`}>
            <Button size="sm" variant="primary">View & Book</Button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
});

ExpertCard.displayName = 'ExpertCard';
export default ExpertCard;
