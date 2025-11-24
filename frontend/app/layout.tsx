import type { Metadata } from 'next';
import { Outfit, Playfair_Display } from 'next/font/google';
import './globals.css';
import { Providers } from '../components/providers';
import { Navigation } from '../components/navigation';
import { LeadModal } from '../components/modals/lead-modal';
import { ToastViewport } from '../components/ui/toast-viewport';
import { SplashScreen } from '../components/splash-screen';
import { CursorSparkles } from '../components/cursor-sparkles';
import { CustomCursor } from '../components/custom-cursor';
import { PaintDrips } from '../components/paint-drips';
import { FloatingActionButton } from '../components/floating-action-button';
import Script from 'next/script';

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Master Brush — Premium Painting Services',
  description:
    'Experience the art of painting with Master Brush. Certified professionals, premium finishes, and seamless project management.',
};

const GA_MEASUREMENT_ID = 'G-XXXXXXXXXX'; // TODO: replace with actual ID

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${outfit.variable} ${playfair.variable}`}>
      <head>
        {/* Google Analytics */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          strategy="afterInteractive"
        />
        <Script id="ga-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}', { page_path: window.location.pathname });
          `}
        </Script>
      </head>
      <body>
        <Providers>
          <CustomCursor />
          <CursorSparkles />
          <PaintDrips />
          <SplashScreen />
          <Navigation />
          {children}
          <LeadModal />
          <ToastViewport />
          <FloatingActionButton />
        </Providers>
      </body>
    </html>
  );
}
