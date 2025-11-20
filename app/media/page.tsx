'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Button } from '../../components/ui/button';
import { Folder, Megaphone, BookOpen, ArrowRight, ChevronDown, ChevronUp } from 'lucide-react';
import Footer from '../../components/footer';
import { useLanguage } from '../../contexts/language-context';

// These will be defined inside the component to use translations

export default function MediaPage() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    mediaType: '',
    platform: '',
    followerCount: '',
    publicationHistory: '',
  });
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; delay: number }>>([]);
  const [expandedStoryline, setExpandedStoryline] = useState<string | null>(null);

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

  const handleJoinZenzers = () => {
    const formElement = document.getElementById('media-form');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = 'Join the Zenzers Circle Application';
    const body = `
Full Name: ${formData.fullName}
Email: ${formData.email}
Media Type: ${formData.mediaType}
Platform or Outlet: ${formData.platform}
Follower Count / Audience Size: ${formData.followerCount || 'Not provided'}
Publication History / Focus Area: ${formData.publicationHistory}
    `.trim();
    window.location.href = `mailto:collaborators@zentrais.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="min-h-screen text-white relative overflow-hidden media-body media-tone -mt-16 pt-16" style={{ backgroundColor: '#36454F' }}>
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

      {/* Let's Break the Mold Section */}
      <section className="relative z-10 container mx-auto px-4 sm:px-6 pt-32 sm:pt-36 md:pt-40 pb-12 sm:pb-16 md:pb-24">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left Section - Text Content */}
            <div className="text-left">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-white leading-tight collaborator-heading">
                {t('media.break.title')}{' '}
                {t('media.break.mold')}{' '}
                <span className="text-blue-300">{t('media.break.together')}</span>
              </h1>
              <p className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed">
                {t('media.break.desc')}
              </p>
              <Button
                onClick={handleJoinZenzers}
                className="tone-button text-white text-lg px-8 py-6 rounded-xl font-bold transition-all duration-500 hover:scale-105"
              >
                {t('media.break.cta')}
              </Button>
            </div>

            {/* Right Section - Image */}
            <div className="flex items-center justify-center lg:justify-end">
              <div className="relative w-full max-w-2xl">
                <div className="rounded-3xl overflow-hidden shadow-2xl">
                  <Image
                    src="/people.png"
                    alt="People collaborating"
                    width={800}
                    height={600}
                    className="w-full h-auto object-cover max-h-[500px] sm:max-h-[600px]"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Perspective in Action Section */}
      <section className="relative z-10 container mx-auto px-4 sm:px-6 pt-20 sm:pt-24 md:pt-28 pb-12 sm:pb-16 md:pb-24">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-white leading-tight collaborator-heading">
              {t('media.debate.title')}
            </h2>
            <p className="text-lg sm:text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto">
              {t('media.debate.desc')}
            </p>
          </div>

          {/* Before and After Comparison */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {/* Before Box */}
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-red-400/30 p-6 sm:p-8">
              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-6 collaborator-heading">{t('media.debate.before')}</h3>
              <ul className="space-y-4 mb-6">
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-red-500 mt-2 flex-shrink-0"></div>
                  <span className="text-gray-200 text-sm sm:text-base leading-relaxed ">
                    {t('media.debate.before.bullet1')}
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-red-500 mt-2 flex-shrink-0"></div>
                  <span className="text-gray-200 text-sm sm:text-base leading-relaxed ">
                    {t('media.debate.before.bullet2')}
                  </span>
                </li>
              </ul>
              <p className="text-center text-red-400 font-semibold text-base sm:text-lg ">
                {t('media.debate.before.conclusion')}
              </p>
            </div>

            {/* After Box */}
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-blue-400/30 p-6 sm:p-8">
              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-6 collaborator-heading">{t('media.debate.after')}</h3>
              <ul className="space-y-4 mb-6">
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 flex-shrink-0"></div>
                  <span className="text-gray-200 text-sm sm:text-base leading-relaxed ">
                    {t('media.debate.after.bullet1')}
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 flex-shrink-0"></div>
                  <span className="text-gray-200 text-sm sm:text-base leading-relaxed ">
                    {t('media.debate.after.bullet2')}
                  </span>
                </li>
              </ul>
              <p className="text-center text-blue-400 font-semibold text-base sm:text-lg ">
                {t('media.debate.after.conclusion')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Resources for Ethical Storytelling Section */}
      <section className="relative z-10 container mx-auto px-4 sm:px-6 pt-20 sm:pt-24 md:pt-28 pb-12 sm:pb-16 md:pb-24">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white leading-tight collaborator-heading">
            {t('media.resources.ethical.title')}{' '}
            <span className="text-blue-300">{t('media.resources.ethical.subtitle')}</span>
            <br />
            {t('media.resources.ethical.title2')}
          </h2>
          <p className="text-lg sm:text-xl md:text-2xl text-gray-300 leading-relaxed">
            {t('media.resources.ethical.desc')}<br className="hidden sm:block" />
            {t('media.resources.ethical.desc2')}
          </p>
        </div>
      </section>

      {/* Resources Cards Section */}
      <section className="relative z-10 container mx-auto px-4 sm:px-6 pt-20 sm:pt-24 md:pt-28 pb-12 sm:pb-16 md:pb-24">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 items-stretch">
            {/* Press Kit Card */}
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6 sm:p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 flex flex-col h-full">
              <div className="flex flex-col items-center mb-6 flex-shrink-0">
                <h3 className="text-2xl sm:text-3xl font-bold text-white mb-6 collaborator-heading text-center min-h-[3.5rem] sm:min-h-[4rem] flex items-center justify-center">{t('media.resources.presskit.title')}</h3>
                <div className="w-24 h-24 sm:w-28 sm:h-28 bg-amber-50/90 rounded-xl flex items-center justify-center">
                  <Folder className="w-12 h-12 sm:w-14 sm:h-14 text-amber-800" />
                </div>
              </div>
              <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-6 flex-grow min-h-0">
                {t('media.resources.presskit.desc')}
              </p>
              <Button
                onClick={() => window.location.href = 'mailto:pr@zentrais.com?subject=Press Kit Request'}
                className="tone-button w-full text-white text-base sm:text-lg px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105 flex-shrink-0 mt-auto"
              >
                {t('media.resources.presskit.cta')}
              </Button>
            </div>

            {/* Press Release Card */}
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6 sm:p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 flex flex-col h-full">
              <div className="flex flex-col items-center mb-6 flex-shrink-0">
                <h3 className="text-2xl sm:text-3xl font-bold text-white mb-6 collaborator-heading text-center min-h-[3.5rem] sm:min-h-[4rem] flex items-center justify-center">{t('media.resources.pressrelease.title')}</h3>
                <div className="w-24 h-24 sm:w-28 sm:h-28 bg-amber-50/90 rounded-xl flex items-center justify-center">
                  <Megaphone className="w-12 h-12 sm:w-14 sm:h-14 text-red-600" />
                </div>
              </div>
              <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-6 flex-grow min-h-0">
                {t('media.resources.pressrelease.desc')}
              </p>
              <Button
                onClick={() => window.location.href = 'mailto:pr@zentrais.com?subject=Press Release Updates'}
                className="tone-button w-full text-white text-base sm:text-lg px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105 flex-shrink-0 mt-auto"
              >
                {t('media.resources.pressrelease.cta')}
              </Button>
            </div>

            {/* Story Briefs Card */}
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6 sm:p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 flex flex-col h-full">
              <div className="flex flex-col items-center mb-6 flex-shrink-0">
                <h3 className="text-2xl sm:text-3xl font-bold text-white mb-6 collaborator-heading text-center min-h-[3.5rem] sm:min-h-[4rem] flex items-center justify-center">{t('media.resources.storybriefs.title')}</h3>
                <div className="w-24 h-24 sm:w-28 sm:h-28 bg-amber-50/90 rounded-xl flex items-center justify-center">
                  <BookOpen className="w-12 h-12 sm:w-14 sm:h-14 text-amber-900" />
                </div>
              </div>
              <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-6 flex-grow min-h-0">
                {t('media.resources.storybriefs.desc')}
              </p>
              <Button
                onClick={() => window.location.href = 'mailto:pr@zentrais.com?subject=Story Briefs Request'}
                className="tone-button w-full text-white text-base sm:text-lg px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105 flex-shrink-0 mt-auto"
              >
                {t('media.resources.storybriefs.cta')}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Explore Storylines Section */}
      <section className="relative z-10 container mx-auto px-4 sm:px-6 pt-20 sm:pt-24 md:pt-28 pb-12 sm:pb-16 md:pb-24">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-12 text-white text-center collaborator-heading">
            {t('media.storylines.title')}<br />
            <span className="text-blue-300">{t('media.storylines.integrity')}</span>
          </h2>

          <div className="space-y-4">
            {/* Rebuilding Trust */}
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl border border-blue-200/30 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden hover:border-blue-300/50">
              <button
                onClick={() => setExpandedStoryline(expandedStoryline === 'rebuilding-trust' ? null : 'rebuilding-trust')}
                className="w-full px-6 py-5 flex items-center justify-between hover:bg-blue-50/50 transition-all duration-300 group"
              >
                <div className="text-left flex-1">
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-1 group-hover:text-blue-700 transition-colors">{t('media.storylines.trust.title')}</h3>
                  <p className="text-sm sm:text-base text-gray-600">{t('media.storylines.trust.desc')}</p>
                </div>
                {expandedStoryline === 'rebuilding-trust' ? (
                  <ChevronUp className="w-5 h-5 text-blue-500 flex-shrink-0 ml-4 transition-transform" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-blue-400 flex-shrink-0 ml-4 transition-transform group-hover:text-blue-500" />
                )}
              </button>
              {expandedStoryline === 'rebuilding-trust' && (
                <div className="px-6 py-4 border-t border-blue-100 bg-blue-50/30">
                  <p className="text-gray-700 leading-relaxed">
                    {t('media.storylines.trust.content')}
                  </p>
                </div>
              )}
            </div>

            {/* The End of the Attention Economy */}
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl border border-blue-200/30 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden hover:border-blue-300/50">
              <button
                onClick={() => setExpandedStoryline(expandedStoryline === 'attention-economy' ? null : 'attention-economy')}
                className="w-full px-6 py-5 flex items-center justify-between hover:bg-blue-50/50 transition-all duration-300 group"
              >
                <div className="text-left flex-1">
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-1 group-hover:text-blue-700 transition-colors">{t('media.storylines.attention.title')}</h3>
                  <p className="text-sm sm:text-base text-gray-600">{t('media.storylines.attention.desc')}</p>
                </div>
                {expandedStoryline === 'attention-economy' ? (
                  <ChevronUp className="w-5 h-5 text-blue-500 flex-shrink-0 ml-4 transition-transform" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-blue-400 flex-shrink-0 ml-4 transition-transform group-hover:text-blue-500" />
                )}
              </button>
              {expandedStoryline === 'attention-economy' && (
                <div className="px-6 py-4 border-t border-blue-100 bg-blue-50/30">
                  <p className="text-gray-700 leading-relaxed">
                    {t('media.storylines.attention.content')}
                  </p>
                </div>
              )}
            </div>

            {/* Ethical AI Collaboration */}
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl border border-blue-200/30 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden hover:border-blue-300/50">
              <button
                onClick={() => setExpandedStoryline(expandedStoryline === 'ethical-ai' ? null : 'ethical-ai')}
                className="w-full px-6 py-5 flex items-center justify-between hover:bg-blue-50/50 transition-all duration-300 group"
              >
                <div className="text-left flex-1">
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-1 group-hover:text-blue-700 transition-colors">{t('media.storylines.ethical.title')}</h3>
                  <p className="text-sm sm:text-base text-gray-600">{t('media.storylines.ethical.desc')}</p>
                </div>
                {expandedStoryline === 'ethical-ai' ? (
                  <ChevronUp className="w-5 h-5 text-blue-500 flex-shrink-0 ml-4 transition-transform" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-blue-400 flex-shrink-0 ml-4 transition-transform group-hover:text-blue-500" />
                )}
              </button>
              {expandedStoryline === 'ethical-ai' && (
                <div className="px-6 py-4 border-t border-blue-100 bg-blue-50/30">
                  <p className="text-gray-700 leading-relaxed">
                    {t('media.storylines.ethical.content')}
                  </p>
                </div>
              )}
            </div>

            {/* The New Creator Economy */}
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl border border-blue-200/30 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden hover:border-blue-300/50">
              <button
                onClick={() => setExpandedStoryline(expandedStoryline === 'creator-economy' ? null : 'creator-economy')}
                className="w-full px-6 py-5 flex items-center justify-between hover:bg-blue-50/50 transition-all duration-300 group"
              >
                <div className="text-left flex-1">
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-1 group-hover:text-blue-700 transition-colors">{t('media.storylines.creator.title')}</h3>
                  <p className="text-sm sm:text-base text-gray-600">{t('media.storylines.creator.desc')}</p>
                </div>
                {expandedStoryline === 'creator-economy' ? (
                  <ChevronUp className="w-5 h-5 text-blue-500 flex-shrink-0 ml-4 transition-transform" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-blue-400 flex-shrink-0 ml-4 transition-transform group-hover:text-blue-500" />
                )}
              </button>
              {expandedStoryline === 'creator-economy' && (
                <div className="px-6 py-4 border-t border-blue-100 bg-blue-50/30">
                  <p className="text-gray-700 leading-relaxed">
                    {t('media.storylines.creator.content')}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Contacts Section */}
      <section className="relative z-10 container mx-auto px-4 sm:px-6 pt-20 sm:pt-24 md:pt-28 pb-12 sm:pb-16 md:pb-24">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6 sm:p-8 md:p-12 shadow-xl">
            <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-white collaborator-heading">
              {t('media.contacts.title')}
            </h2>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-3">
                <span className="text-2xl">📩</span>
                <div>
                  <p className="text-white font-semibold text-lg sm:text-xl  mb-1">
                    {t('media.contacts.davidson.name')}
                  </p>
                  <a 
                    href="mailto:pr@zentrais.com" 
                    className="text-cyan-400 hover:text-cyan-300 text-base sm:text-lg transition-colors"
                  >
                    {t('media.contacts.davidson.email')}
                  </a>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <Button
                onClick={() => window.location.href = 'mailto:pr@zentrais.com?subject=Interview Request'}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white text-base sm:text-lg px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
              >
                {t('media.contacts.request.interview')}
                <ArrowRight className="w-5 h-5" />
              </Button>
              
              <Button
                onClick={() => window.location.href = 'mailto:pr@zentrais.com?subject=Press Kit Request'}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white text-base sm:text-lg px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
              >
                {t('media.contacts.request.kit')}
                <ArrowRight className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Join the Zenzers Circle Form Section */}
      <section id="media-form" className="relative z-10 container mx-auto px-4 sm:px-6 py-12 sm:py-16 md:py-24">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6 sm:p-8 md:p-12 shadow-xl">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-white text-center collaborator-heading">
              {t('media.zenzers.title')}
            </h2>
            <p className="text-lg sm:text-xl text-gray-300 mb-8 text-center leading-relaxed">
              {t('media.zenzers.desc')}
            </p>

            <form onSubmit={handleFormSubmit} className="space-y-6">
              {/* Full Name */}
              <div>
                <label htmlFor="fullName" className="block text-white font-semibold mb-2 ">
                  {t('media.zenzers.fullname')}
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  placeholder={t('media.zenzers.fullname.placeholder')}
                  required
                  className="w-full px-4 py-3 bg-white/10 border border-gray-400/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/50 transition-all "
                />
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-white font-semibold mb-2 ">
                  {t('media.zenzers.email')}
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder={t('media.zenzers.email.placeholder')}
                  required
                  className="w-full px-4 py-3 bg-white/10 border border-gray-400/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/50 transition-all "
                />
              </div>

              {/* Media Type */}
              <div>
                <label htmlFor="mediaType" className="block text-white font-semibold mb-2 ">
                  {t('media.zenzers.type')}
                </label>
                <input
                  type="text"
                  id="mediaType"
                  name="mediaType"
                  value={formData.mediaType}
                  onChange={handleInputChange}
                  placeholder={t('media.zenzers.type.placeholder')}
                  required
                  className="w-full px-4 py-3 bg-white/10 border border-gray-400/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/50 transition-all "
                />
              </div>

              {/* Platform or Outlet */}
              <div>
                <label htmlFor="platform" className="block text-white font-semibold mb-2 ">
                  {t('media.zenzers.platform')}
                </label>
                <input
                  type="text"
                  id="platform"
                  name="platform"
                  value={formData.platform}
                  onChange={handleInputChange}
                  placeholder={t('media.zenzers.platform.placeholder')}
                  required
                  className="w-full px-4 py-3 bg-white/10 border border-gray-400/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/50 transition-all "
                />
              </div>

              {/* Follower Count / Audience Size */}
              <div>
                <label htmlFor="followerCount" className="block text-white font-semibold mb-2 ">
                  {t('media.zenzers.followers')}
                </label>
                <input
                  type="text"
                  id="followerCount"
                  name="followerCount"
                  value={formData.followerCount}
                  onChange={handleInputChange}
                  placeholder={t('media.zenzers.followers.placeholder')}
                  className="w-full px-4 py-3 bg-white/10 border border-gray-400/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/50 transition-all "
                />
              </div>

              {/* Publication History / Focus Area */}
              <div>
                <label htmlFor="publicationHistory" className="block text-white font-semibold mb-2 ">
                  {t('media.zenzers.history')}
                </label>
                <textarea
                  id="publicationHistory"
                  name="publicationHistory"
                  value={formData.publicationHistory}
                  onChange={handleInputChange}
                  placeholder={t('media.zenzers.history.placeholder')}
                  rows={4}
                  required
                  className="w-full px-4 py-3 bg-white/10 border border-gray-400/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/50 transition-all resize-none "
                />
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full bg-blue-500 hover:bg-blue-600 text-white text-lg px-8 py-4 rounded-xl font-semibold transition-all duration-300 hover:scale-105"
              >
                {t('media.zenzers.submit')}
              </Button>
            </form>
          </div>
        </div>
      </section>

      {/* Persistent CTA for mobile */}
      <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-slate-900/95 backdrop-blur-lg border-t border-amber-400/20 p-4">
        <Button
          onClick={handleJoinZenzers}
          className="w-full bg-blue-500 text-white hover:bg-blue-600"
        >
          {t('media.zenzers.mobile')}
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>

      <Footer />
    </div>
  );
}
