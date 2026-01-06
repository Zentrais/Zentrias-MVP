'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { ArrowRight, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AuthSheet } from '@/components/auth/AuthSheet';

const ONBOARDING_STORAGE_KEY = 'zentrais.onboarding.completed';

type OnboardingSlide = {
  id: number;
  headline?: string;
  subheadline?: string;
  showArrow?: boolean;
  showEnter?: boolean;
};

const slides: OnboardingSlide[] = [
  {
    id: 0,
    headline: 'Zentrais',
    subheadline: "What's On Your Mind Today",
    showArrow: true,
  },
  {
    id: 1,
    headline: 'Zentrais',
    subheadline: "What's On Your Mind Today",
    showArrow: true,
  },
  {
    id: 2,
    headline: 'Think clearly. Share truth.',
    subheadline: 'Explore perspectives.',
    showArrow: true,
  },
  {
    id: 3,
    headline: 'Be understood.',
    subheadline: 'Speak from the heart.',
    showArrow: true,
  },
  {
    id: 4,
    headline: 'Trade with integrity.',
    subheadline: '',
    showArrow: true,
  },
  {
    id: 5,
    headline: 'Welcome To Zentrais',
    subheadline: '',
    showEnter: true,
  },
];

export default function OnboardingPage() {
  const router = useRouter();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showAuth, setShowAuth] = useState(false);
  const [authMode, setAuthMode] = useState<'signup' | 'login'>('signup');

  useEffect(() => {
    // If user has already completed onboarding, go straight to debate
    if (typeof window !== 'undefined') {
      const completed = window.localStorage.getItem(ONBOARDING_STORAGE_KEY);
      if (completed === 'true') {
        router.replace('/debate');
      }
    }
  }, [router]);

  const slide = slides[currentSlide];

  const goNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide((prev) => prev + 1);
    } else {
      finishOnboarding();
    }
  };

  const finishOnboarding = () => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(ONBOARDING_STORAGE_KEY, 'true');
    }
    router.replace('/debate');
  };

  const skipOnboarding = () => {
    finishOnboarding();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-6">
      <div className="relative w-full max-w-sm h-[700px] rounded-3xl border bg-card shadow-lg flex flex-col overflow-hidden">
        {/* Close / Skip */}
        <button
          type="button"
          onClick={skipOnboarding}
          className="absolute top-4 left-4 z-10 rounded-full p-1 text-muted-foreground hover:bg-muted"
          aria-label="Skip onboarding"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Progress dots (top-right) */}
        <div className="absolute top-6 right-6 flex gap-1.5">
          {slides.map((s, index) => (
            <span
              key={s.id}
              className={`h-2 w-2 rounded-full ${
                index <= currentSlide ? 'bg-primary' : 'bg-muted'
              }`}
            />
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col items-center justify-center px-8 text-center gap-6">
          <div className="flex flex-col items-center gap-4">
            <div className="h-24 w-24 rounded-full flex items-center justify-center">
              <Image
                src="/Zentrais Flaticon 150x150-03.png"
                alt="Zentrais logo"
                width={96}
                height={96}
                priority
              />
            </div>
            {slide.headline && (
              <h1 className="text-2xl font-semibold tracking-tight">
                {slide.headline}
              </h1>
            )}
            {slide.subheadline && slide.subheadline.trim().length > 0 && (
              <p className="text-base text-muted-foreground">
                {slide.subheadline}
              </p>
            )}
          </div>
        </div>

        {/* Footer buttons */}
        <div className="px-8 pb-10 flex items-center justify-between">
          <div className="text-xs text-muted-foreground">
            {currentSlide + 1} / {slides.length}
          </div>

          {slide.showEnter ? (
            <Button
              onClick={() => {
                setAuthMode('signup');
                setShowAuth(true);
              }}
              className="rounded-full px-6"
            >
              Enter Zentrais
            </Button>
          ) : (
            <button
              type="button"
              onClick={goNext}
              className="flex items-center justify-center h-10 w-10 rounded-full bg-primary text-primary-foreground hover:bg-primary/90"
              aria-label="Next"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>

        <AuthSheet
          open={showAuth}
          mode={authMode}
          onModeChange={setAuthMode}
          onClose={() => setShowAuth(false)}
          onAuthenticated={finishOnboarding}
        />
      </div>
    </div>
  );
}
