export interface Alternatif {
  id?: string
  nama: string
  urutan: number
}

export interface Kriteria {
  id?: string
  nama: string
  tipe: 'benefit' | 'cost'
  bobot: number
  urutan: number
}

export interface MatriksNilai {
  id?: string
  datasetId?: string
  alternatifId?: string
  kriteriaId?: string
  nilai: number
}

export interface MetodeHasil {
  nilai: number[]
  peringkat: number[]
  detail: string[][]
}

export interface HasilPerhitungan {
  saw: MetodeHasil | null
  moora: MetodeHasil | null
  profileMatching: MetodeHasil | null
  smart: MetodeHasil | null
  topsis: MetodeHasil | null
}

export interface Dataset {
  id: string
  nama: string
  deskripsi: string
  created_at: string
  updated_at: string
}

export interface SPKState {
  currentDatasetId: string | null
  currentDatasetNama: string | null
  alternatif: Alternatif[]
  kriteria: Kriteria[]
  matriks: number[][]
  hasil: HasilPerhitungan
  isLoading: boolean
  isSaving: boolean
}

export interface SPKActions {
  setCurrentDataset: (id: string | null, nama: string | null) => void
  setAlternatif: (alternatif: Alternatif[]) => void
  addAlternatif: () => void
  removeAlternatif: (index: number) => void
  updateAlternatif: (index: number, nama: string) => void
  setKriteria: (kriteria: Kriteria[]) => void
  addKriteria: () => void
  removeKriteria: (index: number) => void
  updateKriteria: (index: number, field: keyof Kriteria, value: string | number) => void
  setMatriks: (matriks: number[][]) => void
  updateMatriksCell: (row: number, col: number, value: number) => void
  setHasil: (hasil: HasilPerhitungan) => void
  setLoading: (loading: boolean) => void
  setSaving: (saving: boolean) => void
  resetAll: () => void
}

export interface MethodInfo {
  id: string
  nama: string
  deskripsi: string
  icon: string
  path: string
}
