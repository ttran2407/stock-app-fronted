import Stock from './Stock'
import StockChart from './StockChart'
import React from 'react'
import {Grid, Segment} from 'semantic-ui-react'
import Buy from './Buy'
import Sell from './Sell'
import {connect} from 'react-redux'
import {fetchSingleStock,fetchCompanyInfo} from '../actions/stocksAction.js'
import Transactions from './Transactions'
import CompanyInfo from './CompanyInfo'



class StockContainer extends React.Component {



  componentDidMount() {
    const symbol = window.location.pathname.split("/").pop()
    this.props.fetchSingleStock(symbol)
    this.props.fetchCompanyInfo(symbol)

  }

  render (){
    console.log(this.props.router)
    const symbol = window.location.pathname.split("/").pop()
    let selectedStockTransactions = this.props.transactions.filter(
      transaction => transaction.stock_symbol.toUpperCase() === symbol.toUpperCase()
    )
    return (
        <Grid celled="internally">
          <Grid.Row textAlign='center'>
            <Grid.Column width={8}>
              <Grid.Row>
                <Stock/>
                <Buy/>
                <Sell/>
              </Grid.Row>
              <Grid.Row>
                <CompanyInfo/>
              </Grid.Row>
            </Grid.Column>
            <Grid.Column width={8}>
                <StockChart/>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row className="transactions">
            <Transactions data={selectedStockTransactions}/>
          </Grid.Row>
        </Grid>
    )
  }
}

const mapStateToProps = state => {
  return {
    transactions: state.transactions,

  }
}

export default connect(mapStateToProps, {fetchCompanyInfo,fetchSingleStock})(StockContainer)
