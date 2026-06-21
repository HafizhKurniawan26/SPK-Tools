import { Link, useLocation } from "react-router-dom";
import { cn } from "@/utils/cn";
import { METODE_LIST } from "@/utils/constants";
import * as Icons from "lucide-react";
import type { ComponentType } from "react";

interface SidebarProps {
  isOpen: boolean;
}

export function Sidebar({ isOpen }: SidebarProps) {
  const location = useLocation();

  return (
    <aside
      className={cn(
        "fixed inset-y-0 left-0 z-30 w-64 transform border-r border-gray-200 bg-white pt-16 transition-transform duration-300 ease-in-out dark:border-gray-700 dark:bg-gray-900 lg:relative lg:translate-x-0 lg:pt-0",
        isOpen ? "translate-x-0" : "-translate-x-full",
      )}
    >
      <div className="flex h-full flex-col overflow-y-auto p-4">
        <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
          Metode SPK
        </h3>
        <nav className="flex flex-col gap-1">
          {METODE_LIST.map((metode) => {
            const IconComponent = (
              Icons as unknown as Record<
                string,
                ComponentType<{ className?: string }>
              >
            )[metode.icon];
            const isActive = location.pathname === metode.path;
            return (
              <Link
                key={metode.id}
                to={metode.path}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-primary-50 text-primary-700 dark:bg-primary-950 dark:text-primary-300"
                    : "text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800",
                )}
              >
                <div>
                  <div>{metode.nama}</div>
                  <div className="text-xs font-normal text-gray-400 dark:text-gray-500">
                    {metode.deskripsi}
                  </div>
                </div>
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
