let SERVICES_TYPE = [];
const ip = getIp();

function setDateInputValue(date) {
  const today = new Date();
  const dd = String(today.getDate()).padStart(2, "0");
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const yyyy = today.getFullYear();
  const formattedDate = yyyy + "-" + mm + "-" + dd;

  const input = document.getElementById(date);
  input.value = formattedDate;
}

function setPrice(increment) {
  const priceInput = document.getElementById("price");
  if (priceInput) {
    const priceValue = parseFloat(priceInput.value);
    if (isNaN(priceValue)) {
      priceInput.value = "0";
    } else {
      priceInput.value = (priceValue + increment).toFixed(2);
    }
  }
}

function clearForm() {
  const inputs = document.querySelectorAll("input[type=text]");
  for (let input of inputs) {
    input.value = "";
  }
  document.querySelector("#report-type").selectedIndex = 0;
  document.querySelector("#date").value = "";
  document.querySelector("#price").value = "0.00";
  document.querySelector("#description").value = "";
}

function validateOfValues() {
  const plate = document.getElementById("plate").value;
  const serviceType = document.getElementById("report-type").value;
  const price = parseFloat(document.getElementById("price").value);
  const date = document.getElementById("date").value;

  try {
    const plateValid = validatePlate(plate);
    const type = validateType(serviceType);
    const dateValid = validateDate(date);
    const priceValid = validatePrice(price);
    const response = request({ plate, type, price, date });
  } catch (err) {
    showError(ERRORS[err.message]);
  }
}

async function request({ plate, type, date, price }) {
  const description = document.getElementById("description").value;
  document.getElementById("register-confirm").style.display = "flex";
  const data = {
    plate,
    service_type: type,
    price,
    date,
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
    clearForm();
  } catch (error) {
    console.error("Error:", error);
  }
}

async function serviceRequest() {
  try {
    const response = await fetch(`${ip}/api/services_type/`);

    if (response.ok) {
      const services = await response.json();
      SERVICES_TYPE = services;
      const selectElement = document.getElementById("report-type");
      services.forEach((service) => {
        const optionElement = document.createElement("option");
        optionElement.text = service.name;
        selectElement.appendChild(optionElement);
      });
    } else {
      throw new Error("Erro na requisição");
    }
  } catch (error) {
    console.error("Error:", error);
  }
}
