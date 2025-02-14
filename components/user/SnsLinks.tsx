"use client";

import Link from "next/link";
import Image from "next/image";
import { SnsLinks } from "@/model/SnsLinksModel";

/**
 * SnsLinksComponent コンポーネント
 * - 受け取った snsLinks オブジェクトの各プロパティに対して、該当するSNSのロゴ画像を個別に表示します。
 * - それぞれのリンクが存在する場合にのみ、対応するロゴ画像とリンクを表示します。
 */
type SnsLinksProps = {
  snsLinks?: SnsLinks;
};

export default function SnsLinksComponent({ snsLinks }: SnsLinksProps) {
  if (!snsLinks) return null;

  return (
    <div className="flex space-x-4 items-center justify-center">
      {/* Instagram のリンクとロゴ */}
      {snsLinks.instagram && (
        <Link
          href={snsLinks.instagram}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            src="/images/sns/Instagram_logo.svg"
            alt="Instagram logo"
            width={32}
            height={32}
          />
        </Link>
      )}

      {/* Note のリンクとロゴ */}
      {snsLinks.note && (
        <Link href={snsLinks.note} target="_blank" rel="noopener noreferrer">
          <Image
            src="/images/sns/note_logo.svg"
            alt="Note logo"
            width={32}
            height={32}
          />
        </Link>
      )}

      {/* X のリンクとロゴ */}
      {snsLinks.x && (
        <Link href={snsLinks.x} target="_blank" rel="noopener noreferrer">
          <Image
            src="/images/sns/x_logo.svg"
            alt="X logo"
            width={32}
            height={32}
          />
        </Link>
      )}
    </div>
  );
}
