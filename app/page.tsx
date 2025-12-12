'use client';

import React from 'react';
import { MarketingHero } from '@/components/marketing/MarketingHero';
import { FeatureGrid } from '@/components/marketing/FeatureGrid';
import { useRouter } from 'next/navigation';

// Feature flag check
const MARKETING_ENABLED = process.env.NEXT_PUBLIC_MARKETING_PAGE !== 'false';

export default function Home() {
  const router = useRouter();

  // If marketing page is disabled, redirect to notes app
  React.useEffect(() => {
    if (!MARKETING_ENABLED) {
      router.push('/notes');
    }
  }, [router]);

  if (!MARKETING_ENABLED) {
    return null;
  }

  return (
    <main className="min-h-screen bg-white dark:bg-gray-900">
      {/* Marketing Hero */}
      <MarketingHero />

      {/* Feature Grid */}
      <FeatureGrid />

      {/* Footer */}
      <footer className="py-8 px-6 bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
        <div className="max-w-6xl mx-auto text-center text-sm text-gray-600 dark:text-gray-400">
          <p>© 2024 NoTes. Built with privacy and speed in mind.</p>
          <div className="mt-4 flex justify-center gap-6">
            <span className="px-3 py-1 bg-white dark:bg-gray-800 rounded-full text-xs">SOC-2</span>
            <span className="px-3 py-1 bg-white dark:bg-gray-800 rounded-full text-xs">GDPR</span>
            <span className="px-3 py-1 bg-white dark:bg-gray-800 rounded-full text-xs">AES-256</span>
          </div>
        </div>
      </footer>
    </main>
  );
}
