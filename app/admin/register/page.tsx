"use client";

import { useState } from "react";
import GoogleMap from "@/components/admin/register/AdminMap";
import NameInput from "@/components/admin/form/NameInput";
import AddressInput from "@/components/admin/register/AddressInput";
import { saveCommunity } from "@/firebase/admin/firestore";
import OverviewInput from "@/components/admin/form/OverviewInput";
import FileUploader from "@/components/admin/form/FileUploader";

export default function Home() {
  const [latLng, setLatLng] = useState({ lat: 35.6895, lng: 139.6917 });
  const [address, setAddress] = useState("");
  const [name, setName] = useState("");
  const [overview, setOverview] = useState("");
  const [uploadedUrl, setUploadedUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

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
        setLatLng({ lat: location.lat, lng: location.lng });
        setError(null);
      } else {
        setError("住所の取得に失敗しました。");
      }
    } catch {
      setError("Geocodingリクエスト中にエラーが発生しました。");
    }
  };

  // handleSave で uploadedUrl を含めたデータを保存
  const handleSave = async () => {
    try {
      if (!name || !address || !overview) {
        setError("名前と住所を入力してください。");
        return;
      }

      await saveCommunity({
        name,
        overview,
        lat: latLng.lat,
        lng: latLng.lng,
        image: uploadedUrl || "", // uploadedUrl があれば保存、なければ空文字
      });
      alert("データが保存されました！");
    } catch (error) {
      console.error(error);
      setError("データの保存に失敗しました。");
    }
  };

  return (
    <main className="min-h-screen flex flex-col justify-center items-center p-4">
      <AddressInput
        setAddress={setAddress}
        geocodeAddress={geocodeAddress}
        error={error}
      />
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
      <NameInput name={name} setName={setName} />
      <OverviewInput overview={overview} setOverview={setOverview} />
      {/* FileUploader に onUpload コールバックを渡す */}
      <FileUploader
        communityId=""
        onUpload={(url) => {
          setUploadedUrl(url);
          console.log("Uploaded URL:", url);
        }}
      />
      <button
        className="mt-6 px-4 py-2 bg-green-500 text-white font-semibold rounded hover:bg-green-600"
        onClick={handleSave}
      >
        保存する
      </button>
      {error && <p className="text-red-500 mt-3">{error}</p>}
    </main>
  );
}
