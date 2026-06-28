import React from 'react';
import { motion, AnimatePresence, useReducedMotion, useInView } from 'framer-motion';
import { product, content } from '../data/product.js';
import { Container, Section, Eyebrow, Reveal, EASE, Star } from './primitives.jsx';

/*
 * Animated "How it works" — a self-running, three-act product demo.
 *
 * The three steps mirror product.howItWorks (copy source of truth), each paired
 * with a bespoke amber-accent mini-visual that acts out the step:
 *   1. Add the customer after a job — drop in who you just served.
 *   2. We send the request — a timed, templated email goes out, then a polite
 *      follow-up if there's no response.
 *   3. ★★★★★ reviews land — a five-star review posts to your Google profile
 *      (and on Pro, AI drafts your reply).
 *
 * Behaviour: renders meaningful content server-side (all steps + first panel),
 * auto-advances once scrolled into view (with a clickable stepper + progress
 * bar), and fully respects prefers-reduced-motion (no auto-advance, each visual
 * shows its resolved end state). Matches ReturnDesk's craft: premium, not flashy.
 */

const STEP_MS = 4600;
const SUCCESS = '#1f9d57';

// Per-step headings for the panel header + stepper. Kept beside the visuals;
// body copy stays sourced from product.howItWorks.
const HEADINGS = [
  'Add the customer after a job',
  'We send the request — and a polite follow-up',
  '★★★★★ reviews land on your Google profile',
];

function SendIcon({ size = 11 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 2L11 13M22 2l-7 20-4-9-9-4z" />
    </svg>
  );
}

/* Five stars; `filled` of them are amber, the rest are hairline outlines. */
function StarRow({ filled = 5, animate = false, size = 13 }) {
  return (
    <span className="inline-flex items-center gap-0.5" aria-label={`${filled} of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => {
        const on = i < filled;
        return (
          <motion.span
            key={i}
            className={on ? 'text-accent' : 'text-line'}
            initial={false}
            animate={on && animate ? { scale: [1, 1.35, 1] } : { scale: 1 }}
            transition={{ duration: 0.32, ease: EASE }}
            style={{ display: 'inline-flex' }}
          >
            <Star size={size} />
          </motion.span>
        );
      })}
    </span>
  );
}

/* ── Step 1 visual: drop the just-finished customer/job into ReviewLoop ──── */
function AddVisual({ active, reduce }) {
  const animate = active && !reduce;
  return (
    <div role="img" aria-label="A finished job — Sarah M., bathroom renovation — added to ReviewLoop.">
      <div className="mb-3 flex items-center gap-2">
        <span className="mono text-[9.5px] uppercase tracking-[0.16em] text-ink-faint">Finished job</span>
        <span className="h-px flex-1 bg-line" />
        <span className="mono text-[9.5px] uppercase tracking-[0.16em] text-accent">Added</span>
      </div>

      <motion.div
        className="flex items-center gap-3 rounded-xl border border-line bg-bg px-3.5 py-3"
        initial={reduce ? false : { opacity: 0, y: 14, scale: 0.98 }}
        animate={animate ? { opacity: [0, 1], y: [14, 0], scale: [0.98, 1] } : { opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, delay: animate ? 0.15 : 0, ease: EASE }}
      >
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-card text-[12px] font-semibold text-ink">
          SM
        </span>
        <div className="min-w-0 flex-1">
          <p className="truncate text-[13px] font-medium leading-tight text-ink">Sarah M.</p>
          <p className="mt-0.5 truncate text-[12px] text-ink-muted">Bathroom renovation · completed today</p>
        </div>
        <motion.span
          aria-hidden="true"
          className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full"
          style={{ color: SUCCESS, background: 'color-mix(in srgb, ' + SUCCESS + ' 12%, transparent)' }}
          initial={reduce ? false : { opacity: 0, scale: 0.6 }}
          animate={animate ? { opacity: 1, scale: 1 } : { opacity: 1, scale: 1 }}
          transition={{ duration: 0.35, delay: animate ? 0.7 : 0, ease: EASE }}
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={SUCCESS} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 6L9 17l-5-5" />
          </svg>
        </motion.span>
      </motion.div>

      <motion.p
        className="mono mt-3 text-center text-[9px] uppercase tracking-[0.16em] text-ink-faint"
        initial={reduce ? false : { opacity: 0 }}
        animate={animate ? { opacity: [0, 1] } : { opacity: 1 }}
        transition={{ duration: 0.4, delay: animate ? 1.0 : 0 }}
      >
        Or let it pull from your records
      </motion.p>
    </div>
  );
}

/* ── Step 2 visual: timed request sends, then a polite follow-up ──────────── */
function SendVisual({ active, reduce }) {
  const animate = active && !reduce;
  return (
    <div role="img" aria-label="A templated review request emails to Sarah, then a polite follow-up reminder.">
      {/* The request email */}
      <motion.div
        className="rounded-xl border border-line bg-card px-4 py-3"
        initial={reduce ? false : { opacity: 0, y: 10 }}
        animate={animate ? { opacity: [0, 1], y: [10, 0] } : { opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: animate ? 0.15 : 0, ease: EASE }}
      >
        <div className="flex items-center justify-between">
          <span className="mono text-[9.5px] uppercase tracking-[0.16em] text-ink-faint">To: Sarah M.</span>
          <motion.span
            className="mono inline-flex items-center gap-1.5 text-[9.5px] uppercase tracking-[0.14em] text-accent"
            initial={reduce ? false : { opacity: 0 }}
            animate={animate ? { opacity: [0, 1] } : { opacity: 1 }}
            transition={{ duration: 0.4, delay: animate ? 0.75 : 0 }}
          >
            <SendIcon /> Sent
          </motion.span>
        </div>
        <p className="mt-2 text-[12.5px] leading-snug text-ink">
          Thanks for choosing us, Sarah. Would you mind leaving a quick review?
        </p>
        <div className="mt-2.5 inline-flex items-center gap-1.5 rounded-full bg-accent-soft px-2.5 py-1">
          <span className="h-1 w-1 rounded-full bg-accent" />
          <span className="mono text-[9px] uppercase tracking-[0.12em] text-accent">Leave a review</span>
        </div>
      </motion.div>

      {/* timing connector */}
      <div className="my-2.5 flex items-center gap-2 pl-1">
        <span className="mono text-[9px] uppercase tracking-[0.14em] text-ink-faint">3 days later · no response</span>
        <span className="h-px flex-1 bg-line" />
      </div>

      {/* The polite follow-up */}
      <motion.div
        className="rounded-xl border border-accent-line bg-accent-soft px-4 py-3"
        initial={reduce ? false : { opacity: 0, y: 10 }}
        animate={animate ? { opacity: [0, 1], y: [10, 0] } : { opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: animate ? 1.4 : 0, ease: EASE }}
      >
        <div className="flex items-center justify-between">
          <span className="mono text-[9.5px] uppercase tracking-[0.16em] text-accent">Polite follow-up</span>
          <span className="mono text-[9px] uppercase tracking-[0.14em] text-ink-faint">Once · never pushy</span>
        </div>
        <p className="mt-2 text-[12.5px] leading-snug text-ink">
          Just a gentle nudge, Sarah — your review really helps. No worries if now’s not the time.
        </p>
      </motion.div>
    </div>
  );
}

/* ── Step 3 visual: a 5-star review lands; on Pro, AI drafts the reply ────── */
function ReviewVisual({ active, reduce }) {
  const animate = active && !reduce;
  const [stars, setStars] = React.useState(reduce ? 5 : 0);

  React.useEffect(() => {
    if (!animate) {
      setStars(5);
      return undefined;
    }
    setStars(0);
    const timers = [];
    for (let i = 1; i <= 5; i++) {
      timers.push(setTimeout(() => setStars(i), 250 + i * 220));
    }
    return () => timers.forEach(clearTimeout);
  }, [animate]);

  return (
    <div role="img" aria-label="A five-star review from Sarah M. lands on your Google profile; on Pro, AI drafts your reply.">
      {/* The landed review */}
      <motion.div
        className="rounded-xl border border-accent-line bg-accent-soft px-4 py-3"
        initial={reduce ? false : { opacity: 0, y: 10, scale: 0.98 }}
        animate={animate ? { opacity: [0, 1], y: [10, 0], scale: [0.98, 1] } : { opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.45, delay: animate ? 0.1 : 0, ease: EASE }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-card text-[11px] font-semibold text-ink">
              SM
            </span>
            <div className="leading-tight">
              <p className="text-[12.5px] font-medium text-ink">Sarah M.</p>
              <p className="mono text-[9px] uppercase tracking-[0.12em] text-ink-subtle">Posted · just now</p>
            </div>
          </div>
          <StarRow filled={stars} animate={animate} />
        </div>
        <p className="mt-2.5 text-[12.5px] leading-snug text-ink">
          “Spotless work and easy to deal with. Highly recommend.”
        </p>
      </motion.div>

      {/* On Pro: AI-drafted reply */}
      <motion.div
        className="mt-2.5 rounded-xl border border-line bg-card px-4 py-3"
        initial={reduce ? false : { opacity: 0, y: 10 }}
        animate={animate ? { opacity: [0, 1], y: [10, 0] } : { opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: animate ? 1.7 : 0, ease: EASE }}
      >
        <div className="flex items-center justify-between">
          <span className="mono inline-flex items-center gap-1.5 text-[9.5px] uppercase tracking-[0.14em] text-accent">
            <SparkleIcon /> AI-drafted reply · Pro
          </span>
          <span className="mono text-[9px] uppercase tracking-[0.12em] text-ink-faint">You just post</span>
        </div>
        <p className="mt-2 text-[12.5px] leading-snug text-ink-muted">
          Thank you, Sarah! It was a pleasure — we’re thrilled you’re happy with the new bathroom.
        </p>
      </motion.div>
    </div>
  );
}

function SparkleIcon({ size = 11 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3l1.8 4.9L18.7 9.7l-4.9 1.8L12 16.4l-1.8-4.9L5.3 9.7l4.9-1.8z" />
      <path d="M19 14l.7 1.9 1.9.7-1.9.7-.7 1.9-.7-1.9-1.9-.7 1.9-.7z" />
    </svg>
  );
}

const VISUALS = [AddVisual, SendVisual, ReviewVisual];

export default function HowItWorks() {
  const reduce = useReducedMotion();
  const steps = product.howItWorks;
  const [active, setActive] = React.useState(0);
  const [running, setRunning] = React.useState(false);
  const rootRef = React.useRef(null);
  const inView = useInView(rootRef, { once: false, margin: '0px 0px -25% 0px' });

  // Start the self-running sequence only once the section is on screen.
  React.useEffect(() => {
    if (inView && !reduce) setRunning(true);
  }, [inView, reduce]);

  React.useEffect(() => {
    if (!running || reduce) return undefined;
    const t = setTimeout(() => setActive((a) => (a + 1) % steps.length), STEP_MS);
    return () => clearTimeout(t);
  }, [active, running, reduce, steps.length]);

  const handleStep = (i) => {
    setRunning(false); // user takes over; stop auto-advance
    setActive(i);
  };

  const Visual = VISUALS[active] || VISUALS[0];

  return (
    <Section id="how" className="border-b border-line">
      <Container>
        <Reveal className="max-w-2xl">
          <Eyebrow>How it works</Eyebrow>
          <h2 className="mt-6 text-[clamp(1.8rem,3.4vw,2.7rem)] font-semibold leading-[1.08] tracking-[-0.035em] text-ink">
            {content.howHeadline}
          </h2>
          <p className="mt-5 max-w-[52ch] text-[16px] leading-[1.75] text-ink-muted">{content.howSub}</p>
        </Reveal>

        <div ref={rootRef} className="mt-14 grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(360px,460px)] lg:gap-16">
          {/* Stepper + copy (server-rendered: all steps present) */}
          <div>
            <ol className="space-y-3">
              {steps.map((s, i) => {
                const isActive = i === active;
                return (
                  <li key={s.step}>
                    <button
                      type="button"
                      onClick={() => handleStep(i)}
                      aria-current={isActive ? 'step' : undefined}
                      className="group relative flex w-full gap-4 rounded-2xl border p-5 text-left transition-colors duration-300"
                      style={{
                        borderColor: isActive ? 'var(--accent-line)' : 'var(--border)',
                        background: isActive ? 'var(--accent-soft)' : 'transparent',
                      }}
                    >
                      <span
                        className="mono mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border text-[11px] font-semibold tabular-nums transition-colors duration-300"
                        style={{
                          borderColor: isActive ? 'var(--accent)' : 'var(--border)',
                          color: isActive ? 'var(--accent)' : 'var(--text-faint)',
                          background: isActive ? 'var(--card)' : 'transparent',
                        }}
                      >
                        {s.step}
                      </span>
                      <div className="min-w-0">
                        <h3 className="text-[16px] font-semibold tracking-[-0.015em] text-ink">
                          {HEADINGS[i]}
                        </h3>
                        <p className="mt-1.5 text-[14px] leading-[1.65] text-ink-muted">{s.body}</p>

                        {/* per-step progress bar (only under the active step while running) */}
                        {isActive && (
                          <div className="mt-3.5 h-[3px] overflow-hidden rounded-full" style={{ background: 'var(--bg-alt)' }}>
                            {running && !reduce ? (
                              <motion.span
                                key={active}
                                className="block h-full rounded-full bg-accent"
                                initial={{ width: '0%' }}
                                animate={{ width: '100%' }}
                                transition={{ duration: STEP_MS / 1000, ease: 'linear' }}
                              />
                            ) : (
                              <span className="block h-full w-full rounded-full bg-accent" />
                            )}
                          </div>
                        )}
                      </div>
                    </button>
                  </li>
                );
              })}
            </ol>
          </div>

          {/* Live demo panel */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <div className="relative">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -inset-5 -z-10 rounded-[26px] opacity-70"
                style={{ background: 'radial-gradient(60% 55% at 70% 25%, var(--accent-soft), transparent 70%)' }}
              />
              <div className="card overflow-hidden p-0" style={{ boxShadow: 'var(--shadow-panel)' }}>
                <div className="flex items-center justify-between border-b border-line px-5 py-3.5">
                  <span className="mono text-[10.5px] font-medium uppercase tracking-[0.18em] text-ink-subtle">
                    {HEADINGS[active]}
                  </span>
                  <span className="mono text-[9.5px] uppercase tracking-[0.16em] text-ink-faint">
                    Step {steps[active].step} / {String(steps.length).padStart(2, '0')}
                  </span>
                </div>

                <div className="p-5">
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.div
                      key={active}
                      initial={reduce ? false : { opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={reduce ? undefined : { opacity: 0, y: -8 }}
                      transition={{ duration: 0.4, ease: EASE }}
                    >
                      <Visual active={running || reduce} reduce={reduce} />
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>

              {/* dot progress indicator */}
              <div className="mt-5 flex items-center justify-center gap-2" aria-hidden="true">
                {steps.map((s, i) => (
                  <button
                    key={s.step}
                    type="button"
                    onClick={() => handleStep(i)}
                    className="h-1.5 rounded-full transition-all duration-300"
                    style={{
                      width: i === active ? 22 : 6,
                      background: i === active ? 'var(--accent)' : 'var(--border)',
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
