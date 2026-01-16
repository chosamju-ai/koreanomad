import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-24 md:py-32">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-primary/10 via-transparent to-transparent" />

      <div className="container relative z-10">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="mb-6 text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
            한국에서{" "}
            <span className="bg-gradient-to-r from-primary to-orange-400 bg-clip-text text-transparent">
              노마드
            </span>
            로 살기
          </h1>

          <p className="mb-10 text-lg text-slate-300 md:text-xl">
            디지털 노마드를 위한 도시 정보를 한눈에 비교하세요.
            <br className="hidden sm:block" />
            생활비, 인터넷 속도, 날씨 등 핵심 지표를 확인하고 나에게 맞는 도시를 찾아보세요.
          </p>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button size="lg" className="min-w-[160px]">
              도시 둘러보기
              <ArrowDown className="ml-2 h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline" className="min-w-[160px] border-slate-600 text-white hover:bg-slate-800">
              회원가입
            </Button>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-white">50+</div>
              <div className="text-sm text-slate-400">등록된 도시</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">1,200+</div>
              <div className="text-sm text-slate-400">사용자 리뷰</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">4.8</div>
              <div className="text-sm text-slate-400">평균 평점</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
