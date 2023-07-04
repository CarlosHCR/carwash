const ip = getIp();

function reportByDate() {
  const index = document.getElementById("reporttype").value;
  const date = document.getElementById("date").value;
  if (index != 3) {
    try {
      validateDate(date);
    } catch (err) {
      throw err;
    }
  }

  return formatDateParameter(date, index);
}

function formatDateParameter(date, index) {
  const [year, month, day] = date.split("-");
  return {
    0: `day=${day}&month=${month}&year=${year}`,
    1: `month=${month}&year=${year}`,
    2: `year=${year}`,
    3: "",
  }[index];
}

function identifyReportType() {
  return isPlateFieldDisplayed() ? reportByPlate() : reportByDate();
}

function isPlateFieldDisplayed() {
  return document.querySelector("#plate-field").style.display !== "none";
}

function reportByPlate() {
  const plate = document.getElementById("plate").value;
  validatePlate(plate);
  return `plate_number=${plate}`;
}

async function requestServiceReports() {
  try {
    const services = await getServiceReports(identifyReportType());
    validateResponse(services);
    services.date = filterDate(services);
    populateTableWithServices(services);
  } catch (err) {
    showError(err);
  }
}

function populateTableWithServices(services) {
  const tableBody = document.getElementById("table-body");
  clearTable();
  services.forEach((service) => {
    addServiceToTable(service);
  });

  addTotalRow(services, tableBody);
}

function clearTable() {
  const tableBody = document.getElementById("table-body");
  tableBody.innerHTML = "";
  document.querySelector("table").style.display = "block";
}

function addServiceToTable(service) {
  const tableBody = document.getElementById("table-body");
  const row = tableBody.insertRow();
  const {
    id,
    license_plate: { number },
    type: { name },
    price,
    date,
    description,
  } = service;

  row.insertCell().textContent = number;
  row.insertCell().textContent = name;
  row.insertCell().textContent = price;
  row.insertCell().textContent = date;
  row.insertCell().textContent = description;

  addButtonToTableRow(
    row,
    { id, number, name, price, date, description },
    createEditButton,
    "edit-button"
  );
  addButtonToTableRow(row, id, createDeleteButton, "delete-button");
}

function addButtonToTableRow(row, data, buttonCreationFunction, buttonClass) {
  const cell = row.insertCell();
  const button = buttonCreationFunction(data);

  button.classList.add(buttonClass);
  cell.appendChild(button);
}

function createDeleteButton(id) {
  const deleteButton = createIconButton(
    "fa fa-trash",
    "Excluir",
    "font-size:36px"
  );
  deleteButton.addEventListener("click", () => confirmDelete(id));
  return deleteButton;
}

function createIconButton(iconClass, altText, style) {
  const iconButton = document.createElement("a");
  iconButton.innerHTML = `<i class='${iconClass}' alt='${altText}' style='${style}'></i>`;
  return iconButton;
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
}

function reload() {
  document.getElementById("submit").click();
}

function createEditButton(rowData) {
  const editButton = createIconButton("fa fa-edit", "Editar", "font-size:36px");
  editButton.addEventListener("click", () => openModalToUpdate(rowData));
  return editButton;
}

async function openModalToUpdate(rowData) {
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
        reload();
      } catch (err) {
        const errorMessage = err.message;
        Swal.showValidationMessage(ERRORS[errorMessage].message);
      }
    },
  });
  await responseTypes(rowData.name);
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

function filterDate(services) {
  return services.sort(({ date: a }, { date: b }) => new Date(a) - new Date(b));
}

function filterPrice(services) {
  return services.reduce((acc, { price }) => acc + parseFloat(price), 0);
}

function addTotalRow(services, tableBody) {
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
function fieldsUpdate() {
  const plate = document.getElementById("plate-form").value;
  const type = document.getElementById("report-type").value;
  const date = document.getElementById("date-form").value;
  const price = document.getElementById("price").value;
  return { plate, type, date, price };
}
