async function setType({ name }) {
  const data = {
    name,
  };

  try {
    const response = await fetch(`${ip}/api/type/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  } catch (error) {
    console.error("Error:", error);
  }
}

async function getType() {
  try {
    const response = await fetch(`${ip}/api/type/`);
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
    const response = await fetch(`${ip}/api/type/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  } catch (error) {
    console.error("Error:", error);
  }
}

async function deleteType(id) {
  try {
    const response = await fetch(`${ip}/api/type/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error:", error);
  }
}
