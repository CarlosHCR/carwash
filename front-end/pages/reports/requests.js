const ip = getIp();

function reportDate() {
  const index = document.getElementById("report-type").value;
  const date = document.getElementById("date").value;
  const dateValid = index != 3 && index != 4 && validateDate(date);
  return concatDate(date, index);
}

function reportPlate(plate) {
  return `plate_number=${plate}`;
}

function concatDate(date, index) {
  const [year, month, day] = date.split("-");
  return {
    0: `day=${day}&month=${month}&year=${year}`,
    1: `month=${month}&year=${year}`,
    2: `year=${year}`,
    3: "",
  }[index];
}

function typeReport() {
  const plate = document.getElementById("plate").value;
  return plate ? reportPlate(plate) : reportDate();
}

async function request() {
  try {
    const services = await getServiceReports(typeReport());
    validateResponse(services);
    services.date = filterDate(services);
    createTable(services);
  } catch (err) {
    showError(ERRORS[err.message]);
  }
}

function createTable(services) {
  const tableBody = document.getElementById("table-body");
  tableBody.innerHTML = "";
  document.querySelector("table").style.display = "block";
  services.forEach(
    ({
      license_plate: { number },
      type: { name },
      price,
      date,
      description,
    }) => {
      const row = tableBody.insertRow();
      row.insertCell().textContent = number;
      row.insertCell().textContent = name;
      row.insertCell().textContent = price;
      row.insertCell().textContent = date.split("-").reverse().join("-");
      row.insertCell().textContent = description;
    }
  );
  rowReport(services, tableBody);
}

function rowReport(services, tableBody) {
  const size = services.length;
  const totalPrice = filterPrice(services);
  const totalRow = tableBody.insertRow();
  const totalCell = totalRow.insertCell();
  totalCell.colSpan = "2";
  totalCell.textContent = `Total de serviços: ${size}`;
  totalRow.insertCell().textContent = `Dinheiro arrecadado: R$${totalPrice.toFixed(
    2
  )}`;
}

function filterDate(services) {
  return services.sort(({ date: a }, { date: b }) => new Date(a) - new Date(b));
}

function filterPrice(services) {
  return services.reduce((acc, { price }) => acc + parseFloat(price), 0);
}
