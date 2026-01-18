'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import LanguageSelector from './language-selector';
import ChannelSelector from './channel-selector';

export default function Navbar() {
  const pathname = usePathname();
  
  // Rutas donde la navbar debe ser sticky
  const stickyRoutes = ['/', '/user', '/investors', '/collaborator', '/media', '/podcast', '/privacy', '/about', '/contact', '/career', '/reviews', '/terms', '/cookie-policy', '/security-policy', '/legal-center', '/dpa', '/legal-compliance-handbook', '/gdpr-cookie-consent', '/legal-governance-suite'];
  const isSticky = stickyRoutes.includes(pathname);
  const isHomepage = pathname === '/';

  return (
    <nav 
      className={`w-full backdrop-blur-sm shadow-sm border-b border-white/5 ${
        isSticky ? 'fixed top-0 left-0 right-0 z-50' : ''
      }`}
      style={{
        background: 'linear-gradient(to bottom, rgba(34, 23, 43, 0.98) 0%, rgba(34, 23, 43, 0.98) 70%, rgba(37, 24, 46, 0.98) 85%, rgba(39, 25, 48, 0.98) 100%)',
        backdropFilter: 'blur(8px) saturate(180%)',
        WebkitBackdropFilter: 'blur(8px) saturate(180%)',
        overflow: 'visible'
      }}
    >
      <div className="flex justify-between items-center py-0 px-4 sm:px-6" style={{ height: 'auto', overflow: 'visible', position: 'relative' }}>
        {isHomepage ? (
          <>
            <div className="flex-1"></div>
            <Link 
              href="/" 
              className="group flex items-center cursor-pointer hover:opacity-80 transition-all duration-300"
              style={{ gap: '0.5px', alignItems: 'center' }}
            >
              <Image
                src="/Zentrais Flaticon 150x150-03.png"
                alt="Zentrais Logo"
                width={36}
                height={36}
                className="w-5 h-5 sm:w-7 sm:h-7 md:w-9 md:h-9 lg:w-11 lg:h-11 transition-transform duration-300 group-hover:scale-110 self-center"
              />
              <Image
                src="/logo-1.png"
                alt="Zentrais"
                width={130}
                height={130}
                className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 xl:w-36 xl:h-36 transition-transform duration-300 group-hover:scale-110 object-contain self-center"
                style={{ marginTop: '4px' }}
              />
            </Link>
            <div className="flex-1 flex justify-end items-center gap-4">
              <LanguageSelector />
            </div>
          </>
        ) : (
          <>
            <Link 
              href="/" 
              className="group flex items-center cursor-pointer hover:opacity-80 transition-all duration-300"
              style={{ gap: '0.5px', alignItems: 'center' }}
            >
              <Image
                src="/Zentrais Flaticon 150x150-03.png"
                alt="Zentrais Logo"
                width={36}
                height={36}
                className="w-5 h-5 sm:w-7 sm:h-7 md:w-9 md:h-9 lg:w-11 lg:h-11 transition-transform duration-300 group-hover:scale-110 self-center"
              />
              <Image
                src="/logo-1.png"
                alt="Zentrais"
                width={130}
                height={130}
                className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 xl:w-36 xl:h-36 transition-transform duration-300 group-hover:scale-110 object-contain self-center"
                style={{ marginTop: '4px' }}
              />
            </Link>
            <div className="flex justify-end items-center gap-4" style={{ position: 'relative' }}>
              {/* Enter MVP Button */}
              <Link 
                href="/"
                className="relative bg-pink-500/18 backdrop-blur-sm rounded-full border border-pink-400/40 shadow-lg px-4 py-2 transition-all duration-300 hover:bg-pink-500/25 hover:border-pink-400/60 group"
                style={{ 
                  backdropFilter: 'blur(20px) saturate(180%)',
                  WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                  boxShadow: '0 4px 16px 0 rgba(244, 114, 182, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.05) inset',
                }}
              >
                {/* Inner glow effect */}
                <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-300 pointer-events-none" style={{ 
                  background: 'radial-gradient(circle at center, rgba(244, 114, 182, 0.5) 0%, transparent 70%)',
                }}></div>
                
                {/* Content */}
                <span className="relative z-10 text-white font-extrabold text-sm sm:text-base tracking-tight drop-shadow-lg whitespace-nowrap">
                  Enter the MVP →
                </span>
              </Link>
              <ChannelSelector />
              <LanguageSelector />
            </div>
          </>
        )}
      </div>
    </nav>
  );
}

