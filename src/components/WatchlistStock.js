import React from 'react'
import {connect} from 'react-redux'
import {updateWatchlistChange} from '../actions/stocksAction'

class WatchlistStock extends React.Component {

  componentDidMount(){
      let symbol = this.props.symbol
      this.props.updateWatchlistChange(symbol)
    }

  render(){
    let stock = this.props.watchlist.find(stock => stock.symbol === this.props.symbol )

    return(
     <div className="watch-list-stock">
       <h4> {stock.symbol} </h4>
       <p> {stock.change} </p>

     </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    watchlist: state.watchlist
  }
}

export default connect (mapStateToProps, {updateWatchlistChange})(WatchlistStock)
