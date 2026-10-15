import React, { useEffect, useRef } from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  FlaskConical, 
  Atom, 
  Calculator, 
  Bot, 
  Compass, 
  Download,
  Layers,
  ChevronDown
} from 'lucide-react';

interface Props {
  onNavigate: (tab: string) => void;
  onDownloadZip: () => void;
}

export const HeroSection: React.FC<Props> = ({ onNavigate, onDownloadZip }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Background animated orbital atomic rings & floating glow particles
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let angle = 0;

    const resize = () => {
      canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      canvas.height = canvas.parentElement?.clientHeight || 650;
    };
    resize();
    window.addEventListener('resize', resize);

    // Particles
    const particles = Array.from({ length: 45 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 2 + 0.8,
      speedX: (Math.random() - 0.5) * 0.4,
      speedY: (Math.random() - 0.5) * 0.4,
      color: Math.random() > 0.5 ? '#06b6d4' : '#a855f7'
    }));

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const cx = canvas.width / 2;
      const cy = canvas.height / 2;

      // Draw floating background particles
      particles.forEach(p => {
        p.x += p.speedX;
        p.y += p.speedY;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      // Central glowing nucleus
      const grad = ctx.createRadialGradient(cx, cy, 2, cx, cy, 45);
      grad.addColorStop(0, '#ffffff');
      grad.addColorStop(0.3, '#06b6d4');
      grad.addColorStop(0.7, '#a855f7');
      grad.addColorStop(1, 'transparent');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(cx, cy, 45, 0, Math.PI * 2);
      ctx.fill();

      // Draw 3 Elliptical Orbitals with revolving electrons
      angle += 0.015;

      const drawOrbit = (tilt: number, speedMult: number, color: string) => {
        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(tilt);

        ctx.strokeStyle = 'rgba(6, 182, 212, 0.2)';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.ellipse(0, 0, 180, 65, 0, 0, Math.PI * 2);
        ctx.stroke();

        // Electron position on ellipse
        const eAngle = angle * speedMult;
        const ex = 180 * Math.cos(eAngle);
        const ey = 65 * Math.sin(eAngle);

        ctx.fillStyle = color;
        ctx.shadowColor = color;
        ctx.shadowBlur = 15;
        ctx.beginPath();
        ctx.arc(ex, ey, 5, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
      };

      drawOrbit(0, 1.2, '#38bdf8');
      drawOrbit(Math.PI / 3, 1.5, '#c084fc');
      drawOrbit(-Math.PI / 3, 1.8, '#34d399');

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <div className="relative w-full overflow-hidden rounded-3xl neon-border bg-slate-950/70 py-16 sm:py-24 px-6 sm:px-12 flex flex-col items-center text-center shadow-2xl">
      {/* Background Interactive Orbital Atom Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none opacity-60 z-0"
      />

      {/* Cyber Grid Overlay */}
      <div className="absolute inset-0 cyber-grid opacity-20 pointer-events-none" />

      {/* Hero Content */}
      <div className="relative z-10 max-w-4xl flex flex-col items-center">
        {/* Top Sci-Fi Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono uppercase tracking-wider mb-6 animate-pulse-slow flex-wrap justify-center">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
          <span>KOLBA · STAKAN · PROBIRKA | CHEMVERSE</span>
          <span className="text-slate-500 hidden sm:inline">•</span>
          <span className="text-slate-400 hidden sm:inline">Explore the Science of Everything</span>
        </div>

        {/* Main Headlines */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold font-hud tracking-tight text-white uppercase leading-none mb-4">
          CHEMISTRY IS THE <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-purple-500">
            UNIVERSE IN MOTION
          </span>
        </h1>

        <p className="text-xl sm:text-2xl font-bold font-hud text-cyan-200/90 mb-3 max-w-2xl">
          “Atomlardan galaktikalargacha — moddalarning sirlarini kashf et.”
        </p>

        <p className="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed mb-8">
          Kolba, Stakan, Probirka — 118 ta element davriy jadvali, IUPAC/NIST ilmiy standartlari bilan audit qilingan tajribalar, 3D molekulyar laboratoriya va professional kimyoviy kalkulyatorlar.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
          <button
            onClick={() => onNavigate('lab')}
            className="px-7 py-3.5 rounded-2xl bg-cyan-500 text-slate-950 font-bold font-hud text-sm flex items-center gap-2 hover:bg-cyan-400 transition-all shadow-xl shadow-cyan-500/25 hover:scale-105 cursor-pointer"
          >
            <FlaskConical className="w-4 h-4" />
            <span>Laboratoriyaga kirish</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={() => onNavigate('periodic')}
            className="px-7 py-3.5 rounded-2xl bg-slate-900/90 border border-slate-700/80 text-white font-bold font-hud text-sm flex items-center gap-2 hover:border-cyan-500/50 hover:bg-slate-800 transition-all shadow-lg hover:scale-105 cursor-pointer"
          >
            <Atom className="w-4 h-4 text-cyan-400" />
            <span>Koinotni kashf et</span>
          </button>

          <button
            onClick={onDownloadZip}
            className="px-6 py-3.5 rounded-2xl bg-purple-500/15 border border-purple-500/40 text-purple-300 font-bold font-hud text-sm flex items-center gap-2 hover:bg-purple-500/25 hover:border-purple-500/60 transition-all shadow-lg hover:scale-105 cursor-pointer"
          >
            <Download className="w-4 h-4 text-purple-400" />
            <span>ZIP yuklab olish</span>
          </button>
        </div>

        {/* Live-style Science Metrics (Demo stats labeled) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-6 w-full pt-8 border-t border-slate-800/80">
          <div className="p-3 sm:p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80">
            <span className="text-2xl sm:text-3xl font-extrabold font-hud text-cyan-400 block">118</span>
            <span className="text-xs text-slate-400 font-mono">Elementlar (to'liq)</span>
          </div>
          <div className="p-3 sm:p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80">
            <span className="text-2xl sm:text-3xl font-extrabold font-hud text-purple-400 block">3D</span>
            <span className="text-xs text-slate-400 font-mono">Kvant molekulalar</span>
          </div>
          <div className="p-3 sm:p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80">
            <span className="text-2xl sm:text-3xl font-extrabold font-hud text-emerald-400 block">20+</span>
            <span className="text-xs text-slate-400 font-mono">Kimyo fanlari kutubxonasi</span>
          </div>
          <div className="p-3 sm:p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80">
            <span className="text-2xl sm:text-3xl font-extrabold font-hud text-amber-400 block">100%</span>
            <span className="text-xs text-slate-400 font-mono">Matematik tenglashtirish</span>
          </div>
        </div>
      </div>
    </div>
  );
};
