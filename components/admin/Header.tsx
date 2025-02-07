"use client";

import Link from "next/link";
import Image from "next/image";
import logo from "@/public/images/logo.svg";

/**
 * AdminHeader コンポーネント
 * - ヘッダー内に logo を表示し、クリックすると /admin ルートへ遷移します。
 */
export default function AdminHeader() {
  return (
    <header className="w-full bg-gray-100 p-4 shadow-md flex items-center">
      {/* Link コンポーネントで /admin に戻るボタンとして機能させる */}
      <Link href="/admin">
        <Image src={logo} alt="Admin Logo" width={70} height={100} />
      </Link>
      <h1 className="ml-4 text-xl font-bold">Admin Dashboard</h1>
    </header>
  );
}
