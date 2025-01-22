"use client";

import { useEffect, useState } from "react";
import UserMap from "../components/user/UserMap";
import { fetchCommunityData, CommunityData } from "../firebase/user/firestore";

export default function Home() {
  const [communities, setCommunities] = useState<CommunityData[]>([]);

  useEffect(() => {
    // Firestore からデータを取得
    const getCommunityData = async () => {
      const data = await fetchCommunityData();
      setCommunities(data);
    };

    getCommunityData();
  }, []);

  return (
    <main className="flex flex-col items-center justify-center min-h-screen">
      {/* Firestore データを UserMap に渡す */}
      <UserMap
        apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}
        communities={communities}
      />
    </main>
  );
}
