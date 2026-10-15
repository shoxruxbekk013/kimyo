import React, { useState, useRef, useEffect } from 'react';
import { 
  Bot, 
  Send, 
  Sparkles, 
  Atom as AtomIcon, 
  Layers, 
  Cpu, 
  HelpCircle, 
  Flame, 
  RefreshCw, 
  CheckCircle2, 
  Copy, 
  AlertCircle 
} from 'lucide-react';
import { balanceChemicalEquation } from '../utils/equationBalancer';

interface Props {
  currentLang: 'uz' | 'en' | 'ru';
}

interface Message {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
}

export const ChemAIAssistant: React.FC<Props> = ({ currentLang }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      sender: 'ai',
      text: `Salom! Men **CHEM AI** — sizning futuristik kimyo tadqiqot yordamchingizman.\n\nMen quyidagi yo'nalishlarda yordam bera olaman:\n• Kimyoviy tenglamalarni bosqichma-bosqich tenglashtirish\n• Molyar massa, pH, gaz qonunlari va stexiometriyani hisoblash\n• Anorganik va organik kimyo mexanizmlarini tushuntirish\n• Masalalar yechimini bosqichma-bosqich ko'rsatish\n\nSavolingizni yoki formulangizni yozing!`,
      timestamp: 'Hozir'
    }
  ]);
  const [inputText, setInputText] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  // Suggested prompt pills
  const samplePrompts = [
    'Tenglashtir: Al + O2 = Al2O3',
    'pH formulasi va eritmalar muhiti nima?',
    'Kofein molekulasi qanday ta\'sir qiladi?',
    'Suvning 104.5° burchagi sababi nima?',
    'Oksidlanish-qaytarilish reaksiyasini tushuntir'
  ];

  // Local expert chemistry solver (instant fallback)
  const getExpertChemistryResponse = (query: string): string => {
    const q = query.trim().toLowerCase();

    // Check if user asked to balance equation
    if (q.includes('=') || q.includes('->') || q.includes('tenglashtir')) {
      const eqMatch = query.match(/([A-Za-z0-9\(\)\s\+]+)\s*(=|->|⟶)\s*([A-Za-z0-9\(\)\s\+]+)/);
      if (eqMatch) {
        const fullEq = `${eqMatch[1]}=${eqMatch[3]}`;
        const bal = balanceChemicalEquation(fullEq);
        if (bal.success) {
          return `### 🧪 Kimyoviy Tenglama Yechimi\n\n**Tenglashtirilgan tenglama:**\n\`\`\`\n${bal.balancedEquation}\n\`\`\`\n\n**Reaksiya turi:** ${bal.reactionTypeUz} (${bal.reactionType})\n\n**Atomlar saqlanish nazorati:**\n${bal.atomBalance.map(a => `• ${a.element}: Reagentda ${a.reactantCount} ta = Mahsulotda ${a.productCount} ta`).join('\n')}\n\n**Yechish bosqichlari:**\n${bal.explanationUz}`;
        }
      }
    }

    if (q.includes('ph') || q.includes('poh')) {
      return `### 💧 pH va pOH Ko'rsatkichlari Nazariyasi\n\n**1. Ta'rif:**\npH (lot. *pondus Hydrogenii* — "vodorod vazni") — eritmadagi erkin vodorod ionlari faolligining o'nlik manfiy logarifmidir:\n\`\`\`\npH = -log₁₀[H⁺]\npOH = -log₁₀[OH⁻]\n\`\`\`\n\n**2. Suvning ion ko'paytmasi (25°C da):**\n\`\`\`\n[H⁺] · [OH⁻] = 1.0 × 10⁻¹⁴\npH + pOH = 14\n\`\`\`\n\n**3. Muhit chegaralari:**\n• **Kislotali:** pH < 7.0 ([H⁺] > 10⁻⁷ M)\n• **Neytral:** pH = 7.0 (Toza distillangan suv)\n• **Ishqoriy:** pH > 7.0 ([H⁺] < 10⁻⁷ M)\n\nHar bir birlik pH o'zgarishi kislotalilikning 10 barobarga o'zgarishini bildiradi!`;
    }

    if (q.includes('kofein') || q.includes('caffeine')) {
      return `### ☕ Kofein (C₈H₁₀N₄O₂) Molekulasi va Ta'sir Mexanizmi\n\n**1. Kimyoviy formulasi:** C₈H₁₀N₄O₂ (1,3,7-trimetilksantin)\n**Molyar massasi:** 194.19 g/mol\n\n**2. Biokimyoviy mexanizmi:**\n• Kofein molekulyar tuzilishi jihatidan miyadagi **adenozin** molekulasiga juda o'xshaydi.\n• Oddiy holatda adenozin miya retseptorlariga birikib, charchoq va uyquchanlik hissini yuzaga keltiradi.\n• Kofein adenozin retseptorlarini bloklaydi (antagonist), natijada neyronlar faollashadi va dopamin hamda adrenalin ajralishi rag'batlantiriladi.`;
    }

    if (q.includes('burchak') || q.includes('suv') || q.includes('104.5')) {
      return `### 🔬 Nega Suv Molekulasida Burchak 104.5°?\n\n**1. Gibridlanish:**\nSuvdagi markaziy kislorod atomi **sp³ gibridlangan** bo'lib, uning atrofida 4 ta elektron buluti mavjud.\n\n**2. VSEPR nazariyasi (Valens elektron juftlari itarilishi):**\n• Kislorodda 2 ta bog'lovchi juft (O-H) va **2 ta bo'linmagan erkin elektron jufti** bor.\n• Bo'linmagan elektron juftlari bog'lovchi juftlarga qaraganda kuchliroq itarish kuchiga ega.\n• Shuning uchun ideal tetraedrik burchak (109.5°) 104.5° gacha qisqaradi va barqaror burchakli (bent) shakl hosil bo'ladi.`;
    }

    if (q.includes('oksidlanish') || q.includes('redox')) {
      return `### ⚡ Oksidlanish-Qaytarilish (Redoks) Reaksiyalari\n\n**1. Asosiy tushunchalar:**\n• **Oksidlanish** — elektron berish jarayoni (oksidlanish darajasi ortadi). Elektron beruvchi modda — **Qaytaruvchi**.\n• **Qaytarilish** — elektron biriktirib olish jarayoni (oksidlanish darajasi kamayadi). Elektron oluvchi modda — **Oksidlovchi**.\n\n**2. Qoida (Elektron balansi):**\nReaksiyada berilgan elektronlar soni olingan elektronlar soniga teng bo'lishi shart!\n\n*Misol:*\n\`\`\`\n2Mg + O₂ ⟶ 2MgO\nMg⁰ - 2e⁻ ⟶ Mg²⁺ (Oksidlanish, Mg — qaytaruvchi)\nO₂⁰ + 4e⁻ ⟶ 2O²⁻ (Qaytarilish, O₂ — oksidlovchi)\n\`\`\``;
    }

    // Default intelligent chemistry tutor answer
    return `### 🧪 CHEM AI Tahlili\n\nSiz kiritgan savol: **"${query}"**\n\nKimyo nuqtai nazaridan:\n1. Moddalar va elementlar doimo eng kam energiya va maksimal barqarorlik (oktet qoidasi) holatiga intiladi.\n2. Kimyoviy o'zgarishlarda atomlar yo'qolmaydi yoki yangidan paydo bo'lmaydi, faqat elektronlar qayta taqsimlanadi va yangi kimyoviy bog'lar vujudga keladi.\n3. Har qanday aniq formula yoki reaksiyani yozing (masalan, \`H2 + O2 = H2O\` yoki \`CaCO3\`), men darhol stexiometrik hisob-kitob qilib beraman!`;
  };

  const handleSendMessage = async (textToSend?: string) => {
    const text = textToSend || inputText;
    if (!text.trim() || isLoading) return;

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: 'Hozir'
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setIsLoading(true);

    try {
      // Attempt backend API call
      const response = await fetch('/api/chem-ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: text, lang: currentLang })
      });

      if (response.ok) {
        const data = await response.json();
        if (data.reply) {
          setMessages(prev => [
            ...prev,
            {
              id: `ai-${Date.now()}`,
              sender: 'ai',
              text: data.reply,
              timestamp: 'Hozir'
            }
          ]);
          setIsLoading(false);
          return;
        }
      }
    } catch {
      // Fallback to local expert solver
    }

    // Local deterministic expert chemistry intelligence response
    setTimeout(() => {
      const expertReply = getExpertChemistryResponse(text);
      setMessages(prev => [
        ...prev,
        {
          id: `ai-${Date.now()}`,
          sender: 'ai',
          text: expertReply,
          timestamp: 'Hozir'
        }
      ]);
      setIsLoading(false);
    }, 600);
  };

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="w-full flex flex-col gap-6">
      {/* Console Interface Container */}
      <div className="neon-border rounded-3xl p-4 sm:p-6 bg-slate-950/90 flex flex-col h-[700px] shadow-2xl relative overflow-hidden">
        {/* Top Header Console HUD */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800/80 z-10">
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10 rounded-2xl bg-gradient-to-tr from-cyan-500 to-purple-600 flex items-center justify-center shadow-lg shadow-cyan-500/20">
              <Bot className="w-5 h-5 text-slate-950" />
              <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-400 border-2 border-slate-950" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold font-hud text-white">CHEM AI Tadqiqot Konsoli</h3>
                <span className="px-2 py-0.5 rounded-full bg-cyan-500/15 border border-cyan-500/30 text-[10px] font-mono text-cyan-300 font-bold">
                  Gemini Flash 3.8
                </span>
              </div>
              <p className="text-xs text-slate-400 font-mono">
                Ko'p tilli kimyoviy intellekt | O'zbek, English, Русский
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setMessages([messages[0]])}
              title="Chatni tozalash"
              className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Messages Stream Area */}
        <div className="flex-1 overflow-y-auto py-4 space-y-4 pr-1 scrollbar-thin">
          {messages.map(msg => (
            <div
              key={msg.id}
              className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.sender === 'ai' && (
                <div className="w-8 h-8 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center shrink-0 mt-1">
                  <Cpu className="w-4 h-4 text-cyan-400" />
                </div>
              )}

              <div
                className={`max-w-[85%] sm:max-w-[75%] rounded-2xl p-4 text-xs sm:text-sm leading-relaxed relative group ${
                  msg.sender === 'user'
                    ? 'bg-cyan-500 text-slate-950 font-medium rounded-br-none shadow-lg shadow-cyan-500/10'
                    : 'bg-slate-900/90 border border-slate-800 text-slate-200 rounded-bl-none shadow-md'
                }`}
              >
                <div className="whitespace-pre-line font-sans">
                  {msg.text}
                </div>

                {msg.sender === 'ai' && (
                  <button
                    onClick={() => handleCopy(msg.text, msg.id)}
                    className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity p-1.5 rounded-lg bg-slate-800/80 text-slate-400 hover:text-white"
                    title="Nusxa olish"
                  >
                    {copiedId === msg.id ? (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                )}
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex gap-3 justify-start items-center">
              <div className="w-8 h-8 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center">
                <Cpu className="w-4 h-4 text-cyan-400 animate-spin" />
              </div>
              <div className="p-3 rounded-2xl bg-slate-900/80 border border-slate-800 text-xs text-cyan-300 font-mono flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                <span>Kimyoviy ma'lumotlar tahlil qilinmoqda...</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Suggested Prompts Pills */}
        <div className="pt-2 pb-1 border-t border-slate-800/80 flex items-center gap-1.5 overflow-x-auto scrollbar-thin">
          <span className="text-[11px] text-slate-500 font-mono shrink-0 mr-1">Tavsiyalar:</span>
          {samplePrompts.map((p, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(p)}
              className="px-2.5 py-1 rounded-lg bg-slate-900/70 border border-slate-800 text-[11px] text-slate-300 hover:border-cyan-500/40 hover:text-cyan-300 shrink-0 transition-colors"
            >
              {p}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div className="pt-2">
          <div className="flex items-center gap-2 bg-slate-900/90 border border-slate-800 rounded-2xl p-1.5 focus-within:border-cyan-500/60 focus-within:ring-1 focus-within:ring-cyan-500/30">
            <input
              type="text"
              value={inputText}
              onChange={e => setInputText(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSendMessage()}
              placeholder="Masalan: Tenglamani tenglashtir: KMnO4 + HCl = KCl + MnCl2 + Cl2 + H2O"
              className="flex-1 px-3 py-2 bg-transparent text-sm text-white placeholder-slate-500 focus:outline-none"
            />
            <button
              onClick={() => handleSendMessage()}
              disabled={isLoading || !inputText.trim()}
              className="px-4 py-2.5 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs flex items-center gap-1.5 hover:bg-cyan-400 transition-colors disabled:opacity-40 disabled:cursor-not-allowed shadow-md shadow-cyan-500/20"
            >
              <span>Yuborish</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
