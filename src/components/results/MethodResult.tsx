import { Award } from 'lucide-react'
import { Badge } from '@/components/ui/Badge'
import type { MetodeHasil } from '@/types'

interface MethodResultProps {
  alternatif: string[]
  hasil: MetodeHasil
  metodeNama: string
}

export function MethodResult({ alternatif, hasil, metodeNama }: MethodResultProps) {
  const sortedIndices = alternatif.map((_, i) => i)
  sortedIndices.sort((a, b) => hasil.peringkat[a] - hasil.peringkat[b])

  return (
    <div className="space-y-4">
      <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-800/50">
              <th className="px-4 py-3 font-medium text-gray-700 dark:text-gray-300">Peringkat</th>
              <th className="px-4 py-3 font-medium text-gray-700 dark:text-gray-300">Alternatif</th>
              <th className="px-4 py-3 font-medium text-gray-700 dark:text-gray-300">
                Nilai Akhir ({metodeNama})
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {sortedIndices.map((i) => (
              <tr
                key={i}
                className="hover:bg-gray-50 dark:hover:bg-gray-800/30"
              >
                <td className="px-4 py-3">
                  {hasil.peringkat[i] === 1 ? (
                    <Badge variant="success" className="flex items-center gap-1">
                      <Award className="h-3.5 w-3.5" />
                      {hasil.peringkat[i]}
                    </Badge>
                  ) : (
                    <span className="text-gray-600 dark:text-gray-400">
                      {hasil.peringkat[i]}
                    </span>
                  )}
                </td>
                <td className="px-4 py-3 font-medium text-gray-900 dark:text-gray-100">
                  {alternatif[i]}
                </td>
                <td className="px-4 py-3 text-gray-600 dark:text-gray-400">
                  {hasil.nilai[i].toFixed(4)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
