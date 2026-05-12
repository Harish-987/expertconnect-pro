/**
 * Centralised Framer Motion variant library.
 * Import from here rather than defining inline so animations stay consistent.
 */

export const fadeUp = {
  hidden:  { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

export const fadeIn = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.4 } },
};

export const fadeLeft = {
  hidden:  { opacity: 0, x: -30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

export const fadeRight = {
  hidden:  { opacity: 0, x: 30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

export const scaleIn = {
  hidden:  { opacity: 0, scale: 0.92 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } },
};

export const staggerContainer = (stagger = 0.08, delayChildren = 0) => ({
  hidden:  {},
  visible: { transition: { staggerChildren: stagger, delayChildren } },
});

export const cardHover = {
  rest:  { scale: 1,    y: 0,   boxShadow: '0 4px 24px rgba(0,0,0,0.3)' },
  hover: { scale: 1.02, y: -4, boxShadow: '0 12px 40px rgba(99,102,241,0.25)' },
};

export const buttonTap = {
  rest:  { scale: 1 },
  hover: { scale: 1.03 },
  tap:   { scale: 0.97 },
};

export const slideDown = {
  hidden:  { height: 0, opacity: 0, overflow: 'hidden' },
  visible: { height: 'auto', opacity: 1, overflow: 'hidden', transition: { duration: 0.3 } },
  exit:    { height: 0, opacity: 0, overflow: 'hidden', transition: { duration: 0.25 } },
};

export const pageTransition = {
  initial:  { opacity: 0, y: 16 },
  animate:  { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
  exit:     { opacity: 0, y: -8, transition: { duration: 0.2 } },
};

export const navbarSlide = {
  hidden:  { y: -80, opacity: 0 },
  visible: { y: 0,   opacity: 1, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
};

export const successPop = {
  hidden:  { scale: 0, opacity: 0 },
  visible: {
    scale: 1, opacity: 1,
    transition: { type: 'spring', stiffness: 300, damping: 20 },
  },
};

export const slotVariants = {
  available: {
    scale: 1, opacity: 1,
    backgroundColor: 'rgba(99,102,241,0.08)',
    borderColor: 'rgba(99,102,241,0.3)',
    color: '#a5b4fc',
  },
  booked: {
    scale: 0.97, opacity: 0.4,
    backgroundColor: 'rgba(30,30,50,0.4)',
    borderColor: 'rgba(255,255,255,0.05)',
    color: '#4b5563',
  },
  selected: {
    scale: 1.05, opacity: 1,
    backgroundColor: 'rgba(99,102,241,0.25)',
    borderColor: 'rgba(99,102,241,0.8)',
    color: '#ffffff',
    boxShadow: '0 0 16px rgba(99,102,241,0.4)',
  },
};
