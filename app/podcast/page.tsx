'use client';

import { useEffect } from 'react';
import Footer from '../../components/footer';
import { useLanguage } from '../../contexts/language-context';
import PodcastPlayer from '../../components/podcast/PodcastPlayer';

export default function PodcastPage() {
  const { t } = useLanguage();

  useEffect(() => {
    document.title = 'Zentrais | Our Perspective';
  }, []);

  // Audio file from public/audio folder
  const podcastAudioUrl = '/audio/Coldplay - Yellow (Official Video).mp3';

  return (
    <div className="min-h-screen relative flex flex-col w-full" style={{ transform: 'translateZ(0)', contain: 'layout style paint' }}>
      {/* Content */}
      <div className="relative z-10">
        {/* Content Section */}
        <section className="container mx-auto px-4 sm:px-6 pt-16 sm:pt-18 md:pt-20 pb-12 sm:pb-16 md:pb-24 flex-1 text-white">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="mb-12 text-center">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 text-white font-sans">
                Our Perspective
              </h1>
            </div>

            {/* Podcast Player */}
            <div className="mb-12">
              <PodcastPlayer
                audioUrl={podcastAudioUrl}
                title="Episode 1: Welcome to Zentrais"
                artist="Zentrais Team"
              />
            </div>
          </div>
        </section>

        <div className="mt-auto w-full flex-shrink-0 relative z-10">
          <Footer />
        </div>
      </div>
    </div>
  );
}
