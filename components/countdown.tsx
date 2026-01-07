'use client';

import { useEffect, useMemo, useState } from 'react';
import { useLanguage } from '../contexts/language-context';

type CountdownProps = {
  /**
   * ISO string with explicit offset recommended, e.g. "2026-01-17T11:00:00-05:00"
   */
  targetISO: string;
  className?: string;
};

function pad2(n: number) {
  return String(n).padStart(2, '0');
}

function splitSeconds(totalSeconds: number) {
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return { days, hours, minutes, seconds };
}

export default function Countdown({ targetISO, className = '' }: CountdownProps) {
  const { t } = useLanguage();

  const targetMs = useMemo(() => {
    const parsed = Date.parse(targetISO);
    return Number.isFinite(parsed) ? parsed : NaN;
  }, [targetISO]);

  const [nowMs, setNowMs] = useState(() => Date.now());

  useEffect(() => {
    const id = window.setInterval(() => setNowMs(Date.now()), 1000);
    return () => window.clearInterval(id);
  }, []);

  const remainingMs = Math.max(0, targetMs - nowMs);
  const totalSeconds = Number.isFinite(remainingMs) ? Math.floor(remainingMs / 1000) : 0;
  const ended = Number.isFinite(targetMs) ? targetMs <= nowMs : false;
  const { days, hours, minutes, seconds } = splitSeconds(totalSeconds);

  return (
    <div className={className}>
      <div className="relative mx-auto w-full max-w-5xl">
        {/* Glow */}
        <div className="absolute -inset-2 bg-gradient-to-r from-cyan-500/25 via-purple-500/25 to-pink-500/25 rounded-2xl blur-xl opacity-70"></div>

        <div className="relative bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 shadow-2xl p-6 sm:p-8">
          <div className="flex flex-col items-center text-center gap-2">
            <div className="relative">
              <div className="absolute -inset-6 bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-pink-500/20 blur-2xl opacity-70 rounded-full"></div>
              <p className="relative font-extrabold uppercase tracking-[0.12em] text-xl sm:text-2xl md:text-3xl drop-shadow-lg bg-gradient-to-r from-white via-cyan-200 to-pink-200 bg-clip-text text-transparent">
                {t('home.countdown.title')}
              </p>
            </div>
          </div>

          <div
            className="mt-5 sm:mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4"
            aria-live="polite"
            aria-label={t('home.countdown.aria')}
          >
            <div className="rounded-xl bg-black/20 border border-white/15 p-4 text-center">
              <div className="text-2xl sm:text-3xl font-extrabold text-white tabular-nums">{days}</div>
              <div className="mt-1 text-[11px] sm:text-xs text-white/70 uppercase tracking-wider">
                {t('home.countdown.days')}
              </div>
            </div>

            <div className="rounded-xl bg-black/20 border border-white/15 p-4 text-center">
              <div className="text-2xl sm:text-3xl font-extrabold text-white tabular-nums">{pad2(hours)}</div>
              <div className="mt-1 text-[11px] sm:text-xs text-white/70 uppercase tracking-wider">
                {t('home.countdown.hours')}
              </div>
            </div>

            <div className="rounded-xl bg-black/20 border border-white/15 p-4 text-center">
              <div className="text-2xl sm:text-3xl font-extrabold text-white tabular-nums">{pad2(minutes)}</div>
              <div className="mt-1 text-[11px] sm:text-xs text-white/70 uppercase tracking-wider">
                {t('home.countdown.minutes')}
              </div>
            </div>

            <div className="rounded-xl bg-black/20 border border-white/15 p-4 text-center">
              <div className="text-2xl sm:text-3xl font-extrabold text-red-400 tabular-nums">{pad2(seconds)}</div>
              <div className="mt-1 text-[11px] sm:text-xs text-white/70 uppercase tracking-wider">
                {t('home.countdown.seconds')}
              </div>
            </div>
          </div>

          {ended && (
            <div className="mt-4 text-center text-sm text-white/80">
              {t('home.countdown.ended')}
            </div>
          )}

          {!Number.isFinite(targetMs) && (
            <div className="mt-4 text-center text-sm text-white/80">{t('home.countdown.invalid')}</div>
          )}
        </div>
      </div>
    </div>
  );
}


