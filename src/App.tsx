import React, { useState } from 'react';
import { HeroSection } from './components/HeroSection';
import { PeriodicTable } from './components/PeriodicTable';
import { Molecule3DViewer } from './components/Molecule3DViewer';
import { VirtualLab } from './components/VirtualLab';
import { ChemAIAssistant } from './components/ChemAIAssistant';
import { KnowledgeHub } from './components/KnowledgeHub';
import { Calculators } from './components/Calculators';
import { OrganicStudio } from './components/OrganicStudio';
import { GamificationHub } from './components/GamificationHub';
import { DiscoverySection } from './components/DiscoverySection';
import { exportProjectZip } from './utils/projectExporter';
import { 
  Atom, 
  FlaskConical, 
  Layers, 
  Calculator, 
  Bot, 
  BookOpen, 
  Trophy, 
  Compass, 
  Hexagon, 
  Download, 
  Globe, 
  Menu, 
  X, 
  Search,
  Sparkles,
  Zap,
  CheckCircle2,
  FileCode2
} from 'lucide-react';

export default function App() {
  const [currentTab, setCurrentTab] = useState<string>('home');
  const [currentLang, setCurrentLang] = useState<'uz' | 'en' | 'ru'>('uz');
  const [userXp, setUserXp] = useState<number>(125);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [isExportingZip, setIsExportingZip] = useState<boolean>(false);
  const [downloadSuccessModal, setDownloadSuccessModal] = useState<boolean>(false);

  const handleAddXp = (amount: number) => {
    setUserXp(prev => prev + amount);
  };

  const handleDownloadZip = async () => {
    setIsExportingZip(true);
    try {
      await exportProjectZip();
      setDownloadSuccessModal(true);
    } catch (err) {
      console.error('ZIP export error:', err);
    } finally {
      setIsExportingZip(false);
    }
  };

  const navItems = [
    { id: 'home', labelUz: 'Asosiy', labelEn: 'Home', labelRu: 'Главная', icon: Sparkles },
    { id: 'periodic', labelUz: 'Davriy Jadval', labelEn: 'Periodic Table', labelRu: 'Таблица Менделеева', icon: Atom },
    { id: 'molecules', labelUz: '3D Molekulalar', labelEn: '3D Molecules', labelRu: '3D Молекулы', icon: Layers },
    { id: 'lab', labelUz: 'Virtual Lab', labelEn: 'Virtual Lab', labelRu: 'Виртуальная лаборатория', icon: FlaskConical },
    { id: 'ai', labelUz: 'CHEM AI', labelEn: 'CHEM AI', labelRu: 'CHEM AI', icon: Bot },
    { id: 'knowledge', labelUz: 'Bilimlar Hub', labelEn: 'Knowledge Hub', labelRu: 'База знаний', icon: BookOpen },
    { id: 'calc', labelUz: 'Kalkulyatorlar', labelEn: 'Calculators', labelRu: 'Калькуляторы', icon: Calculator },
    { id: 'organic', labelUz: 'Organik Kimyo', labelEn: 'Organic Studio', labelRu: 'Органическая студия', icon: Hexagon },
    { id: 'gamification', labelUz: 'Yutuqlar & XP', labelEn: 'Quizzes & XP', labelRu: 'Тесты и опыт', icon: Trophy },
    { id: 'discovery', labelUz: 'Kashfiyotlar', labelEn: 'Discovery', labelRu: 'Открытия', icon: Compass },
  ];

  const getNavLabel = (item: typeof navItems[0]) => {
    return currentLang === 'uz' ? item.labelUz : currentLang === 'ru' ? item.labelRu : item.labelEn;
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#030712] text-slate-100 cyber-grid selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Top Futuristic Navigation Header */}
      <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          {/* Logo */}
          <button
            onClick={() => setCurrentTab('home')}
            className="flex items-center gap-3 group text-left cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 via-sky-400 to-purple-600 flex items-center justify-center shadow-lg shadow-cyan-500/20 group-hover:scale-105 transition-all">
              <Atom className="w-6 h-6 text-slate-950" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold font-hud tracking-wider text-xl text-white">
                  CHEM<span className="text-cyan-400">VERSE</span>
                </span>
                <span className="text-[10px] font-mono uppercase px-1.5 py-0.5 rounded bg-cyan-500/15 text-cyan-300 border border-cyan-500/30">
                  KOLBA · STAKAN · PROBIRKA
                </span>
              </div>
              <p className="text-[10px] font-mono text-slate-400 tracking-tight hidden sm:block">
                Virtual Kimyo Laboratoriyasi & Ilmiy Platforma
              </p>
            </div>
          </button>

          {/* Desktop Nav Items */}
          <nav className="hidden xl:flex items-center gap-1">
            {navItems.map(item => {
              const Icon = item.icon;
              const isSelected = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setCurrentTab(item.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all flex items-center gap-1.5 cursor-pointer ${
                    isSelected
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/50 shadow-sm'
                      : 'text-slate-400 hover:text-white hover:bg-slate-900/60'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{getNavLabel(item)}</span>
                </button>
              );
            })}
          </nav>

          {/* Header Right Actions */}
          <div className="flex items-center gap-2.5">
            {/* User XP Pill Badge */}
            <button
              onClick={() => setCurrentTab('gamification')}
              title="Yutuqlaringiz va tajriba ballari"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900/90 border border-slate-800 text-xs font-mono text-cyan-300 hover:border-cyan-500/50 transition-colors cursor-pointer"
            >
              <Zap className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
              <span className="font-bold">{userXp} XP</span>
            </button>

            {/* Language Switcher */}
            <div className="flex items-center bg-slate-900/90 border border-slate-800 rounded-xl p-1 text-[11px] font-mono">
              {(['uz', 'en', 'ru'] as const).map(lang => (
                <button
                  key={lang}
                  onClick={() => setCurrentLang(lang)}
                  className={`px-2 py-1 rounded-lg uppercase font-bold transition-all ${
                    currentLang === lang
                      ? 'bg-cyan-500 text-slate-950 shadow-sm'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {lang}
                </button>
              ))}
            </div>

            {/* Direct Project ZIP Download CTA Button */}
            <button
              onClick={handleDownloadZip}
              disabled={isExportingZip}
              title="Loyiha fayllarini ZIP arxivda yuklab olish"
              className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-purple-500/20 border border-purple-500/50 text-purple-300 hover:bg-purple-500/30 font-hud text-xs font-bold transition-all shadow-md shadow-purple-500/10 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{isExportingZip ? 'Yuklanmoqda...' : 'ZIP Yuklab Olish'}</span>
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="xl:hidden border-t border-slate-800 bg-slate-950 p-4 space-y-2 animate-fade-in">
            <div className="grid grid-cols-2 gap-2">
              {navItems.map(item => {
                const Icon = item.icon;
                const isSelected = currentTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setCurrentTab(item.id);
                      setMobileMenuOpen(false);
                    }}
                    className={`p-2.5 rounded-xl text-xs font-medium flex items-center gap-2 border text-left ${
                      isSelected
                        ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/50'
                        : 'bg-slate-900/60 border-slate-800 text-slate-300'
                    }`}
                  >
                    <Icon className="w-4 h-4 text-cyan-400" />
                    <span>{getNavLabel(item)}</span>
                  </button>
                );
              })}
            </div>

            <div className="pt-2">
              <button
                onClick={() => {
                  handleDownloadZip();
                  setMobileMenuOpen(false);
                }}
                className="w-full py-2.5 rounded-xl bg-purple-500/20 border border-purple-500/50 text-purple-300 font-bold text-xs flex items-center justify-center gap-2"
              >
                <Download className="w-4 h-4" />
                <span>Loyihani ZIP Arxivda Yuklab Olish</span>
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Main Content Viewport */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-8">
        {/* Render Tab Pages */}
        {currentTab === 'home' && (
          <div className="space-y-12">
            <HeroSection
              onNavigate={tab => setCurrentTab(tab)}
              onDownloadZip={handleDownloadZip}
            />

            {/* Quick Section Highlights */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider font-semibold">
                    Platforma imkoniyatlari
                  </span>
                  <h3 className="text-2xl font-bold font-hud text-white">
                    Raqamli Kimyo Koinoti
                  </h3>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div
                  onClick={() => setCurrentTab('periodic')}
                  className="neon-border rounded-2xl p-6 bg-slate-950/80 hover:border-cyan-500/50 hover:bg-slate-900/80 transition-all cursor-pointer group"
                >
                  <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-4 group-hover:scale-110 transition-transform">
                    <Atom className="w-6 h-6" />
                  </div>
                  <h4 className="text-lg font-bold font-hud text-white mb-1 group-hover:text-cyan-300 transition-colors">
                    118 ta Element Davriy Jadvali
                  </h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Barcha elementlarning elektron orbitallari, massasi, kashfiyoti va xossalari haqida to'liq ilmiy ma'lumotlar.
                  </p>
                </div>

                <div
                  onClick={() => setCurrentTab('molecules')}
                  className="neon-border rounded-2xl p-6 bg-slate-950/80 hover:border-cyan-500/50 hover:bg-slate-900/80 transition-all cursor-pointer group"
                >
                  <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 mb-4 group-hover:scale-110 transition-transform">
                    <Layers className="w-6 h-6" />
                  </div>
                  <h4 className="text-lg font-bold font-hud text-white mb-1 group-hover:text-purple-300 transition-colors">
                    3D Kvant Molekulalar
                  </h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Suv, metan, kofein, glyukoza va DNK molekulalarini 3D fazoda aylantiring, burchaklari va qutbliligini tekshiring.
                  </p>
                </div>

                <div
                  onClick={() => setCurrentTab('lab')}
                  className="neon-border rounded-2xl p-6 bg-slate-950/80 hover:border-cyan-500/50 hover:bg-slate-900/80 transition-all cursor-pointer group"
                >
                  <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-4 group-hover:scale-110 transition-transform">
                    <FlaskConical className="w-6 h-6" />
                  </div>
                  <h4 className="text-lg font-bold font-hud text-white mb-1 group-hover:text-emerald-300 transition-colors">
                    Virtual Kimyo Laboratoriyasi
                  </h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Kolba va probirkalarda moddalarni aralashtiring, rang o'zgarishi, cho'kma va gaz ajralishini real kuzating.
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Preview of Periodic Table */}
            <div className="space-y-4 pt-6">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold font-hud text-white">
                  Davriy Jadval Ko'rinishi
                </h3>
                <button
                  onClick={() => setCurrentTab('periodic')}
                  className="text-xs text-cyan-400 hover:text-cyan-300 font-mono font-bold"
                >
                  To'liq jadvalni ochish →
                </button>
              </div>
              <PeriodicTable currentLang={currentLang} />
            </div>
          </div>
        )}

        {currentTab === 'periodic' && (
          <div className="space-y-4">
            <h2 className="text-3xl font-bold font-hud text-white">
              Kimyoviy Elementlar Davriy Jadvali (1-118)
            </h2>
            <PeriodicTable currentLang={currentLang} />
          </div>
        )}

        {currentTab === 'molecules' && (
          <div className="space-y-4">
            <h2 className="text-3xl font-bold font-hud text-white">
              3D Molekulyar Vizualizatsiya Laboratoriyasi
            </h2>
            <Molecule3DViewer currentLang={currentLang} />
          </div>
        )}

        {currentTab === 'lab' && (
          <div className="space-y-4">
            <h2 className="text-3xl font-bold font-hud text-white">
              Interaktiv Virtual Kimyo Laboratoriyasi
            </h2>
            <VirtualLab currentLang={currentLang} />
          </div>
        )}

        {currentTab === 'ai' && (
          <div className="space-y-4">
            <h2 className="text-3xl font-bold font-hud text-white">
              CHEM AI Tadqiqot va Masalalar Yechimi
            </h2>
            <ChemAIAssistant currentLang={currentLang} />
          </div>
        )}

        {currentTab === 'knowledge' && (
          <div className="space-y-4">
            <h2 className="text-3xl font-bold font-hud text-white">
              Kimyo Bilimlar Hubi (20 ta Asosiy Fan)
            </h2>
            <KnowledgeHub currentLang={currentLang} onAddXp={handleAddXp} />
          </div>
        )}

        {currentTab === 'calc' && (
          <div className="space-y-4">
            <h2 className="text-3xl font-bold font-hud text-white">
              Professional Kimyoviy Kalkulyatorlar
            </h2>
            <Calculators currentLang={currentLang} />
          </div>
        )}

        {currentTab === 'organic' && (
          <div className="space-y-4">
            <h2 className="text-3xl font-bold font-hud text-white">
              Organik Kimyo Studiyasi
            </h2>
            <OrganicStudio currentLang={currentLang} />
          </div>
        )}

        {currentTab === 'gamification' && (
          <div className="space-y-4">
            <h2 className="text-3xl font-bold font-hud text-white">
              Ta'limiy Testlar va Yutuqlar
            </h2>
            <GamificationHub
              currentLang={currentLang}
              userXp={userXp}
              onAddXp={handleAddXp}
            />
          </div>
        )}

        {currentTab === 'discovery' && (
          <div className="space-y-4">
            <h2 className="text-3xl font-bold font-hud text-white">
              Ilmiy Kashfiyotlar va Tarix
            </h2>
            <DiscoverySection currentLang={currentLang} />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-950 py-10 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
              <Atom className="w-5 h-5" />
            </div>
            <div>
              <div className="font-hud font-bold text-white text-base">
                CHEMVERSE <span className="text-cyan-400 font-mono text-xs">v1.0</span>
              </div>
              <p className="text-xs text-slate-400">
                Atomlardan galaktikalargacha — moddalarning sirlarini kashf et.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 font-mono">
            <span>Standart til: O'zbek tili (Lotin)</span>
            <span>•</span>
            <span>118 ta Element</span>
            <span>•</span>
            <button
              onClick={handleDownloadZip}
              className="text-cyan-400 hover:text-cyan-300 flex items-center gap-1 font-bold"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Loyihani yuklab olish</span>
            </button>
          </div>
        </div>
      </footer>

      {/* Download Success Dialog */}
      {downloadSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="relative w-full max-w-md neon-border rounded-3xl p-6 sm:p-8 bg-slate-950 shadow-2xl border-purple-500/40 text-center space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-purple-300 mx-auto text-3xl">
              📦
            </div>

            <h3 className="text-2xl font-bold font-hud text-white">
              Loyiha ZIP Arxivda Saqlandi!
            </h3>

            <p className="text-xs text-slate-300 leading-relaxed">
              <strong>CHEMVERSE-Chemistry-Universe-Project.zip</strong> fayli kompyuteringizga yuklab olindi.
            </p>

            <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-left font-mono text-[11px] text-slate-300 space-y-1">
              <div className="text-cyan-400 font-bold mb-1">Qanday ishga tushirasiz:</div>
              <div>1. ZIP faylni kompyuteringizda oching (Extract)</div>
              <div>2. Terminalda: <code className="text-purple-300">npm install</code></div>
              <div>3. Saytni yurgizish: <code className="text-purple-300">npm run dev</code></div>
              <div>4. Manzil: <code className="text-cyan-300">http://localhost:3000</code></div>
            </div>

            <button
              onClick={() => setDownloadSuccessModal(false)}
              className="w-full py-3 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs hover:bg-cyan-400 transition-colors"
            >
              Tushundim, rahmat!
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
