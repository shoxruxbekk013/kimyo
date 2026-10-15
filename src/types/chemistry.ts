export type ElementCategory =
  | 'alkali-metal'
  | 'alkaline-earth'
  | 'transition-metal'
  | 'post-transition-metal'
  | 'metalloid'
  | 'reactive-nonmetal'
  | 'noble-gas'
  | 'lanthanide'
  | 'actinide'
  | 'unknown';

export type StateOfMatter = 'solid' | 'liquid' | 'gas' | 'synthetic';

export interface ChemicalElement {
  number: number;
  symbol: string;
  nameUz: string;
  nameEn: string;
  nameRu: string;
  atomicMass: number;
  category: ElementCategory;
  period: number;
  group: number;
  block: 's' | 'p' | 'd' | 'f';
  electronConfiguration: string;
  shells: number[];
  state: StateOfMatter;
  electronegativity?: number; // Pauling scale
  atomicRadius?: number; // in pm (empirical / calculated)
  ionizationEnergy?: number; // 1st ionization energy in kJ/mol
  meltingPoint?: number; // in K at 101.325 kPa
  boilingPoint?: number; // in K at 101.325 kPa
  density?: number; // in g/cm3 at STP
  oxidationStates?: string[];
  discoveredBy?: string;
  yearDiscovered?: string | number;
  summaryUz: string;
  summaryEn: string;
  summaryRu: string;
  commonUsesUz: string[];
  spectralColorHex: string;
  citationSource?: string;
  citationUrl?: string;
}

export interface AtomCoord {
  id: number;
  element: string; // 'C', 'H', 'O', 'N', etc.
  x: number;
  y: number;
  z: number;
  color: string;
  radius: number;
}

export interface MoleculeBond {
  from: number;
  to: number;
  order: 1 | 2 | 3;
}

export interface MoleculeData {
  id: string;
  nameUz: string;
  nameEn: string;
  nameRu: string;
  iupacName?: string;
  formula: string;
  molarMass: number; // in g/mol
  geometry: string;
  bondAngles: string;
  polarity: 'Qutbli (Polar)' | 'Qutbsiz (Nonpolar)';
  dipoleMomentDebye?: number;
  type: 'Kovalent' | 'Ion' | 'Organik' | 'Biomolekula';
  descriptionUz: string;
  descriptionEn: string;
  descriptionRu: string;
  applicationsUz: string[];
  atoms: AtomCoord[];
  bonds: MoleculeBond[];
  citationSource?: string;
  citationUrl?: string;
}

export interface LabReagent {
  id: string;
  nameUz: string;
  nameEn: string;
  formula: string;
  state: 'liquid' | 'solid' | 'indicator';
  color: string; // CSS color string
  pH?: number;
  concentration?: string;
  concentrationMolar?: number; // exact M (mol/L)
  molarMass?: number; // g/mol
  category: 'acid' | 'base' | 'salt' | 'metal' | 'indicator' | 'solvent';
  descriptionUz: string;
  ghsSymbols?: string[]; // e.g. ['GHS05', 'GHS07', 'GHS08', 'GHS09']
  hazardsUz?: string;
}

export interface ScientificSourceRef {
  name: string;
  reference: string;
  url?: string;
}

export interface LabReactionResult {
  reactants: string[];
  molecularEquation: string;
  completeIonicEquation: string;
  netIonicEquation: string;
  equation: string; // compatibility fallback
  colorChange?: string;
  precipitate?: {
    color: string;
    nameUz: string;
    formula: string;
    kspAt25C?: string;
  };
  gasEvolution?: {
    gasFormula: string;
    nameUz: string;
    flammabilityWarningUz?: string;
  };
  standardEnthalpyChangeKjPerMol: number; // ΔH° in kJ/mol
  temperatureChange: number; // Reference illustration change in standard calorimeter
  finalPh: number; // Reference stoich pH for 1:1 ratio
  explanationUz: string;
  conditionDependenciesUz: string;
  safetyWarningUz: string;
  safetyUz: string; // compatibility fallback
  disposalGuidanceUz: string;
  scientificSources: ScientificSourceRef[];
}

export interface KnowledgeTopic {
  id: string;
  titleUz: string;
  titleEn: string;
  titleRu: string;
  category: string;
  level: 'Boshlang\'ich' | 'Maktab' | 'Universitet' | 'Ilg\'or';
  summaryUz: string;
  icon: string;
  sections: {
    headingUz: string;
    contentUz: string;
    formula?: string;
    exampleUz?: string;
    scientificNoteUz?: string;
  }[];
  quizQuestions: {
    questionUz: string;
    optionsUz: string[];
    correctIndex: number;
    explanationUz: string;
  }[];
  sources?: ScientificSourceRef[];
}

export interface QuizQuestion {
  id: string;
  questionUz: string;
  optionsUz: string[];
  correctIndex: number;
  explanationUz: string;
  category: string;
  points: number;
}

export interface Flashcard {
  id: string;
  frontUz: string;
  backUz: string;
  category: string;
  hintUz?: string;
}
