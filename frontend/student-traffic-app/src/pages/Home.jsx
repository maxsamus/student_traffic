import { React, useNavigate, useState, useEffect } from "react";
import { getUserQrCode, fetchWithToken } from "../api/api";
import { checkAuthenticated, getSubFromToken } from "../api/authApi";
import "../styles/Pages.css";

const Home = () => {
  const token = localStorage.getItem("token");
  const [username, setUsername] = useState(null);
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    checkAuthenticated(token, navigate);
    setUsername(getSubFromToken(token));

    fetchWithToken("/user/getUserByUsername/" + username, token)
      .then((data) => {
        setUser(data);
        setLoading(false);
      })
      .catch((err) => setError(err.message));
  }, []);

  if (!user) {
    return (
      <div className="page">
        <h1>Пожалуйста, войдите в аккаунт</h1>
      </div>
    );
  }

  return (
    <div className="page">
      <h1>Добро пожаловать, {user.name}!</h1>
      <div className="qr-container">
        <img
          src={getUserQrCode(user.id)}
          alt="QR код пользователя"
          className="qr-img"
        />
      </div>
    </div>
  );
};

export default Home;
