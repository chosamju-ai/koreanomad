import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Wifi, Thermometer, Star, Coffee, Building2, Train, MapPin } from "lucide-react";
import { getCityBySlug, getAllCitySlugs } from "@/lib/cities";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export async function generateStaticParams() {
  const slugs = getAllCitySlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const city = getCityBySlug(params.slug);

  if (!city) {
    return {
      title: "도시를 찾을 수 없습니다",
    };
  }

  return {
    title: `${city.name} - 디지털 노마드 가이드`,
    description: city.description || `${city.name}의 디지털 노마드 정보`,
  };
}

export default function CityDetailPage({ params }: { params: { slug: string } }) {
  const city = getCityBySlug(params.slug);

  if (!city) {
    notFound();
  }

  const transportLabels = {
    excellent: "매우 좋음",
    good: "좋음",
    average: "보통",
    poor: "불편",
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[400px] md:h-[500px]">
        <Image
          src={city.image}
          alt={city.name}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/70" />

        {/* Back Button */}
        <div className="absolute top-6 left-6 z-10">
          <Link href="/">
            <Button variant="secondary" size="sm" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              목록으로
            </Button>
          </Link>
        </div>

        {/* Rank Badge */}
        <div className="absolute top-6 right-6 z-10">
          <Badge className="bg-white/90 text-foreground hover:bg-white/90 text-lg px-4 py-2">
            #{city.rank}
          </Badge>
        </div>

        {/* Title & Location */}
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
          <div className="container">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
              {city.name}
            </h1>
            <p className="text-xl text-white/90 mb-4">{city.nameEn}</p>
            {city.location && (
              <div className="flex items-center gap-2 text-white/80">
                <MapPin className="h-5 w-5" />
                <span>{city.location.country} · {city.location.region}</span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="flex-1 py-10">
        <div className="container">
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Left Column - Main Info */}
            <div className="lg:col-span-2 space-y-8">
              {/* Description */}
              {city.longDescription && (
                <section>
                  <h2 className="text-2xl font-bold mb-4">도시 소개</h2>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    {city.longDescription}
                  </p>
                </section>
              )}

              {/* Amenities */}
              {city.amenities && (
                <section>
                  <h2 className="text-2xl font-bold mb-4">주요 시설</h2>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Card>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-base flex items-center gap-2">
                          <Wifi className="h-5 w-5 text-blue-500" />
                          인터넷
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground">{city.amenities.wifi}</p>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-base flex items-center gap-2">
                          <Coffee className="h-5 w-5 text-amber-600" />
                          카페
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground">{city.amenities.cafes}</p>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-base flex items-center gap-2">
                          <Building2 className="h-5 w-5 text-purple-600" />
                          코워킹 스페이스
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground">{city.amenities.coworking}</p>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-base flex items-center gap-2">
                          <Train className="h-5 w-5 text-green-600" />
                          생활비
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground">{city.amenities.cost}</p>
                      </CardContent>
                    </Card>
                  </div>
                </section>
              )}
            </div>

            {/* Right Column - Stats */}
            <div className="space-y-6">
              {/* Rating */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    평점
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-4xl font-bold">{city.rating}</div>
                  <p className="text-sm text-muted-foreground mt-1">
                    {city.reviewCount}개의 리뷰
                  </p>
                </CardContent>
              </Card>

              {/* Key Stats */}
              <Card>
                <CardHeader>
                  <CardTitle>핵심 정보</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm">
                      <Wifi className="h-4 w-4 text-blue-500" />
                      <span className="text-muted-foreground">인터넷 속도</span>
                    </div>
                    <span className="font-medium">{city.internetSpeed} Mbps</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm">
                      <Thermometer className="h-4 w-4 text-orange-500" />
                      <span className="text-muted-foreground">평균 기온</span>
                    </div>
                    <span className="font-medium">{city.temperature}°C</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm">
                      <Coffee className="h-4 w-4 text-amber-600" />
                      <span className="text-muted-foreground">카페</span>
                    </div>
                    <span className="font-medium">{city.cafeCount}개</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm">
                      <Building2 className="h-4 w-4 text-purple-600" />
                      <span className="text-muted-foreground">코워킹</span>
                    </div>
                    <span className="font-medium">{city.coworkingCount}개</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm">
                      <Train className="h-4 w-4 text-green-600" />
                      <span className="text-muted-foreground">대중교통</span>
                    </div>
                    <span className="font-medium">{transportLabels[city.transport]}</span>
                  </div>
                </CardContent>
              </Card>

              {/* Monthly Cost */}
              <Card className="bg-primary text-primary-foreground">
                <CardHeader>
                  <CardTitle>월 생활비</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">
                    ₩{city.monthlyCost.toLocaleString()}
                  </div>
                  <p className="text-sm mt-1 opacity-90">
                    평균 예상 비용
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
