'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Twitter, Github, Linkedin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative z-20 bg-[#1a1e26] border-t border-slate-800">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 mb-8">
          {/* Left Column - Zentrais Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Image
                src="/logo-pink.png"
                alt="Zentrais Logo"
                width={60}
                height={60}
                className="object-contain"
              />
              <span className="text-white font-bold text-xl font-sans">Zentrais</span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed font-sans">
              Zentrais is a digital space for the exploratory thinker, achieving deep digital integrity through authentic Human-AI symbiosis.
            </p>
            <div className="flex items-center gap-4">
              <a 
                href="https://twitter.com/zentrais" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-white transition-colors duration-300"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a 
                href="https://github.com/zentrais" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-white transition-colors duration-300"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
              <a 
                href="https://www.linkedin.com/company/zentrais-llc/posts/?feedView=all" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-white transition-colors duration-300"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Middle Column - Company Links */}
          <div className="space-y-4">
            <h3 className="text-white font-bold text-base font-sans">Company</h3>
            <div className="flex flex-col gap-3">
              <Link 
                href="/about" 
                className="text-slate-400 hover:text-white transition-colors duration-300 font-sans text-sm"
              >
                About
              </Link>
              <Link 
                href="/contact" 
                className="text-slate-400 hover:text-white transition-colors duration-300 font-sans text-sm"
              >
                Contact
              </Link>
            </div>
          </div>

          {/* Right Column - Legal Links */}
          <div className="space-y-4">
            <h3 className="text-white font-bold text-base font-sans">Legal</h3>
            <div className="flex flex-col gap-3">
              <Link 
                href="/privacy" 
                className="text-slate-400 hover:text-white transition-colors duration-300 font-sans text-sm"
              >
                Privacy Policy
              </Link>
              <Link 
                href="/terms" 
                className="text-slate-400 hover:text-white transition-colors duration-300 font-sans text-sm"
              >
                Terms
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-slate-800 pt-8 space-y-4">
          <p className="text-slate-400 italic text-sm font-sans text-center md:text-left">
            Zentrais is redefining how stories of truth are told: through integrity, transparency, and human connection.
          </p>
          <p className="text-slate-500 text-sm font-sans text-center md:text-left">
            © 2025 Zentrais. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

