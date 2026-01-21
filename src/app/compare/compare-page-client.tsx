"use client";

import { useCompare } from "@/hooks/use-compare";
import { cities } from "@/data/cities";
import { CompareTable } from "@/components/compare/compare-table";
import { CitySelector } from "@/components/compare/city-selector";
import { Button } from "@/components/ui/button";
import { Share2 } from "lucide-react";
import { toast } from "sonner";

export function ComparePageClient() {
  const { compareSlugs, addToCompare, canAddMore } = useCompare();

  const compareCities = cities.filter((city) => compareSlugs.includes(city.slug));

  const handleShare = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url);
    toast.success("URL이 클립보드에 복사되었습니다");
  };

  const handleAddCity = (slug: string) => {
    const added = addToCompare(slug);
    if (added) {
      toast.success("비교에 추가했습니다");
    } else {
      toast.error("최대 3개까지 비교할 수 있습니다");
    }
  };

  return (
    <main className="flex-1">
      <div className="container py-8">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">도시 비교</h1>
            <p className="mt-2 text-muted-foreground">
              최대 3개의 도시를 선택하여 주요 지표를 비교해보세요
            </p>
          </div>
          {compareCities.length > 0 && (
            <Button variant="outline" className="gap-2" onClick={handleShare}>
              <Share2 className="h-4 w-4" />
              공유
            </Button>
          )}
        </div>

        {compareCities.length === 0 ? (
          <div className="rounded-lg border bg-card p-12 text-center">
            <p className="text-muted-foreground">
              비교할 도시를 선택해주세요
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              홈페이지에서 도시 카드의 &quot;비교 추가&quot; 버튼을 클릭하세요
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Compare Table */}
            <div className="rounded-lg border bg-card p-6">
              <h2 className="mb-4 text-xl font-semibold">비교 결과</h2>
              <p className="mb-4 text-sm text-muted-foreground">
                녹색으로 표시된 항목은 각 지표에서 가장 우수한 값입니다
              </p>
              <CompareTable cities={compareCities} />
            </div>

            {/* City Selector */}
            {canAddMore && (
              <CitySelector
                selectedSlugs={compareSlugs}
                onAdd={handleAddCity}
                canAddMore={canAddMore}
              />
            )}
          </div>
        )}
      </div>
    </main>
  );
}
