import { cn } from "@/utils/cn";

interface ResultTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  tabs: { id: string; label: string }[];
}

export function ResultTabs({ activeTab, onTabChange, tabs }: ResultTabsProps) {
  return (
    <div className="mb-6 flex shrink gap-1 border-b border-gray-200 dark:border-gray-700">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={cn(
            "px-4 py-2.5 text-sm font-medium transition-colors",
            activeTab === tab.id
              ? "border-b-2 border-primary-600 text-primary-600 dark:border-primary-400 dark:text-primary-400"
              : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300",
          )}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
