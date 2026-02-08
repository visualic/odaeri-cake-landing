import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "오대리 — 사장님의 알잘딱깔센 AI 주문상담 에이전트",
  description:
    "인스타 DM 대신 AI가 상담하고, 견적 내고, 주문까지 받습니다. 사진 3장이면 10분 만에 AI 에이전트가 만들어져요.",
  keywords: [
    "AI 주문 관리",
    "케이크 주문",
    "인스타 주문 자동화",
    "AI 상담",
    "커스텀 주문",
    "1인 가게",
  ],
  openGraph: {
    title: "오대리 — 사장님의 알잘딱깔센 AI 주문상담 에이전트",
    description:
      "인스타 DM 대신 AI가 상담하고, 견적 내고, 주문까지 받습니다.",
    type: "website",
    locale: "ko_KR",
    siteName: "오대리",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="antialiased">
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
