import { Skeleton } from "@/components/ui/skeleton"

export function BlogSkeleton() {
  return (
    <article className="space-y-6 p-4">
      <Skeleton className="h-4 w-36" />
      <Skeleton className="h-12 w-full max-w-xl" />
      <div className="flex items-center gap-3">
        <Skeleton className="h-10 w-10 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-3 w-32" />
        </div>
      </div>
      <Skeleton className="aspect-video w-full max-w-2xl rounded-lg" />
      <Skeleton className="h-10 w-full max-w-md" />
    </article>
  )
}

