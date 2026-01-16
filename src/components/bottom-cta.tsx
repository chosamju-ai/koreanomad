import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";

export function BottomCta() {
  return (
    <section className="border-t bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 py-16">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mb-4 inline-flex items-center justify-center rounded-full bg-primary/10 p-3">
            <Globe className="h-6 w-6 text-primary" />
          </div>
          <h2 className="mb-4 text-2xl font-bold md:text-3xl">
            나만의 노마드 도시를 찾아보세요
          </h2>
          <p className="mb-8 text-muted-foreground">
            무료 회원가입으로 모든 도시의 상세 정보를 확인하고,
            <br className="hidden sm:block" />
            다른 노마드들의 리뷰와 팁을 공유받으세요.
          </p>
          <Button size="lg" className="min-w-[200px]">
            무료로 시작하기
          </Button>
        </div>
      </div>
    </section>
  );
}
