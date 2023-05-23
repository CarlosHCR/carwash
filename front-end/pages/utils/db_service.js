async function setService({ plate, type, date, price }) {
  const description = document.getElementById("description").value;
  const type_id = validateType(type);
  const data = {
    plate: plate,
    type: type_id,
    date: date,
    price: price,
    description: description,
  };
  try {
    const response = await fetch(`${ip}/api/services/`, {
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

async function getService() {
  try {
    const response = await fetch(`${ip}/api/services/`);
    return response.json();
  } catch (error) {
    console.log(error);
  }
}

async function getServiceReports(date) {
  try {
    const response = await fetch(`${ip}/api/services/?${date}`);
    return response.json();
  } catch (error) {
    console.log(error);
  }
}

async function updateService({ id, plate, type, date, price }) {
  const description = document.getElementById("description").value;
  const type_id = validateType(type);
  const data = {
    plate,
    type: type_id,
    price,
    date,
    description,
  };
  try {
    const response = await fetch(`${ip}/api/services/${id}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    getSuccess("Sucesso em atualizar o serviço!");
  } catch (error) {
    getErro("Erro ao atualizar o serviço!" + error);
  }
}

async function deleteService(id) {
  try {
    const response = await fetch(`${ip}/api/services/${id}/`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error:", error);
  }
}
