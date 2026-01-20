import { CityCard } from "@/components/city-card";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { getAllCities } from "@/lib/cities";

export function CityGrid() {
  const mockCities = getAllCities();

  return (
    <section className="py-8">
      <div className="container">
        {/* Results Count */}
        <div className="mb-6 flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            <span className="font-medium text-foreground">{mockCities.length}개</span>의 도시를 찾았습니다
          </p>
        </div>

        {/* Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {mockCities.map((city) => (
            <CityCard key={city.rank} city={city} />
          ))}
        </div>

        {/* Load More */}
        <div className="mt-10 text-center">
          <Button variant="outline" size="lg" className="gap-2">
            더 보기
            <ChevronDown className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
}
