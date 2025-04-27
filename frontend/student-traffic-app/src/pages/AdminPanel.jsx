import React, { useState, useNavigate, useEffect } from "react";
import { verifyQrCode } from "../api/api";
import { checkAuthenticated, getSubFromToken } from "../api/authApi";
import "../styles/Pages.css";

function AdminPanel() {
  const [qrContent, setQrContent] = useState("");
  const [result, setResult] = useState(null);
  const token = localStorage.getItem("token");
  const [username, setUsername] = useState(null);
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    checkAuthenticated(token, navigate);
    setUsername(getSubFromToken(token));
  }, [token, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await verifyQrCode(qrContent);
    setResult(res);
  };

  return (
    <div className="page">
      <h1>Админ-Панель</h1>
      <form className="form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Введите код QR"
          value={qrContent}
          onChange={(e) => setQrContent(e.target.value)}
          required
        />
        <button type="submit">Проверить QR</button>
      </form>

      {result && (
        <div className="result">
          <h2>Результат:</h2>
          <p>Статус: {result.status}</p>
          <p>Имя: {result.user.name}</p>
          <p>Email: {result.user.email}</p>
        </div>
      )}
    </div>
  );
}

export default AdminPanel;
