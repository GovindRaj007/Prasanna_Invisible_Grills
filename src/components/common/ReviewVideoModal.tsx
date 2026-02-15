import { useEffect } from "react";
import { X } from "lucide-react";

interface ReviewVideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoUrl: string;
  posterImage: string;
  title?: string;
}

export function ReviewVideoModal({
  isOpen,
  onClose,
  videoUrl,
  posterImage,
  title = "Customer Review",
}: ReviewVideoModalProps) {
  // Handle Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener("keydown", handleEscape);
      // Prevent background scroll
      document.body.style.overflow = "hidden";
    }

    return () => {
      window.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <>
      <style>{`
        /* Hide download button from video controls */
        video::-webkit-media-controls-download-button {
          display: none;
        }
        video::-moz-media-controls-download-button {
          display: none;
        }
        /* Hide fullscreen button on mobile only */
        @media (max-width: 767px) {
          video::-webkit-media-controls-fullscreen-button {
            display: none;
          }
          video::-moz-media-controls-fullscreen-button {
            display: none;
          }
        }
      `}</style>

      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal */}
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto"
        role="dialog"
        aria-modal="true"
        aria-labelledby="video-modal-title"
      >
        <div className="relative w-full max-w-4xl my-auto">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute -top-10 right-0 z-10 rounded-full p-2 text-white hover:bg-white/20 transition-colors lg:-top-12"
            aria-label="Close video"
          >
            <X className="h-6 w-6 lg:h-8 lg:w-8" />
          </button>

          {/* Video Container - Responsive */}
          <div className="relative w-full bg-black rounded-lg overflow-hidden shadow-2xl" style={{ aspectRatio: "16 / 9", maxHeight: "85vh" }}>
            <video
              controls
              controlsList="nodownload"
              autoPlay
              playsInline
              poster={posterImage}
              className="w-full h-full object-cover"
              aria-label={title}
              preload="metadata"
            >
              <source src={videoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>

          {/* Title */}
          {title && (
            <h2
              id="video-modal-title"
              className="mt-4 text-center text-lg font-semibold text-white lg:text-xl"
            >
              {title}
            </h2>
          )}
        </div>
      </div>
    </>
  );
}
