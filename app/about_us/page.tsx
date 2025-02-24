import Image from "next/image";

export default function AboutUs() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold mb-4">運営者</h1>
      <div className="w-full max-w-md relative h-64 mb-8">
        <Image
          src="/images/gentu.jpg"
          alt="Gentu"
          layout="fill"
          objectFit="cover"
          className="rounded-xl"
        />
      </div>
      <div className="w-full max-w-md mb-8">
        <h2 className="font-bold text-xl mb-2">げんつ</h2>
        <p className="text-sm">
          【夢を追い求める人達のコミュニティハウスを作りたい】新しい自分、夢を叶えるため日々奮闘中🔥友達、コミュニティ作りガチ勢🤝民泊・古民家・シェアハウス・ジビエ事業勉強中✏️フットワーク軽め全国どこでも行きます✈️筋トレ・サウナ・登山好き🏔
        </p>
      </div>
    </main>
  );
}
