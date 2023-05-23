const ip = getIp();

function reportDate() {
  const index = document.getElementById("reporttype").value;
  const date = document.getElementById("date").value;
  try {
    if (index != 3) validateDate(date);
  } catch (err) {
    throw err;
  }

  return concatDate(date, index);
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
  const plateField = document.querySelector("#plate-field");

  if (plateField.style.display !== "none") {
    return reportPlate();
  } else {
    return reportDate();
  }
}

function reportPlate() {
  const plate = document.getElementById("plate").value;
  validatePlate(plate);
  return `plate_number=${plate}`;
}

async function request() {
  try {
    const services = await getServiceReports(typeReport());
    validateResponse(services);
    services.date = filterDate(services);
    createTable(services);
  } catch (err) {
    showError(err);
  }
}

function createTable(services) {
  const tableBody = document.getElementById("table-body");
  tableBody.innerHTML = "";
  document.querySelector("table").style.display = "block";

  services.forEach((service) => {
    const {
      id,
      license_plate: { number },
      type: { name },
      price,
      date,
      description,
    } = service;
    const row = tableBody.insertRow();

    row.insertCell().textContent = number;
    row.insertCell().textContent = name;
    row.insertCell().textContent = price;
    row.insertCell().textContent = date.split("-").reverse().join("-");
    row.insertCell().textContent = description;

    createEditButton(row, { id, number, name, price, date, description });
    createDeleteButton(row, id);
  });

  rowReport(services, tableBody);
}

function createDeleteButton(row, id) {
  const deleteCell = row.insertCell();
  const deleteButton = document.createElement("a");
  deleteButton.innerHTML =
    "<i class='fa fa-trash' alt='Excluir' style='font-size:36px'></i>";
  deleteButton.classList.add("delete-button");

  deleteButton.addEventListener("click", () => {
    confirmDelete(id);
  });

  deleteCell.appendChild(deleteButton);
}

function confirmDelete(id) {
  Swal.fire({
    title: "Confirmar exclusão",
    text: "Tem certeza que deseja excluir?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Sim",
    cancelButtonText: "Não",
  }).then((result) => {
    if (result.isConfirmed) {
      deleteService(id);
    }
  });
  reload();
}

function createEditButton(row, rowData) {
  const editCell = row.insertCell();
  const editButton = document.createElement("a");
  editButton.innerHTML =
    "<i class='fa fa-edit' alt='Editar' style='font-size:36px'></i>";
  editButton.classList.add("edit-button");

  editButton.addEventListener("click", () => {
    modalUpdate(rowData);
  });

  editCell.appendChild(editButton);
}

async function modalUpdate(rowData) {
  Swal.fire({
    title: "Editar serviço",
    html: `
      <div class="form-group">
        <h4>id do serviço:${rowData.id}</h4>
        <label for="plate">Placa do veículo</label>
        <input type="text" id="plate-form" name="plate" maxlength="7" value=${rowData.number}>
        <label for="plate">Serviço realizado</label>
        <select id="report-type">
          <option value="error">Selecione o serviço</option>
        </select>
        <label for="date">Data do serviço</label>
        <input type="date" id="date-form" name="date" value=${rowData.date} />
        <label for="price">Preço do serviço</label>
        <input type="number" name="price" id="price" value=${rowData.price} />
        <label for="description">Descrição:</label>
        <textarea type="text" id="description">${rowData.description}</textarea>
      </div>
    `,
    showCancelButton: true,
    confirmButtonText: "Confirmar",
    cancelButtonText: "Cancelar",
    preConfirm: () => {
      const id = rowData.id;
      try {
        validateOfValues(fieldsUpdate());
        updateService({ id, ...fieldsUpdate() });
      } catch (err) {
        const errorMessage = err.message;
        Swal.showValidationMessage(ERRORS[errorMessage].message);
      }
    },
  });
  await responseTypes(rowData.name);
}

function fieldsUpdate() {
  const plate = document.getElementById("plate-form").value;
  const type = document.getElementById("report-type").value;
  const date = document.getElementById("date-form").value;
  const price = document.getElementById("price").value;
  return { plate, type, date, price };
}

function reload() {
  document.querySelector("#submit").click();
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

function radioReport() {
  const radio = document.querySelector('input[name="option"]:checked').value;
  const dateField = document.querySelector("#date-field");
  const typeField = document.querySelector("#type-field");
  const plateField = document.querySelector("#plate-field");
  const plateInput = document.getElementById("plate");
  const dateInput = document.getElementById("date");

  document.querySelector("#col").style.display = "flex";

  dateField.style.display = radio === "date" ? "flex" : "none";
  typeField.style.display = radio === "date" ? "flex" : "none";
  plateField.style.display = radio !== "date" ? "flex" : "none";
  plateInput.value = radio === "date" ? "" : "";
  dateInput.value = radio !== "date" ? "" : "";
}
