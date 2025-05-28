
import { Skeleton } from "@/components/ui/skeleton";

const ProductSkeleton = () => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4">
      <Skeleton className="h-4 w-16 mb-2" />
      <Skeleton className="aspect-square rounded-lg mb-4" />
      <Skeleton className="h-4 w-3/4 mb-2" />
      <div className="flex justify-between items-center">
        <Skeleton className="h-3 w-20" />
        <Skeleton className="h-3 w-16" />
      </div>
    </div>
  );
};

export default ProductSkeleton;
