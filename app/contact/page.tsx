'use client';

import { useState, useEffect } from 'react';
import Footer from '../../components/footer';
import { useLanguage } from '../../contexts/language-context';

export default function ContactPage() {
  const { t } = useLanguage();
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

  useEffect(() => {
    // Asegurar que el fondo oscuro cubra toda la página
    document.body.style.backgroundColor = '#36454F';
    const mainElement = document.querySelector('main');
    if (mainElement) {
      (mainElement as HTMLElement).style.backgroundColor = '#36454F';
    }
    return () => {
      document.body.style.backgroundColor = 'transparent';
      if (mainElement) {
        (mainElement as HTMLElement).style.backgroundColor = '';
      }
    };
  }, []);

  return (
    <div className="text-white relative flex flex-col w-full" style={{ backgroundColor: '#36454F', marginTop: '-64px', paddingTop: '64px', minHeight: '100vh', width: '100%' }}>
      {/* Fondo animado sutil */}
      <div className="fixed inset-0 pointer-events-none z-0" style={{ backgroundColor: '#36454F' }}>
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

      {/* Content Section */}
      <section className="relative z-10 container mx-auto px-4 sm:px-6 pt-32 sm:pt-36 md:pt-40 pb-12 sm:pb-16 md:pb-24 flex-1">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-12 text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 text-white font-sans mx-auto">
              Contact Us
            </h1>
            <p className="text-base sm:text-lg text-gray-400 font-sans">
              Choose who you want to reach inside Zentrais.
            </p>
          </div>

          {/* Contact Sections */}
          <div className="space-y-8 text-white font-sans">
            <div className="space-y-2">
              <h2 className="text-2xl sm:text-3xl font-bold text-white">
                Users
              </h2>
              <p className="text-base sm:text-lg text-gray-300">
                Support, access, or platform questions
              </p>
              <p className="text-base sm:text-lg font-bold text-white">
                support@zentrais.com
              </p>
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl sm:text-3xl font-bold text-white">
                Investors
              </h2>
              <p className="text-base sm:text-lg text-gray-300">
                Funding, Data Room, or strategic conversations
              </p>
              <p className="text-base sm:text-lg font-bold text-white">
                investors@zentrais.com
              </p>
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl sm:text-3xl font-bold text-white">
                Collaborators
              </h2>
              <p className="text-base sm:text-lg text-gray-300">
                Partnerships, integrations, or co-development
              </p>
              <p className="text-base sm:text-lg font-bold text-white">
                collaborate@zentrais.com
              </p>
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl sm:text-3xl font-bold text-white">
                Media
              </h2>
              <p className="text-base sm:text-lg text-gray-300">
                Press, interviews, or speaking requests
              </p>
              <p className="text-base sm:text-lg font-bold text-white">
                media@zentrais.com
              </p>
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl sm:text-3xl font-bold text-white">
                Everything Else
              </h2>
              <p className="text-base sm:text-lg text-gray-300">
                We'll route it to the right team
              </p>
              <p className="text-base sm:text-lg font-bold text-white">
                contact@zentrais.com
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="mt-auto w-full flex-shrink-0" style={{ backgroundColor: '#36454F' }}>
        <Footer />
      </div>
    </div>
  );
}

