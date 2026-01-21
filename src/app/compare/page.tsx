import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ComparePageClient } from "./compare-page-client";

export default function ComparePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <ComparePageClient />
      <Footer />
    </div>
  );
}
