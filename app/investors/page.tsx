'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Button } from '../../components/ui/button';
import { ArrowRight, Download, Mail, Play, Users, Zap, DollarSign, Calendar, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import Footer from '../../components/footer';
import { useLanguage } from '../../contexts/language-context';
import { motion, AnimatePresence } from 'framer-motion';

// Componente de contador animado
function AnimatedCounter({ end, suffix = '', duration = 2000 }: { end: number; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number;
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      setCount(Math.floor(end * progress));
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    requestAnimationFrame(animate);
  }, [end, duration]);

  return <span>{count}{suffix}</span>;
}

// Componente de countdown
function LaunchCountdown() {
  const [days, setDays] = useState(0);

  useEffect(() => {
    const launchDate = new Date('2026-01-01');
    const updateCountdown = () => {
      const now = new Date();
      const diff = launchDate.getTime() - now.getTime();
      const daysLeft = Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
      setDays(daysLeft);
    };
    updateCountdown();
    const interval = setInterval(updateCountdown, 1000 * 60 * 60); // Update hourly
    return () => clearInterval(interval);
  }, []);

  return <span>{days} Days</span>;
}

export default function InvestorsPage() {
  const router = useRouter();
  const { t } = useLanguage();
  const [isVisible] = useState(true);
  const [formData, setFormData] = useState({
    fullName: '',
    roleOrganization: '',
    investmentFocus: '',
    amountInterested: '',
    email: '',
    comments: '',
  });
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; delay: number }>>([]);

  // Generar partículas suaves
  useEffect(() => {
    const newParticles = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 5,
    }));
    setParticles(newParticles);
  }, []);

  const timelineMilestones = [
    {
      quarter: 'Q1 2026',
      title: 'Dialog & Perspective MVP Environments Live',
      icon: Zap,
    },
    {
      quarter: 'Q2 2026',
      title: 'Integrity Token Economy Activated',
      icon: DollarSign,
    },
    {
      quarter: 'Q3 2026',
      title: 'Exchange Launch & Expansion Phase',
      icon: Users,
    },
    {
      quarter: 'Q4 2026',
      title: 'Global Integration & Scaling',
      icon: Calendar,
    },
  ];

  const teamMembers = [
    {
      name: 'Levi Ezagui',
      role: 'Founder, CEO & Chief Vision Officer',
      bio: "Drives Zentrais' global vision and scale — turning the Integrity Economy from concept into infrastructure.",
      image: "/Levi Ezagui Picture 1.jpg",
    },
    {
      name: 'Antonio Lovera',
      role: 'Co-Founder, CTO & Chief Brand Architect',
      bio: 'Fuses technology and storytelling to make integrity the core operating system of human-AI collaboration.',
      image: "/Antonio Lovera Portrait 3.jpeg",
    },
    {
      name: 'David Shagalov',
      role: 'Co-Founder, COO & Chief Integrity Officer',
      bio: 'Builds ethical systems and operational frameworks that keep integrity measurable, actionable, and alive.',
      image: "/David Shagalov Picture 2.jpg",
    },
    {
      name: 'Declan O\'Beirne',
      role: 'CFO & Chief Prosperity Officer',
      bio: 'Aligns finance with purpose — driving transparency, growth, and sustainable value across the Integrity Economy.',
      image: "/Declan O'Beirne Picture 1.jpg",
    },
  ];

  // Función para obtener la URL codificada de la imagen
  const getImageUrl = (imagePath: string) => {
    // Codificar solo los espacios y caracteres especiales, manteniendo la estructura de la ruta
    return imagePath.split('/').map(part => 
      part === '' ? '' : encodeURIComponent(part)
    ).join('/');
  };

  const [currentMemberIndex, setCurrentMemberIndex] = useState(0);

  const nextMember = () => {
    setCurrentMemberIndex((prev) => (prev + 1) % teamMembers.length);
  };

  const prevMember = () => {
    setCurrentMemberIndex((prev) => (prev - 1 + teamMembers.length) % teamMembers.length);
  };

  const goToMember = (index: number) => {
    setCurrentMemberIndex(index);
  };

  const handleDataRoom = () => {
    window.location.href = 'mailto:investors@zentrais.com?subject=Data Room Access Request';
  };

  const handleInvestorDeck = () => {
    window.location.href = 'mailto:investors@zentrais.com?subject=Investor Deck Request';
  };

  const handleInvestorRelations = () => {
    window.location.href = 'mailto:investors@zentrais.com';
  };

  const handleJoinHub = () => {
    const formElement = document.getElementById('investor-form');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen text-white relative overflow-hidden investors-tech investors-tone" style={{ backgroundColor: '#36454F' }}>
      {/* Fondo animado sutil */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {/* Partículas suaves flotantes */}
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute w-1 h-1 bg-white rounded-full opacity-25 animate-float"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              animationDelay: `${particle.delay}s`,
              animationDuration: `${8 + Math.random() * 4}s`,
            }}
          />
        ))}
        
        {/* Líneas de flujo sutiles */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-indigo-400/30 to-transparent animate-flow" />
          <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-pink-400/30 to-transparent animate-flow" style={{ animationDelay: '2s' }} />
          <div className="absolute top-3/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-indigo-400/30 to-transparent animate-flow" style={{ animationDelay: '4s' }} />
        </div>
      </div>

      {/* Investing in Integrity Section */}
      <section className="relative z-10 container mx-auto px-4 sm:px-6 py-12 sm:py-16 md:py-24">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-white leading-tight">
            {t('investors.integrity.title')}{' '}
            <span className="tone-highlight investors-human">{t('investors.integrity.not')}</span>
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-12 leading-relaxed max-w-3xl mx-auto">
            {t('investors.integrity.desc')}
          </p>

          {/* Video Placeholder */}
          <div className="mb-8 sm:mb-12">
            <div className="w-full max-w-4xl mx-auto bg-slate-800/50 rounded-3xl border border-indigo-400/30 p-16 sm:p-20 md:p-24 flex items-center justify-center min-h-[300px] sm:min-h-[400px] md:min-h-[500px]">
              <div className="text-center">
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-400">
                  {t('investors.integrity.video')}
                </div>
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-400 investors-human">
                  {t('investors.integrity.video2')}
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Find Your Investor Type Section */}
      <section className="relative z-10 container mx-auto px-4 sm:px-6 py-12 sm:py-16 md:py-24">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-white leading-tight">
              {t('investors.find.type.title')}{' '}
              <span className="tone-highlight investors-human">{t('investors.find.type.subtitle')}</span>
            </h2>
            <p className="text-lg sm:text-xl text-gray-300 leading-relaxed max-w-2xl mx-auto">
              {t('investors.find.type.desc')}
            </p>
          </div>

          {/* Investor Type Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-12">
            {/* Frontier Investor */}
            <div className="tone-card bg-slate-800/30 backdrop-blur-sm rounded-2xl border p-6 sm:p-8 flex flex-col">
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-4">
                {t('investors.find.frontier.title')}
              </h3>
              <p className="text-gray-300 text-sm sm:text-base mb-6 flex-1 leading-relaxed">
                {t('investors.find.frontier.desc')}
              </p>
              <div className="mt-auto">
                <button className="tone-highlight hover:opacity-80 underline font-semibold text-sm sm:text-base investors-human transition-colors cursor-pointer">
                  {t('investors.find.frontier.learn')}
                </button>
              </div>
            </div>

            {/* Impact Investor */}
            <div className="tone-card bg-slate-800/30 backdrop-blur-sm rounded-2xl border p-6 sm:p-8 flex flex-col">
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-4">
                {t('investors.find.impact.title')}
              </h3>
              <p className="text-gray-300 text-sm sm:text-base mb-6 flex-1 leading-relaxed">
                {t('investors.find.impact.desc')}
              </p>
              <div className="mt-auto">
                <button className="tone-highlight hover:opacity-80 underline font-semibold text-sm sm:text-base investors-human transition-colors cursor-pointer">
                  {t('investors.find.impact.learn')}
                </button>
              </div>
            </div>

            {/* Legacy Investor */}
            <div className="tone-card bg-slate-800/30 backdrop-blur-sm rounded-2xl border p-6 sm:p-8 flex flex-col">
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-4">
                {t('investors.find.legacy.title')}
              </h3>
              <p className="text-gray-300 text-sm sm:text-base mb-6 flex-1 leading-relaxed">
                {t('investors.find.legacy.desc')}
              </p>
              <div className="mt-auto">
                <button className="tone-highlight hover:opacity-80 underline font-semibold text-sm sm:text-base investors-human transition-colors cursor-pointer">
                  {t('investors.find.legacy.learn')}
                </button>
              </div>
            </div>
          </div>

          {/* Join Hub Button */}
          <div className="text-center">
            <Button
              onClick={handleJoinHub}
              className="tone-button text-white text-lg px-8 py-6 rounded-xl font-bold transition-all duration-500 hover:scale-105"
            >
              {t('investors.find.join')}
            </Button>
          </div>
        </div>
      </section>

      {/* The Attention Economy Is Collapsing Section */}
      <section className="relative z-10 container mx-auto px-4 sm:px-6 py-12 sm:py-16 md:py-24">
        <div className="max-w-6xl mx-auto">
          {/* Main Headline */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white leading-tight text-center">
            {t('investors.attention.title')}{' '}
            <span className="tone-highlight investors-human">{t('investors.attention.integrity')}</span>
          </h2>

          {/* Descriptive Paragraph */}
          <p className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-12 leading-relaxed text-center max-w-4xl mx-auto">
            {t('investors.attention.desc')}{' '}
            <span className="tone-highlight font-semibold investors-human">{t('investors.attention.value')}</span>{t('investors.attention.value2')}
          </p>

          {/* Statistical Boxes */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {/* Box 1: Global AI Market */}
            <div className="tone-card bg-opacity-10 backdrop-blur-sm rounded-2xl border p-6 sm:p-8 transition-all duration-300 hover:scale-105" style={{ backgroundColor: 'rgba(99, 102, 241, 0.1)', borderColor: 'rgba(99, 102, 241, 0.3)' }}>
              <div className="text-4xl sm:text-5xl md:text-6xl font-bold mb-2 tone-highlight">
                $300B+
              </div>
              <div className="text-white text-lg sm:text-xl font-semibold mb-1 ">
                {t('investors.attention.ai')}
              </div>
              <div className="text-gray-300 text-sm sm:text-base ">
                {t('investors.attention.ai.by')}
              </div>
            </div>

            {/* Box 2: CAGR Growth */}
            <div className="tone-card bg-opacity-10 backdrop-blur-sm rounded-2xl border p-6 sm:p-8 transition-all duration-300 hover:scale-105" style={{ backgroundColor: 'rgba(99, 102, 241, 0.1)', borderColor: 'rgba(99, 102, 241, 0.3)' }}>
              <div className="text-4xl sm:text-5xl md:text-6xl font-bold mb-2 tone-highlight">
                48%
              </div>
              <div className="text-white text-lg sm:text-xl font-semibold mb-1 ">
                {t('investors.attention.cagr')}
              </div>
              <div className="text-gray-300 text-sm sm:text-base ">
                {t('investors.attention.cagr.in')}
              </div>
            </div>

            {/* Box 3: Valuation Uplift */}
            <div className="tone-card bg-opacity-10 backdrop-blur-sm rounded-2xl border p-6 sm:p-8 transition-all duration-300 hover:scale-105" style={{ backgroundColor: 'rgba(99, 102, 241, 0.1)', borderColor: 'rgba(99, 102, 241, 0.3)' }}>
              <div className="text-4xl sm:text-5xl md:text-6xl font-bold mb-2 tone-highlight">
                5×
              </div>
              <div className="text-white text-lg sm:text-xl font-semibold mb-1 ">
                {t('investors.attention.valuation')}
              </div>
              <div className="text-gray-300 text-sm sm:text-base ">
                {t('investors.attention.valuation.early')}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trusted Voices Section */}
      <section className="relative z-10 container mx-auto px-4 sm:px-6 py-12 sm:py-16 md:py-24">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-white leading-tight investors-human">
              {t('investors.trusted.title')}
            </h2>
            <p className="text-lg sm:text-xl text-gray-300 leading-relaxed max-w-2xl mx-auto">
              {t('investors.trusted.desc')}
            </p>
          </div>

          {/* Testimonial Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {/* Sarah Chen */}
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-indigo-400/30 p-6 sm:p-8 hover:border-indigo-400/60 transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/10">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-red-500 text-red-500" />
                ))}
              </div>
              <p className="text-gray-200 text-sm sm:text-base mb-6 leading-relaxed italic investors-human">
                &quot;{t('investors.trusted.sarah.quote')}&quot;
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-400 to-purple-500 flex-shrink-0"></div>
                <div>
                  <div className="text-white font-semibold text-sm sm:text-base">{t('investors.trusted.sarah.name')}</div>
                  <div className="text-gray-400 text-xs sm:text-sm">{t('investors.trusted.sarah.role')}</div>
                  <div className="text-gray-500 text-xs">{t('investors.trusted.sarah.type')}</div>
                </div>
              </div>
            </div>

            {/* Michael Rodriguez */}
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-indigo-400/30 p-6 sm:p-8 hover:border-indigo-400/60 transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/10">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-red-500 text-red-500" />
                ))}
              </div>
              <p className="text-gray-200 text-sm sm:text-base mb-6 leading-relaxed italic investors-human">
                &quot;{t('investors.trusted.michael.quote')}&quot;
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-cyan-500 flex-shrink-0"></div>
                <div>
                  <div className="text-white font-semibold text-sm sm:text-base">{t('investors.trusted.michael.name')}</div>
                  <div className="text-gray-400 text-xs sm:text-sm">{t('investors.trusted.michael.role')}</div>
                  <div className="text-gray-500 text-xs">{t('investors.trusted.michael.type')}</div>
                </div>
              </div>
            </div>

            {/* Jennifer Park */}
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-indigo-400/30 p-6 sm:p-8 hover:border-indigo-400/60 transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/10">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-red-500 text-red-500" />
                ))}
              </div>
              <p className="text-gray-200 text-sm sm:text-base mb-6 leading-relaxed italic investors-human">
                &quot;{t('investors.trusted.jennifer.quote')}&quot;
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-400 to-pink-500 flex-shrink-0"></div>
                <div>
                  <div className="text-white font-semibold text-sm sm:text-base">{t('investors.trusted.jennifer.name')}</div>
                  <div className="text-gray-400 text-xs sm:text-sm">{t('investors.trusted.jennifer.role')}</div>
                  <div className="text-gray-500 text-xs">{t('investors.trusted.jennifer.type')}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* A Message From Our Founder Section */}
      <section className="relative z-10 container mx-auto px-4 sm:px-6 py-12 sm:py-16 md:py-24">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white leading-tight">
            {t('investors.founder.title')}{' '}
            <span className="tone-highlight investors-human">{t('investors.founder.our')}</span>
          </h2>
          <p className="text-lg sm:text-xl md:text-2xl text-gray-300 leading-relaxed">
            {t('investors.founder.desc')}
          </p>
        </div>
      </section>

      {/* Founder Message Content Section */}
      <section className="relative z-10 container mx-auto px-4 sm:px-6 py-12 sm:py-16 md:py-24">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 mb-8">
            {/* Large Placeholder - Left */}
            <div className="lg:col-span-2">
              <div className="w-full bg-slate-700/50 rounded-2xl border border-indigo-400/30 p-16 sm:p-20 md:p-24 flex items-center justify-center min-h-[400px] sm:min-h-[500px] md:min-h-[600px]">
                <div className="text-center text-gray-400 text-lg investors-human">
                  {t('investors.founder.content')}
                </div>
              </div>
            </div>

            {/* Bullet Points Box - Right */}
            <div className="lg:col-span-1">
              <div className="bg-slate-800/80 backdrop-blur-sm rounded-2xl border border-indigo-400/30 p-6 sm:p-8 h-full">
                <ul className="space-y-4 sm:space-y-6">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full mt-2 flex-shrink-0 tone-highlight" style={{ backgroundColor: 'var(--tone-primary)' }}></div>
                    <span className="text-gray-200 text-sm sm:text-base leading-relaxed investors-human">
                      {t('investors.founder.bullet1')}
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full mt-2 flex-shrink-0 tone-highlight" style={{ backgroundColor: 'var(--tone-primary)' }}></div>
                    <span className="text-gray-200 text-sm sm:text-base leading-relaxed investors-human">
                      {t('investors.founder.bullet2')}
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full mt-2 flex-shrink-0 tone-highlight" style={{ backgroundColor: 'var(--tone-primary)' }}></div>
                    <span className="text-gray-200 text-sm sm:text-base leading-relaxed investors-human">
                      {t('investors.founder.bullet3')}
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Join Hub Button - Centered */}
          <div className="text-center">
            <Button
              onClick={handleJoinHub}
              className="tone-button text-white text-lg px-8 py-6 rounded-xl font-bold transition-all duration-500 hover:scale-105"
            >
              {t('investors.founder.join')}
            </Button>
          </div>
        </div>
      </section>

      {/* The Team Behind the Transformation Section */}
      <section className="relative z-10 container mx-auto px-4 sm:px-6 py-12 sm:py-16 md:py-24">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-white leading-tight investors-human">
              {t('investors.team.behind')}{' '}
              <span className="tone-highlight">{t('investors.team.transformation')}</span>
            </h2>
          </div>

          {/* Carousel Container */}
          <div className="relative">
            {/* Team Card */}
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6 sm:p-8 md:p-12 hover:border-pink-400/30 transition-all duration-300 hover:shadow-xl min-h-[400px] flex flex-col items-center justify-center overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentMemberIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col items-center justify-center w-full"
                >
                  {(() => {
                    const member = teamMembers[currentMemberIndex];
                    
                    return (
                      <>
                        {/* Avatar Circle with Image */}
                        <div className="flex justify-center mb-6">
                          <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full overflow-hidden border-2 border-pink-500/30 shadow-lg relative bg-slate-800/50">
                            <img
                              src={getImageUrl(member.image)}
                              alt={member.name}
                              className="w-full h-full object-cover"
                              style={{ 
                                display: 'block',
                                margin: '0 auto',
                                objectPosition: member.name === 'Levi Ezagui' 
                                  ? 'center 10%' 
                                  : (member.name === 'Antonio Lovera' || member.name === 'David Shagalov' || member.name === 'Declan O\'Beirne')
                                  ? 'center 15%'
                                  : 'center center'
                              }}
                              loading={currentMemberIndex === 0 ? "eager" : "lazy"}
                              onError={(e) => {
                                console.error('Error loading image:', member.image);
                                // Intentar con la ruta original sin codificar
                                e.currentTarget.src = member.image;
                              }}
                            />
                          </div>
                        </div>

                        {/* Name */}
                        <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3 text-center ">
                          {member.name}
                        </h3>

                        {/* Title */}
                        <p className="text-pink-500 text-base sm:text-lg font-semibold mb-4 text-center ">
                          {member.role}
                        </p>

                        {/* Description */}
                        <p className="text-gray-300 text-base sm:text-lg leading-relaxed text-center  max-w-2xl">
                          {member.bio}
                        </p>
                      </>
                    );
                  })()}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Navigation Buttons */}
            <button
              onClick={prevMember}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 sm:-translate-x-8 md:-translate-x-12 bg-pink-500/80 hover:bg-pink-500 text-white rounded-full p-2 sm:p-3 transition-all duration-300 hover:scale-110 shadow-lg z-10"
              aria-label="Previous member"
            >
              <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
            <button
              onClick={nextMember}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 sm:translate-x-8 md:translate-x-12 bg-pink-500/80 hover:bg-pink-500 text-white rounded-full p-2 sm:p-3 transition-all duration-300 hover:scale-110 shadow-lg z-10"
              aria-label="Next member"
            >
              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>

            {/* Dots Indicator */}
            <div className="flex justify-center gap-2 mt-8">
              {teamMembers.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToMember(index)}
                  className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
                    index === currentMemberIndex
                      ? 'bg-pink-500 w-8 sm:w-10'
                      : 'bg-white/30 hover:bg-white/50'
                  }`}
                  aria-label={`Go to member ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Access the Investor Hub Form Section */}
      <section id="investor-form" className="relative z-10 container mx-auto px-4 sm:px-6 py-12 sm:py-16 md:py-24">
        <div className="max-w-2xl mx-auto">
          <div className="bg-slate-900/60 backdrop-blur-sm rounded-2xl border border-indigo-400/30 p-8 sm:p-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-white leading-tight text-center investors-human">
              {t('investors.hub.title')}
            </h2>
            <p className="text-lg sm:text-xl text-gray-300 mb-8 leading-relaxed text-center">
              {t('investors.hub.desc')}
            </p>
            
            <form 
              onSubmit={(e) => {
                e.preventDefault();
                handleInvestorRelations();
              }}
              className="space-y-6"
            >
              <div>
                <label htmlFor="full-name" className="block text-white font-medium mb-2 text-sm sm:text-base">
                  {t('investors.hub.fullname')}
                </label>
                <input
                  id="full-name"
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  placeholder={t('investors.hub.fullname.placeholder')}
                  className="w-full px-4 py-3 rounded-lg border border-indigo-400/30 bg-slate-800/50 text-white placeholder-gray-400 focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/20 transition-all  text-sm sm:text-base"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="role-organization" className="block text-white font-medium mb-2 text-sm sm:text-base">
                  {t('investors.hub.role')}
                </label>
                <input
                  id="role-organization"
                  type="text"
                  value={formData.roleOrganization}
                  onChange={(e) => setFormData({ ...formData, roleOrganization: e.target.value })}
                  placeholder={t('investors.hub.role.placeholder')}
                  className="w-full px-4 py-3 rounded-lg border border-indigo-400/30 bg-slate-800/50 text-white placeholder-gray-400 focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/20 transition-all  text-sm sm:text-base"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="investment-focus" className="block text-white font-medium mb-2 text-sm sm:text-base">
                  {t('investors.hub.focus')}
                </label>
                <input
                  id="investment-focus"
                  type="text"
                  value={formData.investmentFocus}
                  onChange={(e) => setFormData({ ...formData, investmentFocus: e.target.value })}
                  placeholder={t('investors.hub.focus.placeholder')}
                  className="w-full px-4 py-3 rounded-lg border border-indigo-400/30 bg-slate-800/50 text-white placeholder-gray-400 focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/20 transition-all  text-sm sm:text-base"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="amount-interested" className="block text-white font-medium mb-2 text-sm sm:text-base">
                  {t('investors.hub.amount')}
                </label>
                <input
                  id="amount-interested"
                  type="text"
                  value={formData.amountInterested}
                  onChange={(e) => setFormData({ ...formData, amountInterested: e.target.value })}
                  placeholder={t('investors.hub.amount.placeholder')}
                  className="w-full px-4 py-3 rounded-lg border border-indigo-400/30 bg-slate-800/50 text-white placeholder-gray-400 focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/20 transition-all  text-sm sm:text-base"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-white font-medium mb-2 text-sm sm:text-base">
                  {t('investors.hub.email')}
                </label>
                <input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder={t('investors.hub.email.placeholder')}
                  className="w-full px-4 py-3 rounded-lg border border-indigo-400/30 bg-slate-800/50 text-white placeholder-gray-400 focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/20 transition-all  text-sm sm:text-base"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="comments" className="block text-white font-medium mb-2 text-sm sm:text-base">
                  {t('investors.hub.comments')}
                </label>
                <textarea
                  id="comments"
                  value={formData.comments}
                  onChange={(e) => setFormData({ ...formData, comments: e.target.value })}
                  placeholder={t('investors.hub.comments.placeholder')}
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg border border-indigo-400/30 bg-slate-800/50 text-white placeholder-gray-400 focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/20 transition-all  text-sm sm:text-base resize-none"
                />
              </div>
              
              <button
                type="submit"
                className="w-full bg-pink-500 hover:bg-pink-600 text-white font-bold py-4 px-6 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-pink-500/30 text-base sm:text-lg "
              >
                {t('investors.hub.submit')}
              </button>
            </form>
          </div>
        </div>
      </section>

      <style jsx>{`
        @keyframes gridMove {
          0% {
            transform: translate(0, 0);
          }
          100% {
            transform: translate(50px, 50px);
          }
        }
        @keyframes flow-line {
          0% {
            stroke-dashoffset: 0;
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
          100% {
            stroke-dashoffset: -1600;
            opacity: 0;
          }
        }
        .animate-flow-line {
          stroke-dasharray: 800;
          animation: flow-line 8s linear infinite;
        }
        @keyframes progress {
          0% {
            width: 0%;
          }
          100% {
            width: 85%;
          }
        }
        .animate-progress {
          animation: progress 2s ease-out;
        }
      `}</style>
      <Footer />
    </div>
  );
}
