export function PageLoader() {
  return (
    <div className="flex min-h-[50vh] items-center justify-center px-6 py-12">
      <div className="w-full max-w-sm rounded-2xl border border-border/60 bg-card/80 p-6 shadow-sm backdrop-blur">
        <div className="mb-4 h-2.5 w-24 animate-pulse rounded-full bg-primary/20" />
        <div className="mb-3 h-4 w-full animate-pulse rounded bg-muted" />
        <div className="mb-3 h-4 w-5/6 animate-pulse rounded bg-muted" />
        <div className="h-4 w-3/4 animate-pulse rounded bg-muted" />
      </div>
    </div>
  );
}
