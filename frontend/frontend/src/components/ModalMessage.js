import React from "react";
import { Modal, Button } from "react-bootstrap";

const ModalMessage = ({ show, onClose, title, message }) => (
  <Modal show={show} onHide={onClose}>
    <Modal.Header>
      <Modal.Title>{title}</Modal.Title>
    </Modal.Header>
    <Modal.Body>{message}</Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={onClose}>
        Fechar
      </Button>
    </Modal.Footer>
  </Modal>
);

export default ModalMessage;
