import GoogleMap from "../components/Map";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen">
      <GoogleMap
        apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}
        lat={35.6895} // 東京の緯度
        lng={139.6917} // 東京の経度
        zoom={15}
      />
    </main>
  );
}
