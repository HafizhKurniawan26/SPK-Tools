import { Card, CardContent } from '@/components/ui/Card'

interface MethodFormulaProps {
  rumus: { label: string; formula: string }[]
}

export function MethodFormula({ rumus }: MethodFormulaProps) {
  return (
    <Card>
      <CardContent className="p-6">
        <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-gray-100">
          Rumus Matematika
        </h3>
        <div className="space-y-4">
          {rumus.map((item, i) => (
            <div key={i}>
              <p className="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">
                {item.label}
              </p>
              <div className="overflow-x-auto rounded-lg bg-gray-100 p-4 font-mono text-sm text-gray-800 dark:bg-gray-900 dark:text-gray-200">
                {item.formula}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
