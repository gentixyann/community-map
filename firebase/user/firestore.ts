import { getDocs, collection } from "firebase/firestore";
import db from "../firebase";

// 保存されたコミュニティデータの型定義
export type CommunityData = {
  id: string;
  name: string;
  lat: number;
  lng: number;
};

// データ取得関数
export const fetchCommunityData = async (): Promise<CommunityData[]> => {
  const snapshot = await getDocs(collection(db, "community"));
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as CommunityData[]; // 型を明示
};
