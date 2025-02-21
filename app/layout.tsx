import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/user/Header";
import Footer from "@/components/user/Footer";

export const metadata: Metadata = {
  title: "コミュマップ",
  description: "げんげんが運営するコミュニティマップです。",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body className="relative">
        {/* 固定ヘッダー */}
        <Header />
        {/* 中央のコンテンツ領域。 */}
        <main>{children}</main>
        {/* 固定フッター */}
        <Footer />
      </body>
    </html>
  );
}
