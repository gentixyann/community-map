// firebase/user/firestore.ts
import { getDocs, collection } from "firebase/firestore";
import db from "../firebase";

// 保存されたコミュニティデータの型定義
export type CommunityData = {
  id: string;
  name: string;
  lat: number;
  lng: number;
  createdAt?: number; // createdAt をミリ秒の数値として扱う（オプション）
};

// コミュニティーデータを取得する関数
export const fetchCommunityData = async (): Promise<CommunityData[]> => {
  const snapshot = await getDocs(collection(db, "community"));
  return snapshot.docs.map((doc) => {
    const data = doc.data();
    // Firestore の Timestamp をプレーンな値に変換（存在する場合）
    if (data.createdAt && typeof data.createdAt.toMillis === "function") {
      data.createdAt = data.createdAt.toMillis();
    }
    return {
      id: doc.id,
      ...data,
    };
  }) as CommunityData[]; // 型を明示
};
