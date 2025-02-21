"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  content: { id: string; name: string; image?: string } | null;
};

export default function Modal({ isOpen, onClose, content }: ModalProps) {
  const router = useRouter();

  // モーダルが開いていない場合は何もレンダリングしない
  if (!isOpen || !content) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      {/* モーダル全体のコンテナ。overflow-hidden により内側コンテンツのはみ出しを防止 */}
      <div className="bg-white rounded-xl shadow-lg w-96 overflow-hidden">
        {/* 画像エリア */}
        <div className="relative h-48 w-full">
          {content.image ? (
            <Image
              src={content.image}
              alt={content.name}
              layout="fill"
              objectFit="cover"
              className="object-cover"
            />
          ) : (
            <Image
              src="/images/no_image.svg"
              alt="No Image"
              layout="fill"
              objectFit="cover"
              className="object-cover"
            />
          )}
          {/* 閉じるボタンを画像の右上に被せる */}
          <button
            onClick={onClose}
            className="absolute top-2 right-2 bg-gray-300 text-black rounded-full w-8 h-8 flex items-center justify-center"
          >
            ×
          </button>
        </div>
        {/* コンテンツエリア */}
        <div className="p-4 text-center">
          <p className="text-lg font-semibold">{content.name}</p>
          <button
            onClick={() => router.push(`/community/${content.id}`)}
            className="mt-4 bg-black text-white px-4 py-2 rounded-full hover:bg-[#b3b3b3]"
          >
            詳しく見る
          </button>
        </div>
      </div>
    </div>
  );
}
