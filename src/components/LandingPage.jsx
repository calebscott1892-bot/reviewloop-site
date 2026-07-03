import React from 'react';
import { product } from '../data/product.js';
import Footer from './Footer.jsx';
import {
  Container,
  Section,
  Eyebrow,
  Button,
  Card,
  Reveal,
  Wordmark,
  ArrowRight,
  Plus,
  Motif,
} from './primitives.jsx';

const SITE = product.siteUrl;

/** Lightweight header for standalone guide pages — links resolve back to the home site. */
function GuideHeader() {
  return (
    <header
      className="sticky top-0 z-50 border-b border-line backdrop-blur-md"
      style={{ backgroundColor: 'color-mix(in srgb, var(--bg) 90%, transparent)' }}
    >
      <div className="mx-auto flex h-16 w-full max-w-container items-center justify-between px-6 md:px-12">
        <a href="/" className="rounded-[3px]" aria-label={`${product.name} home`}>
          <Wordmark logo={product.logo} name={product.name} />
        </a>
        <div className="flex items-center gap-4">
          <a
            href="/"
            className="mono hidden text-[11px] font-medium uppercase tracking-[0.14em] text-ink-subtle transition-colors hover:text-ink sm:inline"
          >
            Home
          </a>
          <Button href={product.ctaHref} variant="primary" className="px-5 py-2.5">
            {product.ctaLabel}
            <ArrowRight />
          </Button>
        </div>
      </div>
    </header>
  );
}

/**
 * Standalone, SSR-rendered guide / landing page. No client-side routing — each
 * page is prerendered to its own dist/<slug>/index.html and reached by a normal
 * full-page <a href>. Reuses the shared design system + Footer.
 */
export default function LandingPage({ page }) {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-[color:var(--accent-ink)]"
      >
        Skip to content
      </a>
      <GuideHeader />

      <main id="main" tabIndex={-1}>
        {/* Hero */}
        <Section className="relative overflow-hidden border-b border-line">
          <div aria-hidden="true" className="blueprint pointer-events-none absolute inset-0" />
          <Container className="relative">
            {/* Breadcrumb */}
            <nav aria-label="Breadcrumb" className="mono mb-8 text-[11px] uppercase tracking-[0.14em] text-ink-faint">
              <ol className="flex flex-wrap items-center gap-2">
                <li>
                  <a href="/" className="transition-colors hover:text-ink">{product.name}</a>
                </li>
                <li aria-hidden="true">/</li>
                <li>
                  <a href="/#footer-guides" className="transition-colors hover:text-ink">Guides</a>
                </li>
                <li aria-hidden="true">/</li>
                <li aria-current="page" className="text-ink-subtle">{page.eyebrow}</li>
              </ol>
            </nav>

            <Reveal>
              <Eyebrow>{page.eyebrow}</Eyebrow>
              <h1 className="mt-6 max-w-[20ch] text-[clamp(2.1rem,5vw,3.4rem)] font-semibold leading-[1.04] tracking-[-0.035em] text-ink">
                {page.h1}
              </h1>
              <p className="mt-6 max-w-[58ch] text-[16.5px] leading-[1.7] text-ink-muted">{page.lead}</p>
              <div className="mt-9">
                <Button href={product.ctaHref} variant="primary">
                  {product.ctaLabel}
                  <ArrowRight />
                </Button>
              </div>
              <p className="mono mt-6 text-[10.5px] uppercase tracking-[0.16em] text-ink-faint">
                {product.ctaReassurance}
              </p>
            </Reveal>
          </Container>
        </Section>

        {/* Body sections */}
        <Section className="border-b border-line">
          <Container>
            <div className="mx-auto max-w-[68ch] space-y-14">
              {page.sections.map((s, i) => (
                <Reveal key={i} as="article">
                  <h2 className="text-[clamp(1.5rem,3vw,2.1rem)] font-semibold leading-[1.12] tracking-[-0.03em] text-ink">
                    {s.h}
                  </h2>
                  {s.p &&
                    s.p.map((para, j) => (
                      <p key={j} className="mt-5 text-[15.5px] leading-[1.78] text-ink-muted">{para}</p>
                    ))}
                  {s.list && (
                    <ul className="mt-6 space-y-3">
                      {s.list.map((item, j) => (
                        <li key={j} className="flex items-start gap-3 text-[15.5px] leading-[1.7] text-ink-muted">
                          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden="true" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </Reveal>
              ))}
            </div>
          </Container>
        </Section>

        {/* FAQ */}
        <Section className="border-b border-line bg-bg-alt">
          <Container>
            <div className="grid gap-12 lg:grid-cols-[0.72fr_1.28fr]">
              <Reveal>
                <Eyebrow>FAQ</Eyebrow>
                <h2 className="mt-6 text-[clamp(1.8rem,3.4vw,2.7rem)] font-semibold leading-[1.08] tracking-[-0.035em] text-ink">
                  Common questions
                </h2>
                <p className="mt-5 text-[15px] leading-[1.7] text-ink-muted">
                  Ready to put this on autopilot?{' '}
                  <a href={product.ctaHref} target="_blank" rel="noopener noreferrer" className="text-accent underline decoration-accent-line underline-offset-2 hover:text-accent-strong">
                    Start free with {product.name}
                  </a>
                  .
                </p>
              </Reveal>

              <Reveal delay={0.06}>
              <Card className="overflow-hidden">
                {page.faqs.map((f, i) => (
                  <details key={f.q} className="group" style={i === 0 ? undefined : { borderTop: '1px solid var(--border-light)' }}>
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-7 py-5 text-[15px] font-medium text-ink transition-colors hover:text-accent-strong [&::-webkit-details-marker]:hidden">
                      {f.q}
                      <Plus size={15} className="shrink-0 text-ink-subtle transition-transform duration-300 group-open:rotate-45" />
                    </summary>
                    <p className="max-w-[62ch] px-7 pb-6 text-[14px] leading-[1.75] text-ink-muted">{f.a}</p>
                  </details>
                ))}
              </Card>
              </Reveal>
            </div>
          </Container>
        </Section>

        {/* CTA */}
        <Section>
          <Container>
            <Reveal className="relative overflow-hidden rounded-[18px] bg-[color:var(--ink-bg)] px-8 py-20 text-center md:px-16 md:py-24" style={{ boxShadow: 'var(--shadow-panel)' }}>
              <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-px bg-accent-line" />
              <Motif size={16} className="justify-center" />
              <h2 className="mx-auto mt-6 max-w-[22ch] text-[clamp(1.8rem,4vw,3rem)] font-semibold leading-[1.06] tracking-[-0.03em] text-[color:var(--ink-text)]">
                Turn every happy job into a Google review.
              </h2>
              <p className="mx-auto mt-5 max-w-[44ch] text-[15.5px] leading-[1.7] text-[color:var(--ink-muted)]">
                {product.name} sends the request, follows up politely, and routes happy customers straight to your profile.
              </p>
              <div className="mt-9 flex justify-center">
                <Button href={product.ctaHref} variant="primary">
                  {product.ctaLabel}
                  <ArrowRight />
                </Button>
              </div>
              <p className="mono mt-6 text-[10px] uppercase tracking-[0.18em] text-[color:var(--ink-faint)]">
                Free to start · no card required · cancel anytime
              </p>
            </Reveal>
          </Container>
        </Section>
      </main>

      <Footer />
    </>
  );
}
