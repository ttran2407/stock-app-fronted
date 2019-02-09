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
    quantity: "1",
    transaction_type: "BUY",
    modalOpen: false,
    showError: false
  }


  handleSubmit = (e) => {
    let transactionValue = parseFloat(this.state.price) * parseInt(this.state.quantity)

    e.preventDefault()
    let stock = this.props.stocks.find(stock => stock.symbol.toUpperCase() === this.state.symbol.toUpperCase())
    if (transactionValue > parseFloat(this.props.user.cash)){
      this.setState({showError: true})
    } else {
      this.props.createBuyTransaction(this.state, this.props.user.id, stock)
      this.setState({
        modalOpen: false,
      })
    }

  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleClick =() => {
    this.setState({
      modalOpen: !this.state.modalOpen,
      price: this.props.selectedStock.latestPrice,
      showError: false
    })
  }


  render(){
    return(
      <Modal
        trigger={<Button onClick={this.handleClick} style={{ "marginRight": "20px"}} color ="green">Buy</Button>}
        open={this.state.modalOpen}
        onClose={this.handleClick}>
        <Modal.Header>
          Buy {`${window.location.pathname.split("/").pop().toUpperCase()}`}
          Current Price: {this.props.selectedStock.latestPrice}
        </Modal.Header>
        <Modal.Content>
          <Form error={this.state.showError} onSubmit={this.handleSubmit}>
            <Form.Group widths='equal'>
              <Form.Field
                name="quantity"
                onChange={this.handleChange}
                type='number'
                min={1}
                id='form-input-control-quantity'
                control={Input}
                label='Quantity'
                value={this.state.quantity}
              />
              <Form.Field
                name="price"
                onChange={this.handleChange}
                type="number"
                min={0.1}
                step="0.01"
                id='form-input-control-Price'
                control={Input}
                label="Price"
                value={this.state.price}
              />
            </Form.Group>
            <Message
              error
              header='Transactions Declined'
              content='You do not have enough cash. Please re-enter quantity amount or deposit money'
            />
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
