
import { Skeleton } from "@/components/ui/skeleton";

const ProductDetailSkeleton = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <Skeleton className="h-6 w-80 mb-6" />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div>
          <Skeleton className="h-4 w-32 mb-2" />
          <Skeleton className="h-8 w-64 mb-6" />
          <Skeleton className="aspect-square rounded-lg mb-4" />
          <div className="flex space-x-2 mt-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="w-16 h-16 rounded" />
            ))}
          </div>
          <Skeleton className="h-10 w-48 mt-6" />
        </div>
        
        <div className="space-y-6">
          <div className="flex space-x-8">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-4 w-32" />
          </div>
          
          <div>
            <Skeleton className="h-6 w-24 mb-3" />
            <Skeleton className="h-20 w-full" />
          </div>
          
          <div>
            <Skeleton className="h-5 w-32 mb-2" />
            <div className="flex space-x-2">
              {Array.from({ length: 6 }).map((_, i) => (
                <Skeleton key={i} className="w-10 h-8 rounded" />
              ))}
            </div>
            <Skeleton className="h-4 w-40 mt-2" />
          </div>
          
          <Skeleton className="h-12 w-48" />
          
          <div className="space-y-2">
            <Skeleton className="h-12 w-full rounded" />
            <Skeleton className="h-12 w-full rounded" />
            <Skeleton className="h-12 w-full rounded" />
            <Skeleton className="h-12 w-full rounded" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailSkeleton;
