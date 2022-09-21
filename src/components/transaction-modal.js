import React from "react";
import { Modal, Button } from "react-bootstrap";
export default function TxModal(props) {
  return (
    <div>
      <Modal
        show={props.showTxModal}
        onHide={props.handleClose}
        backdrop="static"
        keyboard={false}
        centered
        
      >
        <Modal.Header closeButton={false}>
          <Modal.Title>Transaction Status</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          I will not close if you click outside me. Don't even try to press
          escape key.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
