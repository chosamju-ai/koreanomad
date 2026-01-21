"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CityData } from "@/data/types";

interface CityTabsProps {
  city: CityData;
}

type TabId = "overview" | "cost" | "transport" | "weather";

interface Tab {
  id: TabId;
  label: string;
}

const tabs: Tab[] = [
  { id: "overview", label: "개요" },
  { id: "cost", label: "생활비 상세" },
  { id: "transport", label: "교통" },
  { id: "weather", label: "날씨" },
];

export function CityTabs({ city }: CityTabsProps) {
  const [activeTab, setActiveTab] = useState<TabId>("overview");

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex gap-2 overflow-x-auto">
          {tabs.map((tab) => (
            <Button
              key={tab.id}
              variant={activeTab === tab.id ? "default" : "ghost"}
              size="sm"
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </Button>
          ))}
        </div>
      </CardHeader>
      <CardContent>
        {activeTab === "overview" && (
          <div>
            <CardTitle className="text-lg mb-3">도시 소개</CardTitle>
            <p className="text-muted-foreground leading-relaxed">
              {city.description || `${city.name}은(는) 디지털 노마드를 위한 최적의 환경을 제공합니다.`}
            </p>
          </div>
        )}
        {activeTab === "cost" && (
          <div className="space-y-3">
            <CardTitle className="text-lg mb-3">월 생활비 상세</CardTitle>
            <div className="space-y-2">
              <div className="flex justify-between py-2 border-b">
                <span className="text-muted-foreground">숙소 (원룸)</span>
                <span className="font-medium">₩{Math.round(city.monthlyCost * 0.5).toLocaleString()}</span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span className="text-muted-foreground">식비</span>
                <span className="font-medium">₩{Math.round(city.monthlyCost * 0.25).toLocaleString()}</span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span className="text-muted-foreground">교통비</span>
                <span className="font-medium">₩{Math.round(city.monthlyCost * 0.1).toLocaleString()}</span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span className="text-muted-foreground">기타</span>
                <span className="font-medium">₩{Math.round(city.monthlyCost * 0.15).toLocaleString()}</span>
              </div>
              <div className="flex justify-between py-2 font-semibold">
                <span>총 예상 비용</span>
                <span className="text-primary">₩{city.monthlyCost.toLocaleString()}</span>
              </div>
            </div>
          </div>
        )}
        {activeTab === "transport" && (
          <div>
            <CardTitle className="text-lg mb-3">교통 정보</CardTitle>
            <p className="text-muted-foreground leading-relaxed">
              {city.name}의 대중교통 편의성은 &quot;{
                { excellent: "매우 좋음", good: "좋음", average: "보통", poor: "불편" }[city.transport]
              }&quot; 수준입니다.
              {city.transport === "excellent" && " 지하철, 버스 등 다양한 대중교통 수단이 잘 갖춰져 있습니다."}
              {city.transport === "good" && " 버스 노선이 잘 갖춰져 있어 이동이 편리합니다."}
              {city.transport === "average" && " 기본적인 버스 노선이 운행되고 있습니다."}
              {city.transport === "poor" && " 개인 차량이 있으면 더 편리합니다."}
            </p>
          </div>
        )}
        {activeTab === "weather" && (
          <div>
            <CardTitle className="text-lg mb-3">날씨 정보</CardTitle>
            <p className="text-muted-foreground leading-relaxed">
              현재 {city.name}의 평균 기온은 {city.temperature}°C입니다.
              {city.temperature >= 20 && " 따뜻한 날씨로 야외 활동하기 좋습니다."}
              {city.temperature >= 10 && city.temperature < 20 && " 선선한 날씨로 활동하기 적당합니다."}
              {city.temperature < 10 && " 쌀쌀한 날씨이니 따뜻하게 입으세요."}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
