import React from 'react'
import { Table } from 'semantic-ui-react'
import {connect } from 'react-redux'

class Transactions extends React.Component {
  render(){

    let transactionList = this.props.data.map(transaction =>
      <Table.Row key={transaction.id}>
        <Table.Cell width={4}>
          {  new Date(transaction.created_at).toLocaleTimeString() }
           {"  "}
          {  new Date(transaction.created_at).toLocaleDateString() }
        </Table.Cell>
        <Table.Cell>{transaction.transaction_type}</Table.Cell>
        <Table.Cell>{transaction.stock_symbol}</Table.Cell>
        <Table.Cell>{transaction.quantity}</Table.Cell>
        <Table.Cell>{transaction.price}</Table.Cell>
        <Table.Cell>{transaction.status_id === 2 ?  "COMPLETED" : (transaction.status_id === 1 ? "PENDING" : "CANCELED" ) }</Table.Cell>
      </Table.Row>
    )
    return (
      <Table striped>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Date</Table.HeaderCell>
            <Table.HeaderCell>Type</Table.HeaderCell>
            <Table.HeaderCell>Ticker</Table.HeaderCell>
            <Table.HeaderCell>Quantity</Table.HeaderCell>
            <Table.HeaderCell>Price</Table.HeaderCell>
            <Table.HeaderCell>Status</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {transactionList}
        </Table.Body>
      </Table>
    )
  }
}

const mapStateToProps =(state) => {
  return {
    transactions: state.transactions
  }
}

export default connect (mapStateToProps) (Transactions)
