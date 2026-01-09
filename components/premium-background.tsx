'use client';

import { useEffect, useRef } from 'react';

export default function PremiumBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    // Set canvas size to match viewport, with 4K support
    const setCanvasSize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2); // Limit DPR for performance
      const width = Math.max(window.innerWidth, 3840);
      const height = Math.max(window.innerHeight, 2160);
      
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      
      ctx.scale(dpr, dpr);
    };

    // Color palette - matching the image
    const darkTop = '#050607';      // Negro azulado muy oscuro arriba
    const lightBottom = '#6f648a';  // Gris violáceo abajo

    // Function to create gradient (needs to be recreated on resize)
    const createGradient = () => {
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, darkTop);
      gradient.addColorStop(0.3, '#1a1525');
      gradient.addColorStop(0.6, '#3d3450');
      gradient.addColorStop(1, lightBottom);
      return gradient;
    };

    // Variables for animation
    let animationFrame: number;
    let time = 0;
    let noiseImageData: ImageData | null = null;
    
    // Generate noise once and store it (will be regenerated on resize)
    const generateNoiseOnce = () => {
      const imageData = ctx.createImageData(canvas.width, canvas.height);
      const data = imageData.data;
      const noiseIntensity = 0.06;

      for (let i = 0; i < data.length; i += 4) {
        const x = (i / 4) % canvas.width;
        const y = Math.floor((i / 4) / canvas.width);
        const progress = y / canvas.height;
        
        const noise = (Math.random() - 0.5) * noiseIntensity;
        const adjustedNoise = noise * (0.4 + progress * 0.6);
        
        const baseR = progress < 0.5 ? 5 : 111;
        const baseG = progress < 0.5 ? 6 : 100;
        const baseB = progress < 0.5 ? 7 : 138;
        
        data[i] = Math.max(0, Math.min(255, baseR + adjustedNoise * 255));
        data[i + 1] = Math.max(0, Math.min(255, baseG + adjustedNoise * 255));
        data[i + 2] = Math.max(0, Math.min(255, baseB + adjustedNoise * 255));
        data[i + 3] = 255;
      }

      noiseImageData = imageData;
      ctx.putImageData(imageData, 0, 0);
    };
    
    setCanvasSize();
    
    // Handle resize - regenerate noise and recreate gradient
    const handleResize = () => {
      setCanvasSize();
      // Regenerate noise after resize
      generateNoiseOnce();
    };
    
    window.addEventListener('resize', handleResize);

    // Generate organic horizontal waves (sand/dust texture)
    const generateWaves = (timeOffset = 0) => {
      const waveLayers = 4; // More layers for depth
      const baseAmplitude = 12; // Very subtle
      const baseFrequency = 0.0015;
      
      for (let layer = 0; layer < waveLayers; layer++) {
        const layerOffset = layer * 0.4 + timeOffset;
        const layerAmplitude = baseAmplitude * (1 - layer * 0.15);
        const layerFrequency = baseFrequency * (1 + layer * 0.08);
        
        ctx.beginPath();
        const startY = canvas.height * (0.4 + layer * 0.15);
        ctx.moveTo(0, startY);
        
        // Use smoother curves for organic feel
        for (let x = 0; x < canvas.width; x += 1) {
          // Multiple sine waves combined for organic texture
          const wave1 = Math.sin(x * layerFrequency + layerOffset) * layerAmplitude;
          const wave2 = Math.sin(x * layerFrequency * 2.3 + layerOffset * 1.7) * (layerAmplitude * 0.4);
          const wave3 = Math.sin(x * layerFrequency * 0.7 + layerOffset * 0.5) * (layerAmplitude * 0.3);
          const wave = wave1 + wave2 + wave3;
          
          const baseY = startY + (canvas.height - startY) * (x / canvas.width) * 0.3;
          const y = baseY + wave;
          ctx.lineTo(x, y);
        }
        
        ctx.lineTo(canvas.width, canvas.height);
        ctx.lineTo(0, canvas.height);
        ctx.closePath();
        
        // Soft gradient for wave layer
        const waveGradient = ctx.createLinearGradient(0, startY, 0, canvas.height);
        const opacity = 0.12 - layer * 0.02;
        const waveColor = layer < 2 ? 'rgba(111, 100, 138, ' : 'rgba(90, 80, 120, ';
        waveGradient.addColorStop(0, `${waveColor}${opacity})`);
        waveGradient.addColorStop(0.3, `${waveColor}${opacity * 0.8})`);
        waveGradient.addColorStop(0.7, `${waveColor}${opacity * 0.5})`);
        waveGradient.addColorStop(1, `${waveColor}${opacity * 0.2})`);
        
        ctx.fillStyle = waveGradient;
        ctx.fill();
      }
    }

    // Generate noise initially
    generateNoiseOnce();
    
    const animate = () => {
      time += 0.0005; // Extremely slow, almost imperceptible
      
      // Redraw base gradient (recreate on each frame to handle resize)
      const gradient = createGradient();
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Apply stored noise
      if (noiseImageData) {
        ctx.putImageData(noiseImageData, 0, 0);
      }
      
      // Redraw waves with subtle animation
      generateWaves(time);
      
      animationFrame = requestAnimationFrame(animate);
    };

    // Start subtle animation
    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full"
      style={{
        zIndex: 0,
        pointerEvents: 'none',
        imageRendering: 'auto',
      } as React.CSSProperties}
    />
  );
}

