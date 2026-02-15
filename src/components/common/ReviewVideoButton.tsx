import { Play } from "lucide-react";

interface ReviewVideoButtonProps {
  onClick: () => void;
  className?: string;
  variant?: "default" | "compact";
}

export function ReviewVideoButton({
  onClick,
  className = "",
  variant = "default",
}: ReviewVideoButtonProps) {
  if (variant === "compact") {
    return (
      <button
        onClick={onClick}
        className={`inline-flex items-center justify-center rounded-lg p-3 bg-gradient-to-br from-accent/90 to-accent hover:from-accent hover:to-accent/90 transition-all duration-300 hover:shadow-lg hover:shadow-accent/20 active:scale-95 ${className}`}
        aria-label="Play customer review video"
        title="Watch Customer Review"
      >
        <Play className="h-5 w-5 text-white fill-white" />
      </button>
    );
  }

  return (
    <button
      onClick={onClick}
      className={`group relative inline-flex items-center gap-3 rounded-lg border-2 border-accent/50 bg-gradient-to-br from-accent/10 to-accent/5 px-5 py-3 font-semibold text-accent transition-all duration-300 hover:border-accent hover:bg-accent/20 hover:shadow-lg hover:shadow-accent/30 active:scale-95 ${className}`}
      aria-label="Play customer review video"
      title="Watch Customer Review"
    >
      {/* Animated play icon with ring effect */}
      <div className="relative flex items-center justify-center">
        <div className="absolute inset-0 rounded-full bg-accent/20 animate-pulse" />
        <Play className="relative h-5 w-5 fill-accent text-accent transition-transform group-hover:scale-110" />
      </div>
      <span className="hidden sm:inline">Watch Review</span>
    </button>
  );
}
