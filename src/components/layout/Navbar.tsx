import { Link, useLocation } from 'react-router-dom'
import { BarChart3, Menu, X } from 'lucide-react'
import { cn } from '@/utils/cn'
import { NAV_ITEMS } from '@/utils/constants'
import * as Icons from 'lucide-react'
import type { ComponentType } from 'react'

interface NavbarProps {
  sidebarOpen: boolean
  onToggleSidebar: () => void
}

export function Navbar({ sidebarOpen, onToggleSidebar }: NavbarProps) {
  const location = useLocation()

  return (
    <nav className="sticky top-0 z-40 border-b border-gray-200 bg-white/80 backdrop-blur-md dark:border-gray-700 dark:bg-gray-900/80">
      <div className="flex h-16 items-center justify-between px-4 lg:px-6">
        <div className="flex items-center gap-3">
          <button
            onClick={onToggleSidebar}
            className="rounded-lg p-1.5 text-gray-500 hover:bg-gray-100 lg:hidden dark:hover:bg-gray-800"
          >
            {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
          <Link to="/" className="flex items-center gap-2">
            <BarChart3 className="h-8 w-8 text-primary-600" />
            <span className="hidden text-xl font-bold text-gray-900 sm:block dark:text-white">
              SPK Tools
            </span>
          </Link>
        </div>

        <div className="hidden items-center gap-1 md:flex">
          {NAV_ITEMS.map((item) => {
            const IconComponent = (Icons as unknown as Record<string, ComponentType<{ className?: string }>>)[item.icon]
            const isActive = location.pathname === item.path
            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  'flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-primary-50 text-primary-700 dark:bg-primary-950 dark:text-primary-300'
                    : 'text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800'
                )}
              >
                {IconComponent && <IconComponent className="h-4 w-4" />}
                {item.label}
              </Link>
            )
          })}
        </div>

        <div className="flex items-center gap-2" />
      </div>
    </nav>
  )
}
