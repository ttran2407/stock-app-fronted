const initialState = {stocks:[], selectedStock: {}, stockChartData: null}

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

    default:
      return state
  }
}


export default rootReducer
