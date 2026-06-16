import { cn } from "@/utils/cn";
import { Check } from "lucide-react";

interface StepIndicatorProps {
  steps: string[];
  currentStep: number;
}

export function StepIndicator({ steps, currentStep }: StepIndicatorProps) {
  return (
    <div className="w-full mb-6 sm:mb-8">
      <div className="flex items-center justify-between">
        {steps.map((label, index) => {
          const stepNum = index + 1;
          const isActive = stepNum === currentStep;
          const isCompleted = stepNum < currentStep;

          return (
            <div key={label} className="flex flex-1 items-center">
              <div className="flex flex-col items-center">
                <div
                  className={cn(
                    "flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-full text-xs sm:text-sm font-bold transition-colors flex-shrink-0",
                    isActive && "bg-primary-600 text-white",
                    isCompleted && "bg-green-500 text-white",
                    !isActive &&
                      !isCompleted &&
                      "bg-gray-200 text-gray-500 dark:bg-gray-700 dark:text-gray-400",
                  )}
                >
                  {isCompleted ? (
                    <Check className="h-4 w-4 sm:h-5 sm:w-5" />
                  ) : (
                    stepNum
                  )}
                </div>
                <span
                  className={cn(
                    "mt-1 sm:mt-2 text-[10px] sm:text-xs font-medium text-center",
                    isActive && "text-primary-600 dark:text-primary-400",
                    isCompleted && "text-green-600 dark:text-green-400",
                    !isActive &&
                      !isCompleted &&
                      "text-gray-500 dark:text-gray-400",
                  )}
                >
                  <span className="inline">{label}</span>
                  {/* <span className="xs:hidden">
                    {label.split(" ")[0]}
                    {label.includes(" ") && "..."}
                  </span> */}
                </span>
              </div>
              {index < steps.length - 1 && (
                <div
                  className={cn(
                    "mx-1 sm:mx-2 mt-[-1rem] sm:mt-[-1.5rem] h-0.5 flex-1 min-w-[8px]",
                    isCompleted
                      ? "bg-green-500"
                      : "bg-gray-200 dark:bg-gray-700",
                  )}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
