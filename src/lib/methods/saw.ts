import type { MetodeHasil } from '@/types'

export function hitungSAW(
  alternatif: string[],
  kriteria: { nama: string; tipe: string; bobot: number }[],
  matriks: number[][]
): MetodeHasil {
  const n = alternatif.length
  const m = kriteria.length

  const maxValues: number[] = []
  const minValues: number[] = []
  for (let j = 0; j < m; j++) {
    const col = matriks.map((row) => row[j])
    maxValues.push(Math.max(...col))
    minValues.push(Math.min(...col))
  }

  const normalisasi: number[][] = []
  for (let i = 0; i < n; i++) {
    normalisasi[i] = []
    for (let j = 0; j < m; j++) {
      if (kriteria[j].tipe === 'benefit') {
        normalisasi[i][j] = matriks[i][j] / maxValues[j]
      } else {
        normalisasi[i][j] = minValues[j] / matriks[i][j]
      }
    }
  }

  const nilai: number[] = []
  for (let i = 0; i < n; i++) {
    let sum = 0
    for (let j = 0; j < m; j++) {
      sum += kriteria[j].bobot * normalisasi[i][j]
    }
    nilai.push(sum)
  }

  const sorted = [...nilai].sort((a, b) => b - a)
  const peringkat = nilai.map((v) => sorted.indexOf(v) + 1)

  const detail: string[][] = []
  detail.push(['Normalisasi Matriks:'])
  const header = ['Alternatif', ...kriteria.map((k) => k.nama)]
  detail.push(header)
  for (let i = 0; i < n; i++) {
    detail.push([alternatif[i], ...normalisasi[i].map((v) => v.toFixed(4))])
  }

  detail.push([''])
  detail.push(['Nilai Preferensi (Vi):'])
  detail.push(['Alternatif', 'Nilai Akhir', 'Peringkat'])
  for (let i = 0; i < n; i++) {
    detail.push([alternatif[i], nilai[i].toFixed(4), String(peringkat[i])])
  }

  return { nilai, peringkat, detail }
}
