'use client';

import { useLanguage } from '../contexts/language-context';

type CountdownProps = {
  /**
   * ISO string with explicit offset recommended, e.g. "2026-01-17T11:00:00-05:00"
   */
  targetISO: string;
  className?: string;
};

export default function Countdown({ className = '' }: CountdownProps) {
  const { t } = useLanguage();

  return (
    <div className={className}>
      <div className="relative mx-auto w-full max-w-5xl">
        {/* Background blocker to hide stars - solid background behind */}
        <div className="absolute inset-0 rounded-2xl" style={{ backgroundColor: 'rgba(34, 23, 43, 1)', zIndex: 0 }}></div>
        
        {/* Glow - pink sutil */}
        <div className="absolute -inset-2 bg-gradient-to-r from-pink-500/20 via-pink-400/15 to-pink-500/20 rounded-2xl blur-xl opacity-60" style={{ zIndex: 1 }}></div>

        <div className="relative bg-pink-500/10 backdrop-blur-sm rounded-2xl border border-pink-400 shadow-2xl p-6 sm:p-8" style={{ zIndex: 2 }}>
          <div className="flex flex-col items-center text-center gap-2">
            <div className="relative">
              <div className="absolute -inset-6 bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-pink-500/20 blur-2xl opacity-70 rounded-full"></div>
              <p className="relative font-extrabold uppercase tracking-[0.12em] text-xl sm:text-2xl md:text-3xl drop-shadow-lg bg-gradient-to-r from-white via-cyan-200 to-pink-200 bg-clip-text text-transparent">
                {t('home.countdown.title')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


