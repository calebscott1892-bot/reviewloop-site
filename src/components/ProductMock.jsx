import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { CornerBrackets, Stars, EASE } from './primitives.jsx';

/**
 * ReviewLoop hero visual — an editorial "blueprint" of the review pipeline,
 * in the C4 engineering-drawing style: hairline borders, monospace labels,
 * minimal radius, accent used sparingly. Light, not a dark neon window.
 */
const STEPS = [
  { n: '01', label: 'REQUEST SENT', sub: 'Sarah M. · Bathroom reno' },
  { n: '02', label: 'LINK OPENED', sub: 'Tracked · 2h after job' },
];

export default function ProductMock() {
  const reduce = useReducedMotion();
  const rise = (delay) =>
    reduce ? {} : { initial: { opacity: 0, y: 10 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.6, delay, ease: EASE } };

  return (
    <div className="relative">
      <motion.div
        {...rise(0.1)}
        className="relative rounded-[10px] border border-line bg-card"
        style={{ boxShadow: 'var(--shadow-panel)' }}
      >
        <CornerBrackets inset={10} size={16} />

        {/* Header bar */}
        <div className="flex items-center justify-between border-b border-line px-5 py-3">
          <span className="mono inline-flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.18em] text-ink-subtle">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            ReviewLoop · Review pipeline
          </span>
          <span className="mono hidden text-[9px] uppercase tracking-[0.2em] text-ink-faint sm:inline">Sheet · RL-01</span>
        </div>

        {/* Pipeline */}
        <div className="px-5 py-6">
          <div className="relative">
            {STEPS.map((s, i) => (
              <motion.div key={s.n} {...rise(0.2 + i * 0.1)} className="relative flex items-start gap-4 pb-6">
                <span className="mono mt-0.5 text-[11px] font-semibold tabular-nums text-accent">{s.n}</span>
                <span className="absolute left-[7px] top-5 h-[calc(100%-12px)] w-px bg-line" aria-hidden="true" />
                <div className="min-w-0">
                  <div className="mono text-[11px] font-semibold uppercase tracking-[0.14em] text-ink">{s.label}</div>
                  <div className="mt-1 text-[12.5px] text-ink-muted">{s.sub}</div>
                </div>
              </motion.div>
            ))}

            {/* The payoff — the review, highlighted */}
            <motion.div
              {...rise(0.42)}
              className="relative flex items-start gap-4 rounded-[3px] border border-accent-line bg-[color:var(--accent-soft)] px-4 py-3"
            >
              <span className="mono mt-0.5 text-[11px] font-semibold tabular-nums text-accent">03</span>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between">
                  <span className="mono text-[11px] font-semibold uppercase tracking-[0.14em] text-ink">Review received</span>
                  <Stars size={12} />
                </div>
                <p className="mt-1.5 text-[12.5px] leading-snug text-ink">“Spotless work and easy to deal with. Highly recommend.”</p>
                <p className="mono mt-1 text-[10px] uppercase tracking-[0.12em] text-ink-subtle">Sarah M. · Google · just now</p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Stat footer */}
        <motion.div {...rise(0.56)} className="grid grid-cols-3 border-t border-line">
          <Stat n="24" label="Requests" />
          <Stat n="11" label="Reviews" divider />
          <Stat n="4.9" label="Avg rating" divider />
        </motion.div>
      </motion.div>
    </div>
  );
}

function Stat({ n, label, divider }) {
  return (
    <div className={`px-4 py-4 ${divider ? 'border-l border-line' : ''}`}>
      <div className="text-[22px] font-semibold tabular-nums tracking-[-0.02em] text-ink">{n}</div>
      <div className="mono mt-1 text-[9px] uppercase tracking-[0.18em] text-ink-faint">{label}</div>
    </div>
  );
}
