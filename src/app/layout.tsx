import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "KoreaNomad - 한국 디지털 노마드 도시 정보",
  description: "디지털 노마드를 위한 한국 도시 정보를 한눈에 비교하세요. 생활비, 인터넷 속도, 날씨 등 핵심 지표를 확인하고 나에게 맞는 도시를 찾아보세요.",
  keywords: ["디지털 노마드", "한국", "원격근무", "코워킹", "한달살기", "노마드"],
  openGraph: {
    title: "KoreaNomad - 한국 디지털 노마드 도시 정보",
    description: "디지털 노마드를 위한 한국 도시 정보 플랫폼",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}
