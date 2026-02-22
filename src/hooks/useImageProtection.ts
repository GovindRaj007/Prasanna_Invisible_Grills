/**
<<<<<<< HEAD
 * Image Protection Utility
 * Prevents users from downloading/saving images from the website
 * Works on both desktop and mobile devices
 */

export function useImageProtection() {
  /**
   * Add image protection to a specific image element
   * Prevents right-click, drag, and download attempts
   */
  const protectImage = (imageElement: HTMLImageElement) => {
    if (!imageElement) return;

    // Prevent right-click context menu
    imageElement.addEventListener("contextmenu", (e) => {
=======
 * useImageProtection Hook
 * Provides utilities to protect images from being downloaded or right-clicked
 * Multi-layer protection: JavaScript, CSS, and React components
 */

export const useImageProtection = () => {
  /**
   * Protect a single image element
   */
  const protectImage = (imgElement: HTMLImageElement) => {
    // Disable right-click
    imgElement.addEventListener("contextmenu", (e) => {
>>>>>>> master
      e.preventDefault();
      return false;
    });

<<<<<<< HEAD
    // Prevent drag and drop
    imageElement.addEventListener("dragstart", (e) => {
=======
    // Disable drag
    imgElement.addEventListener("dragstart", (e) => {
>>>>>>> master
      e.preventDefault();
      return false;
    });

<<<<<<< HEAD
    // Prevent mouse down drag
    imageElement.addEventListener("mousedown", (e) => {
      if (e.button === 2) {
=======
    // Disable mouse down for extra protection
    imgElement.addEventListener("mousedown", (e) => {
      if (e.button === 2) {
        // right-click
>>>>>>> master
        e.preventDefault();
        return false;
      }
    });

<<<<<<< HEAD
    // Prevent touch and hold (mobile)
    imageElement.addEventListener("touchstart", (e) => {
      // Prevent long press context menu
      const touch = e.touches[0];
      imageElement.addEventListener("touchend", (endEvent) => {
        if (endEvent.timeStamp - e.timeStamp > 500) {
          e.preventDefault();
        }
      });
    });

    // Add CSS properties to prevent selection
    imageElement.style.userSelect = "none";
    imageElement.style.webkitUserSelect = "none";
    imageElement.style.webkitTouchCallout = "none";
    
    // Prevent image from being saved via inspect element
    imageElement.setAttribute("data-protected", "true");
    imageElement.style.pointerEvents = "none";
    imageElement.style.cursor = "default";
  };

  /**
   * Protect multiple images
   */
  const protectAllImages = (selector = "img[data-protected]") => {
    const images = document.querySelectorAll(selector);
    images.forEach((img) => {
      if (img instanceof HTMLImageElement) {
        protectImage(img);
      }
=======
    // Add CSS class for additional styling protection
    imgElement.classList.add("protected-image");
  };

  /**
   * Protect all images with data-protected attribute
   */
  const protectAllImages = () => {
    const protectedImages = document.querySelectorAll(
      "img[data-protected]"
    ) as NodeListOf<HTMLImageElement>;

    protectedImages.forEach((img) => {
      protectImage(img);
>>>>>>> master
    });
  };

  /**
<<<<<<< HEAD
   * Create a protected image wrapper with overlay
   * Provides additional visual feedback that image is protected
   */
  const createProtectedImageWrapper = (
    imageElement: HTMLImageElement
  ): HTMLDivElement => {
    const wrapper = document.createElement("div");
    wrapper.style.position = "relative";
    wrapper.style.display = "inline-block";
    wrapper.style.width = imageElement.width ? `${imageElement.width}px` : "auto";
    wrapper.style.height = imageElement.height ? `${imageElement.height}px` : "auto";

    // Create invisible overlay to intercept all mouse events
    const overlay = document.createElement("div");
    overlay.style.position = "absolute";
    overlay.style.top = "0";
    overlay.style.left = "0";
    overlay.style.width = "100%";
    overlay.style.height = "100%";
    overlay.style.zIndex = "10";
    overlay.style.cursor = "default";
    overlay.style.backgroundColor = "transparent";

    // Prevent all interactions on overlay
    overlay.addEventListener("contextmenu", (e) => {
      e.preventDefault();
      return false;
    });
    overlay.addEventListener("dragstart", (e) => {
      e.preventDefault();
      return false;
    });
    overlay.addEventListener("mousedown", (e) => {
      if (e.button === 2) {
        e.preventDefault();
        return false;
      }
    });

    wrapper.appendChild(imageElement.cloneNode() as HTMLImageElement);
    wrapper.appendChild(overlay);

    return wrapper;
  };

  return {
    protectImage,
    protectAllImages,
    createProtectedImageWrapper,
  };
}

/**
 * Hook to prevent image downloads globally on page load
 */
export function useGlobalImageProtection() {
  const { protectAllImages } = useImageProtection();

  // Protect all marked images on mount
  if (typeof window !== "undefined") {
    // Wait for DOM to be ready
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", () => {
        protectAllImages("[data-protected]");
      });
    } else {
      protectAllImages("[data-protected]");
    }

    // Also observe for dynamically added images
=======
   * Watch for dynamically added images and protect them
   */
  const observeNewImages = () => {
>>>>>>> master
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === "childList") {
          mutation.addedNodes.forEach((node) => {
<<<<<<< HEAD
            if (
              node instanceof HTMLElement &&
              node.getAttribute("data-protected") === "true"
            ) {
              if (node instanceof HTMLImageElement) {
                const { protectImage } = useImageProtection();
                protectImage(node);
              }
=======
            if (node.nodeType === 1) {
              // Element node
              const element = node as HTMLElement;
              if (
                element.tagName === "IMG" &&
                element.hasAttribute("data-protected")
              ) {
                protectImage(element as HTMLImageElement);
              }

              // Also check children
              const childImages = element.querySelectorAll(
                "img[data-protected]"
              ) as NodeListOf<HTMLImageElement>;
              childImages.forEach((img) => {
                if (!img.classList.contains("protected-image")) {
                  protectImage(img);
                }
              });
>>>>>>> master
            }
          });
        }
      });
    });

<<<<<<< HEAD
    observer.observe(document.body, { childList: true, subtree: true });

    // Cleanup
    return () => {
      observer.disconnect();
    };
  }
}
=======
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: false,
      characterData: false,
    });

    return observer;
  };

  return {
    protectImage,
    protectAllImages,
    observeNewImages,
  };
};
>>>>>>> master
