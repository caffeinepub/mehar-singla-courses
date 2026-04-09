import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  message?: string;
  className?: string;
}

const sizeMap = {
  sm: "size-4",
  md: "size-6",
  lg: "size-10",
};

export function LoadingSpinner({
  size = "md",
  message,
  className,
}: LoadingSpinnerProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-3",
        className,
      )}
    >
      <Loader2
        className={cn("animate-spin text-primary", sizeMap[size])}
        aria-hidden="true"
      />
      {message && (
        <p className="text-sm text-muted-foreground animate-pulse">{message}</p>
      )}
    </div>
  );
}

export function PageLoader({ message = "Loading..." }: { message?: string }) {
  return (
    <div
      className="flex min-h-[60vh] items-center justify-center"
      aria-label={message}
    >
      <LoadingSpinner size="lg" message={message} />
    </div>
  );
}
