"use client";

import { useEffect, useRef, useState } from "react";

type GoogleMapProps = {
  apiKey: string;
  lat: number; // 緯度
  lng: number; // 経度
  zoom: number; // ズームレベル
};

export default function GoogleMap({ apiKey, lat, lng, zoom }: GoogleMapProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [marker, setMarker] = useState<google.maps.Marker | null>(null);
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(
    null
  ); // 緯度経度state

  useEffect(() => {
    if (!mapContainerRef.current) return;

    // Google Maps API を読み込み後にマップを初期化
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
    script.async = true;
    script.onload = () => {
      const initializedMap = new google.maps.Map(mapContainerRef.current!, {
        center: { lat, lng },
        zoom,
      });

      // 初期位置のピンを作成
      const initialMarker = new google.maps.Marker({
        position: { lat, lng },
        map: initializedMap,
      });

      // マップとマーカーを state に保存
      setMap(initializedMap);
      setMarker(initialMarker);
    };

    document.head.appendChild(script);

    return () => {
      script.remove(); // クリーンアップ
    };
  }, [apiKey, lat, lng, zoom]);

  return (
    <div className="w-screen h-screen m-0 p-0">
      <div ref={mapContainerRef} style={{ width: "100%", height: "100%" }} />
    </div>
  );
}
