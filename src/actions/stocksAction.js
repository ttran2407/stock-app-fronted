/* ---------- ACTION CREATORS ------------- */
export const buyStock = (stock_id) => ({type: "BUY_STOCK", payload: stock_id})
const getStocks = (stocks) => ({type: "GET_STOCKS", payload: stocks})
const getSingleStock = (stock) => ({type: "GET_SINGLE_STOCK", payload: stock})
const getStockData = (data) => ({type: "GET_STOCK_DATA", payload: data})
/* ---------- THUNK CREATORS ------------- */

 const loadStocks = () => {
  return (dispatch) => {
    return fetch(`http://localhost:3000/stocks`)
    .then(res => res.json())
    .then(stocks => dispatch(getStocks(stocks)))
    .catch(console.error)
  }
}

const fetchSingleStock = (symbol) => {
  return (dispatch) => {
    return fetch(`https://api.iextrading.com/1.0/stock/${symbol}/quote`)
    .then(res => res.json())
    .then(stock => dispatch(getSingleStock(stock)))
    .catch(console.error)
  }
}

const fetchStockChart = (symbol) => {
  return (dispatch) => {
    return fetch(`https://api.iextrading.com/1.0/stock/${symbol}/chart`)
    .then(res => res.json())
    .then(data => dispatch(getStockData(data)))
    .catch(console.error)
  }
}

export {loadStocks, fetchSingleStock, fetchStockChart}
