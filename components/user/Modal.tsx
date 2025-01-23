"use client";

import { useRouter } from "next/navigation";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  content: { id: string; name: string } | null;
};

export default function Modal({ isOpen, onClose, content }: ModalProps) {
  const router = useRouter();

  if (!isOpen || !content) return null; // モーダルが開いていない場合は何も表示しない

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-4 rounded shadow-lg w-96">
        <div className="text-right">
          <button onClick={onClose} className="text-xl font-bold">
            ×
          </button>
        </div>
        <div className="mt-4">
          <p className="text-lg font-semibold">{content.name}</p>
          <button
            onClick={() => router.push(`/community/${content.id}`)} // 動的ページに遷移
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
          >
            詳しく見る
          </button>
        </div>
      </div>
    </div>
  );
}
