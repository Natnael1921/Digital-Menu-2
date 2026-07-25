export function CategorySkeleton() {
  return (
    <div className="flex gap-2 px-4 py-3 overflow-x-auto hide-scroll">
      {Array.from({ length: 7 }).map((_, i) => (
        <div key={i} className="flex-shrink-0 w-[88px] h-[84px] skeleton rounded-2xl opacity-30" />
      ))}
    </div>
  )
}

export function FoodGridSkeleton({ count = 6 }) {
  return (
    <div className="space-y-12">
      {[0, 1].map((section) => (
        <div key={section}>
          <div className="flex items-center gap-3 mb-5">
            <div className="skeleton w-32 h-7 rounded-lg opacity-40" />
            <div className="flex-1 h-px bg-border" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {Array.from({ length: count }).map((_, i) => (
              <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-card">
                <div className="skeleton aspect-food" />
                <div className="p-4 space-y-2">
                  <div className="skeleton w-3/4 h-4 rounded opacity-40" />
                  <div className="skeleton w-full h-3 rounded opacity-30" />
                  <div className="skeleton w-full h-3 rounded opacity-30" />
                  <div className="flex justify-between mt-4">
                    <div className="skeleton w-20 h-5 rounded opacity-40" />
                    <div className="skeleton w-16 h-8 rounded-full opacity-30" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
