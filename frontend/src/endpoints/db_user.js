import { API_URL } from "./settings.js";


async function setUserDB({password1, password2, username, firstName, lastName, email}) {
  const data = {
    password1,
    password2,
    email,
    username,
    first_name: firstName,
    last_name: lastName,
  };

  try {
    const response = await fetch(`${API_URL}/register/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return response.json();
  } catch (error) {
    throw error;
  }
}

async function getType() {
  try {
    const response = await fetch(`${API_URL}/type/`);
    return response.json();
  } catch (err) {
    console.log(err);
  }
}

async function updateType({ id, name }) {
  const data = {
    name,
  };

  try {
    const response = await fetch(`${API_URL}/type/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return response;
  } catch (error) {
    console.error("Error:", error);
  }
}

async function deleteType(id) {
  try {
    const response = await fetch(`${API_URL}/type/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response;
  } catch (error) {
    console.error("Error:", error);
  }
}

export {
  setUserDB,
};