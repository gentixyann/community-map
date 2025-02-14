import { SnsLinks } from "./SnsLinksModel";

export type CommunityData = {
  id: string;
  name: string;
  overview: string;
  lat: number;
  lng: number;
  image?: string;
  snsLinks?: SnsLinks;
  createdAt?: number; // ミリ秒に変換
  updatedAt?: number; // ミリ秒に変換
};
