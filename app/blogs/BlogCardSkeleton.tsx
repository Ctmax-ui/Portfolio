import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function BlogSkeletonCard() {
  return (
    <Card className="overflow-hidden h-[460px] flex flex-col">
      <CardContent className="p-0">
        <Skeleton className="w-full aspect-[4/2]" />
      </CardContent>
      <CardContent className="p-4 h-full gap-5 flex flex-col">
        <Skeleton className="h-6 w-full" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-4 w-40 mt-auto" />
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Skeleton className="h-10 w-full" />
      </CardFooter>
    </Card>
  )
}

