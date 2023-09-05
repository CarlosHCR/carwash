import { Button, Container, Grid, Stack } from "@mui/material";
import { Form, Formik } from "formik";
import React from "react";
import { RegisterIUser } from "types/user.type";
import { RegisterValidation } from "utils/validationForm";
import { getErro, getSuccess } from "utils/modalErros";
import { register } from "services/auth.service";
import FormInput from "components/FormGroup/FormInput";
import { useNavigate } from "react-router-dom";

const RegisterValues: RegisterIUser = {
  username: "",
  email: "",
  password1: "",
  password2: "",
  firstName: "",
  lastName: "",
};

const Register: React.FC = () => {
  const handleRegister = async (formValue: RegisterIUser) => {
    try {
      await register(
        formValue.username,
        formValue.email,
        formValue.password1,
        formValue.password2,
        formValue.firstName,
        formValue.lastName
      );
      getSuccess("Cadastro realizado com sucesso.");
    } catch (error: any) {
      getErro(error.message);
    }
  };
  const history = useNavigate();

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
          <h1>Cadastre-se</h1>
          <Formik
            initialValues={RegisterValues}
            validationSchema={RegisterValidation}
            onSubmit={handleRegister}
          >
            <Form>
              <Stack spacing={2} direction="row">
                <FormInput name="firstName" label="Primeiro Nome" type="text" />
                <FormInput name="lastName" label="Último nome" type="text" />
              </Stack>
              <FormInput name="username" label="Nome de usuário" type="text" />
              <FormInput name="email" label="Email" type="email" />
              <FormInput name="password1" label="Senha" type="password" />
              <FormInput
                name="password2"
                label="Confirme a senha"
                type="password"
              />
              <Button variant="outlined" type="submit">
                Cadastrar
              </Button>
              <Button variant="outlined" onClick={() => history("/login")}>
                Login
              </Button>
            </Form>
          </Formik>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Register;
