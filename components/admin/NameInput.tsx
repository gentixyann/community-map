import { Dispatch, SetStateAction } from "react";

const NameInput = (props: { name: Dispatch<SetStateAction<string>> }) => {
  const { name } = props;
  return (
    <div className="my-8 p-5 w-full max-w-3xl shadow-md rounded-lg">
      <label className="block mb-2 font-semibold" htmlFor="name">
        名前を入力してね
      </label>
      <input
        id="name"
        type="text"
        className="border w-full px-3 py-2 rounded"
        placeholder="アーバンジャングル"
        onChange={(e) => name(e.target.value)}
      />
    </div>
  );
};

export default NameInput;
