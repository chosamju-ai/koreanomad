import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Wifi, Thermometer, Star, Coffee, Building2, Train } from "lucide-react";

export interface CityData {
  rank: number;
  name: string;
  nameEn: string;
  image: string;
  internetSpeed: number;
  temperature: number;
  monthlyCost: number;
  rating: number;
  reviewCount: number;
  cafeCount: number;
  coworkingCount: number;
  transport: "excellent" | "good" | "average" | "poor";
  tags?: string[];
}

interface CityCardProps {
  city: CityData;
}

export function CityCard({ city }: CityCardProps) {
  const transportLabels = {
    excellent: "매우 좋음",
    good: "좋음",
    average: "보통",
    poor: "불편",
  };

  return (
    <Card className="group overflow-hidden transition-all hover:shadow-lg hover:-translate-y-1">
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={city.image}
          alt={city.name}
          fill
          className="object-cover transition-transform group-hover:scale-105"
        />
        <div className="absolute left-3 top-3">
          <Badge className="bg-white/90 text-foreground hover:bg-white/90">
            #{city.rank}
          </Badge>
        </div>
        <div className="absolute right-3 top-3">
          <div className="flex items-center gap-1 rounded-full bg-black/60 px-2 py-1 text-xs text-white">
            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
            <span>{city.rating}</span>
          </div>
        </div>
      </div>

      <CardContent className="p-4">
        {/* Title */}
        <div className="mb-3">
          <h3 className="font-semibold text-lg">{city.name}</h3>
          <p className="text-sm text-muted-foreground">{city.nameEn}</p>
        </div>

        {/* Stats Row 1 */}
        <div className="mb-3 grid grid-cols-2 gap-2 text-sm">
          <div className="flex items-center gap-2">
            <Wifi className="h-4 w-4 text-blue-500" />
            <span>{city.internetSpeed} Mbps</span>
          </div>
          <div className="flex items-center gap-2">
            <Thermometer className="h-4 w-4 text-orange-500" />
            <span>{city.temperature}°C</span>
          </div>
        </div>

        {/* Cost */}
        <div className="mb-3 rounded-lg bg-muted p-2">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">월 생활비</span>
            <span className="font-semibold text-primary">
              ₩{city.monthlyCost.toLocaleString()}
            </span>
          </div>
        </div>

        {/* Stats Row 2 */}
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <Coffee className="h-3.5 w-3.5" />
            <span>카페 {city.cafeCount}</span>
          </div>
          <div className="flex items-center gap-1">
            <Building2 className="h-3.5 w-3.5" />
            <span>코워킹 {city.coworkingCount}</span>
          </div>
          <div className="flex items-center gap-1">
            <Train className="h-3.5 w-3.5" />
            <span>{transportLabels[city.transport]}</span>
          </div>
        </div>

        {/* Review Count */}
        <div className="mt-3 pt-3 border-t text-center">
          <span className="text-xs text-muted-foreground">
            {city.reviewCount}개의 리뷰
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
