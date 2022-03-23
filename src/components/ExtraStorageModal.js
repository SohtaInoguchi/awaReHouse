import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

export default function ExtraStorageModal(props) {

    const { onHide, submit2 } = props;

    const invokeCheckout = (e) => {
        submit2(e);
        const checkoutBtn = document.getElementById('hidden-checkout-and-portal-button')
        checkoutBtn.click();
        console.log(checkoutBtn);
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
          <h2 className='extra-storage-modal-texts'>Additional cost: ¥ 15,000</h2>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4 className='extra-storage-modal-texts'>Are you sure you'd like to store extra item(s)?</h4>
        </Modal.Body>
        <Modal.Footer>

        <Button id='go-button' onClick={() => onHide(false)}>Go back</Button>
        <Form action="/create-checkout-session" method="POST">
        <Form.Control type="hidden" name="name" value="Extra retrieval"/>
        {/* Below button is invisible */}
        <Button id="hidden-checkout-and-portal-button" type="submit">Yes, I'm sure</Button> 
        </Form>
        <Button id='invoke-checout-send-data' onClick={invokeCheckout}>Yes, I'm sure</Button>

        </Modal.Footer>
      </Modal>
    );
  }