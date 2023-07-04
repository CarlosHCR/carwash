async function responseTypes(index) {
  try {
    const response = await getType();
    SERVICES_TYPE = response;
    validateResponse(response);
    const selectElement = document.getElementById("report-type");
    response.forEach((service) => {
      const optionElement = document.createElement("option");
      optionElement.text = service.name;
      selectElement.appendChild(optionElement);
    });
    if (index != undefined) selectElement.selectedIndex = validateType(index);
  } catch (err) {
    showError(ERRORS[err.message]);
  }
}
