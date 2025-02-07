// components/admin/community_list/EditCommunityForm.tsx
"use client";

import { useState } from "react";
import { CommunityData } from "@/firebase/user/firestore";
import { updateCommunity } from "@/firebase/admin/firestore";

type EditCommunityFormProps = {
  // 初期値として対象コミュニティのデータを受け取る
  initialCommunity: CommunityData & { id: string };
};

export default function EditCommunityForm({
  initialCommunity,
}: EditCommunityFormProps) {
  // フォームの入力状態を管理（初期値は Firestore から取得した値）
  const [name, setName] = useState(initialCommunity.name);
  const [overview, setOverview] = useState(initialCommunity.overview);
  // エラーメッセージおよびローディング状態
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // 更新ボタン押下時の処理
  const handleUpdate = async () => {
    setLoading(true);
    setError(null);
    try {
      // updateCommunity を呼び出し、対象ドキュメントを更新
      await updateCommunity(initialCommunity.id, { name, overview });
      alert("コミュニティが更新されました！");
    } catch (err) {
      console.error(err);
      setError("更新に失敗しました。");
    }
    setLoading(false);
  };

  return (
    <div className="w-full max-w-lg p-4 border rounded shadow-md">
      <div className="mb-4">
        <label className="block text-sm font-semibold mb-1" htmlFor="name">
          名前
        </label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border px-3 py-2 rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-semibold mb-1" htmlFor="overview">
          概要
        </label>
        <textarea
          id="overview"
          value={overview}
          onChange={(e) => setOverview(e.target.value)}
          className="w-full border px-3 py-2 rounded"
          maxLength={500}
        />
      </div>
      {error && <p className="text-red-500 mb-2">{error}</p>}
      <button
        onClick={handleUpdate}
        disabled={loading}
        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
      >
        {loading ? "更新中..." : "更新する"}
      </button>
    </div>
  );
}
