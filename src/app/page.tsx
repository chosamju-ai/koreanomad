import { Header } from "@/components/header";
import { HeroSection } from "@/components/hero-section";
import { FilterBar } from "@/components/filter-bar";
import { CityGrid } from "@/components/city-grid";
import { BottomCta } from "@/components/bottom-cta";
import { Footer } from "@/components/footer";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <FilterBar />
        <CityGrid />
        <BottomCta />
      </main>
      <Footer />
    </div>
  );
}
