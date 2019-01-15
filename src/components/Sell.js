import React from 'react'
import { Form, Input, Modal, Button } from 'semantic-ui-react'


const Sell = () => (
  <Modal trigger={<Button color ="green">Sell</Button>}>
    <Modal.Header>Sell {`${window.location.pathname.split("/").pop().toUpperCase()}`}</Modal.Header>
    <Modal.Content>
      <Form>
        <Form.Group widths='equal'>
          <Form.Field
            id='form-input-control-quantity'
            control={Input}
            label='Quantity'
            placeholder='100'
          />
          <Form.Field
            id='form-input-control-Price'
            control={Input}
            label='Price'
            placeholder='$100'
          />
        </Form.Group>
        <Form.Field
          id='form-button-control-public'
          control={Button}
          content='Sell'
          color="green"
          align='middle'
        />
      </Form>
    </Modal.Content>

  </Modal>

)

export default Sell
