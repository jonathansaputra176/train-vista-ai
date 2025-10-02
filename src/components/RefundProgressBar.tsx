import { CheckCircle, Circle, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

interface RefundProgressBarProps {
  currentStatus: "requested" | "verified" | "processing_bank" | "sent" | "completed" | "rejected";
}

const RefundProgressBar = ({ currentStatus }: RefundProgressBarProps) => {
  const steps = [
    { key: "requested", label: "Requested" },
    { key: "verified", label: "Verified" },
    { key: "processing_bank", label: "Bank Processing" },
    { key: "sent", label: "Sent" },
    { key: "completed", label: "Completed" },
  ];

  const statusIndex = steps.findIndex((step) => step.key === currentStatus);
  const isRejected = currentStatus === "rejected";

  return (
    <div className="py-6">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          const isCompleted = index < statusIndex;
          const isCurrent = index === statusIndex;
          const isActive = isCompleted || isCurrent;

          return (
            <div key={step.key} className="flex-1 flex flex-col items-center">
              <div className="flex items-center w-full">
                {/* Icon */}
                <div
                  className={cn(
                    "rounded-full p-2 transition-all",
                    isActive && !isRejected
                      ? "bg-success text-success-foreground"
                      : isRejected && isCurrent
                      ? "bg-destructive text-destructive-foreground"
                      : "bg-muted text-muted-foreground"
                  )}
                >
                  {isCompleted ? (
                    <CheckCircle className="h-5 w-5" />
                  ) : isCurrent ? (
                    <Clock className="h-5 w-5 animate-pulse" />
                  ) : (
                    <Circle className="h-5 w-5" />
                  )}
                </div>

                {/* Line connector */}
                {index < steps.length - 1 && (
                  <div
                    className={cn(
                      "flex-1 h-1 transition-all",
                      isCompleted && !isRejected ? "bg-success" : "bg-muted"
                    )}
                  />
                )}
              </div>

              {/* Label */}
              <span
                className={cn(
                  "text-xs mt-2 text-center",
                  isActive && !isRejected
                    ? "text-success font-semibold"
                    : isRejected && isCurrent
                    ? "text-destructive font-semibold"
                    : "text-muted-foreground"
                )}
              >
                {step.label}
              </span>
            </div>
          );
        })}
      </div>

      {isRejected && (
        <div className="mt-4 p-3 bg-destructive/10 border border-destructive rounded-lg">
          <p className="text-sm text-destructive font-medium">
            Refund request was rejected. Please contact customer support for details.
          </p>
        </div>
      )}
    </div>
  );
};

export default RefundProgressBar;
