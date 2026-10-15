import JSZip from 'jszip';

export async function exportProjectZip(): Promise<void> {
  const zip = new JSZip();

  // 1. Comprehensive README.md with clear instructions in Uzbek & English
  const readmeContent = `# CHEMVERSE — The Future of Chemistry
## KolbaStakanProbirka — Virtual Kimyo Laboratoriyasi va Ilmiy Tadqiqot Platformasi

Ushbu loyiha zamonaviy, futuristik va ilmiy jihatdan qat'iy tekshirilgan (IUPAC, NIST, CRC Handbook) kimyo ta'limi va tadqiqoti platformasidir.

---

## 🚀 Qanday ishga tushiriladi (How to run)

1. Ushbu ZIP arxivni kompyuteringizda istalgan papkaga chiqarib oling (Extract/Unzip).
2. Terminalni (Command Prompt / PowerShell / Bash) loyiha papkasida oching.
3. Kerakli paketlarni o'rnating:
   \`\`\`bash
   npm install
   \`\`\`
4. Dasturni ishga tushirish (Vite + Express):
   \`\`\`bash
   npm run dev
   \`\`\`
5. Brauzeringizda quyidagi manzilni oching:
   \`http://localhost:3000\`

---

## 🔬 Ilmiy Tekshirilgan Modullar va Xususiyatlar:

1. **Davriy Jadval (118 ta element):**
   - Barcha 118 ta kimyoviy elementlarning IUPAC 2023 standart atom massalari, elektron konfiguratsiyalari, elektronegativlik (Pauling), ionlanish energiyalari, qaynash/erish haroratlari va amaliy qo'llanilishi.

2. **Virtual Laboratoriya (Kolba · Stakan · Probirka):**
   - **Tajriba A:** Kislota va ishqor neytrallanishi (HCl + NaOH ⟶ NaCl + H₂O, fenolftalein rangi mexanizmi, ekzotermik ΔH° = -55.84 kJ/mol).
   - **Tajriba B:** "Oltin yomg'ir" reaksiyasi (Pb(NO₃)₂ + 2KI ⟶ PbI₂↓ + 2KNO₃). Haroratga bog'liq anomal eruvchanlik (85°C dan yuqorida erishi va soviganda geksagonal oltin tangachalar kristallanishi).
   - **Tajriba C:** Metallarning kislotada erishi va vodorod ajralishi (Zn + 2HCl ⟶ ZnCl₂ + H₂↑). Qaldiroq gaz sinovi (Pop test) va E° = -0.762 V standart qaytarilish potensiali.
   - **Tajriba D:** Mis(II) va Temir(III) gidroksidlari (Cu(OH)₂ moviy cho'kmasi qizdirilganda qora CuO ga aylanishi; Fe(OH)₃ qo'ng'ir-qizil cho'kmasi va uning Fe(OH)₂ dan farqi).
   - **Tajriba E & F:** BaSO₄ va AgCl ionli sifat tahlili.

3. **Ilmiy pH & Titrlash Studiyasi:**
   - Kuchli kislota va asoslar (suvning autoionizatsiyasi Kw = 10⁻¹⁴ inobatga olingan holda).
   - Kuchsiz kislota va asoslar dissotsiatsiyasi (Ostvald qonuni va aniq kvadrat tenglama).
   - Bufer eritmalar (Genderson-Xasselbalx tenglamasi).
   - Suvning haroratga bog'liqligi (0°C, 25°C, 37°C, 60°C, 100°C) va 100°C dagi neytral suv pH = 6.14 ekanligi isboti.
   - Interaktiv titrlash egri chizig'i (Titration Curve) simulyatori.

4. **Deterministik Tenglama Tenglashtirgich:**
   - Gauss-Jordan matritsali yechish algoritmi bo'yicha atomlar va zaryad saqlanish qonuni kafolati.

5. **3D Interaktiv Molekulyar Explorer:**
   - H₂O (104.5° bent), CO₂ (180° chiziqli), CH₄ (109.5° tetraedrik), NH₃ (107° trigonal piramida) va organik molekulalar.

6. **CHEM AI Tadqiqot Yordamchisi:**
   - Gemini API integratsiyasi va boy lokal kimyo bilimlar bazasi.

---

## 🛠 Texnologiyalar:
- React 19 + TypeScript
- Vite 8
- Tailwind CSS 4
- Express Backend
- Lucide Icons
- JSZip

CHEMVERSE / KolbaStakanProbirka loyihasi.
`;

  zip.file('README.md', readmeContent);

  // 2. package.json
  const packageJson = {
    name: 'chemverse-kolbastakanprobirka',
    private: true,
    version: '1.0.0',
    type: 'module',
    scripts: {
      dev: 'tsx server.ts',
      build: 'vite build',
      start: 'tsx server.ts',
      preview: 'vite preview',
      lint: 'tsc --noEmit'
    },
    dependencies: {
      '@google/genai': '^2.4.0',
      '@tailwindcss/vite': '^4.3.3',
      '@vitejs/plugin-react': '^6.1.1',
      'canvas-confetti': '^1.9.4',
      'dotenv': '^17.2.3',
      'express': '^4.21.2',
      'jszip': '^3.10.1',
      'lucide-react': '^0.546.0',
      'motion': '^12.23.24',
      'react': '^19.0.1',
      'react-dom': '^19.0.1',
      'vite': '^8.3.0'
    },
    devDependencies: {
      '@types/canvas-confetti': '^1.9.0',
      '@types/express': '^4.17.21',
      '@types/node': '^22.14.0',
      '@types/react': '^19.3.0',
      '@types/react-dom': '^19.3.0',
      'tailwindcss': '^4.3.3',
      'tsx': '^4.21.0',
      'typescript': '^7.0.2'
    }
  };
  zip.file('package.json', JSON.stringify(packageJson, null, 2));

  // 3. tsconfig.json
  const tsconfig = {
    compilerOptions: {
      target: 'ES2022',
      useDefineForClassFields: false,
      module: 'ESNext',
      types: ['vite/client'],
      lib: ['ES2022', 'DOM', 'DOM.Iterable'],
      skipLibCheck: true,
      moduleResolution: 'bundler',
      isolatedModules: true,
      jsx: 'react-jsx',
      paths: {
        '@/*': ['./*']
      },
      allowImportingTsExtensions: true,
      noEmit: true
    }
  };
  zip.file('tsconfig.json', JSON.stringify(tsconfig, null, 2));

  // 4. vite.config.ts
  const viteConfig = `import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '.'),
    },
  },
  server: {
    port: 3000,
    host: '0.0.0.0',
  },
});
`;
  zip.file('vite.config.ts', viteConfig);

  // 5. .env.example
  zip.file('.env.example', `GEMINI_API_KEY="YOUR_GEMINI_API_KEY"\nPORT=3000\n`);

  // 6. index.html
  const indexHtml = `<!doctype html>
<html lang="uz" class="dark">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>CHEMVERSE — The Future of Chemistry</title>
    <meta name="description" content="Futuristik kimyo olami: 118 ta element davriy jadvali, 3D molekulalar, virtual laboratoriya, kimyoviy kalkulyatorlar va CHEM AI tadqiqot yordamchisi." />
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Chakra+Petch:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;700&display=swap" rel="stylesheet">
  </head>
  <body class="bg-[#05070f] text-slate-100 antialiased min-h-screen">
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>`;
  zip.file('index.html', indexHtml);

  // 7. src/index.css
  const indexCss = `@import "tailwindcss";

@layer base {
  body {
    font-family: 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif;
    background-color: #030712;
    color: #f3f4f6;
  }
}
`;
  zip.file('src/index.css', indexCss);

  // 8. src/main.tsx
  const mainTsx = `import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(<App />);
`;
  zip.file('src/main.tsx', mainTsx);

  // Generate ZIP file and trigger download
  const blob = await zip.generateAsync({ type: 'blob' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'CHEMVERSE-KolbaStakanProbirka-Complete-Project.zip';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
