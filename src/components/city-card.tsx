"use client";

import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Wifi, Thermometer, Star, Coffee, Building2, Train, Heart, Plus, Check } from "lucide-react";
import { CityData } from "@/data/types";
import { useFavorites } from "@/hooks/use-favorites";
import { useCompare } from "@/hooks/use-compare";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";

interface CityCardProps {
  city: CityData;
}

const transportLabels: Record<CityData["transport"], string> = {
  excellent: "매우 좋음",
  good: "좋음",
  average: "보통",
  poor: "불편",
};

export function CityCard({ city }: CityCardProps) {
  const { isFavorite, toggleFavorite, isLoaded } = useFavorites();
  const { isInCompare, addToCompare, removeFromCompare, canAddMore } = useCompare();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setIsAuthenticated(!!user);
    };
    checkAuth();
  }, []);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isAuthenticated) {
      toast.error("로그인이 필요합니다");
      return;
    }

    toggleFavorite(city.slug);
    if (isFavorite(city.slug)) {
      toast.success("즐겨찾기에서 제거했습니다");
    } else {
      toast.success("즐겨찾기에 추가했습니다");
    }
  };

  const handleCompareClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (isInCompare(city.slug)) {
      removeFromCompare(city.slug);
      toast.success("비교에서 제거했습니다");
    } else {
      const added = addToCompare(city.slug);
      if (added) {
        toast.success("비교에 추가했습니다");
      } else {
        toast.error("최대 3개까지 비교할 수 있습니다");
      }
    }
  };

  const favorite = isLoaded && isFavorite(city.slug);
  const inCompare = isInCompare(city.slug);

  return (
    <Link href={`/cities/${city.slug}`}>
      <Card className="group overflow-hidden transition-all hover:shadow-lg hover:-translate-y-1 cursor-pointer">
        {/* Image */}
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={city.image}
            alt={city.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform group-hover:scale-105"
          />
          <div className="absolute left-3 top-3">
            <Badge className="bg-white/90 text-foreground hover:bg-white/90">
              #{city.rank}
            </Badge>
          </div>
          <div className="absolute right-3 top-3 flex items-center gap-2">
            <div className="flex items-center gap-1 rounded-full bg-black/60 px-2 py-1 text-xs text-white">
              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
              <span>{city.rating}</span>
            </div>
            <Button
              size="icon"
              variant="ghost"
              className="h-8 w-8 rounded-full bg-white/90 hover:bg-white"
              onClick={handleFavoriteClick}
            >
              <Heart
                className={`h-4 w-4 ${
                  favorite ? "fill-red-500 text-red-500" : "text-gray-600"
                }`}
              />
            </Button>
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

          {/* Compare Button */}
          <div className="mt-3">
            <Button
              variant={inCompare ? "default" : "outline"}
              size="sm"
              className="w-full gap-2"
              onClick={handleCompareClick}
            >
              {inCompare ? (
                <>
                  <Check className="h-4 w-4" />
                  비교 중
                </>
              ) : (
                <>
                  <Plus className="h-4 w-4" />
                  비교 추가
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
