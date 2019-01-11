import React from 'react'
import {connect} from 'react-redux'
import {fetchSingleStock} from '../actions/stocksAction.js'
import { Button, Container } from 'semantic-ui-react'

class Stock extends React.Component {

   componentDidMount() {

     let symbol = window.location.pathname.split("/").pop()
    this.props.fetchSingleStock(symbol)

  }

  render(){
    console.log(this.props.selectedStock)
    return (
      <Container>
        <Button color ="green">Watching</Button>
        <h4>{this.props.selectedStock.symbol}</h4>
        <p>  $ {this.props.selectedStock.latestPrice}</p>
        <p> Change: {this.props.selectedStock.change}</p>
        
      </Container>
    )
  }
}

const mapStateToProps =  state => {
  return {
    selectedStock: state.selectedStock
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchSingleStock: (symbol) => dispatch(fetchSingleStock(symbol))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Stock)
