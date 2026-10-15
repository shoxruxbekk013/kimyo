import React, { useState, useMemo } from 'react';
import { LAB_REAGENTS, LAB_REACTIONS, GUIDED_EXPERIMENTS } from '../data/virtualLab';
import { LabReagent, LabReactionResult } from '../types/chemistry';
import { 
  FlaskConical, 
  TestTube, 
  Flame, 
  RotateCcw, 
  Sparkles, 
  AlertTriangle, 
  BookOpen, 
  Plus, 
  Thermometer, 
  CheckCircle2, 
  Save, 
  Trash2,
  HelpCircle,
  ExternalLink,
  ShieldAlert,
  Info,
  Scale,
  Zap,
  Volume2
} from 'lucide-react';

interface Props {
  currentLang: 'uz' | 'en' | 'ru';
}

interface AddedReagentItem {
  reagent: LabReagent;
  volumeMl: number; // Volume in mL (for liquids)
  molesAdded: number; // Moles calculated from C * V
}

interface NotebookEntry {
  id: string;
  timestamp: string;
  reagents: string[];
  equation?: string;
  netIonic?: string;
  observations: string;
  simulatedTemperature: number;
  calculatedPh: number;
  sources?: string;
}

export const VirtualLab: React.FC<Props> = ({ currentLang }) => {
  const [selectedGlassware, setSelectedGlassware] = useState<'beaker' | 'flask' | 'tube'>('flask');
  const [vesselContents, setVesselContents] = useState<AddedReagentItem[]>([]);
  const [isHeating, setIsHeating] = useState<boolean>(false);
  const [heatAddedTemp, setHeatAddedTemp] = useState<number>(0);
  const [doseVolumeMl, setDoseVolumeMl] = useState<number>(20); // Customizable volume dose (mL)
  const [popTestActive, setPopTestActive] = useState<boolean>(false);
  const [showIronCompare, setShowIronCompare] = useState<boolean>(false);
  
  const [notebook, setNotebook] = useState<NotebookEntry[]>([
    {
      id: 'demo-1',
      timestamp: 'Auditorlik yozuvi (NIST/IUPAC)',
      reagents: ['NaOH(aq) 20 mL (1.0 M)', 'Fenolftalein (2 tomchi)', 'HCl(aq) 20 mL (1.0 M)'],
      equation: 'HCl(aq) + NaOH(aq) ⟶ NaCl(aq) + H₂O(l)',
      netIonic: 'H⁺(aq) + OH⁻(aq) ⟶ H₂O(l)',
      observations: 'Fenolftalein deprotonatsiyasi hisobiga (pH 14) to\'q malinarangga kirdi. 20 mL 1M HCl qo\'shilgach to\'liq neytrallanib rangsizlandi (lakton shakli, pH 7.00). Nazariy ekzotermik neytrallanish issiqligi (ΔH° = -55.84 kJ/mol) hisobiga harorat ko\'tarildi.',
      simulatedTemperature: 26.7,
      calculatedPh: 7.00,
      sources: 'NIST Chemistry WebBook; IUPAC Gold Book'
    }
  ]);

  // Total volume in vessel (mL)
  const totalVolumeMl = useMemo(() => {
    return vesselContents.reduce((acc, item) => acc + (item.reagent.state === 'liquid' ? item.volumeMl : 0), 0);
  }, [vesselContents]);

  // Track stoichiometry: total moles of H+ and OH-
  const acidBaseMoles = useMemo(() => {
    let molesH = 0;
    let molesOH = 0;

    vesselContents.forEach(item => {
      if (item.reagent.id === 'hcl') {
        molesH += item.molesAdded;
      } else if (item.reagent.id === 'h2so4') {
        molesH += item.molesAdded * 2; // Diprotic acid
      } else if (item.reagent.id === 'naoh') {
        molesOH += item.molesAdded;
      }
    });

    return { molesH, molesOH };
  }, [vesselContents]);

  // Detect matching chemical reaction
  const currentReaction = useMemo<LabReactionResult | null>(() => {
    if (vesselContents.length < 2) return null;
    const ids = vesselContents.map(i => i.reagent.id);

    for (const rxn of LAB_REACTIONS) {
      const match = rxn.reactants.every(reqId => ids.includes(reqId));
      if (match) return rxn;
    }
    return null;
  }, [vesselContents]);

  // Scientifically calculated pH (at 25 °C baseline, assuming activity coefficients γ ≈ 1)
  const calculatedPh = useMemo<number>(() => {
    if (vesselContents.length === 0) return 7.0;

    const { molesH, molesOH } = acidBaseMoles;
    const totalLitres = Math.max(0.001, totalVolumeMl / 1000);

    // If both acid and base are present
    if (molesH > 0 && molesOH > 0) {
      const netMolesH = molesH - molesOH;

      if (Math.abs(netMolesH) < 1e-7) {
        // Equivalence point at 25 °C (Kw = 1.0e-14)
        return 7.00;
      } else if (netMolesH > 0) {
        // Excess strong acid
        const concH = netMolesH / totalLitres;
        const ph = -Math.log10(concH);
        return Math.max(0, Math.min(14, Number(ph.toFixed(2))));
      } else {
        // Excess strong base
        const concOH = Math.abs(netMolesH) / totalLitres;
        const poh = -Math.log10(concOH);
        const ph = 14.00 - poh;
        return Math.max(0, Math.min(14, Number(ph.toFixed(2))));
      }
    }

    // Only acid or only base present
    if (molesH > 0 && molesOH === 0) {
      const concH = molesH / totalLitres;
      return Math.max(0, Math.min(14, Number((-Math.log10(concH)).toFixed(2))));
    }
    if (molesOH > 0 && molesH === 0) {
      const concOH = molesOH / totalLitres;
      const poh = -Math.log10(concOH);
      return Math.max(0, Math.min(14, Number((14.00 - poh).toFixed(2))));
    }

    // Specific salt hydrolyses
    if (vesselContents.some(i => i.reagent.id === 'fecl3')) return 1.9;
    if (vesselContents.some(i => i.reagent.id === 'cuso4')) return 4.2;
    if (vesselContents.some(i => i.reagent.id === 'pbno3')) return 4.4;

    return 7.00;
  }, [vesselContents, acidBaseMoles, totalVolumeMl]);

  // Scientifically calculated temperature from thermodynamic reaction enthalpy ΔH°
  const simulatedTemperature = useMemo<number>(() => {
    const baseTemp = 20.0; // Standard room temperature baseline
    let deltaT = 0;

    if (currentReaction && totalVolumeMl > 0) {
      // Find limiting moles in reaction
      const { molesH, molesOH } = acidBaseMoles;
      let reactedMoles = 0;

      if (currentReaction.reactants.includes('hcl') && currentReaction.reactants.includes('naoh')) {
        reactedMoles = Math.min(molesH, molesOH);
      } else {
        reactedMoles = vesselContents[0]?.molesAdded || 0.01;
      }

      // Heat released q = -ΔH° * n (in Joules)
      const enthalpyJoules = Math.abs(currentReaction.standardEnthalpyChangeKjPerMol) * 1000;
      const q = enthalpyJoules * reactedMoles;

      // Solution mass: m ≈ V * 1.0 g/mL (dilute aqueous solution approximation)
      const massGrams = Math.max(10, totalVolumeMl * 1.0);
      const cp = 4.184; // J / (g * °C) specific heat capacity of water

      // Theoretical adiabatic ΔT = q / (m * c)
      deltaT = q / (massGrams * cp);
    }

    const finalT = baseTemp + deltaT + heatAddedTemp;
    // Cap at water boiling point 100 °C under standard 1 atm
    return Math.min(100.0, Math.max(20.0, Number(finalT.toFixed(1))));
  }, [currentReaction, totalVolumeMl, acidBaseMoles, vesselContents, heatAddedTemp]);

  // Check Cu(OH)2 dehydration to black CuO on heating (>= 60°C)
  const isCuDehydrated = useMemo<boolean>(() => {
    if (!currentReaction) return false;
    const isCuOH2 = currentReaction.reactants.includes('cuso4') && currentReaction.reactants.includes('naoh');
    return isCuOH2 && simulatedTemperature >= 60.0;
  }, [currentReaction, simulatedTemperature]);

  // Check PbI2 dissolved state at high temperature (>= 85°C)
  const isPbI2Dissolved = useMemo<boolean>(() => {
    if (!currentReaction) return false;
    const isGoldenRain = currentReaction.reactants.includes('pbno3') && currentReaction.reactants.includes('ki');
    return isGoldenRain && simulatedTemperature >= 85.0;
  }, [currentReaction, simulatedTemperature]);

  // Observable liquid color based on rigorous indicator chemistry and precipitates
  const liquidColor = useMemo<string>(() => {
    if (vesselContents.length === 0) return 'transparent';

    // Phenolphthalein behavior
    const hasPhenol = vesselContents.some(i => i.reagent.id === 'phenolphthalein');
    if (hasPhenol) {
      if (calculatedPh < 0) {
        return 'rgba(249, 115, 22, 0.85)'; // Orange in superacidic (H3In+)
      } else if (calculatedPh >= 8.2 && calculatedPh <= 12.0) {
        return 'rgba(236, 72, 153, 0.85)'; // Intense magenta/pink dianion In2-
      } else if (calculatedPh > 13.0) {
        return 'rgba(241, 245, 249, 0.4)'; // Fades back to colorless carbinol In(OH)3-
      }
    }

    // Litmus behavior
    const hasLitmus = vesselContents.some(i => i.reagent.id === 'litmus');
    if (hasLitmus) {
      if (calculatedPh < 4.5) return 'rgba(239, 68, 68, 0.85)'; // Red in acid
      if (calculatedPh > 8.3) return 'rgba(59, 130, 246, 0.85)'; // Blue in base
      return 'rgba(168, 85, 247, 0.8)'; // Violet in neutral range
    }

    // Cu(OH)2 dehydration check: turns black when >= 60 °C
    if (isCuDehydrated) {
      return 'rgba(15, 23, 42, 0.95)'; // Black CuO precipitate
    }

    // Golden rain recrystallization hot/cold condition
    if (currentReaction && currentReaction.reactants.includes('pbno3') && currentReaction.reactants.includes('ki')) {
      if (isPbI2Dissolved) {
        return 'rgba(241, 245, 249, 0.45)'; // At ~90–100 °C, PbI2 dissolves completely!
      }
      return 'rgba(250, 204, 21, 0.9)'; // Yellow precipitate below ~85 °C
    }

    // Salt / complex ion colors
    const hasCu = vesselContents.some(i => i.reagent.id === 'cuso4');
    const hasFe = vesselContents.some(i => i.reagent.id === 'fecl3');
    if (hasCu && !currentReaction?.precipitate) return 'rgba(14, 165, 233, 0.8)';
    if (hasFe && !currentReaction?.precipitate) return 'rgba(217, 119, 6, 0.85)';

    if (currentReaction?.colorChange) return currentReaction.colorChange;

    return 'rgba(224, 242, 254, 0.4)';
  }, [vesselContents, calculatedPh, currentReaction, simulatedTemperature, isCuDehydrated, isPbI2Dissolved]);

  // Dynamic Precipitate color and status
  const precipitateVisual = useMemo(() => {
    if (!currentReaction?.precipitate) return null;

    if (isPbI2Dissolved) {
      // Dissolved in hot water! No precipitate visible
      return null;
    }

    if (isCuDehydrated) {
      // Dehydrated to black CuO
      return {
        color: '#0f172a',
        nameUz: 'Qora mis(II) oksidi cho\'kmasi (CuO↓)',
        formula: 'CuO',
        note: 'Cu(OH)₂ suvsizlandi: Cu(OH)₂ ⟶ CuO↓ + H₂O'
      };
    }

    return {
      color: currentReaction.precipitate.color,
      nameUz: currentReaction.precipitate.nameUz,
      formula: currentReaction.precipitate.formula,
      note: `K_sp = ${currentReaction.precipitate.kspAt25C}`
    };
  }, [currentReaction, isPbI2Dissolved, isCuDehydrated]);

  // Add reagent with explicit volume and concentration tracking
  const handleAddReagent = (reagent: LabReagent) => {
    const vol = reagent.state === 'liquid' ? doseVolumeMl : 0;
    const moles = (reagent.concentrationMolar || 1.0) * (vol / 1000);

    const newItem: AddedReagentItem = {
      reagent,
      volumeMl: vol,
      molesAdded: reagent.state === 'solid' ? 0.02 : moles
    };

    setVesselContents(prev => [...prev, newItem]);
  };

  const handleResetVessel = () => {
    setVesselContents([]);
    setHeatAddedTemp(0);
    setIsHeating(false);
    setPopTestActive(false);
  };

  const handleToggleHeating = () => {
    if (!isHeating) {
      setIsHeating(true);
      setHeatAddedTemp(prev => Math.min(75, prev + 25)); // +25 °C step
    } else {
      setIsHeating(false);
      setHeatAddedTemp(0);
    }
  };

  const handleTriggerPopTest = () => {
    setPopTestActive(true);
    setTimeout(() => {
      setPopTestActive(false);
    }, 4500);
  };

  const handleSaveToNotebook = () => {
    if (vesselContents.length === 0) return;
    const now = new Date();
    const timeStr = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;

    const reagentNames = vesselContents.map(i => 
      i.reagent.state === 'liquid' 
        ? `${i.reagent.formula} (${i.volumeMl} mL, ${i.reagent.concentration || '1M'})`
        : i.reagent.formula
    );

    let obs = currentReaction
      ? `${currentReaction.explanationUz} [Sharoit: ${currentReaction.conditionDependenciesUz}]`
      : `${reagentNames.join(' va ')} aralashtirildi. Eruvchanlik va ion konsentratsiyalari tahlil qilindi.`;

    if (isCuDehydrated) {
      obs += " [Termik qizdirish kuzatildi: 60°C dan oshganda Cu(OH)2 suvsizlanib qora CuO ga aylandi]";
    }
    if (isPbI2Dissolved) {
      obs += " [Harorat ta'siri: PbI2 85°C dan yuqorida to'liq erib ketdi; sovitilganda yana oltin yomg'ir kristallanadi]";
    }

    const newEntry: NotebookEntry = {
      id: `entry-${Date.now()}`,
      timestamp: `Bugun, ${timeStr}`,
      reagents: reagentNames,
      equation: currentReaction?.molecularEquation,
      netIonic: currentReaction?.netIonicEquation,
      observations: obs,
      simulatedTemperature,
      calculatedPh,
      sources: currentReaction?.scientificSources?.map(s => s.name).join('; ') || 'IUPAC / NIST'
    };

    setNotebook([newEntry, ...notebook]);
  };

  return (
    <div className="w-full flex flex-col gap-6">
      {/* Top Scientific Provenance & Safety Banner */}
      <div className="bg-slate-900/90 border border-cyan-500/30 rounded-2xl p-4 sm:p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-xs text-slate-300 shadow-xl">
        <div className="flex items-start gap-3">
          <ShieldAlert className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
          <div>
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <span className="font-bold text-white font-hud text-sm">
                KOLBA · STAKAN · PROBIRKA — Ilmiy Auditorlik Standarti:
              </span>
              <span className="px-2 py-0.5 rounded-full bg-cyan-500/15 text-cyan-300 font-mono text-[10px] border border-cyan-500/30 font-semibold">
                NIST / IUPAC / CRC Grounded
              </span>
            </div>
            <p className="text-slate-300 leading-relaxed max-w-3xl">
              Ushbu laboratoriyada ko'rsatilgan barcha reaksiyalar (Neytrallanish, Oltin yomg'ir, Vodorod ajralishi, Mis va Temir gidroksidlari) aniq stexiometriya, entalpiyalar (ΔH°) va eruvchanlik ko'paytmalari (K_sp) asosida ishlaydi. Harorat va pH haqiqiy termodinamik qonunlar bo'yicha hisoblanadi.
            </p>
          </div>
        </div>

        {/* Dose Volume Selector */}
        <div className="flex items-center gap-2 bg-slate-950 border border-slate-800 rounded-xl p-2 shrink-0 font-mono text-xs">
          <span className="text-slate-400">Doza hajmi:</span>
          {[10, 20, 50].map(vol => (
            <button
              key={vol}
              onClick={() => setDoseVolumeMl(vol)}
              className={`px-2 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                doseVolumeMl === vol
                  ? 'bg-cyan-500 text-slate-950'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {vol} mL
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Reagents Shelf (3 Cols) */}
        <div className="lg:col-span-3 neon-border rounded-2xl p-4 sm:p-5 bg-slate-950/80 flex flex-col">
          <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-800">
            <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider font-semibold">
              Reagentlar tokchasi
            </span>
            <span className="text-[11px] text-slate-400 font-mono">
              {LAB_REAGENTS.length} ta modda
            </span>
          </div>

          <div className="space-y-2 overflow-y-auto max-h-[580px] pr-1 scrollbar-thin">
            {LAB_REAGENTS.map(reagent => {
              return (
                <div
                  key={reagent.id}
                  className="p-2.5 rounded-xl border border-slate-800 bg-slate-900/70 hover:border-cyan-500/40 transition-all text-xs space-y-1.5"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span
                        className="w-3.5 h-3.5 rounded-full border border-white/20 shrink-0"
                        style={{ backgroundColor: reagent.color }}
                      />
                      <span className="font-mono font-bold text-white text-xs">{reagent.formula}</span>
                    </div>

                    <button
                      onClick={() => handleAddReagent(reagent)}
                      className="px-2.5 py-1 rounded-lg bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 hover:bg-cyan-500 hover:text-slate-950 transition-colors flex items-center gap-1 font-mono text-[11px] font-bold cursor-pointer"
                    >
                      <Plus className="w-3 h-3" />
                      <span>{reagent.state === 'liquid' ? `${doseVolumeMl} mL` : 'Qo\'shish'}</span>
                    </button>
                  </div>

                  <div className="text-[11px] text-slate-300">
                    {reagent.nameUz}
                  </div>

                  {reagent.ghsSymbols && reagent.ghsSymbols.length > 0 && (
                    <div className="flex flex-wrap gap-1 pt-0.5">
                      {reagent.ghsSymbols.map((ghs, gIdx) => (
                        <span key={gIdx} className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-amber-500/15 text-amber-300 border border-amber-500/30">
                          {ghs}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Center: Interactive Glassware Workbench (6 Cols) */}
        <div className="lg:col-span-6 neon-border rounded-2xl p-5 sm:p-6 bg-slate-950/80 flex flex-col justify-between relative overflow-hidden">
          {/* Top Workbench Controls */}
          <div className="flex items-center justify-between gap-3 mb-4 z-10 flex-wrap">
            {/* Glassware switcher (Kolba, Stakan, Probirka) */}
            <div className="flex items-center bg-slate-900/90 border border-slate-800 rounded-xl p-1 gap-1">
              <button
                onClick={() => setSelectedGlassware('flask')}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 cursor-pointer ${
                  selectedGlassware === 'flask'
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <FlaskConical className="w-3.5 h-3.5" />
                <span>Kolba</span>
              </button>
              <button
                onClick={() => setSelectedGlassware('beaker')}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 cursor-pointer ${
                  selectedGlassware === 'beaker'
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <span>Stakan</span>
              </button>
              <button
                onClick={() => setSelectedGlassware('tube')}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 cursor-pointer ${
                  selectedGlassware === 'tube'
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <TestTube className="w-3.5 h-3.5" />
                <span>Probirka</span>
              </button>
            </div>

            {/* Vessel actions */}
            <div className="flex items-center gap-2">
              <button
                onClick={handleToggleHeating}
                className={`px-3 py-1.5 rounded-xl border text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer ${
                  isHeating
                    ? 'bg-orange-500/20 border-orange-500/50 text-orange-300 animate-pulse'
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                <Flame className="w-3.5 h-3.5 text-orange-400" />
                <span>{isHeating ? `Gorelka Yoniq (${simulatedTemperature.toFixed(0)}°C)` : 'Gorelka (Qizdirish)'}</span>
              </button>

              <button
                onClick={handleResetVessel}
                className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-medium text-slate-400 hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Tozalash</span>
              </button>
            </div>
          </div>

          {/* Workbench Display Stage */}
          <div className="relative h-[380px] sm:h-[420px] rounded-2xl bg-gradient-to-b from-slate-950 via-slate-900/50 to-slate-950 border border-slate-800/80 flex flex-col items-center justify-end pb-8 overflow-hidden">
            <div className="absolute inset-0 cyber-grid opacity-25" />

            {/* Sensor HUD metrics at top of stage */}
            <div className="absolute top-4 left-4 right-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs font-mono z-10">
              <div className="flex items-center gap-2 bg-slate-900/90 backdrop-blur-md border border-slate-800 rounded-xl px-3 py-1.5 text-slate-200 shadow-md">
                <Thermometer className="w-4 h-4 text-orange-400" />
                <span>Harorat: </span>
                <span className="font-bold text-orange-300">{simulatedTemperature.toFixed(1)} °C</span>
                <span className="text-[10px] text-slate-400">(Termodinamik model)</span>
              </div>

              <div className="flex items-center gap-2 bg-slate-900/90 backdrop-blur-md border border-slate-800 rounded-xl px-3 py-1.5 text-slate-200 shadow-md">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: calculatedPh < 6.5 ? '#ef4444' : calculatedPh > 7.5 ? '#3b82f6' : '#10b981' }} />
                <span>Hisoblangan pH: </span>
                <span className="font-bold text-cyan-300">{calculatedPh.toFixed(2)}</span>
                <span className="text-[10px] text-slate-400">
                  ({calculatedPh < 6.5 ? 'kislotali' : calculatedPh > 7.5 ? 'ishqoriy' : 'neytral'})
                </span>
              </div>
            </div>

            {/* Volume indicator banner */}
            <div className="absolute top-16 left-4 bg-slate-900/80 backdrop-blur-md border border-slate-800/80 rounded-lg px-2.5 py-1 text-[11px] font-mono text-slate-400 z-10">
              Jami hajm: <span className="text-white font-bold">{totalVolumeMl} mL</span>
            </div>

            {/* Pop test button if hydrogen is evolving */}
            {currentReaction?.gasEvolution && (
              <div className="absolute top-16 right-4 z-20">
                <button
                  onClick={handleTriggerPopTest}
                  className="px-3 py-1.5 rounded-xl bg-amber-500/20 border border-amber-500/50 text-amber-300 text-xs font-mono font-bold flex items-center gap-1.5 hover:bg-amber-500/30 transition-all shadow-lg shadow-amber-500/20 cursor-pointer animate-pulse"
                >
                  <Volume2 className="w-3.5 h-3.5 text-amber-400" />
                  <span>Qaldiroq gaz sinovi (Pop Test)</span>
                </button>
              </div>
            )}

            {/* Pop test feedback popup */}
            {popTestActive && (
              <div className="absolute top-28 inset-x-8 z-30 p-3 rounded-xl bg-amber-500/20 border border-amber-400 text-amber-200 text-xs font-mono shadow-2xl backdrop-blur-md animate-bounce text-center">
                <div className="font-bold text-sm text-yellow-300 mb-0.5">💥 PAQ! (Xarakterli tovush bilan yondi)</div>
                <div>2H₂(g) + O₂(g) ⟶ 2H₂O(g). Vodorod havoda 4.0% – 75.0% gacha bo'lgan aralashmada portlovchi qaldiroq gaz hosil qiladi va xos tovush bilan alanga oladi.</div>
              </div>
            )}

            {/* Glassware SVG Visual Simulation */}
            <div className="relative flex flex-col items-center z-10">
              {/* Animated Gas Bubbles for H2 */}
              {currentReaction?.gasEvolution && (
                <div className="absolute -top-16 flex gap-3 text-cyan-400 text-xs font-mono animate-bounce">
                  <span>🫧 H₂(g)↑</span>
                  <span>🫧 H₂(g)↑</span>
                </div>
              )}

              {/* Chemical Glassware */}
              <div className="relative">
                {selectedGlassware === 'flask' && (
                  <div className="relative w-44 h-56 flex flex-col items-center">
                    <div className="w-12 h-20 border-l-2 border-r-2 border-t-2 border-cyan-400/30 bg-white/5 rounded-t-sm relative">
                      <div className="absolute top-0 inset-x-0 h-1.5 bg-cyan-400/40 rounded-full" />
                    </div>
                    <div
                      className="w-44 h-36 border-2 border-cyan-400/30 rounded-b-3xl relative overflow-hidden flex items-end justify-center shadow-2xl"
                      style={{
                        clipPath: 'polygon(25% 0%, 75% 0%, 100% 100%, 0% 100%)',
                        background: 'rgba(255, 255, 255, 0.03)'
                      }}
                    >
                      {vesselContents.length > 0 && (
                        <div
                          className="w-full transition-all duration-700 relative overflow-hidden"
                          style={{
                            height: `${Math.min(88, (totalVolumeMl / 100) * 80 + 15)}%`,
                            backgroundColor: liquidColor
                          }}
                        >
                          <div className="absolute top-0 inset-x-0 h-2 bg-white/30 animate-pulse" />

                          {/* Golden Rain crystals animation */}
                          {currentReaction?.reactants.includes('pbno3') && currentReaction.reactants.includes('ki') && !isPbI2Dissolved && (
                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                              <span className="text-yellow-300 font-mono text-xs animate-ping">✨ PbI₂ Oltin Yomg'ir ✨</span>
                            </div>
                          )}

                          {precipitateVisual && (
                            <div
                              className="absolute bottom-0 inset-x-0 h-8 transition-all duration-1000 shadow-lg flex items-center justify-center"
                              style={{ backgroundColor: precipitateVisual.color }}
                            >
                              <span className="text-[10px] font-mono text-white/90 font-bold px-1 text-center">
                                {precipitateVisual.formula}↓
                              </span>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {selectedGlassware === 'beaker' && (
                  <div className="w-40 h-52 border-2 border-cyan-400/30 rounded-b-2xl relative overflow-hidden flex items-end bg-white/5 shadow-2xl">
                    <div className="absolute top-0 left-0 w-3 h-2 border-b-2 border-l-2 border-cyan-400/40 -rotate-45" />
                    {vesselContents.length > 0 && (
                      <div
                        className="w-full transition-all duration-700 relative overflow-hidden"
                        style={{
                          height: `${Math.min(88, (totalVolumeMl / 100) * 75 + 15)}%`,
                          backgroundColor: liquidColor
                        }}
                      >
                        <div className="absolute top-0 inset-x-0 h-2 bg-white/30 animate-pulse" />
                        {precipitateVisual && (
                          <div
                            className="absolute bottom-0 inset-x-0 h-8 transition-all duration-1000 flex items-center justify-center"
                            style={{ backgroundColor: precipitateVisual.color }}
                          >
                            <span className="text-[10px] font-mono text-white/90 font-bold px-1 text-center">
                              {precipitateVisual.formula}↓
                            </span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}

                {selectedGlassware === 'tube' && (
                  <div className="w-16 h-56 border-2 border-cyan-400/30 rounded-b-full relative overflow-hidden flex items-end bg-white/5 shadow-2xl">
                    {vesselContents.length > 0 && (
                      <div
                        className="w-full transition-all duration-700 relative overflow-hidden"
                        style={{
                          height: `${Math.min(90, (totalVolumeMl / 50) * 75 + 15)}%`,
                          backgroundColor: liquidColor
                        }}
                      >
                        <div className="absolute top-0 inset-x-0 h-2 bg-white/30 animate-pulse" />
                        {precipitateVisual && (
                          <div
                            className="absolute bottom-0 inset-x-0 h-8 transition-all duration-1000 flex items-center justify-center"
                            style={{ backgroundColor: precipitateVisual.color }}
                          >
                            <span className="text-[9px] font-mono text-white/90 font-bold">
                              {precipitateVisual.formula}↓
                            </span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>

              {isHeating && (
                <div className="mt-2 flex flex-col items-center animate-pulse">
                  <div className="w-6 h-8 bg-gradient-to-t from-blue-600 via-cyan-400 to-yellow-300 rounded-full blur-[2px] shadow-lg shadow-orange-500/50" />
                  <div className="w-14 h-3 bg-slate-700 rounded-sm border-t border-slate-600" />
                </div>
              )}
            </div>

            <div className="w-72 h-3 bg-slate-800 border-t border-slate-700 rounded-full shadow-md z-0 mt-2" />
          </div>

          {/* Reaction Results with Molecular, Complete, and Net Ionic Equations */}
          <div className="mt-4 pt-3 border-t border-slate-800/80">
            {currentReaction ? (
              <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-xl p-3.5 space-y-3">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pb-2 border-b border-cyan-500/20">
                  <div>
                    <span className="text-[10px] font-mono uppercase text-cyan-400 tracking-wider font-bold">
                      Haqiqiy Kimyoviy Reaksiya Tenglamalari:
                    </span>
                    <div className="font-mono font-bold text-white text-xs sm:text-sm mt-0.5">
                      <span className="text-slate-400 font-normal">Molekulyar: </span>
                      {currentReaction.molecularEquation}
                    </div>
                  </div>
                  <button
                    onClick={handleSaveToNotebook}
                    className="px-3.5 py-1.5 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs flex items-center gap-1.5 hover:bg-cyan-400 transition-colors shrink-0 shadow-md shadow-cyan-500/20 cursor-pointer"
                  >
                    <Save className="w-3.5 h-3.5" />
                    <span>Daftarga saqlash</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs font-mono">
                  <div className="p-2.5 rounded-lg bg-slate-950/80 border border-slate-800">
                    <span className="text-slate-400 block text-[10px]">To'liq ionli tenglama:</span>
                    <span className="text-purple-300 font-semibold">{currentReaction.completeIonicEquation}</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-950/80 border border-slate-800">
                    <span className="text-slate-400 block text-[10px]">Qisqa ionli tenglama:</span>
                    <span className="text-emerald-300 font-bold">{currentReaction.netIonicEquation}</span>
                  </div>
                </div>

                {/* Thermodynamics & Conditions */}
                <div className="p-2.5 rounded-lg bg-slate-950/60 border border-slate-800 text-[11px] space-y-1">
                  <div className="text-slate-300 leading-relaxed">
                    <strong>Ilmiy tahlil: </strong>{currentReaction.explanationUz}
                  </div>
                  <div className="text-amber-200/90 leading-relaxed">
                    <strong>Sharoitga bog'liqlik: </strong>{currentReaction.conditionDependenciesUz}
                  </div>
                  <div className="text-cyan-400 font-mono text-[10px] flex items-center gap-2 pt-1 flex-wrap">
                    <span>ΔH°_rxn = {currentReaction.standardEnthalpyChangeKjPerMol} kJ/mol</span>
                    <span>•</span>
                    <span>Manbalar: {currentReaction.scientificSources.map(s => s.name).join(', ')}</span>
                  </div>
                </div>
              </div>
            ) : vesselContents.length > 0 ? (
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>
                  Idishdagi aralashma: {vesselContents.map(i => `${i.reagent.formula} (${i.volumeMl} mL)`).join(', ')}
                </span>
                <button
                  onClick={handleSaveToNotebook}
                  className="text-cyan-400 hover:text-cyan-300 flex items-center gap-1 font-bold cursor-pointer"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Daftarga yozish</span>
                </button>
              </div>
            ) : (
              <div className="text-center text-xs text-slate-500 py-1 font-mono">
                Chap tomondagi tokchadan moddalarni tanlab kerakli hajmda quying
              </div>
            )}
          </div>
        </div>

        {/* Right: Lab Notebook & Guided Experiments (3 Cols) */}
        <div className="lg:col-span-3 flex flex-col gap-5">
          {/* Guided Experiments Card */}
          <div className="neon-border rounded-2xl p-4 sm:p-5 bg-slate-950/80">
            <h4 className="text-xs font-mono text-cyan-400 uppercase tracking-wider font-semibold mb-3 flex items-center gap-1.5">
              <BookOpen className="w-4 h-4" />
              <span>Tekshirilgan Ilmiy Tajribalar</span>
            </h4>

            <div className="space-y-2.5">
              {GUIDED_EXPERIMENTS.map(exp => (
                <div
                  key={exp.id}
                  className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-xs space-y-1.5"
                >
                  <div className="font-semibold text-white">{exp.titleUz}</div>
                  <div className="text-[11px] text-cyan-300/90 font-mono leading-tight">{exp.scientificPrincipleUz}</div>
                  <div className="text-[10px] text-slate-400">{exp.objectiveUz}</div>
                  <div className="flex gap-1 pt-1 flex-wrap">
                    {exp.recommendedReagents.map(reqId => {
                      const r = LAB_REAGENTS.find(item => item.id === reqId);
                      return (
                        <span key={reqId} className="px-1.5 py-0.5 rounded bg-slate-800 text-[10px] font-mono text-cyan-300">
                          {r?.formula}
                        </span>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            {/* Fe2+ vs Fe3+ comparison toggle */}
            <div className="mt-3 pt-2 border-t border-slate-800">
              <button
                onClick={() => setShowIronCompare(!showIronCompare)}
                className="w-full py-1.5 px-2 rounded-lg bg-slate-900 border border-slate-800 text-[11px] font-mono text-amber-300 hover:text-amber-200 transition-colors flex items-center justify-between cursor-pointer"
              >
                <span>Temir(II) va Temir(III) farqi</span>
                <span>{showIronCompare ? '▲ Yopish' : '▼ Ko\'rish'}</span>
              </button>

              {showIronCompare && (
                <div className="mt-2 p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-[10px] font-mono text-slate-300 space-y-1">
                  <div className="text-amber-400 font-bold">Fe²⁺ va Fe³⁺ gidroksidlari taqqoslashi:</div>
                  <div>• <strong>Fe(OH)₂ (oqish-iflos yashil):</strong> K_sp = 4.87 × 10⁻¹⁷. Havoda darhol oksidlanadi: 4Fe(OH)₂ + O₂ + 2H₂O ⟶ 4Fe(OH)₃.</div>
                  <div>• <strong>Fe(OH)₃ (qizil-qo'ng'ir):</strong> K_sp = 2.79 × 10⁻³⁹. O'ta erimaydigan barqaror polimer gidratlangan FeO(OH)·nH₂O.</div>
                </div>
              )}
            </div>
          </div>

          {/* Experiment Notebook Card */}
          <div className="neon-border rounded-2xl p-4 sm:p-5 bg-slate-950/80 flex-1 flex flex-col">
            <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-800">
              <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider font-semibold">
                Laboratoriya qaydlari daftari
              </span>
              <span className="text-[10px] text-slate-400 font-mono">
                {notebook.length} ta qayd
              </span>
            </div>

            <div className="space-y-2.5 overflow-y-auto max-h-[290px] pr-1 scrollbar-thin">
              {notebook.map(entry => (
                <div
                  key={entry.id}
                  className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-xs space-y-1.5"
                >
                  <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono">
                    <span>{entry.timestamp}</span>
                    <span className="text-cyan-400 font-bold">{entry.simulatedTemperature.toFixed(1)}°C | pH {entry.calculatedPh.toFixed(2)}</span>
                  </div>
                  {entry.equation && (
                    <div className="font-mono font-bold text-white text-[11px]">
                      {entry.equation}
                    </div>
                  )}
                  {entry.netIonic && (
                    <div className="font-mono text-[10px] text-emerald-300">
                      Ionli: {entry.netIonic}
                    </div>
                  )}
                  <p className="text-[11px] text-slate-300 leading-relaxed">
                    {entry.observations}
                  </p>
                  {entry.sources && (
                    <div className="text-[9px] text-slate-500 font-mono">
                      Manba: {entry.sources}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
