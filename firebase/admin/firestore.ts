import {
  doc,
  setDoc,
  collection,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
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

// ドキュメント更新用のメソッド
export const updateCommunity = async (
  id: string,
  data: Partial<CommunityData>
) => {
  // 指定した id のドキュメント参照を取得
  const docRef = doc(db, "community", id);
  // 更新するフィールドとサーバー側の更新日時をセット
  await updateDoc(docRef, {
    ...data,
    updatedAt: serverTimestamp(),
  });
};
