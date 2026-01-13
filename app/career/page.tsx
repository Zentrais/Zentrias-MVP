'use client';

import { useState, useEffect } from 'react';
import Footer from '../../components/footer';
import { useLanguage } from '../../contexts/language-context';

export default function CareerPage() {
  const { t } = useLanguage();
  useEffect(() => {
    document.title = `Zentrais | ${t('pagetitle.career')}`;
  }, [t]);

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
              {t('career.title')}
            </h1>
          </div>

          {/* Content */}
          <div className="space-y-8 text-white font-sans text-base sm:text-lg leading-relaxed">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4 font-sans">
                {t('career.hero.title')}
              </h2>
              <p>
                {t('career.hero.desc')}
              </p>
            </div>

            {/* Why Zentrais Section */}
            <div className="mt-10">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4 font-sans">
                {t('career.why.title')}
              </h2>
              <p className="mb-4">
                {t('career.why.desc')}
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>{t('career.why.engine1')}</strong> {t('career.why.engine1.desc')}</li>
                <li><strong>{t('career.why.engine2')}</strong> {t('career.why.engine2.desc')}</li>
                <li><strong>{t('career.why.engine3')}</strong> {t('career.why.engine3.desc')}</li>
              </ul>
              <p className="mt-4">
                {t('career.why.footer')}
              </p>
            </div>

            {/* Who Thrives Here Section */}
            <div className="mt-10">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4 font-sans">
                {t('career.thrives.title')}
              </h2>
              <p className="mb-4">{t('career.thrives.desc')}</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>{t('career.thrives.item1')}</li>
                <li>{t('career.thrives.item2')}</li>
                <li>{t('career.thrives.item3')}</li>
                <li>{t('career.thrives.item4')}</li>
                <li>{t('career.thrives.item5')}</li>
              </ul>
              <p className="mt-4">
                {t('career.thrives.footer')}
              </p>
            </div>

            {/* Roles We're Strengthening Section */}
            <div className="mt-10">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4 font-sans">
                {t('career.roles.title')}
              </h2>
              <p className="mb-4">
                {t('career.roles.desc')}
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>{t('career.roles.item1')}</li>
                <li>{t('career.roles.item2')}</li>
                <li>{t('career.roles.item3')}</li>
                <li>{t('career.roles.item4')}</li>
                <li>{t('career.roles.item5')}</li>
                <li>{t('career.roles.item6')}</li>
              </ul>
              <p className="mt-4">
                {t('career.roles.footer')}
              </p>
            </div>

            {/* How to Apply Section */}
            <div className="mt-10">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4 font-sans">
                {t('career.apply.title')}
              </h2>
              <p className="mb-4">{t('career.apply.desc')}</p>
              <ul className="list-disc list-inside space-y-2 ml-4 mb-4">
                <li>{t('career.apply.item1')}</li>
                <li>{t('career.apply.item2')}</li>
                <li>{t('career.apply.item3')}</li>
              </ul>
              <p className="mb-2">
                <strong>{t('career.apply.email')}</strong> <a href="mailto:careers@zentrais.com" className="text-indigo-400 hover:text-indigo-300 underline">{t('career.apply.email.address')}</a>
              </p>
              <p className="mb-6">
                <strong>{t('career.apply.subject')}</strong> {t('career.apply.subject.text')}
              </p>
              <p className="font-bold text-xl mt-8">
                {t('career.apply.footer')}
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

