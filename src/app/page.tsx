import { Suspense } from "react";
import { Header } from "@/components/header";
import { HeroSection } from "@/components/hero-section";
import { CityExplorer } from "@/components/city-explorer";
import { BottomCta } from "@/components/bottom-cta";
import { Footer } from "@/components/footer";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <Suspense fallback={<div className="min-h-screen" />}>
          <CityExplorer />
        </Suspense>
        <BottomCta />
      </main>
      <Footer />
    </div>
  );
}
