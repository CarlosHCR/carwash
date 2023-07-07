import React, { useState } from "react";
import ModalMessage from "../components/ModalMessage";
import { setUserDB } from "../endpoints/db_user";

const UserForm = () => {
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [email, setEmail] = useState("");
  const [email2, setEmail2] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [modalShow, setModalShow] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalMessage, setModalMessage] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case "username":
        setUsername(value);
        break;
      case "firstName":
        setFirstName(value);
        break;
      case "lastName":
        setLastName(value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    try {
      if (!validateForm()) {
        throw new Error("Preencha todos os campos");
      }
      if (email !== email2) {
        throw new Error("Emails não coincidem");
      }
      if (password1 !== password2) {
        throw new Error("Senhas não coincidem");
      }

      const saveUser = setUserDB({
        password1,
        password2,
        email,
        username,
        firstName,
        lastName,
      });
      console.log(saveUser);

      setModalTitle("Sucesso");
      setModalMessage("Usuário cadastrado com sucesso");
      setModalShow(true);

      clearForm();
    } catch (error) {
      console.log(error);
      setModalTitle("Erro");
      setModalMessage(error.message);
      setModalShow(true);
    }
  };

  const validateForm = () =>
    password1 && password2 && email && username && firstName && lastName;

  const clearForm = () => {
    setPassword1("");
    setPassword2("");
    setEmail("");
    setEmail2("");
    setFirstName("");
    setLastName("");
    setUsername("");
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleConfirmEmailChange = (event) => {
    setEmail2(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword1(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    setPassword2(event.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Email:
        <input
          type="email"
          name="email"
          value={email}
          onChange={handleEmailChange}
        />
      </label>
      <label>
        Confirme o Email:
        <input
          type="email"
          name="confirmEmail"
          value={email2}
          onChange={handleConfirmEmailChange}
        />
      </label>
      <label>
        Senha:
        <input
          type="password"
          name="password"
          value={password1}
          onChange={handlePasswordChange}
        />
      </label>
      <label>
        Confirme a Senha:
        <input
          type="password"
          name="password2"
          value={password2}
          onChange={handleConfirmPasswordChange}
        />
      </label>
      <br />
      <br />
      <label>
        Nome de Usuário:
        <input
          type="text"
          name="username"
          value={username}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        Nome:
        <input
          type="text"
          name="firstName"
          value={firstName}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        Sobrenome:
        <input
          type="text"
          name="lastName"
          value={lastName}
          onChange={handleChange}
        />
      </label>
      <br />
      <br />
      <button type="submit">Submit</button>
      <ModalMessage
        show={modalShow}
        onClose={() => setModalShow(false)}
        title={modalTitle}
        message={modalMessage}
      />
    </form>
  );
};

export default UserForm;
