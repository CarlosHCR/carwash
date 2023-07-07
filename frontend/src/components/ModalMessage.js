import React from "react";
import { Modal, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const ModalMessage = ({ show, onClose, title, message }) => (
  <Modal show={show} onHide={onClose}>
    <Modal.Header>
      <Modal.Title>{title}</Modal.Title>
    </Modal.Header>
    <Modal.Body>{message}</Modal.Body>
    <Modal.Footer>
      <Button
        style={{ backgroundColor: "green" }}
        variant="secondary"
        onClick={onClose}
      >
        Fechar
      </Button>
    </Modal.Footer>
  </Modal>
);

export default ModalMessage;
