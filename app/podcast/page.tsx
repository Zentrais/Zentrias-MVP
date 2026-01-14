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
  // Add more episodes here as you add audio files:
  // {
  //   id: 'episode-2',
  //   audioUrl: '/audio/Your_New_Episode.mp3',
  //   title: 'Episode 2: Your Episode Title',
  //   artist: 'Zentrais Team',
  //   intro: 'Your intro text here',
  // },
];

export default function PodcastPage() {
  const { t } = useLanguage();
  const [selectedEpisode, setSelectedEpisode] = useState(PODCAST_EPISODES[0]);

  useEffect(() => {
    document.title = 'Zentrais | Our Perspective';
  }, []);

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

            {/* Episode Selector */}
            {PODCAST_EPISODES.length > 1 && (
              <div className="mb-8">
                <label className="block text-sm font-medium text-white/70 mb-3 font-sans">
                  Select Episode
                </label>
                <select
                  value={selectedEpisode.id}
                  onChange={(e) => {
                    const episode = PODCAST_EPISODES.find(ep => ep.id === e.target.value);
                    if (episode) setSelectedEpisode(episode);
                  }}
                  className="w-full max-w-md mx-auto block px-4 py-2 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 text-white font-sans focus:outline-none focus:ring-2 focus:ring-pink-400/50"
                >
                  {PODCAST_EPISODES.map((episode) => (
                    <option key={episode.id} value={episode.id} className="bg-gray-900">
                      {episode.title}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Podcast Player */}
            <div className="mb-12">
              <PodcastPlayer
                key={selectedEpisode.id}
                audioUrl={selectedEpisode.audioUrl}
                title={selectedEpisode.title}
                artist={selectedEpisode.artist}
                intro={selectedEpisode.intro}
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
