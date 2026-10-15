import React, { useState } from 'react';
import { KNOWLEDGE_TOPICS } from '../data/knowledgeHub';
import { KnowledgeTopic } from '../types/chemistry';
import { 
  BookOpen, 
  Search, 
  CheckCircle2, 
  X, 
  Sparkles, 
  HelpCircle, 
  Award,
  ChevronRight,
  Flame,
  Zap,
  Atom,
  FlaskConical,
  Scale
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface Props {
  currentLang: 'uz' | 'en' | 'ru';
  onAddXp?: (amount: number) => void;
}

export const KnowledgeHub: React.FC<Props> = ({ currentLang, onAddXp }) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedLevel, setSelectedLevel] = useState<string>('all');
  const [activeTopic, setActiveTopic] = useState<KnowledgeTopic | null>(null);
  const [selectedQuizAnswers, setSelectedQuizAnswers] = useState<Record<number, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);

  // Filter topics
  const filteredTopics = KNOWLEDGE_TOPICS.filter(t => {
    if (selectedLevel !== 'all' && t.level !== selectedLevel) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchUz = t.titleUz.toLowerCase().includes(q) || t.summaryUz.toLowerCase().includes(q);
      const matchEn = t.titleEn.toLowerCase().includes(q);
      return matchUz || matchEn;
    }
    return true;
  });

  const handleOpenTopic = (topic: KnowledgeTopic) => {
    setActiveTopic(topic);
    setSelectedQuizAnswers({});
    setQuizSubmitted(false);
  };

  const handleQuizAnswer = (qIndex: number, optionIndex: number) => {
    if (quizSubmitted) return;
    setSelectedQuizAnswers(prev => ({ ...prev, [qIndex]: optionIndex }));
  };

  const handleCheckQuiz = () => {
    setQuizSubmitted(true);
    if (!activeTopic) return;

    let correctCount = 0;
    activeTopic.quizQuestions.forEach((q, idx) => {
      if (selectedQuizAnswers[idx] === q.correctIndex) {
        correctCount++;
      }
    });

    if (correctCount > 0) {
      if (onAddXp) onAddXp(correctCount * 25);
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 }
      });
    }
  };

  return (
    <div className="w-full flex flex-col gap-6">
      {/* Top Search & Filter Bar */}
      <div className="neon-border rounded-2xl p-4 sm:p-6 bg-slate-950/80">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-cyan-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Mavzular yoki tushunchalarni qidiring..."
              className="w-full pl-10 pr-4 py-2.5 bg-slate-900/90 border border-slate-800 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/80"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
            {['all', 'Boshlang\'ich', 'Maktab', 'Universitet', 'Ilg\'or'].map(lvl => (
              <button
                key={lvl}
                onClick={() => setSelectedLevel(lvl)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all shrink-0 ${
                  selectedLevel === lvl
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                    : 'bg-slate-900/60 text-slate-400 border border-slate-800 hover:text-white'
                }`}
              >
                {lvl === 'all' ? 'Barcha darajalar' : lvl}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Topics Grid (20 topics) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredTopics.map((topic, index) => (
          <div
            key={topic.id}
            onClick={() => handleOpenTopic(topic)}
            className="neon-border rounded-2xl p-5 bg-slate-950/70 hover:border-cyan-500/50 hover:bg-slate-900/80 transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between text-xs mb-3">
                <span className="font-mono text-cyan-400 font-semibold">#{String(index + 1).padStart(2, '0')}</span>
                <span className="px-2 py-0.5 rounded-md bg-slate-900 border border-slate-800 text-[10px] font-mono text-purple-300">
                  {topic.level}
                </span>
              </div>

              <h4 className="text-lg font-bold font-hud text-white group-hover:text-cyan-300 transition-colors mb-2">
                {currentLang === 'uz' ? topic.titleUz : currentLang === 'ru' ? topic.titleRu : topic.titleEn}
              </h4>

              <p className="text-xs text-slate-400 leading-relaxed mb-4 line-clamp-2">
                {topic.summaryUz}
              </p>
            </div>

            <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400 group-hover:text-cyan-400 font-mono">
              <span>{topic.sections.length} ta bo'lim</span>
              <div className="flex items-center gap-1 font-semibold">
                <span>O'qish</span>
                <ChevronRight className="w-4 h-4" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Reader Modal */}
      {activeTopic && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto neon-border rounded-3xl p-6 sm:p-8 bg-slate-950 shadow-2xl border-cyan-500/40">
            <button
              onClick={() => setActiveTopic(null)}
              className="absolute right-5 top-5 p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="pb-4 border-b border-slate-800 mb-6">
              <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 text-xs font-mono border border-cyan-500/30">
                {activeTopic.level} • {activeTopic.category}
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold font-hud text-white mt-2">
                {currentLang === 'uz' ? activeTopic.titleUz : activeTopic.titleEn}
              </h3>
            </div>

            {/* Sections Content */}
            <div className="space-y-6">
              {activeTopic.sections.map((sec, idx) => (
                <div key={idx} className="space-y-2">
                  <h4 className="text-base font-bold font-hud text-cyan-300 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                    <span>{sec.headingUz}</span>
                  </h4>
                  <p className="text-sm text-slate-300 leading-relaxed font-sans">
                    {sec.contentUz}
                  </p>
                  {sec.formula && (
                    <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 font-mono text-cyan-300 text-sm">
                      {sec.formula}
                    </div>
                  )}
                  {sec.exampleUz && (
                    <div className="p-3 rounded-xl bg-purple-500/10 border border-purple-500/30 text-xs text-purple-200 font-mono">
                      {sec.exampleUz}
                    </div>
                  )}
                </div>
              ))}

              {/* Mini Quiz Section */}
              {activeTopic.quizQuestions.length > 0 && (
                <div className="pt-6 border-t border-slate-800">
                  <h4 className="text-base font-bold font-hud text-white mb-4 flex items-center gap-2">
                    <Award className="w-5 h-5 text-amber-400" />
                    <span>Mavzu bo'yicha mini-test (+25 XP)</span>
                  </h4>

                  {activeTopic.quizQuestions.map((q, qIdx) => (
                    <div key={qIdx} className="space-y-3 bg-slate-900/50 p-4 rounded-2xl border border-slate-800">
                      <div className="text-sm font-semibold text-slate-200">{q.questionUz}</div>
                      <div className="space-y-2">
                        {q.optionsUz.map((opt, oIdx) => {
                          const isSelected = selectedQuizAnswers[qIdx] === oIdx;
                          const isCorrect = oIdx === q.correctIndex;
                          let btnStyle = 'bg-slate-900 border-slate-800 text-slate-300 hover:border-cyan-500/40';

                          if (quizSubmitted) {
                            if (isCorrect) btnStyle = 'bg-emerald-500/20 border-emerald-500 text-emerald-300 font-bold';
                            else if (isSelected && !isCorrect) btnStyle = 'bg-rose-500/20 border-rose-500 text-rose-300';
                          } else if (isSelected) {
                            btnStyle = 'bg-cyan-500/20 border-cyan-500 text-cyan-300';
                          }

                          return (
                            <button
                              key={oIdx}
                              disabled={quizSubmitted}
                              onClick={() => handleQuizAnswer(qIdx, oIdx)}
                              className={`w-full text-left p-3 rounded-xl border text-xs transition-all ${btnStyle}`}
                            >
                              {opt}
                            </button>
                          );
                        })}
                      </div>

                      {quizSubmitted && (
                        <div className="p-2.5 rounded-xl bg-slate-950 text-xs text-slate-300 font-mono border border-slate-800/80">
                          {q.explanationUz}
                        </div>
                      )}
                    </div>
                  ))}

                  <div className="mt-4 flex justify-end">
                    <button
                      onClick={handleCheckQuiz}
                      disabled={quizSubmitted || Object.keys(selectedQuizAnswers).length === 0}
                      className="px-5 py-2.5 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs hover:bg-cyan-400 transition-colors disabled:opacity-40"
                    >
                      Javoblarni tekshirish
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
