// Analytics helper using Google Analytics (gtag)
// Ensure GA script is loaded in the root layout.

export const trackEvent = (
    action: string,
    category: string,
    label?: string,
    value?: number
) => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', action, {
            event_category: category,
            event_label: label,
            value,
        });
    }
};

export const trackPageView = (url: string) => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('config', process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || 'G-XXXXXXXXXX', {
            page_path: url,
        });
    }
};
