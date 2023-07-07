import React, { useState, useEffect } from "react";
import moment from "moment";
import Navbar from "../components/Navbar";
import ModalMessage from "../components/ModalMessage";
import { getType } from "../endpoints/db_type";
import { setService } from "../endpoints/db_service";
import "../styles/RegisterService.css";

function RegisterServicePage() {
  const [plate, setPlate] = useState("");
  const [selectedService, setSelectedService] = useState("");
  const [date, setDate] = useState(moment().format("YYYY-MM-DD"));
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [serviceTypes, setServiceTypes] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalMessage, setModalMessage] = useState("");

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
      if (!validateForm()) throw new Error("Campos não preenchidos");
      const response = await setService({
        plate,
        selectedService,
        date,
        price,
        description,
      });

      if (response.ok) {
        setModalTitle("Sucesso");
        setModalMessage("O serviço foi cadastrado com sucesso!");
        setModalShow(true);
        resetForm();
      } else {
        throw new Error("");
      }
    } catch (error) {
      handleModalError(error);
    }
  };

  const validateForm = () => plate && selectedService && date && price;

  const handleModalError = (error) => {
    var erroMessage;
    if (error.message === "Campos não preenchidos") {
      erroMessage = "Preencha todos os campos";
    } else {
      erroMessage = "Ocorreu um erro ao cadastrar o serviço.";
    }
    setModalTitle("Erro");
    setModalMessage(erroMessage);
    setModalShow(true);
  };

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
        <div className="form-group">
          <label htmlFor="plate">Placa do veículo</label>
          <input
            type="text"
            id="plate"
            name="plate"
            maxLength={7}
            value={plate}
            onChange={handlePlateChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="plate">Serviço realizado</label>
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
        </div>
        <div className="form-group">
          <label htmlFor="date">Data do serviço</label>
          <input
            type="date"
            id="date"
            name="date"
            value={date}
            onChange={handleDateChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="price">Preço do serviço</label>
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
        </div>
        <div className="form-group">
          <label htmlFor="description">Descrição:</label>
          <textarea
            type="text"
            id="description"
            name="description"
            value={description}
            onChange={handleDescriptionChange}
          ></textarea>
        </div>
        <div className="form-group">
          <input
            id="submit_btn"
            type="submit"
            value="Submit"
            onClick={handleSubmit}
          />
        </div>
      </div>
      <ModalMessage
        show={modalShow}
        onClose={() => setModalShow(false)}
        title={modalTitle}
        message={modalMessage}
      />
    </div>
  );
}

export default RegisterServicePage;
