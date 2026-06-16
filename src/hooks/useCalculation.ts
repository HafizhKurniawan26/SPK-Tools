import { useCallback, useState } from 'react'
import { useSPKStore } from '@/store/useSPKStore'
import { hitungSAW } from '@/lib/methods/saw'
import { hitungMOORA } from '@/lib/methods/moora'
import { hitungProfileMatching } from '@/lib/methods/profileMatching'
import { hitungSMART } from '@/lib/methods/smart'
import { hitungTOPSIS } from '@/lib/methods/topsis'
import type { HasilPerhitungan } from '@/types'

export function useCalculation() {
  const [isCalculating, setIsCalculating] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { alternatif, kriteria, matriks, setHasil } = useSPKStore()

  const hitungSemua = useCallback(async () => {
    setIsCalculating(true)
    setError(null)

    try {
      const altNames = alternatif.map((a) => a.nama)
      const kriteriaData = kriteria.map((k) => ({
        nama: k.nama,
        tipe: k.tipe,
        bobot: k.bobot,
      }))

      await new Promise((r) => setTimeout(r, 100))

      const hasil: HasilPerhitungan = {
        saw: hitungSAW(altNames, kriteriaData, matriks),
        moora: hitungMOORA(altNames, kriteriaData, matriks),
        profileMatching: hitungProfileMatching(altNames, kriteriaData, matriks),
        smart: hitungSMART(altNames, kriteriaData, matriks),
        topsis: hitungTOPSIS(altNames, kriteriaData, matriks),
      }

      setHasil(hasil)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Terjadi kesalahan saat kalkulasi')
    } finally {
      setIsCalculating(false)
    }
  }, [alternatif, kriteria, matriks, setHasil])

  return { isCalculating, error, hitungSemua }
}
