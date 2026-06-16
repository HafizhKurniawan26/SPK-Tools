import type { MethodInfo } from '@/types'

export const CONTOH_DATA = {
  alternatif: ['Laptop A', 'Laptop B', 'Laptop C', 'Laptop D', 'Laptop E'],
  kriteria: [
    { nama: 'Harga', tipe: 'cost' as const, bobot: 0.25, urutan: 1 },
    { nama: 'Kualitas', tipe: 'benefit' as const, bobot: 0.30, urutan: 2 },
    { nama: 'Fitur', tipe: 'benefit' as const, bobot: 0.20, urutan: 3 },
    { nama: 'Garansi (tahun)', tipe: 'benefit' as const, bobot: 0.15, urutan: 4 },
    { nama: 'Rating', tipe: 'benefit' as const, bobot: 0.10, urutan: 5 },
  ],
  matriks: [
    [70, 85, 80, 2, 4.5],
    [65, 75, 70, 3, 4.0],
    [80, 90, 85, 2, 4.8],
    [75, 80, 75, 1, 4.2],
    [60, 70, 65, 3, 3.8],
  ],
}

export const METODE_LIST: MethodInfo[] = [
  {
    id: 'saw',
    nama: 'SAW',
    deskripsi: 'Simple Additive Weighting - metode penjumlahan terbobot',
    icon: 'Scale',
    path: '/metode/saw',
  },
  {
    id: 'moora',
    nama: 'MOORA',
    deskripsi: 'Multi-Objective Optimization by Ratio Analysis',
    icon: 'Target',
    path: '/metode/moora',
  },
  {
    id: 'profileMatching',
    nama: 'Profile Matching',
    deskripsi: 'Mencocokkan profil alternatif dengan profil target',
    icon: 'UserCheck',
    path: '/metode/profile-matching',
  },
  {
    id: 'smart',
    nama: 'SMART',
    deskripsi: 'Simple Multi-Attribute Rating Technique',
    icon: 'Brain',
    path: '/metode/smart',
  },
  {
    id: 'topsis',
    nama: 'TOPSIS',
    deskripsi: 'Technique for Order Preference by Similarity to Ideal Solution',
    icon: 'TrendingUp',
    path: '/metode/topsis',
  },
]

export const METODE_DETAIL: Record<string, { teori: string; kelebihan: string[]; kekurangan: string[]; rumus: { label: string; formula: string }[] }> = {
  saw: {
    teori: 'Metode SAW (Simple Additive Weighting) adalah metode penjumlahan terbobot. Konsep dasar metode SAW adalah mencari penjumlahan terbobot dari rating kinerja pada setiap alternatif pada semua kriteria.',
    kelebihan: [
      'Sederhana dan mudah dipahami',
      'Perhitungan efisien untuk dataset kecil hingga menengah',
      'Mampu menangani kriteria benefit dan cost',
    ],
    kekurangan: [
      'Asumsi independensi antar kriteria',
      'Sensitif terhadap bobot yang diberikan',
      'Tidak menangani ketidakpastian dengan baik',
    ],
    rumus: [
      { label: 'Normalisasi Benefit', formula: 'Rij = Xij / max(Xj)' },
      { label: 'Normalisasi Cost', formula: 'Rij = min(Xj) / Xij' },
      { label: 'Nilai Preferensi', formula: 'Vi = Σ(Wj × Rij)' },
    ],
  },
  moora: {
    teori: 'Metode MOORA (Multi-Objective Optimization by Ratio Analysis) diperkenalkan oleh Brauers dan Zavadskas. Metode ini menghitung rasio antara nilai alternatif dengan nilai normalisasi Euclidean.',
    kelebihan: [
      'Perhitungan relatif sederhana',
      'Stabil dan robust',
      'Dapat menangani banyak kriteria',
    ],
    kekurangan: [
      'Tidak mempertimbangkan korelasi antar kriteria',
      'Kurang akurat jika data sangat bervariasi',
    ],
    rumus: [
      { label: 'Normalisasi', formula: 'Rij = Xij / √(ΣXij²)' },
      { label: 'Optimasi', formula: 'Yi = Σ(Wj × Rij benefit) - Σ(Wj × Rij cost)' },
    ],
  },
  profileMatching: {
    teori: 'Profile Matching adalah metode yang membandingkan profil alternatif dengan profil target (ideal) untuk mengetahui gap (selisih) yang kemudian dikonversi menjadi bobot nilai.',
    kelebihan: [
      'Cocok untuk pencocokan profil/sumber daya manusia',
      'Memiliki konsep core dan secondary factor',
      'Hasil mudah diinterpretasi',
    ],
    kekurangan: [
      'Memerlukan penentuan target yang jelas',
      'Sensitif terhadap penentuan target',
    ],
    rumus: [
      { label: 'GAP', formula: 'GAP = Nilai Alternatif - Nilai Target' },
      { label: 'Konversi GAP', formula: '0→5, 1→4.5, -1→4, 2→3.5, -2→3, 3→2.5, -3→2, 4→1.5, -4→1' },
      { label: 'NCF/NSF', formula: 'Nilai Akhir = (60% × NCF) + (40% × NSF)' },
    ],
  },
  smart: {
    teori: 'SMART (Simple Multi-Attribute Rating Technique) adalah metode pengambilan keputusan multi-kriteria yang dikembangkan oleh Edward pada tahun 1977. Metode ini menggunakan fungsi utility linear untuk memberikan skor pada setiap alternatif.',
    kelebihan: [
      'Sederhana dan mudah diimplementasikan',
      'Fleksibel dalam menangani berbagai jenis data',
      'Menghasilkan nilai utility yang mudah dipahami',
    ],
    kekurangan: [
      'Mengasumsikan fungsi utility linear',
      'Kurang akurat untuk hubungan non-linear',
    ],
    rumus: [
      { label: 'Utility Benefit', formula: 'Ui = (Cout - Cmin) / (Cmax - Cmin) × 100' },
      { label: 'Utility Cost', formula: 'Ui = (Cmax - Cout) / (Cmax - Cmin) × 100' },
      { label: 'Normalisasi Bobot', formula: 'Wj_normalized = Wj / ΣWj' },
      { label: 'Nilai Akhir', formula: 'Nilai = Σ(Wj_normalized × Uij)' },
    ],
  },
  topsis: {
    teori: 'TOPSIS (Technique for Order Preference by Similarity to Ideal Solution) dikembangkan oleh Hwang dan Yoon. Metode ini memilih alternatif yang memiliki jarak terpendek dari solusi ideal positif dan jarak terjauh dari solusi ideal negatif.',
    kelebihan: [
      'Konsep logis dan mudah dipahami',
      'Mempertimbangkan solusi ideal positif dan negatif',
      'Dapat menangani banyak kriteria dan alternatif',
    ],
    kekurangan: [
      'Mengasumsikan independensi antar kriteria',
      'Dapat menghasilkan rank reversal jika ada alternatif baru',
    ],
    rumus: [
      { label: 'Normalisasi', formula: 'Rij = Xij / √(ΣXij²)' },
      { label: 'Matriks Terbobot', formula: 'Yij = Wj × Rij' },
      { label: 'Jarak D+', formula: 'D+ = √(Σ(Yij - A+)²)' },
      { label: 'Jarak D-', formula: 'D- = √(Σ(Yij - A-)²)' },
      { label: 'Preferensi', formula: 'Vi = D- / (D+ + D-)' },
    ],
  },
}

export const PAGE_SIZE = 10

export const NAV_ITEMS = [
  { path: '/', label: 'Beranda', icon: 'Home' },
  { path: '/input', label: 'Input', icon: 'FileInput' },
  { path: '/hasil', label: 'Hasil', icon: 'BarChart3' },
  { path: '/data', label: 'Data', icon: 'Database' },
]
