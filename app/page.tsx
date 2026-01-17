'use client';

import { useEffect, useMemo, memo, useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import { Users, DollarSign, Handshake, Camera } from 'lucide-react';
import Image from 'next/image';
import { useLanguage } from '../contexts/language-context';

// Pre-load critical components to avoid blank screen - use eager loading
const VideoYoutube = dynamic(() => import('../components/video-youtube'), { 
  ssr: false,
  loading: () => (
    <div 
      className="absolute top-0 left-0 w-full h-full rounded-2xl bg-black/20 backdrop-blur-sm border-2 border-white/20 flex items-center justify-center"
      style={{ minHeight: '100%' }}
    >
      <div className="text-white/50 text-sm">Loading...</div>
    </div>
  ),
});

const Countdown = dynamic(() => import('../components/countdown'), { 
  ssr: false,
  loading: () => (
    <div className="mt-10 sm:mt-12 md:mt-14 h-32 bg-pink-500/10 backdrop-blur-sm rounded-2xl border border-pink-400 flex items-center justify-center">
      <div className="text-white/50 text-sm">Loading countdown...</div>
    </div>
  ),
});

// Color classes constant - moved outside component to avoid recreation
const colorClasses = {
  emerald: {
    // Glassmorphism colors - Emerald (Verde)
    glassBg: 'rgba(16, 185, 129, 0.08)',
    glassBgHover: 'rgba(16, 185, 129, 0.15)',
    borderGradient: 'linear-gradient(135deg, rgba(16, 185, 129, 0.4) 0%, rgba(5, 150, 105, 0.2) 50%, rgba(16, 185, 129, 0.1) 100%)',
    borderGradientHover: 'linear-gradient(135deg, rgba(16, 185, 129, 0.6) 0%, rgba(5, 150, 105, 0.4) 50%, rgba(16, 185, 129, 0.3) 100%)',
    glowColor: 'rgba(16, 185, 129, 0.5)',
    glowColorHover: 'rgba(16, 185, 129, 0.8)',
    icon: 'text-emerald-400',
    iconHover: 'text-emerald-300',
    iconGlow: 'drop-shadow(0 0 8px rgba(16, 185, 129, 0.6))',
    iconGlowHover: 'drop-shadow(0 0 16px rgba(16, 185, 129, 0.9))',
  },
  indigo: {
    // Glassmorphism colors - Indigo (Azul)
    glassBg: 'rgba(99, 102, 241, 0.08)',
    glassBgHover: 'rgba(99, 102, 241, 0.15)',
    borderGradient: 'linear-gradient(135deg, rgba(99, 102, 241, 0.4) 0%, rgba(67, 56, 202, 0.2) 50%, rgba(99, 102, 241, 0.1) 100%)',
    borderGradientHover: 'linear-gradient(135deg, rgba(99, 102, 241, 0.6) 0%, rgba(67, 56, 202, 0.4) 50%, rgba(99, 102, 241, 0.3) 100%)',
    glowColor: 'rgba(99, 102, 241, 0.5)',
    glowColorHover: 'rgba(99, 102, 241, 0.8)',
    icon: 'text-indigo-400',
    iconHover: 'text-indigo-300',
    iconGlow: 'drop-shadow(0 0 8px rgba(99, 102, 241, 0.6))',
    iconGlowHover: 'drop-shadow(0 0 16px rgba(99, 102, 241, 0.9))',
  },
  amber: {
    // Glassmorphism colors - Amber (Naranja)
    glassBg: 'rgba(245, 158, 11, 0.08)',
    glassBgHover: 'rgba(245, 158, 11, 0.15)',
    borderGradient: 'linear-gradient(135deg, rgba(245, 158, 11, 0.4) 0%, rgba(217, 119, 6, 0.2) 50%, rgba(245, 158, 11, 0.1) 100%)',
    borderGradientHover: 'linear-gradient(135deg, rgba(245, 158, 11, 0.6) 0%, rgba(217, 119, 6, 0.4) 50%, rgba(245, 158, 11, 0.3) 100%)',
    glowColor: 'rgba(245, 158, 11, 0.5)',
    glowColorHover: 'rgba(245, 158, 11, 0.8)',
    icon: 'text-amber-400',
    iconHover: 'text-amber-300',
    iconGlow: 'drop-shadow(0 0 8px rgba(245, 158, 11, 0.6))',
    iconGlowHover: 'drop-shadow(0 0 16px rgba(245, 158, 11, 0.9))',
  },
  pink: {
    // Glassmorphism colors - Pink (Fucsia)
    glassBg: 'rgba(244, 114, 182, 0.08)',
    glassBgHover: 'rgba(244, 114, 182, 0.15)',
    borderGradient: 'linear-gradient(135deg, rgba(244, 114, 182, 0.4) 0%, rgba(219, 39, 119, 0.2) 50%, rgba(244, 114, 182, 0.1) 100%)',
    borderGradientHover: 'linear-gradient(135deg, rgba(244, 114, 182, 0.6) 0%, rgba(219, 39, 119, 0.4) 50%, rgba(244, 114, 182, 0.3) 100%)',
    glowColor: 'rgba(244, 114, 182, 0.5)',
    glowColorHover: 'rgba(244, 114, 182, 0.8)',
    icon: 'text-pink-400',
    iconHover: 'text-pink-300',
    iconGlow: 'drop-shadow(0 0 8px rgba(244, 114, 182, 0.6))',
    iconGlowHover: 'drop-shadow(0 0 16px rgba(244, 114, 182, 0.9))',
  },
  purple: {
    // Glassmorphism colors - Purple (Morado)
    glassBg: 'rgba(139, 92, 246, 0.08)',
    glassBgHover: 'rgba(139, 92, 246, 0.15)',
    borderGradient: 'linear-gradient(135deg, rgba(139, 92, 246, 0.4) 0%, rgba(99, 102, 241, 0.2) 50%, rgba(139, 92, 246, 0.1) 100%)',
    borderGradientHover: 'linear-gradient(135deg, rgba(139, 92, 246, 0.6) 0%, rgba(99, 102, 241, 0.4) 50%, rgba(139, 92, 246, 0.3) 100%)',
    glowColor: 'rgba(139, 92, 246, 0.5)',
    glowColorHover: 'rgba(139, 92, 246, 0.8)',
    icon: 'text-purple-400',
    iconHover: 'text-purple-300',
    iconGlow: 'drop-shadow(0 0 8px rgba(139, 92, 246, 0.6))',
    iconGlowHover: 'drop-shadow(0 0 16px rgba(139, 92, 246, 0.9))',
  },
};

// Memoized card component to prevent unnecessary re-renders
type CardType = {
  id: string;
  title: string;
  description: string;
  route: string;
  color: keyof typeof colorClasses;
  icon: React.ComponentType<{ className?: string }>;
};

const AudienceCard = memo(({ card, index, onNavigate, colors }: { card: CardType, index: number, onNavigate: (route: string) => void, colors: typeof colorClasses[keyof typeof colorClasses] }) => {
  const Icon = card.icon;
  const handleClick = useCallback(() => {
    onNavigate(card.route);
  }, [card.route, onNavigate]);
  
  return (
    <div
      className="group relative p-6 sm:p-8 rounded-2xl cursor-pointer overflow-hidden animate-fade-in-up"
      style={{ 
        animationDelay: `${index * 100 + 600}ms`,
        transform: 'translateZ(0)',
        backfaceVisibility: 'hidden',
        contain: 'layout style paint',
        // Glassmorphism base
        background: colors.glassBg,
        backdropFilter: 'blur(20px) saturate(180%)',
        WebkitBackdropFilter: 'blur(20px) saturate(180%)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        boxShadow: `0 8px 32px 0 rgba(0, 0, 0, 0.37), 0 0 0 1px rgba(255, 255, 255, 0.05) inset`,
        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = colors.glassBgHover;
        e.currentTarget.style.transform = 'translateY(-4px) scale(1.02)';
        e.currentTarget.style.boxShadow = `0 12px 40px 0 rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.1) inset, 0 0 40px ${colors.glowColor}`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = colors.glassBg;
        e.currentTarget.style.transform = 'translateY(0) scale(1)';
        e.currentTarget.style.boxShadow = `0 8px 32px 0 rgba(0, 0, 0, 0.37), 0 0 0 1px rgba(255, 255, 255, 0.05) inset`;
      }}
      onClick={handleClick}
    >
      {/* Gradient border with glow effect */}
      <div 
        className="absolute -inset-[1px] rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none"
        style={{ 
          background: colors.borderGradientHover,
          filter: `blur(8px)`,
          transition: 'opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
          zIndex: -1,
        }}
      />
      
      {/* Subtle border gradient */}
      <div 
        className="absolute -inset-[1px] rounded-2xl opacity-30 group-hover:opacity-60 transition-opacity duration-400 pointer-events-none"
        style={{ 
          background: colors.borderGradient,
          zIndex: -1,
        }}
      />

      {/* Inner glow on hover */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-400 pointer-events-none"
        style={{ 
          background: `radial-gradient(circle at center, ${colors.glowColor} 0%, transparent 70%)`,
          transition: 'opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      />

      {/* Shimmer effect on hover */}
      <div
        className="absolute -inset-10 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
        style={{ 
          transform: 'translateZ(0)',
          backfaceVisibility: 'hidden',
          transition: 'opacity 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      />

      {/* Content */}
      <div className="relative z-10">
        {/* Icon with glow effect */}
        <div 
          className="relative inline-block mb-3 sm:mb-4 group/icon" 
          style={{ 
            transform: 'translateZ(0)', 
            backfaceVisibility: 'hidden',
            filter: colors.iconGlow,
            transition: 'filter 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
          }}
          onMouseEnter={(e: React.MouseEvent<HTMLDivElement>) => {
            e.currentTarget.style.filter = colors.iconGlowHover;
          }}
          onMouseLeave={(e: React.MouseEvent<HTMLDivElement>) => {
            e.currentTarget.style.filter = colors.iconGlow;
          }}
        >
          <Icon
            className={`w-10 h-10 sm:w-12 sm:h-12 ${colors.icon} mx-auto transition-all duration-400 group-hover:${colors.iconHover} group-hover:scale-110 group-hover:rotate-3`}
          />
        </div>
        
        {/* Title */}
        <h3 className="font-bold text-white text-base sm:text-lg mb-2 transition-all duration-300 group-hover:text-white group-hover:tracking-wide uppercase tracking-wider font-sans">
          {card.title}
        </h3>
        
        {/* Description */}
        <p className="text-xs sm:text-sm text-white/80 transition-all duration-300 group-hover:text-white/95 font-sans leading-relaxed">
          {card.description}
        </p>
      </div>

      {/* Corner accent dots */}
      <div className="absolute top-3 right-3 w-1.5 h-1.5 rounded-full opacity-40 group-hover:opacity-80 transition-opacity duration-400"
        style={{ background: colors.glowColor, boxShadow: `0 0 8px ${colors.glowColor}` }}
      />
      <div className="absolute bottom-3 left-3 w-1.5 h-1.5 rounded-full opacity-40 group-hover:opacity-80 transition-opacity duration-400"
        style={{ background: colors.glowColor, boxShadow: `0 0 8px ${colors.glowColor}` }}
      />
    </div>
  );
});

AudienceCard.displayName = 'AudienceCard';

export default function HomePage() {
  const router = useRouter();
  const { t } = useLanguage();
  const hasSetTitle = useRef(false);

  useEffect(() => {
    if (!hasSetTitle.current) {
      document.title = 'Zentrais';
      hasSetTitle.current = true;
    }
  }, []);

  // Memoized navigation handler
  const handleNavigate = useCallback((route: string) => {
    router.push(route);
  }, [router]);

  // Memoize audienceCards to avoid recreation on every render
  const audienceCards = useMemo<CardType[]>(() => [
    {
      id: 'user',
      title: t('home.card.user.title'),
      description: t('home.card.user.desc'),
      route: '/user',
      color: 'emerald',
      icon: Users,
    },
    {
      id: 'investor',
      title: t('home.card.investor.title'),
      description: t('home.card.investor.desc'),
      route: '/investors',
      color: 'indigo',
      icon: DollarSign,
    },
    {
      id: 'collaborator',
      title: t('home.card.collaborator.title'),
      description: t('home.card.collaborator.desc'),
      route: '/collaborator',
      color: 'amber',
      icon: Handshake,
    },
    {
      id: 'media',
      title: t('home.card.media.title'),
      description: t('home.card.media.desc'),
      route: '/media',
      color: 'pink',
      icon: Camera,
    },
  ], [t]);

  // Calculate tomorrow at 2:00 AM in local timezone
  const tomorrowAt2AM = useMemo(() => {
    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(now.getDate() + 1);
    tomorrow.setHours(2, 0, 0, 0);
    
    // Format as ISO string with timezone offset
    const offset = -tomorrow.getTimezoneOffset();
    const offsetHours = Math.floor(Math.abs(offset) / 60);
    const offsetMinutes = Math.abs(offset) % 60;
    const offsetSign = offset >= 0 ? '+' : '-';
    const offsetString = `${offsetSign}${String(offsetHours).padStart(2, '0')}:${String(offsetMinutes).padStart(2, '0')}`;
    
    const year = tomorrow.getFullYear();
    const month = String(tomorrow.getMonth() + 1).padStart(2, '0');
    const day = String(tomorrow.getDate()).padStart(2, '0');
    
    return `${year}-${month}-${day}T02:00:00${offsetString}`;
  }, []);

  // Render content immediately, even before components are fully loaded
  return (
    <div className="min-h-screen relative" style={{ transform: 'translateZ(0)', contain: 'layout style paint', willChange: 'auto', minHeight: '100vh' }}>
      {/* Content - Render immediately */}
      <div className="relative z-10" style={{ contain: 'layout style', visibility: 'visible' }}>
      {/* HEADLINE SECTION */}
      <div className="container mx-auto px-4 sm:px-6 pt-6 sm:pt-8 md:pt-10 text-center relative" style={{ contain: 'layout style', opacity: 1 }}>
        
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 sm:mb-6 tracking-tight drop-shadow-2xl font-sans animate-fade-in-up relative group" style={{ contain: 'layout style', opacity: 1 }}>
          <span className="inline-block bg-gradient-to-r from-white via-cyan-300 via-purple-300 to-pink-300 bg-clip-text text-transparent bg-[length:200%_auto] relative">
            {t('home.headline')}
            {/* Subtle glow behind text - reduced blur */}
            <span className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 via-purple-400/20 to-pink-400/20 blur-lg opacity-0 group-hover:opacity-100 transition-opacity -z-10" style={{ transitionDuration: '300ms', willChange: 'opacity' }}></span>
          </span>
        </h1>
        <h2 
          className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold mb-3 sm:mb-4 text-white/90 tracking-wide drop-shadow-lg font-sans animate-fade-in-up animation-delay-200 group/subheadline"
          style={{ transform: 'translateZ(0)', backfaceVisibility: 'hidden', contain: 'layout style' }}
        >
          <span 
            className="inline-block bg-gradient-to-r from-cyan-200 via-white to-purple-200 bg-clip-text text-transparent transition-transform group-hover/subheadline:scale-105"
            style={{ transitionDuration: '200ms', willChange: 'transform' }}
          >
            {t('home.subheadline')}
          </span>
        </h2>
        <p 
          className="text-base sm:text-lg md:text-xl text-white/80 max-w-3xl mx-auto mb-8 sm:mb-10 drop-shadow font-sans animate-fade-in-up animation-delay-400 relative group/desc"
          style={{ transform: 'translateZ(0)', backfaceVisibility: 'hidden', contain: 'layout style' }}
        >
          <span className="relative inline-block transition-opacity group-hover/desc:text-white/95" style={{ transitionDuration: '200ms', willChange: 'opacity' }}>
            {t('home.description')}
            {/* Subtle shimmer effect on hover - optimized */}
            <span 
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 animate-shimmer opacity-0 group-hover/desc:opacity-100 transition-opacity pointer-events-none"
              style={{ transform: 'translateZ(0)', backfaceVisibility: 'hidden', transitionDuration: '300ms', willChange: 'transform, opacity' }}
            ></span>
          </span>
        </p>
      </div>

      {/* SECCIÓN PRINCIPAL */}
      <div 
        className="flex items-center justify-center"
        style={{ contain: 'layout style' }}
      >
        <div 
          className="container mx-auto pt-8 sm:pt-12 md:pt-16 pb-8 sm:pb-12 md:pb-16 px-4 sm:px-6"
          style={{ contain: 'layout style' }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8 text-center" style={{ contain: 'layout style' }}>
            {audienceCards.map((card, index) => {
              const colors = colorClasses[card.color as keyof typeof colorClasses];
              return (
                <AudienceCard
                  key={card.id}
                  card={card}
                  index={index}
                  onNavigate={handleNavigate}
                  colors={colors}
                />
              );
            })}
          </div>

          <Countdown
            className="mt-10 sm:mt-12 md:mt-14 animate-fade-in-up animation-delay-750"
            // Tomorrow at 2:00 AM
            targetISO={tomorrowAt2AM}
          />

          {/* YouTube Video Embed */}
          <div className="mt-12 sm:mt-16 md:mt-20 flex justify-center animate-fade-in-up animation-delay-800" style={{ contain: 'layout style' }}>
            <div className="w-full max-w-6xl px-4 sm:px-6">
              <div className="relative w-full group" style={{ paddingBottom: '56.25%', contain: 'layout style' }}>
                {/* Glow effect behind video */}
                <div className="absolute -inset-2 bg-gradient-to-r from-cyan-500/30 via-purple-500/30 to-pink-500/30 rounded-2xl blur-xl opacity-60 group-hover:opacity-100 transition-opacity duration-300" style={{ willChange: 'opacity' }}></div>
                
                {/* Border gradient */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 rounded-2xl opacity-80 group-hover:opacity-100 transition-opacity duration-300" style={{ willChange: 'opacity' }}></div>
                
                {/* Inner shadow container */}
                <div className="absolute inset-0.5 bg-black/20 backdrop-blur-sm rounded-2xl" style={{ contain: 'layout style paint' }}></div>
                
                {/* Video iframe */}
                <VideoYoutube
                  videoId="9MuAki_Cx9w"
                  controls={1}
                  className="absolute top-0 left-0 w-full h-full rounded-2xl border-2 border-white/20 shadow-2xl group-hover:border-white/40 transition-all duration-300"
                />
                
                {/* Shimmer effect on hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 opacity-0 group-hover:opacity-100 group-hover:animate-shimmer transition-opacity duration-500 rounded-2xl pointer-events-none" style={{ willChange: 'transform, opacity' }}></div>
              </div>
            </div>
          </div>

          {/* Zentrais Explained Section - Podcast Link */}
          <div className="mt-12 sm:mt-16 md:mt-20 flex justify-center animate-fade-in-up animation-delay-900" style={{ contain: 'layout style' }}>
            <div className="w-full max-w-4xl px-4 sm:px-6">
              {(() => {
                const colors = colorClasses.purple;
                return (
                  <div
                    className="group relative p-6 sm:p-8 rounded-2xl cursor-pointer overflow-hidden animate-fade-in-up text-center"
                    style={{ 
                      animationDelay: '900ms',
                      transform: 'translateZ(0)',
                      backfaceVisibility: 'hidden',
                      contain: 'layout style paint',
                      // Glassmorphism base
                      background: colors.glassBg,
                      backdropFilter: 'blur(20px) saturate(180%)',
                      WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      boxShadow: `0 8px 32px 0 rgba(0, 0, 0, 0.37), 0 0 0 1px rgba(255, 255, 255, 0.05) inset`,
                      transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = colors.glassBgHover;
                      e.currentTarget.style.transform = 'translateY(-4px) scale(1.02)';
                      e.currentTarget.style.boxShadow = `0 12px 40px 0 rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.1) inset, 0 0 40px ${colors.glowColor}`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = colors.glassBg;
                      e.currentTarget.style.transform = 'translateY(0) scale(1)';
                      e.currentTarget.style.boxShadow = `0 8px 32px 0 rgba(0, 0, 0, 0.37), 0 0 0 1px rgba(255, 255, 255, 0.05) inset`;
                    }}
                    onClick={() => handleNavigate('/podcast')}
                  >
                    {/* Gradient border with glow effect */}
                    <div 
                      className="absolute -inset-[1px] rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none"
                      style={{ 
                        background: colors.borderGradientHover,
                        filter: `blur(8px)`,
                        transition: 'opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                        zIndex: -1,
                      }}
                    />
                    
                    {/* Subtle border gradient */}
                    <div 
                      className="absolute -inset-[1px] rounded-2xl opacity-30 group-hover:opacity-60 transition-opacity duration-400 pointer-events-none"
                      style={{ 
                        background: colors.borderGradient,
                        zIndex: -1,
                      }}
                    />

                    {/* Inner glow on hover */}
                    <div
                      className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-400 pointer-events-none"
                      style={{ 
                        background: `radial-gradient(circle at center, ${colors.glowColor} 0%, transparent 70%)`,
                        transition: 'opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                      }}
                    />

                    {/* Shimmer effect on hover */}
                    <div
                      className="absolute -inset-10 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                      style={{ 
                        transform: 'translateZ(0)',
                        backfaceVisibility: 'hidden',
                        transition: 'opacity 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                      }}
                    />

                    {/* Content */}
                    <div className="relative z-10">
                      {/* Icon with glow effect */}
                      <div 
                        className="relative inline-block mb-3 sm:mb-4 group/icon" 
                        style={{ 
                          transform: 'translateZ(0)', 
                          backfaceVisibility: 'hidden',
                          filter: colors.iconGlow,
                          transition: 'filter 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                        }}
                        onMouseEnter={(e: React.MouseEvent<HTMLDivElement>) => {
                          e.currentTarget.style.filter = colors.iconGlowHover;
                        }}
                        onMouseLeave={(e: React.MouseEvent<HTMLDivElement>) => {
                          e.currentTarget.style.filter = colors.iconGlow;
                        }}
                      >
                        <Image
                          src="/Zentrais Flaticon 150x150-03.png"
                          alt="Zentrais Explained!"
                          width={48}
                          height={48}
                          className="w-10 h-10 sm:w-12 sm:h-12 mx-auto transition-all duration-400 group-hover:scale-110 group-hover:rotate-3"
                        />
                      </div>
                      
                      {/* Title */}
                      <h3 className="font-bold text-white text-base sm:text-lg mb-2 transition-all duration-300 group-hover:text-white group-hover:tracking-wide uppercase tracking-wider font-sans">
                        {t('home.podcast.title')}
                      </h3>
                      
                      {/* Description */}
                      <p className="text-xs sm:text-sm text-white/80 transition-all duration-300 group-hover:text-white/95 font-sans leading-relaxed">
                        {t('home.podcast.desc')}
                      </p>
                    </div>

                    {/* Corner accent dots */}
                    <div className="absolute top-3 right-3 w-1.5 h-1.5 rounded-full opacity-40 group-hover:opacity-80 transition-opacity duration-400"
                      style={{ background: colors.glowColor, boxShadow: `0 0 8px ${colors.glowColor}` }}
                    />
                    <div className="absolute bottom-3 left-3 w-1.5 h-1.5 rounded-full opacity-40 group-hover:opacity-80 transition-opacity duration-400"
                      style={{ background: colors.glowColor, boxShadow: `0 0 8px ${colors.glowColor}` }}
                    />
                  </div>
                );
              })()}
            </div>
          </div>

          {/* MICRO-PROOF BAR - optimized */}
          <div 
            className="mt-12 sm:mt-16 md:mt-20 pt-8 sm:pt-10 border-t border-white/20 animate-fade-in-up animation-delay-1000"
            style={{ transform: 'translateZ(0)', backfaceVisibility: 'hidden', contain: 'layout style' }}
          >
            <div className="flex flex-col items-center justify-center gap-4 sm:gap-6 text-center text-white/70 text-sm sm:text-base">
              <div className="flex items-center gap-2 group/proof hover:text-white transition-opacity" style={{ transitionDuration: '200ms' }}>
                <span 
                  className="inline-block w-2 h-2 bg-cyan-400 rounded-full opacity-80 group-hover/proof:opacity-100 transition-opacity flex-shrink-0"
                  style={{ transform: 'translateZ(0)', backfaceVisibility: 'hidden', transitionDuration: '200ms' }}
                ></span>
                <span className="font-semibold text-white/90 group-hover/proof:scale-105 transition-transform whitespace-nowrap" style={{ transform: 'translateZ(0)', transitionDuration: '200ms' }}>{t('home.proof.builders')}</span>
              </div>
              <div className="flex items-center gap-2 group/proof hover:text-white transition-opacity" style={{ transitionDuration: '200ms' }}>
                <span 
                  className="inline-block w-2 h-2 bg-purple-400 rounded-full opacity-80 group-hover/proof:opacity-100 transition-opacity flex-shrink-0"
                  style={{ transform: 'translateZ(0)', backfaceVisibility: 'hidden', transitionDuration: '200ms' }}
                ></span>
                <span className="font-semibold text-white/90 group-hover/proof:scale-105 transition-transform whitespace-nowrap" style={{ transform: 'translateZ(0)', transitionDuration: '200ms' }}>{t('home.proof.founders')}</span>
              </div>
              <div className="flex items-center gap-2 group/proof hover:text-white transition-opacity" style={{ transitionDuration: '200ms' }}>
                <span 
                  className="inline-block w-2 h-2 bg-pink-400 rounded-full opacity-80 group-hover/proof:opacity-100 transition-opacity flex-shrink-0"
                  style={{ transform: 'translateZ(0)', backfaceVisibility: 'hidden', transitionDuration: '200ms' }}
                ></span>
                <span className="font-semibold text-white/90 group-hover/proof:scale-105 transition-transform whitespace-nowrap" style={{ transform: 'translateZ(0)', transitionDuration: '200ms' }}>{t('home.proof.beta')}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}
