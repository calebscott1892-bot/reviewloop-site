import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { EASE, ArrowRight } from './primitives.jsx';

/**
 * Floating scroll-to-top control. Appears after ~600px of scroll, fixed
 * bottom-right, accent-styled. Smooth-scrolls to top (instant under
 * prefers-reduced-motion). SSR-safe — renders nothing until mounted client-side.
 */
export default function ScrollToTop() {
  const reduce = useReducedMotion();
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const toTop = () => {
    window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.button
          type="button"
          onClick={toTop}
          aria-label="Back to top"
          initial={reduce ? false : { opacity: 0, y: 12, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={reduce ? { opacity: 0 } : { opacity: 0, y: 12, scale: 0.9 }}
          transition={{ duration: 0.28, ease: EASE }}
          className="fixed bottom-6 right-6 z-50 inline-grid h-12 w-12 place-items-center rounded-full bg-accent text-[color:var(--accent-ink)] shadow-[var(--shadow-card)] transition-[transform,filter] duration-300 hover:-translate-y-0.5 hover:brightness-[1.06]"
        >
          <ArrowRight size={18} className="-rotate-90 group-hover:translate-x-0" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
