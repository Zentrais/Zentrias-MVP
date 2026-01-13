'use client';

import { useState, useEffect } from 'react';
import Footer from '../../components/footer';
import { useLanguage } from '../../contexts/language-context';

export default function AboutPage() {
  const { t } = useLanguage();

  useEffect(() => {
    document.title = `Zentrais | ${t('pagetitle.about')}`;
  }, [t]);

  return (
    <div className="min-h-screen relative flex flex-col w-full" style={{ transform: 'translateZ(0)', contain: 'layout style paint' }}>
      {/* Content */}
      <div className="relative z-10">
      {/* Content Section */}
      <section className="container mx-auto px-4 sm:px-6 pt-16 sm:pt-18 md:pt-20 pb-12 sm:pb-16 md:pb-24 flex-1 text-white">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-12 text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 text-white font-sans mx-auto">
              {t('about.title')}
            </h1>
          </div>

          {/* Content */}
          <div className="space-y-6 text-white font-sans text-base sm:text-lg leading-relaxed">
            <p>
              {t('about.content.p1')} <strong>{t('about.content.integrity')}</strong>{t('about.content.p2')}
            </p>
            
            <p>
              {t('about.content.p3')} <strong>{t('about.content.truth')}</strong> {t('about.content.p4')}
            </p>
            
            <p>
              {t('about.content.p5')}
            </p>
            
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li><strong>{t('about.content.engine1')}</strong> {t('about.content.engine1.desc')}</li>
              <li><strong>{t('about.content.engine2')}</strong> {t('about.content.engine2.desc')}</li>
              <li><strong>{t('about.content.engine3')}</strong> {t('about.content.engine3.desc')}</li>
            </ul>
            
            <p>
              {t('about.content.p6')}
            </p>
            
            <p>
              {t('about.content.p7')}
            </p>
            
            <p>
              {t('about.content.p8')}
            </p>
            
            <p>
              {t('about.content.p9')}
            </p>
            
            <p>
              {t('about.content.p10')}
            </p>
            
            <p className="font-bold text-xl mt-8">
              <strong>{t('about.content.footer')}</strong>
            </p>
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

