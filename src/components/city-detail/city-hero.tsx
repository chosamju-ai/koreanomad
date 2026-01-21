"use client";

import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, Heart } from "lucide-react";
import { CityData } from "@/data/types";
import { useFavorites } from "@/hooks/use-favorites";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";

interface CityHeroProps {
  city: CityData;
}

export function CityHero({ city }: CityHeroProps) {
  const { isFavorite, toggleFavorite, isLoaded } = useFavorites();
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

  const handleFavoriteClick = () => {
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

  const favorite = isLoaded && isFavorite(city.slug);

  return (
    <div className="relative h-[300px] md:h-[400px] w-full overflow-hidden">
      <Image
        src={city.image}
        alt={city.name}
        fill
        sizes="100vw"
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

      {/* Favorite Button */}
      <div className="absolute top-6 right-6 md:top-8 md:right-8">
        <Button
          size="icon"
          variant="ghost"
          className="h-10 w-10 rounded-full bg-white/90 hover:bg-white"
          onClick={handleFavoriteClick}
        >
          <Heart
            className={`h-5 w-5 ${
              favorite ? "fill-red-500 text-red-500" : "text-gray-600"
            }`}
          />
        </Button>
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
        <div className="container">
          <div className="flex items-center gap-3 mb-2">
            <Badge className="bg-white/90 text-foreground">
              #{city.rank}
            </Badge>
            <div className="flex items-center gap-1 rounded-full bg-black/60 px-2 py-1 text-sm text-white">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span>{city.rating}</span>
              <span className="text-white/70">({city.reviewCount})</span>
            </div>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-1">
            {city.name}
          </h1>
          <p className="text-lg text-white/80">{city.nameEn}</p>
        </div>
      </div>
    </div>
  );
}
