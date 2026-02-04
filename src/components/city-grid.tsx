import { CityCard, type CityData } from "@/components/city-card";
import { Search } from "lucide-react";

interface CityGridProps {
  cities: CityData[];
}

export function CityGrid({ cities }: CityGridProps) {
  return (
    <section className="py-8">
      <div className="container">
        {/* Results Count */}
        <div className="mb-6 flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            <span className="font-medium text-foreground">{cities.length}개</span>의
            도시를 찾았습니다
          </p>
        </div>

        {/* Grid or Empty State */}
        {cities.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {cities.map((city) => (
              <CityCard key={city.rank} city={city} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <Search className="mb-4 h-16 w-16 text-muted-foreground/50" />
            <h3 className="mb-2 text-lg font-semibold">검색 결과가 없습니다</h3>
            <p className="text-sm text-muted-foreground">
              다른 검색어나 필터 조건을 시도해 보세요.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
