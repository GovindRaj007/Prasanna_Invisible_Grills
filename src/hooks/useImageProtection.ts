/**
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
      e.preventDefault();
      return false;
    });

    // Disable drag
    imgElement.addEventListener("dragstart", (e) => {
      e.preventDefault();
      return false;
    });

    // Disable mouse down for extra protection
    imgElement.addEventListener("mousedown", (e) => {
      if (e.button === 2) {
        // right-click
        e.preventDefault();
        return false;
      }
    });

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
    });
  };

  /**
   * Watch for dynamically added images and protect them
   */
  const observeNewImages = () => {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === "childList") {
          mutation.addedNodes.forEach((node) => {
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
            }
          });
        }
      });
    });

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
