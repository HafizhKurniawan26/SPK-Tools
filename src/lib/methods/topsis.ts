import type { MetodeHasil } from '@/types'

export function hitungTOPSIS(
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

  const matriksTerbobot: number[][] = []
  for (let i = 0; i < n; i++) {
    matriksTerbobot[i] = []
    for (let j = 0; j < m; j++) {
      matriksTerbobot[i][j] = kriteria[j].bobot * normalisasi[i][j]
    }
  }

  const Aplus: number[] = []
  const Amin: number[] = []
  for (let j = 0; j < m; j++) {
    const col = matriksTerbobot.map((row) => row[j])
    if (kriteria[j].tipe === 'benefit') {
      Aplus.push(Math.max(...col))
      Amin.push(Math.min(...col))
    } else {
      Aplus.push(Math.min(...col))
      Amin.push(Math.max(...col))
    }
  }

  const Dplus: number[] = []
  const Dmin: number[] = []
  for (let i = 0; i < n; i++) {
    let sumPlus = 0
    let sumMin = 0
    for (let j = 0; j < m; j++) {
      sumPlus += (matriksTerbobot[i][j] - Aplus[j]) ** 2
      sumMin += (matriksTerbobot[i][j] - Amin[j]) ** 2
    }
    Dplus.push(Math.sqrt(sumPlus))
    Dmin.push(Math.sqrt(sumMin))
  }

  const nilai: number[] = []
  for (let i = 0; i < n; i++) {
    nilai.push(Dmin[i] / (Dplus[i] + Dmin[i]))
  }

  const sorted = [...nilai].sort((a, b) => b - a)
  const peringkat = nilai.map((v) => sorted.indexOf(v) + 1)

  const detail: string[][] = []
  detail.push(['Matriks Normalisasi (Rij):'])
  const header = ['Alternatif', ...kriteria.map((k) => k.nama)]
  detail.push(header)
  for (let i = 0; i < n; i++) {
    detail.push([alternatif[i], ...normalisasi[i].map((v) => v.toFixed(4))])
  }

  detail.push([''])
  detail.push(['Matriks Terbobot (Yij):'])
  detail.push(header)
  for (let i = 0; i < n; i++) {
    detail.push([alternatif[i], ...matriksTerbobot[i].map((v) => v.toFixed(4))])
  }

  detail.push([''])
  detail.push(['Solusi Ideal:'])
  detail.push(['', ...kriteria.map((k) => k.nama)])
  detail.push(['A+', ...Aplus.map((v) => v.toFixed(4))])
  detail.push(['A-', ...Amin.map((v) => v.toFixed(4))])

  detail.push([''])
  detail.push(['Jarak dan Preferensi:'])
  detail.push(['Alternatif', 'D+', 'D-', 'Vi', 'Peringkat'])
  for (let i = 0; i < n; i++) {
    detail.push([
      alternatif[i],
      Dplus[i].toFixed(4),
      Dmin[i].toFixed(4),
      nilai[i].toFixed(4),
      String(peringkat[i]),
    ])
  }

  return { nilai, peringkat, detail }
}
