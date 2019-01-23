import React from 'react'
import {connect} from 'react-redux'
import { Button, Header, Icon, List } from 'semantic-ui-react'

class Stock extends React.Component {





  render(){

    const {symbol, latestPrice, changePercent} = this.props.selectedStock
    console.log(symbol)
    let quantity = this.props.ownedstocks.filter(stock => stock.stock_symbol.toLowerCase() === symbol.toLowerCase())
    return (
      <List>
        <List.Item>
        {this.props.watchlist.find(stock => stock.symbol.toUpperCase() === symbol.toUpperCase()) ?
        ( <Button icon labelPosition="left" color ="green">
            <Icon name="eye"/>
            Watching
          </Button>) :
        ( <Button icon labelPosition="left" color ="red">
            <Icon name="eye"/>
            Watch
          </Button>)}
        </List.Item>
        <List.Item>
          <List.Content>
            <Header as="h4" content={symbol}/>
          </List.Content>
        </List.Item>
        <List.Item>
          <List.Content content={`$ ${latestPrice}`} floated='left'/>
          <List.Content floated='right'>
            {changePercent >= 0 ?
              <Icon name='chevron circle up' color="green"/> :
              <Icon name='chevron circle down' color="red"/>}
            {Math.round(changePercent * 10000)/100}%
          </List.Content>
        </List.Item>
        <p> Owned: {quantity.length !== 0 ? quantity[0].quantity : "0"}</p>

      </List>
    )
  }
}

const mapStateToProps =  state => {
  return {
    selectedStock: state.selectedStock,
    ownedstocks: state.ownedstocks,
    watchlist: state.watchlist
  }
}


export default connect(mapStateToProps)(Stock)
