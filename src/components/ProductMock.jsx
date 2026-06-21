import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Stars, Star, Check, EASE } from './primitives.jsx';

/**
 * Crafted in-product mockup of ReviewLoop — an app window showing a review
 * request being sent and reviews rolling in. Styled in the C4 dark language
 * with ReviewLoop's gold accent. (Swap for a real suite-app screenshot later.)
 */
export default function ProductMock() {
  const reduce = useReducedMotion();
  const rise = (delay) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 14 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.6, delay, ease: EASE },
        };

  return (
    <div className="relative">
      {/* Ambient glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-8 -z-10 rounded-[40px] opacity-60 blur-3xl"
        style={{ background: 'radial-gradient(60% 60% at 70% 20%, var(--accent-glow), transparent 70%)' }}
      />

      <motion.div
        {...rise(0.05)}
        className="overflow-hidden rounded-2xl border border-line bg-card shadow-[0_30px_80px_-30px_rgba(0,0,0,0.8)]"
      >
        {/* Window chrome */}
        <div className="flex items-center gap-2 border-b border-line bg-white/[0.02] px-4 py-3">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
          <span className="ml-3 flex items-center gap-2 text-xs font-medium text-ink-subtle">
            <Star size={12} /> ReviewLoop
          </span>
          <span className="ml-auto rounded-full bg-accent-soft px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-accent">
            Live
          </span>
        </div>

        <div className="grid gap-4 p-4 sm:grid-cols-5">
          {/* Composer */}
          <motion.div {...rise(0.18)} className="sm:col-span-3 rounded-xl border border-line bg-bg-alt p-4">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-ink-subtle">New request</p>
            <div className="mt-3 space-y-2.5">
              <Field label="Customer" value="Sarah M." />
              <Field label="Job" value="Bathroom reno — Mosman Park" />
              <Field label="Send" value="2 hours after completion" />
            </div>
            <button
              type="button"
              tabIndex={-1}
              aria-hidden="true"
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-accent py-2.5 text-sm font-semibold text-[color:var(--accent-ink)]"
            >
              Send review request
            </button>
            <p className="mt-2.5 text-center text-[11px] text-ink-faint">Polite follow-up in 3 days if no response</p>
          </motion.div>

          {/* Activity feed */}
          <div className="sm:col-span-2 flex flex-col gap-2.5">
            <motion.div {...rise(0.3)} className="rounded-xl border border-line bg-bg-alt p-3">
              <Row icon={<Check className="text-[#28c840]" />} title="Request sent" sub="James • Fence repair" />
            </motion.div>
            <motion.div {...rise(0.42)} className="rounded-xl border border-line bg-bg-alt p-3">
              <Row icon={<EyeIcon />} title="Link opened" sub="Priya • Roof inspection" />
            </motion.div>

            {/* The payoff: a fresh 5-star review sliding in */}
            <motion.div
              initial={reduce ? false : { opacity: 0, x: 16, scale: 0.97 }}
              animate={reduce ? {} : { opacity: 1, x: 0, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.62, ease: EASE }}
              className="rounded-xl border border-accent-line bg-accent-soft p-3"
            >
              <div className="flex items-center justify-between">
                <Stars size={13} />
                <span className="rounded-full bg-accent/20 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-accent">
                  New review
                </span>
              </div>
              <p className="mt-1.5 text-[12px] leading-snug text-ink">
                “Spotless work and easy to deal with. Highly recommend.”
              </p>
              <p className="mt-1 text-[11px] text-ink-subtle">Sarah M. · just now · Google</p>
            </motion.div>
          </div>
        </div>

        {/* Stat strip */}
        <motion.div
          {...rise(0.78)}
          className="grid grid-cols-3 divide-x divide-line border-t border-line bg-white/[0.015] text-center"
        >
          <Stat value="24" label="requests" />
          <Stat value="11" label="new reviews" />
          <Stat value="4.9★" label="avg rating" />
        </motion.div>
      </motion.div>
    </div>
  );
}

function Field({ label, value }) {
  return (
    <div className="flex items-center gap-3 rounded-lg border border-line bg-bg px-3 py-2">
      <span className="w-16 shrink-0 text-[11px] font-medium text-ink-faint">{label}</span>
      <span className="truncate text-[13px] text-ink">{value}</span>
    </div>
  );
}

function Row({ icon, title, sub }) {
  return (
    <div className="flex items-center gap-2.5">
      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-line bg-bg">
        {icon}
      </span>
      <span className="min-w-0">
        <span className="block truncate text-[12px] font-semibold text-ink">{title}</span>
        <span className="block truncate text-[11px] text-ink-subtle">{sub}</span>
      </span>
    </div>
  );
}

function Stat({ value, label }) {
  return (
    <div className="px-2 py-3">
      <div className="text-base font-bold text-ink">{value}</div>
      <div className="text-[10px] uppercase tracking-wider text-ink-faint">{label}</div>
    </div>
  );
}

function EyeIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-ink-subtle">
      <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}
