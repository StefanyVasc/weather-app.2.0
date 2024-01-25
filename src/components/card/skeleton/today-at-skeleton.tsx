import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { Skeleton } from '@/components/ui/skeleton'

export default function TodayAtSkeleton() {
  return (
    <ScrollArea className="col-span-4  cursor-pointer whitespace-nowrap rounded-md border p-4">
      <div className="flex w-max space-x-4 p-4">
        <div className="flex w-[150px] flex-col items-center rounded-xl border bg-card p-4 text-card-foreground shadow">
          <Skeleton className="h-5 w-[100px]" />
          <Skeleton className="h-12 w-12 rounded-full my-5" />
          <Skeleton className="h-5 w-[100px]" />
        </div>
        <div className="flex w-[150px] flex-col items-center rounded-xl border bg-card p-4 text-card-foreground shadow">
          <Skeleton className="h-5 w-[100px]" />
          <Skeleton className="h-12 w-12 rounded-full my-5" />
          <Skeleton className="h-5 w-[100px]" />
        </div>
        <div className="flex w-[150px] flex-col items-center rounded-xl border bg-card p-4 text-card-foreground shadow">
          <Skeleton className="h-5 w-[100px]" />
          <Skeleton className="h-12 w-12 rounded-full my-5" />
          <Skeleton className="h-5 w-[100px]" />
        </div>
        <div className="flex w-[150px] flex-col items-center rounded-xl border bg-card p-4 text-card-foreground shadow">
          <Skeleton className="h-5 w-[100px]" />
          <Skeleton className="h-12 w-12 rounded-full my-5" />
          <Skeleton className="h-5 w-[100px]" />
        </div>
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  )
}
