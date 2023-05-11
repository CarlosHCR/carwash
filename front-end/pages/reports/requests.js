const ip = getIp();
function reportDate() {
  index = document.getElementById("report-type").value;
  date = document.getElementById("date").value;
  if (index != 3) {
    const dateValid = validateDate(date);
  }
  return concatDate(date, index);
}

function concatDate(date, index) {
  const [year, month, day] = date.split("-");
  if (index == 0) return `day=${day}&date=${date}`;
  if (index == 1) return `month=${month}&year=${year}`;
  if (index == 2) return `year=${year}`;
  if (index == 3) return;
}

async function request() {
  try {
    date = reportDate();
    const response = await fetch(`${ip}/api/services/?${date}`);
    if (response.ok) {
      const services = await response.json();
      services.sort((a, b) => new Date(a.date) - new Date(b.date));
      const tableBody = document.getElementById("table-body");

      tableBody.innerHTML = "";

      document.querySelector("table").style.display = "block";

      services.forEach((service) => {
        const row = tableBody.insertRow();
        row.insertCell().innerHTML = service.license_plate.number;
        row.insertCell().innerHTML = service.service_type.name;
        row.insertCell().innerHTML = service.price;
        row.insertCell().innerHTML = service.date
          .split("-")
          .reverse()
          .join("-");
        row.insertCell().innerHTML = service.description;
      });
    } else {
      throw new Error("Erro na requisição");
    }
  } catch (err) {
    showError(ERRORS[err.message]);
  }
}
