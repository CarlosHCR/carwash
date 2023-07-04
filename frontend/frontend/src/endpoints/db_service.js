import { API_URL } from "./settings.js";
const token = "288a09592c0394374adbd518a652ac89c0b64f5b";

async function setService({
  plate,
  selectedService,
  date,
  price,
  description,
}) {
  console.log(plate, selectedService, date, price, description);
  const data = {
    plate: plate,
    type: selectedService,
    date: date,
    price: price,
    description: description,
  };
  try {
    const response = await fetch(`${API_URL}/services/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
      body: JSON.stringify(data),
    });
    return response;
  } catch (error) {
    console.error("Error:", error);
  }
}

async function getService() {
  try {
    const response = await fetch(`${API_URL}/services/`);
    return response.json();
  } catch (error) {
    console.log(error);
  }
}

async function getServiceReports(date) {
  try {
    const response = await fetch(`${API_URL}/services/?${date}`);
    return response.json();
  } catch (error) {
    console.log(error);
  }
}

async function updateService({ id, plate, type, date, price }) {
  const description = document.getElementById("description").value;
  const data = {
    plate,
    type: type,
    price,
    date,
    description,
  };
  try {
    const response = await fetch(`${API_URL}/services/${id}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  } catch (error) {
    console.log(error);
  }
}

async function deleteService(id) {
  try {
    const response = await fetch(`${API_URL}/services/${id}/`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error:", error);
  }
}

export {
  setService,
  getService,
  getServiceReports,
  updateService,
  deleteService,
};
