"use client";

import Image from "next/image";

type CurrentImagePreviewProps = {
  imageUrl: string | null;
};

/**
 * CurrentImagePreview コンポーネント
 * - 現在登録されている画像がある場合、その画像のプレビューを表示します。
 */
export default function CurrentImagePreview({
  imageUrl,
}: CurrentImagePreviewProps) {
  if (!imageUrl) {
    return (
      <div className="mb-4 p-4 border rounded text-gray-500">
        現在登録されている画像はありません。
      </div>
    );
  }

  return (
    <div className="mb-4">
      <p className="mb-2 font-semibold">現在登録されている画像</p>
      <div className="relative w-64 h-64 border rounded overflow-hidden">
        <Image
          src={imageUrl}
          alt="Current Image"
          layout="fill"
          objectFit="cover"
        />
      </div>
    </div>
  );
}
