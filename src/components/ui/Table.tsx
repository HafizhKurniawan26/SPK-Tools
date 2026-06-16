import { cn } from '@/utils/cn'

export interface TableColumn<T> {
  key: string
  label: string
  render?: (item: T, index: number) => React.ReactNode
  className?: string
}

interface TableProps<T> {
  columns: TableColumn<T>[]
  data: T[]
  className?: string
}

export function Table<T extends Record<string, unknown>>({ columns, data, className }: TableProps<T>) {
  return (
    <div className="w-full overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700">
      <table className={cn('w-full text-left text-sm', className)}>
        <thead>
          <tr className="border-b border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-800/50">
            {columns.map((col) => (
              <th
                key={col.key}
                className={cn(
                  'sticky top-0 whitespace-nowrap px-4 py-3 font-medium text-gray-700 dark:text-gray-300',
                  col.className
                )}
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
          {data.map((item, index) => (
            <tr
              key={index}
              className="hover:bg-gray-50 dark:hover:bg-gray-800/30"
            >
              {columns.map((col) => (
                <td key={col.key} className={cn('whitespace-nowrap px-4 py-3', col.className)}>
                  {col.render ? col.render(item, index) : String(item[col.key] ?? '')}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
