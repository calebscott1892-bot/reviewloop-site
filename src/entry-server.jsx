import React from 'react';
import { renderToString } from 'react-dom/server';
import App from './App.jsx';
import LandingPage from './components/LandingPage.jsx';
import { getLandingPage } from './data/landingPages.js';

// Consumed by scripts/prerender.mjs to produce static HTML (pure Node, no browser).
export function render() {
  return renderToString(<App />);
}

/** Render a single programmatic-SEO landing page by slug to static HTML. */
export function renderLanding(slug) {
  const page = getLandingPage(slug);
  if (!page) throw new Error(`Unknown landing page slug: ${slug}`);
  return renderToString(<LandingPage page={page} />);
}
