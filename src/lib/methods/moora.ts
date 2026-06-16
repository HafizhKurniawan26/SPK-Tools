import type { MetodeHasil } from '@/types'

export function hitungMOORA(
  alternatif: string[],
  kriteria: { nama: string; tipe: string; bobot: number }[],
  matriks: number[][]
): MetodeHasil {
  const n = alternatif.length
  const m = kriteria.length

  const sumSquares: number[] = []
  for (let j = 0; j < m; j++) {
    let sum = 0
    for (let i = 0; i < n; i++) {
      sum += matriks[i][j] * matriks[i][j]
    }
    sumSquares.push(Math.sqrt(sum))
  }

  const normalisasi: number[][] = []
  for (let i = 0; i < n; i++) {
    normalisasi[i] = []
    for (let j = 0; j < m; j++) {
      normalisasi[i][j] = matriks[i][j] / sumSquares[j]
    }
  }

  const nilai: number[] = []
  for (let i = 0; i < n; i++) {
    let benefitSum = 0
    let costSum = 0
    for (let j = 0; j < m; j++) {
      const weighted = kriteria[j].bobot * normalisasi[i][j]
      if (kriteria[j].tipe === 'benefit') {
        benefitSum += weighted
      } else {
        costSum += weighted
      }
    }
    nilai.push(benefitSum - costSum)
  }

  const sorted = [...nilai].sort((a, b) => b - a)
  const peringkat = nilai.map((v) => sorted.indexOf(v) + 1)

  const detail: string[][] = []
  detail.push(['Normalisasi Matriks (Rij):'])
  const header = ['Alternatif', ...kriteria.map((k) => k.nama)]
  detail.push(header)
  for (let i = 0; i < n; i++) {
    detail.push([alternatif[i], ...normalisasi[i].map((v) => v.toFixed(4))])
  }

  detail.push([''])
  detail.push(['Nilai Optimasi (Yi):'])
  detail.push(['Alternatif', 'Nilai Yi', 'Peringkat'])
  for (let i = 0; i < n; i++) {
    detail.push([alternatif[i], nilai[i].toFixed(4), String(peringkat[i])])
  }

  return { nilai, peringkat, detail }
}
