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
