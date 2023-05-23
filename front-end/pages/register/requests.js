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

function fieldsRegister() {
  const plate = document.getElementById("plate").value;
  const type = document.getElementById("report-type").value;
  const date = document.getElementById("date").value;
  const price = parseFloat(document.getElementById("price").value);
  return { plate, type, date, price };
}

async function requestService() {
  try {
    validateOfValues(fieldsRegister());
    setService(fieldsRegister());
    clearForm();
    getSuccess("Cadastrado com sucesso!");
  } catch (err) {
    showError(err);
  }
}
