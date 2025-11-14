'use client';

import { useState, useEffect } from 'react';
import Footer from '../../components/footer';

export default function TermsPage() {
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

  return (
    <div className="min-h-screen text-white relative overflow-hidden" style={{ backgroundColor: '#36454F' }}>
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

      {/* Content Section */}
      <section className="relative z-10 container mx-auto px-4 sm:px-6 py-12 sm:py-16 md:py-24">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-12 text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 text-white font-sans mx-auto">
              ZENTRAIS TERMS OF SERVICE (TOS)
            </h1>
            <p className="text-base sm:text-lg text-gray-300 font-sans">
              Effective Date: 11/15/2025
            </p>
          </div>

          {/* Welcome to Zentrais */}
          <div className="mb-12">
            <p className="text-base sm:text-lg text-gray-300 leading-relaxed font-sans mb-4">
              Welcome to Zentrais.
            </p>
            <p className="text-base sm:text-lg text-gray-300 leading-relaxed font-sans mb-4">
              The following Terms of Service (&quot;Terms&quot;) govern your access to and use of the Zentrais platform, including Dialog, Perspective, and Exchange.
            </p>
            <p className="text-base sm:text-lg text-gray-300 leading-relaxed font-sans">
              By using Zentrais, you agree to these Terms. If you do not agree, stop using the platform.
            </p>
          </div>

          {/* Section 1 */}
          <div className="mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4 font-sans">
              1. ABOUT ZENTRAIS
            </h2>
            <p className="text-base sm:text-lg text-gray-300 leading-relaxed font-sans">
              Zentrais is a human-AI ecosystem built on three values: Truth, Trust, and Transparency.
            </p>
            <p className="text-base sm:text-lg text-gray-300 leading-relaxed font-sans mt-4">
              We aim to create an authentic environment where users engage responsibly and ethically.
            </p>
          </div>

          {/* Section 2 */}
          <div className="mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4 font-sans">
              2. ELIGIBILITY
            </h2>
            <p className="text-base sm:text-lg text-gray-300 leading-relaxed font-sans mb-4">
              To use Zentrais, you must:
            </p>
            <ul className="list-disc list-inside text-base sm:text-lg text-gray-300 leading-relaxed font-sans mb-6 space-y-2 ml-4">
              <li>Be at least 16 years old</li>
              <li>Have legal capacity to enter into agreements</li>
              <li>Agree to comply with all applicable laws</li>
            </ul>
            <p className="text-base sm:text-lg text-gray-300 leading-relaxed font-sans">
              If you use Zentrais on behalf of an organization, you confirm you have the authority to do so.
            </p>
          </div>

          {/* Section 3 */}
          <div className="mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4 font-sans">
              3. ACCOUNT CREATION
            </h2>
            <p className="text-base sm:text-lg text-gray-300 leading-relaxed font-sans mb-4">
              You may use Zentrais with or without an account.
            </p>
            <p className="text-base sm:text-lg text-gray-300 leading-relaxed font-sans mb-4">
              If you create an account:
            </p>
            <ul className="list-disc list-inside text-base sm:text-lg text-gray-300 leading-relaxed font-sans space-y-2 ml-4">
              <li>You must provide accurate information</li>
              <li>You must maintain the security of your credentials</li>
              <li>You are responsible for activity under your account</li>
            </ul>
          </div>

          {/* Section 4 */}
          <div className="mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4 font-sans">
              4. USER RESPONSIBILITIES
            </h2>
            <p className="text-base sm:text-lg text-gray-300 leading-relaxed font-sans mb-4">
              Unauthorized use must be reported immediately:
            </p>
            <p className="text-base sm:text-lg text-white leading-relaxed font-sans mb-6">
              security@zentrais.com
            </p>
            <p className="text-base sm:text-lg text-gray-300 leading-relaxed font-sans mb-4">
              You agree not to:
            </p>
            <ul className="list-disc list-inside text-base sm:text-lg text-gray-300 leading-relaxed font-sans mb-6 space-y-2 ml-4">
              <li>Violate any law</li>
              <li>Harass, harm, or exploit others</li>
              <li>Upload harmful code or attempt to breach systems</li>
              <li>Impersonate others or misrepresent identity</li>
              <li>Use Zentrais for illegal, fraudulent, or abusive purposes</li>
              <li>Interfere with platform integrity</li>
            </ul>
            <p className="text-base sm:text-lg text-gray-300 leading-relaxed font-sans">
              All interactions must honor the Integrity Economy.
            </p>
          </div>

          {/* Section 5 */}
          <div className="mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4 font-sans">
              5. USER CONTENT
            </h2>
            <p className="text-base sm:text-lg text-gray-300 leading-relaxed font-sans mb-4">
              You retain ownership of your content.
            </p>
            <p className="text-base sm:text-lg text-gray-300 leading-relaxed font-sans mb-4">
              By posting content on Zentrais, you grant us a non-exclusive, global, revocable license to:
            </p>
            <ul className="list-disc list-inside text-base sm:text-lg text-gray-300 leading-relaxed font-sans mb-6 space-y-2 ml-4">
              <li>Display content within the platform</li>
              <li>Moderate content to ensure safety</li>
              <li>Use anonymized content for performance improvement</li>
            </ul>
            <p className="text-base sm:text-lg text-gray-300 leading-relaxed font-sans mb-4">
              We do not use your personal content for external AI training or commercial datasets.
            </p>
            <p className="text-base sm:text-lg text-gray-300 leading-relaxed font-sans">
              We may remove content violating these Terms.
            </p>
          </div>

          {/* Section 6 */}
          <div className="mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4 font-sans">
              6. AI & AUTOMATION
            </h2>
            <p className="text-base sm:text-lg text-gray-300 leading-relaxed font-sans mb-4">
              Zentrais uses AI to enable conversation, moderation, and safety systems.
            </p>
            <p className="text-base sm:text-lg text-gray-300 leading-relaxed font-sans mb-4">
              You understand that:
            </p>
            <ul className="list-disc list-inside text-base sm:text-lg text-gray-300 leading-relaxed font-sans mb-6 space-y-2 ml-4">
              <li>AI may generate, recommend, or respond to content</li>
              <li>AI may make errors or misinterpret statements</li>
              <li>You are responsible for your actions based on the AI output</li>
            </ul>
            <p className="text-base sm:text-lg text-gray-300 leading-relaxed font-sans">
              We do not provide legal, medical, or financial advice through AI systems.
            </p>
          </div>

          {/* Section 7 */}
          <div className="mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4 font-sans">
              7. PROHIBITED USES
            </h2>
            <p className="text-base sm:text-lg text-gray-300 leading-relaxed font-sans mb-4">
              You may not use Zentrais to:
            </p>
            <ul className="list-disc list-inside text-base sm:text-lg text-gray-300 leading-relaxed font-sans mb-6 space-y-2 ml-4">
              <li>Exploit security vulnerabilities</li>
              <li>Promote violence or hate</li>
              <li>Spread misinformation intentionally</li>
              <li>Create deepfakes to harm others</li>
              <li>Conduct unauthorized scraping or data extraction</li>
              <li>Launder identity or manipulate Integrity Scores</li>
            </ul>
            <p className="text-base sm:text-lg text-gray-300 leading-relaxed font-sans">
              Violations can result in suspension or termination.
            </p>
          </div>

          {/* Section 8 */}
          <div className="mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4 font-sans">
              8. TERMINATION
            </h2>
            <p className="text-base sm:text-lg text-gray-300 leading-relaxed font-sans mb-4">
              We may suspend or terminate access if:
            </p>
            <ul className="list-disc list-inside text-base sm:text-lg text-gray-300 leading-relaxed font-sans mb-6 space-y-2 ml-4">
              <li>You violate these Terms</li>
              <li>You compromise platform security</li>
              <li>You abuse another user</li>
              <li>You create legal or safety risk</li>
            </ul>
            <p className="text-base sm:text-lg text-gray-300 leading-relaxed font-sans">
              You may terminate at any time by deleting your account.
            </p>
          </div>

          {/* Section 9 */}
          <div className="mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4 font-sans">
              9. DISCLAIMERS
            </h2>
            <p className="text-base sm:text-lg text-gray-300 leading-relaxed font-sans mb-4">
              Zentrais is provided &quot;as is&quot; without warranties of any kind.
            </p>
            <p className="text-base sm:text-lg text-gray-300 leading-relaxed font-sans mb-4">
              We do not guarantee:
            </p>
            <ul className="list-disc list-inside text-base sm:text-lg text-gray-300 leading-relaxed font-sans mb-6 space-y-2 ml-4">
              <li>Uninterrupted access</li>
              <li>Error-free performance</li>
              <li>Accuracy of AI-generated content</li>
            </ul>
            <p className="text-base sm:text-lg text-gray-300 leading-relaxed font-sans">
              You use the platform at your own discretion.
            </p>
          </div>

          {/* Section 10 */}
          <div className="mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4 font-sans">
              10. LIMITATION OF LIABILITY
            </h2>
            <p className="text-base sm:text-lg text-gray-300 leading-relaxed font-sans mb-4">
              To the fullest extent allowed by law:
            </p>
            <ul className="list-disc list-inside text-base sm:text-lg text-gray-300 leading-relaxed font-sans mb-6 space-y-2 ml-4">
              <li>Zentrais is not liable for damages, losses, or misuse arising from your use of the platform</li>
              <li>Liability is limited to the amount paid to Zentrais (if any) in the last 12 months</li>
            </ul>
            <p className="text-base sm:text-lg text-gray-300 leading-relaxed font-sans">
              Some jurisdictions may have additional rights; we honor them.
            </p>
          </div>

          {/* Section 11 */}
          <div className="mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4 font-sans">
              11. INDEMNIFICATION
            </h2>
            <p className="text-base sm:text-lg text-gray-300 leading-relaxed font-sans mb-4">
              You agree to indemnify Zentrais against claims arising from:
            </p>
            <ul className="list-disc list-inside text-base sm:text-lg text-gray-300 leading-relaxed font-sans space-y-2 ml-4">
              <li>Your violation of these Terms</li>
              <li>Your content</li>
              <li>Your misuse of the platform</li>
            </ul>
          </div>

          {/* Section 12 */}
          <div className="mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4 font-sans">
              12. CHANGES TO TERMS
            </h2>
            <p className="text-base sm:text-lg text-gray-300 leading-relaxed font-sans mb-4">
              We may update these Terms at any time.
            </p>
            <p className="text-base sm:text-lg text-gray-300 leading-relaxed font-sans mb-4">
              If materially changed, we will notify you.
            </p>
            <p className="text-base sm:text-lg text-gray-300 leading-relaxed font-sans">
              Continued use means acceptance.
            </p>
          </div>

          {/* Section 13 */}
          <div className="mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4 font-sans">
              13. GOVERNING LAW
            </h2>
            <p className="text-base sm:text-lg text-gray-300 leading-relaxed font-sans mb-4">
              This Agreement is governed by:
            </p>
            <ul className="list-disc list-inside text-base sm:text-lg text-gray-300 leading-relaxed font-sans space-y-2 ml-4">
              <li>Delaware law</li>
              <li>Local laws in your jurisdiction (when applicable by privacy law)</li>
            </ul>
          </div>

          {/* Section 14 */}
          <div className="mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4 font-sans">
              14. CONTACT
            </h2>
            <p className="text-base sm:text-lg text-white leading-relaxed font-sans mb-2">
              Zentrais Legal Office
            </p>
            <p className="text-base sm:text-lg text-white leading-relaxed font-sans">
              legal@zentrais.com
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

