import React from 'react'
import HoldingStock from '../components/HoldingStock'
import {connect} from 'react-redux'
import { List} from 'semantic-ui-react'





class HoldingContainer extends React.Component {


  render(){
    let ownedstocks = this.props.ownedstocks.map(stock => <HoldingStock key={stock.symbol} stock={stock}/>)
    return(
     <List animated selection divided verticalAlign='middle'>
       {ownedstocks}
     </List>
    )
  }
}

const mapStateToProps = state => {
  return {
    ownedstocks: state.ownedstocks
  }
}

export default connect (mapStateToProps)(HoldingContainer)
