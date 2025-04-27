import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { isAuthenticated, logout, getSubFromToken } from "../api/authApi";
import "../styles/Header.css";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const token = localStorage.getItem("token");
  const [isAuth, setAuth] = useState(null);
  const [isOpen, setOpen] = useState();
  const navigate = useNavigate();
  const [currentUsername, setCurrentUsername] = useState(null);

  useEffect(() => {
    setAuth(isAuthenticated(token));
    if (isAuth) {
      setCurrentUsername(getSubFromToken(token, navigate));
    }
  }, [token, navigate]);

  return (
    <header className="header">
      <div className="logo">Student Traffic</div>
      <nav className={`nav ${menuOpen ? "open" : ""}`}>
        <Link to="/">Главная</Link>
        {!setAuth && <Link to="/login">Войти</Link>}
        {!setAuth && <Link to="/register">Регистрация</Link>}
        {setAuth && setAuth.role === "ADMIN" && (
          <Link to="/admin">Админ-панель</Link>
        )}
        {setAuth && (
          <button onClick={logout} className="logout-btn">
            Выйти
          </button>
        )}
      </nav>
      <div className="menu-icon" onClick={() => setMenuOpen(!menuOpen)}>
        ☰
      </div>
    </header>
  );
}

export default Header;
