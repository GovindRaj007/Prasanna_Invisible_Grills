import { MapPin, Phone, Clock, Navigation } from "lucide-react";
import {
  BRANCHES,
  BUSINESS,
  PHONES,
  Branch,
  branchDirectionsUrl,
  branchFullAddress,
} from "@/config/business";

export function CityBadge({ city, state, size = "sm" }: { city: string; state?: string; size?: "xs" | "sm" }) {
  const pad = size === "xs" ? "px-2 py-0.5 text-[10px]" : "px-2.5 py-1 text-xs";
  return (
    <span className="inline-flex flex-wrap items-center gap-1.5">
      <span
        className={`inline-flex items-center gap-1 rounded-full bg-accent font-semibold uppercase tracking-wide text-white ${pad}`}
      >
        <MapPin className="h-3 w-3" aria-hidden="true" />
        {city}
      </span>
      {state && (
        <span className={`rounded-full border border-white/25 font-medium text-white/80 ${pad}`}>{state}</span>
      )}
    </span>
  );
}

interface BranchCardProps {
  branch: Branch;
  /** "compact" for footer, "card" for contact / location pages */
  variant?: "compact" | "card";
  onSelect?: (b: Branch) => void;
  selected?: boolean;
}

export function BranchCard({ branch, variant = "card", onSelect, selected }: BranchCardProps) {
  if (variant === "compact") {
    return (
      <li className="space-y-1.5">
        <div className="flex flex-wrap items-center gap-2">
          <CityBadge city={branch.city} size="xs" />
          <span className="text-xs font-medium text-primary-foreground/90">{branch.area}</span>
        </div>
        <address className="text-xs not-italic leading-relaxed text-primary-foreground/70">
          {branch.streetAddress}, {branch.city} – {branch.postalCode}
        </address>
        <a
          href={branchDirectionsUrl(branch)}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-xs text-primary hover:underline"
        >
          <Navigation className="h-3 w-3" aria-hidden="true" /> Directions
        </a>
      </li>
    );
  }

  return (
    <article
      id={`branch-${branch.id}`}
      className={`flex h-full flex-col rounded-2xl border bg-gradient-to-br from-[hsl(222,47%,11%)] via-[hsl(217,33%,17%)] to-[hsl(215,25%,22%)] p-5 text-white shadow-lg transition-all ${
        selected ? "border-accent ring-2 ring-accent/60" : "border-white/10"
      }`}
    >
      <div className="mb-3 flex flex-wrap items-center gap-2">
        <CityBadge city={branch.city} state={branch.state} />
      </div>
      <h3 className="mb-2 font-heading text-lg font-semibold">
        {branch.area} Branch
      </h3>
      <address className="mb-4 flex items-start gap-2 text-sm not-italic leading-relaxed text-white/75">
        <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
        <span>{branchFullAddress(branch)}</span>
      </address>
      <div className="mb-2 flex items-start gap-2 text-sm text-white/75">
        <Phone className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
        <span className="flex flex-col">
          <a href={`tel:${PHONES.primary.e164}`} data-track="call" className="hover:text-white">
            {PHONES.primary.display}
          </a>
          <a href={`tel:${PHONES.secondary.e164}`} data-track="call" className="hover:text-white">
            {PHONES.secondary.display}
          </a>
        </span>
      </div>
      <div className="mb-4 flex items-start gap-2 text-sm text-white/75">
        <Clock className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
        <span>{BUSINESS.hours.label}</span>
      </div>
      <div className="mt-auto flex flex-wrap gap-3 border-t border-white/10 pt-4 text-sm">
        <a
          href={branchDirectionsUrl(branch)}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 font-medium text-accent hover:underline"
        >
          <Navigation className="h-4 w-4" aria-hidden="true" /> Get Directions
        </a>
        {onSelect && (
          <button
            type="button"
            onClick={() => onSelect(branch)}
            className="inline-flex items-center gap-1.5 text-white/80 hover:text-white"
            aria-pressed={selected}
          >
            <MapPin className="h-4 w-4" aria-hidden="true" /> Show on map
          </button>
        )}
      </div>
    </article>
  );
}

export function BranchList({
  branches = BRANCHES,
  onSelect,
  selectedId,
}: {
  branches?: Branch[];
  onSelect?: (b: Branch) => void;
  selectedId?: string;
}) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {branches.map((b) => (
        <BranchCard key={b.id} branch={b} onSelect={onSelect} selected={selectedId === b.id} />
      ))}
    </div>
  );
}
