import { jwtDecode } from "jwt-decode";

// Берем токен из localStorage
export const getToken = () => {
  return localStorage.getItem("token");
};

// Сохраняем токен в localStorage
export const setToken = (token) => {
  localStorage.setItem("token", token);
};

// Удаляем токен
export const removeToken = () => {
  localStorage.removeItem("token");
};

export const logout = (navigate) => {
  localStorage.removeItem("token");
  navigate("/login");
};

// Проверяем истёк ли срок действия токена
export const isTokenExpired = (token) => {
  if (!token) return true;
  try {
    const decodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    return decodedToken.exp < currentTime;
  } catch (error) {
    console.error("Error decoding token:", error);
    return true;
  }
};

// Проверяем авторизован ли пользователь, если срок действия токен истёк или его нет в localStorage,
// мы перенаправляем пользователя на страницу входа
export const checkAuthenticated = (token, navigate) => {
  if (token) {
    if (isTokenExpired(token)) {
      localStorage.removeItem("token");
      navigate("/not-authenticated");
    }
  } else {
    navigate("/not-authenticated");
  }
};

export const isAuthenticated = (token) => {
  if (token) {
    return !isTokenExpired(token);
  } else {
    return false;
  }
};

// Получаем sub из токена - nickname пользователя
export const getSubFromToken = (token, navigate) => {
  if (!token || typeof token !== "string") {
    console.error("Invalid token: Must be a non-empty string");
    navigate("/not-found");
    return null;
  }

  try {
    const decodedToken = jwtDecode(token);
    return decodedToken.sub;
  } catch (error) {
    console.error("Error decoding token:", error);
    navigate("/not-found");
    return null;
  }
};
