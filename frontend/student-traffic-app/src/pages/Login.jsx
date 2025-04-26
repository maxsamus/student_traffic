import { useState } from "react";
import { loginUser } from "../api/userApi";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();
    try {
      const user = await loginUser(email);
      if (user.id) {
        localStorage.setItem("userId", user.id);
        navigate("/");
      } else {
        alert("Пользователь не найден!");
      }
    } catch (error) {
      console.error(error);
      alert("Ошибка входа");
    }
  }

  return (
    <form
      onSubmit={handleLogin}
      className="max-w-md mx-auto mt-10 flex flex-col gap-4"
    >
      <input
        type="email"
        placeholder="Email"
        className="border p-2"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button className="bg-blue-600 text-white p-2 rounded">Войти</button>
    </form>
  );
}
