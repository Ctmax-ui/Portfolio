import { Card, CardContent, CardFooter } from "@/components/ui/card"


export default function SkeletonCard() {
  return (
    <Card className="overflow-hidden bg-gradient-to-br from-white to-gray-50/50 shadow-xl dark:from-gray-950 dark:to-gray-900/50 border border-black">
      <div className="h-56 bg-gray-200 dark:bg-gray-700 animate-pulse border-b border-black" />
      <CardContent className="p-6">
        <div className="h-7 w-3/4 bg-gray-200 dark:bg-gray-700 animate-pulse mb-2" />
        <div className="h-4 bg-gray-200 dark:bg-gray-700 animate-pulse mb-1" />
        <div className="h-4 bg-gray-200 dark:bg-gray-700 animate-pulse mb-1" />
        <div className="h-4 w-2/3 bg-gray-200 dark:bg-gray-700 animate-pulse mb-6" />
        <div className="flex flex-wrap gap-2">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-6 w-16 bg-gray-200 dark:bg-gray-700 animate-pulse rounded-full" />
          ))}
        </div>
      </CardContent>
      <CardFooter className="grid grid-cols-2 gap-4 p-6 pt-0">
        <div className="h-10 bg-gray-200 dark:bg-gray-700 animate-pulse rounded-md" />
        <div className="h-10 bg-gray-200 dark:bg-gray-700 animate-pulse rounded-md" />
      </CardFooter>
    </Card>
  )
}

