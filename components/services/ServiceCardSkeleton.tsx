import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function ServiceCardSkeleton() {
  return (
    <Card className="overflow-hidden h-full flex flex-col justify-between p-5 border-gray-100 shadow-sm animate-pulse">
      <div>
        {/* Header: Category Badge & Location */}
        <CardHeader className="p-0 mb-4 space-y-0">
          <div className="flex items-center justify-between gap-2">
            <Skeleton className="h-7 w-32 rounded-full" />
            <Skeleton className="h-4 w-24 rounded-md" />
          </div>
        </CardHeader>

        {/* Content: Title, Description & Provider */}
        <CardContent className="p-0 space-y-4">
          {/* Title */}
          <div className="space-y-2">
            <Skeleton className="h-6 w-3/4 rounded-md" />
            <Skeleton className="h-6 w-1/2 rounded-md" />
          </div>

          {/* Description Lines */}
          <div className="space-y-2">
            <Skeleton className="h-3 w-full rounded-md" />
            <Skeleton className="h-3 w-5/6 rounded-md" />
          </div>

          {/* Provider */}
          <Skeleton className="h-4 w-36 rounded-md" />
        </CardContent>
      </div>

      {/* Footer: Price & Action Button */}
      <CardFooter className="p-0 pt-4 border-t border-gray-100 flex items-center justify-between mt-6">
        <div className="space-y-1">
          <Skeleton className="h-3 w-10 rounded" />
          <Skeleton className="h-7 w-20 rounded-md" />
        </div>
        <Skeleton className="h-10 w-28 rounded-full" />
      </CardFooter>
    </Card>
  );
}