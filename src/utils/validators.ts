import type { Alternatif, Kriteria } from '@/types'

export function validateAlternatif(alternatif: Alternatif[]): string | null {
  if (alternatif.length < 2) {
    return 'Minimal 2 alternatif'
  }

  const names = alternatif.map((a) => a.nama.trim().toLowerCase())
  for (let i = 0; i < names.length; i++) {
    if (!names[i]) {
      return `Nama alternatif baris ke-${i + 1} tidak boleh kosong`
    }
    if (names.indexOf(names[i]) !== i) {
      return `Nama alternatif "${alternatif[i].nama}" duplikat`
    }
  }

  return null
}

export function validateKriteria(kriteria: Kriteria[]): string | null {
  if (kriteria.length < 2) {
    return 'Minimal 2 kriteria'
  }

  const names = kriteria.map((k) => k.nama.trim().toLowerCase())
  for (let i = 0; i < names.length; i++) {
    if (!names[i]) {
      return `Nama kriteria baris ke-${i + 1} tidak boleh kosong`
    }
    if (names.indexOf(names[i]) !== i) {
      return `Nama kriteria "${kriteria[i].nama}" duplikat`
    }
  }

  const totalBobot = kriteria.reduce((sum, k) => sum + k.bobot, 0)
  if (Math.abs(totalBobot - 1) > 0.01) {
    return `Total bobot harus = 1.00 (saat ini ${totalBobot.toFixed(2)})`
  }

  return null
}

export function validateMatriks(matriks: number[][], alternatifCount: number, kriteriaCount: number): string | null {
  if (matriks.length !== alternatifCount) {
    return 'Jumlah baris matriks tidak sesuai'
  }

  for (let i = 0; i < matriks.length; i++) {
    if (matriks[i].length !== kriteriaCount) {
      return `Baris ke-${i + 1}: jumlah kolom tidak sesuai`
    }
    for (let j = 0; j < matriks[i].length; j++) {
      if (isNaN(matriks[i][j]) || matriks[i][j] === undefined || matriks[i][j] === null) {
        return `Nilai matriks [${i + 1}][${j + 1}] harus diisi`
      }
    }
  }

  return null
}
