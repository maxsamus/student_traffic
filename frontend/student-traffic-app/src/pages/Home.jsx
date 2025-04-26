import { useEffect, useState } from "react";
import { fetchUserById, getUserQrCode } from "../api/userApi";

export default function Home() {
  const [user, setUser] = useState(null);
  const [qrUrl, setQrUrl] = useState("");

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      fetchUserById(userId).then(setUser);
      getUserQrCode(userId).then(setQrUrl);
    }
  }, []);

  if (!user)
    return <div className="text-center mt-10">Пожалуйста, войдите</div>;

  return (
    <div className="flex flex-col items-center justify-center p-4 mt-10">
      <h2 className="text-2xl font-bold">{user.name}</h2>
      <p className="text-gray-500">{user.email}</p>
      {qrUrl && <img src={qrUrl} alt="QR Code" className="mt-6 w-48 h-48" />}
    </div>
  );
}
