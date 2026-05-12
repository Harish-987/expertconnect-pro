const colorMap = {
  indigo:  'bg-brand-500/15 text-brand-300 border-brand-500/30',
  green:   'bg-emerald-500/15 text-emerald-300 border-emerald-500/30',
  yellow:  'bg-amber-500/15 text-amber-300 border-amber-500/30',
  red:     'bg-red-500/15 text-red-300 border-red-500/30',
  blue:    'bg-blue-500/15 text-blue-300 border-blue-500/30',
  cyan:    'bg-cyan-500/15 text-cyan-300 border-cyan-500/30',
  violet:  'bg-violet-500/15 text-violet-300 border-violet-500/30',
  orange:  'bg-orange-500/15 text-orange-300 border-orange-500/30',
  slate:   'bg-slate-500/15 text-slate-300 border-slate-500/30',
  pink:    'bg-pink-500/15 text-pink-300 border-pink-500/30',
  emerald: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30',
  teal:    'bg-teal-500/15 text-teal-300 border-teal-500/30',
};

const Badge = ({ children, color = 'indigo', className = '', dot = false }) => (
  <span
    className={`
      inline-flex items-center gap-1.5 px-2.5 py-0.5
      text-xs font-medium rounded-full border
      ${colorMap[color] || colorMap.indigo}
      ${className}
    `}
  >
    {dot && (
      <span className={`w-1.5 h-1.5 rounded-full bg-current animate-pulse`} />
    )}
    {children}
  </span>
);

export default Badge;
