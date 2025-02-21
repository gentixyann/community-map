"use client";

export default function Footer() {
  return (
    <footer className="text-xs text-[#c1c1c1] flex items-center justify-center h-[28px] px-4">
      <p>© {new Date().getFullYear()} コミュマップ. All rights reserved.</p>
    </footer>
  );
}
