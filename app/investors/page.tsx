'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '../../components/ui/button';
import { ArrowRight, Download, Mail, Play, Users, Zap, DollarSign, Calendar, Star } from 'lucide-react';
import Footer from '../../components/footer';
import { useLanguage } from '../../contexts/language-context';

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

  const timelineMilestones = [
    {
      quarter: 'Q1 2026',
      title: 'Chat & Debate MVP Environments Live',
      icon: Zap,
    },
    {
      quarter: 'Q2 2026',
      title: 'Integrity Token Economy Activated',
      icon: DollarSign,
    },
    {
      quarter: 'Q3 2026',
      title: 'Marketplace Launch & Expansion Phase',
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
    },
    {
      name: 'Antonio Lovera',
      role: 'Co-Founder, CTO & Chief Brand Architect',
      bio: 'Fuses technology and storytelling to make integrity the core operating system of human-AI collaboration.',
    },
    {
      name: 'David Shagalov',
      role: 'Co-Founder, COO & Chief Integrity Officer',
      bio: 'Builds ethical systems and operational frameworks that keep integrity measurable, actionable, and alive.',
    },
  ];

  const handleDataRoom = () => {
    window.location.href = 'mailto:investors@zentrais.com?subject=Data Room Access Request';
  };

  const handleInvestorDeck = () => {
    window.location.href = 'mailto:investors@zentrais.com?subject=Investor Deck Request';
  };

  const handleInvestorRelations = () => {
    window.location.href = 'mailto:investors@zentrais.com';
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Investing in Integrity Section */}
      <section className="relative z-10 container mx-auto px-4 sm:px-6 py-12 sm:py-16 md:py-24">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-white leading-tight font-sans">
            Investing in Integrity.{' '}
            <span className="text-pink-500">Not Hype</span>
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-12 leading-relaxed font-sans max-w-3xl mx-auto">
            Empowering visionary investors to build trust-driven markets where transparency fuels real returns.
          </p>

          {/* Video Placeholder */}
          <div className="mb-8 sm:mb-12">
            <div className="w-full max-w-4xl mx-auto bg-slate-800/50 rounded-3xl border border-indigo-400/30 p-16 sm:p-20 md:p-24 flex items-center justify-center min-h-[300px] sm:min-h-[400px] md:min-h-[500px]">
              <div className="text-center">
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-400 font-sans">
                  Explainer
                </div>
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-400 font-sans">
                  Video
                </div>
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              onClick={handleInvestorRelations}
              className="bg-pink-500 hover:bg-pink-600 text-white text-lg px-8 py-6 rounded-xl font-semibold transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-pink-500/50 group relative overflow-hidden w-full sm:w-auto"
            >
              <span className="relative z-10 flex items-center gap-2">
                Know Investors
                <ArrowRight className="w-5 h-5 transition-transform duration-500 group-hover:translate-x-1" />
              </span>
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1500"></span>
            </Button>
            <Button
              onClick={() => router.push('https://cal.com/zentrais/investor-relations')}
              variant="outline"
              className="border-pink-500 text-pink-500 hover:bg-pink-500/10 text-lg px-8 py-6 rounded-xl font-semibold transition-all duration-500 hover:scale-105 w-full sm:w-auto"
            >
              <Play className="w-5 h-5 mr-2" />
              Watch Video
            </Button>
          </div>
        </div>
      </section>

      {/* Find Your Investor Type Section */}
      <section className="relative z-10 container mx-auto px-4 sm:px-6 py-12 sm:py-16 md:py-24">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-white leading-tight font-sans">
              Find Your Investor{' '}
              <span className="text-pink-500">Type</span>
            </h2>
            <p className="text-lg sm:text-xl text-gray-300 leading-relaxed font-sans max-w-2xl mx-auto">
              Discover how your investment philosophy aligns with the Integrity Economy.
            </p>
          </div>

          {/* Investor Type Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-12">
            {/* Frontier Investor */}
            <div className="bg-slate-800/30 backdrop-blur-sm rounded-2xl border border-pink-400/20 p-6 sm:p-8 hover:border-pink-400/40 transition-all duration-300 hover:shadow-lg hover:shadow-pink-500/10 flex flex-col">
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-4 font-sans">
                Frontier Investor
              </h3>
              <p className="text-gray-300 text-sm sm:text-base mb-6 flex-1 leading-relaxed font-sans">
                For early adopters driving high-growth innovation in trust and technology.
              </p>
              <div className="mt-auto">
                <button className="text-pink-500 hover:text-pink-400 underline font-semibold text-sm sm:text-base font-sans transition-colors">
                  Learn More
                </button>
              </div>
            </div>

            {/* Impact Investor */}
            <div className="bg-slate-800/30 backdrop-blur-sm rounded-2xl border border-pink-400/20 p-6 sm:p-8 hover:border-pink-400/40 transition-all duration-300 hover:shadow-lg hover:shadow-pink-500/10 flex flex-col">
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-4 font-sans">
                Impact Investor
              </h3>
              <p className="text-gray-300 text-sm sm:text-base mb-6 flex-1 leading-relaxed font-sans">
                For investors aligning capital with measurable ethical, and social impact.
              </p>
              <div className="mt-auto">
                <button className="text-pink-500 hover:text-pink-400 underline font-semibold text-sm sm:text-base font-sans transition-colors">
                  Learn More
                </button>
              </div>
            </div>

            {/* Legacy Investor */}
            <div className="bg-slate-800/30 backdrop-blur-sm rounded-2xl border border-pink-400/20 p-6 sm:p-8 hover:border-pink-400/40 transition-all duration-300 hover:shadow-lg hover:shadow-pink-500/10 flex flex-col">
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-4 font-sans">
                Legacy Investor
              </h3>
              <p className="text-gray-300 text-sm sm:text-base mb-6 flex-1 leading-relaxed font-sans">
                For Stewards of long-term value and intergenerational trust.
              </p>
              <div className="mt-auto">
                <button className="text-pink-500 hover:text-pink-400 underline font-semibold text-sm sm:text-base font-sans transition-colors">
                  Learn More
                </button>
              </div>
            </div>
          </div>

          {/* Join Hub Button */}
          <div className="text-center">
            <Button
              onClick={handleInvestorRelations}
              className="bg-pink-500 hover:bg-pink-600 text-white text-lg px-8 py-6 rounded-xl font-bold transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-pink-500/50"
            >
              Join Hub
            </Button>
          </div>
        </div>
      </section>

      {/* The Attention Economy Is Collapsing Section */}
      <section className="relative z-10 container mx-auto px-4 sm:px-6 py-12 sm:py-16 md:py-24">
        <div className="max-w-6xl mx-auto">
          {/* Main Headline */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white leading-tight font-sans text-center">
            The Attention Economy Is Collapsing.{' '}
            <span className="text-pink-500">Integrity Is Next.</span>
          </h2>

          {/* Descriptive Paragraph */}
          <p className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-12 leading-relaxed font-sans text-center max-w-4xl mx-auto">
            Every digital system today monetizes distraction. Zentrais replaces it with a new metric,{' '}
            <span className="text-pink-500 font-semibold">Integrity Value</span>: turning truth into the world&apos;s next sustainable asset class.
          </p>

          {/* Statistical Boxes */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {/* Box 1: Global AI Market */}
            <div className="bg-pink-500/10 backdrop-blur-sm rounded-2xl border border-pink-400/30 p-6 sm:p-8 hover:border-pink-400/60 transition-all duration-300 hover:scale-105">
              <div className="text-4xl sm:text-5xl md:text-6xl font-bold text-pink-500 mb-2 font-sans">
                $300B+
              </div>
              <div className="text-white text-lg sm:text-xl font-semibold mb-1 font-sans">
                Global AI Market
              </div>
              <div className="text-gray-300 text-sm sm:text-base font-sans">
                by 2026
              </div>
            </div>

            {/* Box 2: CAGR Growth */}
            <div className="bg-pink-500/10 backdrop-blur-sm rounded-2xl border border-pink-400/30 p-6 sm:p-8 hover:border-pink-400/60 transition-all duration-300 hover:scale-105">
              <div className="text-4xl sm:text-5xl md:text-6xl font-bold text-pink-500 mb-2 font-sans">
                48%
              </div>
              <div className="text-white text-lg sm:text-xl font-semibold mb-1 font-sans">
                CAGR Growth
              </div>
              <div className="text-gray-300 text-sm sm:text-base font-sans">
                in trust-based platforms
              </div>
            </div>

            {/* Box 3: Valuation Uplift */}
            <div className="bg-pink-500/10 backdrop-blur-sm rounded-2xl border border-pink-400/30 p-6 sm:p-8 hover:border-pink-400/60 transition-all duration-300 hover:scale-105">
              <div className="text-4xl sm:text-5xl md:text-6xl font-bold text-pink-500 mb-2 font-sans">
                5×
              </div>
              <div className="text-white text-lg sm:text-xl font-semibold mb-1 font-sans">
                Valuation Uplift
              </div>
              <div className="text-gray-300 text-sm sm:text-base font-sans">
                early movers in ethical AI
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trusted Voices Section */}
      <section className="relative z-10 container mx-auto px-4 sm:px-6 py-12 sm:py-16 md:py-24">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-white leading-tight font-sans">
              Trusted Voices
            </h2>
            <p className="text-lg sm:text-xl text-gray-300 leading-relaxed font-sans max-w-2xl mx-auto">
              Hear from the investors and partners shaping the Integrity Economy.
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
              <p className="text-gray-200 text-sm sm:text-base mb-6 leading-relaxed font-sans italic">
                &quot;Zentrals brings transparency and trust to a space that desperately needs it.&quot;
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-400 to-purple-500 flex-shrink-0"></div>
                <div>
                  <div className="text-white font-semibold text-sm sm:text-base font-sans">Sarah Chen</div>
                  <div className="text-gray-400 text-xs sm:text-sm font-sans">Chief Financial Officer</div>
                  <div className="text-gray-500 text-xs font-sans">Investor</div>
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
              <p className="text-gray-200 text-sm sm:text-base mb-6 leading-relaxed font-sans italic">
                &quot;Investing through Zentrals feels like aligning profit with purpose.&quot;
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-cyan-500 flex-shrink-0"></div>
                <div>
                  <div className="text-white font-semibold text-sm sm:text-base font-sans">Michael Rodriguez</div>
                  <div className="text-gray-400 text-xs sm:text-sm font-sans">VP of Risk Management</div>
                  <div className="text-gray-500 text-xs font-sans">Investor</div>
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
              <p className="text-gray-200 text-sm sm:text-base mb-6 leading-relaxed font-sans italic">
                &quot;Their integrity-first approach makes frontier investments less risky and more meaningful.&quot;
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-400 to-pink-500 flex-shrink-0"></div>
                <div>
                  <div className="text-white font-semibold text-sm sm:text-base font-sans">Jennifer Park</div>
                  <div className="text-gray-400 text-xs sm:text-sm font-sans">Head of E-Commerce</div>
                  <div className="text-gray-500 text-xs font-sans">Investor</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* A Message From Our Founder Section */}
      <section className="relative z-10 container mx-auto px-4 sm:px-6 py-12 sm:py-16 md:py-24">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white leading-tight font-sans">
            A Message From{' '}
            <span className="text-pink-500">Our Founder</span>
          </h2>
          <p className="text-lg sm:text-xl md:text-2xl text-gray-300 leading-relaxed font-sans">
            How Zentrais is redefining trust, transparency, and value in investing.
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
                <div className="text-center text-gray-400 text-lg font-sans">
                  Content Placeholder
                </div>
              </div>
            </div>

            {/* Bullet Points Box - Right */}
            <div className="lg:col-span-1">
              <div className="bg-slate-800/80 backdrop-blur-sm rounded-2xl border border-indigo-400/30 p-6 sm:p-8 h-full">
                <ul className="space-y-4 sm:space-y-6">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-pink-500 mt-2 flex-shrink-0"></div>
                    <span className="text-gray-200 text-sm sm:text-base leading-relaxed font-sans">
                      Building the Integrity Economy from the ground up
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-pink-500 mt-2 flex-shrink-0"></div>
                    <span className="text-gray-200 text-sm sm:text-base leading-relaxed font-sans">
                      Aligning capital with ethical and financial returns
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-pink-500 mt-2 flex-shrink-0"></div>
                    <span className="text-gray-200 text-sm sm:text-base leading-relaxed font-sans">
                      Empowering investors to take meaningful action
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Join Hub Button - Centered */}
          <div className="text-center">
            <Button
              onClick={handleInvestorRelations}
              className="bg-pink-500 hover:bg-pink-600 text-white text-lg px-8 py-6 rounded-xl font-bold transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-pink-500/50"
            >
              Join Hub
            </Button>
          </div>
        </div>
      </section>

      {/* The Team Behind the Transformation Section */}
      <section className="relative z-10 container mx-auto px-4 sm:px-6 py-12 sm:py-16 md:py-24">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-white leading-tight font-sans">
              The Team Behind the{' '}
              <span className="text-pink-500">Transformation</span>
            </h2>
          </div>

          {/* Team Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {teamMembers.map((member, index) => {
              const initials = member.name
                .split(' ')
                .map(n => n[0])
                .join('')
                .toUpperCase();
              
              return (
                <div
                  key={index}
                  className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6 sm:p-8 hover:border-pink-400/30 transition-all duration-300 hover:scale-105 hover:shadow-xl"
                >
                  {/* Avatar Circle with Gradient */}
                  <div className="flex justify-center mb-6">
                    <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-sky-400 flex items-center justify-center">
                      <span className="text-white text-2xl sm:text-3xl font-bold font-sans">
                        {initials}
                      </span>
                    </div>
                  </div>

                  {/* Name */}
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 text-center font-sans">
                    {member.name}
                  </h3>

                  {/* Title */}
                  <p className="text-pink-500 text-sm sm:text-base font-semibold mb-4 text-center font-sans">
                    {member.role}
                  </p>

                  {/* Description */}
                  <p className="text-gray-300 text-sm sm:text-base leading-relaxed text-center font-sans">
                    {member.bio}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Access the Investor Hub Form Section */}
      <section className="relative z-10 container mx-auto px-4 sm:px-6 py-12 sm:py-16 md:py-24">
        <div className="max-w-2xl mx-auto">
          <div className="bg-slate-900/60 backdrop-blur-sm rounded-2xl border border-indigo-400/30 p-8 sm:p-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-white leading-tight font-sans text-center">
              Access the Investor Hub
            </h2>
            <p className="text-lg sm:text-xl text-gray-300 mb-8 leading-relaxed font-sans text-center">
              Unlock exclusive insights, governance data, and private briefings.
            </p>
            
            <form 
              onSubmit={(e) => {
                e.preventDefault();
                handleInvestorRelations();
              }}
              className="space-y-6"
            >
              <div>
                <label htmlFor="full-name" className="block text-white font-medium mb-2 text-sm sm:text-base font-sans">
                  Full Name
                </label>
                <input
                  id="full-name"
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  placeholder="We'd love to get to know you"
                  className="w-full px-4 py-3 rounded-lg border border-indigo-400/30 bg-slate-800/50 text-white placeholder-gray-400 focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/20 transition-all font-sans text-sm sm:text-base"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="role-organization" className="block text-white font-medium mb-2 text-sm sm:text-base font-sans">
                  Role/Organization
                </label>
                <input
                  id="role-organization"
                  type="text"
                  value={formData.roleOrganization}
                  onChange={(e) => setFormData({ ...formData, roleOrganization: e.target.value })}
                  placeholder="Role"
                  className="w-full px-4 py-3 rounded-lg border border-indigo-400/30 bg-slate-800/50 text-white placeholder-gray-400 focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/20 transition-all font-sans text-sm sm:text-base"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="investment-focus" className="block text-white font-medium mb-2 text-sm sm:text-base font-sans">
                  Investment Focus
                </label>
                <input
                  id="investment-focus"
                  type="text"
                  value={formData.investmentFocus}
                  onChange={(e) => setFormData({ ...formData, investmentFocus: e.target.value })}
                  placeholder="Frontier / Impact / Legacy"
                  className="w-full px-4 py-3 rounded-lg border border-indigo-400/30 bg-slate-800/50 text-white placeholder-gray-400 focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/20 transition-all font-sans text-sm sm:text-base"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="amount-interested" className="block text-white font-medium mb-2 text-sm sm:text-base font-sans">
                  Amount Interested
                </label>
                <input
                  id="amount-interested"
                  type="text"
                  value={formData.amountInterested}
                  onChange={(e) => setFormData({ ...formData, amountInterested: e.target.value })}
                  placeholder="USD"
                  className="w-full px-4 py-3 rounded-lg border border-indigo-400/30 bg-slate-800/50 text-white placeholder-gray-400 focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/20 transition-all font-sans text-sm sm:text-base"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-white font-medium mb-2 text-sm sm:text-base font-sans">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="youremail@gmail.com"
                  className="w-full px-4 py-3 rounded-lg border border-indigo-400/30 bg-slate-800/50 text-white placeholder-gray-400 focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/20 transition-all font-sans text-sm sm:text-base"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="comments" className="block text-white font-medium mb-2 text-sm sm:text-base font-sans">
                  Comments / Notes
                </label>
                <textarea
                  id="comments"
                  value={formData.comments}
                  onChange={(e) => setFormData({ ...formData, comments: e.target.value })}
                  placeholder="Tell us something"
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg border border-indigo-400/30 bg-slate-800/50 text-white placeholder-gray-400 focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/20 transition-all font-sans text-sm sm:text-base resize-none"
                />
              </div>
              
              <button
                type="submit"
                className="w-full bg-pink-500 hover:bg-pink-600 text-white font-bold py-4 px-6 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-pink-500/30 text-base sm:text-lg font-sans"
              >
                Submit Form
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer Statement */}
      <footer className="relative z-10 border-t border-indigo-400/20 bg-slate-900/95 backdrop-blur-lg">
        <div className="container mx-auto px-6 py-12 text-center">
          <p className="text-2xl md:text-3xl font-semibold text-indigo-200 font-sans">
            {t('investors.footer')}
          </p>
        </div>
      </footer>

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
