import type { MetodeHasil } from '@/types'

function konversiGAP(gap: number): number {
  if (gap === 0) return 5
  if (gap === 1) return 4.5
  if (gap === -1) return 4
  if (gap === 2) return 3.5
  if (gap === -2) return 3
  if (gap === 3) return 2.5
  if (gap === -3) return 2
  if (gap === 4) return 1.5
  if (gap === -4) return 1
  return 1
}

export function hitungProfileMatching(
  alternatif: string[],
  kriteria: { nama: string; tipe: string; bobot: number }[],
  matriks: number[][]
): MetodeHasil {
  const n = alternatif.length
  const m = kriteria.length

  const target: number[] = []
  for (let j = 0; j < m; j++) {
    const col = matriks.map((row) => row[j])
    target.push(Math.max(...col))
  }

  const gapMatrix: number[][] = []
  const bobotMatrix: number[][] = []
  for (let i = 0; i < n; i++) {
    gapMatrix[i] = []
    bobotMatrix[i] = []
    for (let j = 0; j < m; j++) {
      const gap = matriks[i][j] - target[j]
      gapMatrix[i][j] = gap
      bobotMatrix[i][j] = konversiGAP(gap)
    }
  }

  const coreFactorCount = m <= 3 ? m : 3
  const secondaryFactorCount = m - coreFactorCount

  const nilai: number[] = []
  for (let i = 0; i < n; i++) {
    let coreSum = 0
    let secondarySum = 0
    for (let j = 0; j < coreFactorCount; j++) {
      coreSum += bobotMatrix[i][j]
    }
    for (let j = coreFactorCount; j < m; j++) {
      secondarySum += bobotMatrix[i][j]
    }

    const ncf = coreFactorCount > 0 ? coreSum / coreFactorCount : 0
    const nsf = secondaryFactorCount > 0 ? secondarySum / secondaryFactorCount : 0

    if (m <= 3) {
      nilai.push(ncf)
    } else {
      nilai.push(0.6 * ncf + 0.4 * nsf)
    }
  }

  const sorted = [...nilai].sort((a, b) => b - a)
  const peringkat = nilai.map((v) => sorted.indexOf(v) + 1)

  const detail: string[][] = []
  detail.push(['Nilai Target:'])
  detail.push(['Kriteria', ...kriteria.map((k) => k.nama)])
  detail.push(['Target', ...target.map((v) => v.toFixed(2))])

  detail.push([''])
  detail.push(['Tabel GAP:'])
  const gapHeader = ['Alternatif', ...kriteria.map((k) => k.nama)]
  detail.push(gapHeader)
  for (let i = 0; i < n; i++) {
    detail.push([alternatif[i], ...gapMatrix[i].map((v) => String(v))])
  }

  detail.push([''])
  detail.push(['Konversi Bobot GAP:'])
  detail.push(gapHeader)
  for (let i = 0; i < n; i++) {
    detail.push([alternatif[i], ...bobotMatrix[i].map((v) => v.toFixed(1))])
  }

  detail.push([''])
  detail.push(['Nilai Akhir:'])
  detail.push(['Alternatif', 'NCF', 'NSF', 'Nilai Akhir', 'Peringkat'])
  for (let i = 0; i < n; i++) {
    const coreSum = bobotMatrix[i].slice(0, coreFactorCount).reduce((a, b) => a + b, 0)
    const secSum = bobotMatrix[i].slice(coreFactorCount).reduce((a, b) => a + b, 0)
    const ncf = coreFactorCount > 0 ? coreSum / coreFactorCount : 0
    const nsf = secondaryFactorCount > 0 ? secSum / secondaryFactorCount : 0
    detail.push([
      alternatif[i],
      ncf.toFixed(4),
      nsf.toFixed(4),
      nilai[i].toFixed(4),
      String(peringkat[i]),
    ])
  }

  return { nilai, peringkat, detail }
}
