'use client';

import { useEffect, useRef } from 'react';

export default function FlowingBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    // Set canvas size
    const setCanvasSize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      
      ctx.scale(dpr, dpr);
    };

    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);

    // Dark background
    const darkBg = '#0a0a0f';
    
    // Particle system - more concentrated in bright areas
    const particles: Array<{x: number, y: number, size: number, opacity: number, speed: number, twinkle: number}> = [];
    const particleCount = 200;
    
    // Create particles, more concentrated in ribbon areas
    for (let i = 0; i < particleCount; i++) {
      let x, y;
      // 60% chance to be in ribbon areas (center region)
      if (Math.random() < 0.6) {
        x = canvas.width * (0.3 + Math.random() * 0.5);
        y = canvas.height * (0.2 + Math.random() * 0.6);
      } else {
        x = Math.random() * canvas.width;
        y = Math.random() * canvas.height;
      }
      
      particles.push({
        x,
        y,
        size: Math.random() * 1.8 + 0.3,
        opacity: Math.random() * 0.9 + 0.1,
        speed: Math.random() * 0.4 + 0.05,
        twinkle: Math.random() * Math.PI * 2
      });
    }

    // Flowing ribbon paths
    const createRibbonPath = (startX: number, startY: number, controlPoints: Array<{x: number, y: number}>, endX: number, endY: number) => {
      const path = new Path2D();
      path.moveTo(startX, startY);
      
      for (let i = 0; i < controlPoints.length - 1; i++) {
        const cp1 = controlPoints[i];
        const cp2 = controlPoints[i + 1];
        const end = i === controlPoints.length - 2 ? {x: endX, y: endY} : controlPoints[i + 2];
        path.bezierCurveTo(cp1.x, cp1.y, cp2.x, cp2.y, end.x, end.y);
      }
      
      return path;
    };

    // Main ribbon from upper left - more complex curve
    const ribbon1Path = () => {
      const path = new Path2D();
      const startX = canvas.width * 0.08;
      const startY = canvas.height * 0.12;
      
      // First curve: down and right
      const cp1x = canvas.width * 0.25;
      const cp1y = canvas.height * 0.35;
      const cp2x = canvas.width * 0.45;
      const cp2y = canvas.height * 0.55;
      const midX = canvas.width * 0.6;
      const midY = canvas.height * 0.65;
      
      // Second curve: back up and right
      const cp3x = canvas.width * 0.7;
      const cp3y = canvas.height * 0.55;
      const cp4x = canvas.width * 0.75;
      const cp4y = canvas.height * 0.45;
      const endX = canvas.width * 0.68;
      const endY = canvas.height * 0.28;
      
      path.moveTo(startX, startY);
      path.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, midX, midY);
      path.bezierCurveTo(cp3x, cp3y, cp4x, cp4y, endX, endY);
      
      return path;
    };

    // Second ribbon from bottom right - broader and darker
    const ribbon2Path = () => {
      const path = new Path2D();
      const startX = canvas.width * 0.88;
      const startY = canvas.height * 0.92;
      
      // First curve: up and left
      const cp1x = canvas.width * 0.72;
      const cp1y = canvas.height * 0.75;
      const cp2x = canvas.width * 0.55;
      const cp2y = canvas.height * 0.58;
      const midX = canvas.width * 0.45;
      const midY = canvas.height * 0.48;
      
      // Second curve: continue up and left
      const cp3x = canvas.width * 0.38;
      const cp3y = canvas.height * 0.42;
      const cp4x = canvas.width * 0.32;
      const cp4y = canvas.height * 0.3;
      const endX = canvas.width * 0.38;
      const endY = canvas.height * 0.22;
      
      path.moveTo(startX, startY);
      path.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, midX, midY);
      path.bezierCurveTo(cp3x, cp3y, cp4x, cp4y, endX, endY);
      
      return path;
    };

    // Draw ribbon with gradient and fine lines - enhanced for exact replication
    const drawRibbon = (path: Path2D, gradientStops: Array<{offset: number, color: string}>, width: number, time: number, brightness: number = 1) => {
      ctx.save();
      ctx.globalCompositeOperation = 'screen';
      
      // Create multiple gradients for more realistic lighting
      const gradient1 = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      const gradient2 = ctx.createLinearGradient(0, 0, canvas.width * 0.7, canvas.height * 0.7);
      
      gradientStops.forEach(stop => {
        gradient1.addColorStop(stop.offset, stop.color);
        gradient2.addColorStop(stop.offset, stop.color);
      });
      
      // Draw main ribbon with multiple layers for depth and glow
      for (let layer = 0; layer < 5; layer++) {
        const layerWidth = width * (1 - layer * 0.12);
        const layerOpacity = (0.6 - layer * 0.08) * brightness;
        const blurAmount = 15 + layer * 5;
        
        ctx.strokeStyle = layer < 2 ? gradient1 : gradient2;
        ctx.lineWidth = layerWidth;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.globalAlpha = layerOpacity;
        ctx.shadowBlur = blurAmount;
        ctx.shadowColor = 'rgba(220, 170, 255, 0.6)';
        ctx.stroke(path);
      }
      
      // Draw fine parallel lines for holographic texture effect
      ctx.globalAlpha = 0.4;
      ctx.lineWidth = 0.3;
      ctx.shadowBlur = 0;
      
      // More lines for better texture
      for (let i = 0; i < 30; i++) {
        const offset = (i - 15) * 1.5;
        const lineOpacity = 0.05 + (Math.abs(i - 15) / 15) * 0.15;
        ctx.save();
        ctx.translate(offset, offset * 0.25);
        ctx.strokeStyle = `rgba(255, 255, 255, ${lineOpacity})`;
        ctx.stroke(path);
        ctx.restore();
      }
      
      // Add highlight lines for extra brightness
      ctx.globalAlpha = 0.2;
      ctx.lineWidth = 1;
      for (let i = 0; i < 5; i++) {
        const offset = (i - 2) * 3;
        ctx.save();
        ctx.translate(offset, offset * 0.2);
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
        ctx.stroke(path);
        ctx.restore();
      }
      
      ctx.restore();
    };

    // Draw particles with twinkling effect
    const drawParticles = (time: number) => {
      particles.forEach((particle, i) => {
        // Animate particles with slight drift
        particle.y -= particle.speed;
        particle.x += Math.sin(time * 0.005 + i) * 0.2;
        
        if (particle.y < 0) {
          particle.y = canvas.height;
          particle.x = canvas.width * (0.3 + Math.random() * 0.5);
        }
        if (particle.x < 0 || particle.x > canvas.width) {
          particle.x = canvas.width * (0.3 + Math.random() * 0.5);
        }
        
        // Twinkling effect
        const twinkle = Math.sin(time * 0.02 + particle.twinkle) * 0.3 + 0.7;
        const currentOpacity = particle.opacity * twinkle;
        
        // Draw particle with glow
        ctx.save();
        ctx.globalAlpha = currentOpacity;
        ctx.fillStyle = '#ffffff';
        ctx.shadowBlur = 4;
        ctx.shadowColor = 'rgba(255, 255, 255, 0.9)';
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
        
        // Add smaller bright center
        ctx.globalAlpha = currentOpacity * 1.5;
        ctx.shadowBlur = 2;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size * 0.4, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });
    };

    let animationFrame: number;
    let time = 0;

    const animate = () => {
      time += 0.016; // ~60fps
      
      // Clear canvas
      ctx.fillStyle = darkBg;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Draw ribbons
      // Main ribbon (bright white to purple) - most prominent
      const ribbon1 = ribbon1Path();
      drawRibbon(ribbon1, [
        { offset: 0, color: 'rgba(255, 255, 255, 1)' },
        { offset: 0.15, color: 'rgba(255, 250, 255, 0.95)' },
        { offset: 0.3, color: 'rgba(240, 200, 255, 0.8)' },
        { offset: 0.5, color: 'rgba(200, 140, 240, 0.6)' },
        { offset: 0.7, color: 'rgba(160, 100, 220, 0.4)' },
        { offset: 1, color: 'rgba(120, 70, 180, 0.25)' }
      ], 90, time, 1.2);
      
      // Second ribbon (darker purple, broader)
      const ribbon2 = ribbon2Path();
      drawRibbon(ribbon2, [
        { offset: 0, color: 'rgba(220, 170, 255, 0.7)' },
        { offset: 0.2, color: 'rgba(190, 130, 230, 0.5)' },
        { offset: 0.4, color: 'rgba(160, 100, 210, 0.4)' },
        { offset: 0.6, color: 'rgba(130, 80, 180, 0.3)' },
        { offset: 0.8, color: 'rgba(110, 60, 160, 0.25)' },
        { offset: 1, color: 'rgba(90, 50, 140, 0.2)' }
      ], 110, time, 0.9);
      
      // Additional subtle wisps in corners
      const wisp1 = new Path2D();
      wisp1.moveTo(canvas.width * 0.92, canvas.height * 0.18);
      wisp1.bezierCurveTo(
        canvas.width * 0.88, canvas.height * 0.28,
        canvas.width * 0.82, canvas.height * 0.24,
        canvas.width * 0.78, canvas.height * 0.2
      );
      drawRibbon(wisp1, [
        { offset: 0, color: 'rgba(200, 150, 240, 0.5)' },
        { offset: 0.5, color: 'rgba(170, 120, 210, 0.3)' },
        { offset: 1, color: 'rgba(140, 90, 180, 0.15)' }
      ], 45, time, 0.7);
      
      const wisp2 = new Path2D();
      wisp2.moveTo(canvas.width * 0.12, canvas.height * 0.88);
      wisp2.bezierCurveTo(
        canvas.width * 0.18, canvas.height * 0.78,
        canvas.width * 0.24, canvas.height * 0.82,
        canvas.width * 0.28, canvas.height * 0.78
      );
      drawRibbon(wisp2, [
        { offset: 0, color: 'rgba(180, 130, 220, 0.45)' },
        { offset: 0.5, color: 'rgba(150, 100, 190, 0.25)' },
        { offset: 1, color: 'rgba(120, 70, 160, 0.12)' }
      ], 40, time, 0.65);
      
      // Draw particles
      drawParticles(time);
      
      animationFrame = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', setCanvasSize);
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

