"use client";

import { useEffect } from "react";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  content: string;
};

export default function Modal({ isOpen, onClose, content }: ModalProps) {
  // Escape キーでモーダルを閉じる処理
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [onClose]);

  if (!isOpen) return null; // モーダルが開いていない場合は何もレンダリングしない

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-4 rounded shadow-lg w-96">
        <div className="text-right">
          <button onClick={onClose} className="text-xl font-bold">
            ×
          </button>
        </div>
        <div className="mt-4">
          <p className="text-lg">{content}</p>
        </div>
      </div>
    </div>
  );
}
