import { Play } from "lucide-react";

interface ReviewVideoPreviewProps {
  posterImage: string;
  onClick: () => void;
  title?: string;
}

export function ReviewVideoPreview({
  posterImage,
  onClick,
  title = "Customer Review",
}: ReviewVideoPreviewProps) {
  return (
    <button
      onClick={onClick}
      className="group relative w-full overflow-hidden rounded-lg transition-all duration-300 hover:shadow-lg"
      aria-label={`Play ${title}`}
      title={title}
    >
      {/* Poster Image */}
      <div className="relative h-32 w-full overflow-hidden rounded-lg bg-gradient-to-br from-gray-800 to-black sm:h-40">
        <img
          src={posterImage}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />

        {/* Play Button Overlay */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/40 transition-all duration-300 group-hover:bg-black/60">
          <div className="relative flex items-center justify-center">
            {/* Animated ring */}
            <svg
              className="absolute h-12 w-12 animate-pulse"
              viewBox="0 0 48 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                cx="24"
                cy="24"
                r="22"
                stroke="currentColor"
                strokeWidth="2"
                className="text-accent/40"
              />
            </svg>

            {/* Play icon */}
            <Play className="relative h-8 w-8 fill-white text-white transition-transform group-hover:scale-110" />
          </div>
        </div>

        {/* Title overlay */}
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-black/60 to-transparent p-3">
          <p className="text-xs font-semibold text-white sm:text-sm">{title}</p>
        </div>
      </div>
    </button>
  );
}
