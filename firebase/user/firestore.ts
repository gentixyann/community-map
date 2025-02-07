import { getDocs, collection } from "firebase/firestore";
import { db } from "../firebase";
import { CommunityData } from "@/model/CommunityModel";

// コミュニティーデータを取得する関数
export const fetchCommunityData = async (): Promise<CommunityData[]> => {
  const snapshot = await getDocs(collection(db, "community"));
  return snapshot.docs.map((doc) => {
    const data = doc.data();

    // Firestore の Timestamp フィールドをプレーンな値（ミリ秒）に変換
    if (data.createdAt && typeof data.createdAt.toMillis === "function") {
      data.createdAt = data.createdAt.toMillis();
    }
    if (data.updatedAt && typeof data.updatedAt.toMillis === "function") {
      data.updatedAt = data.updatedAt.toMillis();
    }

    return {
      id: doc.id,
      ...data,
    };
  }) as CommunityData[]; // 型を明示
};
