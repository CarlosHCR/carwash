const ERRORS = {
  INVALID_DATE: {
    field: "date",
    message: "A data deve conter apenas números e um ano maior que 2023.",
  },
  INVALID_PLATE: { field: "plate", message: "A placa deve ter 7 caracteres." },
  INVALID_PRICE: {
    field: "price",
    message: "O preço deve estar entre R$0,01 e R$1.000,00.",
  },
  INVALID_TYPE: {
    field: "report-type",
    message: "Selecione um tipo de serviço válido.",
  },
  INVALID_RESPONSE: { field: "container", message: "Erro na requisição." },
};

function getIp() {
  return "http://localhost:8000";
}

function validatePlate(plate) {
  plate = plate.replace(/ /g, "");
  if (plate.length !== 7) throw new Error("INVALID_PLATE");
}

function validateType(type) {
  const element = SERVICES_TYPE.find((element) => element.name === type);
  if (element === undefined) throw new Error("INVALID_TYPE");
  return element.id;
}

function validateDate(date) {
  const year = date.split("-")[0];
  if (date === "" || year < 2023) throw new Error("INVALID_DATE");
}

function validatePrice(price) {
  if (price < 0.01 || price > 1000) throw new Error("INVALID_PRICE");
}

function validateResponse(response) {
  if (response === undefined || response.length === 0)
    throw new Error("INVALID_RESPONSE");
}

function showError({ field, message }) {
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
