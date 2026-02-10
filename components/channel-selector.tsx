'use client';

import { useState, useRef, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Image from 'next/image';
import { ChevronDown } from 'lucide-react';

type ChannelIcon = React.ComponentType<{ className?: string }> | string;

type Channel = {
  id: string;
  name: string;
  route: string;
  icon: ChannelIcon;
  colorClass?: string;
  isImage?: boolean;
};

const channels: Channel[] = [
  { id: 'user', name: 'User', route: '/user', icon: '/User.png', isImage: true },
  { id: 'investor', name: 'Investor', route: '/investors', icon: '/Investors.png', isImage: true },
  { id: 'collaborator', name: 'Collaborator', route: '/collaborator', icon: '/Collaborators.png', isImage: true },
  { id: 'media', name: 'Media', route: '/media', icon: '/Media.png', isImage: true },
  { id: 'podcast', name: 'Zentrais Explained!', route: '/podcast', icon: '/Zentrais Flaticon 150x150-03.png', isImage: true },
];

export default function ChannelSelector() {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Determinar el canal actual basado en la ruta
  const getCurrentChannel = () => {
    if (pathname.startsWith('/investors')) return channels.find(c => c.id === 'investor');
    if (pathname.startsWith('/collaborator')) return channels.find(c => c.id === 'collaborator');
    if (pathname.startsWith('/media')) return channels.find(c => c.id === 'media');
    if (pathname.startsWith('/podcast')) return channels.find(c => c.id === 'podcast');
    if (pathname.startsWith('/user')) return channels.find(c => c.id === 'user');
    return channels.find(c => c.id === 'user'); // Default
  };

  const currentChannel = getCurrentChannel() || channels[0];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleChannelChange = (route: string) => {
    router.push(route);
    setIsOpen(false);
  };

  const renderIcon = (channel: Channel, className?: string) => {
    // Special handling for collaborator icon (uses background-image to avoid any Image issues)
    if (channel.id === 'collaborator') {
      return (
        <div
          aria-label={channel.name}
          className={className || 'w-6 h-6'}
          style={{
            backgroundImage: 'url(/Collaborators.png)',
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
          }}
        />
      );
    }

    if (channel.isImage && typeof channel.icon === 'string') {
      return (
        <Image
          src={channel.icon}
          alt={channel.name}
          loading="eager"
          width={24}
          height={24}
          className={className || 'w-6 h-6'}
        />
      );
    }
    return null;
  };

  return (
    <div className="relative inline-block" ref={dropdownRef} style={{ verticalAlign: 'middle' }}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 text-white hover:opacity-80 transition-all duration-300 whitespace-nowrap"
        aria-label="Select channel"
        aria-expanded={isOpen}
        style={{ position: 'relative', zIndex: 1 }}
      >
        {renderIcon(currentChannel)}
        <span className="text-lg font-semibold">{currentChannel.name}</span>
        <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div 
          className="absolute right-0 w-56 bg-slate-900/95 backdrop-blur-lg border border-white/20 rounded-lg shadow-xl overflow-hidden"
          style={{ 
            zIndex: 1000,
            top: '100%',
            marginTop: '4px',
            position: 'absolute'
          }}
        >
          {channels.map((channel) => {
            const isActive = pathname.startsWith(channel.route);
            return (
              <button
                key={channel.id}
                onClick={() => handleChannelChange(channel.route)}
                className={`w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-white/10 transition-colors duration-200 ${
                  isActive ? 'bg-white/10' : ''
                }`}
              >
                {renderIcon(channel)}
                <span className="text-white text-sm font-medium flex-1">{channel.name}</span>
                {isActive && (
                  <span className="text-white/60 text-xs">✓</span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

