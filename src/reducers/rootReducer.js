import {stockStore} from './stockStore.js'
const initialState = {
  user: {
    userName: "",
    firstName: "",
    lastName: "",
    cash: "",
  },
  companyInfo: null,
  stocks: stockStore,
  ownedstocks: [],
  watchlist: [],
  transactions: [],
  openSignUpForm: false,
  openLoginForm: false,
  selectedStock: {
    symbol: "TSLA",
    companyName: "Tesla Inc.",
    open: 304.82,
    close: 298.92,
    high: 308,
    low: 295.5,
    latestPrice: ""
  },
  stockChartData: null
}


const rootReducer = (state = initialState, action) => {
  switch(action.type){
    case('GET_STOCKS'): {
      let newState = {...state}
      newState.stocks = action.payload
      return newState
    }
    case('GET_SINGLE_STOCK'): {
      let newState = {...state}
      newState.selectedStock = action.payload
      return newState
    }
    case('GET_COMPANY_INFO'): {
      let newState = {...state}
      newState.companyInfo = action.payload
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
      newState.user = action.payload.user
      return newState
    }
    case('GET_STOCK_CHANGE'): {
      let stock = state.watchlist.find(stock => stock.symbol === action.payload.symbol)
      let idx = state.watchlist.indexOf(stock)
      let newStock = {...state.watchlist[idx], change: action.payload.changePercent}
      let newWatchlist = [...state.watchlist]
      newWatchlist[idx] = newStock
      let newState = {...state, watchlist: newWatchlist}


      // let newState = {...state}
      // let watchlist = newState.watchlist
      // let stock = state.watchlist.find(stock => stock.symbol === action.payload.symbol)
      // stock.change = action.payload.change
      return newState
    }
    case('GET_OWNED_STOCK_QUOTE'): {
      let stock = state.ownedstocks.find(stock => stock.stock_symbol === action.payload.symbol)
      let idx = state.ownedstocks.indexOf(stock)
      let newStock = {...state.ownedstocks[idx], price: action.payload.latestPrice, change: action.payload.changePercent}
      let newOwnedstocks = [...state.ownedstocks]
      newOwnedstocks[idx] = newStock
      let newState = {...state, ownedstocks: newOwnedstocks}

      return newState
    }
    case('GET_OWNED_STOCKS'): {
      let newState = {...state}
      let ownedstocks = action.payload.map(stock => {return {...stock, price: ""}})
      newState.ownedstocks = ownedstocks
      return newState
    }
    case('GET_TRANSACTIONS'): {
      let newState = {...state}
      let transactions = action.payload
      newState.transactions = transactions
      return newState
    }
    case('OPEN_SIGNUP_FORM'): {
      let newState = {...state}
      newState.openSignUpForm = true
      return newState
    }
    case('CLOSE_SIGNUP_FORM'): {
      let newState = {...state}
      newState.openSignUpForm = false
      return newState
    }
    case('OPEN_LOGIN_FORM'): {
      let newState = {...state}
      newState.openLoginForm = true
      return newState
    }
    case('CLOSE_LOGIN_FORM'): {
      let newState = {...state}
      newState.openLoginForm = false
      return newState
    }

    default:
      return state
  }
}


export default rootReducer
