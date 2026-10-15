import React, { useState, useMemo } from 'react';
import { ELEMENTS_DATA, ELEMENT_CATEGORIES } from '../data/elements';
import { ChemicalElement, ElementCategory, StateOfMatter } from '../types/chemistry';
import { 
  Search, 
  Filter, 
  X, 
  Sparkles, 
  Layers, 
  Atom as AtomIcon, 
  Info, 
  Compass, 
  Maximize2,
  Calendar,
  User,
  Zap
} from 'lucide-react';

interface Props {
  currentLang: 'uz' | 'en' | 'ru';
  onSelectElement?: (element: ChemicalElement) => void;
}

export const PeriodicTable: React.FC<Props> = ({ currentLang, onSelectElement }) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<ElementCategory | 'all'>('all');
  const [selectedState, setSelectedState] = useState<StateOfMatter | 'all'>('all');
  const [activeElement, setActiveElement] = useState<ChemicalElement | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'cards'>('grid');

  // Filter elements
  const filteredElements = useMemo(() => {
    return ELEMENTS_DATA.filter(el => {
      // Category filter
      if (selectedCategory !== 'all' && el.category !== selectedCategory) return false;
      // State filter
      if (selectedState !== 'all' && el.state !== selectedState) return false;
      // Search filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesSymbol = el.symbol.toLowerCase().includes(q);
        const matchesNumber = el.number.toString() === q;
        const matchesNameUz = el.nameUz.toLowerCase().includes(q);
        const matchesNameEn = el.nameEn.toLowerCase().includes(q);
        const matchesNameRu = el.nameRu.toLowerCase().includes(q);
        return matchesSymbol || matchesNumber || matchesNameUz || matchesNameEn || matchesNameRu;
      }
      return true;
    });
  }, [searchQuery, selectedCategory, selectedState]);

  // Map elements by grid coordinate: [period][group]
  const elementMap = useMemo(() => {
    const map = new Map<string, ChemicalElement>();
    ELEMENTS_DATA.forEach(el => {
      map.set(`${el.period}-${el.group}`, el);
    });
    return map;
  }, []);

  const getCategoryMeta = (cat: ElementCategory) => {
    return ELEMENT_CATEGORIES.find(c => c.id === cat) || ELEMENT_CATEGORIES[0];
  };

  return (
    <div className="w-full flex flex-col gap-6">
      {/* Control Bar: Search & Category Filters */}
      <div className="neon-border rounded-2xl p-4 sm:p-6 bg-slate-950/80">
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
          {/* Search bar */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-cyan-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Element nomi, belgisi yoki raqamini qidiring (masalan: Oltin, Au, 79)..."
              className="w-full pl-10 pr-4 py-2.5 bg-slate-900/90 border border-slate-800 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/80 focus:ring-1 focus:ring-cyan-500/50"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* State of Matter Switcher */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
            <span className="text-xs text-slate-400 font-mono shrink-0 mr-1">Holati:</span>
            {[
              { id: 'all', label: 'Barchasi' },
              { id: 'solid', label: 'Qattiq' },
              { id: 'liquid', label: 'Suyuq' },
              { id: 'gas', label: 'Gaz' },
              { id: 'synthetic', label: 'Sun\'iy' }
            ].map(item => (
              <button
                key={item.id}
                onClick={() => setSelectedState(item.id as StateOfMatter | 'all')}
                className={`px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all shrink-0 ${
                  selectedState === item.id
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                    : 'bg-slate-900/60 text-slate-400 border border-slate-800 hover:text-white'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* View mode toggle */}
          <div className="flex items-center gap-1 bg-slate-900/90 border border-slate-800 rounded-xl p-1 shrink-0">
            <button
              onClick={() => setViewMode('grid')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                viewMode === 'grid'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Klassik Jadval
            </button>
            <button
              onClick={() => setViewMode('cards')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                viewMode === 'cards'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Kartalar ro'yxati
            </button>
          </div>
        </div>

        {/* Categories Pills Carousel */}
        <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-thin">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-3 py-1 rounded-lg text-xs font-medium transition-all shrink-0 border ${
              selectedCategory === 'all'
                ? 'bg-white/10 text-white border-white/30'
                : 'text-slate-400 border-transparent hover:text-white'
            }`}
          >
            Barcha oilalar (118)
          </button>
          {ELEMENT_CATEGORIES.map(cat => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(isSelected ? 'all' : cat.id)}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all shrink-0 flex items-center gap-1.5 border ${
                  isSelected
                    ? `${cat.bg} text-white ${cat.border} shadow-sm`
                    : 'bg-slate-900/50 text-slate-400 border-slate-800/80 hover:text-slate-200'
                }`}
              >
                <span
                  className="w-2 h-2 rounded-full shrink-0"
                  style={{ backgroundColor: cat.color }}
                />
                <span>{cat.labelUz}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Table Display */}
      {viewMode === 'grid' ? (
        <div className="neon-border rounded-2xl p-4 sm:p-6 bg-slate-950/80 overflow-x-auto scrollbar-thin">
          <div className="min-w-[1020px]">
            {/* Header: Groups 1 to 18 */}
            <div className="grid grid-cols-18 gap-1.5 mb-2 text-center">
              {Array.from({ length: 18 }, (_, i) => i + 1).map(grp => (
                <div key={grp} className="text-[11px] font-mono text-slate-500">
                  {grp}
                </div>
              ))}
            </div>

            {/* Periods 1 to 7 */}
            <div className="space-y-1.5">
              {[1, 2, 3, 4, 5, 6, 7].map(period => (
                <div key={period} className="grid grid-cols-18 gap-1.5">
                  {Array.from({ length: 18 }, (_, i) => i + 1).map(group => {
                    // Lanthanides placeholder in period 6, group 3
                    if (period === 6 && group === 3) {
                      return (
                        <div
                          key={`lanth-${period}-${group}`}
                          className="h-16 rounded-xl border border-pink-500/30 bg-pink-500/10 flex flex-col items-center justify-center text-[10px] text-pink-300 font-mono font-semibold"
                        >
                          <span>57-71</span>
                          <span className="text-[8px] uppercase">La-Lu</span>
                        </div>
                      );
                    }
                    // Actinides placeholder in period 7, group 3
                    if (period === 7 && group === 3) {
                      return (
                        <div
                          key={`act-${period}-${group}`}
                          className="h-16 rounded-xl border border-violet-500/30 bg-violet-500/10 flex flex-col items-center justify-center text-[10px] text-violet-300 font-mono font-semibold"
                        >
                          <span>89-103</span>
                          <span className="text-[8px] uppercase">Ac-Lr</span>
                        </div>
                      );
                    }

                    const el = elementMap.get(`${period}-${group}`);
                    if (!el) {
                      return <div key={`empty-${period}-${group}`} className="h-16" />;
                    }

                    const isDimmed =
                      (selectedCategory !== 'all' && el.category !== selectedCategory) ||
                      (selectedState !== 'all' && el.state !== selectedState) ||
                      (searchQuery && !filteredElements.some(f => f.number === el.number));

                    const catMeta = getCategoryMeta(el.category);

                    return (
                      <button
                        key={el.number}
                        onClick={() => {
                          setActiveElement(el);
                          if (onSelectElement) onSelectElement(el);
                        }}
                        style={{ borderColor: isDimmed ? undefined : `${catMeta.color}40` }}
                        className={`h-16 p-1 rounded-xl flex flex-col justify-between items-center text-center transition-all group relative border ${
                          isDimmed
                            ? 'opacity-20 hover:opacity-70 bg-slate-900/30 border-slate-800'
                            : `${catMeta.bg} hover:scale-105 hover:z-20 hover:shadow-lg hover:shadow-cyan-500/10 cursor-pointer`
                        }`}
                      >
                        <div className="w-full flex items-center justify-between text-[9px] font-mono text-slate-400 px-0.5">
                          <span>{el.number}</span>
                          <span className="text-[8px] text-slate-500 hidden sm:inline">
                            {el.atomicMass.toFixed(1)}
                          </span>
                        </div>
                        <div
                          className="text-base font-bold font-hud transition-colors group-hover:text-white"
                          style={{ color: catMeta.color }}
                        >
                          {el.symbol}
                        </div>
                        <div className="text-[8px] font-medium text-slate-300 truncate w-full px-0.5">
                          {currentLang === 'uz' ? el.nameUz : currentLang === 'ru' ? el.nameRu : el.nameEn}
                        </div>
                      </button>
                    );
                  })}
                </div>
              ))}
            </div>

            {/* Lanthanides & Actinides separate series */}
            <div className="mt-6 pt-4 border-t border-slate-800/80 space-y-1.5">
              {/* Lanthanides 57 - 71 */}
              <div className="flex items-center gap-2">
                <span className="w-20 text-[10px] font-mono text-pink-400 uppercase tracking-wider shrink-0">
                  Lantanoidlar:
                </span>
                <div className="grid grid-cols-15 gap-1.5 flex-1">
                  {ELEMENTS_DATA.filter(e => e.category === 'lanthanide').map(el => {
                    const isDimmed =
                      (selectedCategory !== 'all' && el.category !== selectedCategory) ||
                      (selectedState !== 'all' && el.state !== selectedState) ||
                      (searchQuery && !filteredElements.some(f => f.number === el.number));
                    const catMeta = getCategoryMeta(el.category);
                    return (
                      <button
                        key={el.number}
                        onClick={() => {
                          setActiveElement(el);
                          if (onSelectElement) onSelectElement(el);
                        }}
                        className={`h-14 p-1 rounded-xl flex flex-col justify-between items-center text-center transition-all group relative border ${
                          isDimmed
                            ? 'opacity-20 hover:opacity-70 bg-slate-900/30 border-slate-800'
                            : `${catMeta.bg} ${catMeta.border} hover:scale-105 hover:z-20 cursor-pointer`
                        }`}
                      >
                        <div className="w-full flex items-center justify-between text-[9px] font-mono text-slate-400 px-0.5">
                          <span>{el.number}</span>
                        </div>
                        <div className="text-sm font-bold font-hud text-pink-400">
                          {el.symbol}
                        </div>
                        <div className="text-[8px] font-medium text-slate-300 truncate w-full">
                          {el.nameUz}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Actinides 89 - 103 */}
              <div className="flex items-center gap-2">
                <span className="w-20 text-[10px] font-mono text-violet-400 uppercase tracking-wider shrink-0">
                  Aktinoidlar:
                </span>
                <div className="grid grid-cols-15 gap-1.5 flex-1">
                  {ELEMENTS_DATA.filter(e => e.category === 'actinide').map(el => {
                    const isDimmed =
                      (selectedCategory !== 'all' && el.category !== selectedCategory) ||
                      (selectedState !== 'all' && el.state !== selectedState) ||
                      (searchQuery && !filteredElements.some(f => f.number === el.number));
                    const catMeta = getCategoryMeta(el.category);
                    return (
                      <button
                        key={el.number}
                        onClick={() => {
                          setActiveElement(el);
                          if (onSelectElement) onSelectElement(el);
                        }}
                        className={`h-14 p-1 rounded-xl flex flex-col justify-between items-center text-center transition-all group relative border ${
                          isDimmed
                            ? 'opacity-20 hover:opacity-70 bg-slate-900/30 border-slate-800'
                            : `${catMeta.bg} ${catMeta.border} hover:scale-105 hover:z-20 cursor-pointer`
                        }`}
                      >
                        <div className="w-full flex items-center justify-between text-[9px] font-mono text-slate-400 px-0.5">
                          <span>{el.number}</span>
                        </div>
                        <div className="text-sm font-bold font-hud text-violet-400">
                          {el.symbol}
                        </div>
                        <div className="text-[8px] font-medium text-slate-300 truncate w-full">
                          {el.nameUz}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Cards List View */
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {filteredElements.map(el => {
            const catMeta = getCategoryMeta(el.category);
            return (
              <button
                key={el.number}
                onClick={() => {
                  setActiveElement(el);
                  if (onSelectElement) onSelectElement(el);
                }}
                className={`p-3.5 rounded-2xl flex flex-col justify-between border text-left transition-all hover:scale-102 hover:shadow-xl ${catMeta.bg} ${catMeta.border}`}
              >
                <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-2">
                  <span>#{el.number}</span>
                  <span>{el.atomicMass.toFixed(2)}</span>
                </div>
                <div className="text-2xl font-bold font-hud mb-1" style={{ color: catMeta.color }}>
                  {el.symbol}
                </div>
                <div className="text-sm font-semibold text-white mb-0.5 truncate">
                  {currentLang === 'uz' ? el.nameUz : currentLang === 'ru' ? el.nameRu : el.nameEn}
                </div>
                <div className="text-[11px] text-slate-400 truncate">
                  {catMeta.labelUz}
                </div>
              </button>
            );
          })}
        </div>
      )}

      {/* Element Detail Futuristic Modal / HUD Drawer */}
      {activeElement && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto neon-border rounded-3xl p-6 sm:p-8 bg-slate-950 shadow-2xl border-cyan-500/40">
            {/* Close Button */}
            <button
              onClick={() => setActiveElement(null)}
              className="absolute right-5 top-5 p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 pb-6 border-b border-slate-800/80">
              <div
                className="w-20 h-20 rounded-2xl flex flex-col items-center justify-center border shadow-xl shrink-0"
                style={{
                  backgroundColor: `${getCategoryMeta(activeElement.category).color}15`,
                  borderColor: getCategoryMeta(activeElement.category).color
                }}
              >
                <span className="text-xs font-mono text-slate-400">#{activeElement.number}</span>
                <span
                  className="text-3xl font-extrabold font-hud"
                  style={{ color: getCategoryMeta(activeElement.category).color }}
                >
                  {activeElement.symbol}
                </span>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-mono uppercase px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                    {getCategoryMeta(activeElement.category).labelUz}
                  </span>
                  <span className="text-xs text-slate-400 font-mono">
                    Davr: {activeElement.period} | Guruh: {activeElement.group} | Blok: {activeElement.block}
                  </span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold font-hud text-white">
                  {currentLang === 'uz' ? activeElement.nameUz : currentLang === 'ru' ? activeElement.nameRu : activeElement.nameEn}
                </h3>
                <div className="text-xs text-slate-400 font-mono mt-0.5">
                  Lotincha / Inglizcha: <span className="text-slate-200">{activeElement.nameEn}</span> | Ruscha: <span className="text-slate-200">{activeElement.nameRu}</span>
                </div>
              </div>
            </div>

            {/* Modal Body */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              {/* Left Column: Properties & Electron Shell Diagram */}
              <div className="space-y-4">
                <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-4">
                  <h4 className="text-xs font-mono text-cyan-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                    <AtomIcon className="w-4 h-4" />
                    <span>Elektron qobig'i va konfiguratsiyasi</span>
                  </h4>

                  <div className="flex items-center justify-center py-4 relative">
                    {/* Concentric Bohr electron shells diagram */}
                    <div className="relative w-44 h-44 flex items-center justify-center">
                      {/* Nucleus */}
                      <div className="w-9 h-9 rounded-full bg-cyan-500 flex items-center justify-center text-slate-950 font-bold text-xs shadow-lg shadow-cyan-500/50 z-10">
                        {activeElement.symbol}
                      </div>

                      {/* Concentric orbit rings with count badges */}
                      {activeElement.shells.map((count, idx) => {
                        const radius = 32 + idx * 16;
                        return (
                          <div
                            key={idx}
                            style={{
                              width: `${radius * 2}px`,
                              height: `${radius * 2}px`,
                              animationDuration: `${12 + idx * 6}s`
                            }}
                            className="absolute rounded-full border border-cyan-500/25 flex items-center justify-center animate-spin"
                          >
                            <span className="absolute -top-1.5 w-3 h-3 rounded-full bg-purple-400 shadow-md shadow-purple-500/50" />
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="mt-2 text-center">
                    <span className="text-xs text-slate-400 block font-mono">Konfiguratsiya:</span>
                    <span className="text-sm font-mono font-bold text-cyan-300">
                      {activeElement.electronConfiguration}
                    </span>
                    <div className="text-[11px] font-mono text-slate-400 mt-1">
                      Qavatlar bo'yicha: [{activeElement.shells.join(', ')}]
                    </div>
                  </div>
                </div>

                {/* Key Numbers Grid */}
                <div className="grid grid-cols-2 gap-3 text-xs font-mono">
                  <div className="bg-slate-900/60 border border-slate-800/80 rounded-xl p-3">
                    <span className="text-slate-400 block mb-0.5">Atom massasi:</span>
                    <span className="text-white font-bold text-sm">{activeElement.atomicMass} u</span>
                  </div>
                  <div className="bg-slate-900/60 border border-slate-800/80 rounded-xl p-3">
                    <span className="text-slate-400 block mb-0.5">Elektromanfiylik:</span>
                    <span className="text-cyan-300 font-bold text-sm">
                      {activeElement.electronegativity ?? 'Mavjud emas'}
                    </span>
                  </div>
                  <div className="bg-slate-900/60 border border-slate-800/80 rounded-xl p-3">
                    <span className="text-slate-400 block mb-0.5">Ionlanish energiyasi:</span>
                    <span className="text-purple-300 font-bold text-sm">
                      {activeElement.ionizationEnergy ? `${activeElement.ionizationEnergy} kJ/mol` : '—'}
                    </span>
                  </div>
                  <div className="bg-slate-900/60 border border-slate-800/80 rounded-xl p-3">
                    <span className="text-slate-400 block mb-0.5">Atom radiusi:</span>
                    <span className="text-emerald-300 font-bold text-sm">
                      {activeElement.atomicRadius ? `${activeElement.atomicRadius} pm` : '—'}
                    </span>
                  </div>
                  <div className="bg-slate-900/60 border border-slate-800/80 rounded-xl p-3">
                    <span className="text-slate-400 block mb-0.5">Erish harorati:</span>
                    <span className="text-amber-300 font-bold text-sm">
                      {activeElement.meltingPoint ? `${(activeElement.meltingPoint - 273.15).toFixed(1)} °C` : '—'}
                    </span>
                  </div>
                  <div className="bg-slate-900/60 border border-slate-800/80 rounded-xl p-3">
                    <span className="text-slate-400 block mb-0.5">Zichlik:</span>
                    <span className="text-slate-200 font-bold text-sm">
                      {activeElement.density ? `${activeElement.density} g/sm³` : '—'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Right Column: History, Summary, and Applications */}
              <div className="space-y-4">
                {/* Summary */}
                <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-4">
                  <h4 className="text-xs font-mono text-cyan-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <Info className="w-4 h-4" />
                    <span>Element haqida</span>
                  </h4>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    {currentLang === 'uz' ? activeElement.summaryUz : currentLang === 'ru' ? activeElement.summaryRu : activeElement.summaryEn}
                  </p>
                </div>

                {/* Discovery History */}
                <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-4">
                  <h4 className="text-xs font-mono text-cyan-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <Calendar className="w-4 h-4" />
                    <span>Kashfiyot tarixi</span>
                  </h4>
                  <div className="text-xs text-slate-300 space-y-1">
                    <div>
                      <span className="text-slate-400">Kashfiyotchi: </span>
                      <span className="text-white font-medium">{activeElement.discoveredBy || 'Noma\'lum'}</span>
                    </div>
                    <div>
                      <span className="text-slate-400">Kashf etilgan yili: </span>
                      <span className="text-cyan-300 font-mono font-medium">{activeElement.yearDiscovered || 'Qadimiy'}</span>
                    </div>
                  </div>
                </div>

                {/* Common Applications */}
                <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-4">
                  <h4 className="text-xs font-mono text-cyan-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <Zap className="w-4 h-4" />
                    <span>Amaliy qo'llanilishi</span>
                  </h4>
                  <ul className="space-y-1.5">
                    {activeElement.commonUsesUz.map((use, i) => (
                      <li key={i} className="text-xs text-slate-300 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                        <span>{use}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
