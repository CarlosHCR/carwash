import React from "react";
import { Formik, Form } from "formik";
import { login } from "services/auth.service";
import { LoginIUser } from "types/user.type";
import { validationLogin } from "utils/validationForm";
import FormInput from "components/FormGroup/FormInput";
import { getSuccess, getErro } from "utils/modalErros";

const LoginValues: LoginIUser = {
  username: "",
  password: "",
};

const Login: React.FC = () => {
  const handleLogin = async (values: LoginIUser) => {
    const { username, password } = values;
    try {
      await login(username, password);
      getSuccess("Login realizado com sucesso.");
    } catch (error: any) {
      getErro(error.message);
    }
  };

  return (
    <div className="form-grid">
      <Formik
        initialValues={LoginValues}
        validationSchema={validationLogin}
        onSubmit={handleLogin}
      >
        <Form>
          <FormInput name="username" label="Username" type="text" />
          <FormInput name="password" label="Password" type="password" />
          <button type="submit">Sign Up</button>
        </Form>
      </Formik>
    </div>
  );
};

export default Login;
