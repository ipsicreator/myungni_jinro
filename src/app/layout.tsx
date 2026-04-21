import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "입시 DNA 프리즘",
  description: "대치수프리마 입시&코칭센터 진단 서비스",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
