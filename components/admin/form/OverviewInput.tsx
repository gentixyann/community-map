"use client";

import { Dispatch, SetStateAction, useState, useEffect } from "react";

type OverviewInputProps = {
  overview: string;
  setOverview: Dispatch<SetStateAction<string>>;
};

const OverviewInput = ({ overview, setOverview }: OverviewInputProps) => {
  const [text, setText] = useState(overview);

  // 外部の overview が変わった場合に内部状態を更新
  useEffect(() => {
    setText(overview);
  }, [overview]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;
    setText(newText);
    setOverview(newText);
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
        placeholder="新宿より徒歩104分の好立地な場所にてアーバンジャングルな複合施設が爆誕。..."
        onChange={handleChange}
        value={text}
      />
      <div className="text-right text-sm text-gray-600 mt-1">
        {text.length} / 140
      </div>
    </div>
  );
};

export default OverviewInput;
