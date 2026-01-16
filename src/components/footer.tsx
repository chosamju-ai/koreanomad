import Link from "next/link";
import { MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t bg-slate-50">
      <div className="container py-12">
        <div className="grid gap-8 md:grid-cols-4">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center space-x-2">
              <MapPin className="h-5 w-5 text-primary" />
              <span className="font-bold">KoreaNomad</span>
            </Link>
            <p className="mt-3 text-sm text-muted-foreground">
              디지털 노마드를 위한
              <br />
              한국 도시 정보 플랫폼
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="mb-4 font-semibold">서비스</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="#" className="hover:text-foreground">
                  도시 탐색
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-foreground">
                  인기 도시
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-foreground">
                  비교하기
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-foreground">
                  리뷰 작성
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 font-semibold">회사</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="#" className="hover:text-foreground">
                  소개
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-foreground">
                  블로그
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-foreground">
                  채용
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-foreground">
                  문의하기
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 font-semibold">법적 고지</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="#" className="hover:text-foreground">
                  이용약관
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-foreground">
                  개인정보처리방침
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-foreground">
                  쿠키 정책
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 border-t pt-8">
          <p className="text-center text-sm text-muted-foreground">
            © 2026 KoreaNomad. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
