export function SkeletonPlan() {
  return (
    <div className="card-elevated p-6 space-y-4 animate-fade-in">
      <div className="space-y-3">
        <div className="h-6 w-3/4 animate-shimmer rounded" />
        <div className="h-4 w-1/2 animate-shimmer rounded" />
      </div>

      <div className="grid grid-cols-3 gap-4">
        {[1, 2, 3].map(i => (
          <div key={i} className="h-4 animate-shimmer rounded" />
        ))}
      </div>

      <div className="space-y-2">
        <div className="h-4 animate-shimmer rounded" />
        <div className="h-4 w-5/6 animate-shimmer rounded" />
        <div className="h-4 w-4/6 animate-shimmer rounded" />
      </div>

      <div className="pt-4 border-t border-border">
        <div className="h-10 animate-shimmer rounded" />
      </div>
    </div>
  );
}
