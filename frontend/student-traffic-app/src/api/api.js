import API_URLS from "./axiosConfig";

export const registerUser = async (userData) => {
  const response = await fetch(`${API_URLS.AUTH_SERVICE}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error("Ошибка регистрации: " + errorData.error);
  }

  return response.json();
};

export const loginUser = async (loginData) => {
  const response = await fetch(`${API_URLS.AUTH_SERVICE}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(loginData),
  });

  if (!response.ok) {
    // const errorBody = await response.json();
    throw new Error("Ошибка входа: " + "неправильный логин или пароль");
  }

  return response.json();
};

export const fetchWithToken = async (endpoint, token) => {
  const response = await fetch(`${API_URLS.BASE_URL}${endpoint}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Ошибка запроса");
  }

  return response.json();
};

export const postWithTokenAndPayload = async (endpoint, token, payload) => {
  const response = await fetch(`${API_URLS.BASE_URL}${endpoint}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error("Ошибка запроса");
  }

  return response.json();
};

export const patchWithTokenAndPayload = async (endpoint, token, payload) => {
  const response = await fetch(`${API_URLS.BASE_URL}${endpoint}`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error("Ошибка запроса");
  }

  return response.json();
};

export const getUserQrCode = (userId) => {
  return `${API_URLS}/${userId}/qr-code`;
};

export const verifyQrCode = async (qrContent) => {
  try {
    const response = await fetch(`${API_URLS.BASE_URL}/verify-qr/${qrContent}`);
    return response.data;
  } catch (error) {
    console.error("QR verification error:", error);
    throw error;
  }
};
