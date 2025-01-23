import BackButton from "@/components/user/BackButton";
import { fetchCommunityData } from "../../../firebase/user/firestore";

type CommunityPageProps = {
  params: Promise<{ id: string }>; // params は Promise で解決される
};

export default async function CommunityPage({ params }: CommunityPageProps) {
  // params を事前に await で解決
  const { id } = await params;

  // ドキュメント ID で Firestore データを取得
  const communities = await fetchCommunityData();

  // 非同期処理なしで一致するデータを同期的に検索
  const community = communities.find((c) => c.id === id);

  if (!community) {
    return <p>コミュニティが見つかりませんでした。</p>;
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold">{community.name}</h1>
      <p className="mt-4">
        緯度: {community.lat}, 経度: {community.lng}
      </p>
      {/* ルート画面に戻るボタン */}
      <BackButton />
    </main>
  );
}
