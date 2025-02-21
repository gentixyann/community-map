"use client";

import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.push("/")} // ルート画面に遷移
      className="mt-6 bg-black text-white px-4 py-2 rounded-full hover:bg-[#b3b3b3]"
    >
      マップに戻る
    </button>
  );
}
