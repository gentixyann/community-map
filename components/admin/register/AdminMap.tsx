"use client";

import { useEffect, useRef, useState } from "react";

type GoogleMapProps = {
  apiKey: string;
  lat: number; // 緯度
  lng: number; // 経度
  zoom: number; // ズームレベル
  gestureHandling: "greedy";
};

export default function GoogleMap({
  apiKey,
  lat,
  lng,
  zoom,
  gestureHandling,
}: GoogleMapProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const markerRef = useRef<google.maps.Marker | null>(null);

  // 初期の lat, lng を ref に保持（初回の center 設定用）
  const initialLatRef = useRef(lat);
  const initialLngRef = useRef(lng);

  // Google Maps API を読み込み、map を初期化する effect
  useEffect(() => {
    if (!mapContainerRef.current) return;

    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
    script.async = true;

    script.onload = () => {
      // 初期の中心は初期値として保持した ref の値を利用
      const initializedMap = new google.maps.Map(mapContainerRef.current!, {
        center: { lat: initialLatRef.current, lng: initialLngRef.current },
        zoom,
        gestureHandling,
      });
      setMap(initializedMap);
    };

    document.head.appendChild(script);

    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, [apiKey, gestureHandling, zoom]); // lat, lng は初回のみ利用するため依存配列に含めません

  // lat, lng が変わったときに、マーカーを更新し、map の中心を変更する effect
  useEffect(() => {
    if (!map) return;

    // 既存のマーカーがあれば削除
    if (markerRef.current) {
      markerRef.current.setMap(null);
    }

    // 新しいマーカーを作成し、markerRef に保存
    markerRef.current = new google.maps.Marker({
      position: { lat, lng },
      map,
    });

    // map の中心を更新
    map.setCenter({ lat, lng });
  }, [lat, lng, map]);

  return (
    <div className="h-screen m-0 p-0">
      <div ref={mapContainerRef} style={{ width: "100%", height: "100%" }} />
    </div>
  );
}
