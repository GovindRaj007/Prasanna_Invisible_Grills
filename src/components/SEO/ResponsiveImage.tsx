/**
 * Responsive Image Component
 * Handles lazy loading, WebP support, and responsive srcset
 * Works with optimize-images.js script output
 */

import { ImgHTMLAttributes, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface ResponsiveImageProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'src' | 'alt'> {
  /**
   * Image filename (without path or extension)
   * e.g., "hero-banner" will look for hero-banner.jpg/png in optimized-images
   */
  imageName: string;

  /**
   * Alt text (required for accessibility)
   */
  alt: string;

  /**
   * Use as background image instead of img tag
   */
  asBackground?: boolean;

  /**
   * Container class for background image
   */
  containerClassName?: string;

  /**
   * Enable lazy loading (default: true)
   */
  lazy?: boolean;

  /**
   * Image priority (affects loading)
   */
  priority?: "auto" | "high" | "low";

  /**
   * Sizes attribute for responsive images
   */
  sizes?: string;

  /**
   * Custom srcset override
   */
  srcSet?: string;

  /**
   * Callback when image loads
   */
  onImageLoad?: () => void;

  /**
   * Callback when image fails to load
   */
  onImageError?: (error: Event) => void;

  /**
   * Show loading skeleton
   */
  showSkeleton?: boolean;

  /**
   * Width for aspect ratio calculation
   */
  width?: number;

  /**
   * Height for aspect ratio calculation
   */
  height?: number;

  /**
   * Enable image protection (right-click disabled)
   */
  protected?: boolean;
}

/**
 * Responsive Image Component with WebP support
 */
export function ResponsiveImage({
  imageName,
  alt,
  asBackground = false,
  containerClassName,
  lazy = true,
  priority = "auto",
  sizes = "(max-width: 640px) 100vw, (max-width: 1280px) 80vw, 1200px",
  srcSet,
  onImageLoad,
  onImageError,
  showSkeleton = true,
  width,
  height,
  protected: isProtected = false,
  className,
  ...imgProps
}: ResponsiveImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [imageMetadata, setImageMetadata] = useState<any>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  // Load image metadata
  useEffect(() => {
    const loadMetadata = async () => {
      try {
        const response = await fetch("/image-metadata.json");
        const metadata = await response.json();
        if (metadata[imageName]) {
          setImageMetadata(metadata[imageName]);
        }
      } catch (error) {
        console.warn(`Failed to load metadata for image: ${imageName}`, error);
      }
    };

    loadMetadata();
  }, [imageName]);

  const handleLoad = () => {
    setIsLoaded(true);
    onImageLoad?.();
  };

  const handleError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    setHasError(true);
    onImageError?.(e.nativeEvent);
  };

  const handleContextMenu = (e: React.MouseEvent) => {
    if (isProtected) {
      e.preventDefault();
    }
  };

  // Fallback paths if metadata not available
  const fallbackJpeg = `/optimized-images/${imageName}-1280.jpg`;
  const fallbackWebp = `/optimized-images/${imageName}-1280.webp`;

  // Use provided srcSet or generate from metadata
  const effectiveSrcSet = srcSet || imageMetadata?.srcset || `${fallbackWebp}`;

  // Default sizes if not provided
  const effectiveSizes = sizes || "(max-width: 640px) 100vw, (max-width: 1280px) 80vw, 1200px";

  // Calculate aspect ratio container
  const aspectRatio = width && height ? (height / width) * 100 : undefined;

  if (asBackground) {
    return (
      <div
        className={cn(
          "relative overflow-hidden",
          containerClassName,
          !isLoaded && showSkeleton && "bg-gray-200 animate-pulse"
        )}
        style={aspectRatio ? { paddingBottom: `${aspectRatio}%` } : undefined}
      >
        <img
          ref={imgRef}
          src={fallbackJpeg}
          srcSet={effectiveSrcSet}
          sizes={effectiveSizes}
          alt={alt}
          title={alt}
          loading={lazy ? "lazy" : "eager"}
          decoding={priority === "high" ? "sync" : "async"}
          onLoad={handleLoad}
          onError={handleError}
          onContextMenu={handleContextMenu}
          className={cn(
            "absolute inset-0 w-full h-full object-cover",
            !isLoaded && "opacity-0",
            isLoaded && "transition-opacity duration-300 opacity-100",
            className
          )}
          {...imgProps}
        />
        {hasError && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
            <p className="text-gray-500 text-sm">Image failed to load</p>
          </div>
        )}
      </div>
    );
  }

  return (
    <picture>
      {/* WebP sources */}
      <source
        srcSet={imageMetadata?.srcsetWebp || `${fallbackWebp}`}
        sizes={effectiveSizes}
        type="image/webp"
      />
      {/* JPEG fallback */}
      <img
        ref={imgRef}
        src={fallbackJpeg}
        srcSet={effectiveSrcSet}
        sizes={effectiveSizes}
        alt={alt}
        title={alt}
        loading={lazy ? "lazy" : "eager"}
        decoding={priority === "high" ? "sync" : "async"}
        onLoad={handleLoad}
        onError={handleError}
        onContextMenu={handleContextMenu}
        className={cn(
          "w-full h-auto",
          !isLoaded && showSkeleton && "bg-gray-200 animate-pulse",
          isLoaded && "transition-opacity duration-300",
          hasError && "opacity-50",
          className
        )}
        {...imgProps}
      />
    </picture>
  );
}

/**
 * Optimized hero image component
 */
export function HeroImage({
  imageName,
  alt,
  ...props
}: Omit<ResponsiveImageProps, "sizes" | "priority">) {
  return (
    <ResponsiveImage
      imageName={imageName}
      alt={alt}
      priority="high"
      sizes="100vw"
      {...props}
    />
  );
}

/**
 * Optimized thumbnail component
 */
export function ThumbnailImage({
  imageName,
  alt,
  ...props
}: Omit<ResponsiveImageProps, "sizes" | "priority">) {
  return (
    <ResponsiveImage
      imageName={imageName}
      alt={alt}
      priority="low"
      sizes="(max-width: 640px) 50vw, (max-width: 1280px) 33vw, 250px"
      {...props}
    />
  );
}

/**
 * Optimized OG image component
 */
export function OGImage({
  imageName,
  alt,
}: {
  imageName: string;
  alt: string;
}) {
  return (
    <div className="hidden">
      <img
        src={`/optimized-images/${imageName}-1280.webp`}
        alt={alt}
        loading="lazy"
      />
    </div>
  );
}

/**
 * Image with fallback
 */
export function ImageWithFallback({
  imageName,
  alt,
  fallbackSrc,
  ...props
}: ResponsiveImageProps & { fallbackSrc?: string }) {
  const [error, setError] = useState(false);

  if (error && fallbackSrc) {
    return (
      <img
        src={fallbackSrc}
        alt={alt}
        onError={() => setError(true)}
        className={props.className}
      />
    );
  }

  return (
    <ResponsiveImage
      imageName={imageName}
      alt={alt}
      onImageError={() => setError(true)}
      {...props}
    />
  );
}

/**
 * Lazy load images in viewport
 */
export function LazyImageGallery({
  images,
  className,
}: {
  images: Array<{ imageName: string; alt: string }>;
  className?: string;
}) {
  return (
    <div className={cn("grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4", className)}>
      {images.map((image, idx) => (
        <ResponsiveImage
          key={idx}
          imageName={image.imageName}
          alt={image.alt}
          lazy
          priority="low"
        />
      ))}
    </div>
  );
}
