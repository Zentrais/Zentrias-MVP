'use client';

import { useState, useEffect } from 'react';
import Footer from '../../components/footer';
import { useLanguage } from '../../contexts/language-context';

export default function AboutPage() {
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
              About Us
            </h1>
          </div>

          {/* Content */}
          <div className="space-y-6 text-white font-sans text-base sm:text-lg leading-relaxed">
            <p>
              Zentrais is building the world's first <strong>Integrity Economy</strong>, a Human-AI ecosystem designed to restore trust, intelligence, and accountability to the internet.
            </p>
            
            <p>
              Today's platforms profit from manipulation, noise, and anonymity. We reject that model entirely. Zentrais puts <strong>truth, trust, and transparency</strong> first.
            </p>
            
            <p>
              Our three engines create a new standard for digital interaction:
            </p>
            
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li><strong>Perspective</strong> — Verified insights without algorithmic distortion.</li>
              <li><strong>Dialog</strong> — Accountable conversations rooted in identity and respect.</li>
              <li><strong>Exchange</strong> — Real value created and traded through integrity, not attention.</li>
            </ul>
            
            <p>
              This is not social media 2.0.
            </p>
            
            <p>
              It's a new operating system for collective intelligence, powered by patented models, transparent architecture, and a roadmap built for global scale.
            </p>
            
            <p>
              Our 60+ global builders, engineers, creators, and researchers share one mission: Use AI to strengthen humanity, not weaken it.
            </p>
            
            <p>
              Zentrais proves that when people and machines collaborate with integrity, better ideas rise, decisions improve, and societies advance.
            </p>
            
            <p>
              We're not asking the world to trust AI. We're building AI the world can trust.
            </p>
            
            <p className="font-bold text-xl mt-8">
              <strong>Zentrais. The Integrity Economy Starts Here.</strong>
            </p>
          </div>
        </div>
      </section>

      <div className="mt-auto w-full flex-shrink-0" style={{ backgroundColor: '#36454F' }}>
        <Footer />
      </div>
    </div>
  );
}

