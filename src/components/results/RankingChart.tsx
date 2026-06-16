import { Card, CardContent } from '@/components/ui/Card'

interface RankingChartProps {
  alternatif: string[]
  label: string
  nilai: number[]
  peringkat: number[]
}

export function RankingChart({ alternatif, label, nilai, peringkat }: RankingChartProps) {
  const maxNilai = Math.max(...nilai)
  const sortedIndices = alternatif.map((_, i) => i).sort((a, b) => nilai[b] - nilai[a])

  return (
    <Card>
      <CardContent className="p-4">
        <h4 className="mb-4 text-sm font-semibold text-gray-700 dark:text-gray-300">
          Grafik {label}
        </h4>
        <div className="space-y-3">
          {sortedIndices.map((i) => {
            const percent = (nilai[i] / maxNilai) * 100
            return (
              <div key={i}>
                <div className="mb-1 flex items-center justify-between text-xs">
                  <span className="font-medium text-gray-700 dark:text-gray-300">
                    {alternatif[i]}
                  </span>
                  <span className="text-gray-500 dark:text-gray-400">
                    {nilai[i].toFixed(4)} (Peringkat {peringkat[i]})
                  </span>
                </div>
                <div className="h-5 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
                  <div
                    className="flex h-full items-center justify-end rounded-full bg-gradient-to-r from-primary-400 to-primary-600 px-2 text-xs font-medium text-white transition-all duration-500"
                    style={{ width: `${percent}%` }}
                  >
                    {percent > 15 && nilai[i].toFixed(2)}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
