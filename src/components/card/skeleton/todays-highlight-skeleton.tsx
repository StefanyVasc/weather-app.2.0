import { Skeleton } from '@/components/ui/skeleton'

export default function TodaysHighlightSkeleton() {
  return (
    <div className="col-span-1">
      <Skeleton className="h-5 w-[140px]" />

      <div className="flex items-center mt-4 border p-1 w-40 rounded-lg ">
        <Skeleton className="h-12 w-12 rounded-full my-5" />
        <Skeleton className="ml-2 h-5 w-[80px]" />
      </div>
    </div>
  )
}
