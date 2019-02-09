import React from 'react'
import {connect} from 'react-redux'
import { Button, Header, Icon, List } from 'semantic-ui-react'
import {fetchUnWatchStock, fetchWatchStock} from '../actions/stocksAction'

class Stock extends React.Component {


  handleUnWatchClick = (e) => {
    let watchlist = this.props.watchlist.find(watchlist => watchlist.symbol.toUpperCase() === this.props.selectedStock.symbol.toUpperCase())
    this.props.fetchUnWatchStock(watchlist.id, this.props.user.id)
  }

  handleWatchClick = (e) => {
    let stock = this.props.stocks.find(stock => stock.symbol.toUpperCase() === this.props.selectedStock.symbol.toUpperCase())
    this.props.fetchWatchStock(stock, this.props.user.id)

  }

  render(){


    const {symbol, latestPrice, changePercent} = this.props.selectedStock
    let quantity = this.props.ownedstocks.filter(stock => stock.stock_symbol.toLowerCase() === symbol.toLowerCase())
    return (
      <List>
        <List.Item>
        {this.props.watchlist.find(stock => stock.symbol.toUpperCase() === symbol.toUpperCase()) ?
        ( <Button onClick={this.handleUnWatchClick} icon labelPosition="left" color ="green">
            <Icon name="eye"/>
            Watching
          </Button>) :
        ( <Button onClick={this.handleWatchClick} icon labelPosition="left" style={{"color":"9896A4"}} >
            <Icon name="low vision"/>
            Watch
          </Button>)}
        </List.Item>
        <List.Item>
          <List.Content>
            <Header style={{ "marginTop": "40px", "marginBottom": "10px"}} as="h4" content={symbol}/>
          </List.Content>
        </List.Item>
        <List.Item >
          <List.Content style={{"display": "inline", "marginRight": "20px"}} content={`$ ${latestPrice}`} />
          <List.Content style={{"display": "inline", "marginLeft": "20px"}}  >
            {changePercent >= 0 ?
              <Icon name='chevron circle up' color="green"/> :
              <Icon name='chevron circle down' color="red"/>}
            {Math.round(changePercent * 10000)/100}%
          </List.Content>
        </List.Item>
        <p style={{ "marginTop": "20px" }}> Owned: {quantity.length !== 0 ? quantity[0].quantity : "0"}</p>
      </List>
    )
  }
}

const mapStateToProps =  state => {
  return {
    user: state.user,
    stocks: state.stocks,
    selectedStock: state.selectedStock,
    ownedstocks: state.ownedstocks,
    watchlist: state.watchlist
  }
}


export default connect(mapStateToProps, {fetchUnWatchStock, fetchWatchStock})(Stock)
