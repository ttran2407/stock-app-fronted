import React from 'react'
import WatchlistStock from '../components/WatchlistStock'
import {connect} from 'react-redux'
import {updateWatchlistChange} from '../actions/stocksAction'
import { List} from 'semantic-ui-react'




class WatchlistContainer extends React.Component {
  render(){
    return(
     <List animated selection divided verticalAlign='middle'>
       {this.props.watchlist.map(stock =>
         <WatchlistStock key={stock.symbol} stock={stock} />
       )}
     </List>
    )
  }
}

const mapStateToProps = state => {

  return {
    watchlist: state.watchlist
  }
}

export default connect (mapStateToProps, {updateWatchlistChange})(WatchlistContainer)
