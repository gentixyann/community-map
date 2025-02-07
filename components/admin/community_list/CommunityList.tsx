// components/admin/CommunityList.tsx
"use client"; // クライアントコンポーネントとして実装（リンク操作などのクライアント側機能利用のため）

import Link from "next/link";
import { CommunityData } from "@/model/CommunityModel";

// Props の型定義
type CommunityListProps = {
  communities: CommunityData[];
};

export default function CommunityList({ communities }: CommunityListProps) {
  return (
    <ul className="list-disc pl-6 space-y-2">
      {communities.map((community) => (
        <li key={community.id}>
          {/* Next.js の Link コンポーネントを利用して、詳細ページに遷移 */}
          <Link
            href={`/admin/community_list/${community.id}`}
            className="text-blue-500 hover:underline"
          >
            {community.name}
          </Link>
        </li>
      ))}
    </ul>
  );
}
