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

  const plateValid = validatePlate(plate);
  const dateValid = validateDate(date);
  const priceValid = validatePrice(price);

  const listErrors = [
    { field: "plate", message: "A placa deve ter 7 caracteres." },
    {
      field: "date",
      message: "A data deve conter apenas números e um ano maior que 2023.",
    },
    {
      field: "price",
      message: "O preço deve estar entre R$0,01 e R$1.000,00.",
    },
  ];

  if (!plateValid) {
    showError(listErrors[0].field, listErrors[0].message);
  } else if (!dateValid) {
    showError(listErrors[1].field, listErrors[1].message);
  } else if (!priceValid) {
    showError(listErrors[2].field, listErrors[2].message);
  } else {
    request();
  }
}

function validatePlate(plate) {
  plate = plate.replace(/ /g, "");
  if (plate.length !== 7) {
    return false;
  }
  return true;
}

function validateDate(date) {
  const year = date.split("-")[0];
  console.log(year);
  if (date === "" || year < 2023) {
    return false;
  }
  return true;
}

function validatePrice(price) {
  if (price < 0.01 || price > 1000) {
    return false;
  }
  return true;
}

function showError(elementId, message) {
  const element = document.getElementById(elementId);
  element.classList.add("invalid");
  animateInvalidPrice(element);
  alert(message);
}

function animateInvalidPrice(element) {
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

function request() {
  var plate = document.getElementById("plate").value;
  var date = document.getElementById("date").value;
  var price = document.getElementById("price").value;
  var description = document.getElementById("description").value;

  var data = {
    plate: plate,
    price: price,
    service_date: date,
    service_description: description,
  };

  fetch("http://localhost:8000/api/services/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Success:", data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}
