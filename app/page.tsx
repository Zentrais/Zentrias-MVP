'use client';

import { useRouter } from 'next/navigation';
import { Users, DollarSign, Handshake, Camera } from 'lucide-react';
import { useLanguage } from '../contexts/language-context';

export default function HomePage() {
  const router = useRouter();
  const { t } = useLanguage();

  const audienceCards = [
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
  ];

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-fixed"
      style={{ backgroundImage: `url('/fondo-new.jpg')` }}
    >
      {/* HEADLINE SECTION */}
      <div className="container mx-auto px-4 sm:px-6 pt-32 sm:pt-36 md:pt-40 lg:pt-44 text-center relative">
        {/* Animated background gradient */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-cyan-500/10 via-purple-500/10 to-pink-500/10 animate-gradient-shift blur-3xl"></div>
        
        {/* Floating orbs for extra life */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-cyan-400/20 rounded-full blur-2xl animate-float opacity-60"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-purple-400/20 rounded-full blur-2xl animate-float animation-delay-300 opacity-60"></div>
        
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 sm:mb-6 tracking-tight drop-shadow-2xl font-sans animate-fade-in-up relative group">
          <span className="inline-block bg-gradient-to-r from-white via-cyan-300 via-purple-300 to-pink-300 bg-clip-text text-transparent animate-gradient-text bg-[length:200%_auto] relative">
            {t('home.headline')}
            {/* Subtle glow behind text */}
            <span className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 via-purple-400/20 to-pink-400/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"></span>
          </span>
        </h1>
        <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold mb-3 sm:mb-4 text-white/90 tracking-wide drop-shadow-lg font-sans animate-fade-in-up animation-delay-200 group/subheadline">
          <span className="inline-block bg-gradient-to-r from-cyan-200 via-white to-purple-200 bg-clip-text text-transparent transition-all duration-300 group-hover/subheadline:scale-105 group-hover/subheadline:drop-shadow-[0_0_15px_rgba(139,92,246,0.5)]">
            {t('home.subheadline')}
          </span>
        </h2>
        <p className="text-base sm:text-lg md:text-xl text-white/80 max-w-3xl mx-auto mb-8 sm:mb-10 drop-shadow font-sans animate-fade-in-up animation-delay-400 relative group/desc">
          <span className="relative inline-block transition-all duration-300 group-hover/desc:text-white/95">
            {t('home.description')}
            {/* Subtle shimmer effect on hover */}
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 animate-shimmer opacity-0 group-hover/desc:opacity-100 transition-opacity duration-700 pointer-events-none"></span>
          </span>
        </p>
      </div>

      {/* SECCIÓN PRINCIPAL */}
      <div className="flex items-center justify-center">
        <div className="container mx-auto pt-8 sm:pt-12 md:pt-16 pb-8 sm:pb-12 md:pb-16 px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8 text-center">
            {audienceCards.map((card, index) => {
              const Icon = card.icon;
              const colorClasses = {
                emerald: {
                  border: 'border-emerald-400/30',
                  borderHover: 'group-hover:border-emerald-400/60',
                  shadow: 'shadow-emerald-500/20',
                  shadowHover: 'group-hover:shadow-emerald-500/40',
                  icon: 'text-emerald-400',
                  iconHover: 'group-hover:text-emerald-300',
                  glow: 'from-emerald-400/20 via-emerald-500/10 to-transparent',
                  particle: 'bg-emerald-400',
                },
                indigo: {
                  border: 'border-indigo-400/30',
                  borderHover: 'group-hover:border-indigo-400/60',
                  shadow: 'shadow-indigo-500/20',
                  shadowHover: 'group-hover:shadow-indigo-500/40',
                  icon: 'text-indigo-400',
                  iconHover: 'group-hover:text-indigo-300',
                  glow: 'from-indigo-400/20 via-indigo-500/10 to-transparent',
                  particle: 'bg-indigo-400',
                },
                amber: {
                  border: 'border-amber-400/30',
                  borderHover: 'group-hover:border-amber-400/60',
                  shadow: 'shadow-amber-500/20',
                  shadowHover: 'group-hover:shadow-amber-500/40',
                  icon: 'text-amber-400',
                  iconHover: 'group-hover:text-amber-300',
                  glow: 'from-amber-400/20 via-amber-500/10 to-transparent',
                  particle: 'bg-amber-400',
                },
                pink: {
                  border: 'border-pink-400/30',
                  borderHover: 'group-hover:border-pink-400/60',
                  shadow: 'shadow-pink-500/20',
                  shadowHover: 'group-hover:shadow-pink-500/40',
                  icon: 'text-pink-400',
                  iconHover: 'group-hover:text-pink-300',
                  glow: 'from-pink-400/20 via-pink-500/10 to-transparent',
                  particle: 'bg-pink-400',
                },
              };

              const colors = colorClasses[card.color as keyof typeof colorClasses];

              return (
                <div
                  key={card.id}
                  className={`group relative p-6 sm:p-8 bg-white/10 backdrop-blur-sm rounded-xl shadow-lg ${colors.border} ${colors.borderHover} cursor-pointer overflow-hidden transition-all duration-500 hover:bg-white/20 hover:backdrop-blur-md hover:shadow-2xl ${colors.shadow} ${colors.shadowHover} hover:scale-110 hover:-translate-y-2 animate-fade-in-up active:scale-105`}
                  style={{ animationDelay: `${index * 100 + 600}ms` }}
                  onClick={() => router.push(card.route)}
                >
                  {/* Animated border glow */}
                  <div className={`absolute -inset-0.5 bg-gradient-to-r ${colors.glow} rounded-xl opacity-0 group-hover:opacity-100 blur transition-opacity duration-700`}></div>
                  
                  {/* Animación de luz flotante */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${colors.glow} opacity-0 group-hover:opacity-100 transition-opacity duration-700 animate-pulse`}
                  ></div>
                  
                  {/* Brillo animado que se mueve */}
                  <div
                    className="absolute -inset-10 bg-gradient-to-r from-transparent via-white/30 to-transparent transform -skew-x-12 animate-shimmer opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                  ></div>

                  {/* Floating particles effect */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
                    <div className={`absolute top-4 left-4 w-2 h-2 ${colors.particle} rounded-full animate-float opacity-60`} style={{ animationDelay: '0s' }}></div>
                    <div className={`absolute bottom-4 right-4 w-2 h-2 ${colors.particle} rounded-full animate-float opacity-60`} style={{ animationDelay: '0.5s' }}></div>
                    <div className={`absolute top-1/2 right-4 w-1.5 h-1.5 ${colors.particle} rounded-full animate-float opacity-60`} style={{ animationDelay: '1s' }}></div>
                  </div>

                  {/* Gradiente de fondo */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/0 via-white/0 to-white/0 group-hover:from-white/10 group-hover:via-white/5 group-hover:to-transparent transition-all duration-500"></div>
                  
                  <div className="relative z-10">
                    <div className="relative inline-block">
                      <Icon
                        className={`w-10 h-10 sm:w-12 sm:h-12 ${colors.icon} ${colors.iconHover} mx-auto mb-3 sm:mb-4 transition-all duration-500 group-hover:scale-125 group-hover:rotate-6 drop-shadow-lg`}
                      />
                      <div className={`absolute -top-1 -right-1 w-3 h-3 ${colors.particle} rounded-full opacity-0 group-hover:opacity-100 animate-ping transition-opacity duration-500`}></div>
                    </div>
                    <h3 className="font-bold text-white text-base sm:text-lg mb-2 transition-all duration-500 group-hover:text-white uppercase tracking-wider font-sans group-hover:scale-105">
                      {card.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-white/90 transition-all duration-500 group-hover:text-white font-sans">
                      {card.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* MICRO-PROOF BAR */}
          <div className="mt-12 sm:mt-16 md:mt-20 pt-8 sm:pt-10 border-t border-white/20 animate-fade-in-up animation-delay-1000">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 md:gap-8 text-center text-white/70 text-sm sm:text-base">
              <div className="flex items-center gap-2 group/proof hover:text-white transition-colors duration-300">
                <span className="inline-block w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></span>
                <span className="font-semibold text-white/90 group-hover/proof:scale-105 transition-transform duration-300">{t('home.proof.builders')}</span>
              </div>
              <div className="hidden sm:block w-px h-6 bg-gradient-to-b from-transparent via-white/30 to-transparent animate-pulse"></div>
              <div className="flex items-center gap-2 group/proof hover:text-white transition-colors duration-300">
                <span className="inline-block w-2 h-2 bg-purple-400 rounded-full animate-pulse animation-delay-200"></span>
                <span className="font-semibold text-white/90 group-hover/proof:scale-105 transition-transform duration-300">{t('home.proof.founders')}</span>
              </div>
              <div className="hidden sm:block w-px h-6 bg-gradient-to-b from-transparent via-white/30 to-transparent animate-pulse animation-delay-400"></div>
              <div className="flex items-center gap-2 group/proof hover:text-white transition-colors duration-300">
                <span className="inline-block w-2 h-2 bg-pink-400 rounded-full animate-pulse animation-delay-600"></span>
                <span className="font-semibold text-white/90 group-hover/proof:scale-105 transition-transform duration-300">{t('home.proof.beta')}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
