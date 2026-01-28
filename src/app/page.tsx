import { Suspense } from "react";
import { Header } from "@/components/header";
import { HeroSection } from "@/components/hero-section";
import { FilterBar } from "@/components/filter-bar";
import { CityGrid } from "@/components/city-grid";
import { BottomCta } from "@/components/bottom-cta";
import { Footer } from "@/components/footer";
import { createClient } from "@/lib/supabase/server";
import { applyFiltersAndSort, CityFilters, SortOption } from "@/lib/filter-utils";
import { TransportQuality } from "@/data/types";

export const dynamic = "force-dynamic";

interface HomePageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function HomePage({ searchParams }: HomePageProps) {
  const params = await searchParams;
  const supabase = await createClient();

  // Fetch cities from Supabase
  const { data: citiesData, error } = await supabase
    .from("cities")
    .select("*")
    .order("rank", { ascending: true });

  if (error) {
    console.error("Error fetching cities:", error);
    return <div>Error loading cities</div>;
  }

  // Transform Supabase data to match CityData type
  const cities = citiesData.map((city: any) => ({
    rank: city.rank,
    name: city.name,
    nameEn: city.name_en,
    slug: city.slug,
    image: city.image,
    internetSpeed: city.internet_speed,
    temperature: city.temperature,
    monthlyCost: city.monthly_cost,
    rating: parseFloat(city.rating),
    reviewCount: city.review_count,
    cafeCount: city.cafe_count,
    coworkingCount: city.coworking_count,
    transport: city.transport,
    description: city.description,
    tags: city.tags,
  }));

  // Parse filters from URL
  const filters: CityFilters = {
    search: typeof params.search === "string" ? params.search : undefined,
    region: typeof params.region === "string" ? params.region : undefined,
    minSpeed: typeof params.minSpeed === "string" ? Number(params.minSpeed) : undefined,
    minCost: typeof params.minCost === "string" ? Number(params.minCost) : undefined,
    maxCost: typeof params.maxCost === "string" ? Number(params.maxCost) : undefined,
    minRating: typeof params.minRating === "string" ? Number(params.minRating) : undefined,
    transport: typeof params.transport === "string" ? params.transport as TransportQuality : undefined,
    sort: typeof params.sort === "string" ? params.sort as SortOption : "popular",
  };

  // Apply filters and sort
  const filteredCities = applyFiltersAndSort(cities, filters);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <Suspense fallback={<div className="h-24" />}>
          <FilterBar />
        </Suspense>
        <CityGrid cities={filteredCities} />
        <BottomCta />
      </main>
      <Footer />
    </div>
  );
}
