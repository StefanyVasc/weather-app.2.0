import { Skeleton } from '@/components/ui/skeleton'

export function ForecastSkeleton() {
  return (
    <div className="mb-3 flex items-center justify-between rounded-xl border bg-card p-3 text-card-foreground shadow">
      <div className="flex items-center">
        <Skeleton className="h-12 w-12 rounded-full my-5" />

        <div className="flex flex-col flex-wrap gap-3 ">
          <div className="ml-3 flex flex-col gap-3">
            <div className="flex gap-2">
              <Skeleton className="h-5 w-20" />

              <Skeleton className="h-5 w-16" />
            </div>

            <Skeleton className="h-5 w-40" />

            <Skeleton className="h-5 w-32" />
          </div>
        </div>
      </div>
    </div>
  )
}
