/**
 * ReviewLoop — single source of truth for this site.
 *
 * ⚠️  PRICING & COPY ARE MIRRORED VERBATIM FROM THE C4 MARKETING REPO:
 *     calebscott1892-bot/C4 → src/components/software/productData.js  (slug: 'reviewloop')
 *     Never hardcode a price or link anywhere else in this repo — import from here.
 *     If pricing changes upstream, update this one file.
 */

export const SUITE_APP_URL = 'https://c4-saas-suite.vercel.app';

// The standalone ReviewLoop product app (where signups + billing happen).
export const APP_URL = 'https://app.reviewloop.c4studios.com.au';

// The all-in C4 Suite bundle (upsell on every product site).
export const SUITE_BUNDLE = {
  price: 149,
  href: `${SUITE_APP_URL}?ref=reviewloop-suite`,
  blurb: 'Every C4 product — ReviewLoop, ReturnDesk, Complia, FirmFlow and more — in one subscription.',
};

export const product = {
  slug: 'reviewloop',
  name: 'ReviewLoop',
  status: 'Live',
  logo: '/reviewloop-minimal.png',
  oneLiner: 'Turn happy jobs into Google reviews.',
  summary:
    'ReviewLoop closes the gap between a job well done and the review that proves it — with timed, templated requests and follow-ups that run themselves.',
  features: [
    {
      icon: 'mail',
      title: 'Templated review request emails',
      body: 'Polished, on-brand requests you set once. Edit the wording and timing to suit your business.',
    },
    {
      icon: 'link',
      title: 'Click-tracked review links',
      body: 'Every link is tracked, so you can see who opened, who clicked, and which jobs turned into reviews.',
    },
    {
      icon: 'sparkle',
      title: 'AI replies to reviews (Pro)',
      body: 'On Pro, AI drafts a thoughtful reply to each review you receive — you just check and post.',
    },
    {
      icon: 'bell',
      title: 'Automated follow-up reminders',
      body: 'A single, polite nudge for the customers who did not respond the first time. No pestering.',
    },
  ],
  highlights: [
    { stat: 'Auto', label: 'requests after every job' },
    { stat: '★★★★★', label: 'more reviews, less nagging' },
    { stat: 'Local', label: 'SEO that compounds' },
  ],
  problem:
    'Reviews are the single biggest local-SEO and trust signal — and the easiest thing to forget to ask for when you are busy doing the work.',
  solution:
    'ReviewLoop sends the right request at the right moment, follows up politely, and routes happy customers straight to your Google profile.',
  howItWorks: [
    {
      step: '01',
      title: 'Add a customer after each job',
      body: 'Drop in the customer and the job you just finished, or let it pull from your records.',
    },
    {
      step: '02',
      title: 'We send the request',
      body: 'ReviewLoop emails a templated, click-tracked review link at the right moment, then follows up politely if there’s no response.',
    },
    {
      step: '03',
      title: 'Watch reviews roll in',
      body: 'Happy customers go straight to your Google profile. On Pro, AI even drafts your replies.',
    },
  ],
  faqs: [
    {
      q: 'Will it annoy my customers?',
      a: 'No. Requests are timed and polite, with a single gentle follow-up, and you control the wording and the schedule.',
    },
    {
      q: 'Does it post fake reviews?',
      a: 'Never. ReviewLoop only invites real customers to leave a genuine review on your own Google profile.',
    },
    {
      q: 'What does Pro add?',
      a: 'Automated follow-up reminders and AI-drafted replies to the reviews you receive.',
    },
    {
      q: 'How quickly can I get started?',
      a: 'Start free in the app in minutes — add your first customer, pick a template, and ReviewLoop handles the rest.',
    },
  ],
  // Pricing — mirrored from productData.js. Do not edit in isolation.
  tiers: [
    {
      label: 'Starter',
      price: 19,
      tagline: 'Everything you need to start collecting reviews.',
      includes: [
        'Templated review request emails',
        'Click-tracked review links',
        'A single polite follow-up',
        'Unlimited customers',
      ],
    },
    {
      label: 'Pro',
      price: 45,
      featured: true,
      tagline: 'Automation and AI replies for businesses that live on reviews.',
      includes: [
        'Everything in Starter',
        'Automated follow-up reminders',
        'AI-drafted replies to your reviews',
        'Priority support',
      ],
    },
  ],
  // Matches C4 productData lifetime.href — routes to the suite app, which handles
  // lifetime checkout + grants access on payment. (Raw Stripe LIFETIME_LINKS are archived.)
  lifetime: { price: 450, href: `${APP_URL}/billing?ref=reviewloop-lifetime` },
  pricing: 'Starter $19/mo · Pro $45/mo. Start free — paid plans unlock inside the app.',

  // Primary CTA → the live ReviewLoop app signup (with attribution).
  ctaHref: `${APP_URL}/signup?ref=reviewloop`,
  ctaLabel: 'Start free',
  // Short, truthful reassurance shown beside the primary CTA.
  ctaReassurance: 'Free to start · no card required · cancel anytime',

  // Where this product lives in the family.
  c4Url: 'https://c4studios.com.au',
  siteUrl: 'https://reviewloop.c4studios.com.au',

  // Optional compliance/usage caveat shown as a banner (Complia/FirmFlow use this).
  caveat: null,
};

/**
 * Bespoke marketing copy. Everything that differs per product lives here so the
 * shared section components stay identical across all four sites.
 */
export const content = {
  heroBadge: 'More 5-star reviews, on autopilot',
  heroLead: 'Turn happy jobs into',
  heroAccent: 'Google reviews',
  heroTrail: '.',
  heroNote: 'Start free · paid plans unlock in-app · no fake reviews, ever',
  heroMetaTag: 'Real reviews only',

  problemEyebrow: 'The reality',
  problemHeadline: 'You do great work. The reviews don’t follow.',
  withoutTitle: 'Without ReviewLoop',
  without: [
    'You mean to ask, then the next job starts',
    'The few reviews you get trickle in by luck',
    'Competitors with more stars rank above you',
    'No idea which customers would have said yes',
  ],
  withTitle: 'With ReviewLoop',
  with: [
    'Every finished job triggers a timed request',
    'Polite follow-ups catch the ones who forgot',
    'Happy customers land on your Google profile',
    'On Pro, AI drafts your replies for you',
  ],

  howHeadline: 'Three steps. Then it runs itself.',
  howSub: 'Set it up once after a job and ReviewLoop handles the asking, the timing, and the follow-up.',

  featuresHeadline: 'Everything that gets the review — nothing that doesn’t.',
  featuresSub: 'Purpose-built for the one job: more genuine reviews, with less of your time.',

  outcomesHeadline: 'Reviews are the compounding asset most businesses ignore.',
  outcomesSub:
    'Every review lifts your local ranking and your conversion rate — and keeps working long after the job is done.',

  // ── Value / outcomes section (replaces placeholder testimonials until real,
  //    approved customer quotes are ready). Genuine product-value props — not
  //    attributed quotes — so nothing on the page is fabricated social proof. ──
  socialEyebrow: 'Why it works',
  socialHeadline: 'Built for businesses that live on reviews',
  socialSub:
    'Every part of ReviewLoop points at one outcome — more genuine reviews, with less of your time. Here is what that looks like day to day.',
  valueProps: [
    {
      // Count-up target + optional prefix/suffix render the animated stat.
      value: 100,
      suffix: '%',
      label: 'of finished jobs get the ask',
      body: 'Add the customer once and every completed job triggers a timed request — no more “I meant to ask”.',
    },
    {
      value: 1,
      label: 'polite follow-up, done for you',
      body: 'A single friendly nudge recovers the customers who simply forgot — the reviews you’d otherwise never see.',
    },
    {
      value: 30,
      suffix: 's',
      label: 'from happy customer to review',
      body: 'One tap-to-review link drops them straight on your Google profile. No searching, no friction.',
    },
  ],

  finalHeadline: 'Your next happy customer is a review waiting to happen.',
  finalSub: 'Start free today. Add a customer, send your first request, and watch the reviews roll in.',

  footerTagline: 'Real reviews, never fake.',
};

// SEO metadata — consumed by the prerender head injector (one source).
export const seo = {
  title: 'ReviewLoop — Turn happy jobs into Google reviews',
  description:
    'ReviewLoop sends timed, templated review requests and polite follow-ups so happy customers leave Google reviews — automatically. AI-drafted replies on Pro. A C4 Studios product.',
  url: product.siteUrl,
  ogImage: `${product.siteUrl}/og.png`,
  themeColor: '#f7f5f2',
};
