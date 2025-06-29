
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { registerSW } from 'virtual:pwa-register';
import App from './App.tsx';
import './index.css';

// Register service worker only for offline asset caching (no install prompts)
const updateSW = registerSW({
  onNeedRefresh() {
    // Auto-update without user prompt for seamless experience
    updateSW(true);
  },
  onOfflineReady() {
    console.log('App assets cached and ready for offline use');
  },
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
