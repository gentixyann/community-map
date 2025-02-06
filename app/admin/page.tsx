"use client";

import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="w-full md:flex md:justify-evenly">
        <Link
          href="/admin/register"
          className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-100 mb-4 md:mb-0"
        >
          <h2 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
            コミュニティーの登録
          </h2>
          <p className="font-normal text-gray-700 dark:text-gray-400">
            登録ができるよ
          </p>
        </Link>
        <Link
          href="/admin/community_list"
          className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-100"
        >
          <h2 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
            コミュニティーの一覧
          </h2>
          <p className="font-normal text-gray-700 dark:text-gray-400">
            登録情報の編集ができるよ
          </p>
        </Link>
      </div>
    </main>
  );
}
