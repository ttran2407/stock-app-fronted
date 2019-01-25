import React from 'react'
import { Grid, Icon} from 'semantic-ui-react'
import WatchlistContainer from './WatchlistContainer'
import HoldingContainer from './HoldingContainer'

import CircularChart from '../components/CircularChart'
import Transactions from '../components/Transactions'

import {connect} from 'react-redux'
import { fetchOwnedstocks, fetchTransactions} from '../actions/stocksAction'



class UserContainer extends React.Component {


  render (){

    let balance = parseFloat(this.props.user.cash)
    this.props.ownedstocks.forEach(stock => balance += (stock.price * stock.quantity))
    const cashPercentage = Math.round(this.props.user.cash/balance * 10000)/100
    return (

      <Grid celled="internally" >
        <Grid.Row textAlign='center'>
          <Grid.Column width={3} >
              <Icon name='eye' circular />
              WatchList
          </Grid.Column>
          <Grid.Column width={10}>
            <Icon name='balance' circular />
              <p style={{'display': "inline"}}>Portfolio Value:</p> <p style={{'display': "inline", "color": "#5692ce"}}>${Math.round(balance * 100)/100}</p>

          </Grid.Column>
          <Grid.Column width={3}>
            <Icon name='shopping cart' circular />
            Stock Holding
          </Grid.Column>
        </Grid.Row>

      <Grid.Row>
        <Grid.Column width={3} textAlign='center'>
          <WatchlistContainer/>
        </Grid.Column>
        <Grid.Column width={10}>
          <CircularChart
            cashPercentage={cashPercentage}
            balance={balance}
            cash={this.props.user.cash}/>
        </Grid.Column>
        <Grid.Column width={3}>
          <HoldingContainer/>
        </Grid.Column>
      </Grid.Row>

      <Grid.Row className="transactions">
        <Transactions data={this.props.transactions}/>
      </Grid.Row>
    </Grid>

    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    ownedstocks: state.ownedstocks,
    transactions: state.transactions
  }
}

export default connect (mapStateToProps, { fetchOwnedstocks, fetchTransactions})(UserContainer)
