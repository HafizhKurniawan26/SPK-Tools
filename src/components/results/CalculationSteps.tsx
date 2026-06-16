import { useState } from 'react'
import { ChevronDown, ChevronRight } from 'lucide-react'
import { cn } from '@/utils/cn'

interface CalculationStepsProps {
  detail: string[][]
}

export function CalculationSteps({ detail }: CalculationStepsProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="rounded-lg border border-gray-200 dark:border-gray-700">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between px-4 py-3 text-left text-sm font-medium text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800/50"
      >
        <span>Lihat Langkah Perhitungan</span>
        {isOpen ? (
          <ChevronDown className="h-4 w-4 text-gray-400" />
        ) : (
          <ChevronRight className="h-4 w-4 text-gray-400" />
        )}
      </button>

      {isOpen && (
        <div className="border-t border-gray-200 p-4 dark:border-gray-700">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <tbody>
                {detail.map((row, i) => {
                  const isHeader =
                    row.length === 1 ||
                    (row[0] && !row[0].match(/^\d/) && row[0] === row[0].toUpperCase()) ||
                    row[0] === '' ||
                    row[0]?.startsWith('Tabel') ||
                    row[0]?.startsWith('Nilai') ||
                    row[0]?.startsWith('Solusi') ||
                    row[0]?.startsWith('Jarak') ||
                    row[0]?.startsWith('Bobot') ||
                    row[0]?.startsWith('Matriks')

                  if (row.length <= 1) {
                    const isSectionTitle =
                      row[0] &&
                      (row[0].includes(':') ||
                        row[0] === row[0].toUpperCase() ||
                        row[0] === '')

                    if (isSectionTitle) {
                      return (
                        <tr key={i}>
                          <td
                            colSpan={10}
                            className={cn(
                              'px-3 py-2 font-semibold',
                              row[0] === ''
                                ? 'text-gray-300 dark:text-gray-600'
                                : 'text-primary-700 dark:text-primary-300'
                            )}
                          >
                            {row[0]}
                          </td>
                        </tr>
                      )
                    }
                  }

                  return (
                    <tr
                      key={i}
                      className={cn(
                        isHeader && 'bg-gray-50 font-medium dark:bg-gray-800/50'
                      )}
                    >
                      {row.map((cell, j) => (
                        <td
                          key={j}
                          className={cn(
                            'px-3 py-1.5',
                            isHeader
                              ? 'text-gray-700 dark:text-gray-300'
                              : 'text-gray-600 dark:text-gray-400',
                            j === 0 && 'font-medium'
                          )}
                        >
                          {cell}
                        </td>
                      ))}
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}
