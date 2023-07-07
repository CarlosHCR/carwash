import { API_URL } from "./settings.js";


async function setType({ name }) {
  const data = {
    name,
  };

  try {
    const response = await fetch(`${API_URL}/type/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return response.json();
  } catch (error) {
    console.error("Error:", error);
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
  setType,
  getType,
  updateType,
  deleteType,
};