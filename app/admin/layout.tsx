// app/admin/layout.tsx

import AdminHeader from "@/components/admin/Header";

/**
 * AdminLayout コンポーネント
 * - /admin 配下のページに共通のヘッダーを表示します。
 */
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      {/* ヘッダーコンポーネント */}
      <AdminHeader />
      {/* ページ固有のコンテンツ */}
      <section>{children}</section>
    </div>
  );
}
