import React from 'react'
import { Form, Input, Modal, Button } from 'semantic-ui-react'
import {connect } from 'react-redux'
import {createSellTransaction} from '../actions/stocksAction'


class Sell extends React.Component{

  state= {
    symbol: window.location.pathname.split("/").pop(),
    price: "",
    quantity: "",
     transaction_type: "SELL"
  }


  handleSubmit = (e) => {
    e.preventDefault()
    let ownedstock = this.props.ownedstocks.find(stock => stock.stock_symbol.toLowerCase() === this.state.symbol)
    this.props.createSellTransaction(this.state, this.props.user.id, ownedstock)
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    }, console.log(this.state))
  }

  render(){
    return (

      <Modal trigger={<Button color ="green">Sell</Button>}>
        <Modal.Header>
          Sell {`${window.location.pathname.split("/").pop().toUpperCase()}`}
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
            <Button type='submit' color="red">Sell</Button>
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
    ownedstocks: state.ownedstocks
  }
}

export default connect (mapStateToProps, {createSellTransaction})(Sell)
