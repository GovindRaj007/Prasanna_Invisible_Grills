/**
 * Crawlable accordion built on native <details>/<summary>.
 *
 * Unlike Radix Accordion (which removes closed panels from the DOM), every
 * answer stays in the server-rendered HTML, so Google, Bing and AI answer
 * engines can read and quote FAQ content. Same API surface as ui/accordion.
 * `type="single"` uses the native `name` attribute for exclusive open state.
 */
import * as React from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const GroupContext = React.createContext<string | undefined>(undefined);

interface AccordionProps extends React.HTMLAttributes<HTMLDivElement> {
  type?: "single" | "multiple";
  collapsible?: boolean;
}

export function Accordion({ type = "single", collapsible: _collapsible, className, children, ...props }: AccordionProps) {
  const id = React.useId();
  return (
    <GroupContext.Provider value={type === "single" ? `acc-${id}` : undefined}>
      <div className={className} {...props}>
        {children}
      </div>
    </GroupContext.Provider>
  );
}

interface AccordionItemProps extends React.DetailsHTMLAttributes<HTMLDetailsElement> {
  value: string;
  defaultOpen?: boolean;
}

export function AccordionItem({ value: _value, defaultOpen, className, children, ...props }: AccordionItemProps) {
  const name = React.useContext(GroupContext);
  return (
    <details
      className={cn("group border-b [&_summary::-webkit-details-marker]:hidden", className)}
      {...(name ? { name } : {})}
      open={defaultOpen}
      {...props}
    >
      {children}
    </details>
  );
}

export function AccordionTrigger({ className, children, ...props }: React.HTMLAttributes<HTMLElement>) {
  return (
    <summary
      className={cn(
        "flex cursor-pointer list-none items-center justify-between gap-3 py-4 font-medium transition-all hover:underline",
        className
      )}
      {...props}
    >
      <span className="flex-1">{children}</span>
      <ChevronDown
        className="h-4 w-4 shrink-0 transition-transform duration-200 group-open:rotate-180"
        aria-hidden="true"
      />
    </summary>
  );
}

export function AccordionContent({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className="overflow-hidden text-sm" {...props}>
      <div className={cn("pb-4 pt-0", className)}>{children}</div>
    </div>
  );
}
