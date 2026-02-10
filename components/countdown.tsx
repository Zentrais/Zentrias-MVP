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
      <div className="relative mx-auto w-full max-w-5xl flex justify-center">
        <div className="relative text-center">
          <p className="font-extrabold uppercase tracking-[0.12em] text-lg sm:text-xl md:text-2xl drop-shadow-lg text-pink-400">
            {t('home.countdown.title')}
          </p>
        </div>
      </div>
    </div>
  );
}


