import React, { useEffect, useRef, useState } from 'react';

const StarburstEffect = () => {
  const canvasRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: window.innerWidth, height: window.innerHeight });
  const phase = useRef(0); // 0: dot, 1: lines growing, 2: color animation
  const phaseStartTime = useRef(Date.now());
  const growthProgress = useRef(0);
  const lines = useRef([]);
  const animationFrameId = useRef(null);

  const createLines = () => {
    const lineCount = 1000; 
    return Array.from({ length: lineCount }, () => ({
      angle: Math.random() * Math.PI * 2,
      length: Math.random() * 700 + 800,
      width: Math.random() * 0.5 + 0.125,
      colorPhase: Math.random() * Math.PI * 2,
      colorSpeed: Math.random() * 0.02 + 0.01,
      // Параметры цвета
      isBright: Math.random() > 0.6,
      purpleIntensity: Math.random() > 0.6 ? Math.random() * 40 + 70 : Math.random() * 20 + 10,
      cyanIntensity: Math.random() > 0.6 ? Math.random() * 50 + 80 : Math.random() * 25 + 15,
      opacity: Math.random() > 0.6 ? Math.random() * 0.3 + 0.4 : Math.random() * 0.2 + 0.2
    }));
  };

  const getGradientColor = (line, progress = 1) => {
    // Всегда обновляем цветовую фазу
    line.colorPhase += line.colorSpeed;

    const r = Math.floor(line.purpleIntensity * Math.sin(line.colorPhase));
    const g = Math.floor(line.cyanIntensity * Math.sin(line.colorPhase + Math.PI / 3));
    const b = Math.floor((line.purpleIntensity + line.cyanIntensity) * Math.sin(line.colorPhase + Math.PI / 1.5));
    
    // Во время фазы роста смешиваем с ярким синим
    if (phase.current === 1) {
      const growthBlue = 150 * (1 - progress);
      return `rgba(${r}, ${Math.max(g, growthBlue)}, ${Math.max(b, growthBlue)}, ${line.opacity})`;
    }
    
    return `rgba(${r}, ${g}, ${b}, ${line.opacity})`;
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Создаем все линии изначально
    lines.current = createLines();
    
    // Инициализируем фазы
    phase.current = 0;
    phaseStartTime.current = Date.now();
    growthProgress.current = 0;

    const drawPoint = () => {
      ctx.fillStyle = 'rgb(0, 150, 255)';
      ctx.fillRect(dimensions.width / 2 - 1, dimensions.height / 2 - 1, 2, 2);
    };

    const drawLine = (line) => {
      const centerX = dimensions.width / 2;
      const centerY = dimensions.height / 2;

      // Вычисление текущей длины на основе фазы
      const currentLength = phase.current === 1 
        ? line.length * growthProgress.current 
        : line.length;

      const endX = centerX + Math.cos(line.angle) * currentLength;
      const endY = centerY + Math.sin(line.angle) * currentLength;

      // Цвета обновляются в getGradientColor

      const gradient = ctx.createLinearGradient(centerX, centerY, endX, endY);
      gradient.addColorStop(0, 'rgba(0, 0, 0, 0)');
      gradient.addColorStop(0.2, `rgba(0, 0, 0, ${line.opacity})`);
      gradient.addColorStop(0.5, getGradientColor(line));
      gradient.addColorStop(0.8, getGradientColor(line));
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.lineTo(endX, endY);
      ctx.strokeStyle = gradient;
      ctx.lineWidth = line.width;
      ctx.lineCap = 'round';
      ctx.stroke();
    };

    const animate = () => {
      // Очистка экрана
      ctx.fillStyle = phase.current === 0 ? 'rgba(0, 0, 0, 0.2)' : 'rgba(0, 0, 0, 0.03)';
      ctx.fillRect(0, 0, dimensions.width, dimensions.height);

      const currentTime = Date.now();
      const timeSincePhaseStart = currentTime - phaseStartTime.current;

      // Рисуем на основе текущей фазы
      switch (phase.current) {
        case 0: // Фаза точки
          drawPoint();
          if (timeSincePhaseStart > 1000) {
            phase.current = 1;
            phaseStartTime.current = currentTime;
            console.log('Starting growth phase');
          }
          break;

        case 1: // Фаза роста
          growthProgress.current = Math.min(1, timeSincePhaseStart / 2000);
          lines.current.forEach(line => drawLine(line));
          
          if (growthProgress.current >= 1) {
            phase.current = 2;
            console.log('Starting color phase');
          }
          break;

        case 2: // Фаза цвета
          lines.current.forEach(line => drawLine(line));
          break;
      }

      animationFrameId.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [dimensions]);

  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      width={dimensions.width}
      height={dimensions.height}
      className="fixed top-0 left-0 w-full h-full z-0"
    />
  );
};

export default StarburstEffect;