"use client";

import { useState } from "react";

const OverviewInput = ({ overview }: { overview: (value: string) => void }) => {
  const [text, setText] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;
    setText(newText);
    overview(newText);
  };

  return (
    <div className="my-8 p-5 w-full max-w-3xl shadow-md rounded-lg relative">
      <label className="block mb-2 font-semibold" htmlFor="overview">
        どんなところ？簡単に概要書いて
      </label>
      <textarea
        id="overview"
        maxLength={140}
        className="border w-full px-3 py-2 rounded resize-none"
        placeholder="新宿より徒歩104分の好立地な場所にてアーバンジャングルな複合施設が爆誕。シェアハウスであってシェアハウスではない、民泊であって民泊でない、飲食店であって飲食店でない。小屋はあるけど小屋として成り立っていない。でも竹林はある。そんな場所であなたと未来を作りたい。"
        onChange={handleChange}
        value={text}
      />
      {/* 文字数カウンター */}
      <div className="text-right text-sm text-gray-600 mt-1">
        {text.length} / 140
      </div>
    </div>
  );
};

export default OverviewInput;
