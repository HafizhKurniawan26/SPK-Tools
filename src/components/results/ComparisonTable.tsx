import { Badge } from '@/components/ui/Badge'
import type { HasilPerhitungan } from '@/types'

interface ComparisonTableProps {
  alternatif: string[]
  hasil: HasilPerhitungan
}

const METODE_LABELS: Record<string, string> = {
  saw: 'SAW',
  moora: 'MOORA',
  profileMatching: 'PM',
  smart: 'SMART',
  topsis: 'TOPSIS',
}

export function ComparisonTable({ alternatif, hasil }: ComparisonTableProps) {
  const metodeKeys = ['saw', 'moora', 'profileMatching', 'smart', 'topsis'] as const

  const availableMethods = metodeKeys.filter((k) => hasil[k] !== null)

  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-800/50">
            <th className="px-4 py-3 font-medium text-gray-700 dark:text-gray-300">
              Alternatif
            </th>
            {availableMethods.map((key) => (
              <th
                key={key}
                className="px-4 py-3 font-medium text-gray-700 dark:text-gray-300"
              >
                Peringkat {METODE_LABELS[key]}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
          {alternatif.map((alt, i) => (
            <tr key={i} className="hover:bg-gray-50 dark:hover:bg-gray-800/30">
              <td className="px-4 py-3 font-medium text-gray-900 dark:text-gray-100">
                {alt}
              </td>
              {availableMethods.map((key) => {
                const metode = hasil[key]
                const peringkat = metode?.peringkat[i]
                return (
                  <td key={key} className="px-4 py-3">
                    {peringkat === 1 ? (
                      <Badge variant="success">{peringkat}</Badge>
                    ) : (
                      <span className="text-gray-600 dark:text-gray-400">
                        {peringkat}
                      </span>
                    )}
                  </td>
                )
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
