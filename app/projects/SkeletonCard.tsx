import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"


export default function SkeletonCard() {
  return (
    <Card className="overflow-hidden flex flex-col">
      <Skeleton className="w-full h-48" />
      
      <CardContent className="p-6 space-y-4">
        <Skeleton className="h-8 w-3/4" />
        
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
        </div>
        
        <div className="flex flex-wrap gap-2">
          <Skeleton className="h-6 w-16" />
          <Skeleton className="h-6 w-16" />
          <Skeleton className="h-6 w-16" />
          <Skeleton className="h-6 w-16" />
        </div>
      </CardContent>
      
      <CardFooter className="p-6 flex gap-4 mt-auto">
      <button className="w-full border-2 border-blue-500 py-2 hover:bg-blue-500 hover:text-white font-semibold">
          View Project
        </button>
        <button className="w-full border-2 border-blue-500 py-2 hover:bg-blue-500 hover:text-white font-semibold">View Code</button>
      </CardFooter>
    </Card>
  )
}

