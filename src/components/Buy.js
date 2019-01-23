import React from 'react'
import { Form, Input, Button, Modal, Message } from 'semantic-ui-react'
import {connect } from 'react-redux'
import {createBuyTransaction} from '../actions/stocksAction'

class Buy extends React.Component{

  // <Message success header='Buying Completed' content="You have bought shares" />
  // <Message eror header='Cannot Buy' content="You have not bought shares" />

  state= {
    symbol: window.location.pathname.split("/").pop(),
    price: "",
    quantity: "",
    transaction_type: "BUY",
  }


  handleSubmit = (e) => {
    e.preventDefault()
    let stock = this.props.stocks.find(stock => stock.symbol.toLowerCase() === this.state.symbol)
    this.props.createBuyTransaction(this.state, this.props.user.id, stock)
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value

    }, console.log(this.state))
  }

  render(){

    return(
      <Modal trigger={<Button color ="green">Buy</Button>}>
        <Modal.Header>
          Buy {`${window.location.pathname.split("/").pop().toUpperCase()}`}
          Current Price: {this.props.selectedStock.latestPrice}
        </Modal.Header>
        <Modal.Content>
          <Form onSubmit={this.handleSubmit}>
            <Form.Group widths='equal'>
              <Form.Field
                name="quantity"
                onChange={this.handleChange}
                type='number'
                id='form-input-control-quantity'
                control={Input}
                label='Quantity'
                placeholder='100'

              />
              <Form.Field
                placeholder={this.props.selectedStock.latestPrice}
                name="price"
                onChange={this.handleChange}
                type="float"
                id='form-input-control-Price'
                control={Input}
                label='Price'
              />
            </Form.Group>
            <Button type='submit' color="green">Buy</Button>
          </Form>
        </Modal.Content>
      </Modal>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    selectedStock: state.selectedStock,
    stocks: state.stocks,
    ownedstocks: state.ownedstocks
  }
}


export default connect (mapStateToProps, {createBuyTransaction})(Buy)
