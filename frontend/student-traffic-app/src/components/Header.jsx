import { useState } from "react";
import { Link } from "react-router-dom";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="flex items-center justify-between p-4 bg-blue-600 text-white">
      <h1 className="text-2xl font-bold">Student Traffic App</h1>
      <nav>
        <button
          className="block md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>
        <ul
          className={`${
            menuOpen ? "block" : "hidden"
          } md:flex gap-4 items-center`}
        >
          <li>
            <Link to="/">Главная</Link>
          </li>
          <li>
            <Link to="/login">Вход</Link>
          </li>
          <li>
            <Link to="/register">Регистрация</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
