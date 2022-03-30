import React from 'react';
import { Modal, Button } from 'react-bootstrap';

export default function StopProviderModal(props) {

    const { onHide, setIsQuitProvider } = props;

    const handleYesClick = () => {
        console.log("Quit provider");
        setIsQuitProvider(true);
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
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Are you sure you really want to stop being a storage provider?</h4>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => onHide(false)}>Go back</Button>
          <Button onClick={handleYesClick}>Yes, I am sure</Button>
        </Modal.Footer>
      </Modal>
    );
  }