import { useParams, Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Card, CardContent } from '@/components/ui/Card'
import { MethodExplanation } from '@/components/metode/MethodExplanation'
import { MethodFormula } from '@/components/metode/MethodFormula'
import { METODE_LIST, METODE_DETAIL, CONTOH_DATA } from '@/utils/constants'
import { hitungSAW } from '@/lib/methods/saw'
import { hitungMOORA } from '@/lib/methods/moora'
import { hitungProfileMatching } from '@/lib/methods/profileMatching'
import { hitungSMART } from '@/lib/methods/smart'
import { hitungTOPSIS } from '@/lib/methods/topsis'
import { cn } from '@/utils/cn'

export function MetodeDetailPage() {
  const { nama } = useParams<{ nama: string }>()

  const metode = METODE_LIST.find(
    (m) => m.path === `/metode/${nama}`
  )

  if (!metode) {
    return (
      <div className="py-16 text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          Metode Tidak Ditemukan
        </h2>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Metode dengan nama "{nama}" tidak tersedia
        </p>
        <Link to="/" className="mt-4 inline-block">
          <Button variant="outline" icon={ArrowLeft}>
            Kembali ke Beranda
          </Button>
        </Link>
      </div>
    )
  }

  const detail = METODE_DETAIL[metode.id]
  if (!detail) return null

  const kriteriaData = CONTOH_DATA.kriteria.map((k) => ({
    nama: k.nama,
    tipe: k.tipe,
    bobot: k.bobot,
  }))

  const contohHasil = (() => {
    switch (metode.id) {
      case 'saw': return hitungSAW(CONTOH_DATA.alternatif, kriteriaData, CONTOH_DATA.matriks)
      case 'moora': return hitungMOORA(CONTOH_DATA.alternatif, kriteriaData, CONTOH_DATA.matriks)
      case 'profileMatching': return hitungProfileMatching(CONTOH_DATA.alternatif, kriteriaData, CONTOH_DATA.matriks)
      case 'smart': return hitungSMART(CONTOH_DATA.alternatif, kriteriaData, CONTOH_DATA.matriks)
      case 'topsis': return hitungTOPSIS(CONTOH_DATA.alternatif, kriteriaData, CONTOH_DATA.matriks)
      default: return null
    }
  })()

  return (
    <div className="flex gap-8">
      <div className="hidden w-56 flex-shrink-0 lg:block">
        <div className="sticky top-20 space-y-1">
          <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
            Metode Lainnya
          </p>
          {METODE_LIST.map((m) => (
            <Link
              key={m.id}
              to={m.path}
              className={cn(
                'block rounded-lg px-3 py-2 text-sm transition-colors',
                m.id === metode.id
                  ? 'bg-primary-50 font-medium text-primary-700 dark:bg-primary-950 dark:text-primary-300'
                  : 'text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800'
              )}
            >
              {m.nama}
            </Link>
          ))}
        </div>
      </div>

      <div className="min-w-0 flex-1 space-y-8">
        <div>
          <Link
            to="/"
            className="mb-4 inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
          >
            <ArrowLeft className="h-4 w-4" />
            Kembali
          </Link>
          <h1 className="mt-2 text-3xl font-bold text-gray-900 dark:text-gray-100">
            Metode {metode.nama}
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            {metode.deskripsi}
          </p>
        </div>

        <MethodExplanation
          teori={detail.teori}
          kelebihan={detail.kelebihan}
          kekurangan={detail.kekurangan}
        />

        <MethodFormula rumus={detail.rumus} />

        {contohHasil && (
          <Card>
            <CardContent className="p-6">
              <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-gray-100">
                Contoh Perhitungan dengan Data Demo
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="border-b border-gray-200 dark:border-gray-700">
                      <th className="px-3 py-2 font-medium text-gray-600 dark:text-gray-400">Alternatif</th>
                      <th className="px-3 py-2 font-medium text-gray-600 dark:text-gray-400">Nilai Akhir</th>
                      <th className="px-3 py-2 font-medium text-gray-600 dark:text-gray-400">Peringkat</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {CONTOH_DATA.alternatif.map((alt, i) => (
                      <tr key={i}>
                        <td className="px-3 py-2 text-gray-900 dark:text-gray-100">{alt}</td>
                        <td className="px-3 py-2 text-gray-600 dark:text-gray-400">
                          {contohHasil.nilai[i].toFixed(4)}
                        </td>
                        <td className="px-3 py-2">
                          <span className="font-medium text-gray-900 dark:text-gray-100">
                            {contohHasil.peringkat[i]}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
