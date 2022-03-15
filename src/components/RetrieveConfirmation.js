import React from 'react';
import { Modal, Button } from 'react-bootstrap';

export default function RetrieveConfirmation(props) {

    const { onHide, selectedItem } = props;

    const handleYesClick = () => {
        onHide(false);
        console.log("selected item in modal", selectedItem)
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
          <h4>Are you sure you'd like to retrieve {selectedItem}?</h4>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <h2>It will cost you ¥15000</h2>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => onHide(false)}>Go back</Button>
          <Button onClick={handleYesClick}>Yes, I'm sure</Button>
        </Modal.Footer>
      </Modal>
    );
  }