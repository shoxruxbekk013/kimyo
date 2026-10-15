import React, { useState, useRef, useEffect, useCallback } from 'react';
import { MOLECULES_DATA } from '../data/molecules';
import { MoleculeData, AtomCoord } from '../types/chemistry';
import { 
  Rotate3d, 
  Layers, 
  Maximize2, 
  RotateCcw, 
  Sparkles, 
  Check, 
  Atom as AtomIcon, 
  Info,
  Compass
} from 'lucide-react';

interface Props {
  currentLang: 'uz' | 'en' | 'ru';
  selectedMoleculeId?: string;
}

type RenderMode = 'ball-stick' | 'space-fill' | 'wireframe';

export const Molecule3DViewer: React.FC<Props> = ({ currentLang, selectedMoleculeId }) => {
  const [activeMolecule, setActiveMolecule] = useState<MoleculeData>(
    MOLECULES_DATA.find(m => m.id === selectedMoleculeId) || MOLECULES_DATA[0]
  );
  const [renderMode, setRenderMode] = useState<RenderMode>('ball-stick');
  const [autoRotate, setAutoRotate] = useState<boolean>(true);
  const [showLabels, setShowLabels] = useState<boolean>(true);
  const [zoom, setZoom] = useState<number>(65);
  const [rotation, setRotation] = useState<{ x: number; y: number }>({ x: 0.3, y: 0.5 });
  const [selectedAtom, setSelectedAtom] = useState<AtomCoord | null>(null);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const isDraggingRef = useRef<boolean>(false);
  const lastMousePosRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const animationFrameIdRef = useRef<number | null>(null);

  // Update if prop changes
  useEffect(() => {
    if (selectedMoleculeId) {
      const found = MOLECULES_DATA.find(m => m.id === selectedMoleculeId);
      if (found) setActiveMolecule(found);
    }
  }, [selectedMoleculeId]);

  // Render loop
  const drawScene = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    ctx.clearRect(0, 0, width, height);

    // Subtle radial background gradient
    const bgGradient = ctx.createRadialGradient(
      width / 2, height / 2, 20,
      width / 2, height / 2, width / 1.5
    );
    bgGradient.addColorStop(0, '#0a1024');
    bgGradient.addColorStop(1, '#030712');
    ctx.fillStyle = bgGradient;
    ctx.fillRect(0, 0, width, height);

    // Draw futuristic HUD coordinate rings
    ctx.strokeStyle = 'rgba(6, 182, 212, 0.08)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.arc(width / 2, height / 2, Math.min(width, height) * 0.42, 0, Math.PI * 2);
    ctx.stroke();

    ctx.strokeStyle = 'rgba(168, 85, 247, 0.06)';
    ctx.beginPath();
    ctx.arc(width / 2, height / 2, Math.min(width, height) * 0.32, 0, Math.PI * 2);
    ctx.stroke();

    // 3D rotation matrix calculation
    const cosX = Math.cos(rotation.x);
    const sinX = Math.sin(rotation.x);
    const cosY = Math.cos(rotation.y);
    const sinY = Math.sin(rotation.y);

    const projectedAtoms = activeMolecule.atoms.map(atom => {
      // Rotate around Y
      let x1 = atom.x * cosY + atom.z * sinY;
      let y1 = atom.y;
      let z1 = -atom.x * sinY + atom.z * cosY;

      // Rotate around X
      let x2 = x1;
      let y2 = y1 * cosX - z1 * sinX;
      let z2 = y1 * sinX + z1 * cosX;

      // Perspective projection
      const cameraDist = 4.5;
      const fov = 350;
      const scale = (fov / (cameraDist + z2)) * (zoom / 50);

      const screenX = width / 2 + x2 * scale;
      const screenY = height / 2 - y2 * scale;

      let radiusMultiplier = 1;
      if (renderMode === 'space-fill') radiusMultiplier = 2.4;
      if (renderMode === 'wireframe') radiusMultiplier = 0.5;

      const screenRadius = Math.max(4, (atom.radius * (scale / 60)) * radiusMultiplier);

      return {
        ...atom,
        screenX,
        screenY,
        screenRadius,
        depth: z2,
        scale
      };
    });

    // Draw Bonds first (or sorted)
    if (renderMode !== 'space-fill') {
      activeMolecule.bonds.forEach(bond => {
        const a1 = projectedAtoms[bond.from];
        const a2 = projectedAtoms[bond.to];
        if (!a1 || !a2) return;

        const dx = a2.screenX - a1.screenX;
        const dy = a2.screenY - a1.screenY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist === 0) return;

        const normalX = -dy / dist;
        const normalY = dx / dist;

        if (renderMode === 'wireframe') {
          ctx.strokeStyle = 'rgba(6, 182, 212, 0.45)';
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.moveTo(a1.screenX, a1.screenY);
          ctx.lineTo(a2.screenX, a2.screenY);
          ctx.stroke();
          return;
        }

        // Ball and stick bonds
        const bondOffset = 4.5;
        const bondWidth = 5;

        const drawCylinder = (ox: number, oy: number) => {
          const grad = ctx.createLinearGradient(a1.screenX, a1.screenY, a2.screenX, a2.screenY);
          grad.addColorStop(0, a1.color);
          grad.addColorStop(0.5, 'rgba(148, 163, 184, 0.9)');
          grad.addColorStop(1, a2.color);

          ctx.strokeStyle = grad;
          ctx.lineWidth = bondWidth;
          ctx.lineCap = 'round';
          ctx.beginPath();
          ctx.moveTo(a1.screenX + ox, a1.screenY + oy);
          ctx.lineTo(a2.screenX + ox, a2.screenY + oy);
          ctx.stroke();
        };

        if (bond.order === 1) {
          drawCylinder(0, 0);
        } else if (bond.order === 2) {
          drawCylinder(normalX * bondOffset, normalY * bondOffset);
          drawCylinder(-normalX * bondOffset, -normalY * bondOffset);
        } else if (bond.order === 3) {
          drawCylinder(0, 0);
          drawCylinder(normalX * bondOffset * 1.4, normalY * bondOffset * 1.4);
          drawCylinder(-normalX * bondOffset * 1.4, -normalY * bondOffset * 1.4);
        }
      });
    }

    // Sort atoms by depth (Z-buffer painter's algorithm)
    const sortedAtoms = [...projectedAtoms].sort((a, b) => a.depth - b.depth);

    // Draw Atoms with 3D spherical lighting & glow
    sortedAtoms.forEach(atom => {
      const isSelected = selectedAtom?.id === atom.id;

      // Glow highlight for active/selected atom
      if (isSelected) {
        ctx.save();
        ctx.shadowColor = '#06b6d4';
        ctx.shadowBlur = 25;
        ctx.beginPath();
        ctx.arc(atom.screenX, atom.screenY, atom.screenRadius + 4, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(6, 182, 212, 0.3)';
        ctx.fill();
        ctx.restore();
      }

      if (renderMode === 'wireframe') {
        ctx.strokeStyle = atom.color;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(atom.screenX, atom.screenY, atom.screenRadius, 0, Math.PI * 2);
        ctx.stroke();
      } else {
        // 3D spherical radial gradient highlight
        const lightOffsetX = atom.screenRadius * 0.32;
        const lightOffsetY = atom.screenRadius * 0.32;
        const sphereGrad = ctx.createRadialGradient(
          atom.screenX - lightOffsetX, atom.screenY - lightOffsetY, atom.screenRadius * 0.1,
          atom.screenX, atom.screenY, atom.screenRadius
        );
        sphereGrad.addColorStop(0, '#ffffff');
        sphereGrad.addColorStop(0.35, atom.color);
        sphereGrad.addColorStop(0.85, darkenColor(atom.color, 0.4));
        sphereGrad.addColorStop(1, '#020617');

        ctx.fillStyle = sphereGrad;
        ctx.beginPath();
        ctx.arc(atom.screenX, atom.screenY, atom.screenRadius, 0, Math.PI * 2);
        ctx.fill();

        ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // Draw element symbol label over atom
      if (showLabels && (renderMode !== 'space-fill' || atom.screenRadius > 14)) {
        ctx.fillStyle = '#ffffff';
        ctx.font = `bold ${Math.max(10, Math.round(atom.screenRadius * 0.75))}px 'Plus Jakarta Sans', sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.shadowColor = '#000000';
        ctx.shadowBlur = 4;
        ctx.fillText(atom.element, atom.screenX, atom.screenY);
        ctx.shadowBlur = 0;
      }
    });
  }, [activeMolecule, renderMode, zoom, rotation, showLabels, selectedAtom]);

  // Animation frame loop
  useEffect(() => {
    let lastTime = performance.now();

    const loop = (time: number) => {
      const dt = (time - lastTime) / 1000;
      lastTime = time;

      if (autoRotate && !isDraggingRef.current) {
        setRotation(prev => ({
          x: prev.x + 0.15 * dt,
          y: prev.y + 0.35 * dt
        }));
      }

      drawScene();
      animationFrameIdRef.current = requestAnimationFrame(loop);
    };

    animationFrameIdRef.current = requestAnimationFrame(loop);
    return () => {
      if (animationFrameIdRef.current) cancelAnimationFrame(animationFrameIdRef.current);
    };
  }, [autoRotate, drawScene]);

  // Resize canvas according to device pixel ratio
  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      const ctx = canvas.getContext('2d');
      if (ctx) ctx.scale(dpr, dpr);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Mouse / Touch interaction handlers
  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    isDraggingRef.current = true;
    lastMousePosRef.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDraggingRef.current) return;
    const dx = e.clientX - lastMousePosRef.current.x;
    const dy = e.clientY - lastMousePosRef.current.y;
    lastMousePosRef.current = { x: e.clientX, y: e.clientY };

    setRotation(prev => ({
      x: prev.x - dy * 0.008,
      y: prev.y + dx * 0.008
    }));
  };

  const handleMouseUp = () => {
    isDraggingRef.current = false;
  };

  const handleWheel = (e: React.WheelEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    setZoom(prev => Math.min(120, Math.max(30, prev - e.deltaY * 0.05)));
  };

  // Helper function to darken color for lighting
  function darkenColor(hex: string, factor: number): string {
    if (hex.startsWith('#') && hex.length === 7) {
      const r = Math.round(parseInt(hex.slice(1, 3), 16) * factor);
      const g = Math.round(parseInt(hex.slice(3, 5), 16) * factor);
      const b = Math.round(parseInt(hex.slice(5, 7), 16) * factor);
      return `rgb(${r}, ${g}, ${b})`;
    }
    return hex;
  }

  const name = currentLang === 'uz' ? activeMolecule.nameUz : currentLang === 'ru' ? activeMolecule.nameRu : activeMolecule.nameEn;
  const description = currentLang === 'uz' ? activeMolecule.descriptionUz : currentLang === 'ru' ? activeMolecule.descriptionRu : activeMolecule.descriptionEn;

  return (
    <div className="w-full flex flex-col xl:flex-row gap-6">
      {/* 3D Visualizer Main Screen */}
      <div className="flex-1 neon-border rounded-2xl p-4 sm:p-6 flex flex-col relative overflow-hidden bg-slate-950/80 shadow-2xl">
        {/* Top HUD Controls */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-4 z-10">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
              <span className="text-xs uppercase tracking-wider text-cyan-400 font-mono font-semibold">
                3D Kvant Modellashtirish
              </span>
            </div>
            <h3 className="text-2xl font-bold font-hud text-white flex items-center gap-2">
              {name} <span className="text-cyan-400 font-mono">({activeMolecule.formula})</span>
            </h3>
          </div>

          {/* Mode Switcher */}
          <div className="flex items-center bg-slate-900/90 border border-slate-800 rounded-xl p-1 gap-1">
            <button
              onClick={() => setRenderMode('ball-stick')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                renderMode === 'ball-stick'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Sharlar va bog'lar
            </button>
            <button
              onClick={() => setRenderMode('space-fill')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                renderMode === 'space-fill'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Fazo to'ldiruvchi (vdW)
            </button>
            <button
              onClick={() => setRenderMode('wireframe')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                renderMode === 'wireframe'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Karkasli (Wireframe)
            </button>
          </div>
        </div>

        {/* 3D Canvas Area */}
        <div className="relative w-full h-[450px] sm:h-[520px] rounded-xl overflow-hidden cursor-grab active:cursor-grabbing border border-slate-800/80 bg-slate-950">
          <canvas
            ref={canvasRef}
            className="w-full h-full block"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onWheel={handleWheel}
          />

          {/* Interactive Floating Tool HUD */}
          <div className="absolute bottom-4 left-4 flex flex-wrap items-center gap-2 bg-slate-900/90 backdrop-blur-md border border-slate-800/80 rounded-xl p-2 z-10">
            <button
              onClick={() => setAutoRotate(!autoRotate)}
              title="Avtomatik aylanish"
              className={`p-2 rounded-lg text-xs font-medium transition-colors flex items-center gap-1.5 ${
                autoRotate ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Rotate3d className="w-4 h-4" />
              <span>Aylanish</span>
            </button>

            <button
              onClick={() => setShowLabels(!showLabels)}
              title="Element belgilarini ko'rsatish"
              className={`p-2 rounded-lg text-xs font-medium transition-colors flex items-center gap-1.5 ${
                showLabels ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30' : 'text-slate-400 hover:text-white'
              }`}
            >
              <AtomIcon className="w-4 h-4" />
              <span>Belgilar</span>
            </button>

            <button
              onClick={() => {
                setRotation({ x: 0.3, y: 0.5 });
                setZoom(65);
                setSelectedAtom(null);
              }}
              title="Kamerani boshlang'ich holatga qaytarish"
              className="p-2 rounded-lg text-xs font-medium text-slate-400 hover:text-white transition-colors flex items-center gap-1.5"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Tiklash</span>
            </button>

            <div className="h-4 w-px bg-slate-800 mx-1 hidden sm:block" />

            <div className="hidden sm:flex items-center gap-2 text-xs text-slate-400 pl-1">
              <span>Masshtab:</span>
              <input
                type="range"
                min="30"
                max="120"
                value={zoom}
                onChange={e => setZoom(Number(e.target.value))}
                className="w-20 accent-cyan-500 cursor-pointer"
              />
            </div>
          </div>

          {/* Quick HUD legend badge */}
          <div className="absolute top-4 right-4 bg-slate-900/80 backdrop-blur-md border border-slate-800/80 rounded-lg px-3 py-1.5 text-xs text-slate-300 font-mono flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>Atomlar: {activeMolecule.atoms.length}</span>
            <span className="text-slate-600">|</span>
            <span>Bog'lar: {activeMolecule.bonds.length}</span>
          </div>
        </div>

        {/* Quick Molecule Selector Carousel */}
        <div className="mt-4 pt-3 border-t border-slate-800/80">
          <div className="text-xs uppercase tracking-wider text-slate-400 font-mono mb-2 flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-cyan-400" />
            <span>Molekulalar kolleksiyasi:</span>
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin">
            {MOLECULES_DATA.map(mol => {
              const molName = currentLang === 'uz' ? mol.nameUz : currentLang === 'ru' ? mol.nameRu : mol.nameEn;
              const isSelected = mol.id === activeMolecule.id;
              return (
                <button
                  key={mol.id}
                  onClick={() => {
                    setActiveMolecule(mol);
                    setSelectedAtom(null);
                  }}
                  className={`px-3 py-2 rounded-xl text-left transition-all shrink-0 border ${
                    isSelected
                      ? 'bg-cyan-500/20 border-cyan-500/60 text-white shadow-lg shadow-cyan-500/10'
                      : 'bg-slate-900/60 border-slate-800/80 text-slate-300 hover:border-slate-700 hover:text-white'
                  }`}
                >
                  <div className="font-mono text-cyan-400 font-bold text-xs">{mol.formula}</div>
                  <div className="text-xs font-medium truncate max-w-[110px]">{molName}</div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Right Molecular Property Specs HUD */}
      <div className="w-full xl:w-96 flex flex-col gap-4">
        {/* Molecule Overview Card */}
        <div className="neon-border rounded-2xl p-5 bg-slate-950/80">
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-wider mb-2">
            <Info className="w-4 h-4" />
            <span>Molekulyar ma'lumotlar</span>
          </div>
          <h4 className="text-xl font-bold font-hud text-white mb-1">
            {name}
          </h4>
          <p className="text-xs text-slate-300 leading-relaxed mb-4">
            {description}
          </p>

          <div className="grid grid-cols-2 gap-3 text-xs font-mono mb-4">
            <div className="bg-slate-900/80 border border-slate-800/80 rounded-xl p-3">
              <span className="text-slate-400 block mb-0.5">Molyar massa:</span>
              <span className="text-cyan-300 font-bold text-sm">{activeMolecule.molarMass} g/mol</span>
            </div>
            <div className="bg-slate-900/80 border border-slate-800/80 rounded-xl p-3">
              <span className="text-slate-400 block mb-0.5">Geometriya:</span>
              <span className="text-white font-semibold text-xs truncate block">{activeMolecule.geometry}</span>
            </div>
            <div className="bg-slate-900/80 border border-slate-800/80 rounded-xl p-3">
              <span className="text-slate-400 block mb-0.5">Bog' burchaklari:</span>
              <span className="text-purple-300 font-semibold">{activeMolecule.bondAngles}</span>
            </div>
            <div className="bg-slate-900/80 border border-slate-800/80 rounded-xl p-3">
              <span className="text-slate-400 block mb-0.5">Qutblilik:</span>
              <span className={`font-semibold ${activeMolecule.polarity.includes('Polar') ? 'text-amber-400' : 'text-emerald-400'}`}>
                {activeMolecule.polarity}
              </span>
            </div>
          </div>

          <div className="bg-slate-900/50 border border-slate-800/80 rounded-xl p-3">
            <span className="text-xs font-mono text-slate-400 block mb-1">Qo'llanilishi:</span>
            <ul className="text-xs text-slate-300 space-y-1">
              {activeMolecule.applicationsUz.map((app, idx) => (
                <li key={idx} className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                  <span>{app}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Atom Breakdown & CPK Color Legend */}
        <div className="neon-border rounded-2xl p-5 bg-slate-950/80">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">
              Atomlar tarkibi ({activeMolecule.atoms.length} ta)
            </span>
            <span className="text-[11px] text-cyan-400 font-mono">CPK rang standarti</span>
          </div>

          <div className="space-y-2 max-h-48 overflow-y-auto pr-1 scrollbar-thin">
            {activeMolecule.atoms.map((atom) => {
              const isSelected = selectedAtom?.id === atom.id;
              return (
                <button
                  key={atom.id}
                  onClick={() => setSelectedAtom(isSelected ? null : atom)}
                  className={`w-full flex items-center justify-between p-2 rounded-xl border text-xs transition-all ${
                    isSelected
                      ? 'bg-cyan-500/20 border-cyan-500/60 text-white'
                      : 'bg-slate-900/60 border-slate-800/80 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span
                      className="w-4 h-4 rounded-full border border-white/30 shrink-0"
                      style={{ backgroundColor: atom.color }}
                    />
                    <span className="font-mono font-bold text-white">Atom #{atom.id + 1} ({atom.element})</span>
                  </div>
                  <span className="text-slate-400 font-mono text-[11px]">
                    x:{atom.x.toFixed(2)}, y:{atom.y.toFixed(2)}, z:{atom.z.toFixed(2)}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
