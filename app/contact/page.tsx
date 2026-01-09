'use client';

import { useState, useEffect } from 'react';
import Footer from '../../components/footer';
import { useLanguage } from '../../contexts/language-context';

export default function ContactPage() {
  const { t } = useLanguage();
  useEffect(() => {
    document.title = `Zentrais | ${t('pagetitle.contact')}`;
  }, [t]);

  return (
    <div className="min-h-screen relative flex flex-col w-full" style={{ transform: 'translateZ(0)', contain: 'layout style paint' }}>
      {/* Space Background - 4K Quality */}
      <div className="space-background">
        <div className="space-stars"></div>
        <div className="space-nebula-1"></div>
        <div className="space-nebula-2"></div>
        <div className="space-nebula-3"></div>
        <div className="space-nebula-4"></div>
        {/* Random premium gradients */}
        <div className="premium-gradient-1"></div>
        <div className="premium-gradient-2"></div>
        <div className="premium-gradient-3"></div>
        <div className="premium-gradient-4"></div>
        <div className="premium-gradient-5"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-white">
      {/* Content Section */}
      <section className="container mx-auto px-4 sm:px-6 pt-16 sm:pt-18 md:pt-20 pb-12 sm:pb-16 md:pb-24 flex-1">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-12 text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 text-white font-sans mx-auto">
              {t('contact.title')}
            </h1>
            <p className="text-base sm:text-lg text-gray-400 font-sans">
              {t('contact.subtitle')}
            </p>
          </div>

          {/* Contact Sections */}
          <div className="space-y-8 text-white font-sans">
            <div className="space-y-2">
              <h2 className="text-2xl sm:text-3xl font-bold text-white">
                {t('contact.users.title')}
              </h2>
              <p className="text-base sm:text-lg text-gray-300">
                {t('contact.users.desc')}
              </p>
              <p className="text-base sm:text-lg font-bold text-white">
                {t('contact.users.email')}
              </p>
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl sm:text-3xl font-bold text-white">
                {t('contact.investors.title')}
              </h2>
              <p className="text-base sm:text-lg text-gray-300">
                {t('contact.investors.desc')}
              </p>
              <p className="text-base sm:text-lg font-bold text-white">
                {t('contact.investors.email')}
              </p>
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl sm:text-3xl font-bold text-white">
                {t('contact.collaborators.title')}
              </h2>
              <p className="text-base sm:text-lg text-gray-300">
                {t('contact.collaborators.desc')}
              </p>
              <p className="text-base sm:text-lg font-bold text-white">
                {t('contact.collaborators.email')}
              </p>
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl sm:text-3xl font-bold text-white">
                {t('contact.media.title')}
              </h2>
              <p className="text-base sm:text-lg text-gray-300">
                {t('contact.media.desc')}
              </p>
              <p className="text-base sm:text-lg font-bold text-white">
                {t('contact.media.email')}
              </p>
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl sm:text-3xl font-bold text-white">
                {t('contact.other.title')}
              </h2>
              <p className="text-base sm:text-lg text-gray-300">
                {t('contact.other.desc')}
              </p>
              <p className="text-base sm:text-lg font-bold text-white">
                {t('contact.other.email')}
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="mt-auto w-full flex-shrink-0 relative z-10">
        <Footer />
      </div>
      </div>
    </div>
  );
}

