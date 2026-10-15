import React, { useState } from 'react';
import { 
  Trophy, 
  Flame, 
  Sparkles, 
  Award, 
  RotateCcw, 
  CheckCircle2, 
  HelpCircle, 
  Layers, 
  ChevronRight,
  TrendingUp,
  BrainCircuit
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface Props {
  currentLang: 'uz' | 'en' | 'ru';
  userXp: number;
  onAddXp: (amount: number) => void;
}

interface FlashcardItem {
  id: string;
  front: string;
  back: string;
  category: string;
}

const FLASHCARDS: FlashcardItem[] = [
  { id: '1', front: 'Eng yengil kimyoviy element qaysi?', back: 'Vodorod (H, 1.008 u)', category: 'Elementlar' },
  { id: '2', front: 'Xona haroratida suyuq yagona metall?', back: 'Simob (Hg)', category: 'Metallar' },
  { id: '3', front: 'Avogadro doimiysi son qiymati?', back: '6.022 × 10²³ mol⁻¹', category: 'Doimiylar' },
  { id: '4', front: 'Olmos va grafit nimaning allotropik shakllari?', back: 'Uglerod (C)', category: 'Allotropiya' },
  { id: '5', front: 'Suv molekulasidagi bog\' burchagi?', back: '104.5° (Burchakli shakl)', category: 'Molekulalar' },
  { id: '6', front: 'Osh tuzi kimyoviy formulasi va bog\' turi?', back: 'NaCl, Ion bog\'lanish', category: 'Birikmalar' }
];

const BADGES = [
  { id: 'first-step', nameUz: 'Birinchi Qadam', descUz: 'CHEMVERSE ga ilk bor tashrif buyurdingiz', icon: '🚀', reqXp: 10 },
  { id: 'element-hunter', nameUz: 'Elementlar Ovchisi', descUz: '100 XP to\'plab kimyo asoslarini egalladingiz', icon: '⚡', reqXp: 100 },
  { id: 'reaction-master', nameUz: 'Reaksiya Ustasi', descUz: '250 XP ga erishib laboratoriyada tajribalar o\'tkazdingiz', icon: '🧪', reqXp: 250 },
  { id: 'quantum-chemist', nameUz: 'Kvant Kimyogari', descUz: '500 XP to\'plab oliy unvonga erishdingiz', icon: '👑', reqXp: 500 }
];

export const GamificationHub: React.FC<Props> = ({ currentLang, userXp, onAddXp }) => {
  const [activeCardIdx, setActiveCardIdx] = useState<number>(0);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const [dailyCompleted, setDailyCompleted] = useState<boolean>(false);

  // Compute current rank title
  const rankTitle = userXp >= 500
    ? 'Kvant Kimyogari'
    : userXp >= 250
    ? 'Reaksiya Ustasi'
    : userXp >= 100
    ? 'Molekulyar Tadqiqotchi'
    : 'Atom Havaskori';

  const nextRankXp = userXp >= 500 ? 1000 : userXp >= 250 ? 500 : userXp >= 100 ? 250 : 100;
  const progressPercent = Math.min(100, Math.round((userXp / nextRankXp) * 100));

  const handleNextCard = () => {
    setIsFlipped(false);
    setActiveCardIdx(prev => (prev + 1) % FLASHCARDS.length);
  };

  const handleSolveDaily = (correct: boolean) => {
    if (dailyCompleted) return;
    setDailyCompleted(true);
    if (correct) {
      onAddXp(50);
      confetti({ particleCount: 60, spread: 70, origin: { y: 0.6 } });
    }
  };

  return (
    <div className="w-full flex flex-col gap-6">
      {/* User Progress & XP Dashboard Banner */}
      <div className="neon-border rounded-3xl p-6 bg-slate-950/80 relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 z-10 relative">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-cyan-500 to-purple-600 flex items-center justify-center text-3xl shadow-xl shadow-cyan-500/20 shrink-0">
              🧪
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-mono uppercase px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                  Daraja: {rankTitle}
                </span>
                <span className="flex items-center gap-1 text-xs text-amber-400 font-mono font-bold">
                  <Flame className="w-3.5 h-3.5 fill-amber-400" />
                  <span>3 kunlik faollik</span>
                </span>
              </div>
              <h3 className="text-2xl font-bold font-hud text-white">
                Sizning Tajribangiz: <span className="text-cyan-400 font-mono">{userXp} XP</span>
              </h3>
            </div>
          </div>

          <div className="w-full md:w-64 space-y-2">
            <div className="flex justify-between text-xs font-mono text-slate-400">
              <span>Keyingi unvongacha:</span>
              <span className="text-cyan-400 font-bold">{userXp} / {nextRankXp} XP</span>
            </div>
            <div className="w-full h-2.5 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
              <div
                className="h-full bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Daily Challenge (6 Cols) */}
        <div className="lg:col-span-6 neon-border rounded-2xl p-6 bg-slate-950/80 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 font-semibold uppercase">
              <Sparkles className="w-4 h-4" />
              <span>Kunlik Kimyoviy Topshiriq</span>
            </div>
            <span className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/30 text-[10px] font-mono font-bold">
              +50 XP
            </span>
          </div>

          <div>
            <span className="text-xs text-slate-400 block mb-1">Bugungi savol:</span>
            <p className="text-sm font-semibold text-white leading-relaxed">
              Kaliy permanganat (KMnO₄) eritmasi qanday rangga ega va u kimyoda qanday rol o'ynaydi?
            </p>
          </div>

          <div className="space-y-2">
            {[
              { text: 'To\'q binafsharang, kuchli oksidlovchi', isCorrect: true },
              { text: 'Ko\'k rangli, kuchli qaytaruvchi', isCorrect: false },
              { text: 'Rangsiz, neytral tuz', isCorrect: false }
            ].map((ans, i) => (
              <button
                key={i}
                disabled={dailyCompleted}
                onClick={() => handleSolveDaily(ans.isCorrect)}
                className={`w-full text-left p-3 rounded-xl border text-xs transition-all ${
                  dailyCompleted
                    ? ans.isCorrect
                      ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300 font-bold'
                      : 'bg-slate-900/40 border-slate-800 text-slate-500'
                    : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:border-cyan-500/50 hover:bg-slate-900'
                }`}
              >
                {ans.text}
              </button>
            ))}
          </div>

          {dailyCompleted && (
            <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-xs text-emerald-300 font-mono">
              Barakalla! Kunlik topshiriq yakunlandi va hisobingizga 50 XP qo'shildi.
            </div>
          )}
        </div>

        {/* Right: Chemical Flashcards (6 Cols) */}
        <div className="lg:col-span-6 neon-border rounded-2xl p-6 bg-slate-950/80 flex flex-col justify-between">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <span className="text-xs font-mono text-purple-400 uppercase tracking-wider font-semibold flex items-center gap-2">
              <BrainCircuit className="w-4 h-4" />
              <span>Kimyo Flesh-kartalari</span>
            </span>
            <span className="text-xs text-slate-500 font-mono">
              {activeCardIdx + 1} / {FLASHCARDS.length}
            </span>
          </div>

          {/* Flip Card Stage */}
          <div
            onClick={() => setIsFlipped(!isFlipped)}
            className="my-4 h-48 rounded-2xl p-6 bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 hover:border-cyan-500/40 flex flex-col items-center justify-center text-center cursor-pointer transition-all shadow-xl group"
          >
            <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-400 mb-2 block">
              {isFlipped ? 'Javob' : 'Savol (Bosing va ko\'ring)'}
            </span>
            <p className="text-base font-bold text-white max-w-sm">
              {isFlipped ? FLASHCARDS[activeCardIdx].back : FLASHCARDS[activeCardIdx].front}
            </p>
          </div>

          <div className="flex items-center justify-between pt-2">
            <span className="text-xs text-slate-500 font-mono">
              Toifa: {FLASHCARDS[activeCardIdx].category}
            </span>
            <button
              onClick={handleNextCard}
              className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs font-medium text-slate-300 hover:text-white hover:border-cyan-500/50 transition-colors flex items-center gap-1.5"
            >
              <span>Keyingi karta</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Badges Grid */}
      <div className="neon-border rounded-2xl p-6 bg-slate-950/80">
        <h4 className="text-xs font-mono text-cyan-400 uppercase tracking-wider font-semibold mb-4 flex items-center gap-1.5">
          <Trophy className="w-4 h-4 text-amber-400" />
          <span>Yutuq nishonlari (Badges)</span>
        </h4>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {BADGES.map(badge => {
            const isUnlocked = userXp >= badge.reqXp;
            return (
              <div
                key={badge.id}
                className={`p-4 rounded-2xl border text-center space-y-2 transition-all ${
                  isUnlocked
                    ? 'bg-cyan-500/10 border-cyan-500/40 text-white shadow-md shadow-cyan-500/10'
                    : 'bg-slate-900/30 border-slate-800/60 opacity-40'
                }`}
              >
                <div className="text-3xl">{badge.icon}</div>
                <div className="font-bold text-xs">{badge.nameUz}</div>
                <p className="text-[10px] text-slate-400 leading-tight">
                  {badge.descUz}
                </p>
                <div className="text-[10px] font-mono text-cyan-400 font-semibold">
                  {badge.reqXp} XP talab etiladi
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
