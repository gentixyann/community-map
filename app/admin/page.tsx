"use client";

import { useState, useEffect } from "react";
import GoogleMap from "@/components/admin/AdminMap";
import NameInput from "@/components/admin/NameInput";
import AddressInput from "@/components/admin/AddressInput";

export default function Home() {
  const [latLng, setLatLng] = useState({ lat: 35.6895, lng: 139.6917 }); // 初期値は東京
  const [address, setAddress] = useState(""); // 入力された住所
  const [name, setName] = useState(""); // 入力された名前
  const [error, setError] = useState<string | null>(null); // エラー管理

  // Geocoding API を使って住所から緯度経度を取得する関数
  const geocodeAddress = async () => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
          address
        )}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`
      );
      const data = await response.json();

      if (data.status === "OK") {
        const location = data.results[0].geometry.location;
        setLatLng({ lat: location.lat, lng: location.lng }); // 緯度経度を更新
        setError(null); // エラーをクリア
      } else {
        setError("住所の取得に失敗しました。");
      }
    } catch {
      setError("Geocodingリクエスト中にエラーが発生しました。");
    }
  };

  // nameが更新されるたびにログ出力
  useEffect(() => {
    if (name) {
      console.log(`Name updated: ${name}`);
    }
  }, [name]);

  return (
    <main className="min-h-screen  flex flex-col justify-center items-center p-4">
      {/* 住所入力 */}
      <AddressInput
        setAddress={setAddress}
        geocodeAddress={geocodeAddress}
        error={error}
      />

      {/* Googleマップ */}
      <div className="w-full max-w-screen-lg">
        <div className="shadow-lg rounded-lg overflow-hidden">
          <GoogleMap
            apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}
            lat={latLng.lat}
            lng={latLng.lng}
            zoom={15}
            gestureHandling="greedy"
          />
        </div>
      </div>

      <NameInput name={setName} />
    </main>
  );
}
