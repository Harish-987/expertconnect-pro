import { format, parseISO, isToday, isTomorrow, addDays } from 'date-fns';

export const formatDate = (dateStr) => {
  try {
    const d = parseISO(dateStr);
    if (isToday(d))    return 'Today';
    if (isTomorrow(d)) return 'Tomorrow';
    return format(d, 'EEE, MMM d');
  } catch {
    return dateStr;
  }
};

export const formatFullDate = (dateStr) => {
  try {
    return format(parseISO(dateStr), 'MMMM d, yyyy');
  } catch {
    return dateStr;
  }
};

export const formatTime = (timeStr) => {
  // "09:00" → "9:00 AM"
  const [h, m] = timeStr.split(':').map(Number);
  const period = h >= 12 ? 'PM' : 'AM';
  const hour12 = h % 12 || 12;
  return `${hour12}:${m.toString().padStart(2, '0')} ${period}`;
};

export const formatCurrency = (amount) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(amount);

export const formatBookingId = (id) => id?.toUpperCase() || '—';

export const truncate = (str, n = 120) =>
  str && str.length > n ? `${str.slice(0, n).trimEnd()}…` : str;

export const formatRelativeDate = (dateStr) => {
  try {
    const d = new Date(dateStr);
    const diff = Math.floor((Date.now() - d) / 1000);
    if (diff < 60)       return 'just now';
    if (diff < 3600)     return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400)    return `${Math.floor(diff / 3600)}h ago`;
    if (diff < 604800)   return `${Math.floor(diff / 86400)}d ago`;
    return format(d, 'MMM d, yyyy');
  } catch {
    return dateStr;
  }
};

export const generateUpcomingDates = (n = 7) => {
  const dates = [];
  for (let i = 1; i <= n; i++) {
    const d = addDays(new Date(), i);
    if (d.getDay() !== 0 && d.getDay() !== 6) {
      dates.push(format(d, 'yyyy-MM-dd'));
    }
  }
  return dates;
};
