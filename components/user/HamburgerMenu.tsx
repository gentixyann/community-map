"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

/**
 * HamburgerMenu コンポーネント
 * - 画面右上に固定されるハンバーガーメニューのボタンを表示し、
 *   クリックでドロップダウンメニューを開閉します。
 * - ドロップダウンメニューは指定されたスタイルで表示され、各メニュー項目は Link で実装されています。
 */
export default function HamburgerMenu() {
  const [isOpen, setIsOpen] = useState(false);

  // メニューの開閉をトグルするハンドラー
  const toggleMenu = () => setIsOpen((prev) => !prev);

  return (
    <div className="fixed top-[4rem] right-1.5 z-50">
      {/* ハンバーガーメニューアイコン */}
      <button
        onClick={toggleMenu}
        className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-md"
      >
        <Image
          src="/images/hamburger_menu.svg"
          alt="Hamburger Menu"
          width={24}
          height={24}
        />
      </button>

      {/* ドロップダウンメニュー：固定位置で表示 */}
      {isOpen && (
        <div
          className="fixed z-40 rounded-xl bg-[#FAFAFA] p-4 shadow-lg"
          id="animation"
          style={{
            top: "56px",
            right: "56px",
            maxHeight: "207px",
            width: "190px",
            opacity: 1,
            transform: "none",
            transformOrigin: "190px 46px",
            transition:
              "opacity 235ms cubic-bezier(0.4, 0, 0.2, 1), transform 157ms cubic-bezier(0.4, 0, 0.2, 1)",
          }}
        >
          <Link href="/admin" className="block py-2 hover:underline">
            運営について
          </Link>
          <Link href="/admin/register" className="block py-2 hover:underline">
            コミュニティ登録するには？
          </Link>
        </div>
      )}
    </div>
  );
}
