const BASE_URL = "http://localhost:8080";

export async function fetchUserById(id) {
  const response = await fetch(`${BASE_URL}/get-user-by-id/${id}`);
  return await response.json();
}

export async function fetchUserByEmail(email) {
  const response = await fetch(`${BASE_URL}/get-user-by-email/${email}`);
  return await response.json();
}

export async function registerUser(userData) {
  const response = await fetch(`${BASE_URL}/add`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });
  return response;
}

export async function loginUser(email) {
  return await fetchUserByEmail(email);
}

export async function getUserQrCode(id) {
  const response = await fetch(`${BASE_URL}/${id}/qr-code`);
  const blob = await response.blob();
  return URL.createObjectURL(blob);
}
