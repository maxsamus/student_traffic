import { useState } from "react";
import { registerUser } from "../api/userApi";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    surname: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  async function handleRegister(e) {
    e.preventDefault();
    try {
      const userData = {
        name: form.name + " " + form.surname,
        email: form.email,
        password: form.password,
      };
      const response = await registerUser(userData);
      if (response.status === 201) {
        alert("Регистрация успешна");
        navigate("/login");
      } else {
        alert("Ошибка регистрации");
      }
    } catch (error) {
      console.error(error);
      alert("Ошибка регистрации");
    }
  }

  return (
    <form
      onSubmit={handleRegister}
      className="max-w-md mx-auto mt-10 flex flex-col gap-4"
    >
      <input
        type="text"
        placeholder="Имя"
        className="border p-2"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />
      <input
        type="text"
        placeholder="Фамилия"
        className="border p-2"
        value={form.surname}
        onChange={(e) => setForm({ ...form, surname: e.target.value })}
      />
      <input
        type="email"
        placeholder="Email"
        className="border p-2"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />
      <input
        type="password"
        placeholder="Пароль"
        className="border p-2"
        value={form.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />
      <button className="bg-green-600 text-white p-2 rounded">
        Зарегистрироваться
      </button>
    </form>
  );
}
