import { Dispatch, SetStateAction } from "react";

const AddressInput = (props: {
  setAddress: Dispatch<SetStateAction<string>>;
  geocodeAddress: () => Promise<void>;
  error: string | null;
}) => {
  const { setAddress, geocodeAddress, error } = props;

  return (
    <div className="my-8 p-5 w-full max-w-3xl shadow-md rounded-lg">
      <label className="block mb-2 font-semibold" htmlFor="address-input">
        住所を入力してね
      </label>
      <input
        id="address-input"
        type="text"
        className="border w-full px-3 py-2 rounded"
        placeholder="例: 東京都千代田区"
        onChange={(e) => setAddress(e.target.value)}
      />
      <button
        className="mt-4 px-4 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600 w-full"
        onClick={geocodeAddress}
      >
        Set Pin
      </button>
      {error && <p className="text-red-500 mt-3">{error}</p>}
    </div>
  );
};

export default AddressInput;
