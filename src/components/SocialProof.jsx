import React from 'react';
import { content } from '../data/product.js';
import { Container, Section, Eyebrow, Reveal, Card, CountUp } from './primitives.jsx';

/**
 * Product-value section — the honest replacement for placeholder testimonials.
 *
 * Rather than fabricated "illustrative" quotes, this shows what ReviewLoop
 * actually does for a business, with the key number in each card animating up
 * as it scrolls into view (CountUp is SSR-safe + reduced-motion aware). When
 * real, approved customer quotes are ready, this can be swapped back for a
 * testimonial grid — nothing here pretends to be social proof it isn't.
 */
export default function SocialProof() {
  const props = content.valueProps || [];
  return (
    <Section className="border-b border-line bg-bg-alt">
      <Container>
        <Reveal className="max-w-2xl">
          <Eyebrow>{content.socialEyebrow}</Eyebrow>
          <h2 className="mt-6 text-[clamp(1.8rem,3.4vw,2.7rem)] font-semibold leading-[1.08] tracking-[-0.035em] text-ink">
            {content.socialHeadline}
          </h2>
          <p className="mt-5 max-w-[54ch] text-[16px] leading-[1.75] text-ink-muted">{content.socialSub}</p>
        </Reveal>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {props.map((p, i) => (
            <Reveal key={p.label} delay={i * 0.07}>
              <Card hover className="flex h-full flex-col p-8">
                <div className="text-[clamp(2.2rem,3.4vw,3rem)] font-semibold leading-none tracking-[-0.04em] text-ink">
                  <CountUp value={p.value} prefix={p.prefix || ''} suffix={p.suffix || ''} />
                </div>
                <div className="mono mt-4 text-[10px] uppercase tracking-[0.2em] text-ink-subtle">{p.label}</div>
                <p className="mt-5 flex-1 text-[14.5px] leading-[1.65] text-ink-muted">{p.body}</p>
              </Card>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
