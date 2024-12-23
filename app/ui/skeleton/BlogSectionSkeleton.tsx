import { Skeleton } from "@/components/ui/skeleton";
const BlogSectionSkeleton = () => {
  return (
    <div className="rounded-lg p-6 relative border border-zinc-800 bg-zinc-900/50 ">
      <div className="flex items-center gap-4">
        <Skeleton className="aspect-square w-[98px] h-[98px] rounded-lg border bg-slate-200" />
        <div className="flex-1 flex flex-col h-[100px]">
          <Skeleton className="h-4 w-32 absolute right-2 top-1 bg-slate-200" />
          <Skeleton className="h-7 w-3/4 mb-3 bg-slate-100" />
          <Skeleton className="h-6 w-full mb-4 bg-slate-100" />
          <Skeleton className="h-5 w-28 mt-auto bg-slate-100" />
        </div>
      </div>
    </div>
  );
};

export default BlogSectionSkeleton;
