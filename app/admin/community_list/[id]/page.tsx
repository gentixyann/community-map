// app/admin/community_list/[id]/page.tsx
// ※このページはサーバーコンポーネントとして実装可能です

import { fetchCommunityData } from "@/firebase/user/firestore";
import BackButton from "@/components/admin/community_list/BackButton"; // 戻るボタン（既存コンポーネント）を利用

type CommunityPageProps = {
  params: { id: string };
};

export default async function CommunityDetailPage({
  params,
}: CommunityPageProps) {
  // Firestore から全コミュニティデータを取得し、該当するドキュメント ID のものを検索
  const communities = await fetchCommunityData();
  const community = communities.find((c) => c.id === params.id);

  if (!community) {
    return <p>コミュニティが見つかりませんでした。</p>;
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-2xl font-bold mb-4">{community.name}</h1>
      <p className="text-gray-600 mb-4">
        緯度: {community.lat}, 経度: {community.lng}
      </p>
      {/* 戻るボタンで一覧に戻る */}
      <BackButton />
    </main>
  );
}
