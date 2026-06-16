import { Link, useLocation } from 'react-router-dom'
import { cn } from '@/utils/cn'
import { NAV_ITEMS } from '@/utils/constants'
import * as Icons from 'lucide-react'
import type { ComponentType } from 'react'

export function MobileNav() {
  const location = useLocation()

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-gray-200 bg-white px-2 pb-safe dark:border-gray-700 dark:bg-gray-900 md:hidden">
      <div className="flex items-center justify-around">
        {NAV_ITEMS.map((item) => {
          const IconComponent = (Icons as unknown as Record<string, ComponentType<{ className?: string }>>)[item.icon]
          const isActive = location.pathname === item.path
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                'flex flex-col items-center gap-1 px-3 py-2 text-xs font-medium transition-colors',
                isActive
                  ? 'text-primary-600 dark:text-primary-400'
                  : 'text-gray-500 dark:text-gray-400'
              )}
            >
              {IconComponent && <IconComponent className="h-5 w-5" />}
              {item.label}
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
