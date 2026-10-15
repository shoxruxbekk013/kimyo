import { LabReagent, LabReactionResult } from '../types/chemistry';

export const LAB_REAGENTS: LabReagent[] = [
  {
    id: 'hcl',
    nameUz: 'Xlorid kislota (HCl)',
    nameEn: 'Hydrochloric Acid',
    formula: 'HCl(aq)',
    state: 'liquid',
    color: 'rgba(224, 242, 254, 0.4)',
    pH: 1.0,
    concentration: '1.0 mol/L',
    concentrationMolar: 1.0,
    molarMass: 36.46,
    category: 'acid',
    descriptionUz: 'Kuchli bir asosli anorganik kislota. Suvli eritmada deyarli 100% dissotsialanadi: HCl(aq) + H₂O(l) → H₃O⁺(aq) + Cl⁻(aq).',
    ghsSymbols: ['GHS05 (Korroziyaviy)', 'GHS07 (Zararli)'],
    hazardsUz: 'Terini kuydiradi, ko\'zga zarar yetkazadi. Bug\'lari nafas yo\'llarini tirnaydi.'
  },
  {
    id: 'naoh',
    nameUz: 'Natriy gidroksid (NaOH)',
    nameEn: 'Sodium Hydroxide',
    formula: 'NaOH(aq)',
    state: 'liquid',
    color: 'rgba(224, 242, 254, 0.4)',
    pH: 14.0,
    concentration: '1.0 mol/L',
    concentrationMolar: 1.0,
    molarMass: 40.00,
    category: 'base',
    descriptionUz: 'Kuchli ishqor. Suvda to\'liq dissotsialanadi: NaOH(s) → Na⁺(aq) + OH⁻(aq).',
    ghsSymbols: ['GHS05 (Korroziyaviy)'],
    hazardsUz: 'Tirnoq, teri va to\'qimalarni yemiradi. Ko\'zga tushsa qaytmas shikast yetkazadi.'
  },
  {
    id: 'cuso4',
    nameUz: 'Mis (II) sulfat (CuSO₄)',
    nameEn: 'Copper(II) Sulfate',
    formula: 'CuSO₄(aq)',
    state: 'liquid',
    color: 'rgba(14, 165, 233, 0.85)',
    pH: 4.2, // Dilute aqueous solution is slightly acidic due to hydrolysis of [Cu(H2O)6]2+
    concentration: '0.5 mol/L',
    concentrationMolar: 0.5,
    molarMass: 159.61,
    category: 'salt',
    descriptionUz: 'To\'q moviy rangli eritma. Cu²⁺ kationlari suvda akvakompleks [Cu(H₂O)₆]²⁺ hosil qilgani uchun xarakterli moviy rang beradi. Kation gidrolizi hisobiga muhit biroz kislotali (pH ≈ 4.2).',
    ghsSymbols: ['GHS07 (Zararli)', 'GHS09 (Atrof-muhitga xavfli)'],
    hazardsUz: 'Suv florasi va faunasi uchun toksik. Yutish xavfli.'
  },
  {
    id: 'fecl3',
    nameUz: 'Temir (III) xlorid (FeCl₃)',
    nameEn: 'Iron(III) Chloride',
    formula: 'FeCl₃(aq)',
    state: 'liquid',
    color: 'rgba(217, 119, 6, 0.85)',
    pH: 1.8, // Hydrolysis of Fe3+ releases H3O+, pKa of [Fe(H2O)6]3+ is ~2.2
    concentration: '0.5 mol/L',
    concentrationMolar: 0.5,
    molarMass: 162.20,
    category: 'salt',
    descriptionUz: 'Qahrabo sariq-jigarrang eritma. [Fe(H₂O)₆]³⁺ kationi kuchli gidrolizlanadi ([Fe(H₂O)₆]³⁺ + H₂O ⇌ [Fe(H₂O)₅(OH)]²⁺ + H₃O⁺, pKa ≈ 2.2), shuning uchun uning eritmasi sezilarli kislotali muhitga ega (pH ≈ 1.8–2.0).',
    ghsSymbols: ['GHS05 (Korroziyaviy)', 'GHS07 (Zararli)'],
    hazardsUz: 'Metallarni zanglatadi va kislotali ta\'sirga ega.'
  },
  {
    id: 'agno3',
    nameUz: 'Kumush nitrat (AgNO₃)',
    nameEn: 'Silver Nitrate',
    formula: 'AgNO₃(aq)',
    state: 'liquid',
    color: 'rgba(241, 245, 249, 0.5)',
    pH: 6.0,
    concentration: '0.1 mol/L',
    concentrationMolar: 0.1,
    molarMass: 169.87,
    category: 'salt',
    descriptionUz: 'Rangsiz eritma. Halogenid ionlari (Cl⁻, Br⁻, I⁻) bilan erimaydigan kumush galogenid cho\'kmalarini hosil qiluvchi klassik analitik sifat reaktivi.',
    ghsSymbols: ['GHS03 (Oksidlovchi)', 'GHS05 (Korroziyaviy)', 'GHS09 (Suvga xavfli)'],
    hazardsUz: 'Organik moddalar va terida qora kumush metalli dog\'larini qoldiradi. Oqava suvga tashlash taqiqlanadi.'
  },
  {
    id: 'nacl',
    nameUz: 'Natriy xlorid (NaCl)',
    nameEn: 'Sodium Chloride',
    formula: 'NaCl(aq)',
    state: 'liquid',
    color: 'rgba(241, 245, 249, 0.4)',
    pH: 7.0, // Neutral salt of strong acid and strong base at 25 °C
    concentration: '1.0 mol/L',
    concentrationMolar: 1.0,
    molarMass: 58.44,
    category: 'salt',
    descriptionUz: 'Kuchli kislota va kuchli asosdan hosil bo\'lgan neytral tuz eritmasi. Gidrolizga uchramaydi; 25 °C da eritma pH qiymati taxminan 7.0 (neytral).',
    ghsSymbols: [],
    hazardsUz: 'Oddiy sharoitda xavfsiz.'
  },
  {
    id: 'bacl2',
    nameUz: 'Bariy xlorid (BaCl₂)',
    nameEn: 'Barium Chloride',
    formula: 'BaCl₂(aq)',
    state: 'liquid',
    color: 'rgba(241, 245, 249, 0.4)',
    pH: 6.8,
    concentration: '0.5 mol/L',
    concentrationMolar: 0.5,
    molarMass: 208.23,
    category: 'salt',
    descriptionUz: 'Rangsiz eruvchan bariy tuzi. Sulfat (SO₄²⁻) ionlari uchun o\'ta sezgir analitik reaktiv bo\'lib, kislotalarda erimaydigan BaSO₄ cho\'kmasini beradi.',
    ghsSymbols: ['GHS06 (O\'tkir toksik)'],
    hazardsUz: 'Bariy ionlari organizm uchun zaharli (mushak va yurak faoliyatiga salbiy ta\'sir qiladi).'
  },
  {
    id: 'h2so4',
    nameUz: 'Sulfat kislota (H₂SO₄)',
    nameEn: 'Sulfuric Acid',
    formula: 'H₂SO₄(aq)',
    state: 'liquid',
    color: 'rgba(224, 242, 254, 0.4)',
    pH: 0.3,
    concentration: '1.0 mol/L',
    concentrationMolar: 1.0,
    molarMass: 98.08,
    category: 'acid',
    descriptionUz: 'Kuchli ikki asosli kislota. Birinchi bosqichda to\'liq dissotsialanadi (pKa1 < 0), ikkinchi bosqichda pKa2 = 1.99 bo\'yicha HSO₄⁻ ⇌ H⁺ + SO₄²⁻ muvozanati mavjud.',
    ghsSymbols: ['GHS05 (Korroziyaviy)'],
    hazardsUz: 'Kuchli kuydiruvchi va suv tortib oluvchi xususiyatga ega. Suvga kislota qo\'shish qoidasiga qat\'iy rioya qilish kerak.'
  },
  {
    id: 'ki',
    nameUz: 'Kaliy yodid (KI)',
    nameEn: 'Potassium Iodide',
    formula: 'KI(aq)',
    state: 'liquid',
    color: 'rgba(241, 245, 249, 0.4)',
    pH: 7.0,
    concentration: '0.5 mol/L',
    concentrationMolar: 0.5,
    molarMass: 166.00,
    category: 'salt',
    descriptionUz: 'Rangsiz eruvchan yodid tuzi. Qaytaruvchi xossasiga ega. Pb²⁺ ionlari bilan eruvchanligi past bo\'lgan PbI₂ hosil qiladi.',
    ghsSymbols: ['GHS07 (Zararli)'],
    hazardsUz: 'Yuqori dozalarda qalqonsimon bezga ta\'sir qiladi.'
  },
  {
    id: 'pbno3',
    nameUz: 'Qo\'rg\'oshin (II) nitrat (Pb(NO₃)₂)',
    nameEn: 'Lead(II) Nitrate',
    formula: 'Pb(NO₃)₂(aq)',
    state: 'liquid',
    color: 'rgba(241, 245, 249, 0.4)',
    pH: 4.4, // Slight cation hydrolysis Pb2+ + H2O ⇌ Pb(OH)+ + H+
    concentration: '0.2 mol/L',
    concentrationMolar: 0.2,
    molarMass: 331.20,
    category: 'salt',
    descriptionUz: 'Eruvchan qo\'rg\'oshin(II) tuzi. Pb²⁺ kationlari va NO₃⁻ anionlaridan iborat. Yodid ionlari bilan haroratga bog\'liq "Oltin yomg\'ir" hosil qiladi.',
    ghsSymbols: ['GHS08 (Salomatlikka jiddiy xavf - Repr. 1A)', 'GHS07 (Zararli)', 'GHS09 (Atrof-muhitga o\'ta xavfli)'],
    hazardsUz: 'Kuchli kumulyativ og\'ir metall zahari. Bolalar va homila asab tizimiga og\'ir shikast yetkazadi. Virtual laboratoriya ta\'limiy simulyatsiyasidir; real laboratoriyada qat\'iy xavfsizlik va utilizatsiya protokoli talab etiladi.'
  },
  {
    id: 'zn',
    nameUz: 'Rux donachalari (Zn)',
    nameEn: 'Zinc Granules',
    formula: 'Zn(s)',
    state: 'solid',
    color: 'rgba(148, 163, 184, 0.95)',
    molarMass: 65.38,
    category: 'metal',
    descriptionUz: 'Kulrang qattiq metall. Standart qaytarilish potensiali E°(Zn²⁺/Zn) = -0.762 V bo\'lib, vodorodga (E° = 0.000 V) nisbatan elektrokimyoviy faolroq. Kislotalar bilan reaksiyaga kirishib vodorod gazini ajratadi.',
    ghsSymbols: ['GHS09 (Suvga xavfli)'],
    hazardsUz: 'Kislotalar bilan reaksiyasida portlovchi vodorod gazi ajraladi.'
  },
  {
    id: 'phenolphthalein',
    nameUz: 'Fenolftalein indikatori',
    nameEn: 'Phenolphthalein Indicator',
    formula: 'C₂₀H₁₄O₄ (eritma)',
    state: 'indicator',
    color: 'rgba(255, 255, 255, 0.2)',
    category: 'indicator',
    descriptionUz: 'Kislota-asos indikatori. pH < 0 da to\'q sariq, pH 0–8.2 oralig\'ida rangsiz lakton shaklida bo\'ladi. pH 8.2–10.0 oraliqda deprotonlanib (dianion In²⁻) pushti-malinarangga aylanadi. pH > 13.0 yuqori konsentratsiyali ishqorda esa sekin qaytadan rangsizlanadi (karbinol trianion In(OH)³⁻).',
    ghsSymbols: ['GHS08 (Sog\'liqqa xavfli - Muta. 2, Carc. 1B)'],
    hazardsUz: 'Eritmasi odatda etanolda tayyorlanadi. Qabul qilish taqiqlanadi.'
  },
  {
    id: 'litmus',
    nameUz: 'Lakmus indikatori',
    nameEn: 'Litmus Indicator',
    formula: 'Lakmus (eritma)',
    state: 'indicator',
    color: 'rgba(168, 85, 247, 0.6)',
    category: 'indicator',
    descriptionUz: 'Tabiiy lishayniklardan olinadigan indikator. Kislotali muhitda (pH < 4.5) qizil, neytral eritmada (pH 5.0–8.0) binafsharang, ishqoriy muhitda (pH > 8.3) ko\'k rangga kiradi.',
    ghsSymbols: [],
    hazardsUz: 'Toksik emas.'
  }
];

export const LAB_REACTIONS: LabReactionResult[] = [
  {
    reactants: ['hcl', 'naoh'],
    molecularEquation: 'HCl(aq) + NaOH(aq) ⟶ NaCl(aq) + H₂O(l)',
    completeIonicEquation: 'H⁺(aq) + Cl⁻(aq) + Na⁺(aq) + OH⁻(aq) ⟶ Na⁺(aq) + Cl⁻(aq) + H₂O(l)',
    netIonicEquation: 'H⁺(aq) + OH⁻(aq) ⟶ H₂O(l)',
    equation: 'HCl(aq) + NaOH(aq) ⟶ NaCl(aq) + H₂O(l)',
    standardEnthalpyChangeKjPerMol: -55.84, // NIST Standard enthalpy of neutralization at 298.15 K
    temperatureChange: 6.7, // Theoretical adiabatic ΔT for 1.0 M solutions mixed in 1:1 volume ratio: ΔT = (55840 J / 2000 g * 4.184) ≈ 6.67 °C
    finalPh: 7.0, // At exact 1:1 molar equivalence at 25 °C
    colorChange: 'rgba(224, 242, 254, 0.3)',
    explanationUz: 'Neytrallanish reaksiyasi: Kuchli kislota va kuchli ishqor o\'zaro ta\'sirlashib, suv va dissotsialangan natriy hamda xlorid ionlarini hosil qiladi. Reaksiya ekzotermik bo\'lib, 298.15 K da standart neytrallanish entalpiyasi ΔH°_neut = -55.84 kJ/mol ga teng (NIST ma\'lumotlar bazasi).',
    conditionDependenciesUz: 'Kuzatiladigan harorat o\'zgarishi eritmalar konsentratsiyasi, hajmi va idishning issiqlik sig\'imiga bog\'liq: ΔT = (-ΔH° · n) / (m_eritma · c_p). Ochiq laboratoriya idishida atrof-muhitga issiqlik yo\'qotilishi tufayli real o\'sish nazariydan kamroq bo\'ladi. Ekvivalentlik nuqtasida pH = 7.00 faqat 25 °C da to\'g\'ri; harorat o\'zgarganda suvning ion ko\'paytmasi Kw o\'zgaradi.',
    safetyWarningUz: 'Reagentlar korroziyaviy: Kislota va ishqor sachrashi terini qattiq kuydiradi. Laboratoriyada himoya ko\'zoynagi, xalat va nitril qo\'lqop kiyilishi shart.',
    safetyUz: 'Kislota va ishqor sachrashi xavfli. Himoya vositalaridan foydalaning.',
    disposalGuidanceUz: 'Neytrallangan eritmada faqat NaCl va suv qoladi. Ekvivalentlikka erishilgach, ko\'p miqdordagi suv bilan suyultirib umumiy oqavaga tashlash mumkin.',
    scientificSources: [
      { name: 'NIST Chemistry WebBook', reference: 'Enthalpy of neutralization for H+(aq) + OH-(aq)', url: 'https://webbook.nist.gov' },
      { name: 'IUPAC Gold Book', reference: 'Acid-base neutralization & indicator transition intervals', url: 'https://goldbook.iupac.org' }
    ]
  },
  {
    reactants: ['ki', 'pbno3'],
    molecularEquation: 'Pb(NO₃)₂(aq) + 2KI(aq) ⟶ PbI₂(s)↓ + 2KNO₃(aq)',
    completeIonicEquation: 'Pb²⁺(aq) + 2NO₃⁻(aq) + 2K⁺(aq) + 2I⁻(aq) ⟶ PbI₂(s)↓ + 2K⁺(aq) + 2NO₃⁻(aq)',
    netIonicEquation: 'Pb²⁺(aq) + 2I⁻(aq) ⟶ PbI₂(s)↓',
    equation: 'Pb(NO₃)₂(aq) + 2KI(aq) ⟶ PbI₂(s)↓ + 2KNO₃(aq)',
    precipitate: {
      color: '#facc15',
      nameUz: 'Qo\'rg\'oshin (II) yodid (PbI₂)',
      formula: 'PbI₂',
      kspAt25C: '9.8 × 10⁻⁹ mol³·L⁻³'
    },
    standardEnthalpyChangeKjPerMol: -62.3,
    temperatureChange: 0.4,
    finalPh: 5.8,
    colorChange: 'rgba(250, 204, 21, 0.9)',
    explanationUz: 'Mashhur "Oltin yomg\'ir" reaksiyasi: Pb²⁺ va I⁻ ionlari eruvchanligi past bo\'lgan yorqin sariq PbI₂ cho\'kmasini hosil qiladi (25 °C da eruvchanlik ko\'paytmasi K_sp = 9.8 × 10⁻⁹).',
    conditionDependenciesUz: 'Eruvchanlikning haroratga bog\'liqligi: 20 °C da PbI₂ suvda juda kam eriydi (≈0.75 g/L), ammo 100 °C qaynash haroratida uning eruvchanligi ≈4.3 g/L gacha oshadi. Shuning uchun cho\'kma qizdirilganda to\'liq erib rangsiz bo\'ladi; so\'ngra sekin sovitilganda oltin tangachalar kabi mayda geksagonal yaltiroq kristallar holida qayta kristallanadi.',
    safetyWarningUz: 'O\'TA MUHIM XAVFSIZLIK OGOHLANTIRISHI: Qo\'rg\'oshin birikmalari kuchli kumulyativ toksik moddalar bo\'lib, markaziy asab tizimi, buyraklar va reproduktiv tizimni jiddiy zararlaydi (GHS08, GHS09). Ushbu reaksiya faqat virtual ta\'limiy simulyatsiyadir! Haqiqiy laboratoriyada tortish shkafi va ixtisoslashgan xavfli chiqindi utilizatsiyasi talab etiladi.',
    safetyUz: 'Qo\'rg\'oshin birikmalari toksik og\'ir metallar hisoblanadi. Kanalizatsiyaga tashlash taqiqlanadi.',
    disposalGuidanceUz: 'Hech qachon kanalizatsiyaga to\'kilmaydi! Og\'ir metall chiqindilari erimaydigan sulfid holida cho\'ktiriladi yoki maxsus xavfli kimyoviy chiqindilar konteynerida saqlanadi.',
    scientificSources: [
      { name: 'CRC Handbook of Chemistry and Physics', reference: 'Solubility Product Constants of Inorganic Salts (PbI2 Ksp)', url: 'https://hbcponline.com' },
      { name: 'PubChem / NIH', reference: 'Lead(II) nitrate Compound Summary (CID 24924)', url: 'https://pubchem.ncbi.nlm.nih.gov' }
    ]
  },
  {
    reactants: ['hcl', 'zn'],
    molecularEquation: 'Zn(s) + 2HCl(aq) ⟶ ZnCl₂(aq) + H₂(g)↑',
    completeIonicEquation: 'Zn(s) + 2H⁺(aq) + 2Cl⁻(aq) ⟶ Zn²⁺(aq) + 2Cl⁻(aq) + H₂(g)↑',
    netIonicEquation: 'Zn(s) + 2H⁺(aq) ⟶ Zn²⁺(aq) + H₂(g)↑',
    equation: 'Zn(s) + 2HCl(aq) ⟶ ZnCl₂(aq) + H₂(g)↑',
    gasEvolution: {
      gasFormula: 'H₂',
      nameUz: 'Vodorod gazi',
      flammabilityWarningUz: 'Havoda 4.0% – 75.0% konsentratsiyada portlovchi aralashma hosil qiladi'
    },
    standardEnthalpyChangeKjPerMol: -152.4, // Standard enthalpy of reaction ΔH°
    temperatureChange: 3.6,
    finalPh: 2.5,
    colorChange: 'rgba(224, 242, 254, 0.5)',
    explanationUz: 'Oksidlanish-qaytarilish reaksiyasi: Sink metalli vodorodga qaraganda faolroq qaytaruvchi bo\'lgani uchun (standart elektrod potensiali E°(Zn²⁺/Zn) = -0.762 V < E°(H⁺/H₂) = 0.000 V) gidroksoniy ionlariga elektron beradi (Zn(s) → Zn²⁺ + 2e⁻; 2H⁺ + 2e⁻ → H₂↑). Umumiy standart potensial E°_hujayra = +0.762 V > 0 bo\'lgani uchun jarayon o\'z-o\'zidan boradi (ΔG° < 0).',
    conditionDependenciesUz: 'Reaksiya tezligi kislota konsentratsiyasi, harorat va metall yuzasi maydoniga (chang, donacha yoki plastinka) bog\'liq. Toza sink sekinroq eriydi; mis kabi o\'tish metallari aralashmasi bo\'lsa, mikrogalvanik juftliklar hisobiga vodorod ajralishi tezlashadi.',
    safetyWarningUz: 'YONG\'IN VA PORTLASH XAVFI: Ajralayotgan vodorod gazi o\'ta yengil va alangalanuvchan. Kislorod bilan aralashganda kuchli portlovchi qaldiroq gaz hosil qiladi. Real laboratoriyada bu tajriba tortish shkafida ochiq olov manbalaridan uzoqda o\'tkazilishi shart.',
    safetyUz: 'Vodorod gazi portlovchi aralashma hosil qiladi. Ochiq olovdan qat\'iy uzoq tuting.',
    disposalGuidanceUz: 'Reaksiya to\'liq tugagach, erigan ZnCl₂ eritmasi filtrlanadi va og\'ir metallar me\'yoriga muvofiq maxsus reagentli utilizatsiyaga yuboriladi.',
    scientificSources: [
      { name: 'CRC Handbook of Chemistry and Physics', reference: 'Standard Electrochemical Reduction Potentials', url: 'https://hbcponline.com' },
      { name: 'NIST Chemistry WebBook', reference: 'Thermochemistry of Zinc Dissolution in Acid', url: 'https://webbook.nist.gov' }
    ]
  },
  {
    reactants: ['cuso4', 'naoh'],
    molecularEquation: 'CuSO₄(aq) + 2NaOH(aq) ⟶ Cu(OH)₂(s)↓ + Na₂SO₄(aq)',
    completeIonicEquation: 'Cu²⁺(aq) + SO₄²⁻(aq) + 2Na⁺(aq) + 2OH⁻(aq) ⟶ Cu(OH)₂(s)↓ + 2Na⁺(aq) + SO₄²⁻(aq)',
    netIonicEquation: 'Cu²⁺(aq) + 2OH⁻(aq) ⟶ Cu(OH)₂(s)↓',
    equation: 'CuSO₄(aq) + 2NaOH(aq) ⟶ Cu(OH)₂(s)↓ + Na₂SO₄(aq)',
    precipitate: {
      color: '#0284c7',
      nameUz: 'Mis (II) gidroksid (Cu(OH)₂)',
      formula: 'Cu(OH)₂',
      kspAt25C: '2.2 × 10⁻²⁰ mol³·L⁻³'
    },
    standardEnthalpyChangeKjPerMol: -48.2,
    temperatureChange: 1.2,
    finalPh: 9.8,
    colorChange: 'rgba(2, 132, 199, 0.8)',
    explanationUz: 'Ion almashinish natijasida eruvchanligi o\'ta past bo\'lgan (25 °C da K_sp = 2.2 × 10⁻²⁰) moviy ilvirsimon Cu(OH)₂ cho\'kmasi hosil bo\'ladi. Mis(II) ionlari ishqor bilan kompleks hosil qilishdan avval asos sifatida cho\'kadi.',
    conditionDependenciesUz: 'Haroratga sezgirlik: Agar hosil bo\'lgan Cu(OH)₂ eritmasi 60–80 °C gacha qizdirilsa, u suvsizlanadi va qora rangli mis(II) oksidi CuO ga aylanadi: Cu(OH)₂(s) ⟶ CuO(s)↓ + H₂O. Yuqori konsentratsiyali ishqor ortiqchasida (NaOH > 4 M) esa cho\'kma qisman erib, to\'q ko\'k tetragidroksokuprat ionini [Cu(OH)₄]²⁻ hosil qilishi mumkin.',
    safetyWarningUz: 'Mis ionlari suv havzalari uchun kuchli zaharli hisoblanadi (GHS09). Ishqor bilan ishlashda ko\'z va terini himoya qiling.',
    safetyUz: 'Mis tuzlari atrof-muhitga xavfli. Qoidalarga rioya qiling.',
    disposalGuidanceUz: 'Mis cho\'kmasi filtrlanib og\'ir metall chiqindilari sifatida to\'planadi, to\'g\'ridan-to\'g\'ri kanalizatsiyaga quyish mumkin emas.',
    scientificSources: [
      { name: 'IUPAC Stability Constants Database', reference: 'Solubility product of Cu(OH)2 in aqueous solution', url: 'https://iupac.org' },
      { name: 'Vogel\'s Qualitative Inorganic Analysis', reference: 'Reactions of Copper(II) ions with strong bases', url: 'https://archive.org' }
    ]
  },
  {
    reactants: ['fecl3', 'naoh'],
    molecularEquation: 'FeCl₃(aq) + 3NaOH(aq) ⟶ Fe(OH)₃(s)↓ + 3NaCl(aq)',
    completeIonicEquation: 'Fe³⁺(aq) + 3Cl⁻(aq) + 3Na⁺(aq) + 3OH⁻(aq) ⟶ Fe(OH)₃(s)↓ + 3Na⁺(aq) + 3Cl⁻(aq)',
    netIonicEquation: 'Fe³⁺(aq) + 3OH⁻(aq) ⟶ Fe(OH)₃(s)↓',
    equation: 'FeCl₃(aq) + 3NaOH(aq) ⟶ Fe(OH)₃(s)↓ + 3NaCl(aq)',
    precipitate: {
      color: '#9a3412',
      nameUz: 'Temir (III) gidroksid (Fe(OH)₃ / FeO(OH)·nH₂O)',
      formula: 'Fe(OH)₃',
      kspAt25C: '2.79 × 10⁻³⁹ mol⁴·L⁻⁴'
    },
    standardEnthalpyChangeKjPerMol: -86.5,
    temperatureChange: 1.8,
    finalPh: 8.6,
    colorChange: 'rgba(154, 52, 18, 0.85)',
    explanationUz: 'Temir(III) kationlari gidroksid ionlari bilan o\'ta erimaydigan (K_sp ≈ 2.79 × 10⁻³⁹) qo\'ng\'ir-qizil amorf cho\'kma hosil qiladi. Aniqroq kimyoviy tavsifda bu modda gidratlangan temir(III) oksidi Fe₂O₃·nH₂O yoki oksigidroksid FeO(OH) shaklida bo\'ladi.',
    conditionDependenciesUz: 'Muhim ilmiy farq: Temir(II) gidroksidi Fe(OH)₂ iflos yashil-oq rangga ega bo\'lib (K_sp ≈ 4.87 × 10⁻¹⁷), havoda kislorod ta\'sirida tezda qo\'ng\'ir Fe(OH)₃ gacha oksidlanadi (4Fe(OH)₂ + O₂ + 2H₂O → 4Fe(OH)₃). Bu reaksiyada esa dastlab Fe³⁺ ishlatilgani sababli to\'g\'ridan-to\'g\'ri barqaror qizil-qo\'ng\'ir cho\'kma tushadi.',
    safetyWarningUz: 'Reagentlar kislotali va ishqoriy xususiyatga ega. Teriga va ko\'zga tushishidan saqlaning.',
    safetyUz: 'Reagentlarni ko\'zga tushishidan saqlang.',
    disposalGuidanceUz: 'Neytrallab, cho\'kma filtrlanib qattiq chiqindilar qatorida utilizatsiya qilinadi.',
    scientificSources: [
      { name: 'IUPAC Solubility Data Series', reference: 'Solubility of Iron Hydroxides and Hydrated Oxides', url: 'https://iupac.org' },
      { name: 'CRC Handbook of Chemistry and Physics', reference: 'Solubility Product Constants of Iron(III) Hydroxide', url: 'https://hbcponline.com' }
    ]
  },
  {
    reactants: ['bacl2', 'h2so4'],
    molecularEquation: 'BaCl₂(aq) + H₂SO₄(aq) ⟶ BaSO₄(s)↓ + 2HCl(aq)',
    completeIonicEquation: 'Ba²⁺(aq) + 2Cl⁻(aq) + 2H⁺(aq) + SO₄²⁻(aq) ⟶ BaSO₄(s)↓ + 2H⁺(aq) + 2Cl⁻(aq)',
    netIonicEquation: 'Ba²⁺(aq) + SO₄²⁻(aq) ⟶ BaSO₄(s)↓',
    equation: 'BaCl₂(aq) + H₂SO₄(aq) ⟶ BaSO₄(s)↓ + 2HCl(aq)',
    precipitate: {
      color: '#ffffff',
      nameUz: 'Bariy sulfat (BaSO₄)',
      formula: 'BaSO₄',
      kspAt25C: '1.08 × 10⁻¹⁰ mol²·L⁻²'
    },
    standardEnthalpyChangeKjPerMol: -26.1,
    temperatureChange: 0.6,
    finalPh: 1.0,
    colorChange: 'rgba(255, 255, 255, 0.95)',
    explanationUz: 'Sulfat ioni (SO₄²⁻) uchun o\'ta sezgir sifat reaksiyasi: Bariy sulfatning qalin oq kristall cho\'kmasi hosil bo\'ladi (25 °C da K_sp = 1.08 × 10⁻¹⁰). HSO₄⁻ kislotasi ancha kuchli bo\'lgani sababli, bu cho\'kma hatto suyultirilgan mineral kislotalarda ham erimaydi.',
    conditionDependenciesUz: 'BaSO₄ ning eruvchanligi past bo\'lgani uchun rentgenologiyada oshqozon-ichak kontrast moddasi sifatida qo\'llaniladi (chunki erimaydigan shaklda bariy organizmga singmaydi). Ammo eruvchan bariy tuzlari juda zaharli hisoblanadi.',
    safetyWarningUz: 'Bariy ionlari eruvchan holatda kuchli zaharli. Sulfat kislota esa kuydiruvchi moddadir. Himoya ko\'zoynagi va qo\'lqop taqing.',
    safetyUz: 'Eruvchan bariy tuzlari zaharli. Sulfat kislota kuchli kuydiruvchi.',
    disposalGuidanceUz: 'Hosila BaSO₄ shaklida qattiq cho\'kma sifatida yig\'iladi va maxsus og\'ir metall utilizatsiyasiga topshiriladi.',
    scientificSources: [
      { name: 'NIST Chemistry WebBook', reference: 'Precipitation of Barium Sulfate and Ksp', url: 'https://webbook.nist.gov' }
    ]
  },
  {
    reactants: ['agno3', 'nacl'],
    molecularEquation: 'AgNO₃(aq) + NaCl(aq) ⟶ AgCl(s)↓ + NaNO₃(aq)',
    completeIonicEquation: 'Ag⁺(aq) + NO₃⁻(aq) + Na⁺(aq) + Cl⁻(aq) ⟶ AgCl(s)↓ + Na⁺(aq) + NO₃⁻(aq)',
    netIonicEquation: 'Ag⁺(aq) + Cl⁻(aq) ⟶ AgCl(s)↓',
    equation: 'AgNO₃(aq) + NaCl(aq) ⟶ AgCl(s)↓ + NaNO₃(aq)',
    precipitate: {
      color: '#f8fafc',
      nameUz: 'Kumush xlorid (AgCl)',
      formula: 'AgCl',
      kspAt25C: '1.77 × 10⁻¹⁰ mol²·L⁻²'
    },
    standardEnthalpyChangeKjPerMol: -65.5,
    temperatureChange: 0.5,
    finalPh: 6.8,
    colorChange: 'rgba(255, 255, 255, 0.85)',
    explanationUz: 'Xlorid (Cl⁻) ionlarini sifat tahlilida aniqlash: Oq tvorogsimon AgCl cho\'kmasi hosil bo\'ladi (25 °C da K_sp = 1.77 × 10⁻¹⁰). Cho\'kma suvda erimaydi, biroq ammiak eritmasida [Ag(NH₃)₂]⁺ kompleks ioni hosil qilib oson eriydi.',
    conditionDependenciesUz: 'Fotokimyoviy sezgirlik: AgCl yorug\'lik (ayniqsa ultrabinafsha nurlar) ta\'sirida asta-sekin fotokimyoviy parchalanib (2AgCl ⟶ 2Ag + Cl₂), kumush metalli ajralishi hisobiga binafsha-kulrang tusga kiradi.',
    safetyWarningUz: 'Kumush nitrat teriga tushsa, kumush oqsil bilan birikib bir necha soatdan keyin o\'chmas qora dog\' hosil qiladi. Qo\'lqop kiying.',
    safetyUz: 'AgNO₃ terini qoraytiradi va kuydiradi.',
    disposalGuidanceUz: 'Kumush qimmatbaho metall bo\'lgani uchun cho\'kma yig\'ilib laboratoriyada qayta tiklash (regeneratsiya) jarayoniga yo\'naltiriladi.',
    scientificSources: [
      { name: 'CRC Handbook of Chemistry and Physics', reference: 'Solubility product of AgCl', url: 'https://hbcponline.com' }
    ]
  }
];

export const GUIDED_EXPERIMENTS = [
  {
    id: 'exp1',
    titleUz: 'Kislota va ishqor neytrallanishi (Titrlash)',
    scientificPrincipleUz: 'Kislota va ishqorning stexiometrik o\'zaro ta\'siri: H⁺(aq) + OH⁻(aq) → H₂O(l). ΔH° = -55.84 kJ/mol.',
    objectiveUz: 'Fenolftalein indikatori yordamida neytrallanish ekvivalentlik nuqtasini va ekzotermik issiqlik ajralishini kuzatish.',
    stepsUz: [
      '1. Kolbaga 20 ml 1.0 M NaOH eritmasini quying (boshlang\'ich pH ≈ 14.0).',
      '2. Fenolftalein indikatoridan 2 tomchi tomizing — eritma deprotonatsiya tufayli to\'q malinarangga kiradi (In²⁻ ion shakli).',
      '3. Sekin-asta 1.0 M HCl kislotasidan qo\'shing.',
      '4. Aniq 20 ml kislota yetganda eritmada [H⁺] = [OH⁻] muvozanati tiklanadi, pH 7.0 ga yetib rang to\'liq yo\'qoladi va harorat ko\'tariladi.'
    ],
    recommendedReagents: ['naoh', 'phenolphthalein', 'hcl'],
    chemicalEquations: {
      molecular: 'HCl(aq) + NaOH(aq) ⟶ NaCl(aq) + H₂O(l)',
      netIonic: 'H⁺(aq) + OH⁻(aq) ⟶ H₂O(l)'
    },
    conclusionUz: 'Ekvivalentlik nuqtasida kislota va asos to\'liq neytrallanadi (pH ≈ 7.00, 25 °C). Fenolftaleinning rangsizlanishi kislotali-neytral lakton shakliga o\'tganini bildiradi. Jarayon ekzotermik.',
    sources: [
      { name: 'NIST Chemistry WebBook', reference: 'Enthalpy of neutralization', url: 'https://webbook.nist.gov' }
    ]
  },
  {
    id: 'exp2',
    titleUz: 'Qo\'rg\'oshin yodid ("Oltin yomg\'ir") sintezi',
    scientificPrincipleUz: 'Ionlar konsentratsiyasi ko\'paytmasi eruvchanlik ko\'paytmasidan (Ksp = 9.8 × 10⁻⁹) oshganda cho\'kma tushishi va uning haroratga bog\'liq eruvchanligi.',
    objectiveUz: 'PbI₂ ning 20 °C va 100 °C dagi anomal eruvchanlik farqi hisobiga tillarang kristallar o\'sishini o\'rganish.',
    stepsUz: [
      '1. Probirkaga 10 ml 0.2 M Pb(NO₃)₂ eritmasidan soling.',
      '2. Unga 10 ml 0.5 M KI eritmasidan qo\'shing — bir zumda sariq rangli PbI₂ cho\'kmasi hosil bo\'ladi.',
      '3. Probirkani gorelka yordamida qaynash haroratigacha (≈100 °C) qizdiring — eruvchanlik 4.3 g/L gacha ortib cho\'kma to\'liq eriydi va eritma rangsizlanadi.',
      '4. Gorelkani o\'chirib sekin sovitganda eritmadan mayda geksagonal oltinsimon PbI₂ kristallari yog\'iladi.'
    ],
    recommendedReagents: ['pbno3', 'ki'],
    chemicalEquations: {
      molecular: 'Pb(NO₃)₂(aq) + 2KI(aq) ⟶ PbI₂(s)↓ + 2KNO₃(aq)',
      netIonic: 'Pb²⁺(aq) + 2I⁻(aq) ⟶ PbI₂(s)↓'
    },
    conclusionUz: 'PbI₂ ning eruvchanligi harorat ko\'tarilishi bilan 6 barobar ortadi. Sekin sovutilganda barqaror geksagonal kristall panjarasi shakllanadi va yorug\'likni yaltiratadi.',
    sources: [
      { name: 'CRC Handbook of Chemistry and Physics', reference: 'Solubility of PbI2', url: 'https://hbcponline.com' }
    ]
  },
  {
    id: 'exp3',
    titleUz: 'Metallarning kislotada erishi va vodorod ajralishi',
    scientificPrincipleUz: 'Standart elektrod potensiallari farqi: E°(Zn²⁺/Zn) = -0.762 V < E°(H⁺/H₂) = 0.000 V.',
    objectiveUz: 'Sinkning xlorid kislotada erishi, vodorod gaz pufakchalari ajralishi va reaksiya ekzotermiyasini o\'rganish.',
    stepsUz: [
      '1. Kolbaga bir necha donacha metall rux (Zn) soling.',
      '2. Ustiga 20 ml 1.0 M HCl kislotasini quying.',
      '3. Shiddatli gaz pufakchalari ko\'tarilishini va harorat ortishini kuzating: Zn(s) + 2H⁺(aq) → Zn²⁺(aq) + H₂(g)↑.',
      '4. Ajralayotgan vodorod gazi o\'ta yengil va alangalanuvchan bo\'lib, ochiq olovdan himoyalanishi kerak.'
    ],
    recommendedReagents: ['zn', 'hcl'],
    chemicalEquations: {
      molecular: 'Zn(s) + 2HCl(aq) ⟶ ZnCl₂(aq) + H₂(g)↑',
      netIonic: 'Zn(s) + 2H⁺(aq) ⟶ Zn²⁺(aq) + H₂(g)↑'
    },
    conclusionUz: 'Elektrokimyoviy faollik qatorida vodoroddan chapda turgan metallar kuchli kislotalardan H₂ gazini siqib chiqaradi. Jarayon spontan (E°_cell = +0.762 V).',
    sources: [
      { name: 'NIST WebBook', reference: 'Redox thermodynamics', url: 'https://webbook.nist.gov' }
    ]
  },
  {
    id: 'exp4',
    titleUz: 'Mis(II) va Temir(III) gidroksidlari cho\'kishi',
    scientificPrincipleUz: 'O\'tish metallari kationlarining eruvchanlik ko\'paytmalari: Ksp(Cu(OH)₂) = 2.2 × 10⁻²⁰; Ksp(Fe(OH)₃) = 2.79 × 10⁻³⁹.',
    objectiveUz: 'Cu²⁺ va Fe³⁺ ionlarining xarakterli rangli cho\'kmalarini hosil qilish va ularning Fe²⁺ dan farqini aniqlash.',
    stepsUz: [
      '1. Birinchi idishga CuSO₄ quyib NaOH qo\'shing — moviy rangli Cu(OH)₂ cho\'kmasi tushadi.',
      '2. Ikkinchi idishga FeCl₃ solib NaOH qo\'shing — qizil-qo\'ng\'ir Fe(OH)₃ (aniqrog\'i FeO(OH)·nH₂O) cho\'kmasi hosil bo\'ladi.',
      '3. Birinchi idishni qizdiring: 60 °C dan yuqorida Cu(OH)₂ suvsizlanib qora rangli CuO ga aylanadi.'
    ],
    recommendedReagents: ['cuso4', 'fecl3', 'naoh'],
    chemicalEquations: {
      molecular: 'CuSO₄ + 2NaOH ⟶ Cu(OH)₂↓ + Na₂SO₄; FeCl₃ + 3NaOH ⟶ Fe(OH)₃↓ + 3NaCl',
      netIonic: 'Cu²⁺ + 2OH⁻ ⟶ Cu(OH)₂↓; Fe³⁺ + 3OH⁻ ⟶ Fe(OH)₃↓'
    },
    conclusionUz: 'Cu²⁺ ionlari moviy, Fe³⁺ ionlari esa to\'q qizil-qo\'ng\'ir cho\'kma beradi. Bu sifat analizida Fe²⁺ (iflos yashil cho\'kma) dan farqlashda asosiy usuldir.',
    sources: [
      { name: 'Vogel\'s Qualitative Inorganic Analysis', reference: 'Hydroxide precipitation tests', url: 'https://archive.org' }
    ]
  }
];
