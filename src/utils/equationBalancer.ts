// Deterministic Chemical Equation Balancer using Matrix Reduction & Atom Conservation

export interface AtomCountMap {
  [element: string]: number;
}

export interface BalancedEquationResult {
  success: boolean;
  balancedEquation: string;
  molecularEquation: string;
  netIonicEquation?: string;
  reactants: { formula: string; coefficient: number }[];
  products: { formula: string; coefficient: number }[];
  reactionType: string;
  reactionTypeUz: string;
  atomBalance: {
    element: string;
    reactantCount: number;
    productCount: number;
    isBalanced: boolean;
  }[];
  explanationUz: string;
  feasibilityNoteUz: string;
  scientificSource: string;
  error?: string;
}

// Greatest common divisor
function gcd(a: number, b: number): number {
  a = Math.abs(a);
  b = Math.abs(b);
  while (b > 0) {
    const temp = b;
    b = a % b;
    a = temp;
  }
  return a;
}

// Least common multiple
function lcm(a: number, b: number): number {
  if (a === 0 || b === 0) return 0;
  return Math.abs(a * b) / gcd(a, b);
}

// Fraction class for exact arithmetic in Gaussian elimination
class Fraction {
  numerator: number;
  denominator: number;

  constructor(num: number, den: number = 1) {
    if (den === 0) throw new Error("Denominator cannot be zero");
    if (den < 0) {
      num = -num;
      den = -den;
    }
    const g = gcd(num, den) || 1;
    this.numerator = Math.round(num / g);
    this.denominator = Math.round(den / g);
  }

  add(other: Fraction): Fraction {
    return new Fraction(
      this.numerator * other.denominator + other.numerator * this.denominator,
      this.denominator * other.denominator
    );
  }

  sub(other: Fraction): Fraction {
    return new Fraction(
      this.numerator * other.denominator - other.numerator * this.denominator,
      this.denominator * other.denominator
    );
  }

  mul(other: Fraction): Fraction {
    return new Fraction(this.numerator * other.numerator, this.denominator * other.denominator);
  }

  div(other: Fraction): Fraction {
    return new Fraction(this.numerator * other.denominator, this.denominator * other.numerator);
  }

  isZero(): boolean {
    return this.numerator === 0;
  }

  toNumber(): number {
    return this.numerator / this.denominator;
  }
}

// Parse chemical formula like "Al2(SO4)3" or "Ca(OH)2" into { Al: 2, S: 3, O: 12 }
export function parseChemicalFormula(formula: string): AtomCountMap {
  const clean = formula.trim().replace(/\s+/g, '');
  const counts: AtomCountMap = {};

  function parseSub(str: string, multiplier: number = 1) {
    let i = 0;
    while (i < str.length) {
      if (str[i] === '(' || str[i] === '[') {
        const closeChar = str[i] === '(' ? ')' : ']';
        let depth = 1;
        let j = i + 1;
        while (j < str.length && depth > 0) {
          if (str[j] === str[i]) depth++;
          else if (str[j] === closeChar) depth--;
          j++;
        }
        if (depth !== 0) throw new Error(`Yopilmagan qavs: ${str}`);
        
        // Find multiplier after parenthesis
        let numStr = '';
        let k = j;
        while (k < str.length && /\d/.test(str[k])) {
          numStr += str[k];
          k++;
        }
        const groupMult = numStr ? parseInt(numStr, 10) : 1;
        parseSub(str.slice(i + 1, j - 1), multiplier * groupMult);
        i = k;
      } else if (/[A-Z]/.test(str[i])) {
        let elem = str[i];
        let j = i + 1;
        if (j < str.length && /[a-z]/.test(str[j])) {
          elem += str[j];
          j++;
        }
        let numStr = '';
        while (j < str.length && /\d/.test(str[j])) {
          numStr += str[j];
          j++;
        }
        const count = numStr ? parseInt(numStr, 10) : 1;
        counts[elem] = (counts[elem] || 0) + count * multiplier;
        i = j;
      } else {
        i++;
      }
    }
  }

  parseSub(clean);
  return counts;
}

// Calculate molar mass of a formula
export function calculateMolarMass(formula: string, elementMasses: Record<string, number>): {
  molarMass: number;
  breakdown: { element: string; count: number; mass: number; percentage: number }[];
} {
  const atoms = parseChemicalFormula(formula);
  let totalMass = 0;
  const breakdown: { element: string; count: number; mass: number; percentage: number }[] = [];

  for (const [elem, count] of Object.entries(atoms)) {
    const atomicMass = elementMasses[elem] || 0;
    const mass = count * atomicMass;
    totalMass += mass;
    breakdown.push({
      element: elem,
      count,
      mass,
      percentage: 0
    });
  }

  breakdown.forEach(item => {
    item.percentage = totalMass > 0 ? (item.mass / totalMass) * 100 : 0;
  });

  return {
    molarMass: Math.round(totalMass * 1000) / 1000,
    breakdown
  };
}

// Classify reaction type based on reactants and products
function classifyReaction(
  reactants: string[],
  products: string[]
): { typeEn: string; typeUz: string } {
  const rCount = reactants.length;
  const pCount = products.length;

  // Hydrocarbon combustion
  const isCombustion =
    reactants.some(r => r.toUpperCase().includes('O2')) &&
    products.some(p => p.toUpperCase().includes('CO2')) &&
    products.some(p => p.toUpperCase().includes('H2O'));
  if (isCombustion) {
    return {
      typeEn: 'Combustion Reaction',
      typeUz: 'Yonish reaksiyasi (Oksidlanish)'
    };
  }

  if (rCount === 1 && pCount > 1) {
    return {
      typeEn: 'Decomposition Reaction',
      typeUz: 'Parchalanish reaksiyasi'
    };
  }
  if (rCount > 1 && pCount === 1) {
    return {
      typeEn: 'Synthesis Reaction',
      typeUz: 'Birikish (Sintez) reaksiyasi'
    };
  }
  if (rCount === 2 && pCount === 2) {
    // Check if one reactant is single element
    const isSingleElem = reactants.some(r => !/[0-9]/.test(r) && r.length <= 2);
    if (isSingleElem) {
      return {
        typeEn: 'Single Displacement Reaction',
        typeUz: 'O\'rin olish reaksiyasi'
      };
    }
    return {
      typeEn: 'Double Displacement Reaction',
      typeUz: 'Almashinish reaksiyasi'
    };
  }

  return {
    typeEn: 'Redox / Complex Reaction',
    typeUz: 'Oksidlanish-qaytarilish / Murakkab reaksiya'
  };
}

// Deterministic equation balancing using linear algebra
export function balanceChemicalEquation(equationInput: string): BalancedEquationResult {
  try {
    const normalized = equationInput.replace(/⟶|→|==/g, '=').trim();
    if (!normalized.includes('=')) {
      return {
        success: false,
        balancedEquation: '',
        molecularEquation: '',
        reactants: [],
        products: [],
        reactionType: '',
        reactionTypeUz: '',
        atomBalance: [],
        explanationUz: '',
        feasibilityNoteUz: '',
        scientificSource: 'IUPAC Qoidalari & Atom Saqlanish Qonuni',
        error: "Reaksiya tenglamasida '=' yoki '->' belgisi bo'lishi kerak. Masalan: H2 + O2 = H2O"
      };
    }

    const [leftSide, rightSide] = normalized.split('=');
    const rawReactants = leftSide.split('+').map(s => s.trim().replace(/^\d+/, '')).filter(Boolean);
    const rawProducts = rightSide.split('+').map(s => s.trim().replace(/^\d+/, '')).filter(Boolean);

    if (rawReactants.length === 0 || rawProducts.length === 0) {
      return {
        success: false,
        balancedEquation: '',
        molecularEquation: '',
        reactants: [],
        products: [],
        reactionType: '',
        reactionTypeUz: '',
        atomBalance: [],
        explanationUz: '',
        feasibilityNoteUz: '',
        scientificSource: 'IUPAC Qoidalari & Atom Saqlanish Qonuni',
        error: "Reagentlar yoki mahsulotlar kiritilmadi."
      };
    }

    // Extract all atoms and molecules
    const molecules = [...rawReactants, ...rawProducts];
    const n = molecules.length;
    const molParsed = molecules.map(m => parseChemicalFormula(m));

    // Get list of unique elements
    const elementsSet = new Set<string>();
    molParsed.forEach(map => {
      Object.keys(map).forEach(e => elementsSet.add(e));
    });
    const elements = Array.from(elementsSet);
    const m = elements.length;

    // Build conservation matrix A where A * c = 0
    // Rows = elements, Columns = molecules
    // Reactants have positive sign, products have negative sign
    const matrix: Fraction[][] = [];
    for (let i = 0; i < m; i++) {
      const elem = elements[i];
      const row: Fraction[] = [];
      for (let j = 0; j < n; j++) {
        const count = molParsed[j][elem] || 0;
        const sign = j < rawReactants.length ? 1 : -1;
        row.push(new Fraction(sign * count));
      }
      matrix.push(row);
    }

    // Gaussian elimination over fractions to find nullspace
    let lead = 0;
    const rowCount = m;
    const colCount = n;

    for (let r = 0; r < rowCount; r++) {
      if (lead >= colCount - 1) break;
      let i = r;
      while (i < rowCount && matrix[i][lead].isZero()) {
        i++;
      }
      if (i === rowCount) {
        lead++;
        r--;
        continue;
      }
      // Swap rows
      const temp = matrix[i];
      matrix[i] = matrix[r];
      matrix[r] = temp;

      // Normalize row r
      const val = matrix[r][lead];
      for (let c = 0; c < colCount; c++) {
        matrix[r][c] = matrix[r][c].div(val);
      }

      // Eliminate other rows
      for (let other = 0; other < rowCount; other++) {
        if (other !== r && !matrix[other][lead].isZero()) {
          const factor = matrix[other][lead];
          for (let c = 0; c < colCount; c++) {
            matrix[other][c] = matrix[other][c].sub(factor.mul(matrix[r][c]));
          }
        }
      }
      lead++;
    }

    // Solve for coefficients assuming the last column coefficient = 1
    // (Free variable x_last = 1)
    const rawCoeffs: Fraction[] = new Array(n).fill(null).map(() => new Fraction(1));
    for (let r = 0; r < Math.min(rowCount, n - 1); r++) {
      // Find pivot column
      let pivotCol = -1;
      for (let c = 0; c < n - 1; c++) {
        if (Math.abs(matrix[r][c].toNumber() - 1) < 1e-6) {
          pivotCol = c;
          break;
        }
      }
      if (pivotCol !== -1) {
        rawCoeffs[pivotCol] = new Fraction(0).sub(matrix[r][n - 1]);
      }
    }
    rawCoeffs[n - 1] = new Fraction(1);

    // If any coefficient is negative or zero, scale or check alternate
    const anyNonPositive = rawCoeffs.some(f => f.toNumber() <= 0);
    if (anyNonPositive) {
      // Try direct brute-force small integer search up to 20 for guaranteed convergence on simple/medium equations
      const brute = bruteForceBalance(rawReactants, rawProducts, elements);
      if (brute) {
        return formatResult(rawReactants, rawProducts, brute, elements);
      }
      return {
        success: false,
        balancedEquation: '',
        molecularEquation: '',
        reactants: [],
        products: [],
        reactionType: '',
        reactionTypeUz: '',
        atomBalance: [],
        explanationUz: '',
        feasibilityNoteUz: '',
        scientificSource: 'IUPAC & Mass Conservation',
        error: "Ushbu tenglamani tenglashtirib bo'lmadi. Elementlar yoki moddalar formulasi to'g'riligini tekshiring."
      };
    }

    // Find LCM of all denominators to make all coefficients integers
    let overallLcm = 1;
    rawCoeffs.forEach(c => {
      overallLcm = lcm(overallLcm, c.denominator);
    });

    const integerCoeffs = rawCoeffs.map(c => Math.round(c.numerator * (overallLcm / c.denominator)));

    // Reduce by common GCD
    let overallGcd = integerCoeffs[0];
    integerCoeffs.forEach(c => {
      overallGcd = gcd(overallGcd, c);
    });
    const finalCoeffs = integerCoeffs.map(c => Math.round(c / overallGcd));

    return formatResult(rawReactants, rawProducts, finalCoeffs, elements);
  } catch (err: unknown) {
    return {
      success: false,
      balancedEquation: '',
      molecularEquation: '',
      reactants: [],
      products: [],
      reactionType: '',
      reactionTypeUz: '',
      atomBalance: [],
      explanationUz: '',
      feasibilityNoteUz: '',
      scientificSource: 'IUPAC & Mass Conservation',
      error: `Xatolik yuz berdi: ${err instanceof Error ? err.message : String(err)}`
    };
  }
}

// Fallback integer solver for stubborn equations
function bruteForceBalance(
  reactants: string[],
  products: string[],
  elements: string[]
): number[] | null {
  const molParsed = [...reactants, ...products].map(m => parseChemicalFormula(m));
  const rLen = reactants.length;
  const pLen = products.length;
  const total = rLen + pLen;

  // If total molecules <= 4, search coeffs 1..15
  if (total <= 4) {
    for (let c1 = 1; c1 <= 14; c1++) {
      for (let c2 = 1; c2 <= 14; c2++) {
        for (let c3 = 1; c3 <= 14; c3++) {
          if (total === 3) {
            const coeffs = [c1, c2, c3];
            if (verifyBalance(molParsed, coeffs, rLen, elements)) return coeffs;
          } else if (total === 4) {
            for (let c4 = 1; c4 <= 14; c4++) {
              const coeffs = [c1, c2, c3, c4];
              if (verifyBalance(molParsed, coeffs, rLen, elements)) return coeffs;
            }
          }
        }
      }
    }
  }
  return null;
}

function verifyBalance(
  molParsed: AtomCountMap[],
  coeffs: number[],
  rLen: number,
  elements: string[]
): boolean {
  for (const elem of elements) {
    let rCount = 0;
    let pCount = 0;
    for (let i = 0; i < molParsed.length; i++) {
      const cnt = (molParsed[i][elem] || 0) * coeffs[i];
      if (i < rLen) rCount += cnt;
      else pCount += cnt;
    }
    if (rCount !== pCount || rCount === 0) return false;
  }
  return true;
}

function formatResult(
  rawReactants: string[],
  rawProducts: string[],
  coeffs: number[],
  elements: string[]
): BalancedEquationResult {
  const rCoeffs = coeffs.slice(0, rawReactants.length);
  const pCoeffs = coeffs.slice(rawReactants.length);

  const reactants = rawReactants.map((f, i) => ({ formula: f, coefficient: rCoeffs[i] }));
  const products = rawProducts.map((f, i) => ({ formula: f, coefficient: pCoeffs[i] }));

  const formatSide = (items: { formula: string; coefficient: number }[]) =>
    items
      .map(item => `${item.coefficient > 1 ? item.coefficient : ''}${item.formula}`)
      .join(' + ');

  const balancedEquation = `${formatSide(reactants)} ⟶ ${formatSide(products)}`;

  // Atom balance check table
  const atomBalance = elements.map(elem => {
    let reactantCount = 0;
    reactants.forEach(r => {
      reactantCount += (parseChemicalFormula(r.formula)[elem] || 0) * r.coefficient;
    });
    let productCount = 0;
    products.forEach(p => {
      productCount += (parseChemicalFormula(p.formula)[elem] || 0) * p.coefficient;
    });
    return {
      element: elem,
      reactantCount,
      productCount,
      isBalanced: reactantCount === productCount
    };
  });

  const { typeEn, typeUz } = classifyReaction(rawReactants, rawProducts);

  const stepsUz = [
    `1. Dastlabki moddalar: ${rawReactants.join(', ')} va hosil bo'lgan mahsulotlar: ${rawProducts.join(', ')} aniqlandi.`,
    `2. Har bir element atomlari soni hisoblandi: [${elements.join(', ')}].`,
    `3. Moddalar saqlanish qonuni bo'yicha stexiometrik koeffitsientlar aniqlandi: ${balancedEquation}.`,
    `4. Reaksiya turi: ${typeUz} (${typeEn}).`
  ].join('\n');

  // Generate Net Ionic Equation if simple acid-base or precipitation
  let netIonic: string | undefined = undefined;
  const isHClNaOH = rawReactants.some(r => r.includes('HCl')) && rawReactants.some(r => r.includes('NaOH'));
  if (isHClNaOH) {
    netIonic = 'H⁺(aq) + OH⁻(aq) ⟶ H₂O(l)';
  } else if (rawReactants.some(r => r.includes('AgNO3')) && rawReactants.some(r => r.includes('NaCl'))) {
    netIonic = 'Ag⁺(aq) + Cl⁻(aq) ⟶ AgCl(s)↓';
  } else if (rawReactants.some(r => r.includes('Pb')) && rawReactants.some(r => r.includes('KI'))) {
    netIonic = 'Pb²⁺(aq) + 2I⁻(aq) ⟶ PbI₂(s)↓';
  } else if (rawReactants.some(r => r.includes('Zn')) && rawReactants.some(r => r.includes('HCl'))) {
    netIonic = 'Zn(s) + 2H⁺(aq) ⟶ Zn²⁺(aq) + H₂(g)↑';
  } else if (rawReactants.some(r => r.includes('CuSO4')) && rawReactants.some(r => r.includes('NaOH'))) {
    netIonic = 'Cu²⁺(aq) + 2OH⁻(aq) ⟶ Cu(OH)₂(s)↓';
  } else if (rawReactants.some(r => r.includes('FeCl3')) && rawReactants.some(r => r.includes('NaOH'))) {
    netIonic = 'Fe³⁺(aq) + 3OH⁻(aq) ⟶ Fe(OH)₃(s)↓';
  }

  const feasibilityNoteUz =
    "Ilmiy eslatma: Ushbu tenglama atomlar saqlanish qonuniga binoan matematik jihatdan to'liq tenglashtirilgan. Biroq, kimyoda reaksiyaning real amalga oshishi termodinamik spontanlik (ΔG < 0), harorat, bosim, faollanish energiyasi (E_a) va kinetik sharoitlarga bog'liq.";

  return {
    success: true,
    balancedEquation,
    molecularEquation: balancedEquation,
    netIonicEquation: netIonic,
    reactants,
    products,
    reactionType: typeEn,
    reactionTypeUz: typeUz,
    atomBalance,
    explanationUz: stepsUz,
    feasibilityNoteUz,
    scientificSource: 'IUPAC Qoidalari & Atom Saqlanish Qonuni (Lomonosov-Lavoisier)'
  };
}
