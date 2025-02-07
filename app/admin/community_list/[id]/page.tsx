// app/admin/community_list/[id]/page.tsx
// ※このページはサーバーコンポーネントとして実装します（"use client" は不要）

import { fetchCommunityData } from "@/firebase/user/firestore";
import EditCommunityForm from "@/components/admin/community_list/EditCommunityForm";
import BackButton from "@/components/admin/community_list/BackButton";

type CommunityPageProps = {
  params: Promise<{ id: string }>;
};

export default async function CommunityDetailPage({
  params,
}: CommunityPageProps) {
  const { id } = await params;

  // Firestore から全コミュニティデータを取得し、該当するドキュメント ID のものを検索
  const communities = await fetchCommunityData();
  const community = communities.find((c) => c.id === id);

  if (!community) {
    return <p>コミュニティが見つかりませんでした。</p>;
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-2xl font-bold mb-4">コミュニティ編集</h1>
      {/* 編集用フォームに対象コミュニティの初期値を渡す */}
      <EditCommunityForm initialCommunity={community} />
      {/* 戻るボタンで一覧に戻る */}
      <BackButton />
    </main>
  );
}
