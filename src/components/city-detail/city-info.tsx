import { Wifi, Thermometer, Coffee, Building2, Train } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CityData } from "@/data/types";

interface CityInfoProps {
  city: CityData;
}

const transportLabels: Record<CityData["transport"], string> = {
  excellent: "매우 좋음",
  good: "좋음",
  average: "보통",
  poor: "불편",
};

export function CityInfo({ city }: CityInfoProps) {
  const stats = [
    {
      icon: Wifi,
      label: "인터넷 속도",
      value: `${city.internetSpeed} Mbps`,
      color: "text-blue-500",
    },
    {
      icon: Thermometer,
      label: "평균 기온",
      value: `${city.temperature}°C`,
      color: "text-orange-500",
    },
    {
      icon: Coffee,
      label: "카페",
      value: `${city.cafeCount}개`,
      color: "text-amber-600",
    },
    {
      icon: Building2,
      label: "코워킹 스페이스",
      value: `${city.coworkingCount}개`,
      color: "text-purple-500",
    },
    {
      icon: Train,
      label: "대중교통",
      value: transportLabels[city.transport],
      color: "text-green-500",
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>기본 정보</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {stats.map((stat) => (
            <div key={stat.label} className="flex items-center gap-3">
              <div className={`p-2 rounded-lg bg-muted ${stat.color}`}>
                <stat.icon className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
                <p className="font-medium">{stat.value}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
