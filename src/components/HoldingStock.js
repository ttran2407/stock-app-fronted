import React from 'react'
import {connect } from 'react-redux'
import { List, Icon, Header  } from 'semantic-ui-react'
import {Link} from 'react-router-dom'
class HoldingStock extends React.Component {


  render(){
    return(
      <List.Item>
        <Link to={`/stocks/${this.props.stock.stock_symbol}`}>
          <List.Content floated='right'>
          {
            this.props.stock.change >= 0 ?
            <Icon name='chevron circle up' color="green"/> :
            <Icon name='chevron circle down' color="red"/>
          }
          </List.Content>

          <List.Content floated='left'>
            <Header as="h4" content={this.props.stock.stock_symbol}/>
          </List.Content >

          <List.Content verticalAlign='middle'>
           ${this.props.stock.price}
          </List.Content>
        </Link>
      </List.Item>

    )
  }
}

const mapStateToProps = state => {
  return {
    ownedstocks: state.ownedstocks
  }
}

export default connect (mapStateToProps)(HoldingStock)
