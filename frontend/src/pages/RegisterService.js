import React, { useState, useEffect } from "react";
import moment from "moment";
import Navbar from "../components/Navbar";
import { getType } from "../endpoints/db_type";
import { setService } from "../endpoints/db_service";
import "../styles/RegisterService.css";
import { ERRORS, getSuccess, getErro } from "../utils/utils";

function RegisterServicePage() {
  const [plate, setPlate] = useState("");
  const [selectedService, setSelectedService] = useState("");
  const [date, setDate] = useState(moment().format("YYYY-MM-DD"));
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [serviceTypes, setServiceTypes] = useState([]);

  useEffect(() => {
    async function fetchServiceTypes() {
      try {
        const response = await getType();
        setServiceTypes(response);
      } catch (error) {
        console.error(error);
      }
    }
    fetchServiceTypes();
  }, []);

  const handlePlateChange = (e) => {
    setPlate(e.target.value);
  };

  const handleServiceChange = (e) => {
    setSelectedService(e.target.value);
  };

  const handleDateChange = (e) => {
    setDate(e.target.value);
  };

  const handlePriceChange = (e) => {
    setPrice(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      if (!validateForm()) throw new Error("EMPTY_FIELDS");
      const response = await setService({
        plate,
        selectedService,
        date,
        price,
        description,
      });
      if (response.ok) {
        getSuccess("Serviço cadastrado com sucesso!");
        resetForm();
      } else {
        throw new Error("REGISTER_SERVICE");
      }
    } catch (error) {
      if (ERRORS[error.message]) {
        getErro(ERRORS[error.message].message);
      } else {
        getErro("Ocorreu um erro inesperado.");
      }
    }
  };

  const validateForm = () => plate && selectedService && date && price;

  const resetForm = () => {
    setPlate("");
    setSelectedService("");
    setDate(moment().format("YYYY-MM-DD"));
    setPrice(0);
    setDescription("");
  };

  const isValidPrice = (price) => {
    const parsedPrice = parseFloat(price);
    return isNaN(parsedPrice) ? 0 : parsedPrice;
  };

  const handlePlusTenClick = () => {
    setPrice((price) => {
      const newPrice = isValidPrice(price);
      return newPrice + 10;
    });
  };

  const handlePlusFiftyClick = () => {
    setPrice((price) => {
      const newPrice = isValidPrice(price);
      return newPrice + 50;
    });
  };

  const handlePlusHundredClick = () => {
    setPrice((price) => {
      const newPrice = isValidPrice(price);
      return newPrice + 100;
    });
  };

  return (
    <div className="registerServicePage">
      <Navbar />
      <div className="container" id="container">
        <label className="label-form" htmlFor="plate">
          Placa do veículo
        </label>
        <input
          type="text"
          id="plate"
          name="plate"
          maxLength={7}
          value={plate}
          onChange={handlePlateChange}
        />
        <label className="label-form" htmlFor="plate">
          Serviço realizado
        </label>
        <select
          id="report-type"
          value={selectedService}
          onChange={handleServiceChange}
        >
          <option value="error">Selecione o serviço</option>
          {serviceTypes &&
            serviceTypes.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
        </select>
        <label className="label-form" htmlFor="date">
          Data do serviço
        </label>
        <input
          type="date"
          id="date"
          name="date"
          value={date}
          onChange={handleDateChange}
        />
        <label className="label-form" htmlFor="price">
          Preço do serviço
        </label>
        <input
          type="number"
          name="price"
          id="price"
          value={price}
          onChange={handlePriceChange}
        />
        <div className="buttons">
          <button name="plus_ten" id="plus_ten" onClick={handlePlusTenClick}>
            +10
          </button>
          <button
            name="plus_fifty"
            id="plus_fifty"
            onClick={handlePlusFiftyClick}
          >
            +50
          </button>
          <button
            name="plus_hundred"
            id="plus_hundred"
            onClick={handlePlusHundredClick}
          >
            +100
          </button>
        </div>
        <label className="label-form" htmlFor="description">
          Descrição:
        </label>
        <textarea
          type="text"
          id="description"
          name="description"
          value={description}
          onChange={handleDescriptionChange}
        ></textarea>
        <div className="btn_form">
          <input
            id="submit_btn"
            type="submit"
            value="Submit"
            onClick={handleSubmit}
          />
        </div>
      </div>
    </div>
  );
}

export default RegisterServicePage;
