'use client';

import { useEffect } from 'react';
import Footer from '../../components/footer';

export default function ReviewsPage() {
  useEffect(() => {
    document.title = 'Zentrais | Reviews';
  }, []);

  return (
    <div className="min-h-screen relative flex flex-col w-full" style={{ transform: 'translateZ(0)', contain: 'layout style paint' }}>
      {/* Content */}
      <div className="relative z-10 text-white">
      {/* Content Section */}
      <section className="container mx-auto px-4 sm:px-6 pt-16 sm:pt-18 md:pt-20 pb-12 sm:pb-16 md:pb-24 flex-1">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-12 text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 text-white font-sans mx-auto">
              Reviews
            </h1>
          </div>

          {/* Content - Empty as requested */}
        </div>
      </section>

      <div className="mt-auto w-full flex-shrink-0 relative z-10">
        <Footer />
      </div>
      </div>
    </div>
  );
}

