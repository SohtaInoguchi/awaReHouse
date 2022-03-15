import React from 'react';
import { Modal, Button } from 'react-bootstrap';

export default function StopProviderModal(props) {

    const { onHide } = props;

    const handleYesClick = () => {
        console.log("Quit provider");
        onHide(false);
    }

    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
          {/* Are you sure to stop being provider? */}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Are you sure you'd like to stop being provider?</h4>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => onHide(false)}>Go back</Button>
          <Button onClick={handleYesClick}>Yes, I'm sure</Button>
        </Modal.Footer>
      </Modal>
    );
  }