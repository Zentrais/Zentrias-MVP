'use client';

import { useEffect, useState } from 'react';
import Footer from '../../components/footer';
import { useLanguage } from '../../contexts/language-context';
import PodcastPlayer from '../../components/podcast/PodcastPlayer';

// List of all available podcast episodes
// Add new episodes here as you add audio files to /public/audio
const PODCAST_EPISODES = [
  {
    id: 'episode-1',
    audioUrl: '/audio/Designing_the_Internet_of_Integrity_E1.mp3',
    title: 'Episode 1: The Internet is broken. This is the fix',
    artist: 'Zentrais Team',
    intro: 'You scroll. You like. You share. And you still don\'t trust a damn thing you see. This episode rips the mask off today\'s internet. Fake outrage. Synthetic truth. Engagement without integrity. Nearly everything is optimized to manipulate you, not serve you. This conversation introduces Zentrais. Not as a miracle app. Not as a savior. But as a hard reset. A new digital operating logic built on truth, trust, and transparency. If you\'re tired of being the product, the data point, the manipulated click—press play. This is where the Internet stops lying to you.',
  },
  {
    id: 'episode-2',
    audioUrl: '/audio/The_Integrity_Economy_Versus_Speculation_E2.mp3',
    title: 'The Investor Is Broken — This Is the Relaunch',
    artist: 'Zentrais Team',
    intro: 'For decades, investing chased speed, exits, and artificial growth. The result is a system rich in capital and poor in trust. This episode is not about returns. It\'s about responsibility. A raw conversation that challenges investors to go back to square one, shed speculation, and reclaim their true role as builders of shared prosperity. Zentrais is not asking you to fund the future. It\'s asking you to rebuild it.',
  },
];

export default function PodcastPage() {
  const { t } = useLanguage();
  const [selectedEpisode, setSelectedEpisode] = useState(PODCAST_EPISODES[0]);
  const [autoPlay, setAutoPlay] = useState(false);

  useEffect(() => {
    document.title = `Zentrais | ${t('pagetitle.podcast')}`;
  }, [t]);

  const currentEpisodeIndex = PODCAST_EPISODES.findIndex(ep => ep.id === selectedEpisode.id);

  const handlePreviousEpisode = () => {
    if (currentEpisodeIndex > 0) {
      setAutoPlay(true);
      setSelectedEpisode(PODCAST_EPISODES[currentEpisodeIndex - 1]);
    }
  };

  const handleNextEpisode = () => {
    if (currentEpisodeIndex < PODCAST_EPISODES.length - 1) {
      setAutoPlay(true);
      setSelectedEpisode(PODCAST_EPISODES[currentEpisodeIndex + 1]);
    }
  };

  // Reset autoPlay after episode changes (wait longer to ensure audio starts)
  useEffect(() => {
    if (autoPlay) {
      // Reset autoPlay after audio has had time to start playing
      const timer = setTimeout(() => {
        setAutoPlay(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [selectedEpisode.id, autoPlay]);

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
                {t('podcast.title')}
              </h1>
            </div>

            {/* Podcast Player */}
            <div className="mb-12">
              <PodcastPlayer
                key={selectedEpisode.id}
                audioUrl={selectedEpisode.audioUrl}
                title={selectedEpisode.title}
                artist={selectedEpisode.artist}
                intro={selectedEpisode.intro}
                onPreviousEpisode={currentEpisodeIndex > 0 ? handlePreviousEpisode : undefined}
                onNextEpisode={currentEpisodeIndex < PODCAST_EPISODES.length - 1 ? handleNextEpisode : undefined}
                autoPlay={autoPlay}
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
