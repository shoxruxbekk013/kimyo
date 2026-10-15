import { KnowledgeTopic } from '../types/chemistry';

export const KNOWLEDGE_TOPICS: KnowledgeTopic[] = [
  {
    id: 'general-chemistry',
    titleUz: 'Umumiy kimyo asoslari',
    titleEn: 'General Chemistry',
    titleRu: 'Общая химия',
    category: 'Nazariya',
    level: 'Boshlang\'ich',
    icon: 'FlaskConical',
    summaryUz: 'Modda, atom, molekula, massa saqlanish qonuni va kimyoning fundamental tushunchalari.',
    sections: [
      {
        headingUz: 'Modda va uning agregat holatlari',
        contentUz: 'Modda — bu massa va hajmga ega bo\'lgan materiya shakli. Tabiatda moddalar qattiq, suyuq, gaz va plazma holatlarida uchraydi. Har bir holat zarralarning o\'zaro harakati va tortishish kuchlari bilan belgilanadi.',
        formula: 'E_k = \\frac{1}{2}mv^2'
      },
      {
        headingUz: 'Massa va tarkib doimiyligi qonunlari',
        contentUz: 'M.V. Lomonosov va A. Lavuazye tomonidan kashf etilgan massa saqlanish qonuniga ko\'ra, kimyoviy reaksiyaga kirishuvchi moddalar massasi reaksiya natijasida hosil bo\'ladigan moddalar massasiga teng bo\'ladi.',
        formula: '\\sum m_{\\text{reagentlar}} = \\sum m_{\\text{mahsulotlar}}',
        exampleUz: '2H₂ (4g) + O₂ (32g) ⟶ 2H₂O (36g)'
      }
    ],
    quizQuestions: [
      {
        questionUz: 'Massa saqlanish qonunini kimlar kashf etgan?',
        optionsUz: ['M. Lomonosov va A. Lavuazye', 'D. Mendeleyev va N. Bor', 'I. Nyuton va J. Dalton', 'E. Rezerford va M. Kyuri'],
        correctIndex: 0,
        explanationUz: 'Massa saqlanish qonunini mustaqil ravishda Mixail Lomonosov (1748) va Antuan Lavuazye (1789) kashf etgan.'
      }
    ]
  },
  {
    id: 'atomic-structure',
    titleUz: 'Atom tuzilishi va kvant kimyosi',
    titleEn: 'Atomic Structure & Quantum Chemistry',
    titleRu: 'Строение атома и квантовая химия',
    category: 'Kvant fizikasi',
    level: 'Universitet',
    icon: 'Atom',
    summaryUz: 'Atom yadrosi, kvant sonlar, s/p/d/f orbitallar va Shredinger to\'lqin tenglamasi.',
    sections: [
      {
        headingUz: 'Atom tuzilishi va elektron orbitallari',
        contentUz: 'Atom musbat zaryadlangan yadro (proton va neytronlar) hamda uning atrofida harakatlanuvchi elektron bulutidan iborat. Elektronlarning energetik holati to\'rtta kvant soni (n, l, m_l, m_s) bilan aniqlanadi.',
        formula: '\\psi(r, \\theta, \\phi) \\quad \\text{va} \\quad \\hat{H}\\psi = E\\psi'
      },
      {
        headingUz: 'Pauli prinsipi va Xund qoidasi',
        contentUz: 'Pauli prinsipiga ko\'ra, bitta atomda to\'rtta kvant soni ham bir xil bo\'lgan ikkita elektron bo\'lishi mumkin emas. Xund qoidasiga ko\'ra, elektronlar avval orbitallarga parallel spinlar bilan bittadan to\'ladi.',
        formula: '2n^2 \\quad (\\text{qavatdagi maksimal elektronlar soni})'
      }
    ],
    quizQuestions: [
      {
        questionUz: '3-energetik pog\'onada maksimal nechta elektron sig\'ishi mumkin?',
        optionsUz: ['8 ta', '18 ta', '32 ta', '10 ta'],
        correctIndex: 1,
        explanationUz: '2n² formulasiga ko\'ra: 2 * (3)² = 18 ta elektron.'
      }
    ]
  },
  {
    id: 'periodic-trends',
    titleUz: 'Davriy qonuniyatlar va xossalar',
    titleEn: 'Periodic Trends',
    titleRu: 'Периодический закон и свойства',
    category: 'Davriy jadval',
    level: 'Maktab',
    icon: 'Grid3x3',
    summaryUz: 'Atom radiusi, ionlanish energiyasi, elektromanfiylik va elektron yaqinligi davriy o\'zgarishi.',
    sections: [
      {
        headingUz: 'Davr va guruhlar bo\'ylab o\'zgarishlar',
        contentUz: 'Davr bo\'ylab chapdan o\'ngga borgan sari: yadro zaryadi ortadi, atom radiusi kichrayadi, ionlanish energiyasi va elektromanfiylik ortadi. Guruh bo\'ylab yuqoridan pastga: qavatlar soni ortadi, atom radiusi kattalashadi va metallik xossasi kuchayadi.'
      }
    ],
    quizQuestions: [
      {
        questionUz: 'Davriy jadvaldagi eng yuqori elektromanfiylikka ega element qaysi?',
        optionsUz: ['Kislorod (O)', 'Ftor (F)', 'Fransiy (Fr)', 'Xlor (Cl)'],
        correctIndex: 1,
        explanationUz: 'Ftor (F) Poling shkalasi bo\'yicha 3.98 elektromanfiylikka ega eng faol nometalldir.'
      }
    ]
  },
  {
    id: 'chemical-bonding',
    titleUz: 'Kimyoviy bog\'lanish turlari',
    titleEn: 'Chemical Bonding',
    titleRu: 'Химическая связь',
    category: 'Molekulyar',
    level: 'Maktab',
    icon: 'Layers',
    summaryUz: 'Kovalent (qutbli/qutbsiz), ion, metall va vodorod bog\'lanishlari hamda gibridlanish.',
    sections: [
      {
        headingUz: 'Bog\'lanish mexanizmlari',
        contentUz: 'Kovalent bog\'lanish — umumiy elektron juftlari hisobiga hosil bo\'ladi. Ion bog\'lanish — elektronlarni berish va qabul qilish natijasida hosil bo\'lgan qarama-qarshi ionlarning elektrostatik tortishuvi. Metall bog\'lanish — metall panjarasidagi erkin elektron gazi.',
        formula: '\\Delta \\chi > 1.7 \\implies \\text{Ion bog\'lanish}'
      }
    ],
    quizQuestions: [
      {
        questionUz: 'Osh tuzi (NaCl) da qanday turdagi bog\'lanish mavjud?',
        optionsUz: ['Qutbsiz kovalent', 'Ion bog\'lanish', 'Metall bog\'lanish', 'Vodorod bog\'lanish'],
        correctIndex: 1,
        explanationUz: 'Na (0.93) va Cl (3.16) orasidagi elektromanfiylik farqi katta bo\'lgani uchun ion bog\' hosil bo\'ladi.'
      }
    ]
  },
  {
    id: 'reactions-equations',
    titleUz: 'Kimyoviy reaksiyalar va tenglamalar',
    titleEn: 'Reactions & Equations',
    titleRu: 'Химические реакции',
    category: 'Reaksiyalar',
    level: 'Maktab',
    icon: 'Zap',
    summaryUz: 'Birikish, parchalanish, o\'rin olish, almashinish va oksidlanish-qaytarilish reaksiyalari.',
    sections: [
      {
        headingUz: 'Reaksiyalar klassifikatsiyasi',
        contentUz: 'Kimyoviy reaksiyalar moddalar soni va turining o\'zgarishiga ko\'ra 4 ta asosiy guruhga bo\'linadi: birikish (A + B ⟶ AB), parchalanish (AB ⟶ A + B), o\'rin olish (A + BC ⟶ AC + B), almashinish (AB + CD ⟶ AD + CB).'
      }
    ],
    quizQuestions: [
      {
        questionUz: '2H₂O ⟶ 2H₂ + O₂ reaksiyasi qaysi turga kiradi?',
        optionsUz: ['Birikish', 'Parchalanish', 'O\'rin olish', 'Neytrallanish'],
        correctIndex: 1,
        explanationUz: 'Bitta murakkab moddadan bir nechta oddiy moddalar hosil bo\'lgani uchun bu parchalanish reaksiyasidir.'
      }
    ]
  },
  {
    id: 'stoichiometry',
    titleUz: 'Stexiometriya va molyar hisoblar',
    titleEn: 'Stoichiometry & Calculations',
    titleRu: 'Стехиометрия',
    category: 'Hisob-kitob',
    level: 'Maktab',
    icon: 'Calculator',
    summaryUz: 'Mol tushunchasi, Avogadro soni (6.022×10²³), molyar hajm (22.4 L) va modda miqdori.',
    sections: [
      {
        headingUz: 'Asosiy stexiometrik formulalar',
        contentUz: 'Modda miqdori (n) — moddadagi zarralar sonini ifodalovchi kattalik. 1 mol har qanday moddada 6.022×10²³ ta zarra bo\'ladi.',
        formula: 'n = \\frac{m}{M} = \\frac{V}{V_m} = \\frac{N}{N_A}',
        exampleUz: 'M(H₂O) = 18 g/mol; 36 g suv = 2 mol.'
      }
    ],
    quizQuestions: [
      {
        questionUz: 'Normal sharoitda 1 mol har qanday ideal gaz necha litr hajm egallaydi?',
        optionsUz: ['11.2 L', '22.4 L', '44.8 L', '1.0 L'],
        correctIndex: 1,
        explanationUz: 'Normal sharoitda (0°C, 1 atm) 1 mol gaz 22.4 litr molyar hajmga ega.'
      }
    ]
  },
  {
    id: 'acids-bases-ph',
    titleUz: 'Kislotalar, asoslar va pH',
    titleEn: 'Acids, Bases & pH',
    titleRu: 'Кислоты, основания и pH',
    category: 'Eritmalar',
    level: 'Maktab',
    icon: 'TestTube2',
    summaryUz: 'Arenius, Brensted-Louri nazariyalari, pH va pOH shkalasi, titrlash va indikatorlar.',
    sections: [
      {
        headingUz: 'Vodorod ko\'rsatkichi (pH)',
        contentUz: 'pH — eritmada vodorod ionlari [H⁺] faolligining o\'nlik manfiy logarifmidir. pH < 7 kislotali, pH = 7 neytral, pH > 7 ishqoriy muhitni anglatadi.',
        formula: '\\text{pH} = -\\log_{10}[H^+], \\quad \\text{pH} + \\text{pOH} = 14'
      }
    ],
    quizQuestions: [
      {
        questionUz: 'Agar eritmadagi [H⁺] = 10⁻³ mol/L bo\'lsa, uning pH qiymati nechaga teng?',
        optionsUz: ['3', '7', '11', '14'],
        correctIndex: 0,
        explanationUz: 'pH = -log(10⁻³) = 3 (kuchli kislotali muhit).'
      }
    ]
  },
  {
    id: 'thermochemistry',
    titleUz: 'Termokimyo va termodinamika',
    titleEn: 'Thermochemistry',
    titleRu: 'Термохимия',
    category: 'Fizik kimyo',
    level: 'Universitet',
    icon: 'Flame',
    summaryUz: 'Entalpiya (ΔH), entropiya (ΔS), Gibbs erkin energiyasi (ΔG) va Gess qonuni.',
    sections: [
      {
        headingUz: 'Gibbs energiyasi va reaksiyaning o\'z-o\'zidan borishi',
        contentUz: 'Jarayonning o\'z-o\'zidan borishi Gibbs erkin energiyasi o\'zgarishi bilan belgilanadi: agar ΔG < 0 bo\'lsa, reaksiya spontan kechadi.',
        formula: '\\Delta G = \\Delta H - T\\Delta S'
      }
    ],
    quizQuestions: [
      {
        questionUz: 'Eksotermik reaksiyalarda entalpiya o\'zgarishi (ΔH) qanday ishoraga ega?',
        optionsUz: ['Musbat (ΔH > 0)', 'Manfiy (ΔH < 0)', 'Har doim nol', 'Cheksiz'],
        correctIndex: 1,
        explanationUz: 'Eksotermik reaksiyalarda issiqlik tashqi muhitga ajraladi, shuning uchun tizim entalpiyasi kamayadi (ΔH < 0).'
      }
    ]
  },
  {
    id: 'chemical-kinetics',
    titleUz: 'Kimyoviy kinetika va kataliz',
    titleEn: 'Chemical Kinetics',
    titleRu: 'Химическая кинетика',
    category: 'Fizik kimyo',
    level: 'Universitet',
    icon: 'Activity',
    summaryUz: 'Reaksiya tezligi, faollanish energiyasi, Arrenius tenglamasi va katalizatorlar.',
    sections: [
      {
        headingUz: 'Reaksiya tezligiga ta\'sir etuvchi omillar',
        contentUz: 'Reaksiya tezligi reagentlar konsentratsiyasi, harorat, tegishish sathi va katalizatorlarga bog\'liq. Harorat 10°C ga oshganda reaksiya tezligi 2-4 barobar ortadi (Vant-Goff qoidasi).',
        formula: 'k = A \\cdot e^{-\\frac{E_a}{RT}} \\quad (\\text{Arrenius tenglamasi})'
      }
    ],
    quizQuestions: [
      {
        questionUz: 'Katalizator reaksiya tezligini qanday oshiradi?',
        optionsUz: ['Haroratni oshirish orqali', 'Faollanish energiyasini (Ea) kamaytirish orqali', 'Konsentratsiyani ko\'paytirish orqali', 'Molekula massasini o\'zgartirib'],
        correctIndex: 1,
        explanationUz: 'Katalizator reaksiyani boshqa pastroq faollanish energiyasiga ega yo\'l orqali olib boradi.'
      }
    ]
  },
  {
    id: 'chemical-equilibrium',
    titleUz: 'Kimyoviy muvozanat',
    titleEn: 'Chemical Equilibrium',
    titleRu: 'Химическое равновесие',
    category: 'Fizik kimyo',
    level: 'Maktab',
    icon: 'Scale',
    summaryUz: 'Qaytuvchan reaksiyalar, muvozanat doimiysi (K_c) va Le Shatelye prinsipi.',
    sections: [
      {
        headingUz: 'Le Shatelye prinsipi',
        contentUz: 'Muvozanatda turgan tizimga tashqaridan ta\'sir (bosim, harorat, konsentratsiya) o\'tkazilsa, tizim ushbu ta\'sirni kamaytiradigan tomonga siljiydi.'
      }
    ],
    quizQuestions: [
      {
        questionUz: 'N₂ + 3H₂ ⇌ 2NH₃ + Q reaksiyasida harorat oshirilsa muvozanat qaysi tomonga siljiydi?',
        optionsUz: ['Mahsulotlar (o\'ngga)', 'Dastlabki moddalar (chapga)', 'O\'zgarmaydi', 'To\'xtaydi'],
        correctIndex: 1,
        explanationUz: 'Reaksiya eksotermik (+Q) bo\'lgani uchun harorat oshirilganda tizim issiqlikni yutish (chapga, teskari reaksiya) tomoniga siljiydi.'
      }
    ]
  },
  {
    id: 'electrochemistry',
    titleUz: 'Elektrokimyo va elektroliz',
    titleEn: 'Electrochemistry',
    titleRu: 'Электрохимия',
    category: 'Fizik kimyo',
    level: 'Universitet',
    icon: 'BatteryCharging',
    summaryUz: 'Galvanik elementlar, Nernst tenglamasi, elektroliz, Faradey qonunlari va korroziya.',
    sections: [
      {
        headingUz: 'Galvanik element va elektrod potensiali',
        contentUz: 'Kimyoviy energiyani elektr energiyasiga aylantiruvchi qurilma galvanik element deyiladi. Nernst tenglamasi elektrod potensialining ionlar konsentratsiyasiga bog\'liqligini ko\'rsatadi.',
        formula: 'E = E^\\circ - \\frac{RT}{nF} \\ln Q'
      }
    ],
    quizQuestions: [
      {
        questionUz: 'Elektroliz vaqtida anodda qanday jarayon yuz beradi?',
        optionsUz: ['Qaytarilish', 'Oksidlanish', 'Neytrallanish', 'Gidroliz'],
        correctIndex: 1,
        explanationUz: 'Anodda har doim oksidlanish (elektron berish), katodda esa qaytarilish (elektron olish) sodir bo\'ladi.'
      }
    ]
  },
  {
    id: 'organic-chemistry',
    titleUz: 'Organik kimyo va uglevodorodlar',
    titleEn: 'Organic Chemistry',
    titleRu: 'Органическая химия',
    category: 'Organik',
    level: 'Maktab',
    icon: 'Hexagon',
    summaryUz: 'Alkanlar, alkenlar, alkinlar, spirtlar, aldegidlar, efirlar va IUPAC nomenklaturasi.',
    sections: [
      {
        headingUz: 'Uglerod zanjirlari va funksional guruhlar',
        contentUz: 'Organik kimyo — uglerod birikmalarini o\'rganuvchi soha. Uglerod atomlari o\'zaro bittalik, ikkitalik va uchtalik bog\'lar hosil qilib, cheksiz xilma-xil zanjirlar va halqalar hosil qila oladi.'
      }
    ],
    quizQuestions: [
      {
        questionUz: 'Alkanlarning umumiy formulasi qaysi?',
        optionsUz: ['CnH2n', 'CnH2n+2', 'CnH2n-2', 'CnH2n-6'],
        correctIndex: 1,
        explanationUz: 'To\'yingan uglevodorodlar (alkanlar) formulasi CnH2n+2 hisoblanadi (masalan, CH₄, C₂H₆).'
      }
    ]
  },
  {
    id: 'inorganic-chemistry',
    titleUz: 'Anorganik kimyo va koordinatsion birikmalar',
    titleEn: 'Inorganic Chemistry',
    titleRu: 'Неорганическая химия',
    category: 'Anorganik',
    level: 'Universitet',
    icon: 'Boxes',
    summaryUz: 'O\'tish metallari, kompleks birikmalar, kristall maydon nazariyasi va minerallar.',
    sections: [
      {
        headingUz: 'Kompleks (koordinatsion) birikmalar',
        contentUz: 'Kompleks birikmalar markaziy kompleks hosil qiluvchi ion (markaziy atom) va uning atrofidagi ligandlardan iborat (masalan, [Cu(NH₃)₄]SO₄).'
      }
    ],
    quizQuestions: [
      {
        questionUz: '[Cu(NH₃)₄]SO₄ birikmasida koordinatsion son nechaga teng?',
        optionsUz: ['2', '4', '6', '1'],
        correctIndex: 1,
        explanationUz: 'Markaziy Cu²⁺ ioni atrofiga 4 ta NH₃ ligandlari birikkan, demak koordinatsion son 4 ga teng.'
      }
    ]
  },
  {
    id: 'analytical-chemistry',
    titleUz: 'Analitik kimyo va sifat tahlili',
    titleEn: 'Analytical Chemistry',
    titleRu: 'Аналитическая химия',
    category: 'Laboratoriya',
    level: 'Universitet',
    icon: 'Compass',
    summaryUz: 'Titrimetriya, gravimetriya, xromatografiya, mass-spektrometriya va spektrofotometriya.',
    sections: [
      {
        headingUz: 'Sifat va miqdoriy tahlil',
        contentUz: 'Analitik kimyo moddalarning kimyoviy tarkibini aniqlash usullarini ishlab chiqadi. Spektrofotometriya moddaning yorug\'lik yutishiga asoslanadi (Buber-Lambert-Ber qonuni).'
      }
    ],
    quizQuestions: [
      {
        questionUz: 'Bariy ioni (Ba²⁺) ni sifat analizida aniqlash uchun qaysi iondan foydalaniladi?',
        optionsUz: ['Cl⁻', 'SO₄²⁻', 'NO₃⁻', 'Na⁺'],
        correctIndex: 1,
        explanationUz: 'Ba²⁺ va SO₄²⁻ qo\'shilganda oq bariy sulfat (BaSO₄) cho\'kmasi hosil bo\'ladi.'
      }
    ]
  },
  {
    id: 'biochemistry',
    titleUz: 'Biokimyo va hayot molekulalari',
    titleEn: 'Biochemistry',
    titleRu: 'Биохимия',
    category: 'Biologik',
    level: 'Universitet',
    icon: 'Dna',
    summaryUz: 'Oqsillar, fermentlar, DNK/RNK, lipidlar, uglevodlar va hujayra metabolizmi.',
    sections: [
      {
        headingUz: 'Nuklein kislotalar va genetika',
        contentUz: 'DNK molekulasi ikki spiralli tuzilishga ega bo\'lib, nukleotidlardan (A, T, G, S) iborat. Genetik ma\'lumotlar vodorod bog\'lari orqali juftlashgan komplementar asoslar yordamida saqlanadi.'
      }
    ],
    quizQuestions: [
      {
        questionUz: 'DNK molekulasida Adenin (A) har doim qaysi azot asosi bilan vodorod bog\'i hosil qiladi?',
        optionsUz: ['Guanin (G)', 'Sitozin (S)', 'Timin (T)', 'Urasil (U)'],
        correctIndex: 2,
        explanationUz: 'Komplementarlik qoidasiga ko\'ra DNKda Adenin faqat Timin (A=T) bilan ikkita vodorod bog\'i orqali bog\'lanadi.'
      }
    ]
  },
  {
    id: 'environmental-chemistry',
    titleUz: 'Ekologik kimyo va yashil texnologiyalar',
    titleEn: 'Environmental Chemistry',
    titleRu: 'Экологическая химия',
    category: 'Amaliy',
    level: 'Maktab',
    icon: 'Trees',
    summaryUz: 'Atmosfera ifloslanishi, issiqxona effekti, kislotali yomg\'irlar va Yashil kimyoning 12 prinsipi.',
    sections: [
      {
        headingUz: 'Issiqxona effekti va ozon qatlami',
        contentUz: 'CO₂, CH₄, N₂O kabi gazlar Yer chiqaradigan infraqizil issiqlik nurlarini tutib qolib, iqlim isishini keltirib chiqaradi. Freonlar esa stratosferadagi ozon (O₃) qatlamini yemiruvchi radikallarni hosil qiladi.'
      }
    ],
    quizQuestions: [
      {
        questionUz: 'Kislotali yomg\'irlarning asosiy sababchisi bo\'lgan atmosferadagi gazlar qaysilar?',
        optionsUz: ['SO₂ va NO₂', 'Ar va He', 'O₂ va N₂', 'CH₄ va Ne'],
        correctIndex: 0,
        explanationUz: 'Oltingugurt dioksidi (SO₂) va azot oksidlari (NOx) suv bug\'lari bilan sulfat va nitrat kislotalar hosil qiladi.'
      }
    ]
  },
  {
    id: 'materials-science',
    titleUz: 'Materialshunoslik va nanotexnologiya',
    titleEn: 'Materials Science & Nanotech',
    titleRu: 'Материаловедение',
    category: 'Zamonaviy',
    level: 'Ilg\'or',
    icon: 'Sparkles',
    summaryUz: 'Grafen, uglerod nanotrubkalari, o\'ta o\'tkazgichlar, aerogellar va MOF tuzilmalari.',
    sections: [
      {
        headingUz: 'Grafen va ikki o\'lchamli materiallar',
        contentUz: 'Grafen — qalinligi bitta atomga teng bo\'lgan uglerodning 2D panjarasi. U po\'latdan 200 marta mustahkam, olmos kabi issiqlik o\'tkazuvchi va misdan ko\'ra elektrni yaxshiroq o\'tkazadi.'
      }
    ],
    quizQuestions: [
      {
        questionUz: 'Grafen qaysi element atomlarining yagona qatlamidan iborat?',
        optionsUz: ['Kremniy', 'Uglerod', 'Bor', 'Titan'],
        correctIndex: 1,
        explanationUz: 'Grafen — uglerod atomlarining geksagonal (asalarichilik inisi kabi) tekis bitta qatlamidir.'
      }
    ]
  },
  {
    id: 'industrial-chemistry',
    titleUz: 'Sanoat kimyosi va texnologiyalar',
    titleEn: 'Industrial Chemistry',
    titleRu: 'Промышленная химия',
    category: 'Sanoat',
    level: 'Universitet',
    icon: 'Factory',
    summaryUz: 'Gaber-Bosh jarayoni, kontakt usuli, neftni qayta ishlash va polimerlar ishlab chiqarish.',
    sections: [
      {
        headingUz: 'Gaber-Bosh jarayoni',
        contentUz: 'Dunyo qishloq xo\'jaligi o\'g\'itlarining asosi bo\'lgan ammiak sintezi: N₂ + 3H₂ ⇌ 2NH₃ (temir katalizatori, 450°C harorat va 200 atm bosim ostida amalga oshiriladi).'
      }
    ],
    quizQuestions: [
      {
        questionUz: 'Gaber-Bosh jarayonida qaysi modda sintez qilinadi?',
        optionsUz: ['Sulfat kislota', 'Ammiak (NH₃)', 'Metanol', 'Aspirin'],
        correctIndex: 1,
        explanationUz: 'Gaber-Bosh jarayoni havodagi azot va vodoroddan ammiak olishning sanoat usulidir.'
      }
    ]
  },
  {
    id: 'nuclear-chemistry',
    titleUz: 'Yadro kimyosi va radiatsiya',
    titleEn: 'Nuclear Chemistry',
    titleRu: 'Ядерная химия',
    category: 'Kvant fizikasi',
    level: 'Ilg\'or',
    icon: 'Radiation',
    summaryUz: 'Yadro bo\'linishi, termoyadro sintezi, radioaktiv yemirilish turlari va yadro tibbiyoti.',
    sections: [
      {
        headingUz: 'Radioaktiv yemirilish turlari',
        contentUz: 'Alfa (α) — geliy yadrosi (⁴He²⁺), Beta (β) — yuqori energiyali elektronlar yoki pozitronlar, Gamma (γ) — yuqori chastotali elektromagnit to\'lqinlar.',
        formula: 'E = mc^2'
      }
    ],
    quizQuestions: [
      {
        questionUz: 'Alfa-nurlanish nimalardan tashkil topgan?',
        optionsUz: ['Elektronlar oqimidan', 'Geliy atomlari yadrolaridan (⁴He²⁺)', 'Neytronlardan', 'Fotonlardan'],
        correctIndex: 1,
        explanationUz: 'Alfa-zarra 2 ta proton va 2 ta neytrondan iborat geliy atomining musbat zaryadlangan yadrosidir.'
      }
    ]
  },
  {
    id: 'computational-chemistry',
    titleUz: 'Hisoblash kimyosi va molekulyar modellashtirish',
    titleEn: 'Computational Chemistry',
    titleRu: 'Вычислительная химия',
    category: 'Zamonaviy',
    level: 'Ilg\'or',
    icon: 'Cpu',
    summaryUz: 'Zichlik funksionali nazariyasi (DFT), molekulyar dinamika va AI yordamida dori dizayni.',
    sections: [
      {
        headingUz: 'In-silico kimyoviy tadqiqotlar',
        contentUz: 'Hisoblash kimyosi kvant mexanikasi va kompyuter simulyatsiyalari yordamida yangi dori vositalari, katalizatorlar va supermateriallarni laboratoriyada sintez qilishdan avval modellashtirish imkonini beradi.'
      }
    ],
    quizQuestions: [
      {
        questionUz: 'Kvant kimyoviy hisob-kitoblarda eng keng qo\'llaniladigan zamonaviy nazariya qaysi?',
        optionsUz: ['DFT (Zichlik funksionali nazariyasi)', 'Klassik Nyuton mexanikasi', 'Boshlang\'ich optika', 'Termoselulyar tahlil'],
        correctIndex: 0,
        explanationUz: 'DFT (Density Functional Theory) ko\'p elektronli tizimlarning elektron tuzilishini hisoblashda jahon standarti hisoblanadi.'
      }
    ]
  }
];
