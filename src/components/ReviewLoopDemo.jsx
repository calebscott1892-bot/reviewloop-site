import React, { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion, useInView, AnimatePresence } from 'framer-motion';
import { CornerBrackets, Star, EASE } from './primitives.jsx';

/*
 * The ReviewLoop hero, alive — a self-running mini product demo.
 *
 * One quiet loop, the product's whole job made visible:
 *   1. a finished job lands
 *   2. a templated review-request email sends
 *   3. a happy customer leaves a 5-star review (stars fill ★ by ★)
 *   4. the month's review count ticks up and the average rating settles to 4.9
 * Then it parks for a beat and loops.
 *
 * SSR/prerender-safe: the card renders a complete, readable "settled" state
 * server-side (final stars, final counts). Animation only enhances the client,
 * and is fully gated by prefers-reduced-motion — reduced-motion users see the
 * same settled card with no motion.
 */

// Phases of the loop. Each carries the email/review "stage" the card reflects.
const PHASES = [
  { key: 'job', dwell: 1700 },
  { key: 'send', dwell: 2100 },
  { key: 'review', dwell: 2600 },
  { key: 'count', dwell: 2600 },
];

const FINAL = { reviews: 38, rating: 4.9, requests: 41 };
const START = { reviews: 37, rating: 4.8 };

export default function ReviewLoopDemo() {
  const reduce = useReducedMotion();
  const rootRef = useRef(null);
  const inView = useInView(rootRef, { margin: '0px 0px -20% 0px' });

  // phase index drives the whole demo
  const [phase, setPhase] = useState(0);
  // animated readouts
  const [stars, setStars] = useState(0);
  const [reviews, setReviews] = useState(START.reviews);
  const [rating, setRating] = useState(START.rating);
  const [requests, setRequests] = useState(FINAL.requests - 1);

  const running = !reduce && inView;

  // ── Phase advancer ──────────────────────────────────────────────
  useEffect(() => {
    if (!running) return;
    const t = setTimeout(() => setPhase((p) => (p + 1) % PHASES.length), PHASES[phase].dwell);
    return () => clearTimeout(t);
  }, [phase, running]);

  // ── Per-phase side effects (stars fill, counts tick) ────────────
  useEffect(() => {
    if (!running) return;
    const timers = [];

    if (phase === 0) {
      // reset to pre-review baseline for a clean loop
      setStars(0);
      setReviews(START.reviews);
      setRating(START.rating);
      setRequests(FINAL.requests - 1);
    }

    if (phase === 1) {
      // request goes out — requests counter nudges up
      timers.push(setTimeout(() => setRequests(FINAL.requests), 600));
    }

    if (phase === 2) {
      // five stars fill one by one
      for (let i = 1; i <= 5; i++) {
        timers.push(setTimeout(() => setStars(i), 260 + i * 230));
      }
    }

    if (phase === 3) {
      // review lands: month count ticks up, rating settles to 4.9
      timers.push(setTimeout(() => setReviews(FINAL.reviews), 350));
      timers.push(setTimeout(() => setRating(FINAL.rating), 700));
    }

    return () => timers.forEach(clearTimeout);
  }, [phase, running]);

  // When reduced-motion / not running, show the fully settled state.
  const settledStars = running ? stars : 5;
  const settledReviews = running ? reviews : FINAL.reviews;
  const settledRating = running ? rating : FINAL.rating;
  const settledRequests = running ? requests : FINAL.requests;

  return (
    <div ref={rootRef} className="relative">
      {/* soft accent halo behind the panel */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-6 -z-10 rounded-[28px] opacity-70"
        style={{ background: 'radial-gradient(60% 55% at 70% 25%, var(--accent-soft), transparent 70%)' }}
      />

      <div className="card relative overflow-hidden p-0" style={{ boxShadow: 'var(--shadow-panel)' }}>
        <CornerBrackets inset={10} size={16} />

        {/* Header bar */}
        <div className="flex items-center justify-between border-b border-line px-5 py-3">
          <span className="mono inline-flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.18em] text-ink-subtle">
            <span className="relative flex h-1.5 w-1.5" aria-hidden="true">
              {running && (
                <motion.span
                  className="absolute inline-flex h-full w-full rounded-full bg-accent"
                  animate={{ scale: [1, 2.6], opacity: [0.5, 0] }}
                  transition={{ duration: 1.9, repeat: Infinity, ease: 'easeOut' }}
                />
              )}
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
            </span>
            ReviewLoop · live
          </span>
          <PhaseTicker phase={phase} running={running} />
        </div>

        {/* Stage — the animated story */}
        <div className="px-5 pt-5 pb-4">
          <div className="relative min-h-[148px]">
            {running ? (
              <AnimatePresence mode="wait">
                <Stage key={phase} phase={phase} stars={settledStars} />
              </AnimatePresence>
            ) : (
              // SSR / reduced-motion: render the meaningful settled review.
              <ReviewCard stars={5} />
            )}
          </div>
        </div>

        {/* Stat footer — the running scoreboard */}
        <div className="grid grid-cols-3 border-t border-line">
          <Stat n={settledRequests} label="Requests sent" />
          <Stat n={settledReviews} label="Reviews this month" divider live={running && phase === 3} />
          <Stat n={settledRating.toFixed(1)} label="Avg rating" divider />
        </div>
      </div>
    </div>
  );
}

/* ── The rotating stage content ─────────────────────────────────── */
function Stage({ phase, stars }) {
  const fade = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -8 },
    transition: { duration: 0.5, ease: EASE },
  };

  if (phase === 0) {
    return (
      <motion.div {...fade}>
        <RowLabel n="01" label="Job finished" />
        <div className="mt-3 flex items-center gap-3 rounded-[5px] border border-line bg-[color:var(--bg-alt)] px-4 py-3">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-card text-[12px] font-semibold text-ink">
            SM
          </span>
          <div className="min-w-0">
            <p className="text-[13px] font-medium leading-tight text-ink">Sarah M.</p>
            <p className="mt-0.5 text-[12px] text-ink-muted">Bathroom renovation · completed today</p>
          </div>
        </div>
      </motion.div>
    );
  }

  if (phase === 1) {
    return (
      <motion.div {...fade}>
        <RowLabel n="02" label="Review request sent" />
        <div className="mt-3 rounded-[5px] border border-line bg-card px-4 py-3">
          <div className="flex items-center justify-between">
            <span className="mono text-[9.5px] uppercase tracking-[0.16em] text-ink-faint">To: Sarah M.</span>
            <motion.span
              className="mono inline-flex items-center gap-1.5 text-[9.5px] uppercase tracking-[0.14em] text-accent"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.4 }}
            >
              <SendIcon /> Sent
            </motion.span>
          </div>
          <p className="mt-2 text-[12.5px] leading-snug text-ink">
            Thanks for choosing us, Sarah. Would you mind leaving a quick review?
          </p>
          <div className="mt-2.5 inline-flex items-center gap-1.5 rounded-full bg-[color:var(--accent-soft)] px-2.5 py-1">
            <span className="h-1 w-1 rounded-full bg-accent" />
            <span className="mono text-[9px] uppercase tracking-[0.12em] text-accent">Leave a review</span>
          </div>
        </div>
      </motion.div>
    );
  }

  // phases 2 & 3 both show the review filling / landed
  return (
    <motion.div {...fade}>
      <RowLabel n="03" label={phase === 3 ? 'Review on your Google profile' : 'Customer is reviewing…'} />
      <div className="mt-3">
        <ReviewCard stars={stars} landed={phase === 3} />
      </div>
    </motion.div>
  );
}

/* ── A Google-style review card (also the SSR fallback) ──────────── */
function ReviewCard({ stars = 5, landed = false }) {
  return (
    <div className="rounded-[5px] border border-accent-line bg-[color:var(--accent-soft)] px-4 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-card text-[11px] font-semibold text-ink">
            SM
          </span>
          <div className="leading-tight">
            <p className="text-[12.5px] font-medium text-ink">Sarah M.</p>
            <p className="mono text-[9px] uppercase tracking-[0.12em] text-ink-subtle">
              {landed ? 'Posted · just now' : 'Google'}
            </p>
          </div>
        </div>
        <StarRow filled={stars} />
      </div>
      <p className="mt-2.5 text-[12.5px] leading-snug text-ink">
        “Spotless work and easy to deal with. Highly recommend.”
      </p>
    </div>
  );
}

/* Five stars; `filled` of them are amber, the rest are hairline outlines. */
function StarRow({ filled = 5 }) {
  return (
    <span className="inline-flex items-center gap-0.5" aria-label={`${filled} of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => {
        const on = i < filled;
        return (
          <motion.span
            key={i}
            className={on ? 'text-accent' : 'text-line'}
            initial={false}
            animate={on ? { scale: [1, 1.35, 1] } : { scale: 1 }}
            transition={{ duration: 0.32, ease: EASE }}
            style={{ display: 'inline-flex' }}
          >
            <Star size={13} />
          </motion.span>
        );
      })}
    </span>
  );
}

function RowLabel({ n, label }) {
  return (
    <div className="flex items-center gap-2.5">
      <span className="mono text-[11px] font-semibold tabular-nums text-accent">{n}</span>
      <span className="mono text-[10px] font-semibold uppercase tracking-[0.16em] text-ink-subtle">{label}</span>
    </div>
  );
}

/* Tiny step ticker in the header that mirrors the current phase. */
function PhaseTicker({ phase, running }) {
  if (!running) {
    return <span className="mono hidden text-[9px] uppercase tracking-[0.2em] text-ink-faint sm:inline">Sheet · RL-01</span>;
  }
  return (
    <span className="inline-flex items-center gap-1.5" aria-hidden="true">
      {PHASES.map((p, i) => (
        <span
          key={p.key}
          className="h-1 rounded-full transition-all duration-500"
          style={{
            width: i === phase ? 16 : 6,
            background: i === phase ? 'var(--accent)' : 'var(--border)',
          }}
        />
      ))}
    </span>
  );
}

function Stat({ n, label, divider, live }) {
  return (
    <div className={`px-4 py-4 ${divider ? 'border-l border-line' : ''}`}>
      <div className="relative inline-flex items-center gap-1.5">
        <span className="text-[22px] font-semibold tabular-nums tracking-[-0.02em] text-ink">{n}</span>
        {live && (
          <motion.span
            className="mono text-[9px] font-semibold uppercase tracking-[0.1em] text-accent"
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: [0, 1, 0], y: [4, 0, -2] }}
            transition={{ duration: 1.6, ease: EASE }}
          >
            +1
          </motion.span>
        )}
      </div>
      <div className="mono mt-1 text-[9px] uppercase tracking-[0.18em] text-ink-faint">{label}</div>
    </div>
  );
}

function SendIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 2L11 13M22 2l-7 20-4-9-9-4z" />
    </svg>
  );
}
