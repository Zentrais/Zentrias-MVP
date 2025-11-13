'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Raleway } from 'next/font/google';
import LanguageSelector from './language-selector';
import ChannelSelector from './channel-selector';

const raleway = Raleway({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  display: 'swap',
});

export default function Navbar() {
  const pathname = usePathname();
  
  // Rutas donde la navbar debe ser sticky
  const stickyRoutes = ['/', '/user', '/investors', '/collaborator', '/media'];
  const isSticky = stickyRoutes.includes(pathname);
  const isHomepage = pathname === '/';

  return (
    <nav 
      className={`w-full ${
        isHomepage 
          ? 'backdrop-blur-md shadow-sm border-a' 
          : 'bg-slate-900/95 backdrop-blur-lg shadow-lg border-b border-white/10'
      } ${
        isSticky ? 'fixed top-0 left-0 right-0 z-50' : ''
      }`}
    >
      <div className="flex justify-between items-center py-1.5 px-4 sm:px-6">
        {isHomepage ? (
          <>
            <div className="flex-1"></div>
            <Link 
              href="/" 
              className="flex items-center space-x-2 cursor-pointer hover:opacity-80 transition-all duration-300 hover:scale-105"
            >
              <Image
                src="/logo-pink.png"
                alt="Zentrais Logo"
                width={56}
                height={56}
                className="transition-transform duration-300 hover:scale-110"
              />
              <span className={`text-2xl font-normal tracking-normal text-gray-200 transition-colors duration-300 hover:text-white ${raleway.className}`} style={{ letterSpacing: '0.01em' }}>
                Zentrais
              </span>
            </Link>
            <div className="flex-1 flex justify-end items-center gap-4">
              <LanguageSelector />
            </div>
          </>
        ) : (
          <>
            <Link 
              href="/" 
              className="flex items-center space-x-2 cursor-pointer hover:opacity-80 transition-all duration-300 hover:scale-105"
            >
              <Image
                src="/logo-pink.png"
                alt="Zentrais Logo"
                width={56}
                height={56}
                className="transition-transform duration-300 hover:scale-110"
              />
              <span className={`text-2xl font-normal tracking-normal text-gray-200 transition-colors duration-300 hover:text-white ${raleway.className}`} style={{ letterSpacing: '0.01em' }}>
                Zentrais
              </span>
            </Link>
            <div className="flex justify-end items-center gap-4">
              <ChannelSelector />
              <LanguageSelector />
            </div>
          </>
        )}
      </div>
    </nav>
  );
}

