/**
 * Shimmer skeleton primitives used across loading states.
 * The shimmer animation is defined in tailwind.config.js.
 */
const shimmer = `relative overflow-hidden bg-surface-200 before:absolute before:inset-0
  before:bg-gradient-to-r before:from-transparent before:via-white/5 before:to-transparent
  before:animate-shimmer before:bg-[length:200%_100%]`;

export const SkeletonBox = ({ className = '' }) => (
  <div className={`rounded-lg ${shimmer} ${className}`} />
);

export const SkeletonText = ({ lines = 1, className = '' }) => (
  <div className={`space-y-2 ${className}`}>
    {Array.from({ length: lines }).map((_, i) => (
      <div
        key={i}
        className={`h-4 rounded ${shimmer}`}
        style={{ width: i === lines - 1 && lines > 1 ? '60%' : '100%' }}
      />
    ))}
  </div>
);

export const ExpertCardSkeleton = () => (
  <div className="rounded-2xl bg-surface-100 border border-white/5 p-6 space-y-4">
    <div className="flex items-start gap-4">
      <SkeletonBox className="w-16 h-16 rounded-full shrink-0" />
      <div className="flex-1 space-y-2">
        <SkeletonBox className="h-5 w-3/4" />
        <SkeletonBox className="h-4 w-1/2" />
      </div>
    </div>
    <SkeletonText lines={3} />
    <div className="flex gap-2">
      <SkeletonBox className="h-6 w-20 rounded-full" />
      <SkeletonBox className="h-6 w-16 rounded-full" />
    </div>
    <div className="flex items-center justify-between pt-2">
      <SkeletonBox className="h-6 w-24" />
      <SkeletonBox className="h-10 w-28 rounded-lg" />
    </div>
  </div>
);

export const ExpertDetailSkeleton = () => (
  <div className="space-y-8">
    <div className="flex gap-6">
      <SkeletonBox className="w-32 h-32 rounded-2xl shrink-0" />
      <div className="flex-1 space-y-3">
        <SkeletonBox className="h-8 w-1/2" />
        <SkeletonBox className="h-5 w-1/3" />
        <SkeletonText lines={2} />
      </div>
    </div>
    <SkeletonText lines={5} />
    <div className="grid grid-cols-4 gap-3">
      {Array.from({ length: 8 }).map((_, i) => (
        <SkeletonBox key={i} className="h-12 rounded-xl" />
      ))}
    </div>
  </div>
);

export const BookingCardSkeleton = () => (
  <div className="rounded-2xl bg-surface-100 border border-white/5 p-5 space-y-3">
    <div className="flex justify-between">
      <SkeletonBox className="h-5 w-32" />
      <SkeletonBox className="h-6 w-20 rounded-full" />
    </div>
    <SkeletonText lines={2} />
    <SkeletonBox className="h-10 rounded-lg" />
  </div>
);
