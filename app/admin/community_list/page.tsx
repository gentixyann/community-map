// app/admin/community_list/page.tsx
// ※このファイルはサーバーコンポーネントとして実装します（"use client" は不要）

import { fetchCommunityData } from "@/firebase/user/firestore";
import CommunityList from "@/components/admin/community_list/CommunityList";

// サーバーコンポーネントなので、async 関数として Firestore からデータ取得可能
export default async function CommunityListPage() {
  // Firestore から「community」コレクションのデータを取得
  const communities = await fetchCommunityData();

  return (
    <main className="min-h-screen flex flex-col justify-center items-center p-4">
      <h1 className="text-2xl font-bold mb-4">コミュニティー一覧</h1>
      <p className="text-gray-600 mb-4">コミュニティーの一覧が表示されます。</p>
      {/* コミュニティ一覧コンポーネントに取得したデータを渡す */}
      <CommunityList communities={communities} />
    </main>
  );
}
