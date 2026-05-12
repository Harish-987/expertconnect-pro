import { motion } from 'framer-motion';

const variants = {
  primary:   'bg-btn-primary hover:bg-btn-primary-hover text-white shadow-glow-sm hover:shadow-glow-md',
  secondary: 'bg-surface-200 hover:bg-surface-300 text-slate-200 border border-white/10',
  ghost:     'bg-transparent hover:bg-white/5 text-slate-300',
  danger:    'bg-red-600/20 hover:bg-red-600/30 text-red-400 border border-red-500/30',
  outline:   'bg-transparent border border-brand-500/50 text-brand-400 hover:bg-brand-500/10',
};

const sizes = {
  sm:  'px-3 py-1.5 text-sm',
  md:  'px-4 py-2.5 text-sm',
  lg:  'px-6 py-3 text-base',
  xl:  'px-8 py-4 text-base',
};

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  className = '',
  onClick,
  type = 'button',
  fullWidth = false,
  icon,
  iconRight,
  ...props
}) => (
  <motion.button
    type={type}
    onClick={onClick}
    disabled={disabled || loading}
    whileHover={!disabled && !loading ? { scale: 1.02 } : {}}
    whileTap={!disabled && !loading ? { scale: 0.97 } : {}}
    className={`
      inline-flex items-center justify-center gap-2 font-medium rounded-lg
      transition-all duration-200 cursor-pointer select-none
      disabled:opacity-50 disabled:cursor-not-allowed
      ${variants[variant]}
      ${sizes[size]}
      ${fullWidth ? 'w-full' : ''}
      ${className}
    `}
    {...props}
  >
    {loading ? (
      <>
        <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
        <span>Loading…</span>
      </>
    ) : (
      <>
        {icon && <span className="shrink-0">{icon}</span>}
        {children}
        {iconRight && <span className="shrink-0">{iconRight}</span>}
      </>
    )}
  </motion.button>
);

export default Button;
