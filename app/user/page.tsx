'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Button } from '../../components/ui/button';
import { MessageSquare, Gavel, ShoppingBag, ArrowRight, CheckCircle2, Circle, Lock, Shield, CheckCircle, DollarSign, ChevronDown, Play } from 'lucide-react';
import Footer from '../../components/footer';
import { useLanguage } from '../../contexts/language-context';

export default function UserPage() {
  const { t } = useLanguage();

  const carouselSlides = [
    {
      id: 'debate',
      title: t('user.carousel.debate.title'),
      description: t('user.carousel.debate.desc'),
      icon: Gavel,
      preview: 'Perspective',
    },
    {
      id: 'chat',
      title: t('user.carousel.chat.title'),
      description: t('user.carousel.chat.desc'),
      icon: MessageSquare,
      preview: 'Dialog',
    },
    {
      id: 'market',
      title: t('user.carousel.market.title'),
      description: t('user.carousel.market.desc'),
      icon: ShoppingBag,
      preview: t('user.carousel.market.preview'),
    },
  ];

  const betaSteps = [
    {
      step: 1,
      title: t('user.beta.step1.title'),
      description: t('user.beta.step1.desc'),
      completed: false,
    },
    {
      step: 2,
      title: t('user.beta.step2.title'),
      description: t('user.beta.step2.desc'),
      completed: false,
    },
    {
      step: 3,
      title: t('user.beta.step3.title'),
      description: t('user.beta.step3.desc'),
      completed: false,
    },
  ];
  const [currentSlide, setCurrentSlide] = useState(0);
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; delay: number }>>([]);
  const [currentParticipants, setCurrentParticipants] = useState(342);
  const [selectedPhone, setSelectedPhone] = useState(1);
  const [waitlistName, setWaitlistName] = useState('');
  const [waitlistEmail, setWaitlistEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Generar partículas de luz
  useEffect(() => {
    const newParticles = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 5,
    }));
    setParticles(newParticles);
  }, []);

  // Auto-rotar carrusel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % 3);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Simular incremento gradual de participantes
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentParticipants((prev) => {
        if (prev >= 1000) return 1000;
        // Incremento aleatorio entre 1-3 cada 3-5 segundos
        return Math.min(prev + Math.floor(Math.random() * 3) + 1, 1000);
      });
    }, 4000 + Math.random() * 2000);
    return () => clearInterval(interval);
  }, []);

  const handleJoinBeta = () => {
    const formElement = document.getElementById('waitlist-form');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen text-white relative overflow-hidden user-tone -mt-16 pt-16" style={{ backgroundColor: '#36454F' }}>
      {/* Partículas de luz de fondo */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute w-1 h-1 bg-blue-400 rounded-full opacity-40 animate-float"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              animationDelay: `${particle.delay}s`,
              animationDuration: `${3 + Math.random() * 2}s`,
            }}
          />
        ))}
        {/* Flujos de datos animados */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent animate-flow" />
          <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent animate-flow" style={{ animationDelay: '1s' }} />
          <div className="absolute top-3/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent animate-flow" style={{ animationDelay: '2s' }} />
        </div>
      </div>

      {/* Sección principal - Hero con celulares */}
      <section className="relative z-10 container mx-auto px-4 sm:px-6 pt-28 sm:pt-32 md:pt-36 lg:pt-40 pb-12 sm:pb-16 md:pb-24">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Texto a la izquierda */}
            <div className="text-left">
              <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold mb-6 text-white leading-tight font-sans tracking-tight">
                {t('user.hero.connect.title')}{' '}
                <span className="block">{t('user.hero.connect.subtitle')}</span>{' '}
                <span className="tone-highlight">{t('user.hero.connect.understand')}</span>
              </h1>
              <p className="text-lg sm:text-xl text-gray-300 mb-8 leading-relaxed font-sans">
                {t('user.hero.connect.desc')}
              </p>
              <Button
                onClick={handleJoinBeta}
                className="tone-button text-white text-lg sm:text-xl px-8 sm:px-10 py-4 sm:py-6 rounded-xl font-bold transition-all duration-500 hover:scale-110 group relative overflow-hidden transition-shadow duration-[1500ms]"
              >
                <span className="relative z-10 flex items-center gap-2">
                  {t('user.hero.connect.cta')}
                  <ArrowRight className="w-5 h-5 transition-transform duration-500 group-hover:translate-x-1" />
                </span>
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1500"></span>
              </Button>
            </div>

            {/* Celulares a la derecha */}
            <div className="relative h-[400px] sm:h-[450px] md:h-[500px] lg:h-[550px] xl:h-[600px] 2xl:h-[650px] flex items-center justify-center">
              {/* Celular izquierdo - The Integrity Perspective */}
              <div
                onClick={() => setSelectedPhone(0)}
                className={`absolute transition-all duration-500 cursor-pointer ${
                  selectedPhone === 0
                    ? 'z-30 opacity-100'
                    : selectedPhone === 1
                    ? 'z-20 opacity-80'
                    : 'z-10 opacity-60'
                }`}
                style={{
                  left: selectedPhone === 0
                    ? '50%'
                    : selectedPhone === 1
                    ? 'calc(50% - 8rem)'
                    : 'calc(50% - 16rem)',
                  transform: selectedPhone === 0
                    ? 'translateX(-50%) scale(1.1)'
                    : selectedPhone === 1
                    ? 'translateX(-50%) scale(0.9)'
                    : 'translateX(-50%) scale(0.8)',
                }}
              >
                <div className="relative w-56 sm:w-80 md:w-88 h-[28rem] sm:h-[40rem] md:h-[44rem] transition-all duration-300">
                  <Image
                    src="/Debate-Zentrais.png"
                    alt="Debate Interface"
                    fill
                    className="object-contain rounded-2xl"
                  />
                </div>
              </div>

              {/* Celular medio - Dialog */}
              <div
                onClick={() => setSelectedPhone(1)}
                className={`absolute transition-all duration-500 cursor-pointer ${
                  selectedPhone === 1
                    ? 'z-30 opacity-100'
                    : selectedPhone === 0 || selectedPhone === 2
                    ? 'z-20 opacity-80'
                    : 'z-10 opacity-60'
                }`}
                style={{
                  left: selectedPhone === 1
                    ? '50%'
                    : selectedPhone === 0
                    ? 'calc(50% + 8rem)'
                    : 'calc(50% - 8rem)',
                  transform: selectedPhone === 1
                    ? 'translateX(-50%) scale(1.1)'
                    : selectedPhone === 0
                    ? 'translateX(-50%) scale(0.9)'
                    : selectedPhone === 2
                    ? 'translateX(-50%) scale(0.9)'
                    : 'translateX(-50%) scale(0.8)',
                }}
              >
                <div className="relative w-56 sm:w-80 md:w-88 h-[28rem] sm:h-[40rem] md:h-[44rem] transition-all duration-300">
                  <Image
                    src="/Chat-Zentrais.png"
                    alt="Chat Interface"
                    fill
                    className="object-contain rounded-2xl"
                  />
                </div>
              </div>

              {/* Celular derecho - The Integrity Exchange */}
              <div
                onClick={() => setSelectedPhone(2)}
                className={`absolute transition-all duration-500 cursor-pointer ${
                  selectedPhone === 2
                    ? 'z-30 opacity-100'
                    : selectedPhone === 1
                    ? 'z-20 opacity-80'
                    : 'z-10 opacity-60'
                }`}
                style={{
                  left: selectedPhone === 2
                    ? '50%'
                    : selectedPhone === 1
                    ? 'calc(50% + 8rem)'
                    : 'calc(50% + 16rem)',
                  transform: selectedPhone === 2
                    ? 'translateX(-50%) scale(1.1)'
                    : selectedPhone === 1
                    ? 'translateX(-50%) scale(0.9)'
                    : 'translateX(-50%) scale(0.8)',
                }}
              >
                <div className="relative w-56 sm:w-80 md:w-88 h-[28rem] sm:h-[40rem] md:h-[44rem] transition-all duration-300">
                  <Image
                    src="/Marketplace-Zentrais.png"
                    alt="Marketplace Interface"
                    fill
                    className="object-contain rounded-2xl"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Human-AI Symbiosis - Simple Section */}
      <section className="relative z-10 container mx-auto px-4 sm:px-6 pt-20 sm:pt-24 md:pt-28 pb-12 sm:pb-16">
        <div className="max-w-4xl mx-auto text-left">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 text-white leading-tight font-sans tracking-tight">
            {t('user.symbiosis.title')}{' '}<span className="tone-highlight">{t('user.symbiosis.human')}</span>{' '}{t('user.symbiosis.subtitle')}
          </h2>
          <p className="text-lg sm:text-xl text-gray-300 leading-relaxed font-sans">
            {t('user.symbiosis.desc')}
          </p>
        </div>
      </section>

      {/* Step 1 Section - Two Columns */}
      <section className="relative z-10 container mx-auto px-4 sm:px-6 pt-20 sm:pt-24 md:pt-28 pb-12 sm:pb-16 md:pb-24">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-stretch">
            {/* Left Section - Text Content */}
            <div className="text-left flex flex-col">
              {/* Step 1 Badge */}
              <div className="inline-flex items-center justify-center rounded-full w-16 h-16 mb-4 tone-button" style={{ backgroundColor: 'var(--tone-primary)' }}>
                <span className="text-white font-semibold text-xs">{t('user.step.badge')} 1</span>
              </div>
              
              {/* Main Title */}
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 font-sans tracking-tight">
                {t('user.step1.title')}
              </h2>
              
              {/* Descriptive Text */}
              <p className="text-base sm:text-lg text-gray-300 mb-6 leading-relaxed font-sans">
                {t('user.step1.desc')}
              </p>
              
              {/* Three buttons with arrows */}
              <div className="space-y-3">
                <button className="w-full rounded-lg px-6 py-4 text-left text-white font-semibold text-base sm:text-lg transition-colors font-sans flex items-center gap-3 tone-button" style={{ backgroundColor: 'rgba(236, 72, 153, 0.85)' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(236, 72, 153, 0.95)'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(236, 72, 153, 0.85)'}>
                  <ArrowRight className="w-5 h-5 flex-shrink-0" />
                  <span>{t('user.step1.button1')}</span>
                </button>
                <button className="w-full rounded-lg px-6 py-4 text-left text-white font-semibold text-base sm:text-lg transition-colors font-sans flex items-center gap-3 tone-button" style={{ backgroundColor: 'rgba(236, 72, 153, 0.85)' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(236, 72, 153, 0.95)'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(236, 72, 153, 0.85)'}>
                  <ArrowRight className="w-5 h-5 flex-shrink-0" />
                  <span>{t('user.step1.button2')}</span>
                </button>
                <button className="w-full rounded-lg px-6 py-4 text-left text-white font-semibold text-base sm:text-lg transition-colors font-sans flex items-center gap-3 tone-button" style={{ backgroundColor: 'rgba(236, 72, 153, 0.85)' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(236, 72, 153, 0.95)'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(236, 72, 153, 0.85)'}>
                  <ArrowRight className="w-5 h-5 flex-shrink-0" />
                  <span>{t('user.step1.button3')}</span>
                </button>
              </div>
            </div>

            {/* Right Section - Image */}
            <div className="flex items-stretch justify-center lg:justify-end">
              <div className="relative w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl 2xl:max-w-2xl h-full min-h-[300px] sm:min-h-[350px] md:min-h-[400px] lg:min-h-[450px] xl:min-h-[500px] 2xl:min-h-[550px]">
                <Image
                  src="/user-image-1.png"
                  alt="Step 1"
                  fill
                  className="rounded-2xl object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Step 2 Section - Humanized Dialogue - Two Columns */}
      <section className="relative z-10 container mx-auto px-4 sm:px-6 pt-20 sm:pt-24 md:pt-28 pb-12 sm:pb-16 md:pb-24">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-stretch">
            {/* Left Section - Image */}
            <div className="flex items-stretch justify-center lg:justify-start order-2 lg:order-1">
              <div className="relative w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl 2xl:max-w-2xl h-full min-h-[300px] sm:min-h-[350px] md:min-h-[400px] lg:min-h-[450px] xl:min-h-[500px] 2xl:min-h-[550px]">
                <Image
                  src="/user-image-2.png"
                  alt="Step 2"
                  fill
                  className="rounded-2xl object-cover"
                />
              </div>
            </div>

            {/* Right Section - Text Content */}
            <div className="text-left order-1 lg:order-2 flex flex-col">
              {/* Step 2 Badge */}
              <div className="inline-flex items-center justify-center rounded-full w-16 h-16 mb-4 tone-button" style={{ backgroundColor: 'var(--tone-primary)' }}>
                <span className="text-white font-semibold text-xs">{t('user.step.badge')} 2</span>
              </div>

              {/* Main Title */}
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-white leading-tight font-sans tracking-tight">
                {t('user.step2.title')}
              </h2>

              {/* Descriptive Paragraph */}
              <p className="text-base sm:text-lg text-gray-300 mb-8 leading-relaxed font-sans">
                {t('user.step2.desc')}
              </p>

              {/* Interactive Prompt Buttons */}
              <div className="space-y-4">
                <button className="w-full rounded-lg px-6 py-4 text-left text-white font-semibold text-base sm:text-lg transition-colors font-sans tone-button" style={{ backgroundColor: 'rgba(236, 72, 153, 0.85)' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(236, 72, 153, 0.95)'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(236, 72, 153, 0.85)'}>
                  {t('user.step2.button1')}
                </button>
                <button className="w-full rounded-lg px-6 py-4 text-left text-white font-semibold text-base sm:text-lg transition-colors font-sans tone-button" style={{ backgroundColor: 'rgba(236, 72, 153, 0.85)' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(236, 72, 153, 0.95)'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(236, 72, 153, 0.85)'}>
                  {t('user.step2.button2')}
                </button>
                <button className="w-full rounded-lg px-6 py-4 text-left text-white font-semibold text-base sm:text-lg transition-colors font-sans tone-button" style={{ backgroundColor: 'rgba(236, 72, 153, 0.85)' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(236, 72, 153, 0.95)'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(236, 72, 153, 0.85)'}>
                  {t('user.step2.button3')}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Step 3 Section - Snapshot: Your Integrity Profile - Two Columns */}
      <section className="relative z-10 container mx-auto px-4 sm:px-6 pt-20 sm:pt-24 md:pt-28 pb-12 sm:pb-16 md:pb-24">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-stretch">
            {/* Left Section - Text Content */}
            <div className="text-left flex flex-col">
              {/* Step 3 Badge */}
              <div className="inline-flex items-center justify-center rounded-full w-16 h-16 mb-4 tone-button" style={{ backgroundColor: 'var(--tone-primary)' }}>
                <span className="text-white font-semibold text-xs">{t('user.step.badge')} 3</span>
              </div>

              {/* Main Title */}
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-white leading-tight font-sans tracking-tight">
                {t('user.step3.title')}
              </h2>

              {/* Descriptive Paragraph */}
              <p className="text-base sm:text-lg text-gray-300 mb-8 leading-relaxed font-sans">
                {t('user.step3.desc')}
              </p>

              {/* Three buttons/bullet points */}
              <div className="space-y-4">
                <button className="w-full rounded-lg px-6 py-4 text-left text-white font-semibold text-base sm:text-lg transition-colors font-sans tone-button" style={{ backgroundColor: 'rgba(236, 72, 153, 0.85)' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(236, 72, 153, 0.95)'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(236, 72, 153, 0.85)'}>
                  {t('user.step3.button1')}
                </button>
                <button className="w-full rounded-lg px-6 py-4 text-left text-white font-semibold text-base sm:text-lg transition-colors font-sans tone-button" style={{ backgroundColor: 'rgba(236, 72, 153, 0.85)' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(236, 72, 153, 0.95)'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(236, 72, 153, 0.85)'}>
                  {t('user.step3.button2')}
                </button>
                <button className="w-full rounded-lg px-6 py-4 text-left text-white font-semibold text-base sm:text-lg transition-colors font-sans tone-button" style={{ backgroundColor: 'rgba(236, 72, 153, 0.85)' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(236, 72, 153, 0.95)'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(236, 72, 153, 0.85)'}>
                  {t('user.step3.button3')}
                </button>
              </div>
            </div>

            {/* Right Section - Image */}
            <div className="flex items-stretch justify-center lg:justify-end">
              <div className="relative w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl 2xl:max-w-2xl h-full min-h-[300px] sm:min-h-[350px] md:min-h-[400px] lg:min-h-[450px] xl:min-h-[500px] 2xl:min-h-[550px]">
                <Image
                  src="/user-image-3.png"
                  alt="Step 3"
                  fill
                  className="rounded-2xl object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Beta Dashboard Section */}
      <section className="relative z-10 container mx-auto px-4 sm:px-6 pt-20 sm:pt-24 md:pt-28 pb-12 sm:pb-16">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-white leading-tight font-sans tracking-tight">
            {t('user.dashboard.title')}
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-300 leading-relaxed font-sans">
            {t('user.dashboard.desc')}{' '}
            <span className="text-blue-400 font-semibold">{t('user.dashboard.debate')}</span>,{' '}
            <span className="text-emerald-300 font-semibold">{t('user.dashboard.chat')}</span>, and{' '}
            <span className="text-orange-300 font-semibold">{t('user.dashboard.marketplace')}</span>{t('user.dashboard.desc2')}
          </p>
        </div>
      </section>

      {/* The Beta Dashboard - Three Panels with Phones */}
      <section className="relative z-10 container mx-auto px-4 sm:px-6 pt-20 sm:pt-24 md:pt-28 pb-8 sm:pb-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-20 lg:gap-24 max-w-6xl mx-auto">
          {/* The Integrity Perspective */}
          <div className="flex flex-col items-center hover:scale-105 transition-all duration-300">
            <div className="text-xl sm:text-2xl font-bold text-blue-300 mb-3 sm:mb-4 font-sans">{t('user.dashboard.integrity.debate')}</div>
            <div className="relative w-72 sm:w-80 md:w-96 lg:w-[28rem] xl:w-[30rem] 2xl:w-[32rem] h-[36rem] sm:h-[40rem] md:h-[44rem] lg:h-[48rem] xl:h-[52rem] 2xl:h-[56rem]">
              <Image
                src="/Debate-Zentrais.png"
                alt="Debate Interface"
                fill
                className="object-contain rounded-2xl"
              />
            </div>
          </div>

          {/* Dialog */}
          <div className="flex flex-col items-center hover:scale-105 transition-all duration-300">
            <div className="text-xl sm:text-2xl font-bold text-emerald-300 mb-3 sm:mb-4 font-sans">{t('user.dashboard.chat')}</div>
            <div className="relative w-72 sm:w-80 md:w-96 lg:w-[28rem] xl:w-[30rem] 2xl:w-[32rem] h-[36rem] sm:h-[40rem] md:h-[44rem] lg:h-[48rem] xl:h-[52rem] 2xl:h-[56rem]">
              <Image
                src="/Chat-Zentrais.png"
                alt="Chat Interface"
                fill
                className="object-contain rounded-2xl"
              />
            </div>
          </div>

          {/* The Integrity Exchange */}
          <div className="flex flex-col items-center hover:scale-105 transition-all duration-300">
            <div className="text-xl sm:text-2xl font-bold text-orange-300 mb-3 sm:mb-4 font-sans">{t('user.dashboard.integrity.marketplace')}</div>
            <div className="relative w-72 sm:w-80 md:w-96 lg:w-[28rem] xl:w-[30rem] 2xl:w-[32rem] h-[36rem] sm:h-[40rem] md:h-[44rem] lg:h-[48rem] xl:h-[52rem] 2xl:h-[56rem]">
              <Image
                src="/Marketplace-Zentrais.png"
                alt="Marketplace Interface"
                fill
                className="object-contain rounded-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Security & Trust Frames Section */}
      <section className="relative z-10 container mx-auto px-4 sm:px-6 pt-20 sm:pt-24 md:pt-28 pb-12 sm:pb-16 md:pb-24">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {/* Encrypted & Private */}
            <div className="bg-slate-900/60 backdrop-blur-sm rounded-2xl border border-pink-400/30 p-6 sm:p-8 hover:border-pink-400/60 transition-all duration-300 hover:scale-105">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-pink-500/20 flex items-center justify-center">
                  <Lock className="w-6 h-6 text-pink-300" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white font-sans">{t('user.insights.encrypted.title')}</h3>
              </div>
              <p className="text-gray-300 text-sm sm:text-base leading-relaxed font-sans">
                {t('user.insights.encrypted.desc')}
              </p>
            </div>

            {/* Verified & Credited */}
            <div className="bg-slate-900/60 backdrop-blur-sm rounded-2xl border border-pink-400/30 p-6 sm:p-8 hover:border-pink-400/60 transition-all duration-300 hover:scale-105">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-pink-500/20 flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-pink-300" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white font-sans">{t('user.insights.verified.title')}</h3>
              </div>
              <p className="text-gray-300 text-sm sm:text-base leading-relaxed font-sans">
                {t('user.insights.verified.desc')}
              </p>
            </div>

            {/* Ethical Standards */}
            <div className="bg-slate-900/60 backdrop-blur-sm rounded-2xl border border-pink-400/30 p-6 sm:p-8 hover:border-pink-400/60 transition-all duration-300 hover:scale-105">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-pink-500/20 flex items-center justify-center">
                  <Shield className="w-6 h-6 text-pink-300" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white font-sans">{t('user.insights.ethical.title')}</h3>
              </div>
              <p className="text-gray-300 text-sm sm:text-base leading-relaxed font-sans">
                {t('user.insights.ethical.desc')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Waitlist Signup Form */}
      <section id="waitlist-form" className="relative z-10 container mx-auto px-4 sm:px-6 py-12 sm:py-16 md:py-24">
        <div className="max-w-2xl mx-auto">
          <div className="bg-slate-900/60 backdrop-blur-sm rounded-2xl border border-blue-400/30 p-8 sm:p-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-6 text-white leading-tight font-sans tracking-tight">
              {t('user.waitlist.title')}
            </h2>
            <p className="text-base sm:text-lg text-gray-300 text-center mb-8 leading-relaxed font-sans">
              {t('user.waitlist.desc')}
            </p>
            
            <form 
              action="https://api.web3forms.com/submit"
              method="POST"
              onSubmit={async (e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                try {
                  const response = await fetch('https://api.web3forms.com/submit', {
                    method: 'POST',
                    body: formData
                  });
                  
                  if (response.ok) {
                    setIsSubmitted(true);
                    setWaitlistName('');
                    setWaitlistEmail('');
                    
                    // Después de 2 segundos, volver al estado normal
                    setTimeout(() => {
                      setIsSubmitted(false);
                    }, 2000);
                  }
                } catch (error) {
                  console.error('Error al enviar el formulario:', error);
                }
              }}
              className="space-y-6"
            >
              <input type="hidden" name="access_key" value="90c589f1-3e39-401f-a2ff-3aa0d2b96c05" />
              <input type="hidden" name="to" value="rodriguezadri500@gmail.com" />
              
              <div>
                <label htmlFor="waitlist-name" className="block text-white font-medium mb-2 text-sm sm:text-base font-sans">
                  {t('user.waitlist.name')}
                </label>
                <input
                  id="waitlist-name"
                  type="text"
                  name="name"
                  value={waitlistName}
                  onChange={(e) => setWaitlistName(e.target.value)}
                  placeholder={t('user.waitlist.name.placeholder')}
                  className="w-full px-4 py-3 rounded-lg border border-blue-400/30 bg-slate-800/50 text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all font-sans text-sm sm:text-base"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="waitlist-email" className="block text-white font-medium mb-2 text-sm sm:text-base font-sans">
                  {t('user.waitlist.email')}
                </label>
                <input
                  id="waitlist-email"
                  type="email"
                  name="email"
                  value={waitlistEmail}
                  onChange={(e) => setWaitlistEmail(e.target.value)}
                  placeholder={t('user.waitlist.email.placeholder')}
                  className="w-full px-4 py-3 rounded-lg border border-blue-400/30 bg-slate-800/50 text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all font-sans text-sm sm:text-base"
                  required
                />
              </div>
              
              <button
                type="submit"
                disabled={isSubmitted}
                className={`tone-button w-full text-white font-bold py-4 px-6 rounded-lg transition-all duration-500 text-lg sm:text-xl font-sans relative overflow-hidden ${
                  isSubmitted 
                    ? 'scale-75' 
                    : 'hover:scale-105'
                }`}
              >
                <span className={`flex items-center justify-center gap-2 transition-all duration-500 ${
                  isSubmitted ? 'opacity-0 scale-0' : 'opacity-100 scale-100'
                }`}>
                  {t('user.waitlist.submit')}
                </span>
                <span className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ${
                  isSubmitted ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
                }`}>
                  <svg 
                    className="w-6 h-6 text-green-400" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={3} 
                      d="M5 13l4 4L19 7" 
                    />
                  </svg>
                </span>
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer con información de la empresa */}
      <Footer />
    </div>
  );
}
