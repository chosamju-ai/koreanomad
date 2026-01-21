"use client";

import { cities } from "@/data/cities";
import { CityData } from "@/data/types";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Plus } from "lucide-react";

interface CitySelectorProps {
  selectedSlugs: string[];
  onAdd: (slug: string) => void;
  canAddMore: boolean;
}

export function CitySelector({ selectedSlugs, onAdd, canAddMore }: CitySelectorProps) {
  const availableCities = cities.filter(
    (city) => !selectedSlugs.includes(city.slug)
  );

  if (!canAddMore) {
    return null;
  }

  return (
    <div className="rounded-lg border bg-card p-6">
      <h3 className="mb-4 font-semibold">도시 추가</h3>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {availableCities.map((city) => (
          <div
            key={city.slug}
            className="flex items-center gap-3 rounded-lg border p-3 hover:bg-muted/50 transition-colors"
          >
            <div className="relative h-12 w-12 flex-shrink-0 overflow-hidden rounded">
              <Image
                src={city.image}
                alt={city.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{city.name}</p>
              <p className="text-xs text-muted-foreground truncate">
                {city.nameEn}
              </p>
            </div>
            <Button
              size="icon"
              variant="outline"
              className="h-8 w-8 flex-shrink-0"
              onClick={() => onAdd(city.slug)}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
