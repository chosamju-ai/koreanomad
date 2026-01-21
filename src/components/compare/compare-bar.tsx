"use client";

import { useCompare } from "@/hooks/use-compare";
import { cities } from "@/data/cities";
import { CompareCard } from "./compare-card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export function CompareBar() {
  const { compareSlugs, removeFromCompare, clearCompare, compareCount } = useCompare();
  const router = useRouter();

  if (compareCount === 0) {
    return null;
  }

  const compareCities = cities.filter((city) => compareSlugs.includes(city.slug));

  const handleCompare = () => {
    router.push(`/compare?compare=${compareSlugs.join(",")}`);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container py-4">
        <div className="flex items-center gap-4">
          <div className="flex-1 flex items-center gap-3 overflow-x-auto">
            {compareCities.map((city) => (
              <CompareCard
                key={city.slug}
                city={city}
                onRemove={() => removeFromCompare(city.slug)}
              />
            ))}
            {compareCount < 3 && (
              <div className="flex-shrink-0 text-sm text-muted-foreground">
                {3 - compareCount}개 더 추가 가능
              </div>
            )}
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <Button variant="outline" size="sm" onClick={clearCompare}>
              모두 지우기
            </Button>
            <Button
              size="sm"
              onClick={handleCompare}
              disabled={compareCount < 2}
            >
              비교하기 ({compareCount})
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
