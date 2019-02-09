import React from 'react'
import { Table } from 'semantic-ui-react'
import {connect } from 'react-redux'

class StockHolding extends React.Component {
  render(){

    let stockHoldingList = this.props.ownedstocks.map(stock =>
      <Table.Row key={stock.id}>
        <Table.Cell textAlign='center'>{stock.stock_symbol}</Table.Cell>
        <Table.Cell textAlign='center'>{stock.quantity}</Table.Cell>
      </Table.Row>
    )
    return (
      <div style={{"height": "50vh", "overflow": "scroll", "width": "100%"}}>
        <Table celled padded striped>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell textAlign='center'>Ticker</Table.HeaderCell>
              <Table.HeaderCell textAlign='center'>Quantity</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body >
            {stockHoldingList}
          </Table.Body>
        </Table>
      </div>

    )
  }
}

const mapStateToProps =(state) => {
  return {
    ownedstocks: state.ownedstocks
  }
}

export default connect (mapStateToProps) (StockHolding)
