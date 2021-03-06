import React from 'react'
import {connect } from 'react-redux'
import { List, Icon, Header  } from 'semantic-ui-react'
import {Link} from 'react-router-dom'




class WatchlistStock extends React.Component {


  render(){

    return(
      <List.Item width={4}>
        <Link to={`/stocks/${this.props.stock.symbol}`}>

        <List.Content floated='right'>
          {
            this.props.stock.change >= 0 ?
            <Icon name='chevron circle up' color="green"/> :
            <Icon name='chevron circle down' color="red"/>
          }
        </List.Content>

          <List.Content floated='left'>
            <Header as="h4" content={this.props.stock.symbol}/>
           </List.Content>

         <List.Content>
           {Math.round(this.props.stock.change * 10000)/100}%
        </List.Content>
        </Link>
      </List.Item>
    )
  }
}

const mapStateToProps = state => {
  return {
    watchlist: state.watchlist
  }
}

export default connect(mapStateToProps)(WatchlistStock)
