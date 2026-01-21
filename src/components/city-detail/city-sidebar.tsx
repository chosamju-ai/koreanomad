import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Star, TrendingUp, Users } from "lucide-react";
import { CityData } from "@/data/types";

interface CitySidebarProps {
  city: CityData;
}

export function CitySidebar({ city }: CitySidebarProps) {
  return (
    <div className="space-y-4">
      {/* Cost Card */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">월 생활비</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold text-primary">
            ₩{city.monthlyCost.toLocaleString()}
          </p>
          <p className="text-sm text-muted-foreground mt-1">예상 월 평균</p>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">빠른 통계</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-yellow-100">
              <Star className="h-5 w-5 text-yellow-600" />
            </div>
            <div>
              <p className="font-medium">{city.rating} / 5.0</p>
              <p className="text-sm text-muted-foreground">평균 평점</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-blue-100">
              <Users className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="font-medium">{city.reviewCount}개</p>
              <p className="text-sm text-muted-foreground">리뷰 수</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-green-100">
              <TrendingUp className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <p className="font-medium">#{city.rank}</p>
              <p className="text-sm text-muted-foreground">인기 순위</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
