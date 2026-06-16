import type { MetodeHasil } from '@/types'

export function hitungSMART(
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

  const utility: number[][] = []
  for (let i = 0; i < n; i++) {
    utility[i] = []
    for (let j = 0; j < m; j++) {
      const range = maxValues[j] - minValues[j]
      if (range === 0) {
        utility[i][j] = 100
      } else if (kriteria[j].tipe === 'benefit') {
        utility[i][j] = ((matriks[i][j] - minValues[j]) / range) * 100
      } else {
        utility[i][j] = ((maxValues[j] - matriks[i][j]) / range) * 100
      }
    }
  }

  const totalBobot = kriteria.reduce((sum, k) => sum + k.bobot, 0)
  const bobotNormalized = kriteria.map((k) => k.bobot / totalBobot)

  const nilai: number[] = []
  for (let i = 0; i < n; i++) {
    let sum = 0
    for (let j = 0; j < m; j++) {
      sum += bobotNormalized[j] * utility[i][j]
    }
    nilai.push(sum)
  }

  const sorted = [...nilai].sort((a, b) => b - a)
  const peringkat = nilai.map((v) => sorted.indexOf(v) + 1)

  const detail: string[][] = []
  detail.push(['Tabel Utility (Ui):'])
  const header = ['Alternatif', ...kriteria.map((k) => k.nama)]
  detail.push(header)
  for (let i = 0; i < n; i++) {
    detail.push([alternatif[i], ...utility[i].map((v) => v.toFixed(4))])
  }

  detail.push([''])
  detail.push(['Bobot Ternormalisasi:'])
  detail.push(['Kriteria', 'Bobot Asli', 'Bobot Normalisasi'])
  for (let j = 0; j < m; j++) {
    detail.push([kriteria[j].nama, kriteria[j].bobot.toFixed(4), bobotNormalized[j].toFixed(4)])
  }

  detail.push([''])
  detail.push(['Nilai Akhir:'])
  detail.push(['Alternatif', 'Nilai Akhir', 'Peringkat'])
  for (let i = 0; i < n; i++) {
    detail.push([alternatif[i], nilai[i].toFixed(4), String(peringkat[i])])
  }

  return { nilai, peringkat, detail }
}
