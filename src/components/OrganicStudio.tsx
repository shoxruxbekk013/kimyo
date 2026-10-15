import React, { useState } from 'react';
import { Hexagon, Sparkles, Layers, BookOpen, CheckCircle2, ChevronRight, Info } from 'lucide-react';

interface FunctionalGroup {
  id: string;
  nameUz: string;
  nameEn: string;
  formula: string;
  suffixUz: string;
  exampleNameUz: string;
  exampleFormula: string;
  descriptionUz: string;
  color: string;
}

const FUNCTIONAL_GROUPS: FunctionalGroup[] = [
  {
    id: 'alkane',
    nameUz: 'Alkanlar (To\'yingan uglevodorodlar)',
    nameEn: 'Alkanes',
    formula: 'R-H (C-C)',
    suffixUz: '-an (masalan: Etan)',
    exampleNameUz: 'Etan',
    exampleFormula: 'CH₃-CH₃',
    descriptionUz: 'Faqat bittalik σ-bog\'larga ega to\'yingan uglevodorodlar. Kimyoviy jihatdan passiv (parafinlar deb ataladi).',
    color: '#38bdf8'
  },
  {
    id: 'alkene',
    nameUz: 'Alkenlar (Qo\'shbog\'li uglevodorodlar)',
    nameEn: 'Alkenes',
    formula: 'R-CH=CH-R (C=C)',
    suffixUz: '-en (masalan: Eten/Etilen)',
    exampleNameUz: 'Etilen',
    exampleFormula: 'CH₂=CH₂',
    descriptionUz: 'Bitta ikkitalik (bitta σ va bitta π) bog\'ga ega to\'yinmagan uglevodorodlar. Birikish va polimerlanish reaksiyalariga oson kirishadi.',
    color: '#06b6d4'
  },
  {
    id: 'alkyne',
    nameUz: 'Alkinlar (Uchtalik bog\'li uglevodorodlar)',
    nameEn: 'Alkynes',
    formula: 'R-C≡C-R (C≡C)',
    suffixUz: '-in (masalan: Etin/Asetilen)',
    exampleNameUz: 'Asetilen',
    exampleFormula: 'CH≡CH',
    descriptionUz: 'Uchtalik bog\'ga (bitta σ va ikkita π) ega birikmalar. Asetilen payvandlashda 3000°C dan yuqori olov beradi.',
    color: '#818cf8'
  },
  {
    id: 'alcohol',
    nameUz: 'Spirtlar (Gidroksil guruhi)',
    nameEn: 'Alcohols',
    formula: 'R-OH',
    suffixUz: '-ol (masalan: Etanol)',
    exampleNameUz: 'Etanol',
    exampleFormula: 'CH₃-CH₂-OH',
    descriptionUz: '-OH (gidroksil) guruhiga ega organik birikmalar. Vodorod bog\'lanishlari hisobiga anomal yuqori qaynash haroratiga ega.',
    color: '#ec4899'
  },
  {
    id: 'aldehyde',
    nameUz: 'Aldegidlar (Karbonil guruhi)',
    nameEn: 'Aldehydes',
    formula: 'R-CH=O',
    suffixUz: '-al (masalan: Etanal)',
    exampleNameUz: 'Formaldegid / Atsetaldegid',
    exampleFormula: 'CH₃-CHO',
    descriptionUz: 'Zanjir oxirida joylashgan karbonil guruhiga ega. "Kumush ko\'zgu" reaksiyasini beradi.',
    color: '#f59e0b'
  },
  {
    id: 'ketone',
    nameUz: 'Ketonlar (Karbonil guruhi)',
    nameEn: 'Ketones',
    formula: 'R-C(=O)-R\'',
    suffixUz: '-on (masalan: Propanon/Atseton)',
    exampleNameUz: 'Atseton',
    exampleFormula: 'CH₃-CO-CH₃',
    descriptionUz: 'Ikkita uglevodorod radikali orasidagi karbonil guruhi. Zo\'r organik erituvchi.',
    color: '#f97316'
  },
  {
    id: 'carboxylic-acid',
    nameUz: 'Karbon kislotalar (Karboksil guruhi)',
    nameEn: 'Carboxylic Acids',
    formula: 'R-COOH',
    suffixUz: '-kislota (masalan: Sirka kislotasi)',
    exampleNameUz: 'Sirka kislota (Etanoat kislota)',
    exampleFormula: 'CH₃-COOH',
    descriptionUz: '-COOH (karboksil) guruhi mavjud zaif organik kislotalar. Sirka, chumoli va sut kislotasi kiradi.',
    color: '#ef4444'
  },
  {
    id: 'ester',
    nameUz: 'Murakkab efirlar (Esterlar)',
    nameEn: 'Esters',
    formula: 'R-COO-R\'',
    suffixUz: '-oat (masalan: Etilatsetat)',
    exampleNameUz: 'Etilasetat',
    exampleFormula: 'CH₃-COO-CH₂CH₃',
    descriptionUz: 'Kislota va spirtlarning eterifikatsiya reaksiyasidan hosil bo\'ladi. Mevali xushbo\'y hidga ega.',
    color: '#a855f7'
  },
  {
    id: 'amine',
    nameUz: 'Aminlar (Aminoguruh)',
    nameEn: 'Amines',
    formula: 'R-NH₂',
    suffixUz: '-amin (masalan: Metilamin)',
    exampleNameUz: 'Metilamin',
    exampleFormula: 'CH₃-NH₂',
    descriptionUz: 'Ammiakdagi vodorod atomlari organik radikallar bilan almashgan birikmalar. Asoslik xossasiga ega.',
    color: '#10b981'
  }
];

export const OrganicStudio: React.FC<{ currentLang: 'uz' | 'en' | 'ru' }> = () => {
  const [activeGroup, setActiveGroup] = useState<FunctionalGroup>(FUNCTIONAL_GROUPS[0]);
  const [studioTab, setStudioTab] = useState<'groups' | 'iupac' | 'isomers'>('groups');

  return (
    <div className="w-full flex flex-col gap-6">
      {/* Studio Tab Switcher */}
      <div className="neon-border rounded-2xl p-2 bg-slate-950/80 flex items-center gap-2 overflow-x-auto">
        {[
          { id: 'groups', label: 'Funksional guruhlar kutubxonasi' },
          { id: 'iupac', label: 'IUPAC nomenklatura qoidalari' },
          { id: 'isomers', label: 'Izomeriya va fazoviy tuzilish' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setStudioTab(tab.id as 'groups' | 'iupac' | 'isomers')}
            className={`px-4 py-2 rounded-xl text-xs font-medium transition-all ${
              studioTab === tab.id
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/50 shadow-md shadow-cyan-500/10'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {studioTab === 'groups' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Groups List (4 Cols) */}
          <div className="lg:col-span-4 neon-border rounded-2xl p-4 bg-slate-950/80 space-y-2 max-h-[580px] overflow-y-auto scrollbar-thin">
            <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider block mb-2 font-semibold">
              Funksional guruhlar
            </span>
            {FUNCTIONAL_GROUPS.map(group => {
              const isSelected = group.id === activeGroup.id;
              return (
                <button
                  key={group.id}
                  onClick={() => setActiveGroup(group)}
                  className={`w-full text-left p-3 rounded-xl border transition-all text-xs flex items-center justify-between ${
                    isSelected
                      ? 'bg-cyan-500/20 border-cyan-500/60 text-white shadow-sm'
                      : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <div>
                    <div className="font-semibold">{group.nameUz}</div>
                    <div className="font-mono text-[11px] text-cyan-400 mt-0.5">{group.formula}</div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-500" />
                </button>
              );
            })}
          </div>

          {/* Group Details (8 Cols) */}
          <div className="lg:col-span-8 neon-border rounded-2xl p-6 bg-slate-950/80 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div>
                <span className="text-xs font-mono text-purple-400 uppercase tracking-wider block">
                  Organik kimyo sinfi
                </span>
                <h3 className="text-2xl font-bold font-hud text-white mt-1">
                  {activeGroup.nameUz}
                </h3>
              </div>
              <div
                className="px-3 py-1.5 rounded-xl border font-mono font-bold text-sm"
                style={{ color: activeGroup.color, borderColor: `${activeGroup.color}40`, backgroundColor: `${activeGroup.color}15` }}
              >
                {activeGroup.formula}
              </div>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed font-sans">
              {activeGroup.descriptionUz}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
              <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
                <span className="text-slate-400 block mb-1">IUPAC qo'shimchasi:</span>
                <span className="text-cyan-300 font-bold text-sm">{activeGroup.suffixUz}</span>
              </div>
              <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
                <span className="text-slate-400 block mb-1">Klassik vakili:</span>
                <span className="text-purple-300 font-bold text-sm">{activeGroup.exampleNameUz} ({activeGroup.exampleFormula})</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {studioTab === 'iupac' && (
        <div className="neon-border rounded-2xl p-6 bg-slate-950/80 space-y-6">
          <h3 className="text-2xl font-bold font-hud text-white">
            IUPAC Xalqaro Nomenklatura Qoidalari
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
              <div className="w-6 h-6 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold">1</div>
              <h4 className="font-bold text-white text-sm">Eng uzun uglerod zanjiri</h4>
              <p className="text-slate-400 leading-relaxed">
                Molekuladagi eng uzun uzluksiz uglerod zanjirini tanlang. U asosiy nomni belgilaydi (metan, etan, propan, butan...).
              </p>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
              <div className="w-6 h-6 rounded-lg bg-purple-500/20 text-purple-400 flex items-center justify-center font-bold">2</div>
              <h4 className="font-bold text-white text-sm">Raqamlash tartibi</h4>
              <p className="text-slate-400 leading-relaxed">
                Zanjirni tarmoqlanish yoki asosiy funksional guruh eng yaqin bo'lgan tomondan raqamlang.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
              <div className="w-6 h-6 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">3</div>
              <h4 className="font-bold text-white text-sm">O'rinbosarlar alifbosi</h4>
              <p className="text-slate-400 leading-relaxed">
                Radikallar alifbo tartibida o'z raqamlari bilan yoziladi (masalan: 2,2-dimetilpropan).
              </p>
            </div>
          </div>
        </div>
      )}

      {studioTab === 'isomers' && (
        <div className="neon-border rounded-2xl p-6 bg-slate-950/80 space-y-6">
          <h3 className="text-2xl font-bold font-hud text-white">
            Izomeriya Turlari va Stereokimyo
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
              <h4 className="font-bold text-cyan-300 text-sm">Tuzilish izomeriyasi</h4>
              <p className="text-slate-400 leading-relaxed">
                Uglerod skeleti, funksional guruh holati yoki sinflararo izomeriya. Masalan: Butan (chiziqli) va Izobutan (tarmoqlangan).
              </p>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
              <h4 className="font-bold text-purple-300 text-sm">Fazoviy (Sis-Trans) izomeriya</h4>
              <p className="text-slate-400 leading-relaxed">
                Qo'shbog' yoki halqa atrofida o'rinbosarlarning bir tomonda (sis) yoki qarama-qarshi tomonda (trans) joylashuvi.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
