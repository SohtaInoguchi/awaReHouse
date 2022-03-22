import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

export default function RetrieveConfirmation(props) {

    const { onHide, selectedItems } = props;

    const handleYesClick = () => {
        onHide(false);
        console.log("selected item in modal", selectedItems)
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
          <h2 className='retrieval-modal-texts'>Additional cost: ¥ 15,000</h2>
          {/* <h4 className='retrieval-modal-texts'>Please confirm you would like to retrieve {selectedItems.map((item, idx) => {
              return idx === selectedItems.length - 2 ? 
              <span key={idx}>{item} and </span> : 
              idx === selectedItems.length - 1 ? 
              <span key={idx}>{item}</span> :
              <span key={idx}>{item}, </span>
          })}</h4> */}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4 className='extra-storage-modal-texts'>Are you sure you'd like to retrieve item?</h4>
        </Modal.Body>
        <Modal.Footer>
          <Button id='go-back-button' onClick={() => onHide(false)}>Go back</Button>

        <Form action="/create-checkout-session" method="POST">
        <Form.Control type="hidden" name="name" value="Extra retrieval"/>
        <Button id="checkout-and-portal-button" type="submit">Yes, I'm sure</Button>
        </Form>

        </Modal.Footer>
      </Modal>
    );
  }