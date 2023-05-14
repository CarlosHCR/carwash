async function setPlate({ name }) {
  const data = {
    name,
  };

  try {
    const response = await fetch(`${ip}/api/plates/`, {
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

async function getPlate() {
  try {
    const response = await fetch(`${ip}/api/plates/`);
    validateResponse(response);
    return response.json();
  } catch (err) {
    showError(ERRORS[err.message]);
  }
}

async function updatePlate({ id, number }) {
  const data = {
    number,
  };

  try {
    const response = await fetch(`${ip}/api/plates/${id}`, {
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

async function deletePlate({ id }) {
  try {
    const response = await fetch(`${ip}/api/plates/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error:", error);
  }
}
