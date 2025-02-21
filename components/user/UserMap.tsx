"use client";

import { useEffect, useRef, useState } from "react";
import { CommunityData } from "@/model/CommunityModel";
import Modal from "./Modal";

type UserMapProps = {
  apiKey: string;
  communities: CommunityData[];
};

export default function UserMap({ apiKey, communities }: UserMapProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [selectedCommunity, setSelectedCommunity] =
    useState<CommunityData | null>(null); // 選択されたマーカーのデータ
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    // Google Maps API をロードしてマップを初期化
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
    script.async = true;

    script.onload = () => {
      const initializedMap = new google.maps.Map(mapContainerRef.current!, {
        center: { lat: 35.6895, lng: 139.6917 },
        zoom: 12,
        mapTypeControl: false,
        fullscreenControl: false,
        streetViewControl: false,
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

    communities.forEach((community) => {
      const marker = new google.maps.Marker({
        position: { lat: community.lat, lng: community.lng },
        map,
        title: community.name,
      });

      marker.addListener("click", () => {
        setSelectedCommunity(community);
        setIsModalOpen(true);
      });
    });
  }, [map, communities]);

  return (
    <>
      <div className="w-screen m-0 p-0">
        <div
          ref={mapContainerRef}
          style={{ width: "100%", minHeight: "calc(100dvh - 84px)" }}
        />
      </div>
      {/* モーダル表示 */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        content={selectedCommunity}
      />
    </>
  );
}
