import { Dispatch, SetStateAction } from "react";

// Props に現在の値（name）と更新用の関数（setName）の両方を受け取る
type NameInputProps = {
  name: string;
  setName: Dispatch<SetStateAction<string>>;
};

const NameInput = ({ name, setName }: NameInputProps) => {
  return (
    <div className="my-8 p-5 w-full max-w-3xl shadow-md rounded-lg">
      <label className="block mb-2 font-semibold" htmlFor="name">
        名前を入力してね
      </label>
      <input
        id="name"
        type="text"
        value={name}
        className="border w-full px-3 py-2 rounded"
        placeholder="アーバンジャングル"
        onChange={(e) => setName(e.target.value)}
      />
    </div>
  );
};

export default NameInput;
