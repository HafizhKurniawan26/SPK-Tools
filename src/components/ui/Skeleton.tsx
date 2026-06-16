import { cn } from '@/utils/cn'

interface SkeletonProps {
  variant?: 'text' | 'card' | 'table-row'
  count?: number
  className?: string
}

export function Skeleton({ variant = 'text', count = 1, className }: SkeletonProps) {
  const items = Array.from({ length: count }, (_, i) => i)

  if (variant === 'table-row') {
    return (
      <div className="space-y-2">
        {items.map((i) => (
          <div key={i} className="flex gap-4">
            <div className="h-4 flex-1 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
            <div className="h-4 flex-1 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
            <div className="h-4 w-24 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
            <div className="h-4 w-20 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
          </div>
        ))}
      </div>
    )
  }

  if (variant === 'card') {
    return (
      <div className="space-y-4">
        {items.map((i) => (
          <div
            key={i}
            className={cn('rounded-xl border border-gray-200 p-6 dark:border-gray-700', className)}
          >
            <div className="mb-4 h-5 w-3/4 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
            <div className="mb-2 h-4 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
            <div className="h-4 w-1/2 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-2">
      {items.map((i) => (
        <div
          key={i}
          className={cn('h-4 animate-pulse rounded bg-gray-200 dark:bg-gray-700', className)}
        />
      ))}
    </div>
  )
}
