import { CityCard, type CityData } from "@/components/city-card";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

// Mock data for cities
const mockCities: CityData[] = [
  {
    rank: 1,
    name: "서울 강남구",
    nameEn: "Seoul, Gangnam",
    image: "https://images.unsplash.com/photo-1538485399081-7191377e8241?w=800&q=80",
    internetSpeed: 832,
    temperature: 12,
    monthlyCost: 1850000,
    rating: 4.7,
    reviewCount: 312,
    cafeCount: 156,
    coworkingCount: 23,
    transport: "excellent",
  },
  {
    rank: 2,
    name: "제주 서귀포",
    nameEn: "Jeju, Seogwipo",
    image: "https://images.unsplash.com/photo-1579169825453-7f5f4f3c3e3c?w=800&q=80",
    internetSpeed: 245,
    temperature: 15,
    monthlyCost: 1200000,
    rating: 4.9,
    reviewCount: 189,
    cafeCount: 89,
    coworkingCount: 7,
    transport: "average",
  },
  {
    rank: 3,
    name: "부산 해운대",
    nameEn: "Busan, Haeundae",
    image: "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=800&q=80",
    internetSpeed: 512,
    temperature: 14,
    monthlyCost: 1350000,
    rating: 4.6,
    reviewCount: 245,
    cafeCount: 112,
    coworkingCount: 15,
    transport: "good",
  },
  {
    rank: 4,
    name: "강릉시",
    nameEn: "Gangneung",
    image: "https://images.unsplash.com/photo-1569074187119-c87815b476da?w=800&q=80",
    internetSpeed: 312,
    temperature: 10,
    monthlyCost: 950000,
    rating: 4.5,
    reviewCount: 156,
    cafeCount: 67,
    coworkingCount: 5,
    transport: "average",
  },
  {
    rank: 5,
    name: "전주 한옥마을",
    nameEn: "Jeonju, Hanok Village",
    image: "https://images.unsplash.com/photo-1534274867514-d5b47ef89ed7?w=800&q=80",
    internetSpeed: 287,
    temperature: 11,
    monthlyCost: 850000,
    rating: 4.4,
    reviewCount: 98,
    cafeCount: 54,
    coworkingCount: 4,
    transport: "good",
  },
  {
    rank: 6,
    name: "대전 유성구",
    nameEn: "Daejeon, Yuseong",
    image: "https://images.unsplash.com/photo-1517154421773-0529f29ea451?w=800&q=80",
    internetSpeed: 456,
    temperature: 13,
    monthlyCost: 900000,
    rating: 4.3,
    reviewCount: 67,
    cafeCount: 78,
    coworkingCount: 9,
    transport: "excellent",
  },
];

export function CityGrid() {
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
