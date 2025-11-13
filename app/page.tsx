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
      className="min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url('/fondo-new.jpg')` }}
    >
      {/* CABECERA DE LA PANTALLA */}
      <div className="container mx-auto px-4 sm:px-6 pt-6 sm:pt-10 text-left">
        <h2 className="text-base sm:text-lg font-semibold mb-2 text-white/90 tracking-wide drop-shadow-lg font-sans">
          {t('home.greeting')}
        </h2>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-6 sm:mb-10 text-white tracking-wider drop-shadow-2xl uppercase font-sans">
          {t('home.title')}
        </h1>
      </div>

      {/* SECCIÓN PRINCIPAL */}
      <div className="flex items-center justify-center">
        <div className="container mx-auto py-8 sm:py-12 md:py-16 px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8 text-center">
            {audienceCards.map((card) => {
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
                },
                indigo: {
                  border: 'border-indigo-400/30',
                  borderHover: 'group-hover:border-indigo-400/60',
                  shadow: 'shadow-indigo-500/20',
                  shadowHover: 'group-hover:shadow-indigo-500/40',
                  icon: 'text-indigo-400',
                  iconHover: 'group-hover:text-indigo-300',
                  glow: 'from-indigo-400/20 via-indigo-500/10 to-transparent',
                },
                amber: {
                  border: 'border-amber-400/30',
                  borderHover: 'group-hover:border-amber-400/60',
                  shadow: 'shadow-amber-500/20',
                  shadowHover: 'group-hover:shadow-amber-500/40',
                  icon: 'text-amber-400',
                  iconHover: 'group-hover:text-amber-300',
                  glow: 'from-amber-400/20 via-amber-500/10 to-transparent',
                },
                pink: {
                  border: 'border-pink-400/30',
                  borderHover: 'group-hover:border-pink-400/60',
                  shadow: 'shadow-pink-500/20',
                  shadowHover: 'group-hover:shadow-pink-500/40',
                  icon: 'text-pink-400',
                  iconHover: 'group-hover:text-pink-300',
                  glow: 'from-pink-400/20 via-pink-500/10 to-transparent',
                },
              };

              const colors = colorClasses[card.color as keyof typeof colorClasses];

              return (
                <div
                  key={card.id}
                  className={`group relative p-6 sm:p-8 bg-white/10 backdrop-blur-sm rounded-xl shadow-lg ${colors.border} ${colors.borderHover} cursor-pointer overflow-hidden transition-all duration-500 hover:bg-white/20 hover:backdrop-blur-md hover:shadow-2xl ${colors.shadow} ${colors.shadowHover} hover:scale-105`}
                  onClick={() => router.push(card.route)}
                >
                  {/* Animación de luz flotante */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${colors.glow} opacity-0 group-hover:opacity-100 transition-opacity duration-700 animate-pulse`}
                  ></div>
                  
                  {/* Brillo animado que se mueve */}
                  <div
                    className="absolute -inset-10 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 animate-shimmer opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                  ></div>

                  {/* Gradiente de fondo */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/0 via-white/0 to-white/0 group-hover:from-white/10 group-hover:via-white/5 group-hover:to-transparent transition-all duration-500"></div>
                  
                  <div className="relative z-10">
                    <Icon
                      className={`w-10 h-10 sm:w-12 sm:h-12 ${colors.icon} ${colors.iconHover} mx-auto mb-3 sm:mb-4 transition-all duration-500 group-hover:scale-110`}
                    />
                    <h3 className="font-bold text-white text-base sm:text-lg mb-2 transition-all duration-500 group-hover:text-white uppercase tracking-wider font-sans">
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
        </div>
      </div>
    </div>
  );
}
