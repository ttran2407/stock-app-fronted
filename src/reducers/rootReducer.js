const initialState = {
  user: {
    userName: "",
    firstName: "",
    lastName: "",
    cash: "",
  },
  ownedstocks: [],
  watchlist: [],
  transactions: [],
  stocks:[],
  selectedStock: {},
  stockChartData: null
}

const rootReducer = (state = initialState, action) => {
  switch(action.type){
    case('GET_STOCKS'): {
      return {stocks: action.payload}
    }
    case('GET_SINGLE_STOCK'): {
      let newState = {...state}
      newState.selectedStock = action.payload
      return newState
    }
    case('GET_STOCK_DATA'): {
      let newState = {...state}
      newState.stockChartData = action.payload
      return newState
    }
    case('GET_WATCH_LIST'): {
      let newState = {...state}
      let watchlist = action.payload.map(stock => {return {symbol: stock.stock_symbol, change: 0}})
      newState.watchlist = watchlist
      return newState
    }
    case('GET_USER'): {
      let newState = {...state}
      newState.user = action.payload
      return newState
    }
    case('GET_STOCK_CHANGE'): {
      let newState = {...state}
      let watchlist = newState.watchlist
      let stock = watchlist.find(stock => stock.symbol === action.payload.symbol)
      stock.change = action.payload.change
      return newState
    }
    case('GET_OWNED_STOCK_QUOTE'): {
      let newState = {...state}
      let ownedstocks = newState.ownedstocks
      let stock = ownedstocks.find(stock => stock.symbol === action.payload.symbol)
      stock.price = action.payload.latestPrice
      return newState
    }
    case('GET_OWNED_STOCKS'): {
      let newState = {...state}
      let ownedstocks = action.payload.map(stock => {return {symbol: stock.stock_symbol,quantity: stock.quantity, price: ""}})
      newState.ownedstocks = ownedstocks
      return newState
    }
    case('GET_TRANSACTIONS'): {
      let newState = {...state}
      let transactions = action.payload
      newState.transactions = transactions
      return newState
    }

    default:
      return state
  }
}


export default rootReducer
