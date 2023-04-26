  const ERRORS = {
    "INVALID_DATE": {
      field: "date",
      message: "A data deve conter apenas números e um ano maior que 2023.",
    },
    "INVALID_PLATE": { field: "plate", message: "A placa deve ter 7 caracteres." },
    "INVALID_PRICE": {
      field: "price",
      message: "O preço deve estar entre R$0,01 e R$1.000,00.",
    }
  }

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
  priceInput.value = (parseFloat(priceInput.value) + increment).toFixed(2);
}

function validateOfValues() {
  const plate = document.getElementById("plate").value;
  const price = parseFloat(document.getElementById("price").value);
  const date = document.getElementById("date").value;

  try {
    const plateValid = validatePlate(plate)
    const dateValid = validateDate(date)
    const priceValid = validatePrice(price)
    const response = request({plate, price, date})
  } catch (err) {
    showError(ERRORS[err.message])
  }
 
}

function validatePlate(plate) {
  plate = plate.replace(/ /g, "");
  if (plate.length !== 7) throw new Error("INVALID_DATE")
}

function validateDate(date) {
  const year = date.split("-")[0];
  if (date === "" || year < 2023) throw new Error("INVALID_DATE")
}

function validatePrice(price) {
  if (price < 0.01 || price > 1000) throw new Error("INVALID_PRICE")
}

function showError({field, message}) {
  const element = document.getElementById(field);
  element.classList.add("invalid");
  animateError(element);
  alert(message);
}

function animateError(element) {
  element.animate(
    [
      { transform: "translateX(-10px)" },
      { transform: "translateX(10px)" },
      { transform: "translateX(-10px)" },
      { transform: "translateX(10px)" },
      { transform: "translateX(-10px)" },
      { transform: "translateX(10px)" },
      { transform: "translateX(-10px)" },
      { transform: "translateX(10px)" },
      { transform: "translateX(0px)" },
    ],
    {
      duration: 1000,
      easing: "ease-in-out",
    }
  );
}

async function request({plate, date, price}) {
  const description = document.getElementById("description").value;

  const data = {
    plate: plate,
    price: price,
    service_date: date,
    service_description: description,
  };
  
  try {
    const response = await fetch("http://localhost:8000/api/services/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
    console.log("Success:", response.json());
  } catch (error) {
    console.error("Error:", error);
  }
}
