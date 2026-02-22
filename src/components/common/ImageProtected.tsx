/**
 * ImageProtected Component
 * Drop-in replacement for <img> with built-in download protection
 *
 * Usage:
 * <ImageProtected src="/path/to/image.jpg" alt="Description" />
 */

import React from "react";

interface ImageProtectedProps
  extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  [key: string]: any;
}

export const ImageProtected: React.FC<ImageProtectedProps> = ({
  src,
  alt,
  className = "",
  ...props
}) => {
  return (
    <img
      src={src}
      alt={alt}
      data-protected="true"
      className={`protected-image ${className}`}
      onContextMenu={(e) => e.preventDefault()}
      onDragStart={(e) => e.preventDefault()}
      style={{
        userSelect: "none",
        WebkitUserSelect: "none",
        ...props.style,
      }}
      {...props}
    />
  );
};
