import React from "react";
import { Formik, Form } from "formik";
import { RegisterIUser } from "types/user.type";
import { register } from "services/auth.service";
import { useNavigate } from "react-router-dom";
import { RegisterValidation } from "utils/validationForm";
import FormInput from "components/FormGroup/FormInput";
import { getSuccess, getErro } from "utils/modalErros";

const RegisterValues: RegisterIUser = {
  username: "",
  email: "",
  password1: "",
  password2: "",
  firstName: "",
  lastName: "",
};

const Register: React.FC = () => {
  const history = useNavigate();
  const handleRegister = async (formValue: RegisterIUser) => {
    const { username, email, password1, password2, firstName, lastName } =
      formValue;
    try {
      await register(
        username,
        email,
        password1,
        password2,
        firstName,
        lastName
      );
      getSuccess("Cadastro realizado com sucesso.");
    } catch (error: any) {
      getErro(error.message);
    }
  };

  return (
    <Formik
      initialValues={RegisterValues}
      validationSchema={RegisterValidation}
      onSubmit={handleRegister}
    >
      <Form>
        <FormInput name="username" label="Username" type="text" />
        <FormInput name="email" label="Email" type="email" />
        <FormInput name="password1" label="Password" type="password" />
        <FormInput name="password2" label="Confirm Password" type="password" />
        <FormInput name="firstName" label="firstName" type="text" />
        <FormInput name="lastName" label="lastName" type="text" />

        <button type="submit" className="btn btn-primary btn-block">
          Sign Up
        </button>
        <button
          type="button"
          className="btn btn-primary btn-block"
          onClick={() => history("/login")}
        >
          Login
        </button>
      </Form>
    </Formik>
  );
};

export default Register;
