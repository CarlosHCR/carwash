import React, { useState } from "react";
import { Formik, Form } from "formik";
import { login } from "services/auth.service";
import { LoginIUser } from "types/user.type";
import { validationLogin } from "utils/validationForm";
import FormInput from "components/FormGroup/FormInput";
import { getSuccess, getErro } from "utils/modalErros";
import Button from "@mui/material/Button";
import { Grid, Container } from "@mui/material";
import PasswordResetModal from "components/PasswordResetModal/PasswordReset";

const LoginValues: LoginIUser = {
  username: "",
  password: "",
};

const Login: React.FC = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  const handleLogin = async (values: typeof LoginValues) => {
    try {
      await login(values.username, values.password);
      getSuccess("Login realizado com sucesso.");
    } catch (error: any) {
      getErro(error.message);
    }
  };

  return (
    <Container sx={{ height: "100vh", width: "100%" }}>
      <Grid
        item
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
        }}
      >
        <Grid
          sx={{
            border: "3px solid #ccc",
            padding: "10px",
            maxWidth: "500px",
            minWidth: "80%",
            backgroundColor: "white",
          }}
        >
          <h3>Login</h3>
          <Formik
            initialValues={LoginValues}
            validationSchema={validationLogin}
            onSubmit={handleLogin}
          >
            <Form>
              <FormInput name="username" label="Username" type="text" />
              <FormInput name="password" label="Password" type="password" />
              <Button variant="outlined" type="submit">
                Login
              </Button>
              <Button variant="outlined" onClick={() => setModalOpen(true)}>
                Esqueci minha senha
              </Button>
            </Form>
          </Formik>
        </Grid>
      </Grid>
      <PasswordResetModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
      />
    </Container>
  );
};

export default Login;
