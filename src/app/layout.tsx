import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ECOKA HANDICRAFTS",
  description: "CÔNG TY CỔ PHẦN ECOKA. Là công ty sản xuất và thương mại các sản phẩm thủ công mỹ nghệ truyền thống từ các nguyên liệu 100% từ thiên nhiên như: lục bình, ...",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={montserrat.className} suppressHydrationWarning={true}>{children}</body>
    </html>
  );
}
