import { Skeleton } from "@/components/ui/skeleton";

const ProjectSectionSkeletonCard = () => {
  return (
    <div className="space-y-8">
      <div className="rounded-2xl border border-zinc-800 dark:border-white/50 overflow-hidden">
        <Skeleton className="aspect-[2/.98] bg-zinc-900/50 p-2"></Skeleton>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="rounded-2xl border border-zinc-800 dark:border-white/50 overflow-hidden">
          <Skeleton className="aspect-[2/.98] bg-zinc-900/50 "></Skeleton>
        </div>
        <div className="rounded-2xl border border-zinc-800 dark:border-white/50 overflow-hidden">
          <Skeleton className="aspect-[2/.98] bg-zinc-900/50 "></Skeleton>
        </div>
      </div>
    </div>
  );
};

export default ProjectSectionSkeletonCard;
