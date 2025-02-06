"use client";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col justify-center items-center p-4">
      <h1 className="text-2xl font-bold mb-4">コミュニティー一覧</h1>
      <p className="text-gray-600 mb-4">コミュニティーの一覧が表示されます。</p>
      <ul className="list-disc pl-6">
        {/* ここにコミュニティーの一覧を表示 */}
      </ul>
    </main>
  );
}
