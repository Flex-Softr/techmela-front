export default function ShopLoading() {
  return (
    <div className="container mx-auto px-4 py-6">
      <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-6">
        {/* LEFT: Filters skeleton */}
        <aside className="space-y-6 mt-20 hidden lg:block">
          <div className="h-6 w-32 rounded bg-gray-200 animate-pulse" />

          {/* Price filter */}
          <div className="space-y-3">
            <div className="h-4 w-24 rounded bg-gray-200 animate-pulse" />
            <div className="h-10 w-full rounded bg-gray-200 animate-pulse" />
          </div>

          {/* Category filter */}
          <div className="space-y-3">
            <div className="h-4 w-28 rounded bg-gray-200 animate-pulse" />
            {[...Array(10)].map((_, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className="h-4 w-4 rounded bg-gray-200 animate-pulse" />
                <div className="h-3 w-24 rounded bg-gray-200 animate-pulse" />
              </div>
            ))}
          </div>

          <div className="h-10 w-full rounded bg-gray-200 animate-pulse" />
        </aside>

        {/* RIGHT: Products skeleton */}
        <section>
          {/* Categories row */}
          <div className="mb-10 text-center">
            {/* Title */}
            <div className="mx-auto h-6 w-40 rounded bg-gray-200 animate-pulse" />

            {/* Subtitle */}
            <div className="mx-auto mt-3 h-4 w-64 rounded bg-gray-200 animate-pulse" />

            {/* Category cards */}
            <div className="mt-4 flex gap-6 justify-center overflow-hidden">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="flex flex-col items-center gap-3">
                  {/* Image */}
                  <div className="relative h-20 w-20 rounded bg-gray-200 animate-pulse"></div>

                  {/* Label */}
                  <div className="h-3 w-20 rounded bg-gray-200 animate-pulse" />
                </div>
              ))}
            </div>
          </div>

          {/* Product grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="rounded-xl border border-gray-200 p-3 space-y-3"
              >
                {/* Image */}
                <div className="h-48 w-full rounded bg-gray-200 animate-pulse"></div>

                {/* Title */}
                <div className="h-4 w-3/4 rounded bg-gray-200 animate-pulse" />

                {/* Price */}
                <div className="h-4 w-1/2 rounded bg-gray-200 animate-pulse" />

                {/* Button */}
                <div className="h-10 w-full rounded-lg bg-gray-200 animate-pulse" />
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
