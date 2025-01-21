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
  const [marker, setMarker] = useState<google.maps.Marker | null>(null);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
    script.async = true;

    script.onload = () => {
      const initializedMap = new google.maps.Map(mapContainerRef.current!, {
        center: { lat, lng },
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
  }, [apiKey, gestureHandling, zoom]);

  useEffect(() => {
    if (!map) return;

    // マーカー更新と地図の中心移動
    if (marker) {
      marker.setMap(null);
    }

    const newMarker = new google.maps.Marker({
      position: { lat, lng },
      map,
    });

    setMarker(newMarker);
    map.setCenter({ lat, lng });
  }, [lat, lng, map]);

  return (
    <div className=" h-screen m-0 p-0">
      <div ref={mapContainerRef} style={{ width: "100%", height: "100%" }} />
    </div>
  );
}
