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
    <div className="min-h-screen text-white relative overflow-hidden media-body media-tone" style={{ backgroundColor: '#36454F' }}>
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
      <section className="relative z-10 container mx-auto px-4 sm:px-6 py-12 sm:py-16 md:py-24">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left Section - Text Content */}
            <div className="text-left">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-white leading-tight media-headline">
                Let&apos;s Break{' '}
                <span className="tone-highlight">the Mold.</span>{' '}
                Together.
              </h1>
              <p className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed">
                Join a global network of creators and journalists reshaping how stories are told, powered by Zentrais&apos; Perspective Engine for respectful, truth-driven dialogue.
              </p>
              <Button
                onClick={handleJoinZenzers}
                className="tone-button text-white text-lg px-8 py-6 rounded-xl font-bold transition-all duration-500 hover:scale-105"
              >
                Join Zenzers
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
                    className="w-full h-auto object-cover"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Perspective in Action Section */}
      <section className="relative z-10 container mx-auto px-4 sm:px-6 py-12 sm:py-16 md:py-24">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-white leading-tight media-headline">
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
              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-6 media-headline">Before</h3>
              <ul className="space-y-4 mb-6">
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-red-500 mt-2 flex-shrink-0"></div>
                  <span className="text-gray-200 text-sm sm:text-base leading-relaxed ">
                    Polarized, emotional argument
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-red-500 mt-2 flex-shrink-0"></div>
                  <span className="text-gray-200 text-sm sm:text-base leading-relaxed ">
                    Dimmer, chaotic visuals, overlapping comments, angry emojis, red tones
                  </span>
                </li>
              </ul>
              <p className="text-center text-red-400 font-semibold text-base sm:text-lg ">
                The old internet rewarded outrage.
              </p>
            </div>

            {/* After Box */}
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-blue-400/30 p-6 sm:p-8">
              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-6 media-headline">After</h3>
              <ul className="space-y-4 mb-6">
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 flex-shrink-0"></div>
                  <span className="text-gray-200 text-sm sm:text-base leading-relaxed ">
                    Respectful, solution-focused discussion
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 flex-shrink-0"></div>
                  <span className="text-gray-200 text-sm sm:text-base leading-relaxed ">
                    Clean, balanced visuals calm discussion bubbles, mutual understanding, cool color tones
                  </span>
                </li>
              </ul>
              <p className="text-center text-blue-400 font-semibold text-base sm:text-lg ">
                The new web rewards integrity.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Resources for Ethical Storytelling Section */}
      <section className="relative z-10 container mx-auto px-4 sm:px-6 py-12 sm:py-16 md:py-24">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white leading-tight media-headline">
            Resources for{' '}
            <span className="tone-highlight">Ethical</span>
            <br />
            Storytelling
          </h2>
          <p className="text-lg sm:text-xl md:text-2xl text-gray-300 leading-relaxed">
            Access verified stories, visuals, and press materials built to empower<br className="hidden sm:block" />
            transparent journalism and conscious creation.
          </p>
        </div>
      </section>

      {/* Resources Cards Section */}
      <section className="relative z-10 container mx-auto px-4 sm:px-6 py-12 sm:py-16 md:py-24">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {/* Press Kit Card */}
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6 sm:p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-6 media-headline">Press Kit</h3>
              <div className="flex justify-center mb-6">
                <div className="w-24 h-24 sm:w-28 sm:h-28 bg-amber-50/90 rounded-xl flex items-center justify-center">
                  <Folder className="w-12 h-12 sm:w-14 sm:h-14 text-amber-800" />
                </div>
              </div>
              <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-6 ">
                Everything you need to cover Zentrals with accuracy and confidence, official logos, bios, brand assets, and our founding story.
              </p>
              <Button
                onClick={() => window.location.href = 'mailto:pr@zentrais.com?subject=Press Kit Request'}
                className="tone-button w-full text-white text-base sm:text-lg px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105"
              >
                Download Kit
              </Button>
            </div>

            {/* Press Release Card */}
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6 sm:p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-6 media-headline">Press Release</h3>
              <div className="flex justify-center mb-6">
                <div className="w-24 h-24 sm:w-28 sm:h-28 bg-amber-50/90 rounded-xl flex items-center justify-center">
                  <Megaphone className="w-12 h-12 sm:w-14 sm:h-14 text-red-600" />
                </div>
              </div>
              <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-6 ">
                Stay informed with the latest announcements, and research shaping the Integrity Economy direct from the source.
              </p>
              <Button
                onClick={() => window.location.href = 'mailto:pr@zentrais.com?subject=Press Release Updates'}
                className="tone-button w-full text-white text-base sm:text-lg px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105"
              >
                View Updates
              </Button>
            </div>

            {/* Story Briefs Card */}
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6 sm:p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-6 media-headline">Story Briefs</h3>
              <div className="flex justify-center mb-6">
                <div className="w-24 h-24 sm:w-28 sm:h-28 bg-amber-50/90 rounded-xl flex items-center justify-center">
                  <BookOpen className="w-12 h-12 sm:w-14 sm:h-14 text-amber-900" />
                </div>
              </div>
              <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-6 ">
                Explore ready-to-publish insights showing how the Perspective Engine transforms digital conversation into meaningful exchange.
              </p>
              <Button
                onClick={() => window.location.href = 'mailto:pr@zentrais.com?subject=Story Briefs Request'}
                className="tone-button w-full text-white text-base sm:text-lg px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105"
              >
                Read Briefs
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Explore Storylines Section */}
      <section className="relative z-10 container mx-auto px-4 sm:px-6 py-12 sm:py-16 md:py-24">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-12 text-white text-center media-headline">
            Explore Storylines Shaping the{' '}
            <span className="text-blue-300">Integrity Economy</span>
          </h2>

          <div className="space-y-4">
            {/* Rebuilding Trust */}
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl border border-blue-200/30 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden hover:border-blue-300/50">
              <button
                onClick={() => setExpandedStoryline(expandedStoryline === 'rebuilding-trust' ? null : 'rebuilding-trust')}
                className="w-full px-6 py-5 flex items-center justify-between hover:bg-blue-50/50 transition-all duration-300 group"
              >
                <div className="text-left flex-1">
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-1 group-hover:text-blue-700 transition-colors">Rebuilding Trust</h3>
                  <p className="text-sm sm:text-base text-gray-600">How Zentrais uses AI to verify human truth at scale.</p>
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
                    Zentrais leverages advanced AI verification systems to authenticate human contributions, creating a trust layer that scales across millions of interactions. Our technology ensures that every piece of content, every debate, and every transaction is verified for authenticity before it enters the Integrity Economy.
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
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-1 group-hover:text-blue-700 transition-colors">The End of the Attention Economy</h3>
                  <p className="text-sm sm:text-base text-gray-600">Why engagement metrics are being replaced by integrity metrics.</p>
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
                    Traditional platforms reward clicks, views, and engagement regardless of truth. Zentrais introduces Integrity Tokens that measure verified contributions, ethical behavior, and authentic interactions. This shift from attention to integrity represents a fundamental change in how digital value is created and rewarded.
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
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-1 group-hover:text-blue-700 transition-colors">Ethical AI Collaboration</h3>
                  <p className="text-sm sm:text-base text-gray-600">The framework ensuring human values remain at the core of technology.</p>
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
                    Our three-engine ecosystem (Perspective, Dialog, Exchange) is designed with human values at its foundation. Every AI interaction is guided by ethical principles, verified data, and human oversight. This framework ensures technology serves humanity, not the other way around.
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
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-1 group-hover:text-blue-700 transition-colors">The New Creator Economy</h3>
                  <p className="text-sm sm:text-base text-gray-600">How truth and transparency drive sustainable influence.</p>
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
                    Creators in the Integrity Economy earn through verified contributions, not viral moments. Integrity Tokens reward authentic engagement, meaningful content, and ethical practices. This creates a sustainable model where influence is built on trust, not manipulation.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Contacts Section */}
      <section className="relative z-10 container mx-auto px-4 sm:px-6 py-12 sm:py-16 md:py-24">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6 sm:p-8 md:p-12 shadow-xl">
            <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-white media-headline">
              Contacts:
            </h2>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-3">
                <span className="text-2xl">📩</span>
                <div>
                  <p className="text-white font-semibold text-lg sm:text-xl  mb-1">
                    Davidson - Head of Media Relations
                  </p>
                  <a 
                    href="mailto:pr@zentrais.com" 
                    className="tone-highlight hover:opacity-80 text-base sm:text-lg transition-colors"
                  >
                    pr@zentrais.com
                  </a>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <Button
                onClick={() => window.location.href = 'mailto:pr@zentrais.com?subject=Interview Request'}
                className="w-full bg-pink-500 hover:bg-pink-600 text-white text-base sm:text-lg px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
              >
                Request Interview
                <ArrowRight className="w-5 h-5" />
              </Button>
              
              <Button
                onClick={() => window.location.href = 'mailto:pr@zentrais.com?subject=Press Kit Request'}
                className="w-full bg-pink-500 hover:bg-pink-600 text-white text-base sm:text-lg px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
              >
                Access Press Kit
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
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-white text-center media-headline">
              Join the Zenzers Circle
            </h2>
            <p className="text-lg sm:text-xl text-gray-300 mb-8 text-center leading-relaxed">
              Become part of a private media network committed to truth-driven storytelling and ethical influence.
            </p>

            <form onSubmit={handleFormSubmit} className="space-y-6">
              {/* Full Name */}
              <div>
                <label htmlFor="fullName" className="block text-white font-semibold mb-2 ">
                  Full Name
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  placeholder="Your professional or publication name"
                  required
                  className="w-full px-4 py-3 bg-white/10 border border-gray-400/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/50 transition-all "
                />
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-white font-semibold mb-2 ">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="youremail@gmail.com"
                  required
                  className="w-full px-4 py-3 bg-white/10 border border-gray-400/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/50 transition-all "
                />
              </div>

              {/* Media Type */}
              <div>
                <label htmlFor="mediaType" className="block text-white font-semibold mb-2 ">
                  Media Type
                </label>
                <input
                  type="text"
                  id="mediaType"
                  name="mediaType"
                  value={formData.mediaType}
                  onChange={handleInputChange}
                  placeholder="Journalist / Influencer / Editor / Podcaster / Publication"
                  required
                  className="w-full px-4 py-3 bg-white/10 border border-gray-400/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/50 transition-all "
                />
              </div>

              {/* Platform or Outlet */}
              <div>
                <label htmlFor="platform" className="block text-white font-semibold mb-2 ">
                  Platform or Outlet
                </label>
                <input
                  type="text"
                  id="platform"
                  name="platform"
                  value={formData.platform}
                  onChange={handleInputChange}
                  placeholder="Link or name of your main channel"
                  required
                  className="w-full px-4 py-3 bg-white/10 border border-gray-400/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/50 transition-all "
                />
              </div>

              {/* Follower Count / Audience Size */}
              <div>
                <label htmlFor="followerCount" className="block text-white font-semibold mb-2 ">
                  Follower Count / Audience Size
                </label>
                <input
                  type="text"
                  id="followerCount"
                  name="followerCount"
                  value={formData.followerCount}
                  onChange={handleInputChange}
                  placeholder="(optional for influencers)"
                  className="w-full px-4 py-3 bg-white/10 border border-gray-400/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/50 transition-all "
                />
              </div>

              {/* Publication History / Focus Area */}
              <div>
                <label htmlFor="publicationHistory" className="block text-white font-semibold mb-2 ">
                  Publication History / Focus Area
                </label>
                <textarea
                  id="publicationHistory"
                  name="publicationHistory"
                  value={formData.publicationHistory}
                  onChange={handleInputChange}
                  placeholder="Briefly describe your content focus or recent coverage"
                  rows={4}
                  required
                  className="w-full px-4 py-3 bg-white/10 border border-gray-400/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/50 transition-all resize-none "
                />
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full bg-pink-500 hover:bg-pink-600 text-white text-lg px-8 py-4 rounded-xl font-semibold transition-all duration-300 hover:scale-105"
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
          onClick={handleJoinZenzers}
          className="w-full bg-pink-500 text-white hover:bg-pink-600"
        >
          Join Zenzers
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>

      <Footer />
    </div>
  );
}
