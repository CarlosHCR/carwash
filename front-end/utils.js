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

function revisionOfValues() {
  const plate = document.getElementById("plate").value;
  const price = parseFloat(document.getElementById("price").value);

  const dateStr = document.getElementById("date").value;
  const year = dateStr.split("-")[0];

  const plateValid = validatePlate(plate);
  const priceValid = validatePrice(price);

  if (!plateValid.valid) {
    showError("plate", plateValid.message);
    animateInvalidPrice(document.getElementById("plate"));
    document.getElementById("plate").focus();
  } else if (date === "" || year < 2023) {
    showError(
      "date",
      "A data deve conter apenas números e um ano maior que 2023."
    );
    animateInvalidPrice(document.getElementById("date"));
    document.getElementById("date").focus();
  } else if (!priceValid.valid) {
    showError("price", priceValid.message);
    animateInvalidPrice(document.getElementById("price"));
    document.getElementById("price").focus();
  } else {
    request();
  }
}

function validatePlate(plate) {
  plate = plate.replace("  " && " ", "");
  if (plate.length !== 7) {
    return { valid: false, message: "A placa deve ter 7 caracteres." };
  }
  return { valid: true };
}

function validatePrice(price) {
  if (price <= 0 || price > 1000) {
    return {
      valid: false,
      message: "O preço deve estar entre R$0,01 e R$1.000,00.",
    };
  }
  return { valid: true };
}

function showError(elementId, message) {
  const element = document.getElementById(elementId);
  element.classList.add("invalid");
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

  fetch(
    "http://localhost:8000/api/services/",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  )
    .then((response) => response.json())
    .then((data) => {
      console.log("Success:", data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}
