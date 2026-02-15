/**
 * Accessibility Configuration
 * 
 * Respects user's motion preferences
 * Users with vestibular disorders, epilepsy, or other motion sensitivities
 * will have animations disabled if they've set prefers-reduced-motion
 */

import { ReactNode } from "react";

interface AccessibilityProps {
  children: ReactNode;
}

/**
 * CSS for the main stylesheet to support reduced motion:
 * 
 * @media (prefers-reduced-motion: reduce) {
 *   * {
 *     animation: none !important;
 *     transition: none !important;
 *   }
 * }
 */

export function AccessibilityProvider({ children }: AccessibilityProps) {
  // Check if user prefers reduced motion
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  // Add class to document if reduced motion is preferred
  if (prefersReducedMotion) {
    document.documentElement.classList.add("prefers-reduced-motion");
  }

  return <>{children}</>;
}

/**
 * Hook to check if user prefers reduced motion
 * 
 * Usage:
 * const { prefersReducedMotion } = usePrefersReducedMotion();
 * if (!prefersReducedMotion) {
 *   // Apply animations
 * }
 */
export function usePrefersReducedMotion() {
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  return { prefersReducedMotion };
}
