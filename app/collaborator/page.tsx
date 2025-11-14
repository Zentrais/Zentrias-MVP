'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Button } from '../../components/ui/button';
import { ArrowRight } from 'lucide-react';
import Footer from '../../components/footer';
import { useLanguage } from '../../contexts/language-context';

// These will be defined inside the component to use translations

export default function CollaboratorPage() {
  const { t } = useLanguage();
  const [collaborationFormData, setCollaborationFormData] = useState({
    brandName: '',
    contactPerson: '',
    emailPhone: '',
    collaborationTrack: '',
    optionalNotes: '',
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

  const handleBecomeCollaborator = () => {
    window.location.href = 'mailto:collaborators@zentrais.com?subject=Become a Collaborator';
  };

  const handleStartCollaboration = () => {
    const formElement = document.getElementById('collaborator-form');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleCollaborationFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = 'Start Your Collaboration Application';
    const body = `
Brand / Company Name: ${collaborationFormData.brandName}
Contact Person: ${collaborationFormData.contactPerson}
Email / Phone: ${collaborationFormData.emailPhone}
Preferred Collaboration Track: ${collaborationFormData.collaborationTrack}
Optional Notes: ${collaborationFormData.optionalNotes || 'Not provided'}
    `.trim();
    window.location.href = `mailto:collaborators@zentrais.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const handleCollaborationInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setCollaborationFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="min-h-screen text-white relative overflow-hidden collaborator-body collaborator-tone" style={{ backgroundColor: '#36454F' }}>
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

      {/* Collaboration is the New Competition Section */}
      <section className="relative z-10 container mx-auto px-4 sm:px-6 py-12 sm:py-16 md:py-24">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-stretch">
            {/* Left Section - Text Content */}
            <div className="text-left flex flex-col justify-center">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl mb-6 text-white leading-tight collaborator-heading">
                Collaboration is the{' '}
                <span className="tone-highlight">New Competition.</span>
              </h1>
              <p className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed">
                Partner with Zentrais to unlock measurable trust, co-create with innovators, and integrate integrity at scale transforming how your brand connects, performs, and leads.
              </p>
              <Button
                onClick={handleStartCollaboration}
                className="tone-button text-white text-lg px-8 py-6 rounded-xl font-bold transition-all duration-500 hover:scale-105"
              >
                Start Collaboration
              </Button>
            </div>

            {/* Right Section - Image */}
            <div className="flex items-center justify-center lg:justify-end h-full">
              <div className="relative w-full max-w-2xl h-full">
                <div className="rounded-3xl overflow-hidden shadow-2xl h-full">
                  <Image
                    src="/meeting.png"
                    alt="Business meeting with dashboard"
                    width={800}
                    height={600}
                    className="w-full h-full object-cover"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Collaborate with Zentrais Section */}
      <section className="relative z-10 container mx-auto px-4 sm:px-6 py-12 sm:py-16 md:py-24">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
            {/* Left Section - Text Content */}
            <div className="text-left">
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-6 text-white leading-tight collaborator-heading">
                Why Collaborate with Zentrais?
              </h2>
              <p className="text-lg sm:text-xl md:text-2xl text-gray-300 leading-relaxed">
                Unlock measurable impact, co-create with innovators, and integrate integrity into every aspect of your brand.
              </p>
            </div>

            {/* Right Section - Bullet Points Box */}
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl border-2 border-dashed border-gray-400/50 p-6 sm:p-8">
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full mt-2 flex-shrink-0 tone-highlight" style={{ backgroundColor: 'var(--tone-primary)' }}></div>
                  <span className="text-gray-200 text-sm sm:text-base leading-relaxed ">
                    <strong className="text-white">Proven Impact:</strong> Data-driven insights and measurable engagement that show integrity in action.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full mt-2 flex-shrink-0 tone-highlight" style={{ backgroundColor: 'var(--tone-primary)' }}></div>
                  <span className="text-gray-200 text-sm sm:text-base leading-relaxed ">
                    <strong className="text-white">Strategic Co-Creation:</strong> Work hand-in-hand with our team to design campaigns, products, and research aligned with your goals.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full mt-2 flex-shrink-0 tone-highlight" style={{ backgroundColor: 'var(--tone-primary)' }}></div>
                  <span className="text-gray-200 text-sm sm:text-base leading-relaxed ">
                    <strong className="text-white">Transparency & Credibility:</strong> Verified trust tools and storytelling frameworks elevate your brand&apos;s public and internal reputation.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full mt-2 flex-shrink-0 tone-highlight" style={{ backgroundColor: 'var(--tone-primary)' }}></div>
                  <span className="text-gray-200 text-sm sm:text-base leading-relaxed ">
                    <strong className="text-white">Scalable Partnership:</strong> Grow your collaboration from pilots to enterprise-wide initiatives with clear metrics.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Ways to Collaborate Section */}
      <section className="relative z-10 container mx-auto px-4 sm:px-6 py-12 sm:py-16 md:py-24">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-4 text-white leading-tight collaborator-heading">
              Ways to Collaborate
            </h2>
            <p className="text-lg sm:text-xl md:text-2xl text-gray-300 leading-relaxed max-w-3xl mx-auto">
              Choose the path that aligns with your brand goals and start driving measurable impact with Zentrals.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {/* Research Alliances Card */}
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6 sm:p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
              <h3 className="text-2xl sm:text-3xl text-white mb-4 collaborator-heading">Research Alliances</h3>
              <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-6">
                Partner with our research team to co-create reports, uncover emerging ethical business trends, and access data-backed insights for strategic planning.
              </p>
              <Button
                onClick={() => window.location.href = 'mailto:collaborators@zentrais.com?subject=Research Alliances Request'}
                className="tone-button w-full text-white text-base sm:text-lg px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105"
              >
                Download Kit
              </Button>
            </div>

            {/* Exchange Integration Card */}
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6 sm:p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
              <h3 className="text-2xl sm:text-3xl text-white mb-4 collaborator-heading">{t('collaborator.ways.marketplace.title')}</h3>
              <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-6">
                Integrate Zentrals&apos; verified trust tools into your products, enhancing credibility with consumers through certifications, supply chain tracking, and integrity badges.
              </p>
              <Button
                onClick={() => window.location.href = 'mailto:collaborators@zentrais.com?subject=Exchange Integration Request'}
                className="tone-button w-full text-white text-base sm:text-lg px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105"
              >
                View Updates
              </Button>
            </div>

            {/* Co-Brand Campaigns Card */}
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6 sm:p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
              <h3 className="text-2xl sm:text-3xl text-white mb-4 collaborator-heading">Co-Brand Campaigns</h3>
              <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-6">
                Launch campaigns highlighting ethical leadership and measurable outcomes. Co-create content, while tracking engagement and audience growth.
              </p>
              <Button
                onClick={() => window.location.href = 'mailto:collaborators@zentrais.com?subject=Co-Brand Campaigns Request'}
                className="tone-button w-full text-white text-base sm:text-lg px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105"
              >
                Read Briefs
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Start Your Collaboration Form Section */}
      <section id="collaborator-form" className="relative z-10 container mx-auto px-4 sm:px-6 py-12 sm:py-16 md:py-24">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6 sm:p-8 md:p-12 shadow-xl">
            <h2 className="text-3xl sm:text-4xl md:text-5xl mb-4 text-white text-center collaborator-heading">
              Start Your Collaboration
            </h2>
            <p className="text-lg sm:text-xl text-gray-300 mb-8 text-center leading-relaxed">
              Fill out a few details to explore how your brand can co-create, integrate, and drive measurable impact with Zentrais.
            </p>

            <form onSubmit={handleCollaborationFormSubmit} className="space-y-6">
              {/* Brand / Company Name */}
              <div>
                <label htmlFor="brandName" className="block text-white font-semibold mb-2 ">
                  Brand / Company Name
                </label>
                <input
                  type="text"
                  id="brandName"
                  name="brandName"
                  value={collaborationFormData.brandName}
                  onChange={handleCollaborationInputChange}
                  placeholder="Full legal or brand name"
                  required
                  className="w-full px-4 py-3 bg-white/10 border border-gray-400/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/50 transition-all "
                />
              </div>

              {/* Contact Person */}
              <div>
                <label htmlFor="contactPerson" className="block text-white font-semibold mb-2 ">
                  Contact Person
                </label>
                <input
                  type="text"
                  id="contactPerson"
                  name="contactPerson"
                  value={collaborationFormData.contactPerson}
                  onChange={handleCollaborationInputChange}
                  placeholder="Name of primary point of contact"
                  required
                  className="w-full px-4 py-3 bg-white/10 border border-gray-400/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/50 transition-all "
                />
              </div>

              {/* Email / Phone */}
              <div>
                <label htmlFor="emailPhone" className="block text-white font-semibold mb-2 ">
                  Email / Phone
                </label>
                <input
                  type="text"
                  id="emailPhone"
                  name="emailPhone"
                  value={collaborationFormData.emailPhone}
                  onChange={handleCollaborationInputChange}
                  placeholder="For follow-up and scheduling"
                  required
                  className="w-full px-4 py-3 bg-white/10 border border-gray-400/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/50 transition-all "
                />
              </div>

              {/* Preferred Collaboration Track */}
              <div>
                <label htmlFor="collaborationTrack" className="block text-white font-semibold mb-2 ">
                  Preferred Collaboration Track
                </label>
                <select
                  id="collaborationTrack"
                  name="collaborationTrack"
                  value={collaborationFormData.collaborationTrack}
                  onChange={handleCollaborationInputChange}
                  required
                  className="w-full px-4 py-3 bg-white/10 border border-gray-400/30 rounded-xl text-white focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/50 transition-all "
                >
                  <option value="" className="bg-slate-900">Select a track...</option>
                  <option value="Research Alliances" className="bg-slate-900">Research Alliances</option>
                  <option value="Exchange Integration" className="bg-slate-900">{t('collaborator.start.track.marketplace')}</option>
                  <option value="Co-Brand Campaigns" className="bg-slate-900">Co-Brand Campaigns</option>
                </select>
              </div>

              {/* Optional Notes */}
              <div>
                <label htmlFor="optionalNotes" className="block text-white font-semibold mb-2 ">
                  Optional Notes
                </label>
                <textarea
                  id="optionalNotes"
                  name="optionalNotes"
                  value={collaborationFormData.optionalNotes}
                  onChange={handleCollaborationInputChange}
                  placeholder="Additional comments or context"
                  rows={4}
                  className="w-full px-4 py-3 bg-white/10 border border-gray-400/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/50 transition-all resize-none "
                />
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="tone-button w-full text-white text-lg px-8 py-4 rounded-xl font-semibold transition-all duration-300 hover:scale-105"
              >
                Apply Now
              </Button>
            </form>
          </div>
        </div>
      </section>

      {/* Persistent CTA for mobile */}
      <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-slate-900/95 backdrop-blur-lg border-t border-amber-400/20 p-4">
        <Button
          onClick={handleStartCollaboration}
          className="tone-button w-full text-white"
        >
          Start Collaboration
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>

      <Footer />
    </div>
  );
}
