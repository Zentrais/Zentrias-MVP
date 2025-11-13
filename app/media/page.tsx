'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Button } from '../../components/ui/button';
import { Folder, Megaphone, BookOpen, ArrowRight } from 'lucide-react';
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

  const handleBecomeCollaborator = () => {
    window.location.href = 'mailto:collaborators@zentrais.com?subject=Become a Collaborator';
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
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Let's Break the Mold Section */}
      <section className="relative z-10 container mx-auto px-4 sm:px-6 py-12 sm:py-16 md:py-24">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left Section - Text Content */}
            <div className="text-left">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-white leading-tight font-sans">
                Let&apos;s Break{' '}
                <span className="text-pink-500">the Mold.</span>{' '}
                Together.
              </h1>
              <p className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed font-sans">
                Join a global network of creators and journalists reshaping how stories are told, powered by Zentrais&apos; Debate Engine for respectful, truth-driven dialogue.
              </p>
              <Button
                onClick={handleBecomeCollaborator}
                className="bg-pink-500 hover:bg-pink-600 text-white text-lg px-8 py-6 rounded-xl font-bold transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-pink-500/50"
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

      {/* Debate in Action Section */}
      <section className="relative z-10 container mx-auto px-4 sm:px-6 py-12 sm:py-16 md:py-24">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-white leading-tight font-sans">
              Debate in Action
            </h2>
            <p className="text-lg sm:text-xl text-gray-300 leading-relaxed font-sans max-w-3xl mx-auto">
              See how Zentrais&apos; Debate Engine turns noise into meaningful conversation, restoring trust in digital discourse.
            </p>
          </div>

          {/* Before and After Comparison */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {/* Before Box */}
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-red-400/30 p-6 sm:p-8">
              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-6 font-sans">Before</h3>
              <ul className="space-y-4 mb-6">
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-red-500 mt-2 flex-shrink-0"></div>
                  <span className="text-gray-200 text-sm sm:text-base leading-relaxed font-sans">
                    Polarized, emotional argument
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-red-500 mt-2 flex-shrink-0"></div>
                  <span className="text-gray-200 text-sm sm:text-base leading-relaxed font-sans">
                    Dimmer, chaotic visuals, overlapping comments, angry emojis, red tones
                  </span>
                </li>
              </ul>
              <p className="text-center text-red-400 font-semibold text-base sm:text-lg font-sans">
                The old internet rewarded outrage.
              </p>
            </div>

            {/* After Box */}
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-blue-400/30 p-6 sm:p-8">
              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-6 font-sans">After</h3>
              <ul className="space-y-4 mb-6">
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 flex-shrink-0"></div>
                  <span className="text-gray-200 text-sm sm:text-base leading-relaxed font-sans">
                    Respectful, solution-focused discussion
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 flex-shrink-0"></div>
                  <span className="text-gray-200 text-sm sm:text-base leading-relaxed font-sans">
                    Clean, balanced visuals calm discussion bubbles, mutual understanding, cool color tones
                  </span>
                </li>
              </ul>
              <p className="text-center text-blue-400 font-semibold text-base sm:text-lg font-sans">
                The new web rewards integrity.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Resources for Ethical Storytelling Section */}
      <section className="relative z-10 container mx-auto px-4 sm:px-6 py-12 sm:py-16 md:py-24">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white leading-tight font-sans">
            Resources for{' '}
            <span className="text-pink-500">Ethical</span>
            <br />
            Storytelling
          </h2>
          <p className="text-lg sm:text-xl md:text-2xl text-gray-300 leading-relaxed font-sans">
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
              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-6 font-sans">Press Kit</h3>
              <div className="flex justify-center mb-6">
                <div className="w-24 h-24 sm:w-28 sm:h-28 bg-amber-50/90 rounded-xl flex items-center justify-center">
                  <Folder className="w-12 h-12 sm:w-14 sm:h-14 text-amber-800" />
                </div>
              </div>
              <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-6 font-sans">
                Everything you need to cover Zentrals with accuracy and confidence, official logos, bios, brand assets, and our founding story.
              </p>
              <Button
                onClick={() => window.location.href = 'mailto:press@zentrais.com?subject=Press Kit Request'}
                className="w-full bg-pink-500 hover:bg-pink-600 text-white text-base sm:text-lg px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105"
              >
                Download Kit
              </Button>
            </div>

            {/* Press Release Card */}
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6 sm:p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-6 font-sans">Press Release</h3>
              <div className="flex justify-center mb-6">
                <div className="w-24 h-24 sm:w-28 sm:h-28 bg-amber-50/90 rounded-xl flex items-center justify-center">
                  <Megaphone className="w-12 h-12 sm:w-14 sm:h-14 text-red-600" />
                </div>
              </div>
              <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-6 font-sans">
                Stay informed with the latest announcements, and research shaping the Integrity Economy direct from the source.
              </p>
              <Button
                onClick={() => window.location.href = 'mailto:press@zentrais.com?subject=Press Release Updates'}
                className="w-full bg-pink-500 hover:bg-pink-600 text-white text-base sm:text-lg px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105"
              >
                View Updates
              </Button>
            </div>

            {/* Story Briefs Card */}
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6 sm:p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-6 font-sans">Story Briefs</h3>
              <div className="flex justify-center mb-6">
                <div className="w-24 h-24 sm:w-28 sm:h-28 bg-amber-50/90 rounded-xl flex items-center justify-center">
                  <BookOpen className="w-12 h-12 sm:w-14 sm:h-14 text-amber-900" />
                </div>
              </div>
              <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-6 font-sans">
                Explore ready-to-publish insights showing how the Debate Engine transforms digital conversation into meaningful exchange.
              </p>
              <Button
                onClick={() => window.location.href = 'mailto:press@zentrais.com?subject=Story Briefs Request'}
                className="w-full bg-pink-500 hover:bg-pink-600 text-white text-base sm:text-lg px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105"
              >
                Read Briefs
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Join the Zenzers Circle Form Section */}
      <section className="relative z-10 container mx-auto px-4 sm:px-6 py-12 sm:py-16 md:py-24">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6 sm:p-8 md:p-12 shadow-xl">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-white text-center font-sans">
              Join the Zenzers Circle
            </h2>
            <p className="text-lg sm:text-xl text-gray-300 mb-8 text-center leading-relaxed font-sans">
              Become part of a private media network committed to truth-driven storytelling and ethical influence.
            </p>

            <form onSubmit={handleFormSubmit} className="space-y-6">
              {/* Full Name */}
              <div>
                <label htmlFor="fullName" className="block text-white font-semibold mb-2 font-sans">
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
                  className="w-full px-4 py-3 bg-white/10 border border-gray-400/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/50 transition-all font-sans"
                />
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-white font-semibold mb-2 font-sans">
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
                  className="w-full px-4 py-3 bg-white/10 border border-gray-400/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/50 transition-all font-sans"
                />
              </div>

              {/* Media Type */}
              <div>
                <label htmlFor="mediaType" className="block text-white font-semibold mb-2 font-sans">
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
                  className="w-full px-4 py-3 bg-white/10 border border-gray-400/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/50 transition-all font-sans"
                />
              </div>

              {/* Platform or Outlet */}
              <div>
                <label htmlFor="platform" className="block text-white font-semibold mb-2 font-sans">
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
                  className="w-full px-4 py-3 bg-white/10 border border-gray-400/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/50 transition-all font-sans"
                />
              </div>

              {/* Follower Count / Audience Size */}
              <div>
                <label htmlFor="followerCount" className="block text-white font-semibold mb-2 font-sans">
                  Follower Count / Audience Size
                </label>
                <input
                  type="text"
                  id="followerCount"
                  name="followerCount"
                  value={formData.followerCount}
                  onChange={handleInputChange}
                  placeholder="(optional for influencers)"
                  className="w-full px-4 py-3 bg-white/10 border border-gray-400/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/50 transition-all font-sans"
                />
              </div>

              {/* Publication History / Focus Area */}
              <div>
                <label htmlFor="publicationHistory" className="block text-white font-semibold mb-2 font-sans">
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
                  className="w-full px-4 py-3 bg-white/10 border border-gray-400/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/50 transition-all resize-none font-sans"
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
          onClick={handleBecomeCollaborator}
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
