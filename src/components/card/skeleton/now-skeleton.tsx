import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'

import CardElement from '../card-element'

export default function NowSkeleton() {
  return (
    <CardElement title="Now">
      <Skeleton className="h-5 w-40" />
      <Skeleton className="h-5 w-48 mt-4" />
      <Skeleton className="h-3 w-40 mt-4" />
      <Separator className="mt-4" />

      <Skeleton className="h-5 w-34 mt-4" />
      <Skeleton className="h-5 w-32 mt-4" />
      <Separator className="mt-4" />

      <div className="flex mt-2 justify-between gap-1">
        <Skeleton className="h-12 w-12 " />
        <Skeleton className="h-12 w-12 " />
      </div>
    </CardElement>
  )
}
