import { doc, setDoc, collection, serverTimestamp } from "firebase/firestore";
import db from "../firebase";

// 保存するデータ型を定義
type CommunityData = {
  name: string;
  overview: string;
  lat: number;
  lng: number;
};

// Firestore にデータを保存する関数
export const saveCommunity = async (data: CommunityData) => {
  const communityCollection = collection(db, "community");
  const docRef = doc(communityCollection);
  await setDoc(docRef, {
    ...data,
    createdAt: serverTimestamp(),
  });
};
