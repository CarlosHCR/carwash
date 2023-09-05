import React from "react";
import { Button, Container, Grid, Modal, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Formik, Form } from "formik";
import { getErro, getSuccess } from "utils/modalErros";
import { passwordReset } from "services/auth.service";
import FormInput from "components/FormGroup/FormInput";
import { PasswordResetValidation } from "utils/validationForm";

interface PasswordResetModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PasswordResetValues = {
  email: "",
};

const PasswordResetModal: React.FC<PasswordResetModalProps> = ({
  isOpen,
  onClose,
}) => {
  const handlepasswordReset = async (values: typeof PasswordResetValues) => {
    try {
      await passwordReset(values.email);
      getSuccess("Email enviado com sucesso.");
      onClose();
    } catch (error: any) {
      getErro(error.message);
    }
  };

  return (
    <Modal open={isOpen} onClose={onClose}>
      <Container
        sx={{
          height: "100vh",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Grid
          sx={{
            position: "relative",
            border: "3px solid #ccc",
            padding: "10px",
            maxWidth: "700px",
            backgroundColor: "white",
            width: "70%",
          }}
        >
          <IconButton
            sx={{
              position: "absolute",
              alignItems: "end",
              right: "0",
              top: "0",
              color: "red",
            }}
            onClick={onClose}
          >
            <CloseIcon />
          </IconButton>
          <h3>Recuperar Senha</h3>
          <Formik
            initialValues={PasswordResetValues}
            validationSchema={PasswordResetValidation}
            onSubmit={handlepasswordReset}
          >
            <Form>
              <FormInput name="email" label="Email" type="email" />
              <Button
                variant="outlined"
                type="submit"
                style={{ marginTop: "20px" }}
              >
                Enviar
              </Button>
            </Form>
          </Formik>
        </Grid>
      </Container>
    </Modal>
  );
};

export default PasswordResetModal;
