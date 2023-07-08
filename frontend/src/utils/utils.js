import Swal from "sweetalert2";

export const ERRORS = {
  EMPTY_FIELDS: {
    message: "Preencha todos os campos",
  },
  EMAILS_NOT_MATCH: {
    message: "Emails não coincidem",
  },
  PASSWORD_NOT_MATCH: {
    message: "Senhas não coincidem",
  },
  REGISTER_SERVICE: {
    message: "Ocorreu um erro ao cadastrar o serviço.",
  },
  REGISTER_USER: {
    message: "Ocorreu um erro ao cadastrar o usuário.",
  },
  INVALID_RESPONSE: {
    message: "Erro na requisição. Verifique se os campos estão corretos.",
  },
  EMAIL_ALREADY_EXISTS: {
    message: "Email já cadastrado.",
  },
  USERNAME_ALREADY_EXISTS: {
    message: "Nome de usuário já cadastrado.",
  },
  EMAIL_AND_USERNAME_ALREADY_EXISTS: {
    message: "Email e Usuário já cadastrado.",
  },
};

export function getSuccess(message) {
  Swal.fire({
    title: "Sucesso!",
    text: message,
    icon: "success",
  });
}

export function getErro(message) {
  Swal.fire({
    title: "Erro!",
    text: message,
    icon: "error",
  });
}
