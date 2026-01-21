import Image from "next/image";
import { CityData } from "@/data/types";
import { Badge } from "@/components/ui/badge";
import { Star, Wifi, Thermometer, Coffee, Building2, Train } from "lucide-react";
import { cn } from "@/lib/utils";

interface CompareTableProps {
  cities: CityData[];
}

const transportLabels: Record<CityData["transport"], string> = {
  excellent: "매우 좋음",
  good: "좋음",
  average: "보통",
  poor: "불편",
};

export function CompareTable({ cities }: CompareTableProps) {
  if (cities.length === 0) {
    return null;
  }

  // Helper function to find best value index
  const getBestIndex = (values: number[], higherIsBetter = true) => {
    if (higherIsBetter) {
      const maxValue = Math.max(...values);
      return values.findIndex((v) => v === maxValue);
    } else {
      const minValue = Math.min(...values);
      return values.findIndex((v) => v === minValue);
    }
  };

  const ratings = cities.map((c) => c.rating);
  const bestRatingIndex = getBestIndex(ratings);

  const speeds = cities.map((c) => c.internetSpeed);
  const bestSpeedIndex = getBestIndex(speeds);

  const costs = cities.map((c) => c.monthlyCost);
  const bestCostIndex = getBestIndex(costs, false);

  const cafes = cities.map((c) => c.cafeCount);
  const bestCafeIndex = getBestIndex(cafes);

  const coworkings = cities.map((c) => c.coworkingCount);
  const bestCoworkingIndex = getBestIndex(coworkings);

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b">
            <th className="p-4 text-left font-semibold">항목</th>
            {cities.map((city) => (
              <th key={city.slug} className="p-4 text-center">
                <div className="flex flex-col items-center gap-2">
                  <div className="relative h-20 w-20 overflow-hidden rounded-lg">
                    <Image
                      src={city.image}
                      alt={city.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-semibold">{city.name}</p>
                    <p className="text-xs text-muted-foreground">{city.nameEn}</p>
                  </div>
                  <Badge>#{city.rank}</Badge>
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {/* Rating */}
          <tr className="border-b">
            <td className="p-4 font-medium">
              <div className="flex items-center gap-2">
                <Star className="h-4 w-4 text-yellow-400" />
                평점
              </div>
            </td>
            {cities.map((city, index) => (
              <td
                key={city.slug}
                className={cn(
                  "p-4 text-center",
                  index === bestRatingIndex && "bg-green-50 font-bold"
                )}
              >
                {city.rating}점
              </td>
            ))}
          </tr>

          {/* Internet Speed */}
          <tr className="border-b">
            <td className="p-4 font-medium">
              <div className="flex items-center gap-2">
                <Wifi className="h-4 w-4 text-blue-500" />
                인터넷 속도
              </div>
            </td>
            {cities.map((city, index) => (
              <td
                key={city.slug}
                className={cn(
                  "p-4 text-center",
                  index === bestSpeedIndex && "bg-green-50 font-bold"
                )}
              >
                {city.internetSpeed} Mbps
              </td>
            ))}
          </tr>

          {/* Monthly Cost */}
          <tr className="border-b">
            <td className="p-4 font-medium">
              <div className="flex items-center gap-2">
                💰 월 생활비
              </div>
            </td>
            {cities.map((city, index) => (
              <td
                key={city.slug}
                className={cn(
                  "p-4 text-center",
                  index === bestCostIndex && "bg-green-50 font-bold"
                )}
              >
                ₩{city.monthlyCost.toLocaleString()}
              </td>
            ))}
          </tr>

          {/* Temperature */}
          <tr className="border-b">
            <td className="p-4 font-medium">
              <div className="flex items-center gap-2">
                <Thermometer className="h-4 w-4 text-orange-500" />
                평균 기온
              </div>
            </td>
            {cities.map((city) => (
              <td key={city.slug} className="p-4 text-center">
                {city.temperature}°C
              </td>
            ))}
          </tr>

          {/* Cafe Count */}
          <tr className="border-b">
            <td className="p-4 font-medium">
              <div className="flex items-center gap-2">
                <Coffee className="h-4 w-4" />
                카페 수
              </div>
            </td>
            {cities.map((city, index) => (
              <td
                key={city.slug}
                className={cn(
                  "p-4 text-center",
                  index === bestCafeIndex && "bg-green-50 font-bold"
                )}
              >
                {city.cafeCount}개
              </td>
            ))}
          </tr>

          {/* Coworking Count */}
          <tr className="border-b">
            <td className="p-4 font-medium">
              <div className="flex items-center gap-2">
                <Building2 className="h-4 w-4" />
                코워킹 스페이스
              </div>
            </td>
            {cities.map((city, index) => (
              <td
                key={city.slug}
                className={cn(
                  "p-4 text-center",
                  index === bestCoworkingIndex && "bg-green-50 font-bold"
                )}
              >
                {city.coworkingCount}개
              </td>
            ))}
          </tr>

          {/* Transport */}
          <tr className="border-b">
            <td className="p-4 font-medium">
              <div className="flex items-center gap-2">
                <Train className="h-4 w-4" />
                교통 편의성
              </div>
            </td>
            {cities.map((city) => (
              <td key={city.slug} className="p-4 text-center">
                {transportLabels[city.transport]}
              </td>
            ))}
          </tr>

          {/* Review Count */}
          <tr className="border-b">
            <td className="p-4 font-medium">리뷰 수</td>
            {cities.map((city) => (
              <td key={city.slug} className="p-4 text-center">
                {city.reviewCount}개
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
}
