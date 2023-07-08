import { API_URL } from "./settings.js";

async function setUserDB({ password1, password2, username, email }) {
  const data = {
    password1,
    password2,
    email,
    username,
  };
  try {
    const response = await fetch(`${API_URL}/register/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return await response.json();
  } catch (error) {
    throw error;
  }
}

export { setUserDB };
