"use client";

import { useState } from "react";
import { CommunityData } from "@/model/CommunityModel";
import { updateCommunity } from "@/firebase/admin/firestore";
import NameInput from "@/components/admin/form/NameInput";
import OverviewInput from "@/components/admin/form/OverviewInput";
import FileUploader from "@/components/admin/form/FileUploader";
import CurrentImagePreview from "@/components/admin/form/CurrentImagePreview";

type EditCommunityFormProps = {
  // 初期値として対象コミュニティのデータを受け取る（id を含む）
  initialCommunity: CommunityData & { id: string };
};

export default function EditCommunityForm({
  initialCommunity,
}: EditCommunityFormProps) {
  // フォームの入力状態を管理（初期値は Firestore から取得した値）
  const [name, setName] = useState(initialCommunity.name);
  const [overview, setOverview] = useState(initialCommunity.overview);
  // アップロードされた画像の URL
  const [uploadedUrl, setUploadedUrl] = useState<string | null>(
    initialCommunity.image || null
  );
  // エラーメッセージおよびローディング状態
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // 更新ボタン押下時の処理
  const handleUpdate = async () => {
    setLoading(true);
    setError(null);
    try {
      // updateCommunity を呼び出し、対象ドキュメントを更新
      const updateData: Partial<CommunityData> = { name, overview };
      if (uploadedUrl) {
        updateData.image = uploadedUrl;
      }
      await updateCommunity(initialCommunity.id, updateData);
      alert("コミュニティが更新されました！");
    } catch (err) {
      console.error(err);
      setError("更新に失敗しました。");
    }
    setLoading(false);
  };

  return (
    <div className="w-full max-w-lg p-4 border rounded shadow-md">
      {/* NameInput と OverviewInput を利用してコンポーネント分割 */}
      <NameInput name={name} setName={setName} />
      <OverviewInput overview={overview} setOverview={setOverview} />
      {/* 現在登録されている画像のプレビュー表示 */}
      <CurrentImagePreview imageUrl={uploadedUrl} />
      {/* FileUploader を追加して画像アップロード機能を提供 */}
      <FileUploader
        communityId={initialCommunity.id}
        onUpload={(url) => {
          setUploadedUrl(url);
          console.log("Uploaded URL:", url);
        }}
      />

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
