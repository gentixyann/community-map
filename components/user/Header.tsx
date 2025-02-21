"use client";

import Link from "next/link";

/**
 * Header コンポーネント
 * - 画面上部に表示される固定ヘッダー
 */
export default function Header() {
  return (
    <header className="flex items-center h-[56px] px-4">
      <h1 className="text-xl font-bold">
        <Link href="/">コミュマップ</Link>
      </h1>
    </header>
  );
}
