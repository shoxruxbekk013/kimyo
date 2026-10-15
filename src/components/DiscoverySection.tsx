import React, { useState } from 'react';
import { 
  Compass, 
  Sparkles, 
  Clock, 
  Award, 
  Rocket, 
  Coffee, 
  Layers, 
  Atom, 
  ExternalLink,
  ChevronRight
} from 'lucide-react';

interface Props {
  currentLang: 'uz' | 'en' | 'ru';
}

const SCIENTISTS = [
  {
    name: 'Dmitriy Mendeleyev',
    years: '1834 – 1907',
    contributionUz: 'Kimyoviy elementlar davriy qonunini kashf qilgan va hali topilmagan elementlarning xossalarini oldindan aytib bergan.',
    avatar: '👨‍🔬',
    country: 'Rossiya'
  },
  {
    name: 'Mariya Kyuri',
    years: '1867 – 1934',
    contributionUz: 'Radioaktivlik hodisasini o\'rgangan, radiy va poloniy elementlarini kashf etgan. Ikki xil fan (Fizika va Kimyo) bo\'yicha yagona ayol Nobel sohibi.',
    avatar: '👩‍🔬',
    country: 'Polsha / Fransiya'
  },
  {
    name: 'Antuan Lavuazye',
    years: '1743 – 1794',
    contributionUz: 'Zamonaviy kimyoning otasi. Massa saqlanish qonunini ta\'riflagan va flogiston gipotezasini inkor qilib yonishda kislorod rolini isbotlagan.',
    avatar: '⚗️',
    country: 'Fransiya'
  },
  {
    name: 'Laynus Poling',
    years: '1901 – 1994',
    contributionUz: 'Kimyoviy bog\'lanish tabiati, elektromanfiylik shkalasi va oqsillarning ikkilamchi tuzilishini aniqlagan ikki karra Nobel mukofoti sovrindori.',
    avatar: '🧬',
    country: 'AQSh'
  }
];

const ATOM_TIMELINE = [
  { year: 'Mil. avv. 400', model: 'Demokrit atomizmi', descUz: 'Moddaning bo\'linmas eng kichik zarralari (atomos — bo\'linmas).' },
  { year: '1803', model: 'Jon Dalton sharlari', descUz: 'Har bir element o\'ziga xos massaga ega bo\'lgan qattiq sharsimon atomlardan iborat.' },
  { year: '1897', model: 'Tomsonning "Mayizli keks" modeli', descUz: 'Musbat zaryadlangan shar ichida manfiy elektronlar tarqalgan.' },
  { year: '1911', model: 'Rezerford sayyoraviy modeli', descUz: 'Markazda mitti musbat yadro, atrofida xuddi sayyoralar kabi aylanuvchi elektronlar.' },
  { year: '1913', model: 'Bor kvant modeli', descUz: 'Elektronlar faqat qat\'iy belgilangan stasionar energetik orbitalarda nurlanmasdan aylanadi.' },
  { year: '1926 – Hozir', model: 'Kvant mexanik elektron buluti', descUz: 'Shredinger to\'lqin tenglamasi: elektron orbitali — elektron topilish ehtimolligi 90% dan yuqori fazoviy bulut.' }
];

export const DiscoverySection: React.FC<Props> = () => {
  const [activeTab, setActiveTab] = useState<'timeline' | 'scientists' | 'space' | 'everyday'>('timeline');

  return (
    <div className="w-full flex flex-col gap-6">
      {/* Tab Switcher */}
      <div className="neon-border rounded-2xl p-2 bg-slate-950/80 flex items-center gap-2 overflow-x-auto">
        {[
          { id: 'timeline', label: 'Atom Vaqt Mashinasi', icon: Clock },
          { id: 'scientists', label: 'Buyuk Kimyogarlar', icon: Award },
          { id: 'space', label: 'Koinot Kimyosi (Astrokimyo)', icon: Rocket },
          { id: 'everyday', label: 'Kundalik Hayot Kimyosi', icon: Coffee }
        ].map(tab => {
          const Icon = tab.icon;
          const isSelected = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as 'timeline' | 'scientists' | 'space' | 'everyday')}
              className={`px-4 py-2 rounded-xl text-xs font-medium transition-all flex items-center gap-2 shrink-0 ${
                isSelected
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/50 shadow-md shadow-cyan-500/10'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Icon className="w-4 h-4 text-cyan-400" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab 1: Atom Time Machine */}
      {activeTab === 'timeline' && (
        <div className="neon-border rounded-2xl p-6 bg-slate-950/80 space-y-6">
          <div>
            <h3 className="text-2xl font-bold font-hud text-white">
              Atom Modellarining Tarixiy Evolyutsiyasi
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Qadimgi yunon falsafasidan to zamonaviy kvant mexanikasigacha bo'lgan ilmiy taraqqiyot yo'li.
            </p>
          </div>

          <div className="relative border-l-2 border-cyan-500/30 ml-4 sm:ml-6 space-y-8 py-2">
            {ATOM_TIMELINE.map((item, idx) => (
              <div key={idx} className="relative pl-6 sm:pl-8 group">
                <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-slate-950 border-2 border-cyan-400 shadow-md shadow-cyan-500/50 group-hover:scale-125 transition-transform" />
                <span className="text-xs font-mono text-cyan-400 font-bold block mb-1">
                  {item.year}
                </span>
                <h4 className="text-base font-bold font-hud text-white mb-1">
                  {item.model}
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed max-w-2xl">
                  {item.descUz}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 2: Great Chemists */}
      {activeTab === 'scientists' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {SCIENTISTS.map((sci, idx) => (
            <div key={idx} className="neon-border rounded-2xl p-5 bg-slate-950/80 flex items-start gap-4">
              <div className="text-4xl p-3 rounded-2xl bg-slate-900 border border-slate-800 shrink-0">
                {sci.avatar}
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h4 className="text-lg font-bold font-hud text-white">{sci.name}</h4>
                  <span className="text-[10px] font-mono text-slate-400">({sci.country})</span>
                </div>
                <div className="text-xs font-mono text-cyan-400">{sci.years}</div>
                <p className="text-xs text-slate-300 leading-relaxed pt-1">
                  {sci.contributionUz}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab 3: Chemistry in Space */}
      {activeTab === 'space' && (
        <div className="neon-border rounded-2xl p-6 bg-slate-950/80 space-y-6">
          <h3 className="text-2xl font-bold font-hud text-white">
            Koinotdagi Kimyo va Astrokimyo
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
              <div className="text-2xl">🌟</div>
              <h4 className="font-bold text-white text-sm">Yulduzlar nukleosintezi</h4>
              <p className="text-slate-400 leading-relaxed">
                Katta portlashdan so'ng faqat H va He bor edi. Uglerod, kislorod, temir va boshqa barcha elementlar yulduzlar qalbida va o'ta yangi yulduzlar (Supernova) portlashida sintezlangan.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
              <div className="text-2xl">🪐</div>
              <h4 className="font-bold text-white text-sm">Titandagi metan dengizlari</h4>
              <p className="text-slate-400 leading-relaxed">
                Saturnning yo'ldoshi Titanda suyuq uglevodorodlar (metan va etan) daryolari va ko'llari mavjud. U yerda "suv" o'rniga suyuq gaz yog'adi.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
              <div className="text-2xl">🔭</div>
              <h4 className="font-bold text-white text-sm">Yulduzlararo organik molekulalar</h4>
              <p className="text-slate-400 leading-relaxed">
                James Webb teleskopi chuqur koinot tumanliklarida murakkab organik molekulalar — etanol, aminokislotalar va politsiklik aromatik moddalarni qayd etmoqda.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: Everyday Life Chemistry */}
      {activeTab === 'everyday' && (
        <div className="neon-border rounded-2xl p-6 bg-slate-950/80 space-y-6">
          <h3 className="text-2xl font-bold font-hud text-white">
            Kundalik Hayotimizdagi Kimyo
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
              <h4 className="font-bold text-cyan-300 text-sm">Nega sovun kirlarni tozalaydi?</h4>
              <p className="text-slate-400 leading-relaxed">
                Sovun molekulalari ikki xil qutbga ega: gidrofil (suvsevar boshcha) va gidrofob (yog'sevar dumi). Ular yog' zarrachalarini o'rab olib mitsellalar hosil qiladi va suv bilan oqizib ketadi.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
              <h4 className="font-bold text-purple-300 text-sm">Smartfon batareyalari (Li-ion) qanday ishlaydi?</h4>
              <p className="text-slate-400 leading-relaxed">
                Zaryadlanganda litiy ionlari (Li⁺) katoddan anodga o'tadi; sarflanganda esa teskarisiga harakat qilib, tashqi zanjirga elektr toki hosil qiluvchi elektronlarni beradi.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
