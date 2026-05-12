import { forwardRef } from 'react';

const Input = forwardRef(
  ({ label, error, hint, className = '', icon, rightElement, ...props }, ref) => (
    <div className="space-y-1.5">
      {label && (
        <label className="block text-sm font-medium text-slate-300">
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
            {icon}
          </span>
        )}
        <input
          ref={ref}
          className={`
            w-full bg-surface-200 border rounded-lg px-3 py-2.5 text-slate-100
            placeholder:text-slate-500 text-sm
            transition-colors duration-200
            focus:outline-none focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500/60
            disabled:opacity-50 disabled:cursor-not-allowed
            ${error ? 'border-red-500/60 focus:ring-red-500/40' : 'border-white/10 hover:border-white/20'}
            ${icon ? 'pl-10' : ''}
            ${rightElement ? 'pr-12' : ''}
            ${className}
          `}
          {...props}
        />
        {rightElement && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2">
            {rightElement}
          </span>
        )}
      </div>
      {error && (
        <p className="text-xs text-red-400 flex items-center gap-1">
          <span>⚠</span> {error}
        </p>
      )}
      {hint && !error && (
        <p className="text-xs text-slate-500">{hint}</p>
      )}
    </div>
  )
);

Input.displayName = 'Input';

export const Textarea = forwardRef(
  ({ label, error, className = '', ...props }, ref) => (
    <div className="space-y-1.5">
      {label && (
        <label className="block text-sm font-medium text-slate-300">{label}</label>
      )}
      <textarea
        ref={ref}
        rows={4}
        className={`
          w-full bg-surface-200 border rounded-lg px-3 py-2.5 text-slate-100
          placeholder:text-slate-500 text-sm resize-none
          transition-colors duration-200
          focus:outline-none focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500/60
          ${error ? 'border-red-500/60' : 'border-white/10 hover:border-white/20'}
          ${className}
        `}
        {...props}
      />
      {error && <p className="text-xs text-red-400">⚠ {error}</p>}
    </div>
  )
);

Textarea.displayName = 'Textarea';

export default Input;
