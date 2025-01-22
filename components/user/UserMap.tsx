"use client";

import { useEffect, useRef, useState } from "react";
import { CommunityData } from "../../firebase/user/firestore";
import Modal from "./Modal";

type UserMapProps = {
  apiKey: string;
  communities: CommunityData[];
};

export default function UserMap({ apiKey, communities }: UserMapProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [selectedCommunity, setSelectedCommunity] = useState<string | null>(
    null
  ); // 選択されたマーカーの名前
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    // Google Maps API をロードしてマップを初期化
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
    script.async = true;

    script.onload = () => {
      const initializedMap = new google.maps.Map(mapContainerRef.current!, {
        center: { lat: 35.6895, lng: 139.6917 }, // 東京を初期位置に設定
        zoom: 12,
      });
      setMap(initializedMap);
    };

    document.head.appendChild(script);

    return () => {
      script.remove(); // クリーンアップ
    };
  }, [apiKey]);

  useEffect(() => {
    if (!map || communities.length === 0) return;

    // 各コミュニティに対応するマーカーを作成
    communities.forEach(({ lat, lng, name }) => {
      const marker = new google.maps.Marker({
        position: { lat, lng },
        map,
        title: name, // ツールチップに名前を表示
      });
      // マーカーがクリックされたときの処理
      marker.addListener("click", () => {
        setSelectedCommunity(name); // 選択したコミュニティの名前を設定
        setIsModalOpen(true); // モーダルを開く
      });
    });
  }, [map, communities]);

  return (
    <>
      <div className="w-screen h-screen m-0 p-0">
        <div ref={mapContainerRef} style={{ width: "100%", height: "100%" }} />
      </div>
      {/* モーダルを表示 */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)} // モーダルを閉じる
        content={selectedCommunity || ""} // モーダルに表示する内容
      />
    </>
  );
}
