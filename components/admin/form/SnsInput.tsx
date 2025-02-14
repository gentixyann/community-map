"use client";

import { Dispatch, SetStateAction } from "react";
import { SnsLinks } from "@/model/SnsLinksModel";

/**
 * SnsInput コンポーネント
 * - SNSの各種リンク（Instagram, Note, X など）を入力・編集するためのフォームです。
 * - 現在の値と更新関数を受け取る controlled コンポーネントとして実装しています。
 */
type SnsInputProps = {
  snsLinks: SnsLinks;
  setSnsLinks: Dispatch<SetStateAction<SnsLinks>>;
};

export default function SnsInput({ snsLinks, setSnsLinks }: SnsInputProps) {
  // 入力変更時のハンドラー。name 属性を使って、各SNSリンクを更新します。
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSnsLinks((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="my-8 p-5 w-full max-w-3xl shadow-md rounded-lg">
      <h2 className="text-xl font-bold mb-4">SNSリンク</h2>
      {/* X (旧Twitter) */}
      <div className="mb-4">
        <label htmlFor="x" className="block text-sm font-semibold mb-1">
          X (旧Twitter)
        </label>
        <input
          type="text"
          id="x"
          name="x"
          value={snsLinks.x || ""}
          onChange={handleChange}
          placeholder="XのURLを入力"
          className="w-full border px-3 py-2 rounded"
        />
      </div>
      {/* Instagram */}
      <div className="mb-4">
        <label htmlFor="instagram" className="block text-sm font-semibold mb-1">
          Instagram
        </label>
        <input
          type="text"
          id="instagram"
          name="instagram"
          value={snsLinks.instagram || ""}
          onChange={handleChange}
          placeholder="InstagramのURLを入力"
          className="w-full border px-3 py-2 rounded"
        />
      </div>
      {/* Note */}
      <div className="mb-4">
        <label htmlFor="note" className="block text-sm font-semibold mb-1">
          Note
        </label>
        <input
          type="text"
          id="note"
          name="note"
          value={snsLinks.note || ""}
          onChange={handleChange}
          placeholder="NoteのURLを入力"
          className="w-full border px-3 py-2 rounded"
        />
      </div>
    </div>
  );
}
