// firebase/admin/firestore.ts
import {
  doc,
  setDoc,
  collection,
  serverTimestamp,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { db, storage } from "@/firebase/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { CommunityData } from "@/model/CommunityModel";
import { SnsLinks } from "@/model/SnsLinksModel";

// 保存するデータ型を定義
type RegisterCommunityData = {
  name: string;
  overview: string;
  lat: number;
  lng: number;
  image: string;
  snsLinks: SnsLinks;
};

// Firestore にデータを保存する関数
export const saveCommunity = async (data: RegisterCommunityData) => {
  const communityCollection = collection(db, "community");
  const docRef = doc(communityCollection);
  await setDoc(docRef, {
    ...data,
    createdAt: serverTimestamp(),
  });
};

// ドキュメント更新用のた方の関数
export const updateCommunity = async (
  id: string,
  data: Partial<CommunityData>
) => {
  const docRef = doc(db, "community", id);
  await updateDoc(docRef, {
    ...data,
    updatedAt: serverTimestamp(),
  });
};

// Storage に画像を保存する関数
export const saveImage = async (file: File) => {
  const storageRef = ref(storage, `images/${file.name}`);
  const snapshot = await uploadBytes(storageRef, file);
  const downloadURL = await getDownloadURL(snapshot.ref);
  return downloadURL;
};

// downloadURL を Firestore に保存する関数（更新用）
// ※今回の実装では、saveCommunity に image プロパティとして含める方法を採用しますが、
// 個別に更新する場合はこの関数を利用できます。
export const saveImageToFirestore = async (id: string, downloadURL: string) => {
  const docRef = doc(db, "community", id);
  await updateDoc(docRef, {
    image: downloadURL,
  });
};

// ドキュメント削除用の関数
export const deleteCommunity = async (id: string) => {
  const docRef = doc(db, "community", id);
  await deleteDoc(docRef);
};
