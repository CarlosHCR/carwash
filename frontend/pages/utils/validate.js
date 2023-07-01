const ERRORS = {
  INVALID_DATE: {
    message: "A data deve ser válida.",
  },
  INVALID_PLATE: { field: "plate", message: "A placa deve ter 7 caracteres." },
  INVALID_PRICE: {
    message: "O preço deve estar entre R$0,01 e R$1.000,00.",
  },
  INVALID_TYPE: {
    message: "Selecione um tipo de serviço válido.",
  },
  INVALID_RESPONSE: {
    message: "Erro na requisição. Verifique se os campos estão corretos.",
  },
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
  if (date == "" || year < 2023) throw new Error("INVALID_DATE");
}

function validatePrice(price) {
  if (price < 0.01 || price > 1000) throw new Error("INVALID_PRICE");
}

function validateResponse(response) {
  if (!Array.isArray(response)) throw new Error("INVALID_RESPONSE");
}

function validateOfValues({ plate, type, date, price }) {
  try {
    validatePlate(plate);
    validateType(type);
    validateDate(date);
    validatePrice(price);
  } catch (err) {
    throw err;
  }
}

function showError(err) {
  const errorMessage = err.message;
  const message = ERRORS[errorMessage].message;
  getErro(message);
}

function getSuccess(message) {
  Swal.fire({
    icon: "success",
    title: message,
  });
}

function getErro(message) {
  Swal.fire({
    title: "Erro!",
    text: message,
    icon: "error",
  });
}
