"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { saveImage } from "@/firebase/admin/firestore";

// communityId を props として受け取る（画像を既存コミュニティに紐づける場合に使用しますが、
// 新規登録の場合は空文字等でも可）
type FileUploaderProps = {
  communityId: string;
  // アップロード完了時に downloadURL を親に返すコールバック
  onUpload: (downloadURL: string) => void;
};

export default function FileUploader({ onUpload }: FileUploaderProps) {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // ファイルが選択されたときにプレビュー用 URL を生成
  useEffect(() => {
    if (!file) {
      setPreviewUrl(null);
      return;
    }
    const objectUrl = URL.createObjectURL(file);
    setPreviewUrl(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [file]);

  // ファイル選択イベント
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  // 画像アップロード処理
  const handleUpload = async () => {
    if (!file) return;
    setUploading(true);
    setError(null);
    try {
      // Storage に画像をアップロードして downloadURL を取得
      const url = await saveImage(file);
      setDownloadUrl(url);
      // 親に downloadURL を返す
      onUpload(url);
      // 必要に応じて、既存コミュニティに直接保存する場合は以下も実行
      // await saveImageToFirestore(communityId, url);
      alert("画像のアップロードに成功しました！");
    } catch (err) {
      console.error(err);
      setError("画像のアップロードに失敗しました。");
    }
    setUploading(false);
  };

  return (
    <div className="my-8 p-5 w-full max-w-3xl shadow-md rounded-lg">
      <h2 className="text-xl font-bold mb-4">画像アップローダー</h2>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      {previewUrl && (
        <div className="mt-4">
          <p className="mb-2">プレビュー:</p>
          <Image
            width={300}
            height={300}
            className="max-w-full h-auto rounded border"
            src={previewUrl}
            alt="Preview"
          />
        </div>
      )}
      <button
        onClick={handleUpload}
        disabled={!file || uploading}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        {uploading ? "アップロード中..." : "画像をアップロード"}
      </button>
      {downloadUrl && (
        <div className="mt-4">
          <p className="text-green-600">アップロード完了！</p>
          <a
            href={downloadUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 underline"
          >
            ダウンロードリンクを表示
          </a>
        </div>
      )}
      {error && <p className="mt-4 text-red-500">{error}</p>}
    </div>
  );
}
