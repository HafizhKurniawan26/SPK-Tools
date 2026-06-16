import { Card, CardContent } from '@/components/ui/Card'

interface MethodExplanationProps {
  teori: string
  kelebihan: string[]
  kekurangan: string[]
}

export function MethodExplanation({ teori, kelebihan, kekurangan }: MethodExplanationProps) {
  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-6">
          <h3 className="mb-3 text-lg font-semibold text-gray-900 dark:text-gray-100">
            Teori & Konsep
          </h3>
          <p className="leading-relaxed text-gray-700 dark:text-gray-300">{teori}</p>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardContent className="p-6">
            <h3 className="mb-3 text-lg font-semibold text-green-700 dark:text-green-400">
              Kelebihan
            </h3>
            <ul className="space-y-2">
              {kelebihan.map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
                  <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-green-500" />
                  {item}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="mb-3 text-lg font-semibold text-red-700 dark:text-red-400">
              Kekurangan
            </h3>
            <ul className="space-y-2">
              {kekurangan.map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
                  <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-red-500" />
                  {item}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
