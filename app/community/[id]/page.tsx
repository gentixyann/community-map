import BackButton from "@/components/user/BackButton";
import { fetchCommunityData } from "../../../firebase/user/firestore";

type CommunityPageProps = {
  params: Promise<{ id: string }>;
};

export default async function CommunityPage({ params }: CommunityPageProps) {
  // ドキュメント ID で Firestore データを取得
  const communities = await fetchCommunityData();
  const community = communities.find(async (c) => c.id === (await params).id);

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
