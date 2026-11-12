import { ReactNode } from "react";

type DeferredSectionProps = {
  children: ReactNode;
  /** Estimated height used before the section is painted (avoids scrollbar jumps). */
  intrinsicSize?: string;
};

/**
 * Below-the-fold wrapper.
 *
 * Content is ALWAYS rendered into the HTML (so it is prerendered and visible to
 * Google, Bing and AI crawlers that don't scroll or run JS). Rendering cost is
 * deferred by the browser via CSS `content-visibility: auto`, which skips
 * layout/paint of off-screen sections – the same performance benefit without
 * hiding content from crawlers.
 */
export function DeferredSection({ children, intrinsicSize = "auto 900px" }: DeferredSectionProps) {
  return (
    <div style={{ contentVisibility: "auto", containIntrinsicSize: intrinsicSize }}>{children}</div>
  );
}
