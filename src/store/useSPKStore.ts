import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { SPKState, SPKActions } from '@/types'

const initialState: SPKState = {
  currentDatasetId: null,
  currentDatasetNama: null,
  alternatif: [],
  kriteria: [],
  matriks: [],
  hasil: {
    saw: null,
    moora: null,
    profileMatching: null,
    smart: null,
    topsis: null,
  },
  isLoading: false,
  isSaving: false,
}

export const useSPKStore = create<SPKState & SPKActions>()(
  persist(
    (set) => ({
      ...initialState,

      setCurrentDataset: (id, nama) =>
        set({ currentDatasetId: id, currentDatasetNama: nama }),

      setAlternatif: (alternatif) => set({ alternatif }),

      addAlternatif: () =>
        set((state) => ({
          alternatif: [
            ...state.alternatif,
            { nama: '', urutan: state.alternatif.length + 1 },
          ],
        })),

      removeAlternatif: (index) =>
        set((state) => ({
          alternatif: state.alternatif
            .filter((_, i) => i !== index)
            .map((a, i) => ({ ...a, urutan: i + 1 })),
          matriks: state.matriks.filter((_, i) => i !== index),
        })),

      updateAlternatif: (index, nama) =>
        set((state) => ({
          alternatif: state.alternatif.map((a, i) =>
            i === index ? { ...a, nama } : a
          ),
        })),

      setKriteria: (kriteria) => set({ kriteria }),

      addKriteria: () =>
        set((state) => {
          const newKriteria = [
            ...state.kriteria,
            { nama: '', tipe: 'benefit' as const, bobot: 0, urutan: state.kriteria.length + 1 },
          ]
          return {
            kriteria: newKriteria,
            matriks: state.matriks.map((row) => [...row, 0]),
          }
        }),

      removeKriteria: (index) =>
        set((state) => ({
          kriteria: state.kriteria
            .filter((_, i) => i !== index)
            .map((k, i) => ({ ...k, urutan: i + 1 })),
          matriks: state.matriks.map((row) => row.filter((_, i) => i !== index)),
        })),

      updateKriteria: (index, field, value) =>
        set((state) => ({
          kriteria: state.kriteria.map((k, i) =>
            i === index ? { ...k, [field]: value } : k
          ),
        })),

      setMatriks: (matriks) => set({ matriks }),

      updateMatriksCell: (row, col, value) =>
        set((state) => ({
          matriks: state.matriks.map((r, i) =>
            i === row ? r.map((c, j) => (j === col ? value : c)) : r
          ),
        })),

      setHasil: (hasil) => set({ hasil }),

      setLoading: (loading) => set({ isLoading: loading }),

      setSaving: (saving) => set({ isSaving: saving }),

      resetAll: () => set(initialState),
    }),
    {
      name: 'spk-storage',
      partialize: (state) => ({
        alternatif: state.alternatif,
        kriteria: state.kriteria,
        matriks: state.matriks,
        hasil: state.hasil,
        currentDatasetId: state.currentDatasetId,
        currentDatasetNama: state.currentDatasetNama,
      }),
    }
  )
)
