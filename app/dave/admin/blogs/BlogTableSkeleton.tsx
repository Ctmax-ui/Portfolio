import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const BlogTableSkeleton = () => {
  return (
    <tr className="hover:bg-gray-50 border-b ">
      <td className="py-1 px-1 w-auto h-auto">
        <Skeleton className="h-9 w-20" />
      </td>
      <td className="py-2 px-2 font-medium text-nowrap">
        <Skeleton className="w-32 h-4" />
      </td>
      <td className="px-4">
        <div className=" flex flex-col">
        <Skeleton className="w-44 h-5 mt-1" /></div>
      </td>
      <td><Skeleton className="w-32 h-4" /></td>
      <td className="">
        <div className=" flex items-center  gap-2">
      <Skeleton className="w-9 h-9" />
      <Skeleton className="w-9 h-9" />
      </div></td>
    </tr>
  );
};

export default BlogTableSkeleton;
