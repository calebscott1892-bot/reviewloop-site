import React from 'react';
import { hydrateRoot, createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';

const root = document.getElementById('root');

// Standalone prerendered guide pages (data-static) render their own server markup
// and need no client App — skip hydration so we don't mount <App> over them.
if (root.dataset.static !== 'true') {
  // Prerendered HTML (from scripts/prerender.mjs) has real element children → hydrate.
  // Dev / un-prerendered has only the <!--app-html--> comment → fresh render.
  if (root.childElementCount > 0) {
    hydrateRoot(root, <App />);
  } else {
    createRoot(root).render(<App />);
  }
}
