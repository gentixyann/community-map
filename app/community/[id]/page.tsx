import BackButton from "@/components/user/BackButton";
import Image from "next/image";
import { fetchCommunityData } from "@/firebase/user/firestore";
import SnsLinksComponent from "@/components/user/SnsLinks";

type CommunityPageProps = {
  params: Promise<{ id: string }>;
};

export default async function CommunityPage({ params }: CommunityPageProps) {
  // params を事前に解決してドキュメント ID を取得
  const { id } = await params;

  // Firestore から全コミュニティデータを取得し、該当するドキュメントを検索
  const communities = await fetchCommunityData();
  const community = communities.find((c) => c.id === id);

  if (!community) {
    return <p>コミュニティが見つかりませんでした。</p>;
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4">
      {/* コミュニティ名 */}
      <h1 className="text-3xl font-bold mb-4">{community.name}</h1>

      {/* 画像表示エリア */}
      <div className="w-full max-w-md relative h-64 mb-4">
        {community.image ? (
          <Image
            src={community.image}
            alt={community.name}
            layout="fill"
            objectFit="cover"
            className="rounded"
          />
        ) : (
          <Image
            src="/images/no_image.svg"
            alt="No Image"
            layout="fill"
            objectFit="cover"
            className="object-cover"
          />
        )}
      </div>

      {/* コミュニティ概要 */}
      <div className="w-full max-w-md mb-4">
        <p className="text-sm">{community.overview}</p>
      </div>

      {/* SNSリンク */}
      <div className="w-full max-w-md mb-4">
        <SnsLinksComponent snsLinks={community.snsLinks} />
      </div>

      {/* 戻るボタン */}
      <BackButton />
    </main>
  );
}
