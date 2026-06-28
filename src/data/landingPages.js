/**
 * Programmatic SEO landing pages for ReviewLoop.
 *
 * Each entry is a standalone, prerendered static page (dist/<slug>/index.html).
 * Pure data — consumed by:
 *   - src/components/LandingPage.jsx  (renders the page)
 *   - src/lib/seo.js                  (per-page <head> + JSON-LD)
 *   - scripts/prerender.mjs           (writes each file + sitemap entries)
 *
 * Copy is original, specific and genuinely useful — no filler. Prices/links are
 * NEVER hardcoded here; the page pulls them from product.js at render time.
 */
import { product } from './product.js';

const SITE = product.siteUrl;

export const landingPages = [
  {
    slug: 'how-to-get-more-google-reviews',
    eyebrow: 'Guide',
    title: 'How to Get More Google Reviews (Without Begging)',
    metaTitle: 'How to Get More Google Reviews in 2026 — A Practical Guide | ReviewLoop',
    metaDescription:
      'A step-by-step playbook for getting more Google reviews from real customers: when to ask, how to ask, what to say, and how to make it automatic so you never miss a happy customer again.',
    h1: 'How to get more Google reviews (without begging)',
    lead:
      'Reviews are the single biggest lever you have over local ranking and trust — yet most businesses leave them to chance. Here is exactly how to get more, from people who already love your work.',
    sections: [
      {
        h: 'Why Google reviews matter more than almost anything else',
        p: [
          'When someone searches for a business like yours, Google shows a local pack of three results above the map. Two things decide who lands there: relevance and prominence. Review count and review rating are among the strongest prominence signals Google uses — and they are the easiest for you to influence directly.',
          'Reviews also do the closing for you. A prospect comparing two businesses with identical pricing will almost always pick the one with 87 reviews at 4.9 stars over the one with 6 reviews at 4.5. Every genuine review you collect keeps working — ranking you higher and converting browsers into calls — long after the job is done.',
        ],
      },
      {
        h: 'The five reasons you are not getting reviews',
        list: [
          'You forget to ask. The job ends, the next one starts, and the moment passes.',
          'You ask at the wrong time — weeks later, when the goodwill has faded.',
          'You make it hard. "Search for us on Google and leave a review" loses people at every step.',
          'You only ask once. Most people who would happily review you simply need a polite reminder.',
          'You rely on luck. The few reviews you get trickle in from the rare customer motivated enough to find you unprompted.',
        ],
      },
      {
        h: 'Ask at the moment of peak happiness',
        p: [
          'The best time to ask is right after you have delivered — when the relief and satisfaction are fresh. For a completed job, that is the same day or the next morning. Wait a week and your response rate falls off a cliff.',
          'Send a short, personal message with a single tap-to-review link that drops the customer directly onto your Google review form. No searching, no logging in hunts, no friction. The fewer steps between "I am happy" and "review posted", the more reviews you get.',
        ],
      },
      {
        h: 'Always follow up once — politely',
        p: [
          'A large share of reviews come not from the first ask but from a single gentle reminder a few days later. People mean to do it, then life gets in the way. One polite nudge — never more — recovers the customers who simply forgot.',
          'This is the step almost everyone skips, because doing it by hand for every customer is tedious. Automating that one follow-up is often the difference between a handful of reviews a month and a steady, compounding stream.',
        ],
      },
      {
        h: 'Make it automatic so it actually happens',
        p: [
          'The honest truth is that "ask every happy customer, at the right time, with one tracked link, and follow up once" is a process no busy operator keeps up by hand. The businesses that win at reviews are the ones who removed themselves from the loop.',
          `That is exactly what ${product.name} does: add the customer after a job, and it sends a timed, templated request with a click-tracked review link, then follows up politely if there is no response. You keep full control of the wording and timing — it just never forgets.`,
        ],
      },
    ],
    faqs: [
      {
        q: 'Is it against Google policy to ask for reviews?',
        a: 'No. Google explicitly allows you to ask customers for honest reviews. What is not allowed is incentivising reviews, gating out negative ones, or posting fake reviews. ReviewLoop only ever invites real customers to leave a genuine review.',
      },
      {
        q: 'How many reviews do I actually need?',
        a: 'There is no magic number, but more recent reviews almost always beat a static pile of old ones. Aim for a steady trickle every month rather than a one-off burst — freshness and volume both feed your local ranking.',
      },
      {
        q: 'What is the best way to send a review request?',
        a: 'A short, personal message with a single direct link to your Google review form, sent the same day the job finished. Removing every extra step between the customer and the review form is the highest-leverage thing you can do.',
      },
      {
        q: 'Should I offer a discount for a review?',
        a: 'No — incentivising reviews violates Google policy and can get reviews removed or your profile penalised. Ask genuinely, make it easy, and follow up once. That is enough.',
      },
    ],
  },

  {
    slug: 'how-to-ask-customers-for-a-review',
    eyebrow: 'Templates',
    title: 'How to Ask Customers for a Review (With Templates)',
    metaTitle: 'How to Ask Customers for a Review — Email & SMS Templates | ReviewLoop',
    metaDescription:
      'Exactly what to say when asking customers for a Google review — copy-and-paste email and SMS templates, the perfect timing, and the one follow-up that doubles your response rate.',
    h1: 'How to ask customers for a review (with templates)',
    lead:
      'The wording matters less than people think — and more than they realise. Here are review-request templates that feel personal, take ten seconds to act on, and actually get sent.',
    sections: [
      {
        h: 'The anatomy of a request that converts',
        p: [
          'A great review request does four things: it thanks the customer, it explains briefly why reviews help a small business, it makes the ask once and clearly, and it removes every step but the click. Keep it short. Two or three sentences out-performs a paragraph every time.',
          'Personalise where it costs nothing — the customer’s name and a reference to the actual job ("the bathroom reno", "your service last Tuesday") signals a real human, not a blast. That single detail noticeably lifts response rates.',
        ],
      },
      {
        h: 'Email template you can copy',
        p: [
          'Subject: Quick favour, {{first_name}}?',
          'Hi {{first_name}}, thanks again for choosing us for {{job}}. Reviews make a huge difference for a small business like ours, and a quick one would mean a lot. It takes about 30 seconds — here is the direct link: {{review_link}}. Thank you! — {{business_name}}',
        ],
      },
      {
        h: 'SMS template you can copy',
        p: [
          'Hi {{first_name}}, thanks for having us for {{job}}! If you were happy with how it went, a quick Google review would really help us out — it takes 30 seconds: {{review_link}}. Cheers, {{business_name}}.',
        ],
      },
      {
        h: 'The follow-up template that does the heavy lifting',
        p: [
          'Most people who never reply to the first message are not annoyed — they just forgot. A single, friendly nudge a few days later recovers a large share of them. Send exactly one. Never two.',
          'Follow-up: Hi {{first_name}}, just following up in case my last message got buried — no pressure at all, but if you have a spare 30 seconds a quick review would genuinely help: {{review_link}}. Thanks either way! — {{business_name}}',
        ],
      },
      {
        h: 'Timing and the mistake to avoid',
        list: [
          'Send the first request the same day or the morning after the job, while goodwill is highest.',
          'Send one follow-up three to four days later — and only one.',
          'Never gate the ask ("only review us if you are happy") — that breaks Google policy.',
          'Never send the same generic blast to everyone; use the name and the job.',
          'Never chase past the single follow-up. Persistence past that point costs you goodwill.',
        ],
      },
      {
        h: 'Let it run itself',
        p: [
          `Templates only work if they actually get sent — every time, at the right moment, with a follow-up. ${product.name} stores your templates, fills in the customer and job details, sends a click-tracked link at the right time, and handles the single follow-up automatically. You set the words once; it does the asking.`,
        ],
      },
    ],
    faqs: [
      {
        q: 'Should I ask for a review by email or text?',
        a: 'Text typically gets opened and acted on faster, but email lets you say a little more. The best approach is whichever channel you already use with that customer — and following up once on the same channel if they do not respond.',
      },
      {
        q: 'How long should a review request be?',
        a: 'Short. Two to three sentences: a thank-you, a one-line reason it helps, and a single direct link. Long requests get skimmed and skipped.',
      },
      {
        q: 'Is it OK to remind a customer who did not respond?',
        a: 'Yes — one polite follow-up a few days later is good practice and recovers a large share of reviews. Just keep it to a single reminder; repeated chasing hurts more than it helps.',
      },
      {
        q: 'Can I automate sending these templates?',
        a: 'Yes. ReviewLoop stores your email and SMS templates, personalises them per customer and job, sends at the right time, and runs the single follow-up for you — so the right message goes out every time without you remembering.',
      },
    ],
  },

  {
    slug: 'google-review-link-for-trades',
    eyebrow: 'For trades & home services',
    title: 'Google Review Links for Trades & Home Services',
    metaTitle: 'Google Review Links for Trades & Home Services | ReviewLoop',
    metaDescription:
      'How tradies, electricians, plumbers, builders and home-service businesses can get a direct Google review link and turn every finished job into a five-star review — on autopilot.',
    h1: 'Google review links for trades & home services',
    lead:
      'For trades and home-service businesses, reviews are everything — they are what gets you the next call. Here is how to set up a direct review link and turn every completed job into a five-star review.',
    sections: [
      {
        h: 'Why reviews win jobs for tradies',
        p: [
          'When a homeowner needs a plumber, electrician or builder, they search, they look at the map pack, and they read the reviews — usually before they ever pick up the phone. For a trade business, your review profile is your shopfront, your reputation and your sales team rolled into one.',
          'The problem is that on-the-tools work and review-chasing do not mix. You finish a job, pack up, and drive to the next one. The thank-you-and-ask never happens, and the homeowner who would have given you five stars never gets asked.',
        ],
      },
      {
        h: 'How to get your direct Google review link',
        list: [
          'Sign in to your Google Business Profile for your trade business.',
          'Open the "Ask for reviews" or "Get more reviews" option to reveal your short review link (it looks like g.page/r/…).',
          'Copy that link — it drops customers straight onto your review form, no searching required.',
          'Save it somewhere you can paste it fast: your phone, your invoice footer, your booking confirmations.',
        ],
      },
      {
        h: 'The trades workflow that actually sticks',
        p: [
          'A direct link is only half the battle — you still have to send it, every time, to every customer, at the right moment. The trades who build a wall of reviews are not more disciplined than you; they took themselves out of the equation.',
          'The reliable pattern: capture the customer when you book or finish the job, fire off a templated request with your direct review link the same day, and follow up once if they go quiet. Done consistently across every job, that turns a trickle into a flood.',
        ],
      },
      {
        h: 'Built for the way trades work',
        p: [
          `${product.name} is built for exactly this. Add the customer after a job from your phone, and it sends a timed, click-tracked request straight to your Google review link, then nudges politely if there is no response. On Pro, it even drafts your replies to incoming reviews so your profile always looks responsive.`,
          'No new habits to maintain, no awkward in-person ask, no forgetting on a busy day. Every finished job quietly becomes a chance at another five-star review.',
        ],
      },
    ],
    faqs: [
      {
        q: 'How do I find my Google review link for my trade business?',
        a: 'Sign in to your Google Business Profile, open "Ask for reviews" or "Get more reviews", and copy the short link Google generates (a g.page/r/ address). That link sends customers straight to your review form.',
      },
      {
        q: 'When should a tradie send the review request?',
        a: 'The same day the job is finished, or the next morning, while the customer is still happy with the work. Waiting a week sharply reduces how many people respond.',
      },
      {
        q: 'What if customers do not respond to the first request?',
        a: 'Send one polite follow-up a few days later. Most non-responders simply forgot, and a single reminder recovers a large share of them — but never chase past that one nudge.',
      },
      {
        q: 'Can I automate review requests across all my jobs?',
        a: 'Yes. ReviewLoop lets you add a customer after each job and automatically sends a templated request with your direct Google review link, plus a single follow-up — so every job gets the ask without you remembering.',
      },
    ],
  },
];

export function getLandingPage(slug) {
  return landingPages.find((p) => p.slug === slug) || null;
}

export function landingMeta(page) {
  const url = `${SITE}/${page.slug}`;
  return {
    title: page.metaTitle,
    description: page.metaDescription,
    url,
    ogImage: `${SITE}/og.png`,
    themeColor: product.themeColor || '#9e600a',
    breadcrumb: [
      { name: 'ReviewLoop', url: SITE },
      { name: 'Guides', url: `${SITE}/` },
      { name: page.title, url },
    ],
    faqs: page.faqs,
  };
}
