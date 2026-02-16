/**
 * Protected Image Component
 * Wraps images with protection against downloading/saving
 * Prevents right-click, drag, and other download attempts
 */

import { ImgHTMLAttributes } from "react";

interface ImageProtectedProps
  extends ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  /** Additional CSS classes */
  className?: string;
  /** Optional message shown on right-click attempt */
  protectionMessage?: string;
}

/**
 * ImageProtected Component
 * Use this instead of <img> for images you want to protect
 * 
 * Example:
 * <ImageProtected 
 *   src="/image.jpg" 
 *   alt="Description"
 *   className="h-64 w-full"
 * />
 */
export function ImageProtected({
  src,
  alt,
  className = "",
  protectionMessage = "Image download is not permitted",
  onContextMenu,
  onDragStart,
  onMouseDown,
  ...props
}: ImageProtectedProps) {
  const handleContextMenu = (e: React.MouseEvent<HTMLImageElement>) => {
    e.preventDefault();
    
    // Show subtle notification (optional)
    if (protectionMessage) {
      // Could integrate with toast library here
      console.warn(protectionMessage);
    }
    
    return false;
  };

  const handleDragStart = (e: React.DragEvent<HTMLImageElement>) => {
    e.preventDefault();
    return false;
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLImageElement>) => {
    // Right-click
    if (e.button === 2) {
      e.preventDefault();
      return false;
    }
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLImageElement>) => {
    // Prevent long-press context menu on mobile
    const img = e.currentTarget;
    const touchTimer = setTimeout(() => {
      e.preventDefault();
    }, 500);

    img.addEventListener("touchend", () => {
      clearTimeout(touchTimer);
    });
  };

  // Add pointer-events: none to prevent right-click menu
  const imageStyle: React.CSSProperties = {
    userSelect: "none",
    WebkitUserSelect: "none",
    WebkitTouchCallout: "none",
    cursor: "default",
  };

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      style={imageStyle}
      data-protected="true"
      onContextMenu={onContextMenu || handleContextMenu}
      onDragStart={onDragStart || handleDragStart}
      onMouseDown={onMouseDown || handleMouseDown}
      onTouchStart={handleTouchStart}
      {...props}
    />
  );
}
