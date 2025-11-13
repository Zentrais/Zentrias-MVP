'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Button } from '../../components/ui/button';
import { MessageSquare, Gavel, ShoppingBag, ArrowRight, CheckCircle2, Circle, Lock, Shield, CheckCircle, DollarSign, ChevronDown, Play } from 'lucide-react';
import Footer from '../../components/footer';
import { useLanguage } from '../../contexts/language-context';

export default function UserPage() {
  const router = useRouter();
  const { t } = useLanguage();

  const carouselSlides = [
    {
      id: 'debate',
      title: t('user.carousel.debate.title'),
      description: t('user.carousel.debate.desc'),
      icon: Gavel,
      preview: 'Debate',
    },
    {
      id: 'chat',
      title: t('user.carousel.chat.title'),
      description: t('user.carousel.chat.desc'),
      icon: MessageSquare,
      preview: 'Chat',
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
  const [waitlistEmail, setWaitlistEmail] = useState(''); // 0: left, 1: middle, 2: right

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
      setCurrentSlide((prev) => (prev + 1) % carouselSlides.length);
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
    // Aquí iría la lógica para unirse a la beta
    router.push('/debate/new');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white relative overflow-hidden">
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
      <section className="relative z-10 container mx-auto px-4 sm:px-6 py-12 sm:py-16 md:py-24">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Texto a la izquierda */}
            <div className="text-left">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 text-white leading-tight font-sans">
                Connect with People{' '}
                <span className="block">Who Truly</span>{' '}
                <span className="text-pink-500">Understand You</span>
              </h1>
              <p className="text-lg sm:text-xl text-gray-300 mb-8 leading-relaxed font-sans">
                Our AI helps you meet like-minded people and have conversations that feel natural, empathetic, and human. Be the first to experience it.
              </p>
              <Button
                onClick={handleJoinBeta}
                className="bg-pink-500 text-white hover:bg-pink-600 text-base sm:text-lg px-8 sm:px-10 py-4 sm:py-6 rounded-xl font-semibold transition-all duration-500 hover:scale-105 group relative overflow-hidden hover:shadow-[0_0_30px_rgba(236,72,153,0.6)] transition-shadow duration-[1500ms]"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Join Now
                  <ArrowRight className="w-5 h-5 transition-transform duration-500 group-hover:translate-x-1" />
                </span>
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1500"></span>
              </Button>
            </div>

            {/* Celulares a la derecha */}
            <div className="relative h-[500px] sm:h-[600px] flex items-center justify-center">
              {/* Celular izquierdo - The Integrity Debate */}
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
                <div className="relative w-64 sm:w-72 h-[32rem] sm:h-[36rem] border-4 border-blue-400/60 rounded-[2.5rem] bg-transparent p-2 sm:p-3 hover:border-blue-400 hover:shadow-xl hover:shadow-blue-500/30 transition-all duration-300">
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-28 h-8 bg-slate-950 rounded-b-2xl border-b-2 border-blue-400/60"></div>
                  <div className="w-full h-full rounded-[2rem] border-2 border-blue-400/40 bg-blue-500/20 backdrop-blur-sm flex flex-col items-center justify-center pt-6 pb-6">
                    <Image
                      src="/icon.png"
                      alt="Zentrais Logo"
                      width={40}
                      height={40}
                      className="opacity-40 mb-4"
                    />
                    <div className="text-blue-300/70 text-sm font-sans text-center px-4">
                      your idea or statement
                    </div>
                  </div>
                  <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 w-16 h-1.5 bg-blue-400/40 rounded-full"></div>
                </div>
              </div>

              {/* Celular medio - Chat */}
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
                <div className="relative w-64 sm:w-72 h-[32rem] sm:h-[36rem] border-4 border-emerald-400/60 rounded-[2.5rem] bg-transparent p-2 sm:p-3 hover:border-emerald-400 hover:shadow-xl hover:shadow-emerald-500/30 transition-all duration-300">
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-28 h-8 bg-slate-950 rounded-b-2xl border-b-2 border-emerald-400/60"></div>
                  <div className="w-full h-full rounded-[2rem] border-2 border-emerald-400/40 bg-emerald-500/20 backdrop-blur-sm flex flex-col">
                    <div className="pt-6 pb-4 flex justify-center">
                      <Image
                        src="/icon.png"
                        alt="Zentrais Logo"
                        width={40}
                        height={40}
                        className="opacity-40"
                      />
                    </div>
                    <div className="flex-1"></div>
                    {/* Barra de escritura estilo chat */}
                    <div className="pb-4 px-4">
                      <div className="bg-slate-800/50 rounded-full border border-emerald-400/30 px-4 py-2 flex items-center gap-2">
                        <div className="flex-1 text-emerald-300/50 text-xs font-sans">Type a message...</div>
                        <div className="w-6 h-6 rounded-full bg-emerald-400/30 flex items-center justify-center">
                          <ArrowRight className="w-3 h-3 text-emerald-400" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 w-16 h-1.5 bg-emerald-400/40 rounded-full"></div>
                </div>
              </div>

              {/* Celular derecho - The Integrity Marketplace */}
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
                <div className="relative w-64 sm:w-72 h-[32rem] sm:h-[36rem] border-4 border-orange-400/60 rounded-[2.5rem] bg-transparent p-2 sm:p-3 hover:border-orange-400 hover:shadow-xl hover:shadow-orange-500/30 transition-all duration-300">
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-28 h-8 bg-slate-950 rounded-b-2xl border-b-2 border-orange-400/60"></div>
                  <div className="w-full h-full rounded-[2rem] border-2 border-orange-400/40 bg-orange-400/20 backdrop-blur-sm flex flex-col">
                    <div className="pt-6 pb-4 flex justify-center">
                      <Image
                        src="/icon.png"
                        alt="Zentrais Logo"
                        width={40}
                        height={40}
                        className="opacity-40"
                      />
                    </div>
                    {/* Conversaciones de venta */}
                    <div className="flex-1 px-3 py-4 space-y-3 overflow-y-auto">
                      <div className="flex flex-col items-end">
                        <div className="bg-orange-500/30 rounded-2xl rounded-tr-sm px-3 py-2 max-w-[85%]">
                          <div className="text-orange-200 text-xs font-sans font-semibold mb-2">Selling: Modern Chair</div>
                          <div className="relative w-full h-24 rounded-lg overflow-hidden mb-2">
                            <Image
                              src="/chair.jpg"
                              alt="Chair for sale"
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="text-orange-100/70 text-xs font-sans">$120 - Excellent condition</div>
                        </div>
                      </div>
                      <div className="flex flex-col items-start">
                        <div className="bg-slate-800/40 rounded-2xl rounded-tl-sm px-3 py-2 max-w-[85%]">
                          <div className="text-orange-300/80 text-xs font-sans">Is it still available? What&apos;s the condition?</div>
                        </div>
                      </div>
                      <div className="flex flex-col items-end">
                        <div className="bg-orange-500/30 rounded-2xl rounded-tr-sm px-3 py-2 max-w-[85%]">
                          <div className="text-orange-200 text-xs font-sans">Yes! Like new, barely used. Can deliver today.</div>
                        </div>
                      </div>
                      <div className="flex flex-col items-start">
                        <div className="bg-slate-800/40 rounded-2xl rounded-tl-sm px-3 py-2 max-w-[85%]">
                          <div className="text-orange-300/80 text-xs font-sans">Perfect! I&apos;ll take it. Where can we meet?</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 w-16 h-1.5 bg-orange-400/40 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Human-AI Symbiosis - Simple Section */}
      <section className="relative z-10 container mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <div className="max-w-4xl mx-auto text-left">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 text-white leading-tight font-sans">
            Experience <span className="text-pink-500">Human-AI</span> Symbiosis
          </h2>
          <p className="text-lg sm:text-xl text-gray-300 leading-relaxed font-sans">
            Discover a digital space built on trust, where deep reflection meets open dialogue. Our three-step journey is designed to respect your mind and measure your personal integrity footprint.
          </p>
        </div>
      </section>

      {/* Step 1 Section - Two Columns */}
      <section className="relative z-10 container mx-auto px-4 sm:px-6 py-12 sm:py-16 md:py-24">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
            {/* Left Section - Text Content */}
            <div className="text-left">
              {/* Step 1 Badge */}
              <div className="inline-block bg-blue-900 rounded-lg px-4 py-2 mb-4">
                <span className="text-white font-semibold text-sm">Step 1</span>
              </div>
              
              {/* Main Title */}
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 font-sans">
                Let&apos;s Get to Know You. Really!
              </h3>
              
              {/* Descriptive Text */}
              <p className="text-base sm:text-lg text-gray-300 mb-6 leading-relaxed font-sans">
                Your journey begins with a feeling of intrigue and openness. We start with one simple prompt: &apos;What&apos;s in your mind today?&apos;
              </p>
              
              {/* Three buttons with arrows */}
              <div className="space-y-3">
                <button className="w-full bg-blue-900 rounded-lg px-6 py-4 text-left text-white font-medium text-sm sm:text-base hover:bg-blue-800 transition-colors font-sans flex items-center gap-3">
                  <ArrowRight className="w-4 h-4 flex-shrink-0" />
                  <span>Select input: Text, Voice, or Gesture</span>
                </button>
                <button className="w-full bg-blue-900 rounded-lg px-6 py-4 text-left text-white font-medium text-sm sm:text-base hover:bg-blue-800 transition-colors font-sans flex items-center gap-3">
                  <ArrowRight className="w-4 h-4 flex-shrink-0" />
                  <span>Set the stage for authentic dialogue</span>
                </button>
                <button className="w-full bg-blue-900 rounded-lg px-6 py-4 text-left text-white font-medium text-sm sm:text-base hover:bg-blue-800 transition-colors font-sans flex items-center gap-3">
                  <ArrowRight className="w-4 h-4 flex-shrink-0" />
                  <span>Embrace the feeling of openness</span>
                </button>
              </div>
              
              {/* Accent Circle */}
              <div className="mt-8 flex justify-end lg:justify-start">
                <div className="w-16 h-16 rounded-full bg-blue-900 border-2 border-blue-700"></div>
              </div>
            </div>

            {/* Right Section - Phone Mockup with Gradient */}
            <div className="flex items-center justify-center lg:justify-end">
              <div className="relative w-full max-w-md">
                {/* Background gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-fuchsia-500 via-purple-600 to-pink-500 rounded-3xl opacity-90"></div>
                
                {/* Phone mockup */}
                <div className="relative w-64 sm:w-72 mx-auto">
                  <div className="relative bg-slate-900 rounded-[2.5rem] p-2 border-4 border-slate-800 shadow-2xl">
                    <div className="w-full h-[500px] sm:h-[600px] rounded-[2rem] bg-slate-950 overflow-hidden flex flex-col">
                      {/* Notch */}
                      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-28 h-8 bg-slate-950 rounded-b-2xl border-b-2 border-slate-800 z-10"></div>
                      
                      {/* Content */}
                      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12">
                        <h3 className="text-white text-xl sm:text-2xl font-bold mb-8 text-center font-sans">
                          What&apos;s in your mind today?
                        </h3>
                        
                        {/* Buttons */}
                        <div className="flex gap-3 sm:gap-4 w-full justify-center">
                          <button className="px-4 sm:px-6 py-3 sm:py-4 bg-purple-900/50 rounded-xl text-white font-medium text-sm sm:text-base hover:bg-purple-800/50 transition-colors font-sans">
                            Text
                          </button>
                          <button className="px-4 sm:px-6 py-3 sm:py-4 bg-purple-900/50 rounded-xl text-white font-medium text-sm sm:text-base hover:bg-purple-800/50 transition-colors font-sans">
                            Voice
                          </button>
                          <button className="px-4 sm:px-6 py-3 sm:py-4 bg-purple-500 rounded-xl text-white font-medium text-sm sm:text-base shadow-[0_0_20px_rgba(168,85,247,0.8)] hover:shadow-[0_0_30px_rgba(168,85,247,1)] transition-all font-sans relative">
                            Gesture
                            <div className="absolute inset-0 bg-purple-400/30 rounded-xl animate-pulse"></div>
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 w-16 h-1.5 bg-slate-800 rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Step 2 Section - Humanized Dialogue - Two Columns */}
      <section className="relative z-10 container mx-auto px-4 sm:px-6 py-12 sm:py-16 md:py-24">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
            {/* Left Section - Phone Mockup */}
            <div className="flex items-center justify-center lg:justify-start order-2 lg:order-1">
              <div className="relative w-full max-w-md">
                {/* Phone mockup */}
                <div className="relative w-64 sm:w-72 mx-auto">
                  <div className="relative bg-slate-900 rounded-[2.5rem] p-2 border-4 border-slate-800 shadow-2xl">
                    <div className="w-full h-[500px] sm:h-[600px] rounded-[2rem] bg-slate-950 overflow-hidden flex flex-col">
                      {/* Notch */}
                      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-28 h-8 bg-slate-950 rounded-b-2xl border-b-2 border-slate-800 z-10"></div>
                      
                      {/* Content */}
                      <div className="flex-1 flex flex-col px-6 py-8">
                        {/* Header */}
                        <div className="mb-8">
                          <h3 className="text-white text-lg sm:text-xl font-bold font-sans">Zentrais</h3>
                        </div>
                        
                        {/* Radio button options */}
                        <div className="space-y-4 flex-1">
                          <label className="flex items-center gap-3 p-4 bg-slate-800/50 rounded-xl cursor-pointer hover:bg-slate-800/70 transition-colors">
                            <input type="radio" name="dialogue" className="w-5 h-5 text-purple-500" defaultChecked />
                            <span className="text-white text-sm font-medium font-sans">I&apos;d love to get to know you</span>
                          </label>
                          <label className="flex items-center gap-3 p-4 bg-slate-800/50 rounded-xl cursor-pointer hover:bg-slate-800/70 transition-colors">
                            <input type="radio" name="dialogue" className="w-5 h-5 text-purple-500" />
                            <span className="text-white text-sm font-medium font-sans">What&apos;s one truth you hold dear</span>
                          </label>
                          <label className="flex items-center gap-3 p-4 bg-slate-800/50 rounded-xl cursor-pointer hover:bg-slate-800/70 transition-colors">
                            <input type="radio" name="dialogue" className="w-5 h-5 text-purple-500" />
                            <span className="text-white text-sm font-medium font-sans">What are you curious about right now?</span>
                          </label>
                        </div>
                        
                        {/* Bottom interaction circle */}
                        <div className="flex justify-center mt-6">
                          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 shadow-[0_0_30px_rgba(59,130,246,0.8)] flex items-center justify-center">
                            <div className="w-12 h-12 rounded-full bg-white/20"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 w-16 h-1.5 bg-slate-800 rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Section - Text Content */}
            <div className="text-left order-1 lg:order-2">
              {/* Step 2 Badge */}
              <div className="inline-block bg-blue-900 rounded-lg px-4 py-2 mb-4">
                <span className="text-white font-semibold text-sm">Step 2</span>
              </div>

              {/* Main Title */}
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-white leading-tight font-sans">
                Humanized Dialogue: The Co-Think Space
              </h2>

              {/* Descriptive Paragraph */}
              <p className="text-base sm:text-lg text-gray-300 mb-8 leading-relaxed font-sans">
                Experience true human-AI symbiosis. Our system engages you in a short, prompt-based dialogue to understand your mindset, not just your data.
              </p>

              {/* Interactive Prompt Buttons */}
              <div className="space-y-4">
                <button className="w-full bg-blue-900 rounded-lg px-6 py-4 text-left text-white font-medium text-sm sm:text-base hover:bg-blue-800 transition-colors font-sans">
                  What are you curious about right now?
                </button>
                <button className="w-full bg-blue-900 rounded-lg px-6 py-4 text-left text-white font-medium text-sm sm:text-base hover:bg-blue-800 transition-colors font-sans">
                  What&apos;s one truth you hold dear
                </button>
                <button className="w-full bg-blue-900 rounded-lg px-6 py-4 text-left text-white font-medium text-sm sm:text-base hover:bg-blue-800 transition-colors font-sans">
                  We&apos;d love to get to know you
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Step 3 Section - Snapshot: Your Integrity Profile - Two Columns */}
      <section className="relative z-10 container mx-auto px-4 sm:px-6 py-12 sm:py-16 md:py-24">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
            {/* Left Section - Text Content */}
            <div className="text-left">
              {/* Step 3 Badge */}
              <div className="inline-block bg-blue-900 rounded-lg px-4 py-2 mb-4">
                <span className="text-white font-semibold text-sm">Step 3</span>
              </div>

              {/* Main Title */}
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-white leading-tight font-sans">
                Snapshot: Your Integrity Profile
              </h2>

              {/* Descriptive Paragraph */}
              <p className="text-base sm:text-lg text-gray-300 mb-8 leading-relaxed font-sans">
                See yourself reflected in your digital space. Receive a short, private profile that is friendly and affirming. This is your personal integrity footprint.
              </p>

              {/* Three buttons/bullet points */}
              <div className="space-y-4">
                <button className="w-full bg-blue-900 rounded-lg px-6 py-4 text-left text-white font-medium text-sm sm:text-base hover:bg-blue-800 transition-colors font-sans">
                  Tend to reflect deeply before reacting
                </button>
                <button className="w-full bg-blue-900 rounded-lg px-6 py-4 text-left text-white font-medium text-sm sm:text-base hover:bg-blue-800 transition-colors font-sans">
                  The profile is private and not shared.
                </button>
                <button className="w-full bg-blue-900 rounded-lg px-6 py-4 text-left text-white font-medium text-sm sm:text-base hover:bg-blue-800 transition-colors font-sans">
                  You value authentic dialogue
                </button>
              </div>
            </div>

            {/* Right Section - Phone Mockup with Gradient */}
            <div className="flex items-center justify-center lg:justify-end">
              <div className="relative w-full max-w-md">
                {/* Background gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-600 via-purple-500 to-pink-500 rounded-3xl opacity-90"></div>
                
                {/* Phone mockup */}
                <div className="relative w-64 sm:w-72 mx-auto">
                  <div className="relative bg-slate-900 rounded-[2.5rem] p-2 border-4 border-slate-800 shadow-2xl">
                    <div className="w-full h-[500px] sm:h-[600px] rounded-[2rem] bg-slate-950 overflow-hidden flex flex-col">
                      {/* Notch */}
                      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-28 h-8 bg-slate-950 rounded-b-2xl border-b-2 border-slate-800 z-10"></div>
                      
                      {/* Content */}
                      <div className="flex-1 flex flex-col px-6 py-8">
                        {/* Header with Zentrais */}
                        <div className="mb-6">
                          <h3 className="text-white text-sm font-semibold font-sans">Zentrais</h3>
                        </div>
                        
                        {/* Title with Chevron */}
                        <div className="mb-4">
                          <div className="flex items-center gap-2 mb-2">
                            <h4 className="text-white text-lg sm:text-xl font-bold font-sans">Your Personality Integrity Snapshot</h4>
                            <ChevronDown className="w-4 h-4 text-white" />
                          </div>
                        </div>
                        
                        {/* Descriptive Text */}
                        <p className="text-white/70 text-xs sm:text-sm mb-6 leading-relaxed font-sans">
                          Your profile reflects your authentic self. This snapshot captures your integrity footprint based on your interactions and dialogue patterns.
                        </p>
                        
                        {/* Wavy Graph Visualization */}
                        <div className="mb-6 relative h-20 w-full">
                          <svg viewBox="0 0 200 60" className="w-full h-full" preserveAspectRatio="none">
                            <path
                              d="M 0 30 Q 25 10, 50 30 T 100 30 T 150 30 T 200 30"
                              stroke="#ec4899"
                              strokeWidth="3"
                              fill="none"
                              className="animate-pulse"
                            />
                            <path
                              d="M 0 35 Q 25 15, 50 35 T 100 35 T 150 35 T 200 35"
                              stroke="#f97316"
                              strokeWidth="2"
                              fill="none"
                              opacity="0.7"
                            />
                            <path
                              d="M 0 40 Q 25 20, 50 40 T 100 40 T 150 40 T 200 40"
                              stroke="#10b981"
                              strokeWidth="2"
                              fill="none"
                              opacity="0.5"
                            />
                          </svg>
                        </div>
                        
                        {/* Bottom Play Button */}
                        <div className="mt-auto flex justify-end">
                          <button className="w-12 h-12 rounded-full border-2 border-blue-400/50 bg-blue-500/20 flex items-center justify-center hover:bg-blue-500/30 transition-colors shadow-[0_0_20px_rgba(59,130,246,0.5)]">
                            <Play className="w-5 h-5 text-blue-400 ml-1" fill="currentColor" />
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 w-16 h-1.5 bg-slate-800 rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Beta Dashboard Section */}
      <section className="relative z-10 container mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-white leading-tight font-sans">
            The Beta Dashboard
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-300 leading-relaxed font-sans">
            Go beyond passive browsing. The Beta Dashboard provides three unique spaces:{' '}
            <span className="text-blue-400 font-semibold">Debate</span>,{' '}
            <span className="text-blue-400 font-semibold">Chat</span>, and{' '}
            <span className="text-blue-400 font-semibold">Marketplace</span>, where you actively engage in human-AI symbiosis and build your personal integrity footprint.
          </p>
        </div>
      </section>

      {/* The Beta Dashboard - Three Panels with Phones */}
      <section className="relative z-10 container mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
          {/* The Integrity Debate */}
          <div className="flex flex-col items-center hover:scale-105 transition-all duration-300">
            <div className="text-xl sm:text-2xl font-bold text-blue-300 mb-3 sm:mb-4 font-sans">The Integrity Debate</div>
            <div className="relative">
              <div className="relative w-64 sm:w-72 h-[32rem] sm:h-[36rem] border-4 border-blue-400/60 rounded-[2.5rem] bg-transparent p-2 sm:p-3 hover:border-blue-400 hover:shadow-xl hover:shadow-blue-500/30 transition-all duration-300">
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-28 h-8 bg-slate-950 rounded-b-2xl border-b-2 border-blue-400/60"></div>
                <div className="w-full h-full rounded-[2rem] border-2 border-blue-400/40 bg-blue-500/20 backdrop-blur-sm flex flex-col items-center justify-center pt-6 pb-6">
                  <Image
                    src="/icon.png"
                    alt="Zentrais Logo"
                    width={40}
                    height={40}
                    className="opacity-40 mb-4"
                  />
                  <div className="text-blue-300/70 text-sm font-sans text-center px-4">
                    your idea or statement
                  </div>
                </div>
                <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 w-16 h-1.5 bg-blue-400/40 rounded-full"></div>
              </div>
            </div>
          </div>

          {/* Chat */}
          <div className="flex flex-col items-center hover:scale-105 transition-all duration-300">
            <div className="text-xl sm:text-2xl font-bold text-emerald-300 mb-3 sm:mb-4 font-sans">Chat</div>
            <div className="relative">
              <div className="relative w-64 sm:w-72 h-[32rem] sm:h-[36rem] border-4 border-emerald-400/60 rounded-[2.5rem] bg-transparent p-2 sm:p-3 hover:border-emerald-400 hover:shadow-xl hover:shadow-emerald-500/30 transition-all duration-300">
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-28 h-8 bg-slate-950 rounded-b-2xl border-b-2 border-emerald-400/60"></div>
                <div className="w-full h-full rounded-[2rem] border-2 border-emerald-400/40 bg-emerald-500/20 backdrop-blur-sm flex flex-col">
                  <div className="pt-6 pb-4 flex justify-center">
                    <Image
                      src="/icon.png"
                      alt="Zentrais Logo"
                      width={40}
                      height={40}
                      className="opacity-40"
                    />
                  </div>
                  <div className="flex-1"></div>
                  {/* Barra de escritura estilo chat */}
                  <div className="pb-4 px-4">
                    <div className="bg-slate-800/50 rounded-full border border-emerald-400/30 px-4 py-2 flex items-center gap-2">
                      <div className="flex-1 text-emerald-300/50 text-xs font-sans">Type a message...</div>
                      <div className="w-6 h-6 rounded-full bg-emerald-400/30 flex items-center justify-center">
                        <ArrowRight className="w-3 h-3 text-emerald-400" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 w-16 h-1.5 bg-emerald-400/40 rounded-full"></div>
              </div>
            </div>
          </div>

          {/* The Integrity Marketplace */}
          <div className="flex flex-col items-center hover:scale-105 transition-all duration-300">
            <div className="text-xl sm:text-2xl font-bold text-blue-300 mb-3 sm:mb-4 font-sans">The Integrity Marketplace</div>
            <div className="relative">
              <div className="relative w-64 sm:w-72 h-[32rem] sm:h-[36rem] border-4 border-orange-400/60 rounded-[2.5rem] bg-transparent p-2 sm:p-3 hover:border-orange-400 hover:shadow-xl hover:shadow-orange-500/30 transition-all duration-300">
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-28 h-8 bg-slate-950 rounded-b-2xl border-b-2 border-orange-400/60"></div>
                <div className="w-full h-full rounded-[2rem] border-2 border-orange-400/40 bg-orange-400/20 backdrop-blur-sm flex flex-col">
                  <div className="pt-6 pb-4 flex justify-center">
                    <Image
                      src="/icon.png"
                      alt="Zentrais Logo"
                      width={40}
                      height={40}
                      className="opacity-40"
                    />
                  </div>
                  {/* Conversaciones de venta */}
                  <div className="flex-1 px-3 py-4 space-y-3 overflow-y-auto">
                    <div className="flex flex-col items-end">
                      <div className="bg-orange-500/30 rounded-2xl rounded-tr-sm px-3 py-2 max-w-[85%]">
                        <div className="text-orange-200 text-xs font-sans font-semibold mb-2">Selling: Modern Chair</div>
                        <div className="relative w-full h-24 rounded-lg overflow-hidden mb-2">
                          <Image
                            src="/chair.jpg"
                            alt="Chair for sale"
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="text-orange-100/70 text-xs font-sans">$120 - Excellent condition</div>
                      </div>
                    </div>
                    <div className="flex flex-col items-start">
                      <div className="bg-slate-800/40 rounded-2xl rounded-tl-sm px-3 py-2 max-w-[85%]">
                        <div className="text-orange-300/80 text-xs font-sans">Is it still available? What&apos;s the condition?</div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end">
                      <div className="bg-orange-500/30 rounded-2xl rounded-tr-sm px-3 py-2 max-w-[85%]">
                        <div className="text-orange-200 text-xs font-sans">Yes! Like new, barely used. Can deliver today.</div>
                      </div>
                    </div>
                    <div className="flex flex-col items-start">
                      <div className="bg-slate-800/40 rounded-2xl rounded-tl-sm px-3 py-2 max-w-[85%]">
                        <div className="text-orange-300/80 text-xs font-sans">Perfect! I&apos;ll take it. Where can we meet?</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 w-16 h-1.5 bg-orange-400/40 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Security & Trust Frames Section */}
      <section className="relative z-10 container mx-auto px-4 sm:px-6 py-12 sm:py-16 md:py-24">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {/* Encrypted & Private */}
            <div className="bg-slate-900/60 backdrop-blur-sm rounded-2xl border border-blue-400/30 p-6 sm:p-8 hover:border-blue-400/60 transition-all duration-300 hover:scale-105">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center">
                  <Lock className="w-6 h-6 text-blue-400" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white font-sans">Encrypted & Private</h3>
              </div>
              <p className="text-gray-300 text-sm sm:text-base leading-relaxed font-sans">
                Your data is encrypted and never sold
              </p>
            </div>

            {/* Verified & Credited */}
            <div className="bg-slate-900/60 backdrop-blur-sm rounded-2xl border border-blue-400/30 p-6 sm:p-8 hover:border-blue-400/60 transition-all duration-300 hover:scale-105">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-blue-400" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white font-sans">Verified & Credited</h3>
              </div>
              <p className="text-gray-300 text-sm sm:text-base leading-relaxed font-sans">
                Every contribution is verified and credited to you
              </p>
            </div>

            {/* Ethical Standards */}
            <div className="bg-slate-900/60 backdrop-blur-sm rounded-2xl border border-blue-400/30 p-6 sm:p-8 hover:border-blue-400/60 transition-all duration-300 hover:scale-105">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center">
                  <Shield className="w-6 h-6 text-blue-400" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white font-sans">Ethical Standards</h3>
              </div>
              <p className="text-gray-300 text-sm sm:text-base leading-relaxed font-sans">
                Zentrais follows strict ethical AI and data standards
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Waitlist Signup Form */}
      <section className="relative z-10 container mx-auto px-4 sm:px-6 py-12 sm:py-16 md:py-24">
        <div className="max-w-2xl mx-auto">
          <div className="bg-slate-900/60 backdrop-blur-sm rounded-2xl border border-blue-400/30 p-8 sm:p-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-6 text-white leading-tight font-sans">
              Be One of the First to Experience Digital Integrity.
            </h2>
            <p className="text-base sm:text-lg text-gray-300 text-center mb-8 leading-relaxed font-sans">
              Secure your exclusive invitation to the Zentrals Demo/Beta, the space where exploratory thinkers engage in authentic dialogue and track their integrity footprint.
            </p>
            
            <form 
              onSubmit={(e) => {
                e.preventDefault();
                handleJoinBeta();
              }}
              className="space-y-6"
            >
              <div>
                <label htmlFor="waitlist-name" className="block text-white font-medium mb-2 text-sm sm:text-base font-sans">
                  Name
                </label>
                <input
                  id="waitlist-name"
                  type="text"
                  value={waitlistName}
                  onChange={(e) => setWaitlistName(e.target.value)}
                  placeholder="We'd love to get to know you"
                  className="w-full px-4 py-3 rounded-lg border border-blue-400/30 bg-slate-800/50 text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all font-sans text-sm sm:text-base"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="waitlist-email" className="block text-white font-medium mb-2 text-sm sm:text-base font-sans">
                  Email
                </label>
                <input
                  id="waitlist-email"
                  type="email"
                  value={waitlistEmail}
                  onChange={(e) => setWaitlistEmail(e.target.value)}
                  placeholder="Your email for Demo access updates"
                  className="w-full px-4 py-3 rounded-lg border border-blue-400/30 bg-slate-800/50 text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all font-sans text-sm sm:text-base"
                  required
                />
              </div>
              
              <button
                type="submit"
                className="w-full bg-pink-500 hover:bg-pink-600 text-white font-bold py-4 px-6 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-pink-500/30 text-base sm:text-lg font-sans"
              >
                Join Waitlist
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
