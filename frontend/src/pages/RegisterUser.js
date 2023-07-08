import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { setUserDB } from "../endpoints/db_user";
import "../styles/RegisterUser.css";
import { ERRORS, getSuccess, getErro } from "../utils/utils";

const UserForm = () => {
  const [formData, setFormData] = useState({
    password1: "",
    password2: "",
    email: "",
    email2: "",
    username: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      if (!validateForm()) {
        throw new Error("EMPTY_FIELDS");
      }
      if (formData.email !== formData.email2) {
        throw new Error("EMAILS_NOT_MATCH");
      }
      if (formData.password1 !== formData.password2) {
        throw new Error("PASSWORD_NOT_MATCH");
      }
      const response = await setUserDB(formData);
      if (response.ok) {
        getSuccess("Usuário cadastrado com sucesso!");
        clearForm();
      } else {
        checkEmailAndUsername(response);
      }
    } catch (error) {
      if (ERRORS[error.message]) {
        getErro(ERRORS[error.message].message);
      } else {
        getErro("Ocorreu um erro inesperado.");
      }
    }
  };

  function checkEmailAndUsername(response) {
    const emailError = "A user is already registered with this e-mail address.";
    const usernameError = "A user with that username already exists.";
    const emailErrors = Array.isArray(response.email)
      ? response.email
      : [response.email];
    const usernameErrors = Array.isArray(response.username)
      ? response.username
      : [response.username];
    if (
      emailErrors.includes(emailError) &&
      usernameErrors.includes(usernameError)
    ) {
      throw new Error("EMAIL_AND_USERNAME_ALREADY_EXISTS");
    } else if (emailErrors.includes(emailError)) {
      throw new Error("EMAIL_ALREADY_EXISTS");
    } else if (usernameErrors.includes(usernameError)) {
      throw new Error("USERNAME_ALREADY_EXISTS");
    } else {
      throw new Error("REGISTER_USER");
    }
  }

  const validateForm = () =>
    formData.password1 &&
    formData.password2 &&
    formData.email &&
    formData.username;

  const clearForm = () => {
    setFormData({
      password1: "",
      password2: "",
      email: "",
      email2: "",
      username: "",
    });
  };

  return (
    <div className="UserForm">
      <Navbar />
      <div className="containers" id="containers">
        <div className="container" id="container">
          <label className="label-form">Email </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          <label className="label-form">Confirme o Email</label>
          <input
            type="email"
            name="email2"
            value={formData.email2}
            onChange={handleChange}
          />
          <label className="label-form">Senha</label>
          <input
            type="password"
            name="password1"
            value={formData.password1}
            onChange={handleChange}
          />
          <label className="label-form">Confirme a Senha</label>
          <input
            type="password"
            name="password2"
            value={formData.password2}
            onChange={handleChange}
          />
          <label className="label-form">Nome de Usuário</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
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
    </div>
  );
};

export default UserForm;
