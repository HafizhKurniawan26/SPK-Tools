# SPK Tools - Task Progress

## Fase 0: Konfigurasi & Environment
- [x] `tsconfig.app.json` — Tambah `baseUrl` dan `paths` untuk path alias `@/`
- [x] `vite.config.ts` — Tambah `resolve.alias` untuk `@`
- [x] `.env` — Setup VITE_SUPABASE_URL dan VITE_SUPABASE_PUBLISHABLE_KEY
- [x] `index.html` — Update title
- [x] `src/index.css` — Update dengan @tailwindcss-animate + @theme custom
- [x] Hapus `src/App.css` (tidak diperlukan)

## Fase 1: Foundation Layer
### Types
- [x] `src/types/index.ts` — Interface: Alternatif, Kriteria, MatriksNilai, MetodeHasil, HasilPerhitungan, Dataset, SPKState

### Utils
- [x] `src/utils/cn.ts` — utility gabung clsx + tailwind-merge
- [x] `src/utils/constants.ts` — data contoh laptop, nama/deskripsi/ikon metode
- [x] `src/utils/validators.ts` — validasi bobot total, nama unik, minimal alt/krit
- [x] `src/utils/formatters.ts` — format angka, tanggal, persen

## Fase 2: State Management & Hooks
### Store
- [x] `src/store/useSPKStore.ts` — Zustand store with persist middleware

### Hooks
- [x] `src/hooks/useTheme.ts` — dark mode toggle
- [x] `src/hooks/useCalculation.ts` — running 5 methods
- [x] `src/hooks/useDatasets.ts` — fetch datasets pagination+search
- [x] `src/hooks/useSupabase.ts` — generic CRUD hook

## Fase 3: UI Components
- [x] `src/components/ui/Button.tsx` — CVA variants + loading
- [x] `src/components/ui/Input.tsx` — label, error, icon
- [x] `src/components/ui/Select.tsx` — label, error, options
- [x] `src/components/ui/Modal.tsx` — overlay, animasi, Escape key
- [x] `src/components/ui/Card.tsx` — 3 variants
- [x] `src/components/ui/Badge.tsx` — 5 variants
- [x] `src/components/ui/Table.tsx` — responsive, sticky header
- [x] `src/components/ui/Pagination.tsx` — prev/next, page numbers
- [x] `src/components/ui/Skeleton.tsx` — 3 variants, count prop
- [x] `src/components/ui/ThemeToggle.tsx` — Sun/Moon icons

## Fase 4: Layout Components
- [x] `src/components/layout/Navbar.tsx` — logo, nav links, ThemeToggle
- [x] `src/components/layout/Sidebar.tsx` — metode navigation, collapsible
- [x] `src/components/layout/MobileNav.tsx` — bottom nav + hamburger
- [x] `src/components/layout/Footer.tsx` — credit, copyright
- [x] `src/components/layout/Layout.tsx` — wrapper sidebar + main + mobile

## Fase 5: Supabase & API Layer
- [x] `src/lib/supabase.ts` — inisialisasi client
- [x] `src/lib/api/datasets.ts` — CRUD datasets
- [x] `src/lib/api/alternatifs.ts` — CRUD alternatifs
- [x] `src/lib/api/kriterias.ts` — CRUD kriterias
- [x] `src/lib/api/matriks.ts` — CRUD matriks
- [x] `src/lib/api/hasil.ts` — CRUD hasil
- [x] Tambah `saveFullDataset()` dan `loadFullDataset()`

## Fase 6: Metode Perhitungan
- [x] `src/lib/methods/saw.ts` — SAW method
- [x] `src/lib/methods/moora.ts` — MOORA method
- [x] `src/lib/methods/profileMatching.ts` — Profile Matching
- [x] `src/lib/methods/smart.ts` — SMART method
- [x] `src/lib/methods/topsis.ts` — TOPSIS method

## Fase 7: Feature Components
### Input Components
- [x] `src/components/input/StepIndicator.tsx` — 3 step progress
- [x] `src/components/input/AlternatifInput.tsx` — tabel alternatif
- [x] `src/components/input/KriteriaInput.tsx` — tabel kriteria
- [x] `src/components/input/MatriksInput.tsx` — tabel matriks
- [x] `src/components/input/SaveToSupabaseModal.tsx` — modal simpan
- [x] `src/components/input/InputForm.tsx` — wizard 3 langkah

### Result Components
- [x] `src/components/results/ResultTabs.tsx` — 5 tab navigasi
- [x] `src/components/results/MethodResult.tsx` — tabel peringkat
- [x] `src/components/results/CalculationSteps.tsx` — accordion detail
- [x] `src/components/results/ComparisonTable.tsx` — perbandingan
- [x] `src/components/results/RankingChart.tsx` — bar chart

### Dataset Components
- [x] `src/components/datasets/SearchBar.tsx` — search input
- [x] `src/components/datasets/DatasetCard.tsx` — card dataset
- [x] `src/components/datasets/DatasetTable.tsx` — tabel dataset
- [x] `src/components/datasets/DeleteConfirmModal.tsx` — konfirmasi hapus

### Metode Components
- [x] `src/components/metode/MethodExplanation.tsx` — penjelasan
- [x] `src/components/metode/MethodFormula.tsx` — rumus

## Fase 8: Pages
- [x] `src/pages/HomePage.tsx` — hero, grid 5 metode, CTA, statistik
- [x] `src/pages/InputPage.tsx` — form wizard 3 langkah
- [x] `src/pages/HasilPage.tsx` — 5 tabs hasil, comparison, chart
- [x] `src/pages/DataPage.tsx` — search, tabel, pagination
- [x] `src/pages/MetodeDetailPage.tsx` — detail metode
- [x] `src/pages/NotFoundPage.tsx` — 404 page

## Fase 9: App & Routing
- [x] `src/App.tsx` — rewrite routing + layout
- [x] `src/main.tsx` — sudah ok (tidak perlu perubahan)

## Fase 10: Final
- [x] `README.md` — update dokumentasi
- [x] `.env.example` — buat file contoh
- [x] `public/favicon.svg` — update icon
- [x] Build test — `npm run build` sukses
- [x] Lint — `npm run lint` bersih

---

**Status:** ✅ Complete! (65+ files created, all phases done)
