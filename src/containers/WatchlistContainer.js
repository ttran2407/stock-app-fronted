import React from 'react'
import WatchlistStock from '../components/WatchlistStock'
import {connect} from 'react-redux'
import {fetchWatchlist} from '../actions/stocksAction'



class WatchlistContainer extends React.Component {

  componentWillMount(){
      let userId= window.location.pathname.split("/").pop()
      this.props.fetchWatchlist(userId)
    }

  render(){
    let watchlist = this.props.watchlist.map(stock => <WatchlistStock key={stock.symbol} symbol={stock.symbol}/>)

    return(
     <div className="watch-list-containers">
      {watchlist}
     </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    watchlist: state.watchlist
  }
}

export default connect (mapStateToProps, {fetchWatchlist})(WatchlistContainer)
