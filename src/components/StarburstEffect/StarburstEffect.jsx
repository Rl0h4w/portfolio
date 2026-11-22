import { useEffect, useRef } from 'react';
import './StarburstEffect.css';

const dotDuration = 1000;
const growthDuration = 2000;
const frameInterval = 1000 / 30;

export default function StarburstEffect() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    if (!context) return;

    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const rays = Array.from({ length: 100 }, (_, index) => {
      const angle = (index + Math.random() * 0.9) * Math.PI * 2 / 100;
      return {
        x: Math.cos(angle),
        y: Math.sin(angle),
        length: 0.74 + Math.random() * 0.44,
        width: 0.45 + Math.random() * 0.65,
        phase: Math.random() * Math.PI * 2,
        speed: 0.55 + Math.random() * 1.15,
      };
    });
    const startedAt = performance.now();
    let animationFrame = 0;
    let lastPaint = -Infinity;

    function draw(elapsed) {
      const { width, height } = canvas;
      const x = width / 2;
      const y = height / 2;
      context.clearRect(0, 0, width, height);

      if (elapsed < dotDuration) {
        context.fillStyle = '#0096ff';
        context.fillRect(x - 1, y - 1, 2, 2);
        return;
      }

      const growth = Math.min((elapsed - dotDuration) / growthDuration, 1);
      const shimmerTime = Math.max(elapsed - dotDuration - growthDuration, 0) / 1000;
      const distance = Math.hypot(x, y) * (1 - (1 - growth) ** 2);
      const rayCount = width < 640 ? 60 : rays.length;
      for (let index = 0; index < rayCount; index += 1) {
        const ray = rays[Math.floor(index * rays.length / rayCount)];
        const endX = x + ray.x * ray.length * distance;
        const endY = y + ray.y * ray.length * distance;
        const wave = (1 + Math.sin(ray.phase + shimmerTime * ray.speed)) / 2;
        const hue = 181 + 89 * wave;
        const alpha = (0.18 + 0.37 * wave) * Math.min(growth * 3, 1);
        const gradient = context.createLinearGradient(x, y, endX, endY);
        gradient.addColorStop(0, `hsla(${hue}, 95%, 54%, 0)`);
        gradient.addColorStop(0.23, `hsla(${hue}, 95%, 54%, ${alpha})`);
        gradient.addColorStop(0.57, `hsla(${hue}, 92%, 62%, ${alpha * 0.72})`);
        gradient.addColorStop(1, `hsla(${hue}, 95%, 54%, 0)`);
        context.beginPath();
        context.moveTo(x, y);
        context.lineTo(endX, endY);
        context.strokeStyle = gradient;
        context.lineWidth = ray.width;
        context.stroke();
      }
    }

    function tick(now) {
      if (now - lastPaint >= frameInterval) {
        draw(now - startedAt);
        lastPaint = now;
      }
      animationFrame = requestAnimationFrame(tick);
    }

    function update() {
      cancelAnimationFrame(animationFrame);
      if (document.hidden) return;
      if (motion.matches) {
        draw(dotDuration + growthDuration);
        return;
      }
      lastPaint = -Infinity;
      animationFrame = requestAnimationFrame(tick);
    }

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      update();
    }

    resize();
    window.addEventListener('resize', resize);
    document.addEventListener('visibilitychange', update);
    motion.addEventListener('change', update);
    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener('resize', resize);
      document.removeEventListener('visibilitychange', update);
      motion.removeEventListener('change', update);
    };
  }, []);

  return <canvas ref={canvasRef} className="starburst-canvas" aria-hidden="true" />;
}
