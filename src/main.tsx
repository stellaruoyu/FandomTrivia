import { StrictMode, useEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import App from './App.tsx';
import { initializeAnalytics, isAnalyticsEnabled, trackPageView } from './analytics';
import './index.css';

const AnalyticsTracker = () => {
  const location = useLocation();
  const lastTrackedPath = useRef<string | null>(null);

  useEffect(() => {
    initializeAnalytics();
  }, []);

  useEffect(() => {
    if (!isAnalyticsEnabled()) {
      return;
    }

    const pagePath = `${location.pathname}${location.search}${location.hash}`;
    if (lastTrackedPath.current === pagePath) {
      return;
    }

    lastTrackedPath.current = pagePath;

    const frame = window.requestAnimationFrame(() => {
      trackPageView(pagePath);
    });

    return () => window.cancelAnimationFrame(frame);
  }, [location.hash, location.pathname, location.search]);

  return null;
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <AnalyticsTracker />
        <App />
      </BrowserRouter>
    </HelmetProvider>
  </StrictMode>,
);
