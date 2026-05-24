const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID?.trim();

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

let analyticsInitialized = false;

export const isAnalyticsEnabled = (): boolean => Boolean(GA_MEASUREMENT_ID);

export const initializeAnalytics = (): void => {
  if (!GA_MEASUREMENT_ID || analyticsInitialized || typeof window === 'undefined' || typeof document === 'undefined') {
    return;
  }

  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function gtag(...args: unknown[]) {
    window.dataLayer.push(args);
  };

  window.gtag('js', new Date());
  window.gtag('config', GA_MEASUREMENT_ID, {
    send_page_view: false,
  });

  const scriptId = 'google-analytics';
  if (!document.getElementById(scriptId)) {
    const script = document.createElement('script');
    script.id = scriptId;
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    document.head.appendChild(script);
  }

  analyticsInitialized = true;
};

export const trackPageView = (pagePath: string): void => {
  if (!GA_MEASUREMENT_ID || typeof window === 'undefined' || typeof window.gtag !== 'function') {
    return;
  }

  window.gtag('event', 'page_view', {
    page_title: document.title,
    page_location: window.location.href,
    page_path: pagePath,
  });
};
