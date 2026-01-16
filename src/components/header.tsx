import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <MapPin className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold">KoreaNomad</span>
        </Link>

        <nav className="flex items-center space-x-4">
          <Button variant="ghost" asChild>
            <Link href="#">로그인</Link>
          </Button>
          <Button asChild>
            <Link href="#">회원가입</Link>
          </Button>
        </nav>
      </div>
    </header>
  );
}
