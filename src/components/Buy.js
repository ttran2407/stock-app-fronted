import React from 'react'
import { Form, Input, Button, Modal, Message } from 'semantic-ui-react'


const Buy = () => (

  <Modal trigger={<Button color ="green">Buy</Button>}>
    <Modal.Header>Buy {`${window.location.pathname.split("/").pop()}`}</Modal.Header>
    <Modal.Content>
      <Form >
        <Form.Group widths='equal'>
          <Form.Field
            type='number'
            id='form-input-control-quantity'
            control={Input}
            label='Quantity'
            placeholder='100'
          />
          <Form.Field
            type="number"
            id='form-input-control-Price'
            control={Input}
            label='Price'
            placeholder='$100'
          />
        </Form.Group>
        <Message success header='Buying Completed' content="You have bought shares" />
        <Message eror header='Cannot Buy' content="You have not bought shares" />
        <Button type='submit' color="green">Buy</Button>
      </Form>
    </Modal.Content>

  </Modal>

)

export default Buy
