# SPK Tools - Sistem Penunjang Keputusan

Website Sistem Penunjang Keputusan (SPK) dengan 5 metode: **SAW, MOORA, Profile Matching, SMART, dan TOPSIS**.

## Tech Stack

- **React 19** + **Vite 8** + **TypeScript 6**
- **Tailwind CSS 4** dengan @tailwindcss/vite plugin
- **Zustand 5** untuk state management (persist ke localStorage)
- **React Router DOM 7** untuk routing
- **Supabase** untuk database (opsional, tanpa login)
- **Lucide React** untuk ikon
- **class-variance-authority** + **clsx** + **tailwind-merge** untuk UI utilities

## Fitur

- **5 Metode SPK**: SAW, MOORA, Profile Matching, SMART, TOPSIS
- **Form Input 3 Langkah**: Alternatif, Kriteria, Matriks Nilai
- **Perhitungan Otomatis**: Semua metode dihitung sekaligus
- **Perbandingan Hasil**: Tabel perbandingan peringkat semua metode
- **Grafik Ranking**: Visualisasi batang horizontal
- **Detail Perhitungan**: Accordion langkah-langkah perhitungan setiap metode
- **Contoh Data**: Data demo laptop untuk mencoba
- **Simpan/Load Database**: Opsional via Supabase (tanpa login)
- **Dark Mode**: Toggle tema gelap/terang
- **Responsive**: Desktop sidebar + mobile bottom nav

## Cara Menjalankan

```bash
# Install dependencies
npm install

# Jalankan development server
npm run dev

# Build production
npm run build

# Preview production build
npm run preview
```

## Konfigurasi Supabase (Opsional)

Buat file `.env` di root project:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=your-publishable-key
```

### Migrasi Database

Jalankan SQL berikut di Supabase SQL Editor:

```sql
CREATE TABLE datasets (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  nama VARCHAR(255) NOT NULL,
  deskripsi TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE alternatifs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  dataset_id UUID REFERENCES datasets(id) ON DELETE CASCADE,
  nama VARCHAR(255) NOT NULL,
  urutan INTEGER NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE kriterias (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  dataset_id UUID REFERENCES datasets(id) ON DELETE CASCADE,
  nama VARCHAR(255) NOT NULL,
  tipe VARCHAR(10) CHECK (tipe IN ('benefit', 'cost')) NOT NULL,
  bobot DECIMAL(5,4) NOT NULL,
  urutan INTEGER NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE matriks_nilais (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  dataset_id UUID REFERENCES datasets(id) ON DELETE CASCADE,
  alternatif_id UUID REFERENCES alternatifs(id) ON DELETE CASCADE,
  kriteria_id UUID REFERENCES kriterias(id) ON DELETE CASCADE,
  nilai DECIMAL(10,4) NOT NULL,
  UNIQUE(dataset_id, alternatif_id, kriteria_id)
);

CREATE TABLE hasil_perhitungans (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  dataset_id UUID REFERENCES datasets(id) ON DELETE CASCADE,
  metode VARCHAR(50) NOT NULL,
  alternatif_id UUID REFERENCES alternatifs(id) ON DELETE CASCADE,
  nilai_akhir DECIMAL(10,6),
  peringkat INTEGER,
  detail_perhitungan JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE datasets ENABLE ROW LEVEL SECURITY;
ALTER TABLE alternatifs ENABLE ROW LEVEL SECURITY;
ALTER TABLE kriterias ENABLE ROW LEVEL SECURITY;
ALTER TABLE matriks_nilais ENABLE ROW LEVEL SECURITY;
ALTER TABLE hasil_perhitungans ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public access" ON datasets FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Public access" ON alternatifs FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Public access" ON kriterias FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Public access" ON matriks_nilais FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Public access" ON hasil_perhitungans FOR ALL USING (true) WITH CHECK (true);
```

## Struktur Project

```
src/
├── components/
│   ├── layout/       # Navbar, Sidebar, MobileNav, Footer, Layout
│   ├── ui/           # Button, Input, Select, Modal, Card, Badge, Table, dll
│   ├── input/        # AlternatifInput, KriteriaInput, MatriksInput, InputForm, dll
│   ├── results/      # ResultTabs, MethodResult, CalculationSteps, ComparisonTable, Chart
│   ├── datasets/     # DatasetTable, DatasetCard, SearchBar, DeleteConfirmModal
│   └── metode/       # MethodExplanation, MethodFormula
├── pages/            # HomePage, InputPage, HasilPage, DataPage, MetodeDetailPage
├── hooks/            # useTheme, useCalculation, useDatasets, useSupabase
├── store/            # useSPKStore (Zustand)
├── lib/
│   ├── api/          # datasets, alternatifs, kriterias, matriks, hasil
│   └── methods/      # saw, moora, profileMatching, smart, topsis
├── types/            # TypeScript interfaces
└── utils/            # cn, constants, validators, formatters
```

## Halaman

| Route | Halaman | Deskripsi |
|-------|---------|-----------|
| `/` | Beranda | Hero, grid 5 metode, statistik dataset |
| `/input` | Input Data | Form wizard 3 langkah |
| `/hasil` | Hasil | 5 tab hasil, perbandingan, grafik |
| `/data` | Data Tersimpan | List dataset, search, pagination |
| `/metode/:nama` | Detail Metode | Teori, rumus, kelebihan/kekurangan |
| `*` | 404 | Halaman tidak ditemukan |
