'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX } from 'lucide-react';

interface PodcastPlayerProps {
  audioUrl: string;
  imageUrl?: string;
  title?: string;
  artist?: string;
  intro?: string;
  onPreviousEpisode?: () => void;
  onNextEpisode?: () => void;
  autoPlay?: boolean;
}

export default function PodcastPlayer({ audioUrl, imageUrl, title = 'Podcast Episode', artist = 'Zentrais', intro, onPreviousEpisode, onNextEpisode, autoPlay = false }: PodcastPlayerProps) {
  const waveformRef = useRef<HTMLDivElement>(null);
  const audioElementRef = useRef<HTMLAudioElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const dataArrayRef = useRef<Uint8Array | null>(null);
  const timeDataArrayRef = useRef<Uint8Array | null>(null);
  const audioSourceRef = useRef<MediaElementAudioSourceNode | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const previousWaveDataRef = useRef<number[]>([]); // For smooth interpolation of bar heights
  const skipBackClickRef = useRef<number>(0);
  const skipForwardClickRef = useRef<number>(0);
  const autoPlayRef = useRef(autoPlay);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [volume, setVolume] = useState(1); // Volume 0-1
  const [isMuted, setIsMuted] = useState(false);

  // Keep autoPlay ref in sync
  useEffect(() => {
    autoPlayRef.current = autoPlay;
  }, [autoPlay]);

  // Format time helper
  const formatTime = (seconds: number): string => {
    if (isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Smooth interpolation function (easing)
  const smoothInterpolate = (current: number, target: number, factor: number): number => {
    return current + (target - current) * factor;
  };

  // Draw frequency bars visualizer (modern Spotify/Apple Music style)
  const drawBars = useCallback((frequencyData: Uint8Array, isSilent: boolean = false) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Get canvas dimensions
    const width = canvas.width / (window.devicePixelRatio || 1);
    const height = canvas.height / (window.devicePixelRatio || 1);

    // Clear canvas with transparent background (liquid glass effect)
    ctx.clearRect(0, 0, width, height);

    // Visualizer settings
    const barCount = 31; // Number of bars (reduced to remove dead high-frequency bars)
    const barWidth = width / barCount;
    const maxBarHeight = height * 0.85; // Maximum bar height (85% of canvas)
    const minBarHeight = height * 0.08; // Minimum bar height (8% of canvas) - visible minimum
    const barSpacing = barWidth * 0.5; // Clean spacing between bars (50% of bar width)
    const actualBarWidth = barWidth - barSpacing;
    const borderRadius = actualBarWidth * 0.3; // Rounded corners

    // Limit to frequencies that actually have information (low and mid frequencies only)
    // Ignore high frequencies that don't contribute movement
    const maxBin = Math.min(220, frequencyData.length); // Reduced from 300 to 220 to focus on active frequencies
    const binStep = Math.floor(maxBin / barCount);

    // Draw bars
    for (let i = 0; i < barCount; i++) {
      // When silent: all bars at exact same uniform height
      if (isSilent) {
        // Force all bars to exact same height (minBarHeight)
        const barHeight = minBarHeight;
        
        // Ensure previousWaveDataRef is initialized with uniform height
        if (previousWaveDataRef.current.length === 0) {
          previousWaveDataRef.current = new Array(barCount).fill(minBarHeight);
        } else {
          // Force this bar to uniform height
          previousWaveDataRef.current[i] = minBarHeight;
        }

        // Calculate bar position (centered vertically)
        const x = i * barWidth + barSpacing / 2;
        const y = (height - barHeight) / 2;

        // Liquid glass gradient: translucent with glass effect
        const gradient = ctx.createLinearGradient(x, y, x, y + barHeight);
        const baseColor = 220;
        const colorVariation = 30;
        
        gradient.addColorStop(0, `rgba(${baseColor}, ${baseColor}, ${baseColor + 10}, 0.35)`);
        gradient.addColorStop(0.3, `rgba(${baseColor + 10}, ${baseColor + 10}, ${baseColor + 15}, 0.5)`);
        gradient.addColorStop(0.7, `rgba(${baseColor + colorVariation}, ${baseColor + colorVariation}, ${baseColor + colorVariation + 10}, 0.45)`);
        gradient.addColorStop(1, `rgba(${baseColor + colorVariation * 0.5}, ${baseColor + colorVariation * 0.5}, ${baseColor + colorVariation * 0.5 + 10}, 0.4)`);

        // Draw bar with rounded corners
        ctx.fillStyle = gradient;
        ctx.beginPath();
        const radius = Math.min(borderRadius, actualBarWidth / 2, barHeight / 2);
        ctx.moveTo(x + radius, y);
        ctx.lineTo(x + actualBarWidth - radius, y);
        ctx.quadraticCurveTo(x + actualBarWidth, y, x + actualBarWidth, y + radius);
        ctx.lineTo(x + actualBarWidth, y + barHeight - radius);
        ctx.quadraticCurveTo(x + actualBarWidth, y + barHeight, x + actualBarWidth - radius, y + barHeight);
        ctx.lineTo(x + radius, y + barHeight);
        ctx.quadraticCurveTo(x, y + barHeight, x, y + barHeight - radius);
        ctx.lineTo(x, y + radius);
        ctx.quadraticCurveTo(x, y, x + radius, y);
        ctx.closePath();
        ctx.fill();

        // Liquid glass border
        ctx.strokeStyle = `rgba(255, 255, 255, 0.2)`;
        ctx.lineWidth = 0.5;
        ctx.stroke();

        // Soft glow effect
        ctx.shadowBlur = 12;
        ctx.shadowColor = `rgba(255, 255, 255, 0.15)`;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
        ctx.fill();
        
        ctx.shadowBlur = 0;
        continue; // Skip to next bar - all bars will be same height
      }

      const binIndex = i * binStep;
      if (binIndex >= frequencyData.length) break;

      // Get frequency value (0-255)
      const frequencyValue = frequencyData[binIndex];

      // Normalize to 0-1
      let normalized = frequencyValue / 255;

      // Apply position-based weighting: concentrate movement in middle bands
      // Create a bell curve weighting: middle bars get full amplitude, extremes get reduced
      const positionFactor = i / (barCount - 1); // 0 (first) to 1 (last)
      
      // Bell curve weighting: peak at center (0.5), reduced at extremes
      // This concentrates movement in middle frequencies
      const centerPosition = 0.5; // Center of the bar range
      const distanceFromCenter = Math.abs(positionFactor - centerPosition); // 0 to 0.5
      const maxDistance = 0.5; // Maximum distance from center
      
      // Create bell curve: 1.0 at center, decreasing towards extremes
      // Use a smooth curve that reduces amplitude at first and last bars
      const bellCurveWeight = 1.0 - Math.pow(distanceFromCenter / maxDistance, 1.5);
      
      // Additional reduction for first few bars (sub-bass) and last few bars
      let extremeReduction = 1.0;
      if (i < 3) {
        // First 3 bars: significantly reduce sub-bass
        extremeReduction = 0.15 + (i / 3) * 0.25; // 0.15 to 0.4 for first 3 bars
      }
      // Removed reduction for last bars since we now only show active frequencies
      
      // Apply combined weighting: bell curve * extreme reduction
      const finalWeight = bellCurveWeight * extremeReduction;
      normalized = normalized * finalWeight;

      // Apply logarithmic scaling for better visual response
      const logScaled = Math.pow(normalized, 0.5);

      // Soft visual compression: lift low values without exaggerating highs
      // This ensures bars never look completely dead, even in soft music
      let compressedValue = logScaled;
      
      if (logScaled < 0.3) {
        // Boost low values subtly (below 30%)
        // Apply gentle expansion to make them more visible
        const expansionFactor = 1.0 + (0.3 - logScaled) * 0.4; // Up to 40% boost for very low values
        compressedValue = logScaled * expansionFactor;
      } else if (logScaled > 0.6) {
        // Compress high values (above 60%) to avoid breaking harmony
        const compressionRatio = 0.7; // Compress values above threshold
        const compressionThreshold = 0.6; // Start compressing at 60%
        const excess = logScaled - compressionThreshold;
        const compressedExcess = excess * compressionRatio;
        compressedValue = compressionThreshold + compressedExcess;
      }
      
      // Apply minimum visual floor: ensure bars never look completely static
      // This creates subtle continuous movement even in soft music
      const minVisualFloor = 0.12; // Minimum 12% of max height for subtle movement
      compressedValue = Math.max(compressedValue, minVisualFloor);

      // Calculate target height
      const targetHeight = minBarHeight + (compressedValue * (maxBarHeight - minBarHeight));

      // Inertia: fast rise, slow fall
      let barHeight: number;
      if (previousWaveDataRef.current.length > 0 && previousWaveDataRef.current[i] !== undefined) {
        const currentHeight = previousWaveDataRef.current[i];
        
        // Different interpolation factors for rise (slow) vs fall (slow)
        // Slower, more tranquil movement for both directions
        const baseRiseFactor = 0.12; // Slow, tranquil rise
        const baseFallFactor = 0.08; // Very slow, tranquil fall
        
        // Frequency-dependent response speed (reduced for even slower movement)
        const speedFactor = 0.4 + positionFactor * 0.3; // Bass: 0.4x, Treble: 0.7x (slower overall)
        const riseFactor = baseRiseFactor * speedFactor;
        const fallFactor = baseFallFactor * speedFactor;
        
        // Choose interpolation factor based on direction
        const interpolationFactor = targetHeight > currentHeight ? riseFactor : fallFactor;
        
        barHeight = smoothInterpolate(currentHeight, targetHeight, interpolationFactor);
        previousWaveDataRef.current[i] = barHeight;
      } else {
        barHeight = targetHeight;
        if (!previousWaveDataRef.current.length) {
          previousWaveDataRef.current = new Array(barCount).fill(minBarHeight);
        }
        previousWaveDataRef.current[i] = barHeight;
      }

      // Ensure minimum height
      barHeight = Math.max(barHeight, minBarHeight);

      // Calculate bar position (centered vertically)
      const x = i * barWidth + barSpacing / 2;
      const y = (height - barHeight) / 2;

      // Liquid glass gradient: translucent with glass effect
      const gradient = ctx.createLinearGradient(x, y, x, y + barHeight);
      const baseColor = 220; // Lighter base for glass effect
      const colorVariation = 30; // Variation for gradient
      
      // Glass effect: semi-transparent with subtle color
      // Top: more transparent, Bottom: slightly more opaque
      gradient.addColorStop(0, `rgba(${baseColor}, ${baseColor}, ${baseColor + 10}, 0.35)`);
      gradient.addColorStop(0.3, `rgba(${baseColor + 10}, ${baseColor + 10}, ${baseColor + 15}, 0.5)`);
      gradient.addColorStop(0.7, `rgba(${baseColor + colorVariation}, ${baseColor + colorVariation}, ${baseColor + colorVariation + 10}, 0.45)`);
      gradient.addColorStop(1, `rgba(${baseColor + colorVariation * 0.5}, ${baseColor + colorVariation * 0.5}, ${baseColor + colorVariation * 0.5 + 10}, 0.4)`);

      // Draw bar with rounded corners (manual rounded rectangle)
      ctx.fillStyle = gradient;
      ctx.beginPath();
      const radius = Math.min(borderRadius, actualBarWidth / 2, barHeight / 2);
      ctx.moveTo(x + radius, y);
      ctx.lineTo(x + actualBarWidth - radius, y);
      ctx.quadraticCurveTo(x + actualBarWidth, y, x + actualBarWidth, y + radius);
      ctx.lineTo(x + actualBarWidth, y + barHeight - radius);
      ctx.quadraticCurveTo(x + actualBarWidth, y + barHeight, x + actualBarWidth - radius, y + barHeight);
      ctx.lineTo(x + radius, y + barHeight);
      ctx.quadraticCurveTo(x, y + barHeight, x, y + barHeight - radius);
      ctx.lineTo(x, y + radius);
      ctx.quadraticCurveTo(x, y, x + radius, y);
      ctx.closePath();
      ctx.fill();

      // Liquid glass border: subtle white border for glass effect
      ctx.strokeStyle = `rgba(255, 255, 255, 0.2)`;
      ctx.lineWidth = 0.5;
      ctx.stroke();

      // Soft glow effect for liquid glass
      ctx.shadowBlur = 12;
      ctx.shadowColor = `rgba(255, 255, 255, 0.15)`;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 0;
      ctx.fill();
      
      // Reset shadow
      ctx.shadowBlur = 0;
    }
  }, []);

  // Real-time audio visualization with Canvas 2D
  const startVisualization = useCallback(() => {
    if (!analyserRef.current || !dataArrayRef.current || !canvasRef.current) {
      console.warn('Visualization not ready');
      return;
    }

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const container = canvas.parentElement;
    if (container) {
      const rect = container.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
    }

    const animate = () => {
      const audio = audioElementRef.current;
      const playing = audio && !audio.paused && !audio.ended && audio.readyState > 2;
      
      if (!playing) {
        // When paused/silent: set all bars to exact same uniform height
        const canvasHeight = canvas.height / (window.devicePixelRatio || 1);
        const uniformHeight = canvasHeight * 0.08; // Same as minBarHeight
        
        // Force all bars to exact uniform height immediately
        if (previousWaveDataRef.current.length > 0) {
          // Set all bars to exact uniform height
          previousWaveDataRef.current = new Array(previousWaveDataRef.current.length).fill(uniformHeight);
        } else {
          // Initialize with uniform height
          const barCount = 31; // Match the barCount in drawBars
          previousWaveDataRef.current = new Array(barCount).fill(uniformHeight);
        }
        
        // Draw with uniform height bars (silent mode)
        const emptyData = new Uint8Array(dataArrayRef.current!.length).fill(0);
        drawBars(emptyData, true);
        
        // Continue animation to maintain uniform height
        animationFrameRef.current = requestAnimationFrame(animate);
        return;
      }

      // Get frequency data from AnalyserNode
      if (dataArrayRef.current && analyserRef.current) {
        // Create a new Uint8Array to avoid type issues
        const frequencyData = new Uint8Array(dataArrayRef.current.length);
        analyserRef.current.getByteFrequencyData(frequencyData);
        
        // Check if audio is silent (all frequencies very low)
        const avgFrequency = Array.from(frequencyData).reduce((sum, val) => sum + val, 0) / frequencyData.length;
        const isSilent = avgFrequency < 5; // Threshold for silence
        
        // Draw bars with frequency data (or in silent mode if no sound)
        drawBars(frequencyData, isSilent);
      }

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    animate();
  }, [drawBars]);


  const stopVisualization = useCallback(() => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
    previousWaveDataRef.current = [];
    // Draw empty bars at uniform height when stopped (silent mode)
    if (dataArrayRef.current) {
      const emptyData = new Uint8Array(dataArrayRef.current.length).fill(0);
      drawBars(emptyData, true);
    }
  }, [drawBars]);


  // Initialize canvas size
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const container = canvas.parentElement;
    if (!container) return;

    const updateCanvasSize = () => {
      const rect = container.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.scale(dpr, dpr);
      }
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      
      // Force redraw when canvas size changes to recalculate scaling
      if (dataArrayRef.current) {
        drawBars(dataArrayRef.current, false);
      }
    };

    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);

    return () => {
      window.removeEventListener('resize', updateCanvasSize);
    };
  }, []);

  // Sync volume with audio element (without reinicializing audio)
  useEffect(() => {
    const audio = audioElementRef.current;
    if (!audio) return;
    
    // Only update volume if it's different to avoid unnecessary updates
    if (audio.volume !== volume && !isMuted) {
      audio.volume = volume;
    }
  }, [volume, isMuted]);

  // Initialize Audio Element and Web Audio API
  useEffect(() => {
    // Wait for audio element to be available
    const audio = audioElementRef.current;
    if (!audio) {
      console.warn('Audio element not available yet');
      return;
    }

    audio.src = audioUrl;

    // Setup Web Audio API
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const analyser = audioContext.createAnalyser();
    analyser.fftSize = 1024; // FFT size for frequency analysis
    analyser.smoothingTimeConstant = 0.8; // Smoothing for fluid bar movement
    
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    const timeDataArray = new Uint8Array(analyser.fftSize); // Time-domain data array
    
    analyserRef.current = analyser;
    dataArrayRef.current = dataArray;
    timeDataArrayRef.current = timeDataArray;
    audioContextRef.current = audioContext;

    // Connect audio → MediaElementSource → AnalyserNode → destination
    const connectAudio = () => {
      try {
        if (audioContext.state === 'closed') {
          console.error('Audio context is closed');
          return false;
        }

        if (audioSourceRef.current) {
          console.log('Audio already connected');
          return true;
        }

        // Ensure audio context is running
        if (audioContext.state === 'suspended') {
          audioContext.resume();
        }

        // Create source and connect: audio → source → analyser → destination
        audioSourceRef.current = audioContext.createMediaElementSource(audio);
        audioSourceRef.current.connect(analyser);
        analyser.connect(audioContext.destination);
        
        console.log('✅ Audio connected: audio → MediaElementSource → AnalyserNode → destination');
        console.log('Analyser fftSize:', analyser.fftSize, 'Frequency bins:', analyser.frequencyBinCount);
        return true;
      } catch (error: any) {
        console.error('Audio connection error:', error);
        return false;
      }
    };

    // Audio event listeners
      audio.addEventListener('loadedmetadata', () => {
        setIsLoading(false);
        setDuration(audio.duration);
        console.log('Audio metadata loaded, duration:', audio.duration);
        // Set initial volume (use current volume state, but don't depend on it in useEffect)
        if (audio.volume !== volume) {
          audio.volume = volume;
        }
        connectAudio(); // Connect when metadata is loaded
      });

    // Auto-play when audio is ready to play (for episode changes)
    const handleCanPlay = () => {
      if (autoPlayRef.current) {
        console.log('Auto-playing audio after episode change');
        setTimeout(() => {
          audio.play().catch((error) => {
            console.error('Error auto-playing audio:', error);
          });
        }, 500); // 0.5 second delay
      }
    };
    audio.addEventListener('canplay', handleCanPlay);

    audio.addEventListener('timeupdate', () => {
      setCurrentTime(audio.currentTime);
    });

    audio.addEventListener('play', () => {
      console.log('🎵 Audio playing - starting visualization');
      setIsPlaying(true);
      
      if (audioContext.state === 'suspended') {
        audioContext.resume().then(() => {
          console.log('✅ Audio context resumed');
          if (!audioSourceRef.current) {
            connectAudio();
          }
          startVisualization();
        });
      } else {
        if (!audioSourceRef.current) {
          connectAudio();
        }
        startVisualization();
      }
    });

    audio.addEventListener('pause', () => {
      setIsPlaying(false);
      stopVisualization();
    });

    audio.addEventListener('ended', () => {
      setIsPlaying(false);
      setCurrentTime(0);
      stopVisualization();
    });

    audio.addEventListener('error', (e) => {
      console.error('Error loading audio:', e);
      setIsLoading(false);
    });

    // Load audio
    audio.load();

    // Cleanup
    return () => {
      stopVisualization();
      audio.removeEventListener('canplay', handleCanPlay);
      audio.pause();
      audio.src = '';
      if (audioContext.state !== 'closed') {
        audioContext.close();
      }
    };
  }, [audioUrl, startVisualization, stopVisualization]);

  // Toggle play/pause
  const togglePlayPause = useCallback(() => {
    const audio = audioElementRef.current;
    if (!audio) return;
    
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play().catch((error) => {
        console.error('Error playing audio:', error);
      });
    }
  }, [isPlaying]);

  // Skip back: single click = restart, double click = previous episode
  const handleSkipBack = useCallback(() => {
    const audio = audioElementRef.current;
    if (!audio) return;

    const now = Date.now();
    if (now - skipBackClickRef.current < 2500) {
      // Double click: go to previous episode
      if (onPreviousEpisode) {
        onPreviousEpisode();
      }
    } else {
      // Single click: restart current audio
      audio.currentTime = 0;
    }
    skipBackClickRef.current = now;
  }, [onPreviousEpisode]);

  // Skip forward: single click = next episode
  const handleSkipForward = useCallback(() => {
    const audio = audioElementRef.current;
    if (!audio) return;

    // Single click: go to next episode
    if (onNextEpisode) {
      onNextEpisode();
    }
  }, [onNextEpisode]);

  // Toggle mute/unmute
  const toggleMute = useCallback(() => {
    const audio = audioElementRef.current;
    if (!audio) return;

    if (isMuted) {
      audio.volume = volume;
      setIsMuted(false);
    } else {
      audio.volume = 0;
      setIsMuted(true);
    }
  }, [isMuted, volume]);

  // Handle volume change
  const handleVolumeChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioElementRef.current;
    if (!audio) return;

    const newVolume = parseFloat(e.target.value);
    // Update audio volume immediately without waiting for state update
    audio.volume = newVolume;
    // Update state (this won't cause audio to reinitialize since volume is not in useEffect deps)
    setVolume(newVolume);
    setIsMuted(newVolume === 0);
  }, []);

  // Seek to position
  const handleSeek = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioElementRef.current;
    if (!audio) return;
    const seekTime = parseFloat(e.target.value);
    audio.currentTime = seekTime;
  }, []);

  return (
    <div 
      className="w-full max-w-4xl mx-auto px-4 py-6 sm:p-6 md:p-8 rounded-2xl relative"
      style={{
        background: 'rgba(244, 114, 182, 0.12)',
        backdropFilter: 'blur(20px) saturate(180%)',
        WebkitBackdropFilter: 'blur(20px) saturate(180%)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37), 0 0 0 1px rgba(255, 255, 255, 0.05) inset',
      }}
    >
      {/* Liquid glass border - subtle pink glow */}
      <div 
        className="absolute -inset-[1px] rounded-2xl pointer-events-none"
        style={{ 
          background: 'linear-gradient(135deg, rgba(244, 114, 182, 0.08) 0%, rgba(219, 39, 119, 0.05) 50%, rgba(244, 114, 182, 0.06) 100%)',
          filter: 'blur(4px)',
          opacity: 0.3,
          zIndex: -1,
        }}
      />
      
      {/* Subtle border gradient */}
      <div 
        className="absolute -inset-[1px] rounded-2xl pointer-events-none"
        style={{ 
          background: 'linear-gradient(135deg, rgba(244, 114, 182, 0.12) 0%, rgba(219, 39, 119, 0.08) 50%, rgba(244, 114, 182, 0.1) 100%)',
          opacity: 0.15,
          zIndex: -1,
        }}
      />
      {/* Title and Artist */}
      <div className="mb-6 text-center">
        <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 font-sans">
          {title}
        </h3>
        <p className="text-sm sm:text-base text-white/70 font-sans">
          {artist}
        </p>
      </div>

      {/* Image Container */}
      <div className="mb-6">
        <div 
          ref={waveformRef}
          className="w-full rounded-lg relative overflow-hidden mx-auto"
          style={{
            width: '100%',
            aspectRatio: '1 / 1',
            maxWidth: '700px',
            backgroundColor: 'rgba(0, 0, 0, 0.1)',
            borderRadius: '12px',
            padding: '4px 2px 16px 2px',
            border: '1px solid rgba(244, 114, 182, 0.1)',
            position: 'relative',
          }}
        >
          {/* Episode Cover Image */}
          <img
            src={imageUrl || '/posible-fondo-podcast.jpg'}
            alt={title}
            className="w-full h-full object-cover rounded-lg"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
          {/* Overlay sutil para mejorar contraste */}
          <div 
            className="absolute inset-0 rounded-lg"
            style={{
              backgroundColor: 'rgba(0, 0, 0, 0.15)',
              pointerEvents: 'none',
            }}
          />
        </div>
      </div>

      {/* Real-time Audio Visualizer - Canvas 2D (Outside image, above progress bar) */}
      <div className="mb-6">
        <div
          className="w-full mx-auto rounded-2xl relative overflow-hidden"
          style={{
            maxWidth: '600px',
            height: '140px',
            background: 'rgba(255, 255, 255, 0.03)',
            backdropFilter: 'blur(20px) saturate(180%)',
            WebkitBackdropFilter: 'blur(20px) saturate(180%)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.2), 0 0 0 1px rgba(255, 255, 255, 0.05) inset',
          }}
        >
          {/* Liquid glass border glow */}
          <div 
            className="absolute -inset-[1px] rounded-2xl pointer-events-none"
            style={{ 
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 50%, rgba(255, 255, 255, 0.08) 100%)',
              filter: 'blur(8px)',
              opacity: 0.4,
              zIndex: -1,
            }}
          />
          <canvas
            ref={canvasRef}
            className="w-full h-full"
            style={{
              display: 'block',
            }}
          />
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-6">
        <input
          type="range"
          min="0"
          max={duration || 100}
          value={currentTime}
          onChange={handleSeek}
          className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer podcast-slider"
          style={{
            background: `linear-gradient(to right, rgba(244, 114, 182, 0.7) 0%, rgba(244, 114, 182, 0.7) ${(currentTime / duration) * 100}%, rgba(255, 255, 255, 0.1) ${(currentTime / duration) * 100}%, rgba(255, 255, 255, 0.1) 100%)`,
          }}
        />
      </div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-0">
        {/* Time Display (left) */}
        <div className="flex items-center gap-2 sm:gap-4 text-xs sm:text-sm md:text-base text-white/80 font-mono order-1 sm:order-1">
          <span>{formatTime(currentTime)}</span>
          <span className="text-white/40">/</span>
          <span>{formatTime(duration)}</span>
        </div>

        {/* Center group: Skip Back, Play/Pause, Skip Forward */}
        <div className="flex items-center justify-center gap-3 sm:gap-4 order-2 sm:order-2 w-full sm:w-auto" style={{ marginLeft: '32px' }}>
          {/* Skip Back button (left of Play) */}
          <button
            onClick={handleSkipBack}
            disabled={isLoading}
            className="relative flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full transition-all duration-300 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed group/button"
            style={{
              background: 'rgba(244, 114, 182, 0.3)',
              backdropFilter: 'blur(10px) saturate(180%)',
              WebkitBackdropFilter: 'blur(10px) saturate(180%)',
              border: '1px solid rgba(244, 114, 182, 0.4)',
              boxShadow: '0 4px 12px rgba(244, 114, 182, 0.2), 0 0 0 1px rgba(255, 255, 255, 0.1) inset',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(244, 114, 182, 0.4)';
              e.currentTarget.style.boxShadow = '0 6px 20px rgba(244, 114, 182, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.15) inset';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(244, 114, 182, 0.3)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(244, 114, 182, 0.2), 0 0 0 1px rgba(255, 255, 255, 0.1) inset';
            }}
          >
            <SkipBack className="w-5 h-5 sm:w-6 sm:h-6 text-pink-200 relative z-10" fill="currentColor" style={{ filter: 'drop-shadow(0 0 4px rgba(244, 114, 182, 0.5))' }} />
          </button>

          {/* Play/Pause Button (center) */}
          <button
            onClick={togglePlayPause}
            disabled={isLoading}
            className="relative flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full transition-all duration-300 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed group/button"
            style={{
              background: isPlaying 
                ? 'rgba(244, 114, 182, 0.35)'
                : 'rgba(244, 114, 182, 0.4)',
              backdropFilter: 'blur(10px) saturate(180%)',
              WebkitBackdropFilter: 'blur(10px) saturate(180%)',
              border: '1px solid rgba(244, 114, 182, 0.5)',
              boxShadow: isPlaying 
                ? '0 4px 20px rgba(244, 114, 182, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.1) inset, 0 0 30px rgba(244, 114, 182, 0.25)'
                : '0 4px 12px rgba(244, 114, 182, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.1) inset',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = isPlaying 
                ? 'rgba(244, 114, 182, 0.45)'
                : 'rgba(244, 114, 182, 0.5)';
              e.currentTarget.style.boxShadow = '0 6px 24px rgba(244, 114, 182, 0.35), 0 0 0 1px rgba(255, 255, 255, 0.15) inset, 0 0 40px rgba(244, 114, 182, 0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = isPlaying 
                ? 'rgba(244, 114, 182, 0.35)'
                : 'rgba(244, 114, 182, 0.4)';
              e.currentTarget.style.boxShadow = isPlaying 
                ? '0 4px 20px rgba(244, 114, 182, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.1) inset, 0 0 30px rgba(244, 114, 182, 0.25)'
                : '0 4px 12px rgba(244, 114, 182, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.1) inset';
            }}
          >
            {/* Liquid glass border glow */}
            <div 
              className="absolute -inset-[1px] rounded-full pointer-events-none"
              style={{ 
                background: 'linear-gradient(135deg, rgba(244, 114, 182, 0.2) 0%, rgba(219, 39, 119, 0.15) 50%, rgba(244, 114, 182, 0.18) 100%)',
                filter: 'blur(3px)',
                opacity: 0.4,
                zIndex: -1,
              }}
            />
            
            {isPlaying ? (
              <Pause className="w-6 h-6 sm:w-7 sm:h-7 text-pink-300 relative z-10" fill="currentColor" style={{ filter: 'drop-shadow(0 0 4px rgba(244, 114, 182, 0.5))' }} />
            ) : (
              <Play className="w-6 h-6 sm:w-7 sm:h-7 text-pink-200 ml-1 relative z-10" fill="currentColor" style={{ filter: 'drop-shadow(0 0 6px rgba(244, 114, 182, 0.7)), brightness(1.3)' }} />
            )}
          </button>

          {/* Skip Forward button (right of Play) */}
          <button
            onClick={handleSkipForward}
            disabled={isLoading}
            className="relative flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full transition-all duration-300 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed group/button"
            style={{
              background: 'rgba(244, 114, 182, 0.3)',
              backdropFilter: 'blur(10px) saturate(180%)',
              WebkitBackdropFilter: 'blur(10px) saturate(180%)',
              border: '1px solid rgba(244, 114, 182, 0.4)',
              boxShadow: '0 4px 12px rgba(244, 114, 182, 0.2), 0 0 0 1px rgba(255, 255, 255, 0.1) inset',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(244, 114, 182, 0.4)';
              e.currentTarget.style.boxShadow = '0 6px 20px rgba(244, 114, 182, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.15) inset';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(244, 114, 182, 0.3)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(244, 114, 182, 0.2), 0 0 0 1px rgba(255, 255, 255, 0.1) inset';
            }}
          >
            <SkipForward className="w-5 h-5 sm:w-6 sm:h-6 text-pink-200 relative z-10" fill="currentColor" style={{ filter: 'drop-shadow(0 0 4px rgba(244, 114, 182, 0.5))' }} />
          </button>
        </div>

        {/* Volume Control - right */}
        <div className="flex items-center justify-center gap-2 sm:gap-2 order-3 sm:order-3 w-full sm:w-auto sm:justify-start">
          <button
            onClick={toggleMute}
            className="relative flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full transition-all duration-300 hover:scale-110 group/button self-center"
            style={{
              background: 'rgba(244, 114, 182, 0.25)',
              backdropFilter: 'blur(10px) saturate(180%)',
              WebkitBackdropFilter: 'blur(10px) saturate(180%)',
              border: '1px solid rgba(244, 114, 182, 0.3)',
              boxShadow: '0 2px 8px rgba(244, 114, 182, 0.15), 0 0 0 1px rgba(255, 255, 255, 0.05) inset',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(244, 114, 182, 0.35)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(244, 114, 182, 0.25)';
            }}
          >
            {isMuted ? (
              <VolumeX className="w-4 h-4 sm:w-5 sm:h-5 text-pink-200" />
            ) : (
              <Volume2 className="w-4 h-4 sm:w-5 sm:h-5 text-pink-200" />
            )}
          </button>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={isMuted ? 0 : volume}
            onChange={handleVolumeChange}
            className="w-24 sm:w-24 h-1 bg-white/10 rounded-lg appearance-none cursor-pointer podcast-slider"
            style={{
              background: `linear-gradient(to right, rgba(244, 114, 182, 0.7) 0%, rgba(244, 114, 182, 0.7) ${(isMuted ? 0 : volume) * 100}%, rgba(255, 255, 255, 0.1) ${(isMuted ? 0 : volume) * 100}%, rgba(255, 255, 255, 0.1) 100%)`,
            }}
          />
        </div>
      </div>

      {/* Intro Text Box */}
      {intro && (
        <div className="mt-6">
          <div 
            className="w-full p-4 sm:p-6 rounded-xl relative"
            style={{
              background: 'rgba(255, 255, 255, 0.05)',
              backdropFilter: 'blur(10px) saturate(180%)',
              WebkitBackdropFilter: 'blur(10px) saturate(180%)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              boxShadow: '0 4px 16px 0 rgba(0, 0, 0, 0.2), 0 0 0 1px rgba(255, 255, 255, 0.05) inset',
            }}
          >
            <h4 className="text-base sm:text-lg font-semibold text-white/90 mb-3 font-sans">
              Intro
            </h4>
            <p className="text-sm sm:text-base text-white/70 leading-relaxed font-sans">
              {intro}
            </p>
          </div>
        </div>
      )}

      {/* Hidden audio element */}
      <audio
        ref={audioElementRef}
        crossOrigin="anonymous"
        preload="auto"
        style={{ display: 'none' }}
      />
    </div>
  );
}
