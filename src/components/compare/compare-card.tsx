import Image from "next/image";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { CityData } from "@/data/types";

interface CompareCardProps {
  city: CityData;
  onRemove: () => void;
}

export function CompareCard({ city, onRemove }: CompareCardProps) {
  return (
    <div className="relative flex items-center gap-2 rounded-lg border bg-card p-2">
      <div className="relative h-12 w-12 flex-shrink-0 overflow-hidden rounded">
        <Image src={city.image} alt={city.name} fill className="object-cover" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium truncate">{city.name}</p>
        <p className="text-xs text-muted-foreground truncate">{city.nameEn}</p>
      </div>
      <Button
        size="icon"
        variant="ghost"
        className="h-6 w-6 flex-shrink-0"
        onClick={onRemove}
      >
        <X className="h-4 w-4" />
      </Button>
    </div>
  );
}
