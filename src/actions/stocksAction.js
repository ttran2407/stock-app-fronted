/* ---------- ACTION CREATORS ------------- */
export const buyStock = (stock_id) => ({type: "BUY_STOCK", payload: stock_id})
const getStocks = (stocks) => ({type: "GET_STOCKS", payload: stocks})
const getSingleStock = (stock) => ({type: "GET_SINGLE_STOCK", payload: stock})
const getStockData = (data) => ({type: "GET_STOCK_DATA", payload: data})
const getOwnedStocks = (ownedstocks) => ({type: "GET_OWNED_STOCKS", payload: ownedstocks})
const getWatchlist = (watchlist) => ({type: "GET_WATCH_LIST", payload: watchlist})
const getUser = (user) => ({type: "GET_USER", payload: user})
const getStockChange = (stock) => ({type: "GET_STOCK_CHANGE", payload: stock})
const getOwnedStockQuote = (stock) => ({type: "GET_OWNED_STOCK_QUOTE", payload: stock})
const getTransactions = (transactions) => ({type: "GET_TRANSACTIONS", payload: transactions})
/* ---------- THUNK CREATORS ------------- */

 const loadStocks = () => {
  return (dispatch) => {
    return fetch(`http://localhost:3000/stocks`)
    .then(res => res.json())
    .then(stocks => dispatch(getStocks(stocks)))
  }
}

const fetchSingleStock = (symbol) => {
  return (dispatch) => {
    return fetch(`https://api.iextrading.com/1.0/stock/${symbol}/quote`)
    .then(res => res.json())
    .then(stock => dispatch(getSingleStock(stock)))
  }
}

const fetchStockChart = (symbol) => {
  return (dispatch) => {
    return fetch(`https://api.iextrading.com/1.0/stock/${symbol}/chart`)
    .then(res => res.json())
    .then(data => dispatch(getStockData(data)))
  }
}

const fetchWatchlist = (user_id) => {
  return dispatch => {
    return fetch(`http://localhost:3000/users/${user_id}/watchlists`)
    .then(res => res.json())
    .then(watchlist => dispatch(getWatchlist(watchlist)))
  }
}

const updateWatchlistChange = (symbol) => {
  return (dispatch) => {
    return fetch(`https://api.iextrading.com/1.0/stock/${symbol}/quote`)
    .then(res => res.json())
    .then(stock => dispatch(getStockChange(stock)))
  }
}

const fetchUser = (user_id) => {
  return dispatch => {
    return fetch(`http://localhost:3000/users/${user_id}`)
    .then(res => res.json())
    .then(user => dispatch(getUser(user)))
  }
}

const updateOwnedStockPrice = (symbol,dispatch) => {
   fetch(`https://api.iextrading.com/1.0/stock/${symbol}/quote`)
    .then(res => res.json())
    .then(stock =>{
        dispatch(getOwnedStockQuote(stock))
    })
}

const fetchOwnedstocks = (user_id) => {
  return dispatch => {
    return fetch(`http://localhost:3000/users/${user_id}/ownedstocks`)
    .then(res => res.json())
    .then(ownedstocks => {
      dispatch(getOwnedStocks(ownedstocks))
      ownedstocks.forEach(stock => updateOwnedStockPrice(stock.stock_symbol, dispatch))})
  }
}

const fetchTransactions = (user_id) => {
  return dispatch => {
    return fetch(`http://localhost:3000/users/${user_id}/transactions`)
    .then(res => res.json())
    .then(transactions => dispatch(getTransactions(transactions)))
  }
}




export {loadStocks, fetchSingleStock,
        fetchStockChart, fetchWatchlist,
        updateWatchlistChange,fetchUser,
        updateOwnedStockPrice, fetchOwnedstocks,
        fetchTransactions
      }
